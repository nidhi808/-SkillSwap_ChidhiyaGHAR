part of 'user_skill_wanted_model.dart';

@freezed
class UserSkillWantedModel with _$UserSkillWantedModel {
  const factory UserSkillWantedModel({
    required String id,
    required String userId,
    required String skillId,
    required SkillModel skill,
    required String currentLevel,
    required String targetLevel,
    required String urgency,
    String? notes,
  }) = _UserSkillWantedModel;

  factory UserSkillWantedModel.fromJson(Map<String, dynamic> json) =>
      _$UserSkillWantedModelFromJson(json);
}
