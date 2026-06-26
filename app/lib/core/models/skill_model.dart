import 'package:freezed_annotation/freezed_annotation.dart';

part 'skill_model.freezed.dart';
part 'skill_model.g.dart';

@freezed
class SkillModel with _$SkillModel {
  const factory SkillModel({
    required String id,
    @JsonKey(name: 'category_id') String? categoryId,
    required String name,
    required String slug,
    String? description,
    @Default(<String>[]) List<String> tags,
    @JsonKey(name: 'usage_count') @Default(0) int usageCount,
    @JsonKey(name: 'is_verified') @Default(false) bool isVerified,
  }) = _SkillModel;

  factory SkillModel.fromJson(Map<String, dynamic> json) =>
      _$SkillModelFromJson(json);
}
