import 'package:flutter/material.dart';
import '../../../config/theme.dart';
import '../../../core/widgets/app_card.dart';
import '../../../core/widgets/app_avatar.dart';

/// Upcoming session card with partner avatar and join placeholder.
class UpcomingSessionCard extends StatelessWidget {
  const UpcomingSessionCard({super.key});

  @override
  Widget build(BuildContext context) {
    // Placeholder — will be populated by sessions provider in Phase 3
    return AppCard(
      glassmorphism: true,
      child: Row(
        children: [
          const AppAvatar(
            radius: 24,
            name: 'Session Partner',
            glowColor: AppTheme.secondary,
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'No upcoming sessions',
                  style: Theme.of(context).textTheme.titleMedium,
                ),
                const SizedBox(height: 4),
                Text(
                  'Schedule a session with a match to get started',
                  style: Theme.of(context).textTheme.bodySmall,
                ),
              ],
            ),
          ),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            decoration: BoxDecoration(
              color: AppTheme.primary.withValues(alpha: 0.15),
              borderRadius: BorderRadius.circular(AppTheme.radiusSmall),
            ),
            child: const Text(
              'Browse',
              style: TextStyle(color: AppTheme.primary, fontSize: 12, fontWeight: FontWeight.w600),
            ),
          ),
        ],
      ),
    );
  }
}
