// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'skill_category_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models');

SkillCategoryModel _$SkillCategoryModelFromJson(Map<String, dynamic> json) {
  return _SkillCategoryModel.fromJson(json);
}

/// @nodoc
mixin _$SkillCategoryModel {
  String get id => throw _privateConstructorUsedError;
  String get name => throw _privateConstructorUsedError;
  String get slug => throw _privateConstructorUsedError;
  String? get icon => throw _privateConstructorUsedError;
  String get color => throw _privateConstructorUsedError;
  String? get description => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $SkillCategoryModelCopyWith<SkillCategoryModel> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $SkillCategoryModelCopyWith<$Res> {
  factory $SkillCategoryModelCopyWith(
          SkillCategoryModel value, $Res Function(SkillCategoryModel) then) =
      _$SkillCategoryModelCopyWithImpl<$Res, SkillCategoryModel>;
  @useResult
  $Res call(
      {String id,
      String name,
      String slug,
      String? icon,
      String color,
      String? description});
}

/// @nodoc
class _$SkillCategoryModelCopyWithImpl<$Res, $Val extends SkillCategoryModel>
    implements $SkillCategoryModelCopyWith<$Res> {
  _$SkillCategoryModelCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? name = null,
    Object? slug = null,
    Object? icon = freezed,
    Object? color = null,
    Object? description = freezed,
  }) {
    return _then(_value.copyWith(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      name: null == name
          ? _value.name
          : name // ignore: cast_nullable_to_non_nullable
              as String,
      slug: null == slug
          ? _value.slug
          : slug // ignore: cast_nullable_to_non_nullable
              as String,
      icon: freezed == icon
          ? _value.icon
          : icon // ignore: cast_nullable_to_non_nullable
              as String?,
      color: null == color
          ? _value.color
          : color // ignore: cast_nullable_to_non_nullable
              as String,
      description: freezed == description
          ? _value.description
          : description // ignore: cast_nullable_to_non_nullable
              as String?,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$SkillCategoryModelImplCopyWith<$Res>
    implements $SkillCategoryModelCopyWith<$Res> {
  factory _$$SkillCategoryModelImplCopyWith(_$SkillCategoryModelImpl value,
          $Res Function(_$SkillCategoryModelImpl) then) =
      __$$SkillCategoryModelImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {String id,
      String name,
      String slug,
      String? icon,
      String color,
      String? description});
}

/// @nodoc
class __$$SkillCategoryModelImplCopyWithImpl<$Res>
    extends _$SkillCategoryModelCopyWithImpl<$Res, _$SkillCategoryModelImpl>
    implements _$$SkillCategoryModelImplCopyWith<$Res> {
  __$$SkillCategoryModelImplCopyWithImpl(_$SkillCategoryModelImpl _value,
      $Res Function(_$SkillCategoryModelImpl) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? name = null,
    Object? slug = null,
    Object? icon = freezed,
    Object? color = null,
    Object? description = freezed,
  }) {
    return _then(_$SkillCategoryModelImpl(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      name: null == name
          ? _value.name
          : name // ignore: cast_nullable_to_non_nullable
              as String,
      slug: null == slug
          ? _value.slug
          : slug // ignore: cast_nullable_to_non_nullable
              as String,
      icon: freezed == icon
          ? _value.icon
          : icon // ignore: cast_nullable_to_non_nullable
              as String?,
      color: null == color
          ? _value.color
          : color // ignore: cast_nullable_to_non_nullable
              as String,
      description: freezed == description
          ? _value.description
          : description // ignore: cast_nullable_to_non_nullable
              as String?,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$SkillCategoryModelImpl implements _SkillCategoryModel {
  const _$SkillCategoryModelImpl(
      {required this.id,
      required this.name,
      required this.slug,
      this.icon,
      this.color = '#6366f1',
      this.description});

  factory _$SkillCategoryModelImpl.fromJson(Map<String, dynamic> json) =>
      _$$SkillCategoryModelImplFromJson(json);

  @override
  final String id;
  @override
  final String name;
  @override
  final String slug;
  @override
  final String? icon;
  @override
  @JsonKey()
  final String color;
  @override
  final String? description;

  @override
  String toString() {
    return 'SkillCategoryModel(id: $id, name: $name, slug: $slug, icon: $icon, color: $color, description: $description)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$SkillCategoryModelImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.name, name) || other.name == name) &&
            (identical(other.slug, slug) || other.slug == slug) &&
            (identical(other.icon, icon) || other.icon == icon) &&
            (identical(other.color, color) || other.color == color) &&
            (identical(other.description, description) ||
                other.description == description));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode =>
      Object.hash(runtimeType, id, name, slug, icon, color, description);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$SkillCategoryModelImplCopyWith<_$SkillCategoryModelImpl> get copyWith =>
      __$$SkillCategoryModelImplCopyWithImpl<_$SkillCategoryModelImpl>(
          this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$SkillCategoryModelImplToJson(
      this,
    );
  }
}

abstract class _SkillCategoryModel implements SkillCategoryModel {
  const factory _SkillCategoryModel(
      {required final String id,
      required final String name,
      required final String slug,
      final String? icon,
      final String color,
      final String? description}) = _$SkillCategoryModelImpl;

  factory _SkillCategoryModel.fromJson(Map<String, dynamic> json) =
      _$SkillCategoryModelImpl.fromJson;

  @override
  String get id;
  @override
  String get name;
  @override
  String get slug;
  @override
  String? get icon;
  @override
  String get color;
  @override
  String? get description;
  @override
  @JsonKey(ignore: true)
  _$$SkillCategoryModelImplCopyWith<_$SkillCategoryModelImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
