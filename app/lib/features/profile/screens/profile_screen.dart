import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../config/theme.dart';
import '../../../core/providers/auth_provider.dart';
import '../../../core/widgets/app_avatar.dart';
import '../../../core/widgets/neon_text.dart';

class ProfileScreen extends ConsumerWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final authState = ref.watch(authProvider);
    final user = authState.user;
    final profile = authState.profile;

    final displayName = profile?.fullName ?? user?.username ?? 'Learner';
    final email = user?.email ?? '';

    return Scaffold(
      backgroundColor: AppTheme.background,
      appBar: AppBar(
        title: const Text('Profile'),
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: ListView(
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
        children: [
          // ── Avatar & Name section ────────────────────────────
          Center(
            child: Column(
              children: [
                AppAvatar(
                  imageUrl: profile?.avatarUrl,
                  name: displayName,
                  radius: 54,
                  glowColor: AppTheme.primary,
                  showOnlineIndicator: false,
                ),
                const SizedBox(height: 16),
                NeonText(
                  text: displayName,
                  fontSize: 22,
                  fontWeight: FontWeight.bold,
                  glowColor: AppTheme.secondary,
                ),
                const SizedBox(height: 4),
                Text(
                  email,
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                        color: AppTheme.textSecondary,
                      ),
                ),
              ],
            ),
          ),
          
          const SizedBox(height: 32),
          Text(
            'Account settings',
            style: Theme.of(context).textTheme.labelSmall?.copyWith(
                  color: AppTheme.textSecondary,
                ),
          ),
          const Divider(),

          // ── Menu list ────────────────────────────────────────
          _buildMenuTile(
            context,
            icon: Icons.person_outline_rounded,
            title: 'Edit Profile',
            onTap: () => context.push('/profile'), // Stubs route to profile screen itself for now
          ),
          _buildMenuTile(
            context,
            icon: Icons.workspace_premium_outlined,
            title: 'My Badges',
            onTap: () => context.push('/badges'),
          ),
          _buildMenuTile(
            context,
            icon: Icons.rate_review_outlined,
            title: 'Reviews',
            onTap: () => context.push('/reviews/${user?.id ?? 'me'}'),
          ),
          _buildMenuTile(
            context,
            icon: Icons.settings_outlined,
            title: 'Settings',
            onTap: () => context.push('/settings'),
          ),

          const SizedBox(height: 24),
          Text(
            'Session controls',
            style: Theme.of(context).textTheme.labelSmall?.copyWith(
                  color: AppTheme.textSecondary,
                ),
          ),
          const Divider(),
          
          // ── Logout ───────────────────────────────────────────
          ListTile(
            leading: const Icon(Icons.logout_rounded, color: Colors.redAccent),
            title: const Text(
              'Logout',
              style: TextStyle(
                color: Colors.redAccent,
                fontWeight: FontWeight.w600,
                fontSize: 15,
              ),
            ),
            contentPadding: EdgeInsets.zero,
            onTap: () async {
              // Sign out from Riverpod provider which clears secure storage
              await ref.read(authProvider.notifier).logout();
              if (context.mounted) {
                context.go('/login');
              }
            },
          ),
        ],
      ),
    );
  }

  Widget _buildMenuTile(
    BuildContext context, {
    required IconData icon,
    required String title,
    required VoidCallback onTap,
  }) {
    return ListTile(
      leading: Icon(icon, color: AppTheme.textPrimary, size: 22),
      title: Text(
        title,
        style: const TextStyle(
          color: AppTheme.textPrimary,
          fontSize: 15,
          fontWeight: FontWeight.w500,
        ),
      ),
      trailing: const Icon(Icons.chevron_right_rounded, color: AppTheme.textTertiary),
      contentPadding: EdgeInsets.zero,
      onTap: onTap,
    );
  }
}
