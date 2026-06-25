import 'package:freezed_annotation/freezed_annotation.dart';

part 'skill_category_model.freezed.dart';
part 'skill_category_model.g.dart';

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
