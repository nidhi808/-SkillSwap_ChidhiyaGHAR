// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'whiteboard_element_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models');

WhiteboardElementModel _$WhiteboardElementModelFromJson(
    Map<String, dynamic> json) {
  return _WhiteboardElementModel.fromJson(json);
}

/// @nodoc
mixin _$WhiteboardElementModel {
  String get id => throw _privateConstructorUsedError;
  String get type => throw _privateConstructorUsedError;
  List<Map<String, double>> get points => throw _privateConstructorUsedError;
  String get color => throw _privateConstructorUsedError;
  @JsonKey(name: 'stroke_width')
  double get strokeWidth => throw _privateConstructorUsedError;
  String? get text => throw _privateConstructorUsedError;
  double? get x => throw _privateConstructorUsedError;
  double? get y => throw _privateConstructorUsedError;
  double? get width => throw _privateConstructorUsedError;
  double? get height => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $WhiteboardElementModelCopyWith<WhiteboardElementModel> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $WhiteboardElementModelCopyWith<$Res> {
  factory $WhiteboardElementModelCopyWith(WhiteboardElementModel value,
          $Res Function(WhiteboardElementModel) then) =
      _$WhiteboardElementModelCopyWithImpl<$Res, WhiteboardElementModel>;
  @useResult
  $Res call(
      {String id,
      String type,
      List<Map<String, double>> points,
      String color,
      @JsonKey(name: 'stroke_width') double strokeWidth,
      String? text,
      double? x,
      double? y,
      double? width,
      double? height});
}

/// @nodoc
class _$WhiteboardElementModelCopyWithImpl<$Res,
        $Val extends WhiteboardElementModel>
    implements $WhiteboardElementModelCopyWith<$Res> {
  _$WhiteboardElementModelCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? type = null,
    Object? points = null,
    Object? color = null,
    Object? strokeWidth = null,
    Object? text = freezed,
    Object? x = freezed,
    Object? y = freezed,
    Object? width = freezed,
    Object? height = freezed,
  }) {
    return _then(_value.copyWith(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      type: null == type
          ? _value.type
          : type // ignore: cast_nullable_to_non_nullable
              as String,
      points: null == points
          ? _value.points
          : points // ignore: cast_nullable_to_non_nullable
              as List<Map<String, double>>,
      color: null == color
          ? _value.color
          : color // ignore: cast_nullable_to_non_nullable
              as String,
      strokeWidth: null == strokeWidth
          ? _value.strokeWidth
          : strokeWidth // ignore: cast_nullable_to_non_nullable
              as double,
      text: freezed == text
          ? _value.text
          : text // ignore: cast_nullable_to_non_nullable
              as String?,
      x: freezed == x
          ? _value.x
          : x // ignore: cast_nullable_to_non_nullable
              as double?,
      y: freezed == y
          ? _value.y
          : y // ignore: cast_nullable_to_non_nullable
              as double?,
      width: freezed == width
          ? _value.width
          : width // ignore: cast_nullable_to_non_nullable
              as double?,
      height: freezed == height
          ? _value.height
          : height // ignore: cast_nullable_to_non_nullable
              as double?,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$WhiteboardElementModelImplCopyWith<$Res>
    implements $WhiteboardElementModelCopyWith<$Res> {
  factory _$$WhiteboardElementModelImplCopyWith(
          _$WhiteboardElementModelImpl value,
          $Res Function(_$WhiteboardElementModelImpl) then) =
      __$$WhiteboardElementModelImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {String id,
      String type,
      List<Map<String, double>> points,
      String color,
      @JsonKey(name: 'stroke_width') double strokeWidth,
      String? text,
      double? x,
      double? y,
      double? width,
      double? height});
}

/// @nodoc
class __$$WhiteboardElementModelImplCopyWithImpl<$Res>
    extends _$WhiteboardElementModelCopyWithImpl<$Res,
        _$WhiteboardElementModelImpl>
    implements _$$WhiteboardElementModelImplCopyWith<$Res> {
  __$$WhiteboardElementModelImplCopyWithImpl(
      _$WhiteboardElementModelImpl _value,
      $Res Function(_$WhiteboardElementModelImpl) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? type = null,
    Object? points = null,
    Object? color = null,
    Object? strokeWidth = null,
    Object? text = freezed,
    Object? x = freezed,
    Object? y = freezed,
    Object? width = freezed,
    Object? height = freezed,
  }) {
    return _then(_$WhiteboardElementModelImpl(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      type: null == type
          ? _value.type
          : type // ignore: cast_nullable_to_non_nullable
              as String,
      points: null == points
          ? _value._points
          : points // ignore: cast_nullable_to_non_nullable
              as List<Map<String, double>>,
      color: null == color
          ? _value.color
          : color // ignore: cast_nullable_to_non_nullable
              as String,
      strokeWidth: null == strokeWidth
          ? _value.strokeWidth
          : strokeWidth // ignore: cast_nullable_to_non_nullable
              as double,
      text: freezed == text
          ? _value.text
          : text // ignore: cast_nullable_to_non_nullable
              as String?,
      x: freezed == x
          ? _value.x
          : x // ignore: cast_nullable_to_non_nullable
              as double?,
      y: freezed == y
          ? _value.y
          : y // ignore: cast_nullable_to_non_nullable
              as double?,
      width: freezed == width
          ? _value.width
          : width // ignore: cast_nullable_to_non_nullable
              as double?,
      height: freezed == height
          ? _value.height
          : height // ignore: cast_nullable_to_non_nullable
              as double?,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$WhiteboardElementModelImpl implements _WhiteboardElementModel {
  const _$WhiteboardElementModelImpl(
      {required this.id,
      required this.type,
      final List<Map<String, double>> points = const <Map<String, double>>[],
      this.color = '#FFFFFF',
      @JsonKey(name: 'stroke_width') this.strokeWidth = 3.0,
      this.text,
      this.x,
      this.y,
      this.width,
      this.height})
      : _points = points;

  factory _$WhiteboardElementModelImpl.fromJson(Map<String, dynamic> json) =>
      _$$WhiteboardElementModelImplFromJson(json);

  @override
  final String id;
  @override
  final String type;
  final List<Map<String, double>> _points;
  @override
  @JsonKey()
  List<Map<String, double>> get points {
    if (_points is EqualUnmodifiableListView) return _points;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_points);
  }

  @override
  @JsonKey()
  final String color;
  @override
  @JsonKey(name: 'stroke_width')
  final double strokeWidth;
  @override
  final String? text;
  @override
  final double? x;
  @override
  final double? y;
  @override
  final double? width;
  @override
  final double? height;

  @override
  String toString() {
    return 'WhiteboardElementModel(id: $id, type: $type, points: $points, color: $color, strokeWidth: $strokeWidth, text: $text, x: $x, y: $y, width: $width, height: $height)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$WhiteboardElementModelImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.type, type) || other.type == type) &&
            const DeepCollectionEquality().equals(other._points, _points) &&
            (identical(other.color, color) || other.color == color) &&
            (identical(other.strokeWidth, strokeWidth) ||
                other.strokeWidth == strokeWidth) &&
            (identical(other.text, text) || other.text == text) &&
            (identical(other.x, x) || other.x == x) &&
            (identical(other.y, y) || other.y == y) &&
            (identical(other.width, width) || other.width == width) &&
            (identical(other.height, height) || other.height == height));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(
      runtimeType,
      id,
      type,
      const DeepCollectionEquality().hash(_points),
      color,
      strokeWidth,
      text,
      x,
      y,
      width,
      height);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$WhiteboardElementModelImplCopyWith<_$WhiteboardElementModelImpl>
      get copyWith => __$$WhiteboardElementModelImplCopyWithImpl<
          _$WhiteboardElementModelImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$WhiteboardElementModelImplToJson(
      this,
    );
  }
}

abstract class _WhiteboardElementModel implements WhiteboardElementModel {
  const factory _WhiteboardElementModel(
      {required final String id,
      required final String type,
      final List<Map<String, double>> points,
      final String color,
      @JsonKey(name: 'stroke_width') final double strokeWidth,
      final String? text,
      final double? x,
      final double? y,
      final double? width,
      final double? height}) = _$WhiteboardElementModelImpl;

  factory _WhiteboardElementModel.fromJson(Map<String, dynamic> json) =
      _$WhiteboardElementModelImpl.fromJson;

  @override
  String get id;
  @override
  String get type;
  @override
  List<Map<String, double>> get points;
  @override
  String get color;
  @override
  @JsonKey(name: 'stroke_width')
  double get strokeWidth;
  @override
  String? get text;
  @override
  double? get x;
  @override
  double? get y;
  @override
  double? get width;
  @override
  double? get height;
  @override
  @JsonKey(ignore: true)
  _$$WhiteboardElementModelImplCopyWith<_$WhiteboardElementModelImpl>
      get copyWith => throw _privateConstructorUsedError;
}
