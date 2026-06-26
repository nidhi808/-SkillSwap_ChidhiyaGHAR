import 'package:freezed_annotation/freezed_annotation.dart';

part 'user_model.freezed.dart';
part 'user_model.g.dart';

@freezed
class UserModel with _$UserModel {
  const factory UserModel({
    required String id,
    required String email,
    String? username,
    @Default('user') String role,
    @JsonKey(name: 'is_email_verified') @Default(false) bool isEmailVerified,
    @JsonKey(name: 'is_active') @Default(true) bool isActive,
    @JsonKey(name: 'mfa_enabled') @Default(false) bool mfaEnabled,
    @JsonKey(name: 'created_at') DateTime? createdAt,
    @JsonKey(name: 'updated_at') DateTime? updatedAt,
  }) = _UserModel;

  factory UserModel.fromJson(Map<String, dynamic> json) =>
      _$UserModelFromJson(json);
}
