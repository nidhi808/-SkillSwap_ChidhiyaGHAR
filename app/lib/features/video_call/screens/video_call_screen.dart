import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:tencent_rtc_sdk/trtc_cloud.dart';
import 'package:tencent_rtc_sdk/trtc_cloud_def.dart';
import 'package:tencent_rtc_sdk/trtc_cloud_listener.dart';
import 'package:tencent_rtc_sdk/trtc_cloud_video_view.dart';
import '../../../config/app_config.dart';
import '../../../config/theme.dart';
import '../../../core/providers/auth_provider.dart';
import '../../../core/services/socket_service.dart';
import '../../../core/utils/trtc_sig.dart';
import '../../../core/widgets/app_button.dart';
import '../../../core/widgets/neon_text.dart';

class VideoCallScreen extends ConsumerStatefulWidget {
  final String sessionId;
  const VideoCallScreen({super.key, required this.sessionId});

  @override
  ConsumerState<VideoCallScreen> createState() => _VideoCallScreenState();
}

class _VideoCallScreenState extends ConsumerState<VideoCallScreen> {
  late TRTCCloud _trtcCloud;
  bool _isJoined = false;
  bool _isMicOn = true;
  bool _isCameraOn = true;
  bool _isScreenSharing = false;
  TRTCCloudListener? _trtcListener;
  
  String? _remoteUserId;
  int? _localViewId;
  int? _remoteViewId;

  @override
  void initState() {
    super.initState();
    _initTRTC();
  }

  @override
  void dispose() {
    _leaveRoom();
    super.dispose();
  }

  Future<void> _initTRTC() async {
    try {
      // 1. Join room on Socket.IO for whiteboard & signaling sync
      ref.read(socketServiceProvider).emit('join_session', widget.sessionId);

      // 2. Initialize TRTC
      final cloud = await TRTCCloud.sharedInstance();
      if (cloud == null) return;
      _trtcCloud = cloud;

      // 3. Register listener object
      _trtcListener = TRTCCloudListener(
        onUserVideoAvailable: (userId, available) {
          setState(() {
            if (available) {
              _remoteUserId = userId;
            } else {
              if (_remoteUserId == userId) {
                _remoteUserId = null;
                _remoteViewId = null;
              }
            }
          });
        },
        onError: (errCode, errMsg) {
          debugPrint('[TRTC] error: $errCode, msg: $errMsg');
        },
      );
      _trtcCloud.registerListener(_trtcListener!);

      // 4. Resolve current user credentials
      final currentUser = ref.read(authProvider).user;
      final userId = currentUser?.id ?? 'user_${DateTime.now().millisecondsSinceEpoch}';

      // 5. Generate signature locally
      final userSig = GenerateTestUserSig(
        sdkAppId: AppConfig.trtcSdkAppId,
        secretKey: AppConfig.trtcSecretKey,
      ).genSig(userId: userId);

      // 6. Enter the room
      _trtcCloud.enterRoom(
        TRTCParams(
          sdkAppId: AppConfig.trtcSdkAppId,
          userId: userId,
          userSig: userSig,
          strRoomId: widget.sessionId,
          role: TRTCRoleType.anchor,
        ),
        TRTCAppScene.videoCall,
      );

      // 7. Publish local audio stream
      _trtcCloud.startLocalAudio(TRTCAudioQuality.defaultMode);
      
      setState(() {
        _isJoined = true;
      });
    } catch (e) {
      debugPrint('[TRTC] Error initializing call: $e');
    }
  }

  void _leaveRoom() {
    try {
      if (_isScreenSharing) {
        _trtcCloud.stopScreenCapture();
      }
      _trtcCloud.stopLocalAudio();
      _trtcCloud.stopLocalPreview();
      _trtcCloud.exitRoom();
      if (_trtcListener != null) {
        _trtcCloud.unRegisterListener(_trtcListener!);
      }
    } catch (e) {
      debugPrint('[TRTC] Error leaving room: $e');
    }
  }

  void _toggleMic() {
    if (_isMicOn) {
      _trtcCloud.muteLocalAudio(true);
    } else {
      _trtcCloud.muteLocalAudio(false);
    }
    setState(() => _isMicOn = !_isMicOn);
  }

  void _toggleCamera() {
    if (_isCameraOn) {
      _trtcCloud.stopLocalPreview();
      setState(() {
        _isCameraOn = false;
        _localViewId = null;
      });
    } else {
      setState(() {
        _isCameraOn = true;
      });
    }
  }

  void _toggleScreenShare() {
    try {
      if (_isScreenSharing) {
        _trtcCloud.stopScreenCapture();
        setState(() {
          _isScreenSharing = false;
        });
      } else {
        _trtcCloud.startScreenCapture(
          null,
          TRTCVideoStreamType.sub,
          TRTCVideoEncParam(
            videoResolution: TRTCVideoResolution.res_1280_720,
            videoFps: 15,
            videoBitrate: 1600,
            videoResolutionMode: TRTCVideoResolutionMode.portrait,
          ),
        );
        setState(() {
          _isScreenSharing = true;
        });
      }
    } catch (e) {
      debugPrint('[TRTC] Error toggling screen share: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    if (!_isJoined) {
      return Scaffold(
        backgroundColor: AppTheme.background,
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const CircularProgressIndicator(),
              const SizedBox(height: 24),
              NeonText(text: 'Connecting to TRTC Room...', fontSize: 18, glowColor: AppTheme.secondary),
            ],
          ),
        ),
      );
    }

    return Scaffold(
      backgroundColor: AppTheme.background,
      body: Stack(
        children: [
          // ── Remote view (main background) ─────────────────────
          if (_remoteUserId != null)
            Positioned.fill(
              child: TRTCCloudVideoView(
                key: ValueKey('remote_$_remoteUserId'),
                onViewCreated: (viewId) {
                  _remoteViewId = viewId;
                  _trtcCloud.startRemoteView(
                    _remoteUserId!,
                    TRTCVideoStreamType.big,
                    viewId,
                  );
                },
              ),
            )
          else
            Positioned.fill(
              child: Container(
                color: Colors.black87,
                child: Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Icon(Icons.person_outline_rounded, size: 72, color: AppTheme.textSecondary),
                      const SizedBox(height: 16),
                      Text(
                        'Waiting for peer...',
                        style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: AppTheme.textSecondary),
                      ),
                    ],
                  ),
                ),
              ),
            ),

          // ── Local video preview (floating PiP window) ──────────
          if (_isCameraOn)
            Positioned(
              top: 50,
              right: 16,
              width: 120,
              height: 180,
              child: ClipRRect(
                borderRadius: BorderRadius.circular(AppTheme.radiusMedium),
                child: Container(
                  color: Colors.black,
                  child: TRTCCloudVideoView(
                    key: const ValueKey('local_preview'),
                    onViewCreated: (viewId) {
                      _localViewId = viewId;
                      _trtcCloud.startLocalPreview(true, viewId);
                    },
                  ),
                ),
              ),
            ),

          // ── Overlay elements (whiteboard path link) ──────────
          Positioned(
            top: 50,
            left: 16,
            child: AppButton(
              text: 'Whiteboard',
              icon: Icons.gesture_rounded,
              isOutlined: true,
              onPressed: () {
                context.push('/sessions/${widget.sessionId}/whiteboard');
              },
            ),
          ),

          // ── Bottom Action Controls ───────────────────────────
          Positioned(
            bottom: 40,
            left: 0,
            right: 0,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                // Mic Control
                IconButton(
                  onPressed: _toggleMic,
                  iconSize: 32,
                  icon: Icon(_isMicOn ? Icons.mic_rounded : Icons.mic_off_rounded),
                  color: Colors.white,
                  style: IconButton.styleFrom(
                    backgroundColor: _isMicOn 
                        ? Colors.white.withValues(alpha: 0.15) 
                        : Colors.red.withValues(alpha: 0.8),
                  ),
                ),
                const SizedBox(width: 20),

                // Camera Control
                IconButton(
                  onPressed: _toggleCamera,
                  iconSize: 32,
                  icon: Icon(_isCameraOn ? Icons.videocam_rounded : Icons.videocam_off_rounded),
                  color: Colors.white,
                  style: IconButton.styleFrom(
                    backgroundColor: _isCameraOn 
                        ? Colors.white.withValues(alpha: 0.15) 
                        : Colors.red.withValues(alpha: 0.8),
                  ),
                ),
                const SizedBox(width: 20),

                // Screen Share Control
                IconButton(
                  onPressed: _toggleScreenShare,
                  iconSize: 32,
                  icon: Icon(_isScreenSharing ? Icons.screen_share_rounded : Icons.stop_screen_share_rounded),
                  color: Colors.white,
                  style: IconButton.styleFrom(
                    backgroundColor: _isScreenSharing 
                        ? AppTheme.secondary.withValues(alpha: 0.8) 
                        : Colors.white.withValues(alpha: 0.15),
                  ),
                ),
                const SizedBox(width: 20),

                // End Call Button
                IconButton(
                  onPressed: () => context.pop(),
                  iconSize: 32,
                  icon: const Icon(Icons.call_end_rounded),
                  color: Colors.white,
                  style: IconButton.styleFrom(
                    backgroundColor: Colors.red.shade700,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
