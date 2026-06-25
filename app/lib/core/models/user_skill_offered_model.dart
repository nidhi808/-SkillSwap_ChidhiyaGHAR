import 'package:freezed_annotation/freezed_annotation.dart';
import 'skill_model.dart';

part 'user_skill_offered_model.freezed.dart';
part 'user_skill_offered_model.g.dart';

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
