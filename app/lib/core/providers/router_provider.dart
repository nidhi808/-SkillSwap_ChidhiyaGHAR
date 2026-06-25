import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../config/theme.dart';
import '../core/providers/providers.dart';
import '../features/auth/screens/splash_screen.dart';
import '../features/auth/screens/login_screen.dart';
import '../features/auth/screens/register_screen.dart';
import '../features/auth/screens/forgot_password_screen.dart';
import '../features/onboarding/screens/onboarding_screen.dart';
import '../features/home/screens/home_screen.dart';
import '../features/matching/screens/matching_screen.dart';
import '../features/chat/screens/conversations_list_screen.dart';
import '../features/sessions/screens/sessions_list_screen.dart';
import '../features/profile/screens/profile_screen.dart';
import '../features/skills/screens/skills_browse_screen.dart';
import '../features/notifications/screens/notifications_screen.dart';
import '../features/badges/screens/badges_screen.dart';
import '../features/leaderboard/screens/leaderboard_screen.dart';
import '../features/ai_assistant/screens/ai_assistant_screen.dart';
import '../features/settings/screens/settings_screen.dart';
import '../features/reviews/screens/reviews_screen.dart';
import '../features/video_call/screens/video_call_screen.dart';
import '../features/whiteboard/screens/whiteboard_screen.dart';

final GoRouter routerProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    initialLocation: '/splash',
    debugLogDiagnostics: true,
    routes: [
      GoRoute(path: '/splash', builder: (context, state) => const SplashScreen()),
      GoRoute(path: '/login', builder: (context, state) => const LoginScreen()),
      GoRoute(path: '/register', builder: (context, state) => const RegisterScreen()),
      GoRoute(path: '/forgot-password', builder: (context, state) => const ForgotPasswordScreen()),
      GoRoute(path: '/onboarding', builder: (context, state) => const OnboardingScreen()),
      GoRoute(path: '/skills', builder: (context, state) => const SkillsBrowseScreen()),
      GoRoute(path: '/notifications', builder: (context, state) => const NotificationsScreen()),
      GoRoute(path: '/badges', builder: (context, state) => const BadgesScreen()),
      GoRoute(path: '/leaderboard', builder: (context, state) => const LeaderboardScreen()),
      GoRoute(path: '/ai-assistant', builder: (context, state) => const AIAssistantScreen()),
      GoRoute(path: '/settings', builder: (context, state) => const SettingsScreen()),
      GoRoute(path: '/reviews/:userId', builder: (context, state) => ReviewsScreen(userId: state.pathParameters['userId']!)),
      GoRoute(path: '/sessions/:id/call', builder: (context, state) => VideoCallScreen(sessionId: state.pathParameters['id']!)),
      GoRoute(path: '/sessions/:id/whiteboard', builder: (context, state) => WhiteboardScreen(sessionId: state.pathParameters['id']!)),
      ShellRoute(
        builder: (context, state, child) => ScaffoldWithNav(child: child),
        routes: [
          GoRoute(path: '/home', builder: (context, state) => const HomeScreen()),
          GoRoute(path: '/matching', builder: (context, state) => const MatchingScreen()),
          GoRoute(path: '/chat', builder: (context, state) => const ConversationsListScreen()),
          GoRoute(path: '/sessions', builder: (context, state) => const SessionsListScreen()),
          GoRoute(path: '/profile', builder: (context, state) => const ProfileScreen()),
        ],
      ),
    ],
  );
});

class ScaffoldWithNav extends StatelessWidget {
  final Widget child;
  const ScaffoldWithNav({super.key, required this.child});

  int _currentIndex(String location) {
    switch (location) {
      case '/home': return 0;
      case '/matching': return 1;
      case '/chat': return 2;
      case '/sessions': return 3;
      case '/profile': return 4;
      default: return 0;
    }
  }

  void _onItemTapped(BuildContext context, int index) {
    switch (index) {
      case 0: context.go('/home'); break;
      case 1: context.go('/matching'); break;
      case 2: context.go('/chat'); break;
      case 3: context.go('/sessions'); break;
      case 4: context.go('/profile'); break;
    }
  }

  @override
  Widget build(BuildContext context) {
    final location = GoRouterState.of(context).uri.path;
    return Scaffold(
      body: child,
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex(location),
        onTap: (i) => _onItemTapped(context, i),
        type: BottomNavigationBarType.fixed,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
          BottomNavigationBarItem(icon: Icon(Icons.people), label: 'Match'),
          BottomNavigationBarItem(icon: Icon(Icons.chat), label: 'Chat'),
          BottomNavigationBarItem(icon: Icon(Icons.calendar_today), label: 'Sessions'),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: 'Profile'),
        ],
      ),
    );
  }
}
