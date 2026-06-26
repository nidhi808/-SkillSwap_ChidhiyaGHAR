import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:go_router/go_router.dart';
import '../../../config/theme.dart';
import '../../../core/services/storage_service.dart';

class OnboardingScreen extends ConsumerStatefulWidget {
  const OnboardingScreen({super.key});

  @override
  ConsumerState<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends ConsumerState<OnboardingScreen> {
  final _pageCtrl = PageController();
  int _currentPage = 0;

  static const _pages = [
    _OnboardingPageData(
      icon: Icons.explore_rounded,
      gradient: [AppTheme.primary, Color(0xFF818CF8)],
      title: 'Discover Skills',
      subtitle: 'Browse thousands of skills from coding to cooking.\nFind exactly what you want to learn.',
    ),
    _OnboardingPageData(
      icon: Icons.swap_horiz_rounded,
      gradient: [AppTheme.secondary, Color(0xFF67E8F9)],
      title: 'Match & Connect',
      subtitle: 'Our AI engine finds the perfect skill swap partner.\nSwipe to accept and start exchanging.',
    ),
    _OnboardingPageData(
      icon: Icons.videocam_rounded,
      gradient: [AppTheme.accent, Color(0xFFF9A8D4)],
      title: 'Learn Together',
      subtitle: 'Join live video sessions with whiteboard & chat.\nTeach what you know, learn what you love.',
    ),
  ];

  void _next() {
    if (_currentPage < _pages.length - 1) {
      _pageCtrl.nextPage(duration: 400.ms, curve: Curves.easeInOut);
    } else {
      context.go('/skill-setup');
    }
  }

  void _skip() => context.go('/skill-setup');

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [AppTheme.background, Color(0xFF0F1629)],
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
          ),
        ),
        child: SafeArea(
          child: Column(
            children: [
              Align(
                alignment: Alignment.topRight,
                child: TextButton(onPressed: _skip, child: const Text('Skip')),
              ),
              Expanded(
                child: PageView.builder(
                  controller: _pageCtrl,
                  onPageChanged: (i) => setState(() => _currentPage = i),
                  itemCount: _pages.length,
                  itemBuilder: (_, i) => _OnboardingPage(data: _pages[i]),
                ),
              ),
              Padding(
                padding: const EdgeInsets.fromLTRB(24, 0, 24, 32),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      children: List.generate(_pages.length, (i) {
                        final isActive = i == _currentPage;
                        return AnimatedContainer(
                          duration: 300.ms,
                          width: isActive ? 32 : 8,
                          height: 8,
                          margin: const EdgeInsets.only(right: 6),
                          decoration: BoxDecoration(
                            color: isActive ? AppTheme.primary : AppTheme.textTertiary,
                            borderRadius: BorderRadius.circular(4),
                          ),
                        );
                      }),
                    ),
                    GestureDetector(
                      onTap: _next,
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
                        decoration: BoxDecoration(
                          gradient: AppTheme.primaryGradient,
                          borderRadius: BorderRadius.circular(AppTheme.radiusMedium),
                          boxShadow: AppTheme.neonGlow(AppTheme.primary, spread: 4, blur: 12),
                        ),
                        child: Text(
                          _currentPage == _pages.length - 1 ? 'Get Started' : 'Next',
                          style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w600, fontSize: 16),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _OnboardingPageData {
  final IconData icon;
  final List<Color> gradient;
  final String title;
  final String subtitle;
  const _OnboardingPageData({required this.icon, required this.gradient, required this.title, required this.subtitle});
}

class _OnboardingPage extends StatelessWidget {
  final _OnboardingPageData data;
  const _OnboardingPage({required this.data});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 32),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            padding: const EdgeInsets.all(32),
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              gradient: LinearGradient(colors: data.gradient),
              boxShadow: AppTheme.neonGlow(data.gradient[0], spread: 12, blur: 30),
            ),
            child: Icon(data.icon, size: 64, color: Colors.white),
          ).animate().scale(begin: const Offset(0.6, 0.6), duration: 600.ms, curve: Curves.elasticOut).fadeIn(duration: 400.ms),
          const SizedBox(height: 48),
          Text(data.title, style: Theme.of(context).textTheme.displayLarge?.copyWith(fontSize: 28), textAlign: TextAlign.center)
              .animate(delay: 200.ms).fadeIn().slideY(begin: 0.2, end: 0),
          const SizedBox(height: 16),
          Text(data.subtitle, style: Theme.of(context).textTheme.bodyLarge?.copyWith(color: AppTheme.textSecondary, height: 1.6), textAlign: TextAlign.center)
              .animate(delay: 400.ms).fadeIn().slideY(begin: 0.1, end: 0),
        ],
      ),
    );
  }
}
