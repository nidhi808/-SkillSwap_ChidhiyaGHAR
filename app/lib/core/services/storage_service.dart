import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:shared_preferences/shared_preferences.dart';

final storageServiceProvider = Provider<StorageService>((ref) {
  return StorageService();
});

/// Abstraction over secure storage (tokens, secrets) and
/// shared preferences (settings, lightweight cache).
class StorageService {
  static const FlutterSecureStorage _secure = FlutterSecureStorage(
    aOptions: AndroidOptions(encryptedSharedPreferences: true),
  );

  // ── Keys ─────────────────────────────────────────────────────
  static const String _accessTokenKey  = 'access_token';
  static const String _refreshTokenKey = 'refresh_token';
  static const String _userIdKey       = 'user_id';
  static const String _onboardingKey   = 'onboarding_complete';
  static const String _themeKey        = 'theme_mode';

  // ── Tokens ───────────────────────────────────────────────────
  Future<void> saveAccessToken(String token) =>
      _secure.write(key: _accessTokenKey, value: token);

  Future<String?> getAccessToken() =>
      _secure.read(key: _accessTokenKey);

  Future<void> saveRefreshToken(String token) =>
      _secure.write(key: _refreshTokenKey, value: token);

  Future<String?> getRefreshToken() =>
      _secure.read(key: _refreshTokenKey);

  Future<void> clearTokens() async {
    await _secure.delete(key: _accessTokenKey);
    await _secure.delete(key: _refreshTokenKey);
  }

  // ── User ID ──────────────────────────────────────────────────
  Future<void> saveUserId(String userId) =>
      _secure.write(key: _userIdKey, value: userId);

  Future<String?> getUserId() =>
      _secure.read(key: _userIdKey);

  // ── Onboarding ───────────────────────────────────────────────
  Future<void> setOnboardingComplete(bool value) =>
      _secure.write(key: _onboardingKey, value: value.toString());

  Future<bool> isOnboardingComplete() async {
    final value = await _secure.read(key: _onboardingKey);
    return value == 'true';
  }

  // ── Theme preference (SharedPreferences) ─────────────────────
  Future<void> saveThemeMode(String mode) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_themeKey, mode);
  }

  Future<String> getThemeMode() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_themeKey) ?? 'dark';
  }

  // ── Full clear ───────────────────────────────────────────────
  Future<void> clearAll() async {
    await _secure.deleteAll();
  }
}
