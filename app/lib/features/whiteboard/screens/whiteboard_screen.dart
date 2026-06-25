import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class WhiteboardScreen extends ConsumerStatefulWidget {
  final String sessionId;
  const WhiteboardScreen({super.key, required this.sessionId});

  @override
  ConsumerState<WhiteboardScreen> createState() => _WhiteboardScreenState();
}

class _WhiteboardScreenState extends ConsumerState<WhiteboardScreen> {
  final List<Offset> _points = [];
  Color _color = Colors.white;
  double _strokeWidth = 3.0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Whiteboard'),
        actions: [
          IconButton(icon: const Icon(Icons.undo), onPressed: () {}),
          IconButton(icon: const Icon(Icons.delete), onPressed: () {}),
        ],
      ),
      body: Column(
        children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            color: Theme.of(context).colorScheme.surface,
            child: Row(
              children: [
                IconButton(onPressed: () {}, icon: const Icon(Icons.edit)),
                IconButton(onPressed: () {}, icon: const Icon(Icons.circle)),
                IconButton(onPressed: () {}, icon: const Icon(Icons.crop_square)),
                IconButton(onPressed: () {}, icon: const Icon(Icons.text_fields)),
                const Spacer(),
                IconButton(onPressed: () {}, icon: const Icon(Icons.undo)),
                IconButton(onPressed: () {}, icon: const Icon(Icons.delete)),
              ],
            ),
          ),
          Expanded(
            child: GestureDetector(
              onPanUpdate: (details) {
                setState(() => _points.add(details.localPosition));
              },
              onPanEnd: (details) {
                setState(() => _points.clear());
              },
              child: CustomPaint(
                painter: WhiteboardPainter(points: _points, color: _color, strokeWidth: _strokeWidth),
                child: const SizedBox.expand(),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class WhiteboardPainter extends CustomPainter {
  final List<Offset> points;
  final Color color;
  final double strokeWidth;

  WhiteboardPainter({required this.points, required this.color, required this.strokeWidth});

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color
      ..strokeWidth = strokeWidth
      ..strokeCap = StrokeCap.round
      ..style = PaintingStyle.stroke;

    if (points.length >= 2) {
      final path = Path()..moveTo(points.first.dx, points.first.dy);
      for (int i = 1; i < points.length; i++) {
        path.lineTo(points[i].dx, points[i].dy);
      }
      canvas.drawPath(path, paint);
    }
  }

  @override
  bool shouldRepaint(covariant WhiteboardPainter oldDelegate) => true;
}