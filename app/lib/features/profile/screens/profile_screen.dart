import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class ProfileScreen extends ConsumerWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: AppBar(title: const Text('Profile')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          const CircleAvatar(radius: 48, child: Icon(Icons.person)),
          const SizedBox(height: 16),
          const Text('User Name', textAlign: TextAlign.center, style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
          const SizedBox(height: 24),
          ListTile(title: const Text('Edit Profile'), trailing: const Icon(Icons.arrow_forward_ios), onTap: () => Navigator.pushNamed(context, '/profile/edit')),
          ListTile(title: const Text('My Skills'), trailing: const Icon(Icons.arrow_forward_ios), onTap: () => Navigator.pushNamed(context, '/profile/skills')),
          ListTile(title: const Text('Availability'), trailing: const Icon(Icons.arrow_forward_ios), onTap: () => Navigator.pushNamed(context, '/profile/availability')),
          ListTile(title: const Text('Badges'), trailing: const Icon(Icons.arrow_forward_ios), onTap: () => Navigator.pushNamed(context, '/badges')),
          ListTile(title: const Text('Reviews'), trailing: const Icon(Icons.arrow_forward_ios), onTap: () => Navigator.pushNamed(context, '/reviews/me')),
          ListTile(title: const Text('Settings'), trailing: const Icon(Icons.arrow_forward_ios), onTap: () => Navigator.pushNamed(context, '/settings')),
        ],
      ),
    );
  }
}
