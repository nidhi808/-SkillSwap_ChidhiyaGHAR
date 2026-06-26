import 'package:freezed_annotation/freezed_annotation.dart';
import 'skill_model.dart';

part 'user_skill_wanted_model.freezed.dart';
part 'user_skill_wanted_model.g.dart';

@freezed
class UserSkillWantedModel with _$UserSkillWantedModel {
  const factory UserSkillWantedModel({
    required String id,
    @JsonKey(name: 'user_id') required String userId,
    @JsonKey(name: 'skill_id') required String skillId,
    SkillModel? skill,
    @JsonKey(name: 'current_level') @Default('beginner') String currentLevel,
    @JsonKey(name: 'target_level') @Default('intermediate') String targetLevel,
    @Default('medium') String urgency,
    String? notes,
  }) = _UserSkillWantedModel;

  factory UserSkillWantedModel.fromJson(Map<String, dynamic> json) =>
      _$UserSkillWantedModelFromJson(json);
}
