import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/widgets/app_button.dart';
import '../../../core/widgets/app_input.dart';
import '../../../core/utils/validators.dart';
import '../../../core/providers/providers.dart';

class LoginScreen extends ConsumerStatefulWidget {
  const LoginScreen({super.key});

  @override
  ConsumerState<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends ConsumerState<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _isLoading = false;

  Future<void> _login() async {
    if (!_formKey.currentState!.validate()) return;
    setState(() => _isLoading = true);
    try {
      final api = ref.read(apiResponseProvider);
      final response = await api.post('/auth/login', {
        'email': _emailController.text.trim(),
        'password': _passwordController.text,
      });
      final auth = response as Map<String, dynamic>;
      await ref.read(storageServiceProvider).saveAccessToken(auth['accessToken']);
      await ref.read(storageServiceProvider).saveRefreshToken(auth['refreshToken']);
      ref.read(authStateProvider.notifier).state = true;
      if (!mounted) return;
      Navigator.of(context).pushReplacementNamed('/onboarding');
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Login failed: $e')));
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(24),
        child: Form(
          key: _formKey,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text('Welcome Back', style: Theme.of(context).textTheme.displayMedium),
              const SizedBox(height: 32),
              AppInput(label: 'Email', hintText: 'Enter your email', controller: _emailController, validator: Validators.email, keyboardType: TextInputType.emailAddress),
              const SizedBox(height: 16),
              AppInput(label: 'Password', hintText: 'Enter your password', controller: _passwordController, obscureText: true, validator: Validators.password),
              const SizedBox(height: 24),
              AppButton(text: 'Login', onPressed: _login, isLoading: _isLoading),
              const SizedBox(height: 16),
              TextButton(onPressed: () => Navigator.pushNamed(context, '/forgot-password'), child: const Text('Forgot Password?')),
            ],
          ),
        ),
      ),
    );
  }
}
