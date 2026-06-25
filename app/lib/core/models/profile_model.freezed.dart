part of 'profile_model.dart';

@freezed
class ProfileModel with _$ProfileModel {
  const factory ProfileModel({
    required String id,
    String? fullName,
    String? avatarUrl,
    String? coverUrl,
    String? bio,
    required String timezone,
    String? location,
    String? city,
    String? stateCode,
    String? countryCode,
    double? latitude,
    double? longitude,
    String? websiteUrl,
    String? githubUrl,
    String? linkedinUrl,
    String? twitterUrl,
    required bool isVerifiedMentor,
    required bool isProfileComplete,
    required double teachingHours,
    required double learningHours,
    required int totalSessions,
    required double avgRating,
    required int totalReviews,
    required int reputationPoints,
    required int followersCount,
    required int followingCount,
  }) = _ProfileModel;

  factory ProfileModel.fromJson(Map<String, dynamic> json) =>
      _$ProfileModelFromJson(json);
}
