import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../config/theme.dart';

/// Premium button with gradient, glow, haptic feedback, and press animation.
class AppButton extends StatefulWidget {
  final String text;
  final VoidCallback? onPressed;
  final bool isLoading;
  final bool isOutlined;
  final bool isGradient;
  final Color? color;
  final IconData? icon;
  final double? width;

  const AppButton({
    super.key,
    required this.text,
    this.onPressed,
    this.isLoading = false,
    this.isOutlined = false,
    this.isGradient = false,
    this.color,
    this.icon,
    this.width,
  });

  @override
  State<AppButton> createState() => _AppButtonState();
}

class _AppButtonState extends State<AppButton> with SingleTickerProviderStateMixin {
  late AnimationController _scaleCtrl;
  late Animation<double> _scaleAnim;

  @override
  void initState() {
    super.initState();
    _scaleCtrl = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 100),
    );
    _scaleAnim = Tween<double>(begin: 1.0, end: 0.95).animate(
      CurvedAnimation(parent: _scaleCtrl, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _scaleCtrl.dispose();
    super.dispose();
  }

  void _onTapDown(TapDownDetails _) => _scaleCtrl.forward();
  void _onTapUp(TapUpDetails _) => _scaleCtrl.reverse();
  void _onTapCancel() => _scaleCtrl.reverse();

  @override
  Widget build(BuildContext context) {
    final btnColor = widget.color ?? AppTheme.primary;

    if (widget.isOutlined) {
      return ScaleTransition(
        scale: _scaleAnim,
        child: SizedBox(
          width: widget.width ?? double.infinity,
          height: 52,
          child: OutlinedButton(
            onPressed: widget.isLoading ? null : () {
              HapticFeedback.lightImpact();
              widget.onPressed?.call();
            },
            style: OutlinedButton.styleFrom(
              foregroundColor: btnColor,
              side: BorderSide(color: btnColor),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(AppTheme.radiusMedium),
              ),
            ),
            child: _buildChild(btnColor),
          ),
        ),
      );
    }

    if (widget.isGradient) {
      return GestureDetector(
        onTapDown: widget.onPressed != null ? _onTapDown : null,
        onTapUp: widget.onPressed != null ? _onTapUp : null,
        onTapCancel: widget.onPressed != null ? _onTapCancel : null,
        onTap: widget.isLoading ? null : () {
          HapticFeedback.lightImpact();
          widget.onPressed?.call();
        },
        child: ScaleTransition(
          scale: _scaleAnim,
          child: Container(
            width: widget.width ?? double.infinity,
            height: 52,
            decoration: BoxDecoration(
              gradient: AppTheme.primaryGradient,
              borderRadius: BorderRadius.circular(AppTheme.radiusMedium),
              boxShadow: AppTheme.neonGlow(AppTheme.primary, spread: 4, blur: 12),
            ),
            child: Center(child: _buildChild(Colors.white)),
          ),
        ),
      );
    }

    // Default elevated
    return ScaleTransition(
      scale: _scaleAnim,
      child: SizedBox(
        width: widget.width ?? double.infinity,
        height: 52,
        child: GestureDetector(
          onTapDown: widget.onPressed != null ? _onTapDown : null,
          onTapUp: widget.onPressed != null ? _onTapUp : null,
          onTapCancel: widget.onPressed != null ? _onTapCancel : null,
          child: ElevatedButton(
            onPressed: widget.isLoading ? null : () {
              HapticFeedback.lightImpact();
              widget.onPressed?.call();
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: btnColor,
              elevation: 8,
              shadowColor: btnColor.withValues(alpha: 0.4),
            ),
            child: _buildChild(Colors.white),
          ),
        ),
      ),
    );
  }

  Widget _buildChild(Color textColor) {
    if (widget.isLoading) {
      return SizedBox(
        width: 22,
        height: 22,
        child: CircularProgressIndicator(strokeWidth: 2.5, color: textColor),
      );
    }
    if (widget.icon != null) {
      return Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(widget.icon, size: 20, color: textColor),
          const SizedBox(width: 8),
          Text(widget.text, style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: textColor)),
        ],
      );
    }
    return Text(widget.text, style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: textColor));
  }
}
