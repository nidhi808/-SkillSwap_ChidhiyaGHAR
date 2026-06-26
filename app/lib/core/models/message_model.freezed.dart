// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'message_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models');

MessageModel _$MessageModelFromJson(Map<String, dynamic> json) {
  return _MessageModel.fromJson(json);
}

/// @nodoc
mixin _$MessageModel {
  String get id => throw _privateConstructorUsedError;
  @JsonKey(name: 'conversation_id')
  String get conversationId => throw _privateConstructorUsedError;
  @JsonKey(name: 'sender_id')
  String get senderId => throw _privateConstructorUsedError;
  String get text => throw _privateConstructorUsedError;
  @JsonKey(name: 'attachment_url')
  String? get attachmentUrl => throw _privateConstructorUsedError;
  @JsonKey(name: 'attachment_type')
  String? get attachmentType => throw _privateConstructorUsedError;
  @JsonKey(name: 'is_read')
  bool get isRead => throw _privateConstructorUsedError;
  @JsonKey(name: 'read_at')
  DateTime? get readAt => throw _privateConstructorUsedError;
  @JsonKey(name: 'created_at')
  DateTime? get createdAt => throw _privateConstructorUsedError;
  List<MessageReactionModel> get reactions =>
      throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $MessageModelCopyWith<MessageModel> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $MessageModelCopyWith<$Res> {
  factory $MessageModelCopyWith(
          MessageModel value, $Res Function(MessageModel) then) =
      _$MessageModelCopyWithImpl<$Res, MessageModel>;
  @useResult
  $Res call(
      {String id,
      @JsonKey(name: 'conversation_id') String conversationId,
      @JsonKey(name: 'sender_id') String senderId,
      String text,
      @JsonKey(name: 'attachment_url') String? attachmentUrl,
      @JsonKey(name: 'attachment_type') String? attachmentType,
      @JsonKey(name: 'is_read') bool isRead,
      @JsonKey(name: 'read_at') DateTime? readAt,
      @JsonKey(name: 'created_at') DateTime? createdAt,
      List<MessageReactionModel> reactions});
}

/// @nodoc
class _$MessageModelCopyWithImpl<$Res, $Val extends MessageModel>
    implements $MessageModelCopyWith<$Res> {
  _$MessageModelCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? conversationId = null,
    Object? senderId = null,
    Object? text = null,
    Object? attachmentUrl = freezed,
    Object? attachmentType = freezed,
    Object? isRead = null,
    Object? readAt = freezed,
    Object? createdAt = freezed,
    Object? reactions = null,
  }) {
    return _then(_value.copyWith(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      conversationId: null == conversationId
          ? _value.conversationId
          : conversationId // ignore: cast_nullable_to_non_nullable
              as String,
      senderId: null == senderId
          ? _value.senderId
          : senderId // ignore: cast_nullable_to_non_nullable
              as String,
      text: null == text
          ? _value.text
          : text // ignore: cast_nullable_to_non_nullable
              as String,
      attachmentUrl: freezed == attachmentUrl
          ? _value.attachmentUrl
          : attachmentUrl // ignore: cast_nullable_to_non_nullable
              as String?,
      attachmentType: freezed == attachmentType
          ? _value.attachmentType
          : attachmentType // ignore: cast_nullable_to_non_nullable
              as String?,
      isRead: null == isRead
          ? _value.isRead
          : isRead // ignore: cast_nullable_to_non_nullable
              as bool,
      readAt: freezed == readAt
          ? _value.readAt
          : readAt // ignore: cast_nullable_to_non_nullable
              as DateTime?,
      createdAt: freezed == createdAt
          ? _value.createdAt
          : createdAt // ignore: cast_nullable_to_non_nullable
              as DateTime?,
      reactions: null == reactions
          ? _value.reactions
          : reactions // ignore: cast_nullable_to_non_nullable
              as List<MessageReactionModel>,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$MessageModelImplCopyWith<$Res>
    implements $MessageModelCopyWith<$Res> {
  factory _$$MessageModelImplCopyWith(
          _$MessageModelImpl value, $Res Function(_$MessageModelImpl) then) =
      __$$MessageModelImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {String id,
      @JsonKey(name: 'conversation_id') String conversationId,
      @JsonKey(name: 'sender_id') String senderId,
      String text,
      @JsonKey(name: 'attachment_url') String? attachmentUrl,
      @JsonKey(name: 'attachment_type') String? attachmentType,
      @JsonKey(name: 'is_read') bool isRead,
      @JsonKey(name: 'read_at') DateTime? readAt,
      @JsonKey(name: 'created_at') DateTime? createdAt,
      List<MessageReactionModel> reactions});
}

/// @nodoc
class __$$MessageModelImplCopyWithImpl<$Res>
    extends _$MessageModelCopyWithImpl<$Res, _$MessageModelImpl>
    implements _$$MessageModelImplCopyWith<$Res> {
  __$$MessageModelImplCopyWithImpl(
      _$MessageModelImpl _value, $Res Function(_$MessageModelImpl) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? conversationId = null,
    Object? senderId = null,
    Object? text = null,
    Object? attachmentUrl = freezed,
    Object? attachmentType = freezed,
    Object? isRead = null,
    Object? readAt = freezed,
    Object? createdAt = freezed,
    Object? reactions = null,
  }) {
    return _then(_$MessageModelImpl(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      conversationId: null == conversationId
          ? _value.conversationId
          : conversationId // ignore: cast_nullable_to_non_nullable
              as String,
      senderId: null == senderId
          ? _value.senderId
          : senderId // ignore: cast_nullable_to_non_nullable
              as String,
      text: null == text
          ? _value.text
          : text // ignore: cast_nullable_to_non_nullable
              as String,
      attachmentUrl: freezed == attachmentUrl
          ? _value.attachmentUrl
          : attachmentUrl // ignore: cast_nullable_to_non_nullable
              as String?,
      attachmentType: freezed == attachmentType
          ? _value.attachmentType
          : attachmentType // ignore: cast_nullable_to_non_nullable
              as String?,
      isRead: null == isRead
          ? _value.isRead
          : isRead // ignore: cast_nullable_to_non_nullable
              as bool,
      readAt: freezed == readAt
          ? _value.readAt
          : readAt // ignore: cast_nullable_to_non_nullable
              as DateTime?,
      createdAt: freezed == createdAt
          ? _value.createdAt
          : createdAt // ignore: cast_nullable_to_non_nullable
              as DateTime?,
      reactions: null == reactions
          ? _value._reactions
          : reactions // ignore: cast_nullable_to_non_nullable
              as List<MessageReactionModel>,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$MessageModelImpl implements _MessageModel {
  const _$MessageModelImpl(
      {required this.id,
      @JsonKey(name: 'conversation_id') required this.conversationId,
      @JsonKey(name: 'sender_id') required this.senderId,
      required this.text,
      @JsonKey(name: 'attachment_url') this.attachmentUrl,
      @JsonKey(name: 'attachment_type') this.attachmentType,
      @JsonKey(name: 'is_read') this.isRead = false,
      @JsonKey(name: 'read_at') this.readAt,
      @JsonKey(name: 'created_at') this.createdAt,
      final List<MessageReactionModel> reactions =
          const <MessageReactionModel>[]})
      : _reactions = reactions;

  factory _$MessageModelImpl.fromJson(Map<String, dynamic> json) =>
      _$$MessageModelImplFromJson(json);

  @override
  final String id;
  @override
  @JsonKey(name: 'conversation_id')
  final String conversationId;
  @override
  @JsonKey(name: 'sender_id')
  final String senderId;
  @override
  final String text;
  @override
  @JsonKey(name: 'attachment_url')
  final String? attachmentUrl;
  @override
  @JsonKey(name: 'attachment_type')
  final String? attachmentType;
  @override
  @JsonKey(name: 'is_read')
  final bool isRead;
  @override
  @JsonKey(name: 'read_at')
  final DateTime? readAt;
  @override
  @JsonKey(name: 'created_at')
  final DateTime? createdAt;
  final List<MessageReactionModel> _reactions;
  @override
  @JsonKey()
  List<MessageReactionModel> get reactions {
    if (_reactions is EqualUnmodifiableListView) return _reactions;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_reactions);
  }

  @override
  String toString() {
    return 'MessageModel(id: $id, conversationId: $conversationId, senderId: $senderId, text: $text, attachmentUrl: $attachmentUrl, attachmentType: $attachmentType, isRead: $isRead, readAt: $readAt, createdAt: $createdAt, reactions: $reactions)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$MessageModelImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.conversationId, conversationId) ||
                other.conversationId == conversationId) &&
            (identical(other.senderId, senderId) ||
                other.senderId == senderId) &&
            (identical(other.text, text) || other.text == text) &&
            (identical(other.attachmentUrl, attachmentUrl) ||
                other.attachmentUrl == attachmentUrl) &&
            (identical(other.attachmentType, attachmentType) ||
                other.attachmentType == attachmentType) &&
            (identical(other.isRead, isRead) || other.isRead == isRead) &&
            (identical(other.readAt, readAt) || other.readAt == readAt) &&
            (identical(other.createdAt, createdAt) ||
                other.createdAt == createdAt) &&
            const DeepCollectionEquality()
                .equals(other._reactions, _reactions));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(
      runtimeType,
      id,
      conversationId,
      senderId,
      text,
      attachmentUrl,
      attachmentType,
      isRead,
      readAt,
      createdAt,
      const DeepCollectionEquality().hash(_reactions));

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$MessageModelImplCopyWith<_$MessageModelImpl> get copyWith =>
      __$$MessageModelImplCopyWithImpl<_$MessageModelImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$MessageModelImplToJson(
      this,
    );
  }
}

abstract class _MessageModel implements MessageModel {
  const factory _MessageModel(
      {required final String id,
      @JsonKey(name: 'conversation_id') required final String conversationId,
      @JsonKey(name: 'sender_id') required final String senderId,
      required final String text,
      @JsonKey(name: 'attachment_url') final String? attachmentUrl,
      @JsonKey(name: 'attachment_type') final String? attachmentType,
      @JsonKey(name: 'is_read') final bool isRead,
      @JsonKey(name: 'read_at') final DateTime? readAt,
      @JsonKey(name: 'created_at') final DateTime? createdAt,
      final List<MessageReactionModel> reactions}) = _$MessageModelImpl;

  factory _MessageModel.fromJson(Map<String, dynamic> json) =
      _$MessageModelImpl.fromJson;

  @override
  String get id;
  @override
  @JsonKey(name: 'conversation_id')
  String get conversationId;
  @override
  @JsonKey(name: 'sender_id')
  String get senderId;
  @override
  String get text;
  @override
  @JsonKey(name: 'attachment_url')
  String? get attachmentUrl;
  @override
  @JsonKey(name: 'attachment_type')
  String? get attachmentType;
  @override
  @JsonKey(name: 'is_read')
  bool get isRead;
  @override
  @JsonKey(name: 'read_at')
  DateTime? get readAt;
  @override
  @JsonKey(name: 'created_at')
  DateTime? get createdAt;
  @override
  List<MessageReactionModel> get reactions;
  @override
  @JsonKey(ignore: true)
  _$$MessageModelImplCopyWith<_$MessageModelImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
