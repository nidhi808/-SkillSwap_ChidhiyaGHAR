part of 'conversation_model.dart';

@freezed
class ConversationModel with _$ConversationModel {
  const factory ConversationModel({
    required String id,
    required String userAId,
    required String userBId,
    required DateTime lastMessageAt,
    ProfileModel? otherUser,
    MessageModel? lastMessage,
    @Default(0) int unreadCount,
  }) = _ConversationModel;

  factory ConversationModel.fromJson(Map<String, dynamic> json) =>
      _$ConversationModelFromJson(json);
}
