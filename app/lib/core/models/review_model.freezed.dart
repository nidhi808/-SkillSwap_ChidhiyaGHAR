part of 'review_model.dart';

@freezed
class ReviewModel with _$ReviewModel {
  const factory ReviewModel({
    required String id,
    required String sessionId,
    required String reviewerId,
    required String revieweeId,
    required int rating,
    String? comment,
    String? responseComment,
    ProfileModel? reviewer,
  }) = _ReviewModel;

  factory ReviewModel.fromJson(Map<String, dynamic> json) =>
      _$ReviewModelFromJson(json);
}
