// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'conversation_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$ConversationModelImpl _$$ConversationModelImplFromJson(
        Map<String, dynamic> json) =>
    _$ConversationModelImpl(
      id: json['id'] as String,
      userAId: json['user_a_id'] as String,
      userBId: json['user_b_id'] as String,
      lastMessageAt: json['last_message_at'] == null
          ? null
          : DateTime.parse(json['last_message_at'] as String),
      otherUser: json['other_user'] == null
          ? null
          : ProfileModel.fromJson(json['other_user'] as Map<String, dynamic>),
      lastMessage: json['last_message'] == null
          ? null
          : MessageModel.fromJson(json['last_message'] as Map<String, dynamic>),
      unreadCount: (json['unread_count'] as num?)?.toInt() ?? 0,
    );

Map<String, dynamic> _$$ConversationModelImplToJson(
        _$ConversationModelImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'user_a_id': instance.userAId,
      'user_b_id': instance.userBId,
      'last_message_at': instance.lastMessageAt?.toIso8601String(),
      'other_user': instance.otherUser,
      'last_message': instance.lastMessage,
      'unread_count': instance.unreadCount,
    };
