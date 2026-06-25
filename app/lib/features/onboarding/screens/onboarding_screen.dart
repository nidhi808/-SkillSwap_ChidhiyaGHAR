import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/services/storage_service.dart';
import '../../../core/providers/providers.dart';

class OnboardingScreen extends ConsumerStatefulWidget {
  const OnboardingScreen({super.key});

  @override
  ConsumerState<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends ConsumerState<OnboardingScreen> {
  final PageController _controller = PageController();
  int _page = 0;

  void _next() {
    if (_page < 2) {
      _controller.nextPage(duration: const Duration(milliseconds: 300), curve: Curves.easeInOut);
      setState(() => _page++);
    } else {
      _finish();
    }
  }

  Future<void> _finish() async {
    await ref.read(storageServiceProvider).setOnboardingComplete(true);
    if (!mounted) return;
    Navigator.of(context).pushReplacementNamed('/home');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: PageView(
        controller: _controller,
        onPageChanged: (i) => setState(() => _page = i),
        children: [
          _buildPage(context, 'Discover Skills', 'Find teachers and learners in your area.', Icons.search),
          _buildPage(context, 'Match & Connect', 'AI-powered matching for the perfect learning pair.', Icons.people),
          _buildPage(context, 'Learn Together', 'Video sessions, whiteboard, screen share.', Icons.video_call),
        ],
      ),
      bottomNavigationBar: Padding(
        padding: const EdgeInsets.all(24),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            _buildDots(),
            ElevatedButton(onPressed: _next, child: Text(_page == 2 ? 'Get Started' : 'Next')),
          ],
        ),
      ),
    );
  }

  Widget _buildDots() {
    return Row(
      children: List.generate(3, (i) {
        final active = _page == i;
        return AnimatedContainer(duration: const Duration(milliseconds: 300), margin: const EdgeInsets.symmetric(horizontal: 4), width: active ? 24 : 8, height: 8, decoration: BoxDecoration(color: active ? const Color(0xFF6366F1) : const Color(0xFF475569), borderRadius: BorderRadius.circular(4)));
      }),
    );
  }

  Widget _buildPage(BuildContext context, String title, String subtitle, IconData icon) {
    return Padding(
      padding: const EdgeInsets.all(48),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(icon, size: 120, color: Theme.of(context).colorScheme.primary).animate().scale(duration: Duration(milliseconds: 600)),
          const SizedBox(height: 32),
          Text(title, style: Theme.of(context).textTheme.displayMedium, textAlign: TextAlign.center),
          const SizedBox(height: 16),
          Text(subtitle, style: Theme.of(context).textTheme.bodyMedium, textAlign: TextAlign.center),
        ],
      ),
    );
  }
}
