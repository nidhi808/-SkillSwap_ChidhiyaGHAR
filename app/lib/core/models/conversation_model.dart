import 'package:freezed_annotation/freezed_annotation.dart';
import 'profile_model.dart';
import 'message_model.dart';

part 'conversation_model.freezed.dart';
part 'conversation_model.g.dart';

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
