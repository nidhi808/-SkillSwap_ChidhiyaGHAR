import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:flutter_staggered_animations/flutter_staggered_animations.dart';
import 'package:go_router/go_router.dart';
import '../../../config/theme.dart';
import '../../../core/providers/auth_provider.dart';
import '../../../core/providers/profile_provider.dart';
import '../../../core/widgets/app_avatar.dart';
import '../../../core/widgets/app_card.dart';
import '../../../core/widgets/app_shimmer_list.dart';
import '../widgets/stat_card.dart';
import '../widgets/upcoming_session_card.dart';
import '../widgets/activity_feed_item.dart';
import '../widgets/match_suggestion_chip.dart';

class HomeScreen extends ConsumerWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final authState = ref.watch(authProvider);
    final profileAsync = ref.watch(myProfileProvider);
    final profile = profileAsync.valueOrNull ?? authState.profile;

    return Scaffold(
      body: RefreshIndicator(
        onRefresh: () => ref.read(myProfileProvider.notifier).refresh(),
        color: AppTheme.primary,
        child: CustomScrollView(
          slivers: [
            // ── App bar ──────────────────────────────────────
            SliverAppBar(
              floating: true,
              snap: true,
              title: ShaderMask(
                shaderCallback: (bounds) => AppTheme.primaryGradient.createShader(bounds),
                child: Text(
                  'SkillSwap',
                  style: Theme.of(context).textTheme.displaySmall?.copyWith(color: Colors.white),
                ),
              ),
              actions: [
                IconButton(
                  onPressed: () => context.push('/notifications'),
                  icon: const Icon(Icons.notifications_outlined),
                ),
                Padding(
                  padding: const EdgeInsets.only(right: 12),
                  child: GestureDetector(
                    onTap: () => context.go('/profile'),
                    child: AppAvatar(
                      imageUrl: profile?.avatarUrl,
                      name: profile?.fullName,
                      radius: 18,
                      glowColor: AppTheme.primary,
                    ),
                  ),
                ),
              ],
            ),

            // ── Content ──────────────────────────────────────
            SliverPadding(
              padding: const EdgeInsets.all(16),
              sliver: SliverList(
                delegate: SliverChildListDelegate([
                  // ── Greeting banner ─────────────────────────
                  _GreetingBanner(name: profile?.fullName)
                      .animate().fadeIn(duration: 400.ms).slideY(begin: 0.1, end: 0),

                  const SizedBox(height: 20),

                  // ── Stats row ───────────────────────────────
                  AnimationLimiter(
                    child: Row(
                      children: [
                        Expanded(
                          child: AnimationConfiguration.staggeredList(
                            position: 0,
                            duration: const Duration(milliseconds: 400),
                            child: SlideAnimation(
                              verticalOffset: 30,
                              child: FadeInAnimation(
                                child: StatCard(
                                  title: 'Sessions',
                                  value: profile?.totalSessions ?? 0,
                                  icon: Icons.videocam_rounded,
                                  color: AppTheme.primary,
                                ),
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: AnimationConfiguration.staggeredList(
                            position: 1,
                            duration: const Duration(milliseconds: 400),
                            child: SlideAnimation(
                              verticalOffset: 30,
                              child: FadeInAnimation(
                                child: StatCard(
                                  title: 'Hours',
                                  value: (profile?.teachingHours ?? 0).toInt() + (profile?.learningHours ?? 0).toInt(),
                                  icon: Icons.schedule_rounded,
                                  color: AppTheme.secondary,
                                ),
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),

                  const SizedBox(height: 12),

                  AnimationLimiter(
                    child: Row(
                      children: [
                        Expanded(
                          child: AnimationConfiguration.staggeredList(
                            position: 2,
                            duration: const Duration(milliseconds: 400),
                            child: SlideAnimation(
                              verticalOffset: 30,
                              child: FadeInAnimation(
                                child: StatCard(
                                  title: 'Reputation',
                                  value: profile?.reputationPoints ?? 100,
                                  icon: Icons.star_rounded,
                                  color: AppTheme.warning,
                                ),
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: AnimationConfiguration.staggeredList(
                            position: 3,
                            duration: const Duration(milliseconds: 400),
                            child: SlideAnimation(
                              verticalOffset: 30,
                              child: FadeInAnimation(
                                child: StatCard(
                                  title: 'Rating',
                                  value: profile?.avgRating ?? 0,
                                  icon: Icons.thumb_up_rounded,
                                  color: AppTheme.success,
                                  isDouble: true,
                                ),
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),

                  const SizedBox(height: 28),

                  // ── Match Suggestions ───────────────────────
                  _SectionHeader(
                    title: 'Suggested Matches',
                    onSeeAll: () => context.go('/matching'),
                  ).animate(delay: 400.ms).fadeIn(),
                  const SizedBox(height: 12),
                  SizedBox(
                    height: 100,
                    child: ListView.separated(
                      scrollDirection: Axis.horizontal,
                      itemCount: 3,
                      separatorBuilder: (_, __) => const SizedBox(width: 12),
                      itemBuilder: (_, i) => MatchSuggestionChip(index: i),
                    ),
                  ).animate(delay: 500.ms).fadeIn().slideX(begin: 0.1, end: 0),

                  const SizedBox(height: 28),

                  // ── Upcoming sessions ───────────────────────
                  _SectionHeader(
                    title: 'Upcoming Sessions',
                    onSeeAll: () => context.go('/sessions'),
                  ).animate(delay: 600.ms).fadeIn(),
                  const SizedBox(height: 12),
                  const UpcomingSessionCard()
                      .animate(delay: 700.ms).fadeIn().slideY(begin: 0.1, end: 0),

                  const SizedBox(height: 28),

                  // ── Recent activity ─────────────────────────
                  _SectionHeader(title: 'Recent Activity')
                      .animate(delay: 800.ms).fadeIn(),
                  const SizedBox(height: 12),
                  ...List.generate(3, (i) {
                    return ActivityFeedItem(index: i)
                        .animate(delay: Duration(milliseconds: 900 + i * 100))
                        .fadeIn()
                        .slideX(begin: 0.05, end: 0);
                  }),

                  const SizedBox(height: 80),
                ]),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// ═══════════════════════════════════════════════════════════════════
//  Private helpers
// ═══════════════════════════════════════════════════════════════════

class _GreetingBanner extends StatelessWidget {
  final String? name;
  const _GreetingBanner({this.name});

  String get _greeting {
    final hour = DateTime.now().hour;
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }

  @override
  Widget build(BuildContext context) {
    return AppCard(
      glassmorphism: true,
      glow: AppTheme.neonGlow(AppTheme.primary, spread: 4, blur: 15),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  '$_greeting${name != null ? ',' : '!'} 👋',
                  style: Theme.of(context).textTheme.bodyLarge?.copyWith(color: AppTheme.textSecondary),
                ),
                const SizedBox(height: 4),
                Text(
                  name ?? 'Learner',
                  style: Theme.of(context).textTheme.displayMedium,
                ),
                const SizedBox(height: 8),
                Text(
                  'Ready to learn something new today?',
                  style: Theme.of(context).textTheme.bodySmall,
                ),
              ],
            ),
          ),
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              gradient: AppTheme.primaryGradient,
            ),
            child: const Icon(Icons.school_rounded, color: Colors.white, size: 28),
          ),
        ],
      ),
    );
  }
}

class _SectionHeader extends StatelessWidget {
  final String title;
  final VoidCallback? onSeeAll;
  const _SectionHeader({required this.title, this.onSeeAll});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(title, style: Theme.of(context).textTheme.headlineMedium),
        if (onSeeAll != null)
          TextButton(
            onPressed: onSeeAll,
            child: const Text('See All'),
          ),
      ],
    );
  }
}
