import 'package:intl/intl.dart';

class Formatters {
  static final DateFormat dateFormat = DateFormat('MMM dd, yyyy');
  static final DateFormat timeFormat = DateFormat('hh:mm a');
  static final DateFormat dateTimeFormat = DateFormat('MMM dd, yyyy hh:mm a');
  static final DateFormat isoFormat = DateFormat('yyyy-MM-ddTHH:mm:ss');

  static String formatDate(DateTime date) => dateFormat.format(date);
  static String formatTime(DateTime date) => timeFormat.format(date);
  static String formatDateTime(DateTime date) => dateTimeFormat.format(date);
  static String formatRelativeTime(DateTime date) {
    final now = DateTime.now();
    final diff = now.difference(date);
    if (diff.inDays > 7) return dateFormat.format(date);
    if (diff.inDays > 0) return '${diff.inDays}d ago';
    if (diff.inHours > 0) return '${diff.inHours}h ago';
    if (diff.inMinutes > 0) return '${diff.inMinutes}m ago';
    return 'Just now';
  }
}
