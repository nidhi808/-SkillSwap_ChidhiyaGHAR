import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

// ═══════════════════════════════════════════════════════════════════
//  SkillSwap Design System — Cyberpunk / Neon HUD Aesthetic
// ═══════════════════════════════════════════════════════════════════

class AppTheme {
  AppTheme._();

  // ── Palette ────────────────────────────────────────────────────
  static const Color background    = Color(0xFF0A0E1A);
  static const Color surface       = Color(0xFF12162B);
  static const Color card          = Color(0xFF1A1F3A);
  static const Color primary       = Color(0xFF6366F1);
  static const Color secondary     = Color(0xFF22D3EE);
  static const Color accent        = Color(0xFFF472B6);
  static const Color success       = Color(0xFF10B981);
  static const Color warning       = Color(0xFFF59E0B);
  static const Color error         = Color(0xFFEF4444);
  static const Color textPrimary   = Color(0xFFF8FAFC);
  static const Color textSecondary = Color(0xFF94A3B8);
  static const Color textTertiary  = Color(0xFF475569);
  static const Color glowPrimary   = Color(0x4D6366F1);
  static const Color glowSecondary = Color(0x4D22D3EE);
  static const Color glowAccent    = Color(0x4DF472B6);
  static const Color border        = Color(0x1A94A3B8);

  // ── Border radii ───────────────────────────────────────────────
  static const double radiusSmall  = 8;
  static const double radiusMedium = 12;
  static const double radiusLarge  = 16;
  static const double radiusXL     = 20;
  static const double radiusPill   = 999;

  // ── Gradients ──────────────────────────────────────────────────
  static const LinearGradient primaryGradient = LinearGradient(
    colors: [primary, secondary],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static const LinearGradient accentGradient = LinearGradient(
    colors: [primary, accent],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static const LinearGradient surfaceGradient = LinearGradient(
    colors: [Color(0xFF12162B), Color(0xFF0A0E1A)],
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
  );

  // ── Neon glow shadows ─────────────────────────────────────────
  static List<BoxShadow> neonGlow(Color color, {double spread = 8, double blur = 20}) => [
    BoxShadow(color: color.withValues(alpha: 0.3), blurRadius: blur, spreadRadius: spread),
    BoxShadow(color: color.withValues(alpha: 0.1), blurRadius: blur * 2, spreadRadius: spread * 0.5),
  ];

  static List<BoxShadow> get primaryGlow => neonGlow(primary);
  static List<BoxShadow> get secondaryGlow => neonGlow(secondary);
  static List<BoxShadow> get accentGlow => neonGlow(accent);

  // ── Glassmorphism decoration ──────────────────────────────────
  static BoxDecoration glassmorphism({
    double borderRadius = radiusLarge,
    Color? bgColor,
    double opacity = 0.08,
    Color borderColor = border,
  }) {
    return BoxDecoration(
      color: (bgColor ?? surface).withValues(alpha: opacity),
      borderRadius: BorderRadius.circular(borderRadius),
      border: Border.all(color: borderColor, width: 1),
    );
  }

  // ── Card decoration ───────────────────────────────────────────
  static BoxDecoration cardDecoration({
    double borderRadius = radiusLarge,
    List<BoxShadow>? glow,
  }) {
    return BoxDecoration(
      color: card,
      borderRadius: BorderRadius.circular(borderRadius),
      border: Border.all(color: border, width: 1),
      boxShadow: glow,
    );
  }

  // ════════════════════════════════════════════════════════════════
  //  DARK THEME
  // ════════════════════════════════════════════════════════════════
  static ThemeData get darkTheme {
    final base = ThemeData.dark(useMaterial3: true);
    return base.copyWith(
      scaffoldBackgroundColor: background,
      colorScheme: const ColorScheme.dark(
        primary: primary,
        secondary: secondary,
        tertiary: accent,
        error: error,
        surface: surface,
        onPrimary: Colors.white,
        onSecondary: Colors.white,
        onSurface: textPrimary,
        outline: border,
      ),
      textTheme: _buildTextTheme(base.textTheme, isDark: true),
      appBarTheme: AppBarTheme(
        backgroundColor: background,
        foregroundColor: textPrimary,
        elevation: 0,
        centerTitle: false,
        titleTextStyle: GoogleFonts.outfit(
          fontSize: 20,
          fontWeight: FontWeight.w600,
          color: textPrimary,
        ),
      ),
      bottomNavigationBarTheme: const BottomNavigationBarThemeData(
        backgroundColor: surface,
        selectedItemColor: primary,
        unselectedItemColor: textTertiary,
        type: BottomNavigationBarType.fixed,
        elevation: 0,
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: primary,
          foregroundColor: Colors.white,
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(radiusMedium)),
          elevation: 8,
          shadowColor: glowPrimary,
          textStyle: GoogleFonts.inter(fontSize: 16, fontWeight: FontWeight.w600),
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: secondary,
          side: const BorderSide(color: secondary),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(radiusMedium)),
          textStyle: GoogleFonts.inter(fontSize: 16, fontWeight: FontWeight.w600),
        ),
      ),
      textButtonTheme: TextButtonThemeData(
        style: TextButton.styleFrom(
          foregroundColor: secondary,
          textStyle: GoogleFonts.inter(fontSize: 14, fontWeight: FontWeight.w500),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: surface,
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(radiusMedium),
          borderSide: const BorderSide(color: border),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(radiusMedium),
          borderSide: const BorderSide(color: border),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(radiusMedium),
          borderSide: const BorderSide(color: primary, width: 1.5),
        ),
        errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(radiusMedium),
          borderSide: const BorderSide(color: error),
        ),
        hintStyle: GoogleFonts.inter(color: textTertiary, fontSize: 14),
        labelStyle: GoogleFonts.inter(color: textSecondary, fontSize: 14),
      ),
      cardTheme: CardThemeData(
        color: card,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(radiusLarge),
          side: const BorderSide(color: border),
        ),
      ),
      chipTheme: ChipThemeData(
        backgroundColor: surface,
        labelStyle: GoogleFonts.inter(fontSize: 12, color: textPrimary),
        side: const BorderSide(color: border),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(radiusSmall)),
      ),
      dividerTheme: const DividerThemeData(color: border, thickness: 1),
      snackBarTheme: SnackBarThemeData(
        backgroundColor: card,
        contentTextStyle: GoogleFonts.inter(color: textPrimary),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(radiusMedium)),
        behavior: SnackBarBehavior.floating,
      ),
      dialogTheme: DialogThemeData(
        backgroundColor: card,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(radiusXL)),
      ),
      bottomSheetTheme: const BottomSheetThemeData(
        backgroundColor: surface,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
        ),
      ),
      useMaterial3: true,
    );
  }

  // ════════════════════════════════════════════════════════════════
  //  LIGHT THEME
  // ════════════════════════════════════════════════════════════════
  static ThemeData get lightTheme {
    final base = ThemeData.light(useMaterial3: true);
    return base.copyWith(
      scaffoldBackgroundColor: const Color(0xFFF8FAFC),
      colorScheme: const ColorScheme.light(
        primary: primary,
        secondary: secondary,
        tertiary: accent,
        error: error,
        surface: Colors.white,
        onPrimary: Colors.white,
        onSecondary: Colors.white,
        onSurface: Color(0xFF0F172A),
        outline: Color(0xFFE2E8F0),
      ),
      textTheme: _buildTextTheme(base.textTheme, isDark: false),
      appBarTheme: AppBarTheme(
        backgroundColor: const Color(0xFFF8FAFC),
        foregroundColor: const Color(0xFF0F172A),
        elevation: 0,
        centerTitle: false,
        titleTextStyle: GoogleFonts.outfit(
          fontSize: 20,
          fontWeight: FontWeight.w600,
          color: const Color(0xFF0F172A),
        ),
      ),
      bottomNavigationBarTheme: const BottomNavigationBarThemeData(
        backgroundColor: Colors.white,
        selectedItemColor: primary,
        unselectedItemColor: Color(0xFF94A3B8),
        type: BottomNavigationBarType.fixed,
        elevation: 0,
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: primary,
          foregroundColor: Colors.white,
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(radiusMedium)),
          elevation: 2,
          textStyle: GoogleFonts.inter(fontSize: 16, fontWeight: FontWeight.w600),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: const Color(0xFFF1F5F9),
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(radiusMedium),
          borderSide: const BorderSide(color: Color(0xFFE2E8F0)),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(radiusMedium),
          borderSide: const BorderSide(color: Color(0xFFE2E8F0)),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(radiusMedium),
          borderSide: const BorderSide(color: primary, width: 1.5),
        ),
        hintStyle: GoogleFonts.inter(color: const Color(0xFF94A3B8), fontSize: 14),
        labelStyle: GoogleFonts.inter(color: const Color(0xFF64748B), fontSize: 14),
      ),
      cardTheme: CardThemeData(
        color: Colors.white,
        elevation: 1,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(radiusLarge),
          side: const BorderSide(color: Color(0xFFE2E8F0)),
        ),
      ),
      useMaterial3: true,
    );
  }

  // ── Text theme helper ─────────────────────────────────────────
  static TextTheme _buildTextTheme(TextTheme base, {required bool isDark}) {
    final onSurface = isDark ? textPrimary : const Color(0xFF0F172A);
    final muted     = isDark ? textSecondary : const Color(0xFF64748B);
    return base.copyWith(
      displayLarge:  GoogleFonts.outfit(fontSize: 32, fontWeight: FontWeight.bold, color: onSurface),
      displayMedium: GoogleFonts.outfit(fontSize: 24, fontWeight: FontWeight.w600, color: onSurface),
      displaySmall:  GoogleFonts.outfit(fontSize: 20, fontWeight: FontWeight.w600, color: onSurface),
      headlineMedium:GoogleFonts.outfit(fontSize: 18, fontWeight: FontWeight.w600, color: onSurface),
      titleLarge:    GoogleFonts.inter(fontSize: 16, fontWeight: FontWeight.w600, color: onSurface),
      titleMedium:   GoogleFonts.inter(fontSize: 14, fontWeight: FontWeight.w600, color: onSurface),
      bodyLarge:     GoogleFonts.inter(fontSize: 16, fontWeight: FontWeight.normal, color: onSurface),
      bodyMedium:    GoogleFonts.inter(fontSize: 14, fontWeight: FontWeight.normal, color: onSurface),
      bodySmall:     GoogleFonts.inter(fontSize: 12, fontWeight: FontWeight.normal, color: muted),
      labelLarge:    GoogleFonts.inter(fontSize: 14, fontWeight: FontWeight.w600, color: onSurface),
      labelMedium:   GoogleFonts.inter(fontSize: 12, fontWeight: FontWeight.w500, color: muted),
      labelSmall:    GoogleFonts.inter(fontSize: 10, fontWeight: FontWeight.w500, letterSpacing: 1.2, color: muted),
    );
  }
}
