import 'package:freezed_annotation/freezed_annotation.dart';

part 'profile_model.freezed.dart';
part 'profile_model.g.dart';

@freezed
class ProfileModel with _$ProfileModel {
  const factory ProfileModel({
    required String id,
    @JsonKey(name: 'full_name') String? fullName,
    @JsonKey(name: 'avatar_url') String? avatarUrl,
    @JsonKey(name: 'cover_url') String? coverUrl,
    String? bio,
    @Default('UTC') String timezone,
    String? location,
    String? city,
    @JsonKey(name: 'state_code') String? stateCode,
    @JsonKey(name: 'country_code') String? countryCode,
    double? latitude,
    double? longitude,
    @JsonKey(name: 'website_url') String? websiteUrl,
    @JsonKey(name: 'github_url') String? githubUrl,
    @JsonKey(name: 'linkedin_url') String? linkedinUrl,
    @JsonKey(name: 'twitter_url') String? twitterUrl,
    @JsonKey(name: 'is_verified_mentor') @Default(false) bool isVerifiedMentor,
    @JsonKey(name: 'is_profile_complete') @Default(false) bool isProfileComplete,
    @JsonKey(name: 'teaching_hours') @Default(0.0) double teachingHours,
    @JsonKey(name: 'learning_hours') @Default(0.0) double learningHours,
    @JsonKey(name: 'total_sessions') @Default(0) int totalSessions,
    @JsonKey(name: 'avg_rating') @Default(0.0) double avgRating,
    @JsonKey(name: 'total_reviews') @Default(0) int totalReviews,
    @JsonKey(name: 'reputation_points') @Default(100) int reputationPoints,
    @JsonKey(name: 'followers_count') @Default(0) int followersCount,
    @JsonKey(name: 'following_count') @Default(0) int followingCount,
  }) = _ProfileModel;

  factory ProfileModel.fromJson(Map<String, dynamic> json) =>
      _$ProfileModelFromJson(json);
}
