// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'review_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models');

ReviewModel _$ReviewModelFromJson(Map<String, dynamic> json) {
  return _ReviewModel.fromJson(json);
}

/// @nodoc
mixin _$ReviewModel {
  String get id => throw _privateConstructorUsedError;
  @JsonKey(name: 'session_id')
  String get sessionId => throw _privateConstructorUsedError;
  @JsonKey(name: 'reviewer_id')
  String get reviewerId => throw _privateConstructorUsedError;
  @JsonKey(name: 'reviewee_id')
  String get revieweeId => throw _privateConstructorUsedError;
  int get rating => throw _privateConstructorUsedError;
  String? get comment => throw _privateConstructorUsedError;
  @JsonKey(name: 'response_comment')
  String? get responseComment => throw _privateConstructorUsedError;
  ProfileModel? get reviewer => throw _privateConstructorUsedError;
  @JsonKey(name: 'created_at')
  DateTime? get createdAt => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $ReviewModelCopyWith<ReviewModel> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $ReviewModelCopyWith<$Res> {
  factory $ReviewModelCopyWith(
          ReviewModel value, $Res Function(ReviewModel) then) =
      _$ReviewModelCopyWithImpl<$Res, ReviewModel>;
  @useResult
  $Res call(
      {String id,
      @JsonKey(name: 'session_id') String sessionId,
      @JsonKey(name: 'reviewer_id') String reviewerId,
      @JsonKey(name: 'reviewee_id') String revieweeId,
      int rating,
      String? comment,
      @JsonKey(name: 'response_comment') String? responseComment,
      ProfileModel? reviewer,
      @JsonKey(name: 'created_at') DateTime? createdAt});

  $ProfileModelCopyWith<$Res>? get reviewer;
}

/// @nodoc
class _$ReviewModelCopyWithImpl<$Res, $Val extends ReviewModel>
    implements $ReviewModelCopyWith<$Res> {
  _$ReviewModelCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? sessionId = null,
    Object? reviewerId = null,
    Object? revieweeId = null,
    Object? rating = null,
    Object? comment = freezed,
    Object? responseComment = freezed,
    Object? reviewer = freezed,
    Object? createdAt = freezed,
  }) {
    return _then(_value.copyWith(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      sessionId: null == sessionId
          ? _value.sessionId
          : sessionId // ignore: cast_nullable_to_non_nullable
              as String,
      reviewerId: null == reviewerId
          ? _value.reviewerId
          : reviewerId // ignore: cast_nullable_to_non_nullable
              as String,
      revieweeId: null == revieweeId
          ? _value.revieweeId
          : revieweeId // ignore: cast_nullable_to_non_nullable
              as String,
      rating: null == rating
          ? _value.rating
          : rating // ignore: cast_nullable_to_non_nullable
              as int,
      comment: freezed == comment
          ? _value.comment
          : comment // ignore: cast_nullable_to_non_nullable
              as String?,
      responseComment: freezed == responseComment
          ? _value.responseComment
          : responseComment // ignore: cast_nullable_to_non_nullable
              as String?,
      reviewer: freezed == reviewer
          ? _value.reviewer
          : reviewer // ignore: cast_nullable_to_non_nullable
              as ProfileModel?,
      createdAt: freezed == createdAt
          ? _value.createdAt
          : createdAt // ignore: cast_nullable_to_non_nullable
              as DateTime?,
    ) as $Val);
  }

  @override
  @pragma('vm:prefer-inline')
  $ProfileModelCopyWith<$Res>? get reviewer {
    if (_value.reviewer == null) {
      return null;
    }

    return $ProfileModelCopyWith<$Res>(_value.reviewer!, (value) {
      return _then(_value.copyWith(reviewer: value) as $Val);
    });
  }
}

/// @nodoc
abstract class _$$ReviewModelImplCopyWith<$Res>
    implements $ReviewModelCopyWith<$Res> {
  factory _$$ReviewModelImplCopyWith(
          _$ReviewModelImpl value, $Res Function(_$ReviewModelImpl) then) =
      __$$ReviewModelImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {String id,
      @JsonKey(name: 'session_id') String sessionId,
      @JsonKey(name: 'reviewer_id') String reviewerId,
      @JsonKey(name: 'reviewee_id') String revieweeId,
      int rating,
      String? comment,
      @JsonKey(name: 'response_comment') String? responseComment,
      ProfileModel? reviewer,
      @JsonKey(name: 'created_at') DateTime? createdAt});

  @override
  $ProfileModelCopyWith<$Res>? get reviewer;
}

/// @nodoc
class __$$ReviewModelImplCopyWithImpl<$Res>
    extends _$ReviewModelCopyWithImpl<$Res, _$ReviewModelImpl>
    implements _$$ReviewModelImplCopyWith<$Res> {
  __$$ReviewModelImplCopyWithImpl(
      _$ReviewModelImpl _value, $Res Function(_$ReviewModelImpl) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? sessionId = null,
    Object? reviewerId = null,
    Object? revieweeId = null,
    Object? rating = null,
    Object? comment = freezed,
    Object? responseComment = freezed,
    Object? reviewer = freezed,
    Object? createdAt = freezed,
  }) {
    return _then(_$ReviewModelImpl(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      sessionId: null == sessionId
          ? _value.sessionId
          : sessionId // ignore: cast_nullable_to_non_nullable
              as String,
      reviewerId: null == reviewerId
          ? _value.reviewerId
          : reviewerId // ignore: cast_nullable_to_non_nullable
              as String,
      revieweeId: null == revieweeId
          ? _value.revieweeId
          : revieweeId // ignore: cast_nullable_to_non_nullable
              as String,
      rating: null == rating
          ? _value.rating
          : rating // ignore: cast_nullable_to_non_nullable
              as int,
      comment: freezed == comment
          ? _value.comment
          : comment // ignore: cast_nullable_to_non_nullable
              as String?,
      responseComment: freezed == responseComment
          ? _value.responseComment
          : responseComment // ignore: cast_nullable_to_non_nullable
              as String?,
      reviewer: freezed == reviewer
          ? _value.reviewer
          : reviewer // ignore: cast_nullable_to_non_nullable
              as ProfileModel?,
      createdAt: freezed == createdAt
          ? _value.createdAt
          : createdAt // ignore: cast_nullable_to_non_nullable
              as DateTime?,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$ReviewModelImpl implements _ReviewModel {
  const _$ReviewModelImpl(
      {required this.id,
      @JsonKey(name: 'session_id') required this.sessionId,
      @JsonKey(name: 'reviewer_id') required this.reviewerId,
      @JsonKey(name: 'reviewee_id') required this.revieweeId,
      required this.rating,
      this.comment,
      @JsonKey(name: 'response_comment') this.responseComment,
      this.reviewer,
      @JsonKey(name: 'created_at') this.createdAt});

  factory _$ReviewModelImpl.fromJson(Map<String, dynamic> json) =>
      _$$ReviewModelImplFromJson(json);

  @override
  final String id;
  @override
  @JsonKey(name: 'session_id')
  final String sessionId;
  @override
  @JsonKey(name: 'reviewer_id')
  final String reviewerId;
  @override
  @JsonKey(name: 'reviewee_id')
  final String revieweeId;
  @override
  final int rating;
  @override
  final String? comment;
  @override
  @JsonKey(name: 'response_comment')
  final String? responseComment;
  @override
  final ProfileModel? reviewer;
  @override
  @JsonKey(name: 'created_at')
  final DateTime? createdAt;

  @override
  String toString() {
    return 'ReviewModel(id: $id, sessionId: $sessionId, reviewerId: $reviewerId, revieweeId: $revieweeId, rating: $rating, comment: $comment, responseComment: $responseComment, reviewer: $reviewer, createdAt: $createdAt)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$ReviewModelImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.sessionId, sessionId) ||
                other.sessionId == sessionId) &&
            (identical(other.reviewerId, reviewerId) ||
                other.reviewerId == reviewerId) &&
            (identical(other.revieweeId, revieweeId) ||
                other.revieweeId == revieweeId) &&
            (identical(other.rating, rating) || other.rating == rating) &&
            (identical(other.comment, comment) || other.comment == comment) &&
            (identical(other.responseComment, responseComment) ||
                other.responseComment == responseComment) &&
            (identical(other.reviewer, reviewer) ||
                other.reviewer == reviewer) &&
            (identical(other.createdAt, createdAt) ||
                other.createdAt == createdAt));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(runtimeType, id, sessionId, reviewerId,
      revieweeId, rating, comment, responseComment, reviewer, createdAt);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$ReviewModelImplCopyWith<_$ReviewModelImpl> get copyWith =>
      __$$ReviewModelImplCopyWithImpl<_$ReviewModelImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$ReviewModelImplToJson(
      this,
    );
  }
}

abstract class _ReviewModel implements ReviewModel {
  const factory _ReviewModel(
          {required final String id,
          @JsonKey(name: 'session_id') required final String sessionId,
          @JsonKey(name: 'reviewer_id') required final String reviewerId,
          @JsonKey(name: 'reviewee_id') required final String revieweeId,
          required final int rating,
          final String? comment,
          @JsonKey(name: 'response_comment') final String? responseComment,
          final ProfileModel? reviewer,
          @JsonKey(name: 'created_at') final DateTime? createdAt}) =
      _$ReviewModelImpl;

  factory _ReviewModel.fromJson(Map<String, dynamic> json) =
      _$ReviewModelImpl.fromJson;

  @override
  String get id;
  @override
  @JsonKey(name: 'session_id')
  String get sessionId;
  @override
  @JsonKey(name: 'reviewer_id')
  String get reviewerId;
  @override
  @JsonKey(name: 'reviewee_id')
  String get revieweeId;
  @override
  int get rating;
  @override
  String? get comment;
  @override
  @JsonKey(name: 'response_comment')
  String? get responseComment;
  @override
  ProfileModel? get reviewer;
  @override
  @JsonKey(name: 'created_at')
  DateTime? get createdAt;
  @override
  @JsonKey(ignore: true)
  _$$ReviewModelImplCopyWith<_$ReviewModelImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
