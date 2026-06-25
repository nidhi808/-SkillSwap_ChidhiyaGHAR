import 'package:freezed_annotation/freezed_annotation.dart';
import 'skill_model.dart';

part 'user_skill_wanted_model.freezed.dart';
part 'user_skill_wanted_model.g.dart';

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
