import 'package:flutter/material.dart';

class VideoCallScreen extends StatelessWidget {
  final String sessionId;
  const VideoCallScreen({super.key, required this.sessionId});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          const Center(child: Text('Video Call')),
          Positioned(
            bottom: 80,
            left: 0,
            right: 0,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                IconButton(
                  onPressed: () {},
                  icon: const Icon(Icons.mic),
                  style: IconButton(
                    style: ButtonStyle(
                      backgroundColor: WidgetStatePropertyAll(Colors.white.withOpacity(0.14)),
                    ),
                    iconSize: 32,
                  ),
                ),
                const SizedBox(width: 24),
                IconButton(
                  onPressed: () => Navigator.pop(context),
                  icon: const Icon(Icons.call_end),
                  color: Colors.red,
                  style: IconButton(
                    style: ButtonStyle(
                      backgroundColor: WidgetStatePropertyAll(Colors.red.shade900),
                    ),
                    iconSize: 32,
                  ),
                ),
                const SizedBox(width: 24),
                IconButton(
                  onPressed: () {},
                  icon: const Icon(Icons.videocam),
                  style: IconButton(
                    style: ButtonStyle(
                      backgroundColor: WidgetStatePropertyAll(Colors.white.withOpacity(0.14)),
                    ),
                    iconSize: 32,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
