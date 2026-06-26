// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'user_skill_offered_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$UserSkillOfferedModelImpl _$$UserSkillOfferedModelImplFromJson(
        Map<String, dynamic> json) =>
    _$UserSkillOfferedModelImpl(
      id: json['id'] as String,
      userId: json['user_id'] as String,
      skillId: json['skill_id'] as String,
      skill: json['skill'] == null
          ? null
          : SkillModel.fromJson(json['skill'] as Map<String, dynamic>),
      proficiencyLevel: json['proficiency_level'] as String? ?? 'beginner',
      yearsExperience: (json['years_experience'] as num?)?.toDouble() ?? 0.0,
      description: json['description'] as String?,
    );

Map<String, dynamic> _$$UserSkillOfferedModelImplToJson(
        _$UserSkillOfferedModelImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'user_id': instance.userId,
      'skill_id': instance.skillId,
      'skill': instance.skill,
      'proficiency_level': instance.proficiencyLevel,
      'years_experience': instance.yearsExperience,
      'description': instance.description,
    };
