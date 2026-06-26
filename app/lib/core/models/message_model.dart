import 'package:freezed_annotation/freezed_annotation.dart';
import 'message_reaction_model.dart';

part 'message_model.freezed.dart';
part 'message_model.g.dart';

@freezed
class MessageModel with _$MessageModel {
  const factory MessageModel({
    required String id,
    @JsonKey(name: 'conversation_id') required String conversationId,
    @JsonKey(name: 'sender_id') required String senderId,
    required String text,
    @JsonKey(name: 'attachment_url') String? attachmentUrl,
    @JsonKey(name: 'attachment_type') String? attachmentType,
    @JsonKey(name: 'is_read') @Default(false) bool isRead,
    @JsonKey(name: 'read_at') DateTime? readAt,
    @JsonKey(name: 'created_at') DateTime? createdAt,
    @Default(<MessageReactionModel>[]) List<MessageReactionModel> reactions,
  }) = _MessageModel;

  factory MessageModel.fromJson(Map<String, dynamic> json) =>
      _$MessageModelFromJson(json);
}
