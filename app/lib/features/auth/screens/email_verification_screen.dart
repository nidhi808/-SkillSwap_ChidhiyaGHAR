import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:go_router/go_router.dart';
import '../../../config/theme.dart';
import '../../../core/providers/auth_provider.dart';
import '../../../core/widgets/app_button.dart';
import '../../../core/widgets/app_snackbar.dart';

class EmailVerificationScreen extends ConsumerStatefulWidget {
  const EmailVerificationScreen({super.key});

  @override
  ConsumerState<EmailVerificationScreen> createState() => _EmailVerificationScreenState();
}

class _EmailVerificationScreenState extends ConsumerState<EmailVerificationScreen> {
  final List<TextEditingController> _ctrls = List.generate(6, (_) => TextEditingController());
  final List<FocusNode> _focusNodes = List.generate(6, (_) => FocusNode());
  bool _isLoading = false;
  int _resendCooldown = 0;

  @override
  void dispose() {
    for (final c in _ctrls) { c.dispose(); }
    for (final f in _focusNodes) { f.dispose(); }
    super.dispose();
  }

  String get _code => _ctrls.map((c) => c.text).join();

  Future<void> _verify() async {
    if (_code.length < 6) {
      AppSnackbar.show(context, message: 'Please enter the full 6-digit code', type: SnackbarType.warning);
      return;
    }
    setState(() => _isLoading = true);
    final ok = await ref.read(authProvider.notifier).verifyEmail(_code);
    if (!mounted) return;
    setState(() => _isLoading = false);
    if (ok) {
      AppSnackbar.show(context, message: 'Email verified!', type: SnackbarType.success);
      context.go('/onboarding');
    } else {
      AppSnackbar.show(context, message: 'Invalid code. Please try again.', type: SnackbarType.error);
    }
  }

  Future<void> _resend() async {
    if (_resendCooldown > 0) return;
    final ok = await ref.read(authProvider.notifier).resendVerification();
    if (!mounted) return;
    if (ok) {
      AppSnackbar.show(context, message: 'Verification code resent!', type: SnackbarType.success);
      setState(() => _resendCooldown = 60);
      _startCooldown();
    }
  }

  void _startCooldown() {
    Future.doWhile(() async {
      await Future.delayed(const Duration(seconds: 1));
      if (!mounted) return false;
      setState(() => _resendCooldown--);
      return _resendCooldown > 0;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        width: double.infinity,
        height: double.infinity,
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [AppTheme.background, Color(0xFF0F1629)],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        child: SafeArea(
          child: SingleChildScrollView(
            padding: const EdgeInsets.symmetric(horizontal: 24),
            child: Column(
              children: [
                const SizedBox(height: 60),

                Container(
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: AppTheme.secondary.withValues(alpha: 0.15),
                  ),
                  child: const Icon(Icons.mark_email_unread_rounded, size: 48, color: AppTheme.secondary),
                ).animate().fadeIn().scale(duration: 500.ms, curve: Curves.elasticOut),

                const SizedBox(height: 24),

                Text('Verify Your Email', style: Theme.of(context).textTheme.displayMedium)
                    .animate(delay: 200.ms).fadeIn(),
                const SizedBox(height: 8),
                Text(
                  'Enter the 6-digit code sent to your email',
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: AppTheme.textSecondary),
                  textAlign: TextAlign.center,
                ).animate(delay: 300.ms).fadeIn(),

                const SizedBox(height: 40),

                // ── OTP fields ─────────────────────────────────
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
                        style: Theme.of(context).textTheme.displaySmall?.copyWith(
                          color: AppTheme.secondary,
                        ),
                        decoration: InputDecoration(
                          counterText: '',
                          contentPadding: const EdgeInsets.symmetric(vertical: 14),
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(AppTheme.radiusMedium),
                            borderSide: const BorderSide(color: AppTheme.border),
                          ),
                          focusedBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(AppTheme.radiusMedium),
                            borderSide: const BorderSide(color: AppTheme.secondary, width: 1.5),
                          ),
                        ),
                        inputFormatters: [FilteringTextInputFormatter.digitsOnly],
                        onChanged: (v) {
                          if (v.isNotEmpty && i < 5) {
                            _focusNodes[i + 1].requestFocus();
                          } else if (v.isEmpty && i > 0) {
                            _focusNodes[i - 1].requestFocus();
                          }
                          if (_code.length == 6) _verify();
                        },
                      ),
                    );
                  }),
                ).animate(delay: 400.ms).fadeIn().slideY(begin: 0.1, end: 0),

                const SizedBox(height: 32),

                AppButton(
                  text: 'Verify',
                  isGradient: true,
                  isLoading: _isLoading,
                  onPressed: _verify,
                ).animate(delay: 500.ms).fadeIn(),

                const SizedBox(height: 24),

                TextButton(
                  onPressed: _resendCooldown > 0 ? null : _resend,
                  child: Text(
                    _resendCooldown > 0
                        ? 'Resend code in ${_resendCooldown}s'
                        : 'Resend verification code',
                  ),
                ).animate(delay: 600.ms).fadeIn(),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
