// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'user_skill_offered_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models');

UserSkillOfferedModel _$UserSkillOfferedModelFromJson(
    Map<String, dynamic> json) {
  return _UserSkillOfferedModel.fromJson(json);
}

/// @nodoc
mixin _$UserSkillOfferedModel {
  String get id => throw _privateConstructorUsedError;
  @JsonKey(name: 'user_id')
  String get userId => throw _privateConstructorUsedError;
  @JsonKey(name: 'skill_id')
  String get skillId => throw _privateConstructorUsedError;
  SkillModel? get skill => throw _privateConstructorUsedError;
  @JsonKey(name: 'proficiency_level')
  String get proficiencyLevel => throw _privateConstructorUsedError;
  @JsonKey(name: 'years_experience')
  double get yearsExperience => throw _privateConstructorUsedError;
  String? get description => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $UserSkillOfferedModelCopyWith<UserSkillOfferedModel> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $UserSkillOfferedModelCopyWith<$Res> {
  factory $UserSkillOfferedModelCopyWith(UserSkillOfferedModel value,
          $Res Function(UserSkillOfferedModel) then) =
      _$UserSkillOfferedModelCopyWithImpl<$Res, UserSkillOfferedModel>;
  @useResult
  $Res call(
      {String id,
      @JsonKey(name: 'user_id') String userId,
      @JsonKey(name: 'skill_id') String skillId,
      SkillModel? skill,
      @JsonKey(name: 'proficiency_level') String proficiencyLevel,
      @JsonKey(name: 'years_experience') double yearsExperience,
      String? description});

  $SkillModelCopyWith<$Res>? get skill;
}

/// @nodoc
class _$UserSkillOfferedModelCopyWithImpl<$Res,
        $Val extends UserSkillOfferedModel>
    implements $UserSkillOfferedModelCopyWith<$Res> {
  _$UserSkillOfferedModelCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? userId = null,
    Object? skillId = null,
    Object? skill = freezed,
    Object? proficiencyLevel = null,
    Object? yearsExperience = null,
    Object? description = freezed,
  }) {
    return _then(_value.copyWith(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      userId: null == userId
          ? _value.userId
          : userId // ignore: cast_nullable_to_non_nullable
              as String,
      skillId: null == skillId
          ? _value.skillId
          : skillId // ignore: cast_nullable_to_non_nullable
              as String,
      skill: freezed == skill
          ? _value.skill
          : skill // ignore: cast_nullable_to_non_nullable
              as SkillModel?,
      proficiencyLevel: null == proficiencyLevel
          ? _value.proficiencyLevel
          : proficiencyLevel // ignore: cast_nullable_to_non_nullable
              as String,
      yearsExperience: null == yearsExperience
          ? _value.yearsExperience
          : yearsExperience // ignore: cast_nullable_to_non_nullable
              as double,
      description: freezed == description
          ? _value.description
          : description // ignore: cast_nullable_to_non_nullable
              as String?,
    ) as $Val);
  }

  @override
  @pragma('vm:prefer-inline')
  $SkillModelCopyWith<$Res>? get skill {
    if (_value.skill == null) {
      return null;
    }

    return $SkillModelCopyWith<$Res>(_value.skill!, (value) {
      return _then(_value.copyWith(skill: value) as $Val);
    });
  }
}

/// @nodoc
abstract class _$$UserSkillOfferedModelImplCopyWith<$Res>
    implements $UserSkillOfferedModelCopyWith<$Res> {
  factory _$$UserSkillOfferedModelImplCopyWith(
          _$UserSkillOfferedModelImpl value,
          $Res Function(_$UserSkillOfferedModelImpl) then) =
      __$$UserSkillOfferedModelImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {String id,
      @JsonKey(name: 'user_id') String userId,
      @JsonKey(name: 'skill_id') String skillId,
      SkillModel? skill,
      @JsonKey(name: 'proficiency_level') String proficiencyLevel,
      @JsonKey(name: 'years_experience') double yearsExperience,
      String? description});

  @override
  $SkillModelCopyWith<$Res>? get skill;
}

/// @nodoc
class __$$UserSkillOfferedModelImplCopyWithImpl<$Res>
    extends _$UserSkillOfferedModelCopyWithImpl<$Res,
        _$UserSkillOfferedModelImpl>
    implements _$$UserSkillOfferedModelImplCopyWith<$Res> {
  __$$UserSkillOfferedModelImplCopyWithImpl(_$UserSkillOfferedModelImpl _value,
      $Res Function(_$UserSkillOfferedModelImpl) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? userId = null,
    Object? skillId = null,
    Object? skill = freezed,
    Object? proficiencyLevel = null,
    Object? yearsExperience = null,
    Object? description = freezed,
  }) {
    return _then(_$UserSkillOfferedModelImpl(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      userId: null == userId
          ? _value.userId
          : userId // ignore: cast_nullable_to_non_nullable
              as String,
      skillId: null == skillId
          ? _value.skillId
          : skillId // ignore: cast_nullable_to_non_nullable
              as String,
      skill: freezed == skill
          ? _value.skill
          : skill // ignore: cast_nullable_to_non_nullable
              as SkillModel?,
      proficiencyLevel: null == proficiencyLevel
          ? _value.proficiencyLevel
          : proficiencyLevel // ignore: cast_nullable_to_non_nullable
              as String,
      yearsExperience: null == yearsExperience
          ? _value.yearsExperience
          : yearsExperience // ignore: cast_nullable_to_non_nullable
              as double,
      description: freezed == description
          ? _value.description
          : description // ignore: cast_nullable_to_non_nullable
              as String?,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$UserSkillOfferedModelImpl implements _UserSkillOfferedModel {
  const _$UserSkillOfferedModelImpl(
      {required this.id,
      @JsonKey(name: 'user_id') required this.userId,
      @JsonKey(name: 'skill_id') required this.skillId,
      this.skill,
      @JsonKey(name: 'proficiency_level') this.proficiencyLevel = 'beginner',
      @JsonKey(name: 'years_experience') this.yearsExperience = 0.0,
      this.description});

  factory _$UserSkillOfferedModelImpl.fromJson(Map<String, dynamic> json) =>
      _$$UserSkillOfferedModelImplFromJson(json);

  @override
  final String id;
  @override
  @JsonKey(name: 'user_id')
  final String userId;
  @override
  @JsonKey(name: 'skill_id')
  final String skillId;
  @override
  final SkillModel? skill;
  @override
  @JsonKey(name: 'proficiency_level')
  final String proficiencyLevel;
  @override
  @JsonKey(name: 'years_experience')
  final double yearsExperience;
  @override
  final String? description;

  @override
  String toString() {
    return 'UserSkillOfferedModel(id: $id, userId: $userId, skillId: $skillId, skill: $skill, proficiencyLevel: $proficiencyLevel, yearsExperience: $yearsExperience, description: $description)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$UserSkillOfferedModelImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.userId, userId) || other.userId == userId) &&
            (identical(other.skillId, skillId) || other.skillId == skillId) &&
            (identical(other.skill, skill) || other.skill == skill) &&
            (identical(other.proficiencyLevel, proficiencyLevel) ||
                other.proficiencyLevel == proficiencyLevel) &&
            (identical(other.yearsExperience, yearsExperience) ||
                other.yearsExperience == yearsExperience) &&
            (identical(other.description, description) ||
                other.description == description));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(runtimeType, id, userId, skillId, skill,
      proficiencyLevel, yearsExperience, description);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$UserSkillOfferedModelImplCopyWith<_$UserSkillOfferedModelImpl>
      get copyWith => __$$UserSkillOfferedModelImplCopyWithImpl<
          _$UserSkillOfferedModelImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$UserSkillOfferedModelImplToJson(
      this,
    );
  }
}

abstract class _UserSkillOfferedModel implements UserSkillOfferedModel {
  const factory _UserSkillOfferedModel(
      {required final String id,
      @JsonKey(name: 'user_id') required final String userId,
      @JsonKey(name: 'skill_id') required final String skillId,
      final SkillModel? skill,
      @JsonKey(name: 'proficiency_level') final String proficiencyLevel,
      @JsonKey(name: 'years_experience') final double yearsExperience,
      final String? description}) = _$UserSkillOfferedModelImpl;

  factory _UserSkillOfferedModel.fromJson(Map<String, dynamic> json) =
      _$UserSkillOfferedModelImpl.fromJson;

  @override
  String get id;
  @override
  @JsonKey(name: 'user_id')
  String get userId;
  @override
  @JsonKey(name: 'skill_id')
  String get skillId;
  @override
  SkillModel? get skill;
  @override
  @JsonKey(name: 'proficiency_level')
  String get proficiencyLevel;
  @override
  @JsonKey(name: 'years_experience')
  double get yearsExperience;
  @override
  String? get description;
  @override
  @JsonKey(ignore: true)
  _$$UserSkillOfferedModelImplCopyWith<_$UserSkillOfferedModelImpl>
      get copyWith => throw _privateConstructorUsedError;
}
