import 'package:freezed_annotation/freezed_annotation.dart';

part 'whiteboard_element_model.freezed.dart';
part 'whiteboard_element_model.g.dart';

@freezed
class WhiteboardElementModel with _$WhiteboardElementModel {
  const factory WhiteboardElementModel({
    required String id,
    required String type,
    @Default(<Map<String, double>>[]) List<Map<String, double>> points,
    @Default('#FFFFFF') String color,
    @JsonKey(name: 'stroke_width') @Default(3.0) double strokeWidth,
    String? text,
    double? x,
    double? y,
    double? width,
    double? height,
  }) = _WhiteboardElementModel;

  factory WhiteboardElementModel.fromJson(Map<String, dynamic> json) =>
      _$WhiteboardElementModelFromJson(json);
}
