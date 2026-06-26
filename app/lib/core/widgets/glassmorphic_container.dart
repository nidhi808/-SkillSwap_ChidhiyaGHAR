import 'dart:ui';
import 'package:flutter/material.dart';
import '../../config/theme.dart';

/// Reusable Glassmorphic container mimicking a frosted glass look.
/// Perfect for cyberpunk HUDS, cards, and custom modals.
class GlassmorphicContainer extends StatelessWidget {
  final Widget child;
  final double blur;
  final double opacity;
  final double borderRadius;
  final Color? bgColor;
  final Color borderColor;
  final double borderWidth;
  final EdgeInsetsGeometry? padding;
  final EdgeInsetsGeometry? margin;
  final double? width;
  final double? height;
  final Clip clipBehavior;
  final BoxShape shape;
  final List<BoxShadow>? shadow;

  const GlassmorphicContainer({
    super.key,
    required this.child,
    this.blur = 15.0,
    this.opacity = 0.08,
    this.borderRadius = AppTheme.radiusLarge,
    this.bgColor,
    this.borderColor = AppTheme.border,
    this.borderWidth = 1.0,
    this.padding,
    this.margin,
    this.width,
    this.height,
    this.clipBehavior = Clip.antiAlias,
    this.shape = BoxShape.rectangle,
    this.shadow,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: width,
      height: height,
      margin: margin,
      decoration: BoxDecoration(
        shape: shape,
        borderRadius: shape == BoxShape.rectangle
            ? BorderRadius.circular(borderRadius)
            : null,
        boxShadow: shadow,
      ),
      child: ClipRRect(
        borderRadius: shape == BoxShape.rectangle
            ? BorderRadius.circular(borderRadius)
            : BorderRadius.zero,
        clipBehavior: clipBehavior,
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: blur, sigmaY: blur),
          child: Container(
            padding: padding,
            decoration: BoxDecoration(
              shape: shape,
              borderRadius: shape == BoxShape.rectangle
                  ? BorderRadius.circular(borderRadius)
                  : null,
              color: (bgColor ?? AppTheme.surface).withValues(alpha: opacity),
              border: Border.all(
                color: borderColor,
                width: borderWidth,
              ),
            ),
            child: child,
          ),
        ),
      ),
    );
  }
}
