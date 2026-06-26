import 'package:freezed_annotation/freezed_annotation.dart';

part 'badge_model.freezed.dart';
part 'badge_model.g.dart';

@freezed
class BadgeModel with _$BadgeModel {
  const BadgeModel._();

  const factory BadgeModel({
    required String id,
    required String name,
    required String slug,
    required String description,
    @JsonKey(name: 'icon_url') String? iconUrl,
    @Default('bronze') String tier,
    @JsonKey(name: 'earned_at') DateTime? earnedAt,
  }) = _BadgeModel;

  /// Whether this badge has been earned by the user.
  bool get isEarned => earnedAt != null;

  factory BadgeModel.fromJson(Map<String, dynamic> json) =>
      _$BadgeModelFromJson(json);
}
