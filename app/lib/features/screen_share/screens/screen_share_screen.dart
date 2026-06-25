import 'package:flutter/material.dart';

class ScreenShareScreen extends StatelessWidget {
  final String sessionId;
  const ScreenShareScreen({super.key, required this.sessionId});

  @override
  Widget build(BuildContext context) {
    return Scaffold(body: Center(child: Text('Screen sharing session $sessionId')));
  }
}
