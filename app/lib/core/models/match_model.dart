import 'package:freezed_annotation/freezed_annotation.dart';
import 'profile_model.dart';

part 'match_model.freezed.dart';
part 'match_model.g.dart';

@freezed
class MatchModel with _$MatchModel {
  const factory MatchModel({
    required String id,
    @JsonKey(name: 'user_a_id') required String userAId,
    @JsonKey(name: 'user_b_id') required String userBId,
    @Default('pending') String status,
    @JsonKey(name: 'match_score') @Default(0.0) double matchScore,
    @JsonKey(name: 'skill_similarity_score') @Default(0.0) double skillSimilarityScore,
    @JsonKey(name: 'availability_score') @Default(0.0) double availabilityScore,
    @JsonKey(name: 'reputation_score') @Default(0.0) double reputationScore,
    @JsonKey(name: 'ai_explanation') String? aiExplanation,
    @JsonKey(name: 'matched_skills') @Default(<String>[]) List<String> matchedSkills,
    @JsonKey(name: 'initiated_by') String? initiatedBy,
    @JsonKey(name: 'expires_at') DateTime? expiresAt,
    /// The other user in this match (computed on backend).
    @JsonKey(name: 'other_user') ProfileModel? otherUser,
  }) = _MatchModel;

  factory MatchModel.fromJson(Map<String, dynamic> json) =>
      _$MatchModelFromJson(json);
}
