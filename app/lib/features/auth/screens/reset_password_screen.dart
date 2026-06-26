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

class ResetPasswordScreen extends ConsumerStatefulWidget {
  final String token;
  const ResetPasswordScreen({super.key, required this.token});

  @override
  ConsumerState<ResetPasswordScreen> createState() => _ResetPasswordScreenState();
}

class _ResetPasswordScreenState extends ConsumerState<ResetPasswordScreen> {
  final _formKey = GlobalKey<FormState>();
  final _passwordCtrl = TextEditingController();
  final _confirmCtrl = TextEditingController();
  bool _obscure1 = true;
  bool _obscure2 = true;
  bool _isLoading = false;

  @override
  void dispose() {
    _passwordCtrl.dispose();
    _confirmCtrl.dispose();
    super.dispose();
  }

  Future<void> _reset() async {
    if (!_formKey.currentState!.validate()) return;
    setState(() => _isLoading = true);
    final ok = await ref.read(authProvider.notifier).resetPassword(
      token: widget.token,
      newPassword: _passwordCtrl.text,
    );
    if (!mounted) return;
    setState(() => _isLoading = false);
    if (ok) {
      AppSnackbar.show(context, message: 'Password reset successfully!', type: SnackbarType.success);
      context.go('/login');
    } else {
      AppSnackbar.show(context, message: 'Failed to reset password', type: SnackbarType.error);
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
                const SizedBox(height: 60),

                Text('Reset Password', style: Theme.of(context).textTheme.displayLarge)
                    .animate().fadeIn(duration: 400.ms),
                const SizedBox(height: 8),
                Text(
                  'Create a new password for your account',
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: AppTheme.textSecondary),
                ).animate(delay: 200.ms).fadeIn(),

                const SizedBox(height: 32),

                Form(
                  key: _formKey,
                  child: Column(
                    children: [
                      AppInput(
                        label: 'New Password',
                        hintText: 'Min 8 characters',
                        controller: _passwordCtrl,
                        obscureText: _obscure1,
                        validator: Validators.password,
                        prefixIcon: const Icon(Icons.lock_outline_rounded, size: 20),
                        suffixIcon: IconButton(
                          icon: Icon(
                            _obscure1 ? Icons.visibility_off_outlined : Icons.visibility_outlined,
                            size: 20, color: AppTheme.textTertiary,
                          ),
                          onPressed: () => setState(() => _obscure1 = !_obscure1),
                        ),
                      ).animate(delay: 300.ms).fadeIn(),

                      const SizedBox(height: 16),

                      AppInput(
                        label: 'Confirm Password',
                        hintText: 'Re-enter password',
                        controller: _confirmCtrl,
                        obscureText: _obscure2,
                        validator: (v) => Validators.confirmPassword(v, _passwordCtrl.text),
                        prefixIcon: const Icon(Icons.lock_outline_rounded, size: 20),
                        suffixIcon: IconButton(
                          icon: Icon(
                            _obscure2 ? Icons.visibility_off_outlined : Icons.visibility_outlined,
                            size: 20, color: AppTheme.textTertiary,
                          ),
                          onPressed: () => setState(() => _obscure2 = !_obscure2),
                        ),
                      ).animate(delay: 400.ms).fadeIn(),
                    ],
                  ),
                ),

                const SizedBox(height: 32),

                AppButton(
                  text: 'Reset Password',
                  isGradient: true,
                  isLoading: _isLoading,
                  onPressed: _reset,
                ).animate(delay: 500.ms).fadeIn(),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
