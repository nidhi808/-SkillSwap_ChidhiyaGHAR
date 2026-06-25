import 'package:flutter/material.dart';

class SessionsListScreen extends StatelessWidget {
  const SessionsListScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 3,
      child: Scaffold(
        appBar: AppBar(title: const Text('Sessions'), bottom: const TabBar(tabs: [Tab(text: 'Upcoming'), Tab(text: 'Past'), Tab(text: 'Cancelled')]),
        ),
        body: const TabBarView(children: [Center(child: Text('No upcoming sessions')), Center(child: Text('No past sessions')), Center(child: Text('No cancelled sessions'))]),
      ),
    );
  }
}
