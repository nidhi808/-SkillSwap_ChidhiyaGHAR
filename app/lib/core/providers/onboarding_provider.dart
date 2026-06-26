import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../services/storage_service.dart';

final isOnboardingCompleteProvider = FutureProvider<bool>((ref) async {
  final storage = ref.watch(storageServiceProvider);
  return storage.isOnboardingComplete();
});
