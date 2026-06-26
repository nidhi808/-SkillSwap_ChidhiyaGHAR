// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'match_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$MatchModelImpl _$$MatchModelImplFromJson(Map<String, dynamic> json) =>
    _$MatchModelImpl(
      id: json['id'] as String,
      userAId: json['user_a_id'] as String,
      userBId: json['user_b_id'] as String,
      status: json['status'] as String? ?? 'pending',
      matchScore: (json['match_score'] as num?)?.toDouble() ?? 0.0,
      skillSimilarityScore:
          (json['skill_similarity_score'] as num?)?.toDouble() ?? 0.0,
      availabilityScore:
          (json['availability_score'] as num?)?.toDouble() ?? 0.0,
      reputationScore: (json['reputation_score'] as num?)?.toDouble() ?? 0.0,
      aiExplanation: json['ai_explanation'] as String?,
      matchedSkills: (json['matched_skills'] as List<dynamic>?)
              ?.map((e) => e as String)
              .toList() ??
          const <String>[],
      initiatedBy: json['initiated_by'] as String?,
      expiresAt: json['expires_at'] == null
          ? null
          : DateTime.parse(json['expires_at'] as String),
      otherUser: json['other_user'] == null
          ? null
          : ProfileModel.fromJson(json['other_user'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$$MatchModelImplToJson(_$MatchModelImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'user_a_id': instance.userAId,
      'user_b_id': instance.userBId,
      'status': instance.status,
      'match_score': instance.matchScore,
      'skill_similarity_score': instance.skillSimilarityScore,
      'availability_score': instance.availabilityScore,
      'reputation_score': instance.reputationScore,
      'ai_explanation': instance.aiExplanation,
      'matched_skills': instance.matchedSkills,
      'initiated_by': instance.initiatedBy,
      'expires_at': instance.expiresAt?.toIso8601String(),
      'other_user': instance.otherUser,
    };
