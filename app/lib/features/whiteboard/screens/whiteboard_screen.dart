import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../config/theme.dart';
import '../../../core/api/dio_client.dart';
import '../../../core/api/api_exception.dart';
import '../../../core/models/whiteboard_element_model.dart';
import '../../../core/providers/auth_provider.dart';
import '../../../core/services/socket_service.dart';
import '../../../core/widgets/app_snackbar.dart';
import '../../../config/api_constants.dart';

class WhiteboardScreen extends ConsumerStatefulWidget {
  final String sessionId;
  const WhiteboardScreen({super.key, required this.sessionId});

  @override
  ConsumerState<WhiteboardScreen> createState() => _WhiteboardScreenState();
}

class _WhiteboardScreenState extends ConsumerState<WhiteboardScreen> {
  final List<WhiteboardElementModel> _elements = [];
  WhiteboardElementModel? _currentElement;
  
  Color _color = Colors.cyanAccent;
  double _strokeWidth = 4.0;
  VoidCallback? _unsubscribeSocket;
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _connectSocketAndLoad();
  }

  @override
  void dispose() {
    if (_unsubscribeSocket != null) {
      _unsubscribeSocket!();
    }
    super.dispose();
  }

  Future<void> _connectSocketAndLoad() async {
    try {
      // 1. Join room
      ref.read(socketServiceProvider).emit('join_session', widget.sessionId);

      // 2. Register real-time sync listener
      _unsubscribeSocket = ref.read(socketServiceProvider).on('whiteboard_draw', (data) {
        final payload = data as Map<String, dynamic>;
        final elementsJson = payload['elements'] as List;
        final senderId = payload['senderId'] as String?;
        
        final currentUser = ref.read(authProvider).user;
        if (senderId == currentUser?.id) return; // Skip our own drawings

        final remoteElements = elementsJson
            .map((e) => WhiteboardElementModel.fromJson(e as Map<String, dynamic>))
            .toList();

        setState(() {
          for (final elem in remoteElements) {
            final idx = _elements.indexWhere((e) => e.id == elem.id);
            if (idx != -1) {
              _elements[idx] = elem;
            } else {
              _elements.add(elem);
            }
          }
        });
      });

      // 3. Load initial state from backend
      final api = ref.read(apiProvider);
      final response = await api.get<Map<String, dynamic>>(ApiConstants.whiteboard(widget.sessionId));
      
      final dbState = response['state'] as Map<String, dynamic>?;
      if (dbState != null && dbState['elements'] is List) {
        final list = dbState['elements'] as List;
        setState(() {
          _elements.addAll(
            list.map((e) => WhiteboardElementModel.fromJson(e as Map<String, dynamic>)),
          );
        });
      }
    } catch (e) {
      debugPrint('[Whiteboard] Loading error: $e');
    } finally {
      setState(() => _isLoading = false);
    }
  }

  String _colorToHex(Color color) {
    return '#${color.value.toRadixString(16).substring(2).toUpperCase()}';
  }

  Color _hexToColor(String hex) {
    final hexCode = hex.replaceAll('#', '');
    return Color(int.parse('FF$hexCode', radix: 16));
  }

  void _onPanStart(DragStartDetails details) {
    final id = 'elem_${ref.read(authProvider).user?.id}_${DateTime.now().microsecondsSinceEpoch}';
    _currentElement = WhiteboardElementModel(
      id: id,
      type: 'pen',
      color: _colorToHex(_color),
      strokeWidth: _strokeWidth,
      points: [
        {'x': details.localPosition.dx, 'y': details.localPosition.dy}
      ],
    );
  }

  void _onPanUpdate(DragUpdateDetails details) {
    if (_currentElement == null) return;
    
    final updatedPoints = List<Map<String, double>>.from(_currentElement!.points)
      ..add({'x': details.localPosition.dx, 'y': details.localPosition.dy});
    
    setState(() {
      _currentElement = _currentElement!.copyWith(points: updatedPoints);
    });

    // Broadcast stream preview via socket
    ref.read(socketServiceProvider).emit('whiteboard_draw', {
      'sessionId': widget.sessionId,
      'elements': [_currentElement!.toJson()],
    });
  }

  Future<void> _onPanEnd(DragEndDetails details) async {
    if (_currentElement == null) return;

    setState(() {
      _elements.add(_currentElement!);
      _currentElement = null;
    });

    // Save final board state to database
    try {
      final api = ref.read(apiProvider);
      await api.post(
        ApiConstants.whiteboard(widget.sessionId),
        data: {
          'elements': _elements.map((e) => e.toJson()).toList(),
        },
      );
    } on ApiException catch (e) {
      if (mounted) {
        AppSnackbar.show(context, message: e.message, type: SnackbarType.error);
      }
    }
  }

  void _undo() {
    if (_elements.isEmpty) return;
    setState(() {
      _elements.removeLast();
    });
    _saveAndSyncState();
  }

  void _clear() {
    if (_elements.isEmpty) return;
    setState(() {
      _elements.clear();
    });
    _saveAndSyncState();
  }

  Future<void> _saveAndSyncState() async {
    // 1. Broadcast clear/undo event to socket
    ref.read(socketServiceProvider).emit('whiteboard_draw', {
      'sessionId': widget.sessionId,
      'elements': _elements.map((e) => e.toJson()).toList(),
    });

    // 2. Persist to API
    try {
      final api = ref.read(apiProvider);
      await api.post(
        ApiConstants.whiteboard(widget.sessionId),
        data: {
          'elements': _elements.map((e) => e.toJson()).toList(),
        },
      );
    } catch (_) {}
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return const Scaffold(
        backgroundColor: AppTheme.background,
        body: Center(child: CircularProgressIndicator()),
      );
    }

    return Scaffold(
      backgroundColor: AppTheme.background,
      appBar: AppBar(
        title: const Text('Real-time Whiteboard'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => context.pop(),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.undo_rounded, color: Colors.white),
            onPressed: _undo,
          ),
          IconButton(
            icon: const Icon(Icons.delete_forever_rounded, color: Colors.redAccent),
            onPressed: _clear,
          ),
        ],
      ),
      body: Column(
        children: [
          // ── Tool controls ─────────────────────────────────────
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
            color: AppTheme.surface,
            child: Row(
              children: [
                // Color Selectors
                _buildColorButton(Colors.cyanAccent),
                _buildColorButton(Colors.pinkAccent),
                _buildColorButton(Colors.amberAccent),
                _buildColorButton(Colors.greenAccent),
                _buildColorButton(Colors.white),
                const Spacer(),
                // Brush size Selector
                Text('Size: ${_strokeWidth.toInt()}', style: const TextStyle(fontSize: 12, color: AppTheme.textSecondary)),
                Slider(
                  value: _strokeWidth,
                  min: 2,
                  max: 12,
                  activeColor: AppTheme.primary,
                  onChanged: (v) => setState(() => _strokeWidth = v),
                ),
              ],
            ),
          ),

          // ── Canvas Board ──────────────────────────────────────
          Expanded(
            child: GestureDetector(
              onPanStart: _onPanStart,
              onPanUpdate: _onPanUpdate,
              onPanEnd: _onPanEnd,
              child: ClipRect(
                child: CustomPaint(
                  painter: CanvasPainter(
                    elements: _elements,
                    currentElement: _currentElement,
                    hexToColor: _hexToColor,
                  ),
                  child: const SizedBox.expand(),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildColorButton(Color color) {
    final isSelected = _color == color;
    return GestureDetector(
      onTap: () => setState(() => _color = color),
      child: Container(
        margin: const EdgeInsets.only(right: 12),
        width: 26,
        height: 26,
        decoration: BoxDecoration(
          color: color,
          shape: BoxShape.circle,
          border: Border.all(
            color: isSelected ? Colors.white : Colors.transparent,
            width: 2,
          ),
          boxShadow: isSelected
              ? [BoxShadow(color: color.withValues(alpha: 0.6), blurRadius: 8, spreadRadius: 1)]
              : null,
        ),
      ),
    );
  }
}

class CanvasPainter extends CustomPainter {
  final List<WhiteboardElementModel> elements;
  final WhiteboardElementModel? currentElement;
  final Color Function(String) hexToColor;

  CanvasPainter({
    required this.elements,
    this.currentElement,
    required this.hexToColor,
  });

  @override
  void paint(Canvas canvas, Size size) {
    // 1. Draw completed database elements
    for (final element in elements) {
      _drawElement(canvas, element);
    }
    
    // 2. Draw current stroke element (being drawn by local user)
    if (currentElement != null) {
      _drawElement(canvas, currentElement!);
    }
  }

  void _drawElement(Canvas canvas, WhiteboardElementModel element) {
    if (element.points.length < 2) return;

    final paint = Paint()
      ..color = hexToColor(element.color)
      ..strokeWidth = element.strokeWidth
      ..strokeCap = StrokeCap.round
      ..strokeJoin = StrokeJoin.round
      ..style = PaintingStyle.stroke;

    final path = Path();
    path.moveTo(element.points.first['x']!, element.points.first['y']!);
    for (int i = 1; i < element.points.length; i++) {
      path.lineTo(element.points[i]['x']!, element.points[i]['y']!);
    }
    
    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(covariant CanvasPainter oldDelegate) => true;
}