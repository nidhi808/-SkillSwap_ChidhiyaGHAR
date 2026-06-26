import 'package:flutter/material.dart';
import '../../config/theme.dart';

/// Themed snackbar with icon, color-coded variants, and neon styling.
class AppSnackbar {
  static void show(
    BuildContext context, {
    required String message,
    SnackbarType type = SnackbarType.info,
    Duration duration = const Duration(seconds: 3),
  }) {
    final (color, icon) = switch (type) {
      SnackbarType.success => (AppTheme.success, Icons.check_circle_rounded),
      SnackbarType.error   => (AppTheme.error,   Icons.error_rounded),
      SnackbarType.warning => (AppTheme.warning,  Icons.warning_rounded),
      SnackbarType.info    => (AppTheme.secondary,Icons.info_rounded),
    };

    ScaffoldMessenger.of(context).hideCurrentSnackBar();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Row(
          children: [
            Icon(icon, color: color, size: 22),
            const SizedBox(width: 12),
            Expanded(
              child: Text(
                message,
                style: const TextStyle(color: AppTheme.textPrimary, fontSize: 14),
              ),
            ),
          ],
        ),
        backgroundColor: AppTheme.card,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(AppTheme.radiusMedium),
          side: BorderSide(color: color.withValues(alpha: 0.3)),
        ),
        duration: duration,
        margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      ),
    );
  }
}

enum SnackbarType { success, error, warning, info }
