import 'package:freezed_annotation/freezed_annotation.dart';

part 'badge_model.freezed.dart';
part 'badge_model.g.dart';

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
