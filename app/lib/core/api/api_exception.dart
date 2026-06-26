/// Structured API exception that wraps Dio errors into an
/// app-friendly format with status code, message, and optional
/// field-level validation errors.
class ApiException implements Exception {
  final int? statusCode;
  final String message;
  final Map<String, dynamic>? errors;
  final dynamic originalError;

  const ApiException({
    this.statusCode,
    required this.message,
    this.errors,
    this.originalError,
  });

  bool get isUnauthorized => statusCode == 401;
  bool get isForbidden    => statusCode == 403;
  bool get isNotFound     => statusCode == 404;
  bool get isServerError  => statusCode != null && statusCode! >= 500;
  bool get isNetworkError => statusCode == null;

  @override
  String toString() => 'ApiException($statusCode): $message';

  /// Attempt to parse a DioException response into a friendly message.
  factory ApiException.fromDioError(dynamic error) {
    if (error.response != null) {
      final data = error.response?.data;
      String message = 'Something went wrong';
      Map<String, dynamic>? errors;

      if (data is Map<String, dynamic>) {
        message = data['message'] as String? ??
            data['error'] as String? ??
            message;
        if (data['errors'] is Map) {
          errors = Map<String, dynamic>.from(data['errors'] as Map);
        }
      } else if (data is String && data.isNotEmpty) {
        message = data;
      }

      return ApiException(
        statusCode: error.response?.statusCode,
        message: message,
        errors: errors,
        originalError: error,
      );
    }

    // Network-level errors (no response)
    return ApiException(
      message: _networkMessage(error),
      originalError: error,
    );
  }

  static String _networkMessage(dynamic error) {
    final type = error.type?.toString() ?? '';
    if (type.contains('connectTimeout') || type.contains('sendTimeout')) {
      return 'Connection timed out. Please check your internet connection.';
    }
    if (type.contains('receiveTimeout')) {
      return 'Server took too long to respond. Please try again.';
    }
    if (type.contains('cancel')) {
      return 'Request was cancelled.';
    }
    return 'No internet connection. Please check your network.';
  }
}
