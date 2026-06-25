import 'package:freezed_annotation/freezed_annotation.dart';

part 'learning_session_model.freezed.dart';
part 'learning_session_model.g.dart';

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
