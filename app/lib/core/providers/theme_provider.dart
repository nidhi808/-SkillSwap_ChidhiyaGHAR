import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../services/storage_service.dart';

/// Persisted theme mode provider — reads from SharedPreferences on init,
/// writes back on every change.
final themeModeProvider =
    StateNotifierProvider<ThemeModeNotifier, ThemeMode>((ref) {
  return ThemeModeNotifier(ref.watch(storageServiceProvider));
});

class ThemeModeNotifier extends StateNotifier<ThemeMode> {
  final StorageService _storage;

  ThemeModeNotifier(this._storage) : super(ThemeMode.dark) {
    _load();
  }

  Future<void> _load() async {
    final mode = await _storage.getThemeMode();
    state = mode == 'light' ? ThemeMode.light : ThemeMode.dark;
  }

  Future<void> toggle() async {
    state = state == ThemeMode.dark ? ThemeMode.light : ThemeMode.dark;
    await _storage.saveThemeMode(state == ThemeMode.dark ? 'dark' : 'light');
  }

  Future<void> setDark() async {
    state = ThemeMode.dark;
    await _storage.saveThemeMode('dark');
  }

  Future<void> setLight() async {
    state = ThemeMode.light;
    await _storage.saveThemeMode('light');
  }
}
