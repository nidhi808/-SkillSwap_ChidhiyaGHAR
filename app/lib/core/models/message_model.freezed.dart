part of 'message_model.dart';

@freezed
class MessageModel with _$MessageModel {
  const factory MessageModel({
    required String id,
    required String conversationId,
    required String senderId,
    required String text,
    String? attachmentUrl,
    String? attachmentType,
    required bool isRead,
    DateTime? readAt,
    required DateTime createdAt,
    @Default([]) List<MessageReactionModel> reactions,
  }) = _MessageModel;

  factory MessageModel.fromJson(Map<String, dynamic> json) =>
      _$MessageModelFromJson(json);
}
