part of 'skill_category_model.dart';

@freezed
class SkillCategoryModel with _$SkillCategoryModel {
  const factory SkillCategoryModel({
    required String id,
    required String name,
    required String slug,
    String? icon,
    required String color,
    String? description,
  }) = _SkillCategoryModel;

  factory SkillCategoryModel.fromJson(Map<String, dynamic> json) =>
      _$SkillCategoryModelFromJson(json);
}
