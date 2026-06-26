import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:go_router/go_router.dart';
import '../../../config/theme.dart';
import '../../../core/providers/auth_provider.dart';
import '../../../core/widgets/app_button.dart';
import '../../../core/widgets/app_input.dart';
import '../../../core/widgets/app_snackbar.dart';
import '../../../core/utils/validators.dart';

class ForgotPasswordScreen extends ConsumerStatefulWidget {
  const ForgotPasswordScreen({super.key});

  @override
  ConsumerState<ForgotPasswordScreen> createState() => _ForgotPasswordScreenState();
}

class _ForgotPasswordScreenState extends ConsumerState<ForgotPasswordScreen> {
  final _formKey = GlobalKey<FormState>();
  final _emailCtrl = TextEditingController();
  bool _isLoading = false;
  bool _sent = false;

  @override
  void dispose() {
    _emailCtrl.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;
    setState(() => _isLoading = true);

    final success = await ref.read(authProvider.notifier).forgotPassword(
      _emailCtrl.text.trim(),
    );

    if (!mounted) return;
    setState(() => _isLoading = false);
    if (success) {
      setState(() => _sent = true);
    } else {
      AppSnackbar.show(context, message: 'Failed to send reset email', type: SnackbarType.error);
    }
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
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const SizedBox(height: 16),
                IconButton(
                  onPressed: () => context.pop(),
                  icon: const Icon(Icons.arrow_back_rounded, color: AppTheme.textPrimary),
                ),
                const SizedBox(height: 40),

                if (!_sent) ...[
                  // ── Request state ────────────────────────────
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: AppTheme.primary.withValues(alpha: 0.15),
                    ),
                    child: const Icon(Icons.lock_reset_rounded, size: 40, color: AppTheme.primary),
                  ).animate().fadeIn().scale(duration: 400.ms),

                  const SizedBox(height: 24),
                  Text('Forgot Password?', style: Theme.of(context).textTheme.displayLarge)
                      .animate(delay: 200.ms).fadeIn(),
                  const SizedBox(height: 8),
                  Text(
                    'Enter your email address and we\'ll send you a link to reset your password.',
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: AppTheme.textSecondary),
                  ).animate(delay: 300.ms).fadeIn(),

                  const SizedBox(height: 32),

                  Form(
                    key: _formKey,
                    child: AppInput(
                      label: 'Email',
                      hintText: 'Enter your email',
                      controller: _emailCtrl,
                      validator: Validators.email,
                      keyboardType: TextInputType.emailAddress,
                      prefixIcon: const Icon(Icons.email_outlined, size: 20),
                    ),
                  ).animate(delay: 400.ms).fadeIn().slideX(begin: -0.1, end: 0),

                  const SizedBox(height: 32),

                  AppButton(
                    text: 'Send Reset Link',
                    isGradient: true,
                    isLoading: _isLoading,
                    onPressed: _submit,
                  ).animate(delay: 500.ms).fadeIn(),

                ] else ...[
                  // ── Success state ────────────────────────────
                  Center(
                    child: Column(
                      children: [
                        const SizedBox(height: 40),
                        Container(
                          padding: const EdgeInsets.all(20),
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: AppTheme.success.withValues(alpha: 0.15),
                          ),
                          child: const Icon(Icons.mark_email_read_rounded, size: 48, color: AppTheme.success),
                        ).animate().fadeIn().scale(duration: 500.ms, curve: Curves.elasticOut),

                        const SizedBox(height: 24),
                        Text('Check Your Email', style: Theme.of(context).textTheme.displayMedium)
                            .animate(delay: 300.ms).fadeIn(),
                        const SizedBox(height: 12),
                        Text(
                          'We\'ve sent a password reset link to\n${_emailCtrl.text}',
                          style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: AppTheme.textSecondary),
                          textAlign: TextAlign.center,
                        ).animate(delay: 400.ms).fadeIn(),

                        const SizedBox(height: 32),
                        AppButton(
                          text: 'Back to Login',
                          isOutlined: true,
                          onPressed: () => context.go('/login'),
                        ).animate(delay: 500.ms).fadeIn(),
                      ],
                    ),
                  ),
                ],
              ],
            ),
          ),
        ),
      ),
    );
  }
}
