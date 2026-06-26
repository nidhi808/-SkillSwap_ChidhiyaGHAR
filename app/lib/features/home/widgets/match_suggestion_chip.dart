import 'package:flutter/material.dart';
import '../../../config/theme.dart';
import '../../../core/widgets/app_card.dart';
import '../../../core/widgets/app_avatar.dart';

/// Compact match suggestion chip for horizontal scroll.
class MatchSuggestionChip extends StatelessWidget {
  final int index;
  const MatchSuggestionChip({super.key, required this.index});

  static const _placeholders = [
    ('Alex Chen', 'Python · React', 92),
    ('Maria Lopez', 'Flutter · UI/UX', 87),
    ('James Park', 'Node.js · AWS', 81),
  ];

  @override
  Widget build(BuildContext context) {
    final (name, skills, score) = _placeholders[index % _placeholders.length];

    return AppCard(
      glassmorphism: true,
      padding: const EdgeInsets.all(12),
      child: SizedBox(
        width: 140,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Row(
              children: [
                AppAvatar(radius: 16, name: name, glowColor: AppTheme.secondary),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    name,
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(fontSize: 13),
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Text(
              skills,
              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                color: AppTheme.textSecondary,
                fontSize: 11,
              ),
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            ),
            const SizedBox(height: 6),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
              decoration: BoxDecoration(
                color: AppTheme.success.withValues(alpha: 0.15),
                borderRadius: BorderRadius.circular(4),
              ),
              child: Text(
                '$score% match',
                style: const TextStyle(color: AppTheme.success, fontSize: 11, fontWeight: FontWeight.w600),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
