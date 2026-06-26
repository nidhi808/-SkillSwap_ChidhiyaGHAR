// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'match_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models');

MatchModel _$MatchModelFromJson(Map<String, dynamic> json) {
  return _MatchModel.fromJson(json);
}

/// @nodoc
mixin _$MatchModel {
  String get id => throw _privateConstructorUsedError;
  @JsonKey(name: 'user_a_id')
  String get userAId => throw _privateConstructorUsedError;
  @JsonKey(name: 'user_b_id')
  String get userBId => throw _privateConstructorUsedError;
  String get status => throw _privateConstructorUsedError;
  @JsonKey(name: 'match_score')
  double get matchScore => throw _privateConstructorUsedError;
  @JsonKey(name: 'skill_similarity_score')
  double get skillSimilarityScore => throw _privateConstructorUsedError;
  @JsonKey(name: 'availability_score')
  double get availabilityScore => throw _privateConstructorUsedError;
  @JsonKey(name: 'reputation_score')
  double get reputationScore => throw _privateConstructorUsedError;
  @JsonKey(name: 'ai_explanation')
  String? get aiExplanation => throw _privateConstructorUsedError;
  @JsonKey(name: 'matched_skills')
  List<String> get matchedSkills => throw _privateConstructorUsedError;
  @JsonKey(name: 'initiated_by')
  String? get initiatedBy => throw _privateConstructorUsedError;
  @JsonKey(name: 'expires_at')
  DateTime? get expiresAt => throw _privateConstructorUsedError;

  /// The other user in this match (computed on backend).
  @JsonKey(name: 'other_user')
  ProfileModel? get otherUser => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $MatchModelCopyWith<MatchModel> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $MatchModelCopyWith<$Res> {
  factory $MatchModelCopyWith(
          MatchModel value, $Res Function(MatchModel) then) =
      _$MatchModelCopyWithImpl<$Res, MatchModel>;
  @useResult
  $Res call(
      {String id,
      @JsonKey(name: 'user_a_id') String userAId,
      @JsonKey(name: 'user_b_id') String userBId,
      String status,
      @JsonKey(name: 'match_score') double matchScore,
      @JsonKey(name: 'skill_similarity_score') double skillSimilarityScore,
      @JsonKey(name: 'availability_score') double availabilityScore,
      @JsonKey(name: 'reputation_score') double reputationScore,
      @JsonKey(name: 'ai_explanation') String? aiExplanation,
      @JsonKey(name: 'matched_skills') List<String> matchedSkills,
      @JsonKey(name: 'initiated_by') String? initiatedBy,
      @JsonKey(name: 'expires_at') DateTime? expiresAt,
      @JsonKey(name: 'other_user') ProfileModel? otherUser});

  $ProfileModelCopyWith<$Res>? get otherUser;
}

/// @nodoc
class _$MatchModelCopyWithImpl<$Res, $Val extends MatchModel>
    implements $MatchModelCopyWith<$Res> {
  _$MatchModelCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? userAId = null,
    Object? userBId = null,
    Object? status = null,
    Object? matchScore = null,
    Object? skillSimilarityScore = null,
    Object? availabilityScore = null,
    Object? reputationScore = null,
    Object? aiExplanation = freezed,
    Object? matchedSkills = null,
    Object? initiatedBy = freezed,
    Object? expiresAt = freezed,
    Object? otherUser = freezed,
  }) {
    return _then(_value.copyWith(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      userAId: null == userAId
          ? _value.userAId
          : userAId // ignore: cast_nullable_to_non_nullable
              as String,
      userBId: null == userBId
          ? _value.userBId
          : userBId // ignore: cast_nullable_to_non_nullable
              as String,
      status: null == status
          ? _value.status
          : status // ignore: cast_nullable_to_non_nullable
              as String,
      matchScore: null == matchScore
          ? _value.matchScore
          : matchScore // ignore: cast_nullable_to_non_nullable
              as double,
      skillSimilarityScore: null == skillSimilarityScore
          ? _value.skillSimilarityScore
          : skillSimilarityScore // ignore: cast_nullable_to_non_nullable
              as double,
      availabilityScore: null == availabilityScore
          ? _value.availabilityScore
          : availabilityScore // ignore: cast_nullable_to_non_nullable
              as double,
      reputationScore: null == reputationScore
          ? _value.reputationScore
          : reputationScore // ignore: cast_nullable_to_non_nullable
              as double,
      aiExplanation: freezed == aiExplanation
          ? _value.aiExplanation
          : aiExplanation // ignore: cast_nullable_to_non_nullable
              as String?,
      matchedSkills: null == matchedSkills
          ? _value.matchedSkills
          : matchedSkills // ignore: cast_nullable_to_non_nullable
              as List<String>,
      initiatedBy: freezed == initiatedBy
          ? _value.initiatedBy
          : initiatedBy // ignore: cast_nullable_to_non_nullable
              as String?,
      expiresAt: freezed == expiresAt
          ? _value.expiresAt
          : expiresAt // ignore: cast_nullable_to_non_nullable
              as DateTime?,
      otherUser: freezed == otherUser
          ? _value.otherUser
          : otherUser // ignore: cast_nullable_to_non_nullable
              as ProfileModel?,
    ) as $Val);
  }

  @override
  @pragma('vm:prefer-inline')
  $ProfileModelCopyWith<$Res>? get otherUser {
    if (_value.otherUser == null) {
      return null;
    }

    return $ProfileModelCopyWith<$Res>(_value.otherUser!, (value) {
      return _then(_value.copyWith(otherUser: value) as $Val);
    });
  }
}

/// @nodoc
abstract class _$$MatchModelImplCopyWith<$Res>
    implements $MatchModelCopyWith<$Res> {
  factory _$$MatchModelImplCopyWith(
          _$MatchModelImpl value, $Res Function(_$MatchModelImpl) then) =
      __$$MatchModelImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {String id,
      @JsonKey(name: 'user_a_id') String userAId,
      @JsonKey(name: 'user_b_id') String userBId,
      String status,
      @JsonKey(name: 'match_score') double matchScore,
      @JsonKey(name: 'skill_similarity_score') double skillSimilarityScore,
      @JsonKey(name: 'availability_score') double availabilityScore,
      @JsonKey(name: 'reputation_score') double reputationScore,
      @JsonKey(name: 'ai_explanation') String? aiExplanation,
      @JsonKey(name: 'matched_skills') List<String> matchedSkills,
      @JsonKey(name: 'initiated_by') String? initiatedBy,
      @JsonKey(name: 'expires_at') DateTime? expiresAt,
      @JsonKey(name: 'other_user') ProfileModel? otherUser});

  @override
  $ProfileModelCopyWith<$Res>? get otherUser;
}

/// @nodoc
class __$$MatchModelImplCopyWithImpl<$Res>
    extends _$MatchModelCopyWithImpl<$Res, _$MatchModelImpl>
    implements _$$MatchModelImplCopyWith<$Res> {
  __$$MatchModelImplCopyWithImpl(
      _$MatchModelImpl _value, $Res Function(_$MatchModelImpl) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? userAId = null,
    Object? userBId = null,
    Object? status = null,
    Object? matchScore = null,
    Object? skillSimilarityScore = null,
    Object? availabilityScore = null,
    Object? reputationScore = null,
    Object? aiExplanation = freezed,
    Object? matchedSkills = null,
    Object? initiatedBy = freezed,
    Object? expiresAt = freezed,
    Object? otherUser = freezed,
  }) {
    return _then(_$MatchModelImpl(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      userAId: null == userAId
          ? _value.userAId
          : userAId // ignore: cast_nullable_to_non_nullable
              as String,
      userBId: null == userBId
          ? _value.userBId
          : userBId // ignore: cast_nullable_to_non_nullable
              as String,
      status: null == status
          ? _value.status
          : status // ignore: cast_nullable_to_non_nullable
              as String,
      matchScore: null == matchScore
          ? _value.matchScore
          : matchScore // ignore: cast_nullable_to_non_nullable
              as double,
      skillSimilarityScore: null == skillSimilarityScore
          ? _value.skillSimilarityScore
          : skillSimilarityScore // ignore: cast_nullable_to_non_nullable
              as double,
      availabilityScore: null == availabilityScore
          ? _value.availabilityScore
          : availabilityScore // ignore: cast_nullable_to_non_nullable
              as double,
      reputationScore: null == reputationScore
          ? _value.reputationScore
          : reputationScore // ignore: cast_nullable_to_non_nullable
              as double,
      aiExplanation: freezed == aiExplanation
          ? _value.aiExplanation
          : aiExplanation // ignore: cast_nullable_to_non_nullable
              as String?,
      matchedSkills: null == matchedSkills
          ? _value._matchedSkills
          : matchedSkills // ignore: cast_nullable_to_non_nullable
              as List<String>,
      initiatedBy: freezed == initiatedBy
          ? _value.initiatedBy
          : initiatedBy // ignore: cast_nullable_to_non_nullable
              as String?,
      expiresAt: freezed == expiresAt
          ? _value.expiresAt
          : expiresAt // ignore: cast_nullable_to_non_nullable
              as DateTime?,
      otherUser: freezed == otherUser
          ? _value.otherUser
          : otherUser // ignore: cast_nullable_to_non_nullable
              as ProfileModel?,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$MatchModelImpl implements _MatchModel {
  const _$MatchModelImpl(
      {required this.id,
      @JsonKey(name: 'user_a_id') required this.userAId,
      @JsonKey(name: 'user_b_id') required this.userBId,
      this.status = 'pending',
      @JsonKey(name: 'match_score') this.matchScore = 0.0,
      @JsonKey(name: 'skill_similarity_score') this.skillSimilarityScore = 0.0,
      @JsonKey(name: 'availability_score') this.availabilityScore = 0.0,
      @JsonKey(name: 'reputation_score') this.reputationScore = 0.0,
      @JsonKey(name: 'ai_explanation') this.aiExplanation,
      @JsonKey(name: 'matched_skills')
      final List<String> matchedSkills = const <String>[],
      @JsonKey(name: 'initiated_by') this.initiatedBy,
      @JsonKey(name: 'expires_at') this.expiresAt,
      @JsonKey(name: 'other_user') this.otherUser})
      : _matchedSkills = matchedSkills;

  factory _$MatchModelImpl.fromJson(Map<String, dynamic> json) =>
      _$$MatchModelImplFromJson(json);

  @override
  final String id;
  @override
  @JsonKey(name: 'user_a_id')
  final String userAId;
  @override
  @JsonKey(name: 'user_b_id')
  final String userBId;
  @override
  @JsonKey()
  final String status;
  @override
  @JsonKey(name: 'match_score')
  final double matchScore;
  @override
  @JsonKey(name: 'skill_similarity_score')
  final double skillSimilarityScore;
  @override
  @JsonKey(name: 'availability_score')
  final double availabilityScore;
  @override
  @JsonKey(name: 'reputation_score')
  final double reputationScore;
  @override
  @JsonKey(name: 'ai_explanation')
  final String? aiExplanation;
  final List<String> _matchedSkills;
  @override
  @JsonKey(name: 'matched_skills')
  List<String> get matchedSkills {
    if (_matchedSkills is EqualUnmodifiableListView) return _matchedSkills;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_matchedSkills);
  }

  @override
  @JsonKey(name: 'initiated_by')
  final String? initiatedBy;
  @override
  @JsonKey(name: 'expires_at')
  final DateTime? expiresAt;

  /// The other user in this match (computed on backend).
  @override
  @JsonKey(name: 'other_user')
  final ProfileModel? otherUser;

  @override
  String toString() {
    return 'MatchModel(id: $id, userAId: $userAId, userBId: $userBId, status: $status, matchScore: $matchScore, skillSimilarityScore: $skillSimilarityScore, availabilityScore: $availabilityScore, reputationScore: $reputationScore, aiExplanation: $aiExplanation, matchedSkills: $matchedSkills, initiatedBy: $initiatedBy, expiresAt: $expiresAt, otherUser: $otherUser)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$MatchModelImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.userAId, userAId) || other.userAId == userAId) &&
            (identical(other.userBId, userBId) || other.userBId == userBId) &&
            (identical(other.status, status) || other.status == status) &&
            (identical(other.matchScore, matchScore) ||
                other.matchScore == matchScore) &&
            (identical(other.skillSimilarityScore, skillSimilarityScore) ||
                other.skillSimilarityScore == skillSimilarityScore) &&
            (identical(other.availabilityScore, availabilityScore) ||
                other.availabilityScore == availabilityScore) &&
            (identical(other.reputationScore, reputationScore) ||
                other.reputationScore == reputationScore) &&
            (identical(other.aiExplanation, aiExplanation) ||
                other.aiExplanation == aiExplanation) &&
            const DeepCollectionEquality()
                .equals(other._matchedSkills, _matchedSkills) &&
            (identical(other.initiatedBy, initiatedBy) ||
                other.initiatedBy == initiatedBy) &&
            (identical(other.expiresAt, expiresAt) ||
                other.expiresAt == expiresAt) &&
            (identical(other.otherUser, otherUser) ||
                other.otherUser == otherUser));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(
      runtimeType,
      id,
      userAId,
      userBId,
      status,
      matchScore,
      skillSimilarityScore,
      availabilityScore,
      reputationScore,
      aiExplanation,
      const DeepCollectionEquality().hash(_matchedSkills),
      initiatedBy,
      expiresAt,
      otherUser);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$MatchModelImplCopyWith<_$MatchModelImpl> get copyWith =>
      __$$MatchModelImplCopyWithImpl<_$MatchModelImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$MatchModelImplToJson(
      this,
    );
  }
}

abstract class _MatchModel implements MatchModel {
  const factory _MatchModel(
          {required final String id,
          @JsonKey(name: 'user_a_id') required final String userAId,
          @JsonKey(name: 'user_b_id') required final String userBId,
          final String status,
          @JsonKey(name: 'match_score') final double matchScore,
          @JsonKey(name: 'skill_similarity_score')
          final double skillSimilarityScore,
          @JsonKey(name: 'availability_score') final double availabilityScore,
          @JsonKey(name: 'reputation_score') final double reputationScore,
          @JsonKey(name: 'ai_explanation') final String? aiExplanation,
          @JsonKey(name: 'matched_skills') final List<String> matchedSkills,
          @JsonKey(name: 'initiated_by') final String? initiatedBy,
          @JsonKey(name: 'expires_at') final DateTime? expiresAt,
          @JsonKey(name: 'other_user') final ProfileModel? otherUser}) =
      _$MatchModelImpl;

  factory _MatchModel.fromJson(Map<String, dynamic> json) =
      _$MatchModelImpl.fromJson;

  @override
  String get id;
  @override
  @JsonKey(name: 'user_a_id')
  String get userAId;
  @override
  @JsonKey(name: 'user_b_id')
  String get userBId;
  @override
  String get status;
  @override
  @JsonKey(name: 'match_score')
  double get matchScore;
  @override
  @JsonKey(name: 'skill_similarity_score')
  double get skillSimilarityScore;
  @override
  @JsonKey(name: 'availability_score')
  double get availabilityScore;
  @override
  @JsonKey(name: 'reputation_score')
  double get reputationScore;
  @override
  @JsonKey(name: 'ai_explanation')
  String? get aiExplanation;
  @override
  @JsonKey(name: 'matched_skills')
  List<String> get matchedSkills;
  @override
  @JsonKey(name: 'initiated_by')
  String? get initiatedBy;
  @override
  @JsonKey(name: 'expires_at')
  DateTime? get expiresAt;
  @override

  /// The other user in this match (computed on backend).
  @JsonKey(name: 'other_user')
  ProfileModel? get otherUser;
  @override
  @JsonKey(ignore: true)
  _$$MatchModelImplCopyWith<_$MatchModelImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
