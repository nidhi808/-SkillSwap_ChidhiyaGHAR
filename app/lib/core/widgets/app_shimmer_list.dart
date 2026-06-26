import 'package:flutter/material.dart';
import 'package:shimmer/shimmer.dart';
import '../../config/theme.dart';

/// Configurable shimmer skeleton list for loading states.
class AppShimmerList extends StatelessWidget {
  final int itemCount;
  final double itemHeight;
  final EdgeInsetsGeometry? padding;
  final bool isGrid;

  const AppShimmerList({
    super.key,
    this.itemCount = 5,
    this.itemHeight = 80,
    this.padding,
    this.isGrid = false,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final baseColor = isDark ? AppTheme.surface : const Color(0xFFE2E8F0);
    final highlightColor = isDark
        ? AppTheme.primary.withValues(alpha: 0.15)
        : const Color(0xFFF1F5F9);

    return Shimmer.fromColors(
      baseColor: baseColor,
      highlightColor: highlightColor,
      child: ListView.separated(
        padding: padding ?? const EdgeInsets.all(16),
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        itemCount: itemCount,
        separatorBuilder: (_, __) => const SizedBox(height: 12),
        itemBuilder: (_, __) => _ShimmerItem(height: itemHeight),
      ),
    );
  }
}

class _ShimmerItem extends StatelessWidget {
  final double height;
  const _ShimmerItem({required this.height});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: height,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(AppTheme.radiusMedium),
      ),
    );
  }
}

/// Single shimmer box for individual loading placeholders.
class ShimmerBox extends StatelessWidget {
  final double width;
  final double height;
  final double borderRadius;

  const ShimmerBox({
    super.key,
    this.width = double.infinity,
    required this.height,
    this.borderRadius = AppTheme.radiusMedium,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return Shimmer.fromColors(
      baseColor: isDark ? AppTheme.surface : const Color(0xFFE2E8F0),
      highlightColor: isDark
          ? AppTheme.primary.withValues(alpha: 0.15)
          : const Color(0xFFF1F5F9),
      child: Container(
        width: width,
        height: height,
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(borderRadius),
        ),
      ),
    );
  }
}
