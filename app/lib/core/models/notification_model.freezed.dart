part of 'notification_model.dart';

@freezed
class NotificationModel with _$NotificationModel {
  const factory NotificationModel({
    required String id,
    required String userId,
    String? actorId,
    required String type,
    required String title,
    String? body,
    Map<String, dynamic>? data,
    required bool isRead,
    required DateTime createdAt,
  }) = _NotificationModel;

  factory NotificationModel.fromJson(Map<String, dynamic> json) =>
      _$NotificationModelFromJson(json);
}
