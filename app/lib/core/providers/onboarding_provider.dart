import 'package:flutter_riverpod/flutter_riverpod.dart';

final isOnboardingCompleteProvider = FutureProvider<bool>((ref) async {
  final storage = ref.watch(storageServiceProvider);
  return storage.isOnboardingComplete();
});
