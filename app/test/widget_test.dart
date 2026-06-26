import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:skillswap_chidhiyaghar/main.dart';

void main() {
  testWidgets('App load smoke test', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(const ProviderScope(child: SkillSwapApp()));

    // Verify that the app starts and pumps the initial frame successfully.
    await tester.pump();
  });
}
