part of 'message_reaction_model.dart';

@freezed
class MessageReactionModel with _$MessageReactionModel {
  const factory MessageReactionModel({
    required String id,
    required String messageId,
    required String userId,
    required String emoji,
  }) = _MessageReactionModel;

  factory MessageReactionModel.fromJson(Map<String, dynamic> json) =>
      _$MessageReactionModelFromJson(json);
}
