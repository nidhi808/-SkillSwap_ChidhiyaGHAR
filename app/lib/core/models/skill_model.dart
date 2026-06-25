import 'package:freezed_annotation/freezed_annotation.dart';

part 'skill_model.freezed.dart';
part 'skill_model.g.dart';

@freezed
class SkillModel with _$SkillModel {
  const factory SkillModel({
    required String id,
    String? categoryId,
    required String name,
    required String slug,
    String? description,
    required List<String> tags,
    required int usageCount,
    required bool isVerified,
  }) = _SkillModel;

  factory SkillModel.fromJson(Map<String, dynamic> json) =>
      _$SkillModelFromJson(json);
}
