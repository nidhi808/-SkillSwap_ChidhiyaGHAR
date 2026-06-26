import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../config/api_constants.dart';
import '../services/storage_service.dart';
import 'api_exception.dart';

// ─── Dio singleton provider ─────────────────────────────────────
final dioProvider = Provider<Dio>((ref) {
  final storage = ref.watch(storageServiceProvider);
  final dio = Dio(BaseOptions(
    baseUrl: ApiConstants.baseUrl,
    connectTimeout: ApiConstants.connectTimeout,
    receiveTimeout: ApiConstants.receiveTimeout,
    sendTimeout: ApiConstants.sendTimeout,
    headers: {'Content-Type': 'application/json'},
  ));

  // ── Auth interceptor (attach token + refresh on 401) ─────────
  dio.interceptors.add(InterceptorsWrapper(
    onRequest: (options, handler) async {
      final token = await storage.getAccessToken();
      if (token != null) {
        options.headers['Authorization'] = 'Bearer $token';
      }
      return handler.next(options);
    },
    onError: (error, handler) async {
      if (error.response?.statusCode == 401) {
        final refreshToken = await storage.getRefreshToken();
        if (refreshToken != null) {
          try {
            final freshDio = Dio(BaseOptions(baseUrl: ApiConstants.baseUrl));
            final response = await freshDio.post(
              ApiConstants.authRefreshToken,
              data: {'refreshToken': refreshToken},
            );
            final data = response.data as Map<String, dynamic>;
            final newAccess  = data['accessToken'] as String;
            final newRefresh = data['refreshToken'] as String;
            await storage.saveAccessToken(newAccess);
            await storage.saveRefreshToken(newRefresh);

            // Retry the original request with the new token
            final opts = error.requestOptions;
            opts.headers['Authorization'] = 'Bearer $newAccess';
            final retryResponse = await freshDio.fetch(opts);
            return handler.resolve(retryResponse);
          } catch (_) {
            // Refresh failed — clear tokens (forces re-login)
            await storage.clearTokens();
          }
        }
      }
      return handler.next(error);
    },
  ));

  // ── Debug logging ────────────────────────────────────────────
  if (kDebugMode) {
    dio.interceptors.add(LogInterceptor(
      requestBody: true,
      responseBody: true,
      logPrint: (msg) => debugPrint('[DIO] $msg'),
    ));
  }

  return dio;
});

// ─── High-level API helper ──────────────────────────────────────
final apiProvider = Provider<ApiClient>((ref) {
  return ApiClient(ref.watch(dioProvider));
});

class ApiClient {
  final Dio _dio;
  const ApiClient(this._dio);

  Future<T> get<T>(
    String path, {
    Map<String, dynamic>? queryParameters,
  }) async {
    try {
      final response = await _dio.get(path, queryParameters: queryParameters);
      return response.data as T;
    } on DioException catch (e) {
      throw ApiException.fromDioError(e);
    }
  }

  Future<T> post<T>(String path, {dynamic data}) async {
    try {
      final response = await _dio.post(path, data: data);
      return response.data as T;
    } on DioException catch (e) {
      throw ApiException.fromDioError(e);
    }
  }

  Future<T> put<T>(String path, {dynamic data}) async {
    try {
      final response = await _dio.put(path, data: data);
      return response.data as T;
    } on DioException catch (e) {
      throw ApiException.fromDioError(e);
    }
  }

  Future<T> delete<T>(String path, {dynamic data}) async {
    try {
      final response = await _dio.delete(path, data: data);
      return response.data as T;
    } on DioException catch (e) {
      throw ApiException.fromDioError(e);
    }
  }

  Future<T> patch<T>(String path, {dynamic data}) async {
    try {
      final response = await _dio.patch(path, data: data);
      return response.data as T;
    } on DioException catch (e) {
      throw ApiException.fromDioError(e);
    }
  }

  Future<T> uploadFile<T>(String path, FormData formData) async {
    try {
      final response = await _dio.post(
        path,
        data: formData,
        options: Options(contentType: 'multipart/form-data'),
      );
      return response.data as T;
    } on DioException catch (e) {
      throw ApiException.fromDioError(e);
    }
  }
}
