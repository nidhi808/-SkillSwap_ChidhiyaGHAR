import 'package:freezed_annotation/freezed_annotation.dart';
import 'skill_model.dart';

part 'user_skill_offered_model.freezed.dart';
part 'user_skill_offered_model.g.dart';

@freezed
class UserSkillOfferedModel with _$UserSkillOfferedModel {
  const factory UserSkillOfferedModel({
    required String id,
    @JsonKey(name: 'user_id') required String userId,
    @JsonKey(name: 'skill_id') required String skillId,
    SkillModel? skill,
    @JsonKey(name: 'proficiency_level') @Default('beginner') String proficiencyLevel,
    @JsonKey(name: 'years_experience') @Default(0.0) double yearsExperience,
    String? description,
  }) = _UserSkillOfferedModel;

  factory UserSkillOfferedModel.fromJson(Map<String, dynamic> json) =>
      _$UserSkillOfferedModelFromJson(json);
}
