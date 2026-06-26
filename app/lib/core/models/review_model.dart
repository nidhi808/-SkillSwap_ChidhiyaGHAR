import 'package:freezed_annotation/freezed_annotation.dart';
import 'profile_model.dart';

part 'review_model.freezed.dart';
part 'review_model.g.dart';

@freezed
class ReviewModel with _$ReviewModel {
  const factory ReviewModel({
    required String id,
    @JsonKey(name: 'session_id') required String sessionId,
    @JsonKey(name: 'reviewer_id') required String reviewerId,
    @JsonKey(name: 'reviewee_id') required String revieweeId,
    required int rating,
    String? comment,
    @JsonKey(name: 'response_comment') String? responseComment,
    ProfileModel? reviewer,
    @JsonKey(name: 'created_at') DateTime? createdAt,
  }) = _ReviewModel;

  factory ReviewModel.fromJson(Map<String, dynamic> json) =>
      _$ReviewModelFromJson(json);
}
