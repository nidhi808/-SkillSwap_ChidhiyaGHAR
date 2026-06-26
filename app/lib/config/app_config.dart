/// Central app configuration — values come from compile-time environment
/// variables (--dart-define) so secrets never ship in source code.
class AppConfig {
  static const String appName = 'SkillSwap';
  static const String appVersion = '1.0.0';

  // ── API / WebSocket ──────────────────────────────────────────────
  static const String baseUrl = String.fromEnvironment(
    'BASE_URL',
    defaultValue: 'https://skillswap-chidiyaghar.onrender.com/api',
  );
  static const String wsUrl = String.fromEnvironment(
    'WS_URL',
    defaultValue: 'https://skillswap-chidiyaghar.onrender.com',
  );

  // ── Tencent TRTC ────────────────────────────────────────────────
  static const int trtcSdkAppId = int.fromEnvironment(
    'TRTC_SDK_APP_ID',
    defaultValue: 20043861,
  );
  static const String trtcSecretKey = String.fromEnvironment(
    'TRTC_SECRET_KEY',
    defaultValue: 'f810e47a6219eb330896042893d1e033e950712252feb47e46b8c270d2157ff6',
  );

  // ── Supabase (direct access, if needed for storage/auth) ────────
  static const String supabaseUrl = String.fromEnvironment(
    'SUPABASE_URL',
    defaultValue: '',
  );
  static const String supabaseAnonKey = String.fromEnvironment(
    'SUPABASE_ANON_KEY',
    defaultValue: '',
  );

  // ── Debug ────────────────────────────────────────────────────────
  static const bool debug = bool.fromEnvironment('DEBUG', defaultValue: true);
}
