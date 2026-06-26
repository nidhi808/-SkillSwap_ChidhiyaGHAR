// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'skill_category_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$SkillCategoryModelImpl _$$SkillCategoryModelImplFromJson(
        Map<String, dynamic> json) =>
    _$SkillCategoryModelImpl(
      id: json['id'] as String,
      name: json['name'] as String,
      slug: json['slug'] as String,
      icon: json['icon'] as String?,
      color: json['color'] as String? ?? '#6366f1',
      description: json['description'] as String?,
    );

Map<String, dynamic> _$$SkillCategoryModelImplToJson(
        _$SkillCategoryModelImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'slug': instance.slug,
      'icon': instance.icon,
      'color': instance.color,
      'description': instance.description,
    };
