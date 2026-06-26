import 'package:freezed_annotation/freezed_annotation.dart';
import 'profile_model.dart';
import 'message_model.dart';

part 'conversation_model.freezed.dart';
part 'conversation_model.g.dart';

@freezed
class ConversationModel with _$ConversationModel {
  const factory ConversationModel({
    required String id,
    @JsonKey(name: 'user_a_id') required String userAId,
    @JsonKey(name: 'user_b_id') required String userBId,
    @JsonKey(name: 'last_message_at') DateTime? lastMessageAt,
    @JsonKey(name: 'other_user') ProfileModel? otherUser,
    @JsonKey(name: 'last_message') MessageModel? lastMessage,
    @JsonKey(name: 'unread_count') @Default(0) int unreadCount,
  }) = _ConversationModel;

  factory ConversationModel.fromJson(Map<String, dynamic> json) =>
      _$ConversationModelFromJson(json);
}
