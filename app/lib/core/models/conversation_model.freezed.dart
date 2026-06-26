// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'conversation_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models');

ConversationModel _$ConversationModelFromJson(Map<String, dynamic> json) {
  return _ConversationModel.fromJson(json);
}

/// @nodoc
mixin _$ConversationModel {
  String get id => throw _privateConstructorUsedError;
  @JsonKey(name: 'user_a_id')
  String get userAId => throw _privateConstructorUsedError;
  @JsonKey(name: 'user_b_id')
  String get userBId => throw _privateConstructorUsedError;
  @JsonKey(name: 'last_message_at')
  DateTime? get lastMessageAt => throw _privateConstructorUsedError;
  @JsonKey(name: 'other_user')
  ProfileModel? get otherUser => throw _privateConstructorUsedError;
  @JsonKey(name: 'last_message')
  MessageModel? get lastMessage => throw _privateConstructorUsedError;
  @JsonKey(name: 'unread_count')
  int get unreadCount => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $ConversationModelCopyWith<ConversationModel> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $ConversationModelCopyWith<$Res> {
  factory $ConversationModelCopyWith(
          ConversationModel value, $Res Function(ConversationModel) then) =
      _$ConversationModelCopyWithImpl<$Res, ConversationModel>;
  @useResult
  $Res call(
      {String id,
      @JsonKey(name: 'user_a_id') String userAId,
      @JsonKey(name: 'user_b_id') String userBId,
      @JsonKey(name: 'last_message_at') DateTime? lastMessageAt,
      @JsonKey(name: 'other_user') ProfileModel? otherUser,
      @JsonKey(name: 'last_message') MessageModel? lastMessage,
      @JsonKey(name: 'unread_count') int unreadCount});

  $ProfileModelCopyWith<$Res>? get otherUser;
  $MessageModelCopyWith<$Res>? get lastMessage;
}

/// @nodoc
class _$ConversationModelCopyWithImpl<$Res, $Val extends ConversationModel>
    implements $ConversationModelCopyWith<$Res> {
  _$ConversationModelCopyWithImpl(this._value, this._then);

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
    Object? lastMessageAt = freezed,
    Object? otherUser = freezed,
    Object? lastMessage = freezed,
    Object? unreadCount = null,
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
      lastMessageAt: freezed == lastMessageAt
          ? _value.lastMessageAt
          : lastMessageAt // ignore: cast_nullable_to_non_nullable
              as DateTime?,
      otherUser: freezed == otherUser
          ? _value.otherUser
          : otherUser // ignore: cast_nullable_to_non_nullable
              as ProfileModel?,
      lastMessage: freezed == lastMessage
          ? _value.lastMessage
          : lastMessage // ignore: cast_nullable_to_non_nullable
              as MessageModel?,
      unreadCount: null == unreadCount
          ? _value.unreadCount
          : unreadCount // ignore: cast_nullable_to_non_nullable
              as int,
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

  @override
  @pragma('vm:prefer-inline')
  $MessageModelCopyWith<$Res>? get lastMessage {
    if (_value.lastMessage == null) {
      return null;
    }

    return $MessageModelCopyWith<$Res>(_value.lastMessage!, (value) {
      return _then(_value.copyWith(lastMessage: value) as $Val);
    });
  }
}

/// @nodoc
abstract class _$$ConversationModelImplCopyWith<$Res>
    implements $ConversationModelCopyWith<$Res> {
  factory _$$ConversationModelImplCopyWith(_$ConversationModelImpl value,
          $Res Function(_$ConversationModelImpl) then) =
      __$$ConversationModelImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {String id,
      @JsonKey(name: 'user_a_id') String userAId,
      @JsonKey(name: 'user_b_id') String userBId,
      @JsonKey(name: 'last_message_at') DateTime? lastMessageAt,
      @JsonKey(name: 'other_user') ProfileModel? otherUser,
      @JsonKey(name: 'last_message') MessageModel? lastMessage,
      @JsonKey(name: 'unread_count') int unreadCount});

  @override
  $ProfileModelCopyWith<$Res>? get otherUser;
  @override
  $MessageModelCopyWith<$Res>? get lastMessage;
}

/// @nodoc
class __$$ConversationModelImplCopyWithImpl<$Res>
    extends _$ConversationModelCopyWithImpl<$Res, _$ConversationModelImpl>
    implements _$$ConversationModelImplCopyWith<$Res> {
  __$$ConversationModelImplCopyWithImpl(_$ConversationModelImpl _value,
      $Res Function(_$ConversationModelImpl) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? userAId = null,
    Object? userBId = null,
    Object? lastMessageAt = freezed,
    Object? otherUser = freezed,
    Object? lastMessage = freezed,
    Object? unreadCount = null,
  }) {
    return _then(_$ConversationModelImpl(
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
      lastMessageAt: freezed == lastMessageAt
          ? _value.lastMessageAt
          : lastMessageAt // ignore: cast_nullable_to_non_nullable
              as DateTime?,
      otherUser: freezed == otherUser
          ? _value.otherUser
          : otherUser // ignore: cast_nullable_to_non_nullable
              as ProfileModel?,
      lastMessage: freezed == lastMessage
          ? _value.lastMessage
          : lastMessage // ignore: cast_nullable_to_non_nullable
              as MessageModel?,
      unreadCount: null == unreadCount
          ? _value.unreadCount
          : unreadCount // ignore: cast_nullable_to_non_nullable
              as int,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$ConversationModelImpl implements _ConversationModel {
  const _$ConversationModelImpl(
      {required this.id,
      @JsonKey(name: 'user_a_id') required this.userAId,
      @JsonKey(name: 'user_b_id') required this.userBId,
      @JsonKey(name: 'last_message_at') this.lastMessageAt,
      @JsonKey(name: 'other_user') this.otherUser,
      @JsonKey(name: 'last_message') this.lastMessage,
      @JsonKey(name: 'unread_count') this.unreadCount = 0});

  factory _$ConversationModelImpl.fromJson(Map<String, dynamic> json) =>
      _$$ConversationModelImplFromJson(json);

  @override
  final String id;
  @override
  @JsonKey(name: 'user_a_id')
  final String userAId;
  @override
  @JsonKey(name: 'user_b_id')
  final String userBId;
  @override
  @JsonKey(name: 'last_message_at')
  final DateTime? lastMessageAt;
  @override
  @JsonKey(name: 'other_user')
  final ProfileModel? otherUser;
  @override
  @JsonKey(name: 'last_message')
  final MessageModel? lastMessage;
  @override
  @JsonKey(name: 'unread_count')
  final int unreadCount;

  @override
  String toString() {
    return 'ConversationModel(id: $id, userAId: $userAId, userBId: $userBId, lastMessageAt: $lastMessageAt, otherUser: $otherUser, lastMessage: $lastMessage, unreadCount: $unreadCount)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$ConversationModelImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.userAId, userAId) || other.userAId == userAId) &&
            (identical(other.userBId, userBId) || other.userBId == userBId) &&
            (identical(other.lastMessageAt, lastMessageAt) ||
                other.lastMessageAt == lastMessageAt) &&
            (identical(other.otherUser, otherUser) ||
                other.otherUser == otherUser) &&
            (identical(other.lastMessage, lastMessage) ||
                other.lastMessage == lastMessage) &&
            (identical(other.unreadCount, unreadCount) ||
                other.unreadCount == unreadCount));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(runtimeType, id, userAId, userBId,
      lastMessageAt, otherUser, lastMessage, unreadCount);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$ConversationModelImplCopyWith<_$ConversationModelImpl> get copyWith =>
      __$$ConversationModelImplCopyWithImpl<_$ConversationModelImpl>(
          this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$ConversationModelImplToJson(
      this,
    );
  }
}

abstract class _ConversationModel implements ConversationModel {
  const factory _ConversationModel(
          {required final String id,
          @JsonKey(name: 'user_a_id') required final String userAId,
          @JsonKey(name: 'user_b_id') required final String userBId,
          @JsonKey(name: 'last_message_at') final DateTime? lastMessageAt,
          @JsonKey(name: 'other_user') final ProfileModel? otherUser,
          @JsonKey(name: 'last_message') final MessageModel? lastMessage,
          @JsonKey(name: 'unread_count') final int unreadCount}) =
      _$ConversationModelImpl;

  factory _ConversationModel.fromJson(Map<String, dynamic> json) =
      _$ConversationModelImpl.fromJson;

  @override
  String get id;
  @override
  @JsonKey(name: 'user_a_id')
  String get userAId;
  @override
  @JsonKey(name: 'user_b_id')
  String get userBId;
  @override
  @JsonKey(name: 'last_message_at')
  DateTime? get lastMessageAt;
  @override
  @JsonKey(name: 'other_user')
  ProfileModel? get otherUser;
  @override
  @JsonKey(name: 'last_message')
  MessageModel? get lastMessage;
  @override
  @JsonKey(name: 'unread_count')
  int get unreadCount;
  @override
  @JsonKey(ignore: true)
  _$$ConversationModelImplCopyWith<_$ConversationModelImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
