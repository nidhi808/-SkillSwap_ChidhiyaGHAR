import 'dart:ui';
import 'package:flutter/material.dart';
import '../../config/theme.dart';

/// Glassmorphic card with frosted glass effect, neon border option,
/// and tap scale animation.
class AppCard extends StatefulWidget {
  final Widget child;
  final EdgeInsetsGeometry? padding;
  final VoidCallback? onTap;
  final Color? color;
  final bool glassmorphism;
  final List<BoxShadow>? glow;
  final double borderRadius;

  const AppCard({
    super.key,
    required this.child,
    this.padding,
    this.onTap,
    this.color,
    this.glassmorphism = false,
    this.glow,
    this.borderRadius = AppTheme.radiusLarge,
  });

  @override
  State<AppCard> createState() => _AppCardState();
}

class _AppCardState extends State<AppCard> with SingleTickerProviderStateMixin {
  late AnimationController _ctrl;
  late Animation<double> _scale;

  @override
  void initState() {
    super.initState();
    _ctrl = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 100),
    );
    _scale = Tween<double>(begin: 1.0, end: 0.97).animate(
      CurvedAnimation(parent: _ctrl, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _ctrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    Widget card;
    if (widget.glassmorphism) {
      card = ClipRRect(
        borderRadius: BorderRadius.circular(widget.borderRadius),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 20, sigmaY: 20),
          child: Container(
            padding: widget.padding ?? const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: (widget.color ?? (isDark ? AppTheme.surface : Colors.white))
                  .withValues(alpha: isDark ? 0.4 : 0.7),
              borderRadius: BorderRadius.circular(widget.borderRadius),
              border: Border.all(
                color: isDark ? AppTheme.border : const Color(0xFFE2E8F0),
                width: 1,
              ),
              boxShadow: widget.glow,
            ),
            child: widget.child,
          ),
        ),
      );
    } else {
      card = Container(
        padding: widget.padding ?? const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: widget.color ?? (isDark ? AppTheme.card : Colors.white),
          borderRadius: BorderRadius.circular(widget.borderRadius),
          border: Border.all(
            color: isDark ? AppTheme.border : const Color(0xFFE2E8F0),
            width: 1,
          ),
          boxShadow: widget.glow,
        ),
        child: widget.child,
      );
    }

    if (widget.onTap == null) return card;

    return GestureDetector(
      onTapDown: (_) => _ctrl.forward(),
      onTapUp: (_) => _ctrl.reverse(),
      onTapCancel: () => _ctrl.reverse(),
      onTap: widget.onTap,
      child: ScaleTransition(scale: _scale, child: card),
    );
  }
}
