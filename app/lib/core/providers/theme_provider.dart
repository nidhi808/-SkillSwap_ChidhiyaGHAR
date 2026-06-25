import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../services/storage_service.dart';

final themeModeProvider = StateProvider<ThemeMode>((ref) => ThemeMode.dark);
