part of 'whiteboard_element_model.dart';

@freezed
class WhiteboardElementModel with _$WhiteboardElementModel {
  const factory WhiteboardElementModel({
    required String id,
    required String type,
    required List<Map<String, double>> points,
    required String color,
    required double strokeWidth,
    String? text,
    double? x,
    double? y,
    double? width,
    double? height,
  }) = _WhiteboardElementModel;

  factory WhiteboardElementModel.fromJson(Map<String, dynamic> json) =>
      _$WhiteboardElementModelFromJson(json);
}
