// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'badge_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models');

BadgeModel _$BadgeModelFromJson(Map<String, dynamic> json) {
  return _BadgeModel.fromJson(json);
}

/// @nodoc
mixin _$BadgeModel {
  String get id => throw _privateConstructorUsedError;
  String get name => throw _privateConstructorUsedError;
  String get slug => throw _privateConstructorUsedError;
  String get description => throw _privateConstructorUsedError;
  @JsonKey(name: 'icon_url')
  String? get iconUrl => throw _privateConstructorUsedError;
  String get tier => throw _privateConstructorUsedError;
  @JsonKey(name: 'earned_at')
  DateTime? get earnedAt => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $BadgeModelCopyWith<BadgeModel> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $BadgeModelCopyWith<$Res> {
  factory $BadgeModelCopyWith(
          BadgeModel value, $Res Function(BadgeModel) then) =
      _$BadgeModelCopyWithImpl<$Res, BadgeModel>;
  @useResult
  $Res call(
      {String id,
      String name,
      String slug,
      String description,
      @JsonKey(name: 'icon_url') String? iconUrl,
      String tier,
      @JsonKey(name: 'earned_at') DateTime? earnedAt});
}

/// @nodoc
class _$BadgeModelCopyWithImpl<$Res, $Val extends BadgeModel>
    implements $BadgeModelCopyWith<$Res> {
  _$BadgeModelCopyWithImpl(this._value, this._then);

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
    Object? description = null,
    Object? iconUrl = freezed,
    Object? tier = null,
    Object? earnedAt = freezed,
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
      description: null == description
          ? _value.description
          : description // ignore: cast_nullable_to_non_nullable
              as String,
      iconUrl: freezed == iconUrl
          ? _value.iconUrl
          : iconUrl // ignore: cast_nullable_to_non_nullable
              as String?,
      tier: null == tier
          ? _value.tier
          : tier // ignore: cast_nullable_to_non_nullable
              as String,
      earnedAt: freezed == earnedAt
          ? _value.earnedAt
          : earnedAt // ignore: cast_nullable_to_non_nullable
              as DateTime?,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$BadgeModelImplCopyWith<$Res>
    implements $BadgeModelCopyWith<$Res> {
  factory _$$BadgeModelImplCopyWith(
          _$BadgeModelImpl value, $Res Function(_$BadgeModelImpl) then) =
      __$$BadgeModelImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {String id,
      String name,
      String slug,
      String description,
      @JsonKey(name: 'icon_url') String? iconUrl,
      String tier,
      @JsonKey(name: 'earned_at') DateTime? earnedAt});
}

/// @nodoc
class __$$BadgeModelImplCopyWithImpl<$Res>
    extends _$BadgeModelCopyWithImpl<$Res, _$BadgeModelImpl>
    implements _$$BadgeModelImplCopyWith<$Res> {
  __$$BadgeModelImplCopyWithImpl(
      _$BadgeModelImpl _value, $Res Function(_$BadgeModelImpl) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? name = null,
    Object? slug = null,
    Object? description = null,
    Object? iconUrl = freezed,
    Object? tier = null,
    Object? earnedAt = freezed,
  }) {
    return _then(_$BadgeModelImpl(
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
      description: null == description
          ? _value.description
          : description // ignore: cast_nullable_to_non_nullable
              as String,
      iconUrl: freezed == iconUrl
          ? _value.iconUrl
          : iconUrl // ignore: cast_nullable_to_non_nullable
              as String?,
      tier: null == tier
          ? _value.tier
          : tier // ignore: cast_nullable_to_non_nullable
              as String,
      earnedAt: freezed == earnedAt
          ? _value.earnedAt
          : earnedAt // ignore: cast_nullable_to_non_nullable
              as DateTime?,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$BadgeModelImpl extends _BadgeModel {
  const _$BadgeModelImpl(
      {required this.id,
      required this.name,
      required this.slug,
      required this.description,
      @JsonKey(name: 'icon_url') this.iconUrl,
      this.tier = 'bronze',
      @JsonKey(name: 'earned_at') this.earnedAt})
      : super._();

  factory _$BadgeModelImpl.fromJson(Map<String, dynamic> json) =>
      _$$BadgeModelImplFromJson(json);

  @override
  final String id;
  @override
  final String name;
  @override
  final String slug;
  @override
  final String description;
  @override
  @JsonKey(name: 'icon_url')
  final String? iconUrl;
  @override
  @JsonKey()
  final String tier;
  @override
  @JsonKey(name: 'earned_at')
  final DateTime? earnedAt;

  @override
  String toString() {
    return 'BadgeModel(id: $id, name: $name, slug: $slug, description: $description, iconUrl: $iconUrl, tier: $tier, earnedAt: $earnedAt)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$BadgeModelImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.name, name) || other.name == name) &&
            (identical(other.slug, slug) || other.slug == slug) &&
            (identical(other.description, description) ||
                other.description == description) &&
            (identical(other.iconUrl, iconUrl) || other.iconUrl == iconUrl) &&
            (identical(other.tier, tier) || other.tier == tier) &&
            (identical(other.earnedAt, earnedAt) ||
                other.earnedAt == earnedAt));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(
      runtimeType, id, name, slug, description, iconUrl, tier, earnedAt);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$BadgeModelImplCopyWith<_$BadgeModelImpl> get copyWith =>
      __$$BadgeModelImplCopyWithImpl<_$BadgeModelImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$BadgeModelImplToJson(
      this,
    );
  }
}

abstract class _BadgeModel extends BadgeModel {
  const factory _BadgeModel(
      {required final String id,
      required final String name,
      required final String slug,
      required final String description,
      @JsonKey(name: 'icon_url') final String? iconUrl,
      final String tier,
      @JsonKey(name: 'earned_at') final DateTime? earnedAt}) = _$BadgeModelImpl;
  const _BadgeModel._() : super._();

  factory _BadgeModel.fromJson(Map<String, dynamic> json) =
      _$BadgeModelImpl.fromJson;

  @override
  String get id;
  @override
  String get name;
  @override
  String get slug;
  @override
  String get description;
  @override
  @JsonKey(name: 'icon_url')
  String? get iconUrl;
  @override
  String get tier;
  @override
  @JsonKey(name: 'earned_at')
  DateTime? get earnedAt;
  @override
  @JsonKey(ignore: true)
  _$$BadgeModelImplCopyWith<_$BadgeModelImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
