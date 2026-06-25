import 'package:flutter/material.dart';

class SkillsBrowseScreen extends StatelessWidget {
  const SkillsBrowseScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Browse Skills')),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16),
            child: TextField(decoration: const InputDecoration(prefixIcon: Icon(Icons.search), hintText: 'Search skills...')),
          ),
          Expanded(child: const Center(child: Text('Skill catalog coming soon'))),
        ],
      ),
    );
  }
}
