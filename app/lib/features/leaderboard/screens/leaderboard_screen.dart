import 'package:flutter/material.dart';

class LeaderboardScreen extends StatelessWidget {
  const LeaderboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 3,
      child: Scaffold(
        appBar: AppBar(title: const Text('Leaderboard'), bottom: const TabBar(tabs: [Tab(text: 'All Time'), Tab(text: 'This Week'), Tab(text: 'This Month')]),
        ),
        body: const TabBarView(children: [Center(child: Text('Leaderboard')), Center(child: Text('Weekly')), Center(child: Text('Monthly'))]),
      ),
    );
  }
}
