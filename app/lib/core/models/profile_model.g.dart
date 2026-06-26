// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'profile_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$ProfileModelImpl _$$ProfileModelImplFromJson(Map<String, dynamic> json) =>
    _$ProfileModelImpl(
      id: json['id'] as String,
      fullName: json['full_name'] as String?,
      avatarUrl: json['avatar_url'] as String?,
      coverUrl: json['cover_url'] as String?,
      bio: json['bio'] as String?,
      timezone: json['timezone'] as String? ?? 'UTC',
      location: json['location'] as String?,
      city: json['city'] as String?,
      stateCode: json['state_code'] as String?,
      countryCode: json['country_code'] as String?,
      latitude: (json['latitude'] as num?)?.toDouble(),
      longitude: (json['longitude'] as num?)?.toDouble(),
      websiteUrl: json['website_url'] as String?,
      githubUrl: json['github_url'] as String?,
      linkedinUrl: json['linkedin_url'] as String?,
      twitterUrl: json['twitter_url'] as String?,
      isVerifiedMentor: json['is_verified_mentor'] as bool? ?? false,
      isProfileComplete: json['is_profile_complete'] as bool? ?? false,
      teachingHours: (json['teaching_hours'] as num?)?.toDouble() ?? 0.0,
      learningHours: (json['learning_hours'] as num?)?.toDouble() ?? 0.0,
      totalSessions: (json['total_sessions'] as num?)?.toInt() ?? 0,
      avgRating: (json['avg_rating'] as num?)?.toDouble() ?? 0.0,
      totalReviews: (json['total_reviews'] as num?)?.toInt() ?? 0,
      reputationPoints: (json['reputation_points'] as num?)?.toInt() ?? 100,
      followersCount: (json['followers_count'] as num?)?.toInt() ?? 0,
      followingCount: (json['following_count'] as num?)?.toInt() ?? 0,
    );

Map<String, dynamic> _$$ProfileModelImplToJson(_$ProfileModelImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'full_name': instance.fullName,
      'avatar_url': instance.avatarUrl,
      'cover_url': instance.coverUrl,
      'bio': instance.bio,
      'timezone': instance.timezone,
      'location': instance.location,
      'city': instance.city,
      'state_code': instance.stateCode,
      'country_code': instance.countryCode,
      'latitude': instance.latitude,
      'longitude': instance.longitude,
      'website_url': instance.websiteUrl,
      'github_url': instance.githubUrl,
      'linkedin_url': instance.linkedinUrl,
      'twitter_url': instance.twitterUrl,
      'is_verified_mentor': instance.isVerifiedMentor,
      'is_profile_complete': instance.isProfileComplete,
      'teaching_hours': instance.teachingHours,
      'learning_hours': instance.learningHours,
      'total_sessions': instance.totalSessions,
      'avg_rating': instance.avgRating,
      'total_reviews': instance.totalReviews,
      'reputation_points': instance.reputationPoints,
      'followers_count': instance.followersCount,
      'following_count': instance.followingCount,
    };
