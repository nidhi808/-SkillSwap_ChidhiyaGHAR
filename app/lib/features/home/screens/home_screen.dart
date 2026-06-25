import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/models/models.dart';
import '../../../core/providers/providers.dart';

class HomeScreen extends ConsumerWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: AppBar(title: const Text('SkillSwap')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Text('Welcome back!', style: Theme.of(context).textTheme.displaySmall),
          const SizedBox(height: 24),
          Row(
            children: [
              Expanded(child: _StatCard(title: 'Sessions', value: '0', icon: Icons.calendar_today)),
              const SizedBox(width: 12),
              Expanded(child: _StatCard(title: 'Reputation', value: '0', icon: Icons.star)),
            ],
          ),
          const SizedBox(height: 24),
          Text('Upcoming Sessions', style: Theme.of(context).textTheme.displaySmall),
          const SizedBox(height: 12),
          const Center(child: Text('No upcoming sessions')),
          const SizedBox(height: 24),
          Text('Recent Activity', style: Theme.of(context).textTheme.displaySmall),
          const SizedBox(height: 12),
          const Center(child: Text('No activity yet')),
        ],
      ),
    );
  }
}

class _StatCard extends StatelessWidget {
  final String title;
  final String value;
  final IconData icon;
  const _StatCard({required this.title, required this.value, required this.icon});

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Icon(icon, color: Theme.of(context).colorScheme.primary),
            const SizedBox(height: 8),
            Text(value, style: Theme.of(context).textTheme.displaySmall),
            Text(title, style: Theme.of(context).textTheme.bodyMedium),
          ],
        ),
      ),
    );
  }
}
