// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'message_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$MessageModelImpl _$$MessageModelImplFromJson(Map<String, dynamic> json) =>
    _$MessageModelImpl(
      id: json['id'] as String,
      conversationId: json['conversation_id'] as String,
      senderId: json['sender_id'] as String,
      text: json['text'] as String,
      attachmentUrl: json['attachment_url'] as String?,
      attachmentType: json['attachment_type'] as String?,
      isRead: json['is_read'] as bool? ?? false,
      readAt: json['read_at'] == null
          ? null
          : DateTime.parse(json['read_at'] as String),
      createdAt: json['created_at'] == null
          ? null
          : DateTime.parse(json['created_at'] as String),
      reactions: (json['reactions'] as List<dynamic>?)
              ?.map((e) =>
                  MessageReactionModel.fromJson(e as Map<String, dynamic>))
              .toList() ??
          const <MessageReactionModel>[],
    );

Map<String, dynamic> _$$MessageModelImplToJson(_$MessageModelImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'conversation_id': instance.conversationId,
      'sender_id': instance.senderId,
      'text': instance.text,
      'attachment_url': instance.attachmentUrl,
      'attachment_type': instance.attachmentType,
      'is_read': instance.isRead,
      'read_at': instance.readAt?.toIso8601String(),
      'created_at': instance.createdAt?.toIso8601String(),
      'reactions': instance.reactions,
    };
