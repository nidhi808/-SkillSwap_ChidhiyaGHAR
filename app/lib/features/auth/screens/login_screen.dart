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

class LoginScreen extends ConsumerStatefulWidget {
  const LoginScreen({super.key});

  @override
  ConsumerState<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends ConsumerState<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  final _emailCtrl = TextEditingController();
  final _passwordCtrl = TextEditingController();
  bool _obscure = true;

  @override
  void dispose() {
    _emailCtrl.dispose();
    _passwordCtrl.dispose();
    super.dispose();
  }

  Future<void> _login() async {
    if (!_formKey.currentState!.validate()) return;
    await ref.read(authProvider.notifier).login(
      email: _emailCtrl.text.trim(),
      password: _passwordCtrl.text,
    );

    if (!mounted) return;
    final state = ref.read(authProvider);
    if (state.isAuthenticated) {
      context.go('/onboarding');
    } else if (state.errorMessage != null) {
      AppSnackbar.show(context, message: state.errorMessage!, type: SnackbarType.error);
    }
  }

  @override
  Widget build(BuildContext context) {
    final authState = ref.watch(authProvider);
    final size = MediaQuery.of(context).size;

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
            child: ConstrainedBox(
              constraints: BoxConstraints(minHeight: size.height - MediaQuery.of(context).padding.vertical),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const SizedBox(height: 40),

                  // ── Logo ─────────────────────────────────────
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      gradient: AppTheme.primaryGradient,
                      boxShadow: AppTheme.neonGlow(AppTheme.primary, spread: 6, blur: 20),
                    ),
                    child: const Icon(Icons.swap_horiz_rounded, size: 36, color: Colors.white),
                  ).animate().scale(duration: 500.ms, curve: Curves.elasticOut).fadeIn(),

                  const SizedBox(height: 24),

                  // ── Title ────────────────────────────────────
                  Text(
                    'Welcome Back',
                    style: Theme.of(context).textTheme.displayLarge,
                  ).animate(delay: 200.ms).fadeIn().slideY(begin: 0.2, end: 0),

                  const SizedBox(height: 8),
                  Text(
                    'Sign in to continue your learning journey',
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: AppTheme.textSecondary,
                    ),
                  ).animate(delay: 300.ms).fadeIn(),

                  const SizedBox(height: 40),

                  // ── Form ─────────────────────────────────────
                  Form(
                    key: _formKey,
                    child: Column(
                      children: [
                        AppInput(
                          label: 'Email',
                          hintText: 'Enter your email',
                          controller: _emailCtrl,
                          validator: Validators.email,
                          keyboardType: TextInputType.emailAddress,
                          textInputAction: TextInputAction.next,
                          prefixIcon: const Icon(Icons.email_outlined, size: 20),
                        ).animate(delay: 400.ms).fadeIn().slideX(begin: -0.1, end: 0),

                        const SizedBox(height: 16),

                        AppInput(
                          label: 'Password',
                          hintText: 'Enter your password',
                          controller: _passwordCtrl,
                          obscureText: _obscure,
                          validator: Validators.password,
                          textInputAction: TextInputAction.done,
                          prefixIcon: const Icon(Icons.lock_outline_rounded, size: 20),
                          suffixIcon: IconButton(
                            icon: Icon(
                              _obscure ? Icons.visibility_off_outlined : Icons.visibility_outlined,
                              size: 20,
                              color: AppTheme.textTertiary,
                            ),
                            onPressed: () => setState(() => _obscure = !_obscure),
                          ),
                        ).animate(delay: 500.ms).fadeIn().slideX(begin: -0.1, end: 0),
                      ],
                    ),
                  ),

                  const SizedBox(height: 12),

                  // ── Forgot password ──────────────────────────
                  Align(
                    alignment: Alignment.centerRight,
                    child: TextButton(
                      onPressed: () => context.push('/forgot-password'),
                      child: const Text('Forgot Password?'),
                    ),
                  ).animate(delay: 550.ms).fadeIn(),

                  const SizedBox(height: 24),

                  // ── Login button ─────────────────────────────
                  AppButton(
                    text: 'Sign In',
                    isGradient: true,
                    isLoading: authState.isLoading,
                    onPressed: _login,
                  ).animate(delay: 600.ms).fadeIn().slideY(begin: 0.2, end: 0),

                  const SizedBox(height: 32),

                  // ── Register link ────────────────────────────
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text("Don't have an account? ", style: TextStyle(color: AppTheme.textSecondary)),
                      GestureDetector(
                        onTap: () => context.push('/register'),
                        child: const Text(
                          'Sign Up',
                          style: TextStyle(
                            color: AppTheme.secondary,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ),
                    ],
                  ).animate(delay: 900.ms).fadeIn(),

                  const SizedBox(height: 40),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
