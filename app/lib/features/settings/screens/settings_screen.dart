import 'package:flutter/material.dart';

class SettingsScreen extends StatelessWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Settings')),
      body: ListView(
        children: [
          SwitchListTile(title: const Text('Dark Mode'), value: true, onChanged: (v) {}),
          SwitchListTile(title: const Text('Notifications'), value: true, onChanged: (v) {}),
          ListTile(title: const Text('Privacy'), trailing: const Icon(Icons.arrow_forward_ios), onTap: () {}),
          ListTile(title: const Text('About'), trailing: const Icon(Icons.arrow_forward_ios), onTap: () {}),
          ListTile(title: const Text('Logout'), trailing: const Icon(Icons.logout), onTap: () {}),
        ],
      ),
    );
  }
}
