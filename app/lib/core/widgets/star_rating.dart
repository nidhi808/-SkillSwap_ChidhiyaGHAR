import 'package:flutter/material.dart';
import '../../config/theme.dart';

/// Interactive star rating with tap and half-star support.
class StarRating extends StatelessWidget {
  final double rating;
  final int starCount;
  final double size;
  final Color? color;
  final ValueChanged<double>? onRatingChanged;

  const StarRating({
    super.key,
    required this.rating,
    this.starCount = 5,
    this.size = 24,
    this.color,
    this.onRatingChanged,
  });

  @override
  Widget build(BuildContext context) {
    final starColor = color ?? AppTheme.warning;

    return Row(
      mainAxisSize: MainAxisSize.min,
      children: List.generate(starCount, (index) {
        final starValue = index + 1;
        IconData icon;
        if (rating >= starValue) {
          icon = Icons.star_rounded;
        } else if (rating >= starValue - 0.5) {
          icon = Icons.star_half_rounded;
        } else {
          icon = Icons.star_outline_rounded;
        }

        return GestureDetector(
          onTap: onRatingChanged != null
              ? () => onRatingChanged!(starValue.toDouble())
              : null,
          child: Icon(
            icon,
            size: size,
            color: rating >= starValue - 0.5 ? starColor : AppTheme.textTertiary,
          ),
        );
      }),
    );
  }
}
