import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../config/theme.dart';

/// A Text widget that renders with a futuristic, cyberpunk neon glow.
class NeonText extends StatelessWidget {
  final String text;
  final TextStyle? style;
  final Color textColor;
  final Color glowColor;
  final double fontSize;
  final FontWeight fontWeight;
  final double blurRadius;
  final double spread;
  final TextAlign? textAlign;

  const NeonText({
    super.key,
    required this.text,
    this.style,
    this.textColor = Colors.white,
    this.glowColor = AppTheme.primary,
    this.fontSize = 16.0,
    this.fontWeight = FontWeight.normal,
    this.blurRadius = 8.0,
    this.spread = 1.0,
    this.textAlign,
  });

  @override
  Widget build(BuildContext context) {
    final baseStyle = style ??
        GoogleFonts.outfit(
          fontSize: fontSize,
          fontWeight: fontWeight,
          color: textColor,
        );

    final shadows = [
      Shadow(
        color: glowColor.withValues(alpha: 0.8),
        blurRadius: blurRadius,
      ),
      Shadow(
        color: glowColor.withValues(alpha: 0.4),
        blurRadius: blurRadius * 2,
      ),
      Shadow(
        color: glowColor.withValues(alpha: 0.2),
        blurRadius: blurRadius * 3,
      ),
    ];

    return Text(
      text,
      textAlign: textAlign,
      style: baseStyle.copyWith(
        shadows: [
          ...?baseStyle.shadows,
          ...shadows,
        ],
      ),
    );
  }
}
