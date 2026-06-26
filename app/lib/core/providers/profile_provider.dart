import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../api/dio_client.dart';
import '../api/api_exception.dart';
import '../models/profile_model.dart';
import '../../config/api_constants.dart';

// ═══════════════════════════════════════════════════════════════════
//  My Profile provider
// ═══════════════════════════════════════════════════════════════════

final myProfileProvider =
    AsyncNotifierProvider<MyProfileNotifier, ProfileModel?>(
  MyProfileNotifier.new,
);

class MyProfileNotifier extends AsyncNotifier<ProfileModel?> {
  @override
  Future<ProfileModel?> build() async {
    return _fetchMyProfile();
  }

  Future<ProfileModel?> _fetchMyProfile() async {
    try {
      final api = ref.read(apiProvider);
      final data = await api.get<Map<String, dynamic>>(ApiConstants.profileMe);
      if (data['profile'] != null) {
        return ProfileModel.fromJson(data['profile'] as Map<String, dynamic>);
      }
      return ProfileModel.fromJson(data);
    } on ApiException {
      return null;
    }
  }

  Future<void> refresh() async {
    state = const AsyncLoading();
    state = AsyncData(await _fetchMyProfile());
  }

  Future<bool> updateProfile(Map<String, dynamic> updates) async {
    try {
      final api = ref.read(apiProvider);
      final data = await api.put<Map<String, dynamic>>(
        ApiConstants.profileMe,
        data: updates,
      );
      final updated = data['profile'] != null
          ? ProfileModel.fromJson(data['profile'] as Map<String, dynamic>)
          : ProfileModel.fromJson(data);
      state = AsyncData(updated);
      return true;
    } on ApiException {
      return false;
    }
  }

  Future<String?> uploadAvatar(String filePath) async {
    try {
      final api = ref.read(apiProvider);
      final formData = FormData.fromMap({
        'avatar': await MultipartFile.fromFile(filePath),
      });
      final data = await api.uploadFile<Map<String, dynamic>>(
        ApiConstants.profileAvatar,
        formData,
      );
      // Refresh profile to get new avatar URL
      await refresh();
      return data['avatarUrl'] as String?;
    } on ApiException {
      return null;
    }
  }

  Future<String?> uploadCover(String filePath) async {
    try {
      final api = ref.read(apiProvider);
      final formData = FormData.fromMap({
        'cover': await MultipartFile.fromFile(filePath),
      });
      final data = await api.uploadFile<Map<String, dynamic>>(
        ApiConstants.profileCover,
        formData,
      );
      await refresh();
      return data['coverUrl'] as String?;
    } on ApiException {
      return null;
    }
  }
}

// ═══════════════════════════════════════════════════════════════════
//  Other user profile (by userId)
// ═══════════════════════════════════════════════════════════════════

final userProfileProvider = FutureProvider.family<ProfileModel?, String>(
  (ref, userId) async {
    try {
      final api = ref.read(apiProvider);
      final data = await api.get<Map<String, dynamic>>(
        ApiConstants.profileUser(userId),
      );
      if (data['profile'] != null) {
        return ProfileModel.fromJson(data['profile'] as Map<String, dynamic>);
      }
      return ProfileModel.fromJson(data);
    } on ApiException {
      return null;
    }
  },
);
