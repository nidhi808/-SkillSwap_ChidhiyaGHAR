// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'auth_response_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$AuthResponseModelImpl _$$AuthResponseModelImplFromJson(
        Map<String, dynamic> json) =>
    _$AuthResponseModelImpl(
      accessToken: json['accessToken'] as String,
      refreshToken: json['refreshToken'] as String,
      user: json['user'] == null
          ? null
          : UserModel.fromJson(json['user'] as Map<String, dynamic>),
      profile: json['profile'] == null
          ? null
          : ProfileModel.fromJson(json['profile'] as Map<String, dynamic>),
      message: json['message'] as String?,
    );

Map<String, dynamic> _$$AuthResponseModelImplToJson(
        _$AuthResponseModelImpl instance) =>
    <String, dynamic>{
      'accessToken': instance.accessToken,
      'refreshToken': instance.refreshToken,
      'user': instance.user,
      'profile': instance.profile,
      'message': instance.message,
    };
