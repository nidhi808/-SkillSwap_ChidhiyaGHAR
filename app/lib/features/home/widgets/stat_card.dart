import 'package:flutter/material.dart';
import '../../../config/theme.dart';
import '../../../core/widgets/app_card.dart';

/// Glassmorphic stat card with animated counter and neon icon glow.
class StatCard extends StatefulWidget {
  final String title;
  final num value;
  final IconData icon;
  final Color color;
  final bool isDouble;

  const StatCard({
    super.key,
    required this.title,
    required this.value,
    required this.icon,
    required this.color,
    this.isDouble = false,
  });

  @override
  State<StatCard> createState() => _StatCardState();
}

class _StatCardState extends State<StatCard> with SingleTickerProviderStateMixin {
  late AnimationController _ctrl;
  late Animation<double> _countAnim;

  @override
  void initState() {
    super.initState();
    _ctrl = AnimationController(vsync: this, duration: const Duration(milliseconds: 1200));
    _countAnim = Tween<double>(begin: 0, end: widget.value.toDouble()).animate(
      CurvedAnimation(parent: _ctrl, curve: Curves.easeOut),
    );
    _ctrl.forward();
  }

  @override
  void didUpdateWidget(covariant StatCard oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.value != widget.value) {
      _countAnim = Tween<double>(begin: 0, end: widget.value.toDouble()).animate(
        CurvedAnimation(parent: _ctrl, curve: Curves.easeOut),
      );
      _ctrl
        ..reset()
        ..forward();
    }
  }

  @override
  void dispose() {
    _ctrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AppCard(
      glassmorphism: true,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: widget.color.withValues(alpha: 0.15),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Icon(widget.icon, color: widget.color, size: 20),
          ),
          const SizedBox(height: 12),
          AnimatedBuilder(
            animation: _countAnim,
            builder: (_, __) {
              final v = _countAnim.value;
              return Text(
                widget.isDouble ? v.toStringAsFixed(1) : v.toInt().toString(),
                style: Theme.of(context).textTheme.displayMedium?.copyWith(
                  color: widget.color,
                ),
              );
            },
          ),
          const SizedBox(height: 2),
          Text(
            widget.title,
            style: Theme.of(context).textTheme.bodySmall,
          ),
        ],
      ),
    );
  }
}
