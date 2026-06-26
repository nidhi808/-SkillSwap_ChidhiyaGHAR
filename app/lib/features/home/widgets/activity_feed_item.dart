import 'package:flutter/material.dart';
import '../../../config/theme.dart';
import '../../../core/widgets/app_avatar.dart';

/// Activity feed item with avatar and action text.
class ActivityFeedItem extends StatelessWidget {
  final int index;
  const ActivityFeedItem({super.key, required this.index});

  static const _placeholders = [
    ('Earned a new badge! 🎖️', '2h ago'),
    ('Completed a session on Python', '5h ago'),
    ('Matched with a Flutter developer', '1d ago'),
  ];

  @override
  Widget build(BuildContext context) {
    final (text, time) = _placeholders[index % _placeholders.length];

    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Row(
        children: [
          AppAvatar(
            radius: 18,
            name: 'User ${index + 1}',
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  text,
                  style: Theme.of(context).textTheme.bodyMedium,
                ),
                const SizedBox(height: 2),
                Text(
                  time,
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: AppTheme.textTertiary,
                  ),
                ),
              ],
            ),
          ),
          const Icon(Icons.chevron_right_rounded, color: AppTheme.textTertiary, size: 20),
        ],
      ),
    );
  }
}
