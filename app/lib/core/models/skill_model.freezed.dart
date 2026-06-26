// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'skill_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models');

SkillModel _$SkillModelFromJson(Map<String, dynamic> json) {
  return _SkillModel.fromJson(json);
}

/// @nodoc
mixin _$SkillModel {
  String get id => throw _privateConstructorUsedError;
  @JsonKey(name: 'category_id')
  String? get categoryId => throw _privateConstructorUsedError;
  String get name => throw _privateConstructorUsedError;
  String get slug => throw _privateConstructorUsedError;
  String? get description => throw _privateConstructorUsedError;
  List<String> get tags => throw _privateConstructorUsedError;
  @JsonKey(name: 'usage_count')
  int get usageCount => throw _privateConstructorUsedError;
  @JsonKey(name: 'is_verified')
  bool get isVerified => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $SkillModelCopyWith<SkillModel> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $SkillModelCopyWith<$Res> {
  factory $SkillModelCopyWith(
          SkillModel value, $Res Function(SkillModel) then) =
      _$SkillModelCopyWithImpl<$Res, SkillModel>;
  @useResult
  $Res call(
      {String id,
      @JsonKey(name: 'category_id') String? categoryId,
      String name,
      String slug,
      String? description,
      List<String> tags,
      @JsonKey(name: 'usage_count') int usageCount,
      @JsonKey(name: 'is_verified') bool isVerified});
}

/// @nodoc
class _$SkillModelCopyWithImpl<$Res, $Val extends SkillModel>
    implements $SkillModelCopyWith<$Res> {
  _$SkillModelCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? categoryId = freezed,
    Object? name = null,
    Object? slug = null,
    Object? description = freezed,
    Object? tags = null,
    Object? usageCount = null,
    Object? isVerified = null,
  }) {
    return _then(_value.copyWith(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      categoryId: freezed == categoryId
          ? _value.categoryId
          : categoryId // ignore: cast_nullable_to_non_nullable
              as String?,
      name: null == name
          ? _value.name
          : name // ignore: cast_nullable_to_non_nullable
              as String,
      slug: null == slug
          ? _value.slug
          : slug // ignore: cast_nullable_to_non_nullable
              as String,
      description: freezed == description
          ? _value.description
          : description // ignore: cast_nullable_to_non_nullable
              as String?,
      tags: null == tags
          ? _value.tags
          : tags // ignore: cast_nullable_to_non_nullable
              as List<String>,
      usageCount: null == usageCount
          ? _value.usageCount
          : usageCount // ignore: cast_nullable_to_non_nullable
              as int,
      isVerified: null == isVerified
          ? _value.isVerified
          : isVerified // ignore: cast_nullable_to_non_nullable
              as bool,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$SkillModelImplCopyWith<$Res>
    implements $SkillModelCopyWith<$Res> {
  factory _$$SkillModelImplCopyWith(
          _$SkillModelImpl value, $Res Function(_$SkillModelImpl) then) =
      __$$SkillModelImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {String id,
      @JsonKey(name: 'category_id') String? categoryId,
      String name,
      String slug,
      String? description,
      List<String> tags,
      @JsonKey(name: 'usage_count') int usageCount,
      @JsonKey(name: 'is_verified') bool isVerified});
}

/// @nodoc
class __$$SkillModelImplCopyWithImpl<$Res>
    extends _$SkillModelCopyWithImpl<$Res, _$SkillModelImpl>
    implements _$$SkillModelImplCopyWith<$Res> {
  __$$SkillModelImplCopyWithImpl(
      _$SkillModelImpl _value, $Res Function(_$SkillModelImpl) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? categoryId = freezed,
    Object? name = null,
    Object? slug = null,
    Object? description = freezed,
    Object? tags = null,
    Object? usageCount = null,
    Object? isVerified = null,
  }) {
    return _then(_$SkillModelImpl(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      categoryId: freezed == categoryId
          ? _value.categoryId
          : categoryId // ignore: cast_nullable_to_non_nullable
              as String?,
      name: null == name
          ? _value.name
          : name // ignore: cast_nullable_to_non_nullable
              as String,
      slug: null == slug
          ? _value.slug
          : slug // ignore: cast_nullable_to_non_nullable
              as String,
      description: freezed == description
          ? _value.description
          : description // ignore: cast_nullable_to_non_nullable
              as String?,
      tags: null == tags
          ? _value._tags
          : tags // ignore: cast_nullable_to_non_nullable
              as List<String>,
      usageCount: null == usageCount
          ? _value.usageCount
          : usageCount // ignore: cast_nullable_to_non_nullable
              as int,
      isVerified: null == isVerified
          ? _value.isVerified
          : isVerified // ignore: cast_nullable_to_non_nullable
              as bool,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$SkillModelImpl implements _SkillModel {
  const _$SkillModelImpl(
      {required this.id,
      @JsonKey(name: 'category_id') this.categoryId,
      required this.name,
      required this.slug,
      this.description,
      final List<String> tags = const <String>[],
      @JsonKey(name: 'usage_count') this.usageCount = 0,
      @JsonKey(name: 'is_verified') this.isVerified = false})
      : _tags = tags;

  factory _$SkillModelImpl.fromJson(Map<String, dynamic> json) =>
      _$$SkillModelImplFromJson(json);

  @override
  final String id;
  @override
  @JsonKey(name: 'category_id')
  final String? categoryId;
  @override
  final String name;
  @override
  final String slug;
  @override
  final String? description;
  final List<String> _tags;
  @override
  @JsonKey()
  List<String> get tags {
    if (_tags is EqualUnmodifiableListView) return _tags;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_tags);
  }

  @override
  @JsonKey(name: 'usage_count')
  final int usageCount;
  @override
  @JsonKey(name: 'is_verified')
  final bool isVerified;

  @override
  String toString() {
    return 'SkillModel(id: $id, categoryId: $categoryId, name: $name, slug: $slug, description: $description, tags: $tags, usageCount: $usageCount, isVerified: $isVerified)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$SkillModelImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.categoryId, categoryId) ||
                other.categoryId == categoryId) &&
            (identical(other.name, name) || other.name == name) &&
            (identical(other.slug, slug) || other.slug == slug) &&
            (identical(other.description, description) ||
                other.description == description) &&
            const DeepCollectionEquality().equals(other._tags, _tags) &&
            (identical(other.usageCount, usageCount) ||
                other.usageCount == usageCount) &&
            (identical(other.isVerified, isVerified) ||
                other.isVerified == isVerified));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(
      runtimeType,
      id,
      categoryId,
      name,
      slug,
      description,
      const DeepCollectionEquality().hash(_tags),
      usageCount,
      isVerified);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$SkillModelImplCopyWith<_$SkillModelImpl> get copyWith =>
      __$$SkillModelImplCopyWithImpl<_$SkillModelImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$SkillModelImplToJson(
      this,
    );
  }
}

abstract class _SkillModel implements SkillModel {
  const factory _SkillModel(
      {required final String id,
      @JsonKey(name: 'category_id') final String? categoryId,
      required final String name,
      required final String slug,
      final String? description,
      final List<String> tags,
      @JsonKey(name: 'usage_count') final int usageCount,
      @JsonKey(name: 'is_verified') final bool isVerified}) = _$SkillModelImpl;

  factory _SkillModel.fromJson(Map<String, dynamic> json) =
      _$SkillModelImpl.fromJson;

  @override
  String get id;
  @override
  @JsonKey(name: 'category_id')
  String? get categoryId;
  @override
  String get name;
  @override
  String get slug;
  @override
  String? get description;
  @override
  List<String> get tags;
  @override
  @JsonKey(name: 'usage_count')
  int get usageCount;
  @override
  @JsonKey(name: 'is_verified')
  bool get isVerified;
  @override
  @JsonKey(ignore: true)
  _$$SkillModelImplCopyWith<_$SkillModelImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
