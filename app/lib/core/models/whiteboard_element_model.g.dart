// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'whiteboard_element_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$WhiteboardElementModelImpl _$$WhiteboardElementModelImplFromJson(
        Map<String, dynamic> json) =>
    _$WhiteboardElementModelImpl(
      id: json['id'] as String,
      type: json['type'] as String,
      points: (json['points'] as List<dynamic>?)
              ?.map((e) => (e as Map<String, dynamic>).map(
                    (k, e) => MapEntry(k, (e as num).toDouble()),
                  ))
              .toList() ??
          const <Map<String, double>>[],
      color: json['color'] as String? ?? '#FFFFFF',
      strokeWidth: (json['stroke_width'] as num?)?.toDouble() ?? 3.0,
      text: json['text'] as String?,
      x: (json['x'] as num?)?.toDouble(),
      y: (json['y'] as num?)?.toDouble(),
      width: (json['width'] as num?)?.toDouble(),
      height: (json['height'] as num?)?.toDouble(),
    );

Map<String, dynamic> _$$WhiteboardElementModelImplToJson(
        _$WhiteboardElementModelImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'type': instance.type,
      'points': instance.points,
      'color': instance.color,
      'stroke_width': instance.strokeWidth,
      'text': instance.text,
      'x': instance.x,
      'y': instance.y,
      'width': instance.width,
      'height': instance.height,
    };
