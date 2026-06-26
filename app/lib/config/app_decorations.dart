import 'package:flutter/material.dart';
import 'theme.dart';

/// Reusable cyberpunk & glassmorphic box decorations.
/// Provides visual effects like neon glows, grid overlays, frosted glass panels,
/// and HUD border details.
class AppDecorations {
  AppDecorations._();

  /// A linear dark neon background that stretches from top-center to bottom-center.
  static BoxDecoration get radialBackground {
    return const BoxDecoration(
      gradient: RadialGradient(
        center: Alignment(0.0, -0.5),
        radius: 1.2,
        colors: [
          Color(0xFF141A33), // Slightly brighter deep navy/violet center
          AppTheme.background,
        ],
        stops: [0.0, 1.0],
      ),
    );
  }

  /// Neon glow decoration for panels.
  static BoxDecoration neonBorderGlow({
    required Color glowColor,
    double borderRadius = AppTheme.radiusLarge,
    Color fillColor = AppTheme.surface,
  }) {
    return BoxDecoration(
      color: fillColor,
      borderRadius: BorderRadius.circular(borderRadius),
      border: Border.all(color: glowColor.withValues(alpha: 0.6), width: 1.5),
      boxShadow: [
        BoxShadow(
          color: glowColor.withValues(alpha: 0.25),
          blurRadius: 12,
          spreadRadius: 2,
        ),
        BoxShadow(
          color: glowColor.withValues(alpha: 0.1),
          blurRadius: 24,
          spreadRadius: 4,
        ),
      ],
    );
  }

  /// Cyberpunk HUD panel with accent corners.
  static BoxDecoration hudPanel({
    Color borderColor = AppTheme.border,
    double borderRadius = AppTheme.radiusMedium,
    Color fillColor = AppTheme.surface,
  }) {
    return BoxDecoration(
      color: fillColor,
      borderRadius: BorderRadius.circular(borderRadius),
      border: Border.all(color: borderColor, width: 1),
    );
  }

  /// Frosted glass container with high blur and subtle neon edge.
  static BoxDecoration frostedGlass({
    double opacity = 0.07,
    double borderRadius = AppTheme.radiusLarge,
    Color borderColor = AppTheme.border,
    Color? bgColor,
  }) {
    return BoxDecoration(
      color: (bgColor ?? AppTheme.surface).withValues(alpha: opacity),
      borderRadius: BorderRadius.circular(borderRadius),
      border: Border.all(
        color: borderColor,
        width: 1.2,
      ),
    );
  }

  /// Cyberpunk button gradient decoration.
  static BoxDecoration primaryButton = BoxDecoration(
    gradient: AppTheme.primaryGradient,
    borderRadius: BorderRadius.circular(AppTheme.radiusMedium),
    boxShadow: [
      BoxShadow(
        color: AppTheme.primary.withValues(alpha: 0.4),
        blurRadius: 10,
        offset: const Offset(0, 4),
      ),
    ],
  );

  /// Secondary cyber button decoration.
  static BoxDecoration secondaryButton = BoxDecoration(
    borderRadius: BorderRadius.circular(AppTheme.radiusMedium),
    border: Border.all(
      color: AppTheme.secondary,
      width: 1.5,
    ),
    boxShadow: [
      BoxShadow(
        color: AppTheme.secondary.withValues(alpha: 0.15),
        blurRadius: 8,
        offset: const Offset(0, 2),
      ),
    ],
  );
}

/// A CustomPainter that draws futuristic Cyberpunk HUD corner indicators
/// around a box or card.
class HudCornerPainter extends CustomPainter {
  final Color cornerColor;
  final double cornerLength;
  final double strokeWidth;

  HudCornerPainter({
    required this.cornerColor,
    this.cornerLength = 16.0,
    this.strokeWidth = 2.0,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = cornerColor
      ..strokeWidth = strokeWidth
      ..style = PaintingStyle.stroke;

    final w = size.width;
    final h = size.height;

    // Top-Left corner
    canvas.drawLine(const Offset(0, 0), Offset(cornerLength, 0), paint);
    canvas.drawLine(const Offset(0, 0), Offset(0, cornerLength), paint);

    // Top-Right corner
    canvas.drawLine(Offset(w, 0), Offset(w - cornerLength, 0), paint);
    canvas.drawLine(Offset(w, 0), Offset(w, cornerLength), paint);

    // Bottom-Left corner
    canvas.drawLine(Offset(0, h), Offset(cornerLength, h), paint);
    canvas.drawLine(Offset(0, h), Offset(0, h - cornerLength), paint);

    // Bottom-Right corner
    canvas.drawLine(Offset(w, h), Offset(w - cornerLength, h), paint);
    canvas.drawLine(Offset(w, h), Offset(w, h - cornerLength), paint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
