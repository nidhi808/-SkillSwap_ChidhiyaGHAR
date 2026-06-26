// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'skill_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$SkillModelImpl _$$SkillModelImplFromJson(Map<String, dynamic> json) =>
    _$SkillModelImpl(
      id: json['id'] as String,
      categoryId: json['category_id'] as String?,
      name: json['name'] as String,
      slug: json['slug'] as String,
      description: json['description'] as String?,
      tags:
          (json['tags'] as List<dynamic>?)?.map((e) => e as String).toList() ??
              const <String>[],
      usageCount: (json['usage_count'] as num?)?.toInt() ?? 0,
      isVerified: json['is_verified'] as bool? ?? false,
    );

Map<String, dynamic> _$$SkillModelImplToJson(_$SkillModelImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'category_id': instance.categoryId,
      'name': instance.name,
      'slug': instance.slug,
      'description': instance.description,
      'tags': instance.tags,
      'usage_count': instance.usageCount,
      'is_verified': instance.isVerified,
    };
