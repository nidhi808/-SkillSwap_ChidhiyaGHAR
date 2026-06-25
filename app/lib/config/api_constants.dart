import 'app_config.dart';

class ApiConstants {
  static const String baseUrl = AppConfig.baseUrl;

  static const Duration connectTimeout = Duration(seconds: 30);
  static const Duration receiveTimeout = Duration(seconds: 30);
  static const Duration sendTimeout = Duration(seconds: 30);

  static const String auth = '/auth';
  static const String profile = '/profile';
  static const String skills = '/skills';
  static const String matching = '/matching';
  static const String chat = '/chat';
  static const String sessions = '/sessions';
  static const String video = '/video';
  static const String whiteboard = '/whiteboard';
  static const String reviews = '/reviews';
  static const String notifications = '/notifications';
  static const String badges = '/badges';
  static const String leaderboard = '/leaderboard';
  static const String feed = '/feed';
  static const String ai = '/ai';
  static const String schedule = '/schedule';
  static const String analytics = '/analytics';
  static const String settings = '/settings';
  static const String location = '/location';
  static const String delete = '/delete';
}
