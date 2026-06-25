import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

final authStateProvider = StateProvider<bool>((ref) => false);

final accessTokenProvider = FutureProvider<String?>((ref) async {
  final storage = const FlutterSecureStorage();
  return storage.read(key: 'access_token');
});
