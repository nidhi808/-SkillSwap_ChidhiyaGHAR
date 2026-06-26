import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:go_router/go_router.dart';
import '../../../config/theme.dart';
import '../../../core/widgets/app_button.dart';
import '../../../core/widgets/app_snackbar.dart';
import '../../../core/api/dio_client.dart';
import '../../../config/api_constants.dart';

class MfaSetupScreen extends ConsumerStatefulWidget {
  const MfaSetupScreen({super.key});

  @override
  ConsumerState<MfaSetupScreen> createState() => _MfaSetupScreenState();
}

class _MfaSetupScreenState extends ConsumerState<MfaSetupScreen> {
  final List<TextEditingController> _ctrls = List.generate(6, (_) => TextEditingController());
  final List<FocusNode> _focusNodes = List.generate(6, (_) => FocusNode());
  String? _secret;
  String? _qrData;
  bool _isLoadingSetup = true;
  bool _isVerifying = false;

  @override
  void initState() {
    super.initState();
    _setupMfa();
  }

  @override
  void dispose() {
    for (final c in _ctrls) { c.dispose(); }
    for (final f in _focusNodes) { f.dispose(); }
    super.dispose();
  }

  Future<void> _setupMfa() async {
    try {
      final api = ref.read(apiProvider);
      final data = await api.post<Map<String, dynamic>>(ApiConstants.authMfaSetup);
      if (!mounted) return;
      setState(() {
        _secret = data['secret'] as String?;
        _qrData = data['qrCodeUrl'] as String? ?? data['otpauth_url'] as String?;
        _isLoadingSetup = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() => _isLoadingSetup = false);
      AppSnackbar.show(context, message: 'Failed to setup MFA', type: SnackbarType.error);
    }
  }

  String get _code => _ctrls.map((c) => c.text).join();

  Future<void> _verify() async {
    if (_code.length < 6) return;
    setState(() => _isVerifying = true);
    try {
      final api = ref.read(apiProvider);
      await api.post<Map<String, dynamic>>(
        ApiConstants.authMfaVerify,
        data: {'code': _code},
      );
      if (!mounted) return;
      AppSnackbar.show(context, message: 'MFA enabled!', type: SnackbarType.success);
      context.pop();
    } catch (e) {
      if (!mounted) return;
      AppSnackbar.show(context, message: 'Invalid code', type: SnackbarType.error);
    }
    if (mounted) setState(() => _isVerifying = false);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Setup MFA'),
        leading: IconButton(
          onPressed: () => context.pop(),
          icon: const Icon(Icons.arrow_back_rounded),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            const Icon(Icons.security_rounded, size: 48, color: AppTheme.primary)
                .animate().fadeIn().scale(duration: 400.ms),

            const SizedBox(height: 16),
            Text('Two-Factor Authentication', style: Theme.of(context).textTheme.displaySmall)
                .animate(delay: 200.ms).fadeIn(),

            const SizedBox(height: 8),
            Text(
              'Scan the QR code with your authenticator app, then enter the 6-digit code.',
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: AppTheme.textSecondary),
              textAlign: TextAlign.center,
            ).animate(delay: 300.ms).fadeIn(),

            const SizedBox(height: 32),

            // ── Secret display ──────────────────────────────
            if (_isLoadingSetup)
              const CircularProgressIndicator()
            else if (_secret != null) ...[
              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(AppTheme.radiusMedium),
                ),
                child: const Icon(Icons.qr_code_2_rounded, size: 150, color: Colors.black),
              ).animate(delay: 400.ms).fadeIn(),

              const SizedBox(height: 16),
              Text('Manual entry key:', style: Theme.of(context).textTheme.labelMedium),
              const SizedBox(height: 4),
              SelectableText(
                _secret!,
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  fontFamily: 'JetBrainsMono',
                  color: AppTheme.secondary,
                  letterSpacing: 1.5,
                ),
              ),
            ],

            const SizedBox(height: 32),

            // ── TOTP input ─────────────────────────────────
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: List.generate(6, (i) {
                return Container(
                  width: 48,
                  margin: EdgeInsets.only(right: i < 5 ? 8 : 0),
                  child: TextField(
                    controller: _ctrls[i],
                    focusNode: _focusNodes[i],
                    textAlign: TextAlign.center,
                    keyboardType: TextInputType.number,
                    maxLength: 1,
                    style: Theme.of(context).textTheme.displaySmall,
                    decoration: InputDecoration(
                      counterText: '',
                      contentPadding: const EdgeInsets.symmetric(vertical: 14),
                    ),
                    inputFormatters: [FilteringTextInputFormatter.digitsOnly],
                    onChanged: (v) {
                      if (v.isNotEmpty && i < 5) {
                        _focusNodes[i + 1].requestFocus();
                      } else if (v.isEmpty && i > 0) {
                        _focusNodes[i - 1].requestFocus();
                      }
                    },
                  ),
                );
              }),
            ).animate(delay: 500.ms).fadeIn(),

            const SizedBox(height: 32),

            AppButton(
              text: 'Verify & Enable',
              isGradient: true,
              isLoading: _isVerifying,
              onPressed: _verify,
            ).animate(delay: 600.ms).fadeIn(),
          ],
        ),
      ),
    );
  }
}
