import 'package:flutter/material.dart';

class ReviewsScreen extends StatelessWidget {
  final String userId;
  const ReviewsScreen({super.key, required this.userId});

  @override
  Widget build(BuildContext context) {
    return Scaffold(appBar: AppBar(title: const Text('Reviews')), body: const Center(child: Text('Reviews')));
  }
}
