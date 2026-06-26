// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'review_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$ReviewModelImpl _$$ReviewModelImplFromJson(Map<String, dynamic> json) =>
    _$ReviewModelImpl(
      id: json['id'] as String,
      sessionId: json['session_id'] as String,
      reviewerId: json['reviewer_id'] as String,
      revieweeId: json['reviewee_id'] as String,
      rating: (json['rating'] as num).toInt(),
      comment: json['comment'] as String?,
      responseComment: json['response_comment'] as String?,
      reviewer: json['reviewer'] == null
          ? null
          : ProfileModel.fromJson(json['reviewer'] as Map<String, dynamic>),
      createdAt: json['created_at'] == null
          ? null
          : DateTime.parse(json['created_at'] as String),
    );

Map<String, dynamic> _$$ReviewModelImplToJson(_$ReviewModelImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'session_id': instance.sessionId,
      'reviewer_id': instance.reviewerId,
      'reviewee_id': instance.revieweeId,
      'rating': instance.rating,
      'comment': instance.comment,
      'response_comment': instance.responseComment,
      'reviewer': instance.reviewer,
      'created_at': instance.createdAt?.toIso8601String(),
    };
