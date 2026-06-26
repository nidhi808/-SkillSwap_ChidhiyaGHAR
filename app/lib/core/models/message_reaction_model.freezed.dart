// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'message_reaction_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models');

MessageReactionModel _$MessageReactionModelFromJson(Map<String, dynamic> json) {
  return _MessageReactionModel.fromJson(json);
}

/// @nodoc
mixin _$MessageReactionModel {
  String get id => throw _privateConstructorUsedError;
  @JsonKey(name: 'message_id')
  String get messageId => throw _privateConstructorUsedError;
  @JsonKey(name: 'user_id')
  String get userId => throw _privateConstructorUsedError;
  String get emoji => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $MessageReactionModelCopyWith<MessageReactionModel> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $MessageReactionModelCopyWith<$Res> {
  factory $MessageReactionModelCopyWith(MessageReactionModel value,
          $Res Function(MessageReactionModel) then) =
      _$MessageReactionModelCopyWithImpl<$Res, MessageReactionModel>;
  @useResult
  $Res call(
      {String id,
      @JsonKey(name: 'message_id') String messageId,
      @JsonKey(name: 'user_id') String userId,
      String emoji});
}

/// @nodoc
class _$MessageReactionModelCopyWithImpl<$Res,
        $Val extends MessageReactionModel>
    implements $MessageReactionModelCopyWith<$Res> {
  _$MessageReactionModelCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? messageId = null,
    Object? userId = null,
    Object? emoji = null,
  }) {
    return _then(_value.copyWith(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      messageId: null == messageId
          ? _value.messageId
          : messageId // ignore: cast_nullable_to_non_nullable
              as String,
      userId: null == userId
          ? _value.userId
          : userId // ignore: cast_nullable_to_non_nullable
              as String,
      emoji: null == emoji
          ? _value.emoji
          : emoji // ignore: cast_nullable_to_non_nullable
              as String,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$MessageReactionModelImplCopyWith<$Res>
    implements $MessageReactionModelCopyWith<$Res> {
  factory _$$MessageReactionModelImplCopyWith(_$MessageReactionModelImpl value,
          $Res Function(_$MessageReactionModelImpl) then) =
      __$$MessageReactionModelImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {String id,
      @JsonKey(name: 'message_id') String messageId,
      @JsonKey(name: 'user_id') String userId,
      String emoji});
}

/// @nodoc
class __$$MessageReactionModelImplCopyWithImpl<$Res>
    extends _$MessageReactionModelCopyWithImpl<$Res, _$MessageReactionModelImpl>
    implements _$$MessageReactionModelImplCopyWith<$Res> {
  __$$MessageReactionModelImplCopyWithImpl(_$MessageReactionModelImpl _value,
      $Res Function(_$MessageReactionModelImpl) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? messageId = null,
    Object? userId = null,
    Object? emoji = null,
  }) {
    return _then(_$MessageReactionModelImpl(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      messageId: null == messageId
          ? _value.messageId
          : messageId // ignore: cast_nullable_to_non_nullable
              as String,
      userId: null == userId
          ? _value.userId
          : userId // ignore: cast_nullable_to_non_nullable
              as String,
      emoji: null == emoji
          ? _value.emoji
          : emoji // ignore: cast_nullable_to_non_nullable
              as String,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$MessageReactionModelImpl implements _MessageReactionModel {
  const _$MessageReactionModelImpl(
      {required this.id,
      @JsonKey(name: 'message_id') required this.messageId,
      @JsonKey(name: 'user_id') required this.userId,
      required this.emoji});

  factory _$MessageReactionModelImpl.fromJson(Map<String, dynamic> json) =>
      _$$MessageReactionModelImplFromJson(json);

  @override
  final String id;
  @override
  @JsonKey(name: 'message_id')
  final String messageId;
  @override
  @JsonKey(name: 'user_id')
  final String userId;
  @override
  final String emoji;

  @override
  String toString() {
    return 'MessageReactionModel(id: $id, messageId: $messageId, userId: $userId, emoji: $emoji)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$MessageReactionModelImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.messageId, messageId) ||
                other.messageId == messageId) &&
            (identical(other.userId, userId) || other.userId == userId) &&
            (identical(other.emoji, emoji) || other.emoji == emoji));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(runtimeType, id, messageId, userId, emoji);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$MessageReactionModelImplCopyWith<_$MessageReactionModelImpl>
      get copyWith =>
          __$$MessageReactionModelImplCopyWithImpl<_$MessageReactionModelImpl>(
              this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$MessageReactionModelImplToJson(
      this,
    );
  }
}

abstract class _MessageReactionModel implements MessageReactionModel {
  const factory _MessageReactionModel(
      {required final String id,
      @JsonKey(name: 'message_id') required final String messageId,
      @JsonKey(name: 'user_id') required final String userId,
      required final String emoji}) = _$MessageReactionModelImpl;

  factory _MessageReactionModel.fromJson(Map<String, dynamic> json) =
      _$MessageReactionModelImpl.fromJson;

  @override
  String get id;
  @override
  @JsonKey(name: 'message_id')
  String get messageId;
  @override
  @JsonKey(name: 'user_id')
  String get userId;
  @override
  String get emoji;
  @override
  @JsonKey(ignore: true)
  _$$MessageReactionModelImplCopyWith<_$MessageReactionModelImpl>
      get copyWith => throw _privateConstructorUsedError;
}
