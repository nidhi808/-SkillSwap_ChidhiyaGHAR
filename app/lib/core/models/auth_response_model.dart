import 'package:freezed_annotation/freezed_annotation.dart';
import 'user_model.dart';
import 'profile_model.dart';

part 'auth_response_model.freezed.dart';
part 'auth_response_model.g.dart';

@freezed
class AuthResponseModel with _$AuthResponseModel {
  const factory AuthResponseModel({
    @JsonKey(name: 'accessToken') required String accessToken,
    @JsonKey(name: 'refreshToken') required String refreshToken,
    UserModel? user,
    ProfileModel? profile,
    String? message,
  }) = _AuthResponseModel;

  factory AuthResponseModel.fromJson(Map<String, dynamic> json) =>
      _$AuthResponseModelFromJson(json);
}
