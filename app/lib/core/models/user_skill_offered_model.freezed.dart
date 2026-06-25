part of 'user_skill_offered_model.dart';

@freezed
class UserSkillOfferedModel with _$UserSkillOfferedModel {
  const factory UserSkillOfferedModel({
    required String id,
    required String userId,
    required String skillId,
    required SkillModel skill,
    required String proficiencyLevel,
    double? yearsExperience,
    String? description,
  }) = _UserSkillOfferedModel;

  factory UserSkillOfferedModel.fromJson(Map<String, dynamic> json) =>
      _$UserSkillOfferedModelFromJson(json);
}
