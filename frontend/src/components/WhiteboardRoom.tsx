import React, { useRef, useState, useEffect } from 'react';
import { Camera, CameraOff, Palette, Eraser, Trash2, LogOut, Send, MessageSquare, Mic, MicOff, Monitor, MonitorOff } from 'lucide-react';
import { api } from '../services/api';
import TRTC from 'trtc-sdk-v5';

function stringToNumericId(str: string): number {
  let hash = 0;
  if (!str) return hash;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return (Math.abs(hash) % 2147483647) + 1;
}


interface WhiteboardRoomProps {
  roomData: { tutor: string; student: string; skill: string };
  onClose: () => void;
  setVisorState: (state: 'eyes' | 'quote' | 'swap' | 'success' | 'camera') => void;
}

interface PathElement {
  color: string;
  penSize: number;
  points: { x: number; y: number }[];
  isEraser: boolean;
}

export const WhiteboardRoom: React.FC<WhiteboardRoomProps> = ({ roomData, onClose, setVisorState }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#00f0ff');
  const [penSize, setPenSize] = useState(4);
  const [isEraser, setIsEraser] = useState(false);
  const [elements, setElements] = useState<PathElement[]>([]);
  const currentPathRef = useRef<PathElement | null>(null);

  // Generate a unique session ID based on roomData names/skill
  const sessionId = (roomData.tutor + '_' + roomData.student + '_' + roomData.skill)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_');

  // Video feed states
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const [audioActive, setAudioActive] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);


  // Chat states
  const [messages, setMessages] = useState<{ sender: string; text: string; time: string }[]>([
    { sender: roomData.tutor, text: `Hello! Thanks for connecting. Let's start the ${roomData.skill} tutorial.`, time: '14:02' },
    { sender: roomData.student, text: `Sure! I have loaded the notes. Ready when you are!`, time: '14:03' }
  ]);
  const [newMsg, setNewMsg] = useState('');
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setVisorState('camera');
  }, [setVisorState]);

  // Draw a path onto the canvas helper
  const drawPath = (ctx: CanvasRenderingContext2D, path: PathElement) => {
    if (path.points.length === 0) return;
    ctx.beginPath();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = path.isEraser ? '#0f0f13' : path.color;
    ctx.lineWidth = path.isEraser ? 24 : path.penSize;

    ctx.moveTo(path.points[0].x, path.points[0].y);
    for (let i = 1; i < path.points.length; i++) {
      ctx.lineTo(path.points[i].x, path.points[i].y);
    }
    ctx.stroke();
    ctx.closePath();
  };

  // Setup canvas drawings and restore state
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = canvas.parentElement?.clientWidth || 800;
    canvas.height = canvas.parentElement?.clientHeight || 500;

    const context = canvas.getContext('2d');
    if (!context) return;

    contextRef.current = context;
    context.fillStyle = '#0f0f13';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Fetch and draw saved whiteboard state
    const loadWhiteboardState = async () => {
      try {
        const res = await api.whiteboard.getState(sessionId);
        if (res.data && res.data.elements) {
          const loadedElements = res.data.elements || [];
          setElements(loadedElements);
          loadedElements.forEach((path: PathElement) => {
            drawPath(context, path);
          });
        }
      } catch (err) {
        console.error('Failed to load whiteboard state:', err);
      }
    };
    loadWhiteboardState();
  }, [sessionId]);

  // Update stroke values on color/pen size change
  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = isEraser ? '#0f0f13' : color;
      contextRef.current.lineWidth = isEraser ? 24 : penSize;
    }
  }, [color, penSize, isEraser]);

  // Web camera activation and TRTC video room setup
  const trtcRef = useRef<any>(null);
  const [peerVideoActive, setPeerVideoActive] = useState(false);

  useEffect(() => {
    const initTRTC = async () => {
      try {
        // 1. Get credentials from backend
        const res = await api.video.getTrtcSig();
        const { sdkAppId, userSig, userId } = res.data;

        // 2. Create the TRTC instance
        const trtc = TRTC.create();
        trtcRef.current = trtc;


        // 3. Set up event listeners BEFORE entering room
        trtc.on(TRTC.EVENT.REMOTE_VIDEO_AVAILABLE, (event: any) => {
          const { userId: remoteUserId, streamType } = event;
          console.log(`[TRTC] Remote video available from ${remoteUserId}`);
          setPeerVideoActive(true);

          // Render remote video
          setTimeout(() => {
            trtc.startRemoteVideo({
              userId: remoteUserId,
              streamType,
              view: 'peer-video-view'
            }).catch((err: any) => {
              console.error('[TRTC] Failed to start remote video:', err);
            });
          }, 200); // Small timeout to ensure DOM has rendered container
        });

        trtc.on(TRTC.EVENT.REMOTE_VIDEO_UNAVAILABLE, (event: any) => {
          const { userId: remoteUserId, streamType } = event;
          console.log(`[TRTC] Remote video unavailable from ${remoteUserId}`);
          trtc.stopRemoteVideo({ userId: remoteUserId, streamType });
          setPeerVideoActive(false);
        });

        trtc.on(TRTC.EVENT.REMOTE_AUDIO_AVAILABLE, (event: any) => {
          const { userId: remoteUserId } = event;
          console.log(`[TRTC] Remote audio available from ${remoteUserId}`);
          // Play remote audio (SDK handles rendering/playing auto)
        });

        // 4. Enter room
        // Hash sessionId to a numeric room ID to ensure default namespace works
        const numericRoomId = stringToNumericId(sessionId);
        const cleanUserId = userId.replace(/-/g, '');

        await trtc.enterRoom({
          sdkAppId,
          userId: cleanUserId,
          userSig,
          roomId: numericRoomId
        });
        console.log(`[TRTC] Joined room ${numericRoomId} as ${cleanUserId}`);

        // 5. Start publishing local feeds
        await trtc.startLocalVideo({ view: 'local-video-view' });
        await trtc.startLocalAudio();
        setCameraActive(true);

      } catch (err) {
        console.error('[TRTC] Initialization error:', err);
        setCameraError(true);
      }
    };

    initTRTC();

    return () => {
      const trtc = trtcRef.current;
      if (trtc) {
        console.log('[TRTC] Cleaning up and leaving room');
        trtc.exitRoom()
          .then(() => {
            trtc.stopLocalVideo();
            trtc.stopLocalAudio();
          })
          .catch((err: any) => {
            console.error('[TRTC] Cleanup error:', err);
          });
      }
    };
  }, [sessionId]);

  const toggleCamera = async () => {
    const trtc = trtcRef.current;
    if (!trtc) return;
    try {
      if (cameraActive) {
        await trtc.stopLocalVideo();
        setCameraActive(false);
      } else {
        await trtc.startLocalVideo({ view: 'local-video-view' });
        setCameraActive(true);
      }
    } catch (err) {
      console.error('[TRTC] Failed to toggle video:', err);
    }
  };

  const toggleAudio = async () => {
    const trtc = trtcRef.current;
    if (!trtc) return;
    try {
      if (audioActive) {
        await trtc.updateLocalAudio({ mute: true }).catch(async () => {
          await trtc.stopLocalAudio();
        });
        setAudioActive(false);
      } else {
        await trtc.updateLocalAudio({ mute: false }).catch(async () => {
          await trtc.startLocalAudio();
        });
        setAudioActive(true);
      }
    } catch (err) {
      console.error('[TRTC] Failed to toggle audio:', err);
    }
  };

  const toggleScreenShare = async () => {
    const trtc = trtcRef.current;
    if (!trtc) return;
    try {
      if (screenSharing) {
        await trtc.stopScreenShare();
        setScreenSharing(false);
        await trtc.startLocalVideo({ view: 'local-video-view' });
        setCameraActive(true);
      } else {
        if (cameraActive) {
          await trtc.stopLocalVideo();
        }
        await trtc.startScreenShare({ view: 'local-video-view' });
        setScreenSharing(true);
        setCameraActive(true);
      }
    } catch (err) {
      console.error('[TRTC] Failed to toggle screen share:', err);
      try {
        await trtc.startLocalVideo({ view: 'local-video-view' });
        setCameraActive(true);
        setScreenSharing(false);
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Scroll chat to bottom
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Whiteboard drawing handlers
  const startDrawing = ({ nativeEvent }: React.MouseEvent) => {
    const { offsetX, offsetY } = nativeEvent;
    if (contextRef.current) {
      contextRef.current.beginPath();
      contextRef.current.moveTo(offsetX, offsetY);
      setIsDrawing(true);

      currentPathRef.current = {
        color,
        penSize,
        points: [{ x: offsetX, y: offsetY }],
        isEraser
      };
    }
  };

  const draw = ({ nativeEvent }: React.MouseEvent) => {
    if (!isDrawing || !contextRef.current || !currentPathRef.current) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();

    currentPathRef.current.points.push({ x: offsetX, y: offsetY });
  };

  const stopDrawing = async () => {
    if (contextRef.current) {
      contextRef.current.closePath();
    }
    setIsDrawing(false);

    if (currentPathRef.current) {
      const updatedElements = [...elements, currentPathRef.current];
      setElements(updatedElements);
      currentPathRef.current = null;

      // Save state to backend
      try {
        await api.whiteboard.saveState(sessionId, updatedElements);
      } catch (err) {
        console.error('Failed to save whiteboard state:', err);
      }
    }
  };

  const clearCanvas = async () => {
    const canvas = canvasRef.current;
    if (canvas && contextRef.current) {
      contextRef.current.fillStyle = '#0f0f13';
      contextRef.current.fillRect(0, 0, canvas.width, canvas.height);
      setElements([]);

      try {
        await api.whiteboard.saveState(sessionId, []);
      } catch (err) {
        console.error('Failed to clear whiteboard state in backend:', err);
      }
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsg.trim()) return;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    setMessages([...messages, { sender: roomData.student, text: newMsg, time: timeStr }]);
    setNewMsg('');

    // Simulate automatic response from tutor after 2 seconds
    setTimeout(() => {
      const tutorResponses = [
        "Let me sketch the design diagram on the whiteboard.",
        "Yes, you are drawing it correctly! Try to connect those points.",
        "Does that make sense or should I redraw it?"
      ];
      const randomReply = tutorResponses[Math.floor(Math.random() * tutorResponses.length)];
      setMessages(prev => [...prev, { sender: roomData.tutor, text: randomReply, time: timeStr }]);
    }, 2000);
  };

  return (
    <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr', height: '90vh', gap: '16px', padding: '24px 40px', zIndex: 10 }}>
      
      {/* HEADER SECTION */}
      <div 
        className="glass-panel cyan-glow"
        style={{ 
          padding: '16px 24px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          border: '1px solid rgba(0, 240, 255, 0.15)' 
        }}
      >
        <div>
          <span className="badge-neon pulse-cyan" style={{ marginBottom: '6px' }}>
            ● LIVE SESSION
          </span>
          <h3 style={{ color: '#fff', fontSize: '1.2rem' }} className="font-mono">
            {roomData.skill.toUpperCase()} EXCHANGE // {roomData.tutor} ⇆ {roomData.student}
          </h3>
        </div>

        <button 
          className="cyber-button purple font-mono" 
          style={{ padding: '8px 16px', fontSize: '0.8rem' }}
          onClick={onClose}
        >
          <LogOut size={14} /> LEAVE CLASSROOM
        </button>
      </div>

      {/* MAIN CONTAINER */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', minHeight: '400px' }}>
        
        {/* WHITEBOARD SCREEN (LEFT) */}
        <div 
          className="glass-panel" 
          style={{ 
            display: 'grid', 
            gridTemplateRows: '1fr auto', 
            border: '1px solid rgba(255, 255, 255, 0.05)',
            position: 'relative'
          }}
        >
          {/* Drawing Canvas */}
          <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
            <canvas 
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              style={{ cursor: 'crosshair', display: 'block', width: '100%', height: '100%' }}
            />
          </div>

          {/* Canvas Controls Toolbar */}
          <div 
            style={{ 
              background: '#0a0a0d', 
              padding: '12px 24px', 
              borderTop: '1px solid rgba(255, 255, 255, 0.05)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            {/* Color Palette */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <Palette size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> COLOR:
              </span>
              {['#00f0ff', '#bd00ff', '#39ff14', '#ffffff'].map(c => (
                <button
                  key={c}
                  onClick={() => { setColor(c); setIsEraser(false); }}
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: c,
                    border: color === c && !isEraser ? '2px solid #fff' : '2px solid transparent',
                    cursor: 'pointer',
                    boxShadow: color === c && !isEraser ? `0 0 8px ${c}` : 'none',
                    transition: 'all 0.2s'
                  }}
                />
              ))}
            </div>

            {/* Brush Width Slider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>BRUSH SIZE:</span>
              <input 
                type="range" 
                min={2} 
                max={15} 
                value={penSize}
                onChange={(e) => setPenSize(parseInt(e.target.value))}
                style={{ 
                  cursor: 'pointer', 
                  accentColor: 'var(--color-cyan)',
                  width: '100px'
                }}
              />
              <span className="font-mono" style={{ fontSize: '0.8rem', color: '#fff', width: '20px' }}>{penSize}px</span>
            </div>

            {/* Tools */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                className={`cyber-button font-mono ${isEraser ? '' : 'purple'}`}
                style={{ padding: '6px 12px', fontSize: '0.7rem' }}
                onClick={() => setIsEraser(!isEraser)}
              >
                <Eraser size={12} /> {isEraser ? 'PEN' : 'ERASER'}
              </button>
              <button
                className="cyber-button font-mono"
                style={{ padding: '6px 12px', fontSize: '0.7rem', border: '1px solid rgba(255, 0, 0, 0.4)' }}
                onClick={clearCanvas}
              >
                <Trash2 size={12} /> CLEAR BOARD
              </button>
            </div>

          </div>
        </div>

        {/* FEED & CHAT SIDEBAR (RIGHT) */}
        <div style={{ display: 'grid', gridTemplateRows: '1.2fr 1fr', gap: '20px' }}>
          
          {/* CAMERA FEED VIEW */}
          <div className="glass-panel cyan-glow" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '6px' }}>
              // WEBCAM_FEEDS_ACTIVE
            </span>

            {/* Grid for Video Feeds */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px', flex: 1 }}>
              
              {/* Active User Webcam */}
              <div style={{ background: '#070709', border: '1px solid rgba(0, 240, 255, 0.15)', borderRadius: '6px', position: 'relative', overflow: 'hidden', height: '140px' }}>
                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                  <div 
                    id="local-video-view" 
                    style={{ width: '100%', height: '100%', display: cameraActive ? 'block' : 'none' }} 
                  />
                  {!cameraActive && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '8px' }}>
                      {cameraError ? (
                        <>
                          <CameraOff size={24} color="#ff4d4d" />
                          <span className="font-mono" style={{ fontSize: '0.7rem', color: '#ff4d4d' }}>CAM_ACCESS_DENIED</span>
                        </>
                      ) : (
                        <>
                          <div className="pulse-cyan" style={{ border: '2px solid var(--color-cyan)', borderRadius: '50%', padding: '10px' }}>
                            <Camera size={20} color="var(--color-cyan)" />
                          </div>
                          <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>INITIALIZING WEBCAM...</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
                <span className="font-mono" style={{ position: 'absolute', bottom: '6px', left: '8px', fontSize: '0.65rem', background: 'rgba(0,0,0,0.5)', padding: '2px 6px', borderRadius: '3px', color: 'var(--color-cyan)', zIndex: 10 }}>
                  {roomData.student} (You)
                </span>
              </div>

              {/* Peer Webcam */}
              <div style={{ background: '#070709', border: '1px solid rgba(189, 0, 255, 0.15)', borderRadius: '6px', position: 'relative', overflow: 'hidden', height: '140px' }}>
                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                  <div 
                    id="peer-video-view" 
                    style={{ width: '100%', height: '100%', display: peerVideoActive ? 'block' : 'none' }} 
                  />
                  {!peerVideoActive && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '8px', position: 'relative' }}>
                      <span style={{ fontSize: '3rem' }}>👨‍💻</span>
                      <div 
                        style={{ 
                          position: 'absolute', 
                          top: 0, left: 0, right: 0, 
                          height: '2px', 
                          background: 'rgba(189, 0, 255, 0.6)', 
                          boxShadow: '0 0 8px var(--color-purple)', 
                          animation: 'scanlines 2s infinite linear' 
                        }} 
                      />
                      <span className="font-mono pulse-cyan" style={{ fontSize: '0.7rem', color: 'var(--color-purple)' }}>
                        AWAITING PEER VIDEO...
                      </span>
                    </div>
                  )}
                </div>
                <span className="font-mono" style={{ position: 'absolute', bottom: '6px', left: '8px', fontSize: '0.65rem', background: 'rgba(0,0,0,0.5)', padding: '2px 6px', borderRadius: '3px', color: 'var(--color-purple)', zIndex: 10 }}>
                  {roomData.tutor} (Tutor)
                </span>
              </div>

            </div>

            {/* Call Control Options */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '12px' }}>
              <button 
                onClick={toggleCamera} 
                className={`cyber-button ${cameraActive ? '' : 'purple'}`} 
                style={{ padding: '8px 12px', fontSize: '0.75rem', justifyContent: 'center', gap: '6px', flex: 1 }}
                title={cameraActive ? 'Turn Camera Off' : 'Turn Camera On'}
              >
                {cameraActive ? <Camera size={14} color="var(--color-cyan)" /> : <CameraOff size={14} color="var(--color-purple)" />}
                <span className="font-mono" style={{ fontSize: '0.65rem' }}>CAM</span>
              </button>
              <button 
                onClick={toggleAudio} 
                className={`cyber-button ${audioActive ? '' : 'purple'}`} 
                style={{ padding: '8px 12px', fontSize: '0.75rem', justifyContent: 'center', gap: '6px', flex: 1 }}
                title={audioActive ? 'Mute Mic' : 'Unmute Mic'}
              >
                {audioActive ? <Mic size={14} color="var(--color-cyan)" /> : <MicOff size={14} color="var(--color-purple)" />}
                <span className="font-mono" style={{ fontSize: '0.65rem' }}>MIC</span>
              </button>
              <button 
                onClick={toggleScreenShare} 
                className={`cyber-button ${screenSharing ? '' : 'purple'}`} 
                style={{ padding: '8px 12px', fontSize: '0.75rem', justifyContent: 'center', gap: '6px', flex: 2 }}
                title={screenSharing ? 'Stop Screen Share' : 'Start Screen Share'}
              >
                {screenSharing ? <MonitorOff size={14} color="var(--color-cyan)" /> : <Monitor size={14} color="var(--color-purple)" />}
                <span className="font-mono" style={{ fontSize: '0.65rem' }}>SCREEN SHARE</span>
              </button>
            </div>

          </div>

          {/* CHAT LOG VIEW */}
          <div className="glass-panel" style={{ padding: '20px', display: 'grid', gridTemplateRows: 'auto 1fr auto', gap: '10px' }}>
            <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '6px' }}>
              <MessageSquare size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> SESSION_CHAT
            </span>

            {/* Chat list */}
            <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '4px', maxHeight: '180px' }}>
              {messages.map((m, i) => {
                const isUser = m.sender === roomData.student;
                return (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: isUser ? 'flex-end' : 'flex-start' }}>
                    <div style={{ display: 'flex', gap: '6px', fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '2px' }}>
                      <span>{m.sender}</span>
                      <span>{m.time}</span>
                    </div>
                    <div 
                      style={{ 
                        background: isUser ? 'rgba(0, 240, 255, 0.12)' : 'rgba(189, 0, 255, 0.12)', 
                        border: isUser ? '1px solid rgba(0, 240, 255, 0.2)' : '1px solid rgba(189, 0, 255, 0.2)',
                        padding: '8px 12px', 
                        borderRadius: '6px',
                        fontSize: '0.85rem',
                        color: '#fff',
                        maxWidth: '85%'
                      }}
                    >
                      {m.text}
                    </div>
                  </div>
                );
              })}
              <div ref={chatBottomRef} />
            </div>

            {/* Chat submit */}
            <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="text" 
                className="hud-input" 
                placeholder="Send message..." 
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
                style={{ padding: '8px 12px', fontSize: '0.85rem' }}
              />
              <button type="submit" className="cyber-button" style={{ padding: '8px' }}>
                <Send size={14} />
              </button>
            </form>

          </div>

        </div>

      </div>

    </div>
  );
};
export default WhiteboardRoom;
