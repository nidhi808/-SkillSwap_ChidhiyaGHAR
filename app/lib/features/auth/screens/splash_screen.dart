import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:go_router/go_router.dart';
import '../../../config/theme.dart';
import '../../../core/providers/auth_provider.dart';
import '../../../core/services/storage_service.dart';

class SplashScreen extends ConsumerStatefulWidget {
  const SplashScreen({super.key});

  @override
  ConsumerState<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends ConsumerState<SplashScreen> {
  @override
  void initState() {
    super.initState();
    _init();
  }

  Future<void> _init() async {
    // Allow splash animation to play
    await Future.delayed(const Duration(milliseconds: 2200));
    if (!mounted) return;

    // Try auto-login
    await ref.read(authProvider.notifier).checkAuth();
    if (!mounted) return;

    final authState = ref.read(authProvider);
    final storage = ref.read(storageServiceProvider);

    if (authState.isAuthenticated) {
      final onboarded = await storage.isOnboardingComplete();
      if (!mounted) return;
      context.go(onboarded ? '/home' : '/onboarding');
    } else {
      context.go('/login');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        width: double.infinity,
        height: double.infinity,
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [AppTheme.background, Color(0xFF0F1629)],
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
          ),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // ── Animated logo icon ──────────────────────────────
            Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                gradient: AppTheme.primaryGradient,
                boxShadow: AppTheme.neonGlow(AppTheme.primary, spread: 10, blur: 30),
              ),
              child: const Icon(
                Icons.swap_horiz_rounded,
                size: 56,
                color: Colors.white,
              ),
            )
                .animate()
                .scale(
                  begin: const Offset(0.5, 0.5),
                  end: const Offset(1.0, 1.0),
                  duration: 600.ms,
                  curve: Curves.elasticOut,
                )
                .fadeIn(duration: 400.ms),

            const SizedBox(height: 32),

            // ── Title ───────────────────────────────────────────
            ShaderMask(
              shaderCallback: (bounds) => AppTheme.primaryGradient.createShader(bounds),
              child: Text(
                'SkillSwap',
                style: Theme.of(context).textTheme.displayLarge?.copyWith(
                  color: Colors.white,
                  fontSize: 40,
                  letterSpacing: -1,
                ),
              ),
            )
                .animate(delay: 300.ms)
                .fadeIn(duration: 500.ms)
                .slideY(begin: 0.2, end: 0, duration: 500.ms),

            const SizedBox(height: 8),

            Text(
              'ChidhiyaGHAR',
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                color: AppTheme.textSecondary,
                letterSpacing: 4,
              ),
            )
                .animate(delay: 600.ms)
                .fadeIn(duration: 500.ms),

            const SizedBox(height: 48),

            // ── Loading indicator ───────────────────────────────
            SizedBox(
              width: 32,
              height: 32,
              child: CircularProgressIndicator(
                strokeWidth: 2,
                color: AppTheme.primary.withValues(alpha: 0.5),
              ),
            )
                .animate(delay: 800.ms)
                .fadeIn(duration: 400.ms),
          ],
        ),
      ),
    );
  }
}
