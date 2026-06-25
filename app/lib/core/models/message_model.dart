import 'package:freezed_annotation/freezed_annotation.dart';
import 'message_reaction_model.dart';

part 'message_model.freezed.dart';
part 'message_model.g.dart';

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
