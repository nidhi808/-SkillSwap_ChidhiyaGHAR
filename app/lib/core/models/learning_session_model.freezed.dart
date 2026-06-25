part of 'learning_session_model.dart';

@freezed
class LearningSessionModel with _$LearningSessionModel {
  const factory LearningSessionModel({
    required String id,
    String? matchId,
    required String hostId,
    required String participantId,
    required String title,
    String? description,
    required DateTime scheduledAt,
    required int durationMinutes,
    int? actualDurationMinutes,
    required String status,
    String? agoraChannel,
    String? sessionNotes,
    required bool hostAttendance,
    required bool participantAttendance,
  }) = _LearningSessionModel;

  factory LearningSessionModel.fromJson(Map<String, dynamic> json) =>
      _$LearningSessionModelFromJson(json);
}
