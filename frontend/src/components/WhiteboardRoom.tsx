import React, { useRef, useState, useEffect } from 'react';
import { Camera, CameraOff, Palette, Eraser, Trash2, LogOut, Send, MessageSquare } from 'lucide-react';

interface WhiteboardRoomProps {
  roomData: { tutor: string; student: string; skill: string };
  onClose: () => void;
  setVisorState: (state: 'eyes' | 'quote' | 'swap' | 'success' | 'camera') => void;
}

export const WhiteboardRoom: React.FC<WhiteboardRoomProps> = ({ roomData, onClose, setVisorState }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#00f0ff');
  const [penSize, setPenSize] = useState(4);
  const [isEraser, setIsEraser] = useState(false);

  // Video feed states
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(false);

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

  // Setup canvas drawings
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas dimensions relative to CSS dimensions
    canvas.width = canvas.parentElement?.clientWidth || 800;
    canvas.height = canvas.parentElement?.clientHeight || 500;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.strokeStyle = color;
    context.lineWidth = penSize;
    contextRef.current = context;

    // Fill canvas background
    context.fillStyle = '#0f0f13';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  // Update stroke values on color/pen size change
  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = isEraser ? '#0f0f13' : color;
      contextRef.current.lineWidth = isEraser ? 24 : penSize;
    }
  }, [color, penSize, isEraser]);

  // Web camera activation
  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { width: 320, height: 240 } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setCameraActive(true);
        }
      } catch (err) {
        console.warn('Camera failed to start:', err);
        setCameraError(true);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

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
    }
  };

  const draw = ({ nativeEvent }: React.MouseEvent) => {
    if (!isDrawing || !contextRef.current) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const stopDrawing = () => {
    if (contextRef.current) {
      contextRef.current.closePath();
    }
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas && contextRef.current) {
      contextRef.current.fillStyle = '#0f0f13';
      contextRef.current.fillRect(0, 0, canvas.width, canvas.height);
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
                {cameraActive ? (
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    muted 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
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
                <span className="font-mono" style={{ position: 'absolute', bottom: '6px', left: '8px', fontSize: '0.65rem', background: 'rgba(0,0,0,0.5)', padding: '2px 6px', borderRadius: '3px', color: 'var(--color-cyan)' }}>
                  {roomData.student} (You)
                </span>
              </div>

              {/* Mock Peer Webcam */}
              <div style={{ background: '#070709', border: '1px solid rgba(189, 0, 255, 0.15)', borderRadius: '6px', position: 'relative', overflow: 'hidden', height: '140px' }}>
                {/* Simulated digital scanning video */}
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
                    FEED_CONNECTED_SECURE
                  </span>
                </div>
                
                <span className="font-mono" style={{ position: 'absolute', bottom: '6px', left: '8px', fontSize: '0.65rem', background: 'rgba(0,0,0,0.5)', padding: '2px 6px', borderRadius: '3px', color: 'var(--color-purple)' }}>
                  {roomData.tutor} (Tutor)
                </span>
              </div>

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
