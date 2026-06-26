import 'dart:async';
import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:socket_io_client/socket_io_client.dart' as io;
import '../../config/app_config.dart';
import 'storage_service.dart';

final socketServiceProvider = Provider<SocketService>((ref) {
  return SocketService(ref.watch(storageServiceProvider));
});

/// Manages the Socket.IO lifecycle: connect, disconnect,
/// event registration, and auto-reconnect.
class SocketService {
  final StorageService _storage;
  io.Socket? _socket;
  bool _isConnected = false;

  SocketService(this._storage);

  bool get isConnected => _isConnected;
  io.Socket? get socket => _socket;

  /// Connect to the WebSocket server using the stored JWT token.
  Future<void> connect() async {
    if (_isConnected) return;

    final token = await _storage.getAccessToken();
    if (token == null) return;

    _socket = io.io(
      AppConfig.wsUrl,
      io.OptionBuilder()
          .setTransports(['websocket'])
          .setAuth({'token': token})
          .enableAutoConnect()
          .enableReconnection()
          .setReconnectionDelay(1000)
          .setReconnectionAttempts(10)
          .build(),
    );

    _socket!.onConnect((_) {
      _isConnected = true;
      debugPrint('[Socket] Connected');
    });

    _socket!.onDisconnect((_) {
      _isConnected = false;
      debugPrint('[Socket] Disconnected');
    });

    _socket!.onConnectError((err) {
      _isConnected = false;
      debugPrint('[Socket] Connection error: $err');
    });

    _socket!.onReconnect((_) {
      _isConnected = true;
      debugPrint('[Socket] Reconnected');
    });
  }

  /// Disconnect and clean up.
  void disconnect() {
    _socket?.disconnect();
    _socket?.dispose();
    _socket = null;
    _isConnected = false;
  }

  /// Emit an event with payload.
  void emit(String event, [dynamic data]) {
    _socket?.emit(event, data);
  }

  /// Register a one-time listener for an event.
  void once(String event, Function(dynamic) callback) {
    _socket?.once(event, callback);
  }

  /// Register a persistent listener. Returns a function to unsubscribe.
  VoidCallback on(String event, Function(dynamic) callback) {
    _socket?.on(event, callback);
    return () => _socket?.off(event, callback);
  }

  /// Remove a specific listener.
  void off(String event, [Function(dynamic)? callback]) {
    if (callback != null) {
      _socket?.off(event, callback);
    } else {
      _socket?.off(event);
    }
  }
}
