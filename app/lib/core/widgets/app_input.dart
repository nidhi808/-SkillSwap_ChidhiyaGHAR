import 'package:flutter/material.dart';
import '../../config/theme.dart';

/// Text input with neon focus glow, prefix/suffix icons, and themed styling.
class AppInput extends StatelessWidget {
  final String label;
  final String? hintText;
  final TextEditingController? controller;
  final bool obscureText;
  final String? Function(String?)? validator;
  final TextInputType? keyboardType;
  final Widget? suffixIcon;
  final Widget? prefixIcon;
  final int maxLines;
  final int? maxLength;
  final void Function(String)? onChanged;
  final TextInputAction? textInputAction;
  final FocusNode? focusNode;
  final bool enabled;

  const AppInput({
    super.key,
    required this.label,
    this.hintText,
    this.controller,
    this.obscureText = false,
    this.validator,
    this.keyboardType,
    this.suffixIcon,
    this.prefixIcon,
    this.maxLines = 1,
    this.maxLength,
    this.onChanged,
    this.textInputAction,
    this.focusNode,
    this.enabled = true,
  });

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: controller,
      obscureText: obscureText,
      keyboardType: keyboardType,
      validator: validator,
      maxLines: maxLines,
      maxLength: maxLength,
      onChanged: onChanged,
      textInputAction: textInputAction,
      focusNode: focusNode,
      enabled: enabled,
      style: Theme.of(context).textTheme.bodyLarge,
      decoration: InputDecoration(
        labelText: label,
        hintText: hintText,
        suffixIcon: suffixIcon,
        prefixIcon: prefixIcon,
        counterText: '',
      ),
    );
  }
}
