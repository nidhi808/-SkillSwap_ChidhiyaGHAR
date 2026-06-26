// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'user_skill_wanted_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models');

UserSkillWantedModel _$UserSkillWantedModelFromJson(Map<String, dynamic> json) {
  return _UserSkillWantedModel.fromJson(json);
}

/// @nodoc
mixin _$UserSkillWantedModel {
  String get id => throw _privateConstructorUsedError;
  @JsonKey(name: 'user_id')
  String get userId => throw _privateConstructorUsedError;
  @JsonKey(name: 'skill_id')
  String get skillId => throw _privateConstructorUsedError;
  SkillModel? get skill => throw _privateConstructorUsedError;
  @JsonKey(name: 'current_level')
  String get currentLevel => throw _privateConstructorUsedError;
  @JsonKey(name: 'target_level')
  String get targetLevel => throw _privateConstructorUsedError;
  String get urgency => throw _privateConstructorUsedError;
  String? get notes => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $UserSkillWantedModelCopyWith<UserSkillWantedModel> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $UserSkillWantedModelCopyWith<$Res> {
  factory $UserSkillWantedModelCopyWith(UserSkillWantedModel value,
          $Res Function(UserSkillWantedModel) then) =
      _$UserSkillWantedModelCopyWithImpl<$Res, UserSkillWantedModel>;
  @useResult
  $Res call(
      {String id,
      @JsonKey(name: 'user_id') String userId,
      @JsonKey(name: 'skill_id') String skillId,
      SkillModel? skill,
      @JsonKey(name: 'current_level') String currentLevel,
      @JsonKey(name: 'target_level') String targetLevel,
      String urgency,
      String? notes});

  $SkillModelCopyWith<$Res>? get skill;
}

/// @nodoc
class _$UserSkillWantedModelCopyWithImpl<$Res,
        $Val extends UserSkillWantedModel>
    implements $UserSkillWantedModelCopyWith<$Res> {
  _$UserSkillWantedModelCopyWithImpl(this._value, this._then);

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
    Object? currentLevel = null,
    Object? targetLevel = null,
    Object? urgency = null,
    Object? notes = freezed,
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
      currentLevel: null == currentLevel
          ? _value.currentLevel
          : currentLevel // ignore: cast_nullable_to_non_nullable
              as String,
      targetLevel: null == targetLevel
          ? _value.targetLevel
          : targetLevel // ignore: cast_nullable_to_non_nullable
              as String,
      urgency: null == urgency
          ? _value.urgency
          : urgency // ignore: cast_nullable_to_non_nullable
              as String,
      notes: freezed == notes
          ? _value.notes
          : notes // ignore: cast_nullable_to_non_nullable
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
abstract class _$$UserSkillWantedModelImplCopyWith<$Res>
    implements $UserSkillWantedModelCopyWith<$Res> {
  factory _$$UserSkillWantedModelImplCopyWith(_$UserSkillWantedModelImpl value,
          $Res Function(_$UserSkillWantedModelImpl) then) =
      __$$UserSkillWantedModelImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {String id,
      @JsonKey(name: 'user_id') String userId,
      @JsonKey(name: 'skill_id') String skillId,
      SkillModel? skill,
      @JsonKey(name: 'current_level') String currentLevel,
      @JsonKey(name: 'target_level') String targetLevel,
      String urgency,
      String? notes});

  @override
  $SkillModelCopyWith<$Res>? get skill;
}

/// @nodoc
class __$$UserSkillWantedModelImplCopyWithImpl<$Res>
    extends _$UserSkillWantedModelCopyWithImpl<$Res, _$UserSkillWantedModelImpl>
    implements _$$UserSkillWantedModelImplCopyWith<$Res> {
  __$$UserSkillWantedModelImplCopyWithImpl(_$UserSkillWantedModelImpl _value,
      $Res Function(_$UserSkillWantedModelImpl) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? userId = null,
    Object? skillId = null,
    Object? skill = freezed,
    Object? currentLevel = null,
    Object? targetLevel = null,
    Object? urgency = null,
    Object? notes = freezed,
  }) {
    return _then(_$UserSkillWantedModelImpl(
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
      currentLevel: null == currentLevel
          ? _value.currentLevel
          : currentLevel // ignore: cast_nullable_to_non_nullable
              as String,
      targetLevel: null == targetLevel
          ? _value.targetLevel
          : targetLevel // ignore: cast_nullable_to_non_nullable
              as String,
      urgency: null == urgency
          ? _value.urgency
          : urgency // ignore: cast_nullable_to_non_nullable
              as String,
      notes: freezed == notes
          ? _value.notes
          : notes // ignore: cast_nullable_to_non_nullable
              as String?,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$UserSkillWantedModelImpl implements _UserSkillWantedModel {
  const _$UserSkillWantedModelImpl(
      {required this.id,
      @JsonKey(name: 'user_id') required this.userId,
      @JsonKey(name: 'skill_id') required this.skillId,
      this.skill,
      @JsonKey(name: 'current_level') this.currentLevel = 'beginner',
      @JsonKey(name: 'target_level') this.targetLevel = 'intermediate',
      this.urgency = 'medium',
      this.notes});

  factory _$UserSkillWantedModelImpl.fromJson(Map<String, dynamic> json) =>
      _$$UserSkillWantedModelImplFromJson(json);

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
  @JsonKey(name: 'current_level')
  final String currentLevel;
  @override
  @JsonKey(name: 'target_level')
  final String targetLevel;
  @override
  @JsonKey()
  final String urgency;
  @override
  final String? notes;

  @override
  String toString() {
    return 'UserSkillWantedModel(id: $id, userId: $userId, skillId: $skillId, skill: $skill, currentLevel: $currentLevel, targetLevel: $targetLevel, urgency: $urgency, notes: $notes)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$UserSkillWantedModelImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.userId, userId) || other.userId == userId) &&
            (identical(other.skillId, skillId) || other.skillId == skillId) &&
            (identical(other.skill, skill) || other.skill == skill) &&
            (identical(other.currentLevel, currentLevel) ||
                other.currentLevel == currentLevel) &&
            (identical(other.targetLevel, targetLevel) ||
                other.targetLevel == targetLevel) &&
            (identical(other.urgency, urgency) || other.urgency == urgency) &&
            (identical(other.notes, notes) || other.notes == notes));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(runtimeType, id, userId, skillId, skill,
      currentLevel, targetLevel, urgency, notes);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$UserSkillWantedModelImplCopyWith<_$UserSkillWantedModelImpl>
      get copyWith =>
          __$$UserSkillWantedModelImplCopyWithImpl<_$UserSkillWantedModelImpl>(
              this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$UserSkillWantedModelImplToJson(
      this,
    );
  }
}

abstract class _UserSkillWantedModel implements UserSkillWantedModel {
  const factory _UserSkillWantedModel(
      {required final String id,
      @JsonKey(name: 'user_id') required final String userId,
      @JsonKey(name: 'skill_id') required final String skillId,
      final SkillModel? skill,
      @JsonKey(name: 'current_level') final String currentLevel,
      @JsonKey(name: 'target_level') final String targetLevel,
      final String urgency,
      final String? notes}) = _$UserSkillWantedModelImpl;

  factory _UserSkillWantedModel.fromJson(Map<String, dynamic> json) =
      _$UserSkillWantedModelImpl.fromJson;

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
  @JsonKey(name: 'current_level')
  String get currentLevel;
  @override
  @JsonKey(name: 'target_level')
  String get targetLevel;
  @override
  String get urgency;
  @override
  String? get notes;
  @override
  @JsonKey(ignore: true)
  _$$UserSkillWantedModelImplCopyWith<_$UserSkillWantedModelImpl>
      get copyWith => throw _privateConstructorUsedError;
}
