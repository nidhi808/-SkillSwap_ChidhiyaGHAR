import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

final storageServiceProvider = Provider<StorageService>((ref) {
  return StorageService();
});

class StorageService {
  static const FlutterSecureStorage _secure = FlutterSecureStorage(
    aOptions: AndroidOptions(
      encryptedSharedPreferences: true,
    ),
  );

  static const String _accessTokenKey = 'access_token';
  static const String _refreshTokenKey = 'refresh_token';
  static const String _userIdKey = 'user_id';
  static const String _onboardingCompleteKey = 'onboarding_complete';

  Future<void> saveAccessToken(String token) async {
    await _secure.write(key: _accessTokenKey, value: token);
  }

  Future<String?> getAccessToken() async {
    return await _secure.read(key: _accessTokenKey);
  }

  Future<void> saveRefreshToken(String token) async {
    await _secure.write(key: _refreshTokenKey, value: token);
  }

  Future<String?> getRefreshToken() async {
    return await _secure.read(key: _refreshTokenKey);
  }

  Future<void> saveUserId(String userId) async {
    await _secure.write(key: _userIdKey, value: userId);
  }

  Future<String?> getUserId() async {
    return await _secure.read(key: _userIdKey);
  }

  Future<void> setOnboardingComplete(bool value) async {
    await _secure.write(key: _onboardingCompleteKey, value: value.toString());
  }

  Future<bool> isOnboardingComplete() async {
    final value = await _secure.read(key: _onboardingCompleteKey);
    return value == 'true';
  }

  Future<void> clearTokens() async {
    await _secure.delete(key: _accessTokenKey);
    await _secure.delete(key: _refreshTokenKey);
  }

  Future<void> clearAll() async {
    await _secure.deleteAll();
  }
}
