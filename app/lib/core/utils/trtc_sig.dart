import 'dart:convert';
import 'package:crypto/crypto.dart';
import 'package:archive/archive.dart';

/// Helper to generate Tencent TRTC UserSig for development/local testing.
class GenerateTestUserSig {
  final int sdkAppId;
  final String secretKey;

  const GenerateTestUserSig({
    required this.sdkAppId,
    required this.secretKey,
  });

  /// Generate a User Signature (UserSig) for the given [userId].
  String genSig({required String userId, int expire = 86400}) {
    final int currTime = (DateTime.now().millisecondsSinceEpoch / 1000).floor();
    
    final String contentToBeSigned = 
        "TLS.identifier:$userId\n"
        "TLS.sdkappid:$sdkAppId\n"
        "TLS.time:$currTime\n"
        "TLS.expire:$expire\n";

    final hmacSha256 = Hmac(sha256, utf8.encode(secretKey));
    final digest = hmacSha256.convert(utf8.encode(contentToBeSigned));
    final String sig = base64.encode(digest.bytes);

    final Map<String, dynamic> sigDoc = {
      "TLS.ver": "2.0",
      "TLS.identifier": userId,
      "TLS.sdkappid": sdkAppId,
      "TLS.expire": expire,
      "TLS.time": currTime,
      "TLS.sig": sig,
    };

    final String jsonStr = json.encode(sigDoc);
    final List<int> compress = ZLibEncoder().encode(utf8.encode(jsonStr));
    return _escape(base64.encode(compress));
  }

  String _escape(String content) {
    return content.replaceAll('+', '*').replaceAll('/', '-').replaceAll('=', '_');
  }
}
