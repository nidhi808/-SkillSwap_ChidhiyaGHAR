import 'package:freezed_annotation/freezed_annotation.dart';

part 'message_reaction_model.freezed.dart';
part 'message_reaction_model.g.dart';

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
