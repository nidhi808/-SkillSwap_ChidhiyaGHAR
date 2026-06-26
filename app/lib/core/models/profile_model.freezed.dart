// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'profile_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models');

ProfileModel _$ProfileModelFromJson(Map<String, dynamic> json) {
  return _ProfileModel.fromJson(json);
}

/// @nodoc
mixin _$ProfileModel {
  String get id => throw _privateConstructorUsedError;
  @JsonKey(name: 'full_name')
  String? get fullName => throw _privateConstructorUsedError;
  @JsonKey(name: 'avatar_url')
  String? get avatarUrl => throw _privateConstructorUsedError;
  @JsonKey(name: 'cover_url')
  String? get coverUrl => throw _privateConstructorUsedError;
  String? get bio => throw _privateConstructorUsedError;
  String get timezone => throw _privateConstructorUsedError;
  String? get location => throw _privateConstructorUsedError;
  String? get city => throw _privateConstructorUsedError;
  @JsonKey(name: 'state_code')
  String? get stateCode => throw _privateConstructorUsedError;
  @JsonKey(name: 'country_code')
  String? get countryCode => throw _privateConstructorUsedError;
  double? get latitude => throw _privateConstructorUsedError;
  double? get longitude => throw _privateConstructorUsedError;
  @JsonKey(name: 'website_url')
  String? get websiteUrl => throw _privateConstructorUsedError;
  @JsonKey(name: 'github_url')
  String? get githubUrl => throw _privateConstructorUsedError;
  @JsonKey(name: 'linkedin_url')
  String? get linkedinUrl => throw _privateConstructorUsedError;
  @JsonKey(name: 'twitter_url')
  String? get twitterUrl => throw _privateConstructorUsedError;
  @JsonKey(name: 'is_verified_mentor')
  bool get isVerifiedMentor => throw _privateConstructorUsedError;
  @JsonKey(name: 'is_profile_complete')
  bool get isProfileComplete => throw _privateConstructorUsedError;
  @JsonKey(name: 'teaching_hours')
  double get teachingHours => throw _privateConstructorUsedError;
  @JsonKey(name: 'learning_hours')
  double get learningHours => throw _privateConstructorUsedError;
  @JsonKey(name: 'total_sessions')
  int get totalSessions => throw _privateConstructorUsedError;
  @JsonKey(name: 'avg_rating')
  double get avgRating => throw _privateConstructorUsedError;
  @JsonKey(name: 'total_reviews')
  int get totalReviews => throw _privateConstructorUsedError;
  @JsonKey(name: 'reputation_points')
  int get reputationPoints => throw _privateConstructorUsedError;
  @JsonKey(name: 'followers_count')
  int get followersCount => throw _privateConstructorUsedError;
  @JsonKey(name: 'following_count')
  int get followingCount => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $ProfileModelCopyWith<ProfileModel> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $ProfileModelCopyWith<$Res> {
  factory $ProfileModelCopyWith(
          ProfileModel value, $Res Function(ProfileModel) then) =
      _$ProfileModelCopyWithImpl<$Res, ProfileModel>;
  @useResult
  $Res call(
      {String id,
      @JsonKey(name: 'full_name') String? fullName,
      @JsonKey(name: 'avatar_url') String? avatarUrl,
      @JsonKey(name: 'cover_url') String? coverUrl,
      String? bio,
      String timezone,
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
      @JsonKey(name: 'is_verified_mentor') bool isVerifiedMentor,
      @JsonKey(name: 'is_profile_complete') bool isProfileComplete,
      @JsonKey(name: 'teaching_hours') double teachingHours,
      @JsonKey(name: 'learning_hours') double learningHours,
      @JsonKey(name: 'total_sessions') int totalSessions,
      @JsonKey(name: 'avg_rating') double avgRating,
      @JsonKey(name: 'total_reviews') int totalReviews,
      @JsonKey(name: 'reputation_points') int reputationPoints,
      @JsonKey(name: 'followers_count') int followersCount,
      @JsonKey(name: 'following_count') int followingCount});
}

/// @nodoc
class _$ProfileModelCopyWithImpl<$Res, $Val extends ProfileModel>
    implements $ProfileModelCopyWith<$Res> {
  _$ProfileModelCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? fullName = freezed,
    Object? avatarUrl = freezed,
    Object? coverUrl = freezed,
    Object? bio = freezed,
    Object? timezone = null,
    Object? location = freezed,
    Object? city = freezed,
    Object? stateCode = freezed,
    Object? countryCode = freezed,
    Object? latitude = freezed,
    Object? longitude = freezed,
    Object? websiteUrl = freezed,
    Object? githubUrl = freezed,
    Object? linkedinUrl = freezed,
    Object? twitterUrl = freezed,
    Object? isVerifiedMentor = null,
    Object? isProfileComplete = null,
    Object? teachingHours = null,
    Object? learningHours = null,
    Object? totalSessions = null,
    Object? avgRating = null,
    Object? totalReviews = null,
    Object? reputationPoints = null,
    Object? followersCount = null,
    Object? followingCount = null,
  }) {
    return _then(_value.copyWith(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      fullName: freezed == fullName
          ? _value.fullName
          : fullName // ignore: cast_nullable_to_non_nullable
              as String?,
      avatarUrl: freezed == avatarUrl
          ? _value.avatarUrl
          : avatarUrl // ignore: cast_nullable_to_non_nullable
              as String?,
      coverUrl: freezed == coverUrl
          ? _value.coverUrl
          : coverUrl // ignore: cast_nullable_to_non_nullable
              as String?,
      bio: freezed == bio
          ? _value.bio
          : bio // ignore: cast_nullable_to_non_nullable
              as String?,
      timezone: null == timezone
          ? _value.timezone
          : timezone // ignore: cast_nullable_to_non_nullable
              as String,
      location: freezed == location
          ? _value.location
          : location // ignore: cast_nullable_to_non_nullable
              as String?,
      city: freezed == city
          ? _value.city
          : city // ignore: cast_nullable_to_non_nullable
              as String?,
      stateCode: freezed == stateCode
          ? _value.stateCode
          : stateCode // ignore: cast_nullable_to_non_nullable
              as String?,
      countryCode: freezed == countryCode
          ? _value.countryCode
          : countryCode // ignore: cast_nullable_to_non_nullable
              as String?,
      latitude: freezed == latitude
          ? _value.latitude
          : latitude // ignore: cast_nullable_to_non_nullable
              as double?,
      longitude: freezed == longitude
          ? _value.longitude
          : longitude // ignore: cast_nullable_to_non_nullable
              as double?,
      websiteUrl: freezed == websiteUrl
          ? _value.websiteUrl
          : websiteUrl // ignore: cast_nullable_to_non_nullable
              as String?,
      githubUrl: freezed == githubUrl
          ? _value.githubUrl
          : githubUrl // ignore: cast_nullable_to_non_nullable
              as String?,
      linkedinUrl: freezed == linkedinUrl
          ? _value.linkedinUrl
          : linkedinUrl // ignore: cast_nullable_to_non_nullable
              as String?,
      twitterUrl: freezed == twitterUrl
          ? _value.twitterUrl
          : twitterUrl // ignore: cast_nullable_to_non_nullable
              as String?,
      isVerifiedMentor: null == isVerifiedMentor
          ? _value.isVerifiedMentor
          : isVerifiedMentor // ignore: cast_nullable_to_non_nullable
              as bool,
      isProfileComplete: null == isProfileComplete
          ? _value.isProfileComplete
          : isProfileComplete // ignore: cast_nullable_to_non_nullable
              as bool,
      teachingHours: null == teachingHours
          ? _value.teachingHours
          : teachingHours // ignore: cast_nullable_to_non_nullable
              as double,
      learningHours: null == learningHours
          ? _value.learningHours
          : learningHours // ignore: cast_nullable_to_non_nullable
              as double,
      totalSessions: null == totalSessions
          ? _value.totalSessions
          : totalSessions // ignore: cast_nullable_to_non_nullable
              as int,
      avgRating: null == avgRating
          ? _value.avgRating
          : avgRating // ignore: cast_nullable_to_non_nullable
              as double,
      totalReviews: null == totalReviews
          ? _value.totalReviews
          : totalReviews // ignore: cast_nullable_to_non_nullable
              as int,
      reputationPoints: null == reputationPoints
          ? _value.reputationPoints
          : reputationPoints // ignore: cast_nullable_to_non_nullable
              as int,
      followersCount: null == followersCount
          ? _value.followersCount
          : followersCount // ignore: cast_nullable_to_non_nullable
              as int,
      followingCount: null == followingCount
          ? _value.followingCount
          : followingCount // ignore: cast_nullable_to_non_nullable
              as int,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$ProfileModelImplCopyWith<$Res>
    implements $ProfileModelCopyWith<$Res> {
  factory _$$ProfileModelImplCopyWith(
          _$ProfileModelImpl value, $Res Function(_$ProfileModelImpl) then) =
      __$$ProfileModelImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {String id,
      @JsonKey(name: 'full_name') String? fullName,
      @JsonKey(name: 'avatar_url') String? avatarUrl,
      @JsonKey(name: 'cover_url') String? coverUrl,
      String? bio,
      String timezone,
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
      @JsonKey(name: 'is_verified_mentor') bool isVerifiedMentor,
      @JsonKey(name: 'is_profile_complete') bool isProfileComplete,
      @JsonKey(name: 'teaching_hours') double teachingHours,
      @JsonKey(name: 'learning_hours') double learningHours,
      @JsonKey(name: 'total_sessions') int totalSessions,
      @JsonKey(name: 'avg_rating') double avgRating,
      @JsonKey(name: 'total_reviews') int totalReviews,
      @JsonKey(name: 'reputation_points') int reputationPoints,
      @JsonKey(name: 'followers_count') int followersCount,
      @JsonKey(name: 'following_count') int followingCount});
}

/// @nodoc
class __$$ProfileModelImplCopyWithImpl<$Res>
    extends _$ProfileModelCopyWithImpl<$Res, _$ProfileModelImpl>
    implements _$$ProfileModelImplCopyWith<$Res> {
  __$$ProfileModelImplCopyWithImpl(
      _$ProfileModelImpl _value, $Res Function(_$ProfileModelImpl) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? fullName = freezed,
    Object? avatarUrl = freezed,
    Object? coverUrl = freezed,
    Object? bio = freezed,
    Object? timezone = null,
    Object? location = freezed,
    Object? city = freezed,
    Object? stateCode = freezed,
    Object? countryCode = freezed,
    Object? latitude = freezed,
    Object? longitude = freezed,
    Object? websiteUrl = freezed,
    Object? githubUrl = freezed,
    Object? linkedinUrl = freezed,
    Object? twitterUrl = freezed,
    Object? isVerifiedMentor = null,
    Object? isProfileComplete = null,
    Object? teachingHours = null,
    Object? learningHours = null,
    Object? totalSessions = null,
    Object? avgRating = null,
    Object? totalReviews = null,
    Object? reputationPoints = null,
    Object? followersCount = null,
    Object? followingCount = null,
  }) {
    return _then(_$ProfileModelImpl(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      fullName: freezed == fullName
          ? _value.fullName
          : fullName // ignore: cast_nullable_to_non_nullable
              as String?,
      avatarUrl: freezed == avatarUrl
          ? _value.avatarUrl
          : avatarUrl // ignore: cast_nullable_to_non_nullable
              as String?,
      coverUrl: freezed == coverUrl
          ? _value.coverUrl
          : coverUrl // ignore: cast_nullable_to_non_nullable
              as String?,
      bio: freezed == bio
          ? _value.bio
          : bio // ignore: cast_nullable_to_non_nullable
              as String?,
      timezone: null == timezone
          ? _value.timezone
          : timezone // ignore: cast_nullable_to_non_nullable
              as String,
      location: freezed == location
          ? _value.location
          : location // ignore: cast_nullable_to_non_nullable
              as String?,
      city: freezed == city
          ? _value.city
          : city // ignore: cast_nullable_to_non_nullable
              as String?,
      stateCode: freezed == stateCode
          ? _value.stateCode
          : stateCode // ignore: cast_nullable_to_non_nullable
              as String?,
      countryCode: freezed == countryCode
          ? _value.countryCode
          : countryCode // ignore: cast_nullable_to_non_nullable
              as String?,
      latitude: freezed == latitude
          ? _value.latitude
          : latitude // ignore: cast_nullable_to_non_nullable
              as double?,
      longitude: freezed == longitude
          ? _value.longitude
          : longitude // ignore: cast_nullable_to_non_nullable
              as double?,
      websiteUrl: freezed == websiteUrl
          ? _value.websiteUrl
          : websiteUrl // ignore: cast_nullable_to_non_nullable
              as String?,
      githubUrl: freezed == githubUrl
          ? _value.githubUrl
          : githubUrl // ignore: cast_nullable_to_non_nullable
              as String?,
      linkedinUrl: freezed == linkedinUrl
          ? _value.linkedinUrl
          : linkedinUrl // ignore: cast_nullable_to_non_nullable
              as String?,
      twitterUrl: freezed == twitterUrl
          ? _value.twitterUrl
          : twitterUrl // ignore: cast_nullable_to_non_nullable
              as String?,
      isVerifiedMentor: null == isVerifiedMentor
          ? _value.isVerifiedMentor
          : isVerifiedMentor // ignore: cast_nullable_to_non_nullable
              as bool,
      isProfileComplete: null == isProfileComplete
          ? _value.isProfileComplete
          : isProfileComplete // ignore: cast_nullable_to_non_nullable
              as bool,
      teachingHours: null == teachingHours
          ? _value.teachingHours
          : teachingHours // ignore: cast_nullable_to_non_nullable
              as double,
      learningHours: null == learningHours
          ? _value.learningHours
          : learningHours // ignore: cast_nullable_to_non_nullable
              as double,
      totalSessions: null == totalSessions
          ? _value.totalSessions
          : totalSessions // ignore: cast_nullable_to_non_nullable
              as int,
      avgRating: null == avgRating
          ? _value.avgRating
          : avgRating // ignore: cast_nullable_to_non_nullable
              as double,
      totalReviews: null == totalReviews
          ? _value.totalReviews
          : totalReviews // ignore: cast_nullable_to_non_nullable
              as int,
      reputationPoints: null == reputationPoints
          ? _value.reputationPoints
          : reputationPoints // ignore: cast_nullable_to_non_nullable
              as int,
      followersCount: null == followersCount
          ? _value.followersCount
          : followersCount // ignore: cast_nullable_to_non_nullable
              as int,
      followingCount: null == followingCount
          ? _value.followingCount
          : followingCount // ignore: cast_nullable_to_non_nullable
              as int,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$ProfileModelImpl implements _ProfileModel {
  const _$ProfileModelImpl(
      {required this.id,
      @JsonKey(name: 'full_name') this.fullName,
      @JsonKey(name: 'avatar_url') this.avatarUrl,
      @JsonKey(name: 'cover_url') this.coverUrl,
      this.bio,
      this.timezone = 'UTC',
      this.location,
      this.city,
      @JsonKey(name: 'state_code') this.stateCode,
      @JsonKey(name: 'country_code') this.countryCode,
      this.latitude,
      this.longitude,
      @JsonKey(name: 'website_url') this.websiteUrl,
      @JsonKey(name: 'github_url') this.githubUrl,
      @JsonKey(name: 'linkedin_url') this.linkedinUrl,
      @JsonKey(name: 'twitter_url') this.twitterUrl,
      @JsonKey(name: 'is_verified_mentor') this.isVerifiedMentor = false,
      @JsonKey(name: 'is_profile_complete') this.isProfileComplete = false,
      @JsonKey(name: 'teaching_hours') this.teachingHours = 0.0,
      @JsonKey(name: 'learning_hours') this.learningHours = 0.0,
      @JsonKey(name: 'total_sessions') this.totalSessions = 0,
      @JsonKey(name: 'avg_rating') this.avgRating = 0.0,
      @JsonKey(name: 'total_reviews') this.totalReviews = 0,
      @JsonKey(name: 'reputation_points') this.reputationPoints = 100,
      @JsonKey(name: 'followers_count') this.followersCount = 0,
      @JsonKey(name: 'following_count') this.followingCount = 0});

  factory _$ProfileModelImpl.fromJson(Map<String, dynamic> json) =>
      _$$ProfileModelImplFromJson(json);

  @override
  final String id;
  @override
  @JsonKey(name: 'full_name')
  final String? fullName;
  @override
  @JsonKey(name: 'avatar_url')
  final String? avatarUrl;
  @override
  @JsonKey(name: 'cover_url')
  final String? coverUrl;
  @override
  final String? bio;
  @override
  @JsonKey()
  final String timezone;
  @override
  final String? location;
  @override
  final String? city;
  @override
  @JsonKey(name: 'state_code')
  final String? stateCode;
  @override
  @JsonKey(name: 'country_code')
  final String? countryCode;
  @override
  final double? latitude;
  @override
  final double? longitude;
  @override
  @JsonKey(name: 'website_url')
  final String? websiteUrl;
  @override
  @JsonKey(name: 'github_url')
  final String? githubUrl;
  @override
  @JsonKey(name: 'linkedin_url')
  final String? linkedinUrl;
  @override
  @JsonKey(name: 'twitter_url')
  final String? twitterUrl;
  @override
  @JsonKey(name: 'is_verified_mentor')
  final bool isVerifiedMentor;
  @override
  @JsonKey(name: 'is_profile_complete')
  final bool isProfileComplete;
  @override
  @JsonKey(name: 'teaching_hours')
  final double teachingHours;
  @override
  @JsonKey(name: 'learning_hours')
  final double learningHours;
  @override
  @JsonKey(name: 'total_sessions')
  final int totalSessions;
  @override
  @JsonKey(name: 'avg_rating')
  final double avgRating;
  @override
  @JsonKey(name: 'total_reviews')
  final int totalReviews;
  @override
  @JsonKey(name: 'reputation_points')
  final int reputationPoints;
  @override
  @JsonKey(name: 'followers_count')
  final int followersCount;
  @override
  @JsonKey(name: 'following_count')
  final int followingCount;

  @override
  String toString() {
    return 'ProfileModel(id: $id, fullName: $fullName, avatarUrl: $avatarUrl, coverUrl: $coverUrl, bio: $bio, timezone: $timezone, location: $location, city: $city, stateCode: $stateCode, countryCode: $countryCode, latitude: $latitude, longitude: $longitude, websiteUrl: $websiteUrl, githubUrl: $githubUrl, linkedinUrl: $linkedinUrl, twitterUrl: $twitterUrl, isVerifiedMentor: $isVerifiedMentor, isProfileComplete: $isProfileComplete, teachingHours: $teachingHours, learningHours: $learningHours, totalSessions: $totalSessions, avgRating: $avgRating, totalReviews: $totalReviews, reputationPoints: $reputationPoints, followersCount: $followersCount, followingCount: $followingCount)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$ProfileModelImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.fullName, fullName) ||
                other.fullName == fullName) &&
            (identical(other.avatarUrl, avatarUrl) ||
                other.avatarUrl == avatarUrl) &&
            (identical(other.coverUrl, coverUrl) ||
                other.coverUrl == coverUrl) &&
            (identical(other.bio, bio) || other.bio == bio) &&
            (identical(other.timezone, timezone) ||
                other.timezone == timezone) &&
            (identical(other.location, location) ||
                other.location == location) &&
            (identical(other.city, city) || other.city == city) &&
            (identical(other.stateCode, stateCode) ||
                other.stateCode == stateCode) &&
            (identical(other.countryCode, countryCode) ||
                other.countryCode == countryCode) &&
            (identical(other.latitude, latitude) ||
                other.latitude == latitude) &&
            (identical(other.longitude, longitude) ||
                other.longitude == longitude) &&
            (identical(other.websiteUrl, websiteUrl) ||
                other.websiteUrl == websiteUrl) &&
            (identical(other.githubUrl, githubUrl) ||
                other.githubUrl == githubUrl) &&
            (identical(other.linkedinUrl, linkedinUrl) ||
                other.linkedinUrl == linkedinUrl) &&
            (identical(other.twitterUrl, twitterUrl) ||
                other.twitterUrl == twitterUrl) &&
            (identical(other.isVerifiedMentor, isVerifiedMentor) ||
                other.isVerifiedMentor == isVerifiedMentor) &&
            (identical(other.isProfileComplete, isProfileComplete) ||
                other.isProfileComplete == isProfileComplete) &&
            (identical(other.teachingHours, teachingHours) ||
                other.teachingHours == teachingHours) &&
            (identical(other.learningHours, learningHours) ||
                other.learningHours == learningHours) &&
            (identical(other.totalSessions, totalSessions) ||
                other.totalSessions == totalSessions) &&
            (identical(other.avgRating, avgRating) ||
                other.avgRating == avgRating) &&
            (identical(other.totalReviews, totalReviews) ||
                other.totalReviews == totalReviews) &&
            (identical(other.reputationPoints, reputationPoints) ||
                other.reputationPoints == reputationPoints) &&
            (identical(other.followersCount, followersCount) ||
                other.followersCount == followersCount) &&
            (identical(other.followingCount, followingCount) ||
                other.followingCount == followingCount));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hashAll([
        runtimeType,
        id,
        fullName,
        avatarUrl,
        coverUrl,
        bio,
        timezone,
        location,
        city,
        stateCode,
        countryCode,
        latitude,
        longitude,
        websiteUrl,
        githubUrl,
        linkedinUrl,
        twitterUrl,
        isVerifiedMentor,
        isProfileComplete,
        teachingHours,
        learningHours,
        totalSessions,
        avgRating,
        totalReviews,
        reputationPoints,
        followersCount,
        followingCount
      ]);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$ProfileModelImplCopyWith<_$ProfileModelImpl> get copyWith =>
      __$$ProfileModelImplCopyWithImpl<_$ProfileModelImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$ProfileModelImplToJson(
      this,
    );
  }
}

abstract class _ProfileModel implements ProfileModel {
  const factory _ProfileModel(
          {required final String id,
          @JsonKey(name: 'full_name') final String? fullName,
          @JsonKey(name: 'avatar_url') final String? avatarUrl,
          @JsonKey(name: 'cover_url') final String? coverUrl,
          final String? bio,
          final String timezone,
          final String? location,
          final String? city,
          @JsonKey(name: 'state_code') final String? stateCode,
          @JsonKey(name: 'country_code') final String? countryCode,
          final double? latitude,
          final double? longitude,
          @JsonKey(name: 'website_url') final String? websiteUrl,
          @JsonKey(name: 'github_url') final String? githubUrl,
          @JsonKey(name: 'linkedin_url') final String? linkedinUrl,
          @JsonKey(name: 'twitter_url') final String? twitterUrl,
          @JsonKey(name: 'is_verified_mentor') final bool isVerifiedMentor,
          @JsonKey(name: 'is_profile_complete') final bool isProfileComplete,
          @JsonKey(name: 'teaching_hours') final double teachingHours,
          @JsonKey(name: 'learning_hours') final double learningHours,
          @JsonKey(name: 'total_sessions') final int totalSessions,
          @JsonKey(name: 'avg_rating') final double avgRating,
          @JsonKey(name: 'total_reviews') final int totalReviews,
          @JsonKey(name: 'reputation_points') final int reputationPoints,
          @JsonKey(name: 'followers_count') final int followersCount,
          @JsonKey(name: 'following_count') final int followingCount}) =
      _$ProfileModelImpl;

  factory _ProfileModel.fromJson(Map<String, dynamic> json) =
      _$ProfileModelImpl.fromJson;

  @override
  String get id;
  @override
  @JsonKey(name: 'full_name')
  String? get fullName;
  @override
  @JsonKey(name: 'avatar_url')
  String? get avatarUrl;
  @override
  @JsonKey(name: 'cover_url')
  String? get coverUrl;
  @override
  String? get bio;
  @override
  String get timezone;
  @override
  String? get location;
  @override
  String? get city;
  @override
  @JsonKey(name: 'state_code')
  String? get stateCode;
  @override
  @JsonKey(name: 'country_code')
  String? get countryCode;
  @override
  double? get latitude;
  @override
  double? get longitude;
  @override
  @JsonKey(name: 'website_url')
  String? get websiteUrl;
  @override
  @JsonKey(name: 'github_url')
  String? get githubUrl;
  @override
  @JsonKey(name: 'linkedin_url')
  String? get linkedinUrl;
  @override
  @JsonKey(name: 'twitter_url')
  String? get twitterUrl;
  @override
  @JsonKey(name: 'is_verified_mentor')
  bool get isVerifiedMentor;
  @override
  @JsonKey(name: 'is_profile_complete')
  bool get isProfileComplete;
  @override
  @JsonKey(name: 'teaching_hours')
  double get teachingHours;
  @override
  @JsonKey(name: 'learning_hours')
  double get learningHours;
  @override
  @JsonKey(name: 'total_sessions')
  int get totalSessions;
  @override
  @JsonKey(name: 'avg_rating')
  double get avgRating;
  @override
  @JsonKey(name: 'total_reviews')
  int get totalReviews;
  @override
  @JsonKey(name: 'reputation_points')
  int get reputationPoints;
  @override
  @JsonKey(name: 'followers_count')
  int get followersCount;
  @override
  @JsonKey(name: 'following_count')
  int get followingCount;
  @override
  @JsonKey(ignore: true)
  _$$ProfileModelImplCopyWith<_$ProfileModelImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
