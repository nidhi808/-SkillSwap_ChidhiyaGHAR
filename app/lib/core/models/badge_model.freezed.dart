part of 'badge_model.dart';

@freezed
class BadgeModel with _$BadgeModel {
  const factory BadgeModel({
    required String id,
    required String name,
    required String slug,
    required String description,
    String? iconUrl,
    required String tier,
    DateTime? earnedAt,
  }) = _BadgeModel;

  factory BadgeModel.fromJson(Map<String, dynamic> json) =>
      _$BadgeModelFromJson(json);
}
