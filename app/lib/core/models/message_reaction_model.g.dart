// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'message_reaction_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$MessageReactionModelImpl _$$MessageReactionModelImplFromJson(
        Map<String, dynamic> json) =>
    _$MessageReactionModelImpl(
      id: json['id'] as String,
      messageId: json['message_id'] as String,
      userId: json['user_id'] as String,
      emoji: json['emoji'] as String,
    );

Map<String, dynamic> _$$MessageReactionModelImplToJson(
        _$MessageReactionModelImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'message_id': instance.messageId,
      'user_id': instance.userId,
      'emoji': instance.emoji,
    };
