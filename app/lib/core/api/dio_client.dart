import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import '../../config/api_constants.dart';
import '../../core/models/models.dart';

final dioProvider = Provider<Dio>((ref) {
  final dio = Dio(BaseOptions(
    baseUrl: ApiConstants.baseUrl,
    connectTimeout: ApiConstants.connectTimeout,
    receiveTimeout: ApiConstants.receiveTimeout,
    sendTimeout: ApiConstants.sendTimeout,
    headers: {
      'Content-Type': 'application/json',
    },
  ));

  dio.interceptors.add(InterceptorsWrapper(
    onRequest: (options, handler) async {
      final storage = const FlutterSecureStorage();
      final token = await storage.read(key: 'access_token');
      if (token != null) {
        options.headers['Authorization'] = 'Bearer $token';
      }
      return handler.next(options);
    },
    onError: (error, handler) async {
      if (error.response?.statusCode == 401) {
        final storage = const FlutterSecureStorage();
        final refreshToken = await storage.read(key: 'refresh_token');
        if (refreshToken != null) {
          try {
            final dio = Dio();
            final response = await dio.post(
              '${ApiConstants.baseUrl}${ApiConstants.auth}/refresh-token',
              data: {'refreshToken': refreshToken},
            );
            final newAccessToken = response.data['accessToken'];
            final newRefreshToken = response.data['refreshToken'];
            await storage.write(key: 'access_token', value: newAccessToken);
            await storage.write(key: 'refresh_token', value: newRefreshToken);
            final opts = error.requestOptions;
            opts.headers['Authorization'] = 'Bearer $newAccessToken';
            return handler.resolve(await dio.fetch(opts));
          } catch (e) {
            await storage.delete(key: 'access_token');
            await storage.delete(key: 'refresh_token');
          }
        }
      }
      return handler.next(error);
    },
  ));

  return dio;
});

final apiResponseProvider = Provider<ApiResponse>((ref) {
  final dio = ref.watch(dioProvider);
  return ApiResponse(dio);
});

class ApiResponse {
  final Dio dio;
  ApiResponse(this.dio);

  Future<dynamic> get(String path, {Map<String, dynamic>? params}) async {
    final response = await dio.get(path, queryParameters: params);
    return response.data;
  }

  Future<dynamic> post(String path, dynamic data) async {
    final response = await dio.post(path, data: data);
    return response.data;
  }

  Future<dynamic> put(String path, dynamic data) async {
    final response = await dio.put(path, data: data);
    return response.data;
  }

  Future<dynamic> delete(String path, {dynamic data}) async {
    final response = await dio.delete(path, data: data);
    return response.data;
  }

  Future<dynamic> patch(String path, dynamic data) async {
    final response = await dio.patch(path, data: data);
    return response.data;
  }

  Future<dynamic> postMultipart(String path, FormData formData) async {
    final response = await dio.post(path, data: formData);
    return response.data;
  }
}
