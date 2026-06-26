// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'user_skill_wanted_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$UserSkillWantedModelImpl _$$UserSkillWantedModelImplFromJson(
        Map<String, dynamic> json) =>
    _$UserSkillWantedModelImpl(
      id: json['id'] as String,
      userId: json['user_id'] as String,
      skillId: json['skill_id'] as String,
      skill: json['skill'] == null
          ? null
          : SkillModel.fromJson(json['skill'] as Map<String, dynamic>),
      currentLevel: json['current_level'] as String? ?? 'beginner',
      targetLevel: json['target_level'] as String? ?? 'intermediate',
      urgency: json['urgency'] as String? ?? 'medium',
      notes: json['notes'] as String?,
    );

Map<String, dynamic> _$$UserSkillWantedModelImplToJson(
        _$UserSkillWantedModelImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'user_id': instance.userId,
      'skill_id': instance.skillId,
      'skill': instance.skill,
      'current_level': instance.currentLevel,
      'target_level': instance.targetLevel,
      'urgency': instance.urgency,
      'notes': instance.notes,
    };
