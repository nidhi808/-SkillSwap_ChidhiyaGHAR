import 'package:flutter/material.dart';
import '../../config/theme.dart';

/// Cyberpunk-styled skill tag chip with category color accent.
class SkillTagChip extends StatelessWidget {
  final String label;
  final Color? color;
  final VoidCallback? onTap;
  final VoidCallback? onRemove;
  final bool selected;

  const SkillTagChip({
    super.key,
    required this.label,
    this.color,
    this.onTap,
    this.onRemove,
    this.selected = false,
  });

  @override
  Widget build(BuildContext context) {
    final chipColor = color ?? AppTheme.primary;
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
        decoration: BoxDecoration(
          color: selected
              ? chipColor.withValues(alpha: 0.2)
              : (isDark ? AppTheme.surface : const Color(0xFFF1F5F9)),
          borderRadius: BorderRadius.circular(AppTheme.radiusSmall),
          border: Border.all(
            color: selected ? chipColor : AppTheme.border,
            width: 1,
          ),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            if (selected)
              Padding(
                padding: const EdgeInsets.only(right: 4),
                child: Icon(Icons.check, size: 14, color: chipColor),
              ),
            Text(
              label,
              style: TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.w500,
                color: selected ? chipColor : AppTheme.textSecondary,
              ),
            ),
            if (onRemove != null) ...[
              const SizedBox(width: 4),
              GestureDetector(
                onTap: onRemove,
                child: Icon(Icons.close, size: 14, color: AppTheme.textTertiary),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
