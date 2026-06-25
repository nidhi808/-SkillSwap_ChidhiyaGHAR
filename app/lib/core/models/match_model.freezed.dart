part of 'match_model.dart';

@freezed
class MatchModel with _$MatchModel {
  const factory MatchModel({
    required String id,
    required String userAId,
    required String userBId,
    required String status,
    required double matchScore,
    required double skillSimilarityScore,
    required double availabilityScore,
    required double reputationScore,
    String? aiExplanation,
    required List<String> matchedSkills,
    String? initiatedBy,
    DateTime? expiresAt,
    ProfileModel? otherUser,
  }) = _MatchModel;

  factory MatchModel.fromJson(Map<String, dynamic> json) =>
      _$MatchModelFromJson(json);
}
