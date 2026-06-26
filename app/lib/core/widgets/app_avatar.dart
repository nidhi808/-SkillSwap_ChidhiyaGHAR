import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';
import '../../config/theme.dart';

/// Avatar with CachedNetworkImage, neon border glow, online indicator,
/// and initials fallback.
class AppAvatar extends StatelessWidget {
  final String? imageUrl;
  final String? name;
  final double radius;
  final bool showOnlineIndicator;
  final bool isOnline;
  final Color? glowColor;

  const AppAvatar({
    super.key,
    this.imageUrl,
    this.name,
    this.radius = 24,
    this.showOnlineIndicator = false,
    this.isOnline = false,
    this.glowColor,
  });

  String get _initials {
    if (name == null || name!.isEmpty) return '?';
    final parts = name!.trim().split(' ');
    if (parts.length >= 2) return '${parts[0][0]}${parts[1][0]}'.toUpperCase();
    return parts[0][0].toUpperCase();
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Container(
          width: radius * 2,
          height: radius * 2,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            boxShadow: glowColor != null
                ? AppTheme.neonGlow(glowColor!, spread: 2, blur: 8)
                : null,
          ),
          child: CircleAvatar(
            radius: radius,
            backgroundColor: AppTheme.surface,
            child: imageUrl != null && imageUrl!.isNotEmpty
                ? ClipOval(
                    child: CachedNetworkImage(
                      imageUrl: imageUrl!,
                      width: radius * 2,
                      height: radius * 2,
                      fit: BoxFit.cover,
                      placeholder: (_, __) => _buildInitials(),
                      errorWidget: (_, __, ___) => _buildInitials(),
                    ),
                  )
                : _buildInitials(),
          ),
        ),
        if (showOnlineIndicator)
          Positioned(
            right: 0,
            bottom: 0,
            child: Container(
              width: radius * 0.4,
              height: radius * 0.4,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: isOnline ? AppTheme.success : AppTheme.textTertiary,
                border: Border.all(color: AppTheme.background, width: 2),
              ),
            ),
          ),
      ],
    );
  }

  Widget _buildInitials() {
    return Center(
      child: Text(
        _initials,
        style: TextStyle(
          color: AppTheme.primary,
          fontSize: radius * 0.5,
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }
}
