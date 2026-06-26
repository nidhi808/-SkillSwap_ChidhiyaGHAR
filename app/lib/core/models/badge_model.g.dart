// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'badge_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$BadgeModelImpl _$$BadgeModelImplFromJson(Map<String, dynamic> json) =>
    _$BadgeModelImpl(
      id: json['id'] as String,
      name: json['name'] as String,
      slug: json['slug'] as String,
      description: json['description'] as String,
      iconUrl: json['icon_url'] as String?,
      tier: json['tier'] as String? ?? 'bronze',
      earnedAt: json['earned_at'] == null
          ? null
          : DateTime.parse(json['earned_at'] as String),
    );

Map<String, dynamic> _$$BadgeModelImplToJson(_$BadgeModelImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'slug': instance.slug,
      'description': instance.description,
      'icon_url': instance.iconUrl,
      'tier': instance.tier,
      'earned_at': instance.earnedAt?.toIso8601String(),
    };
