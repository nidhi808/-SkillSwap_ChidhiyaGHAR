import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/widgets/app_button.dart';
import '../../../core/widgets/app_input.dart';
import '../../../core/utils/validators.dart';

class RegisterScreen extends ConsumerStatefulWidget {
  const RegisterScreen({super.key});

  @override
  ConsumerState<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends ConsumerState<RegisterScreen> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _usernameController = TextEditingController();
  final _passwordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();
  bool _isLoading = false;

  Future<void> _register() async {
    if (!_formKey.currentState!.validate()) return;
    setState(() => _isLoading = true);
    try {
      final api = ref.read(apiResponseProvider);
      final response = await api.post('/auth/register', {
        'email': _emailController.text.trim(),
        'username': _usernameController.text.trim(),
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
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Registration failed: $e')));
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
          child: ListView(
            children: [
              const SizedBox(height: 60),
              Text('Create Account', style: Theme.of(context).textTheme.displayMedium),
              const SizedBox(height: 32),
              AppInput(label: 'Email', hintText: 'Enter your email', controller: _emailController, validator: Validators.email, keyboardType: TextInputType.emailAddress),
              const SizedBox(height: 16),
              AppInput(label: 'Username', hintText: 'Choose a username', controller: _usernameController, validator: (v) => Validators.required(v, 'Username')),
              const SizedBox(height: 16),
              AppInput(label: 'Password', hintText: 'Create a password', controller: _passwordController, obscureText: true, validator: Validators.password),
              const SizedBox(height: 16),
              AppInput(label: 'Confirm Password', hintText: 'Re-enter password', controller: _confirmPasswordController, obscureText: true, validator: (v) => Validators.confirmPassword(v, _passwordController.text)),
              const SizedBox(height: 24),
              AppButton(text: 'Register', onPressed: _register, isLoading: _isLoading),
            ],
          ),
        ),
      ),
    );
  }
}
