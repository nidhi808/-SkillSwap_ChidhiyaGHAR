class AppConfig {
  static const String appName = 'SkillSwap';
  static const String appVersion = '1.0.0';
  static const String baseUrl = String.fromEnvironment('BASE_URL',
      defaultValue: 'https://your-backend.vercel.app');
  static const String wsUrl = String.fromEnvironment('WS_URL',
      defaultValue: 'https://your-backend.vercel.app');
  static const String agoraAppId = String.fromEnvironment('AGORA_APP_ID',
      defaultValue: '');
  static const bool debug = bool.fromEnvironment('DEBUG', defaultValue: true);
}
