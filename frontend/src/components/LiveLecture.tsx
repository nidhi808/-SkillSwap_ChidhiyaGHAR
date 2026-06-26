import React, { useState, useRef, useEffect } from 'react';

interface LiveLectureProps {
  onBack: () => void;
}

export const LiveLecture: React.FC<LiveLectureProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'participants'>('chat');
  const [isWhiteboardActive, setIsWhiteboardActive] = useState(false);
  const [activeTool, setActiveTool] = useState<string>('select');
  void activeTool;
  void setActiveTool;

  // Drag state for self-view
  const selfViewRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart]);

  return (
    <div className="bg-background text-on-surface font-body-md overflow-hidden h-screen flex flex-col w-full absolute top-0 left-0 z-[100]">
      {/* Top Navigation Anchor */}
      <nav className="w-full top-0 sticky border-b border-outline-variant bg-surface h-20 z-50">
        <div className="max-w-container-max mx-auto px-margin-desktop flex justify-between items-center h-full">
          <div className="flex items-center gap-8">
            <span className="font-headline-md text-headline-md font-bold text-primary">SkillSwap</span>
            <div className="hidden md:flex gap-6 items-center">
              <span className="text-on-surface-variant font-body-md hover:text-primary transition-colors duration-200 cursor-pointer">Browse Skills</span>
              <span className="text-on-surface-variant font-body-md hover:text-primary transition-colors duration-200 cursor-pointer">My Matches</span>
              <span className="text-primary font-bold border-b-2 border-primary pb-1 font-body-md cursor-pointer">Schedule</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end mr-2">
              <span className="font-label-sm text-label-sm text-primary uppercase">Live Now</span>
              <span className="font-body-md text-body-md font-bold">Advanced UI Design Lab</span>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-primary-container overflow-hidden">
              <img className="w-full h-full object-cover" src="https://api.dicebear.com/7.x/bottts/svg?seed=Sarah" alt="Presenter" />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Workspace Container */}
      <main className="flex-1 flex overflow-hidden p-4 gap-4 relative">
        {/* Left Side: Video Canvas */}
        <div className="flex-1 flex flex-col relative rounded-xl overflow-hidden bg-surface-container-lowest">
          {/* Large Main Video Feed */}
          <div className="absolute inset-0 w-full h-full">
            <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80" alt="Main Feed" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent pointer-events-none"></div>
            
            {/* Presenter Name Overlay */}
            <div className="absolute top-6 left-6 flex items-center gap-3 bg-surface/70 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#00dbe9]"></div>
              <span className="font-label-sm text-label-sm text-on-surface tracking-widest uppercase">Dr. Sarah Chen • Host</span>
            </div>
          </div>

          {/* Self-View Corner Docked (Floating) */}
          <div 
            ref={selfViewRef}
            onMouseDown={handleMouseDown}
            style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0) ${isDragging ? 'scale(1.05)' : 'scale(1)'}` }}
            className="absolute top-6 right-6 w-48 h-32 rounded-xl overflow-hidden bg-surface/70 backdrop-blur-md border border-white/10 shadow-[0_0_15px_rgba(0,219,233,0.3)] cursor-move z-20 transition-transform duration-75"
          >
            <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80" alt="Self View" />
            <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/50 px-2 py-0.5 rounded text-[10px] font-label-sm uppercase text-white">
              <span className="material-symbols-outlined text-[12px]">mic</span>
              You (Learning)
            </div>
          </div>

          {/* Central Content Display (If Whiteboard Active) */}
          {isWhiteboardActive && (
            <div className="absolute inset-12 bg-surface/70 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center border-dashed border-primary/30 z-10">
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-surface-container px-6 py-2 rounded-full border border-outline-variant flex gap-4">
                <button className="p-2 hover:bg-primary/20 rounded-lg text-primary transition-all bg-transparent border-none cursor-pointer"><span className="material-symbols-outlined">edit</span></button>
                <button className="p-2 hover:bg-primary/20 rounded-lg text-on-surface-variant bg-transparent border-none cursor-pointer"><span className="material-symbols-outlined">rectangle</span></button>
                <button className="p-2 hover:bg-primary/20 rounded-lg text-on-surface-variant bg-transparent border-none cursor-pointer"><span className="material-symbols-outlined">text_fields</span></button>
                <button className="p-2 hover:bg-primary/20 rounded-lg text-on-surface-variant bg-transparent border-none cursor-pointer"><span className="material-symbols-outlined">image</span></button>
              </div>
              <p className="text-on-surface-variant">Whiteboard Content Goes Here</p>
            </div>
          )}

          {/* Bottom Floating Controls */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-surface/70 backdrop-blur-md border border-white/10 px-8 py-4 rounded-3xl z-30">
            <button className="group flex flex-col items-center gap-1 bg-transparent border-none cursor-pointer">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-surface-variant group-hover:bg-primary transition-all duration-300 group-hover:text-on-primary">
                <span className="material-symbols-outlined">mic</span>
              </div>
              <span className="font-label-sm text-[10px] text-on-surface-variant uppercase">Mute</span>
            </button>
            <button className="group flex flex-col items-center gap-1 bg-transparent border-none cursor-pointer">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-surface-variant group-hover:bg-primary transition-all duration-300 group-hover:text-on-primary">
                <span className="material-symbols-outlined">videocam</span>
              </div>
              <span className="font-label-sm text-[10px] text-on-surface-variant uppercase">Camera</span>
            </button>
            <button className="group flex flex-col items-center gap-1 bg-transparent border-none cursor-pointer">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-surface-variant group-hover:bg-primary transition-all duration-300 group-hover:text-on-primary">
                <span className="material-symbols-outlined">screen_share</span>
              </div>
              <span className="font-label-sm text-[10px] text-on-surface-variant uppercase">Share</span>
            </button>
            <div className="w-[1px] h-10 bg-outline-variant/30"></div>
            <button 
              className="group flex flex-col items-center gap-1 bg-transparent border-none cursor-pointer"
              onClick={() => setIsWhiteboardActive(!isWhiteboardActive)}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${isWhiteboardActive ? 'bg-primary-container text-on-primary shadow-[0_0_15px_rgba(0,240,255,0.3)]' : 'bg-secondary-container text-white shadow-[0_0_15px_rgba(125,1,177,0.3)]'}`}>
                <span className="material-symbols-outlined">draw</span>
              </div>
              <span className="font-label-sm text-[10px] text-secondary uppercase">Whiteboard</span>
            </button>
            <div className="w-[1px] h-10 bg-outline-variant/30"></div>
            <button 
              onClick={onBack}
              className="group flex flex-col items-center gap-1 bg-transparent border-none cursor-pointer"
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center bg-error-container text-white transition-all duration-300 hover:scale-110 active:scale-95">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>call_end</span>
              </div>
              <span className="font-label-sm text-[10px] text-error uppercase font-bold">Leave</span>
            </button>
          </div>
        </div>

        {/* Right Side: Interaction Sidebar */}
        <aside className="w-80 flex flex-col gap-4">
          {/* Collaborative Tools Toggle */}
          <div className="bg-surface/70 backdrop-blur-md border border-white/10 rounded-xl p-4 flex justify-between items-center">
            <div className="flex gap-2">
              <button 
                onClick={() => setActiveTab('chat')}
                className={`px-4 py-2 rounded-lg font-label-sm text-[11px] uppercase tracking-wider font-bold transition-colors border-none cursor-pointer ${activeTab === 'chat' ? 'bg-primary text-on-primary' : 'bg-surface-variant text-on-surface-variant hover:bg-surface-container-high'}`}
              >
                Chat
              </button>
              <button 
                onClick={() => setActiveTab('participants')}
                className={`px-4 py-2 rounded-lg font-label-sm text-[11px] uppercase tracking-wider font-bold transition-colors border-none cursor-pointer ${activeTab === 'participants' ? 'bg-primary text-on-primary' : 'bg-surface-variant text-on-surface-variant hover:bg-surface-container-high'}`}
              >
                Users
              </button>
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-[20px]">groups</span>
              <span className="font-label-sm text-sm">142</span>
            </div>
          </div>

          {/* Chat Content */}
          <div className="bg-surface/70 backdrop-blur-md border border-white/10 rounded-xl flex-1 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-outline-variant bg-surface-container-low flex items-center justify-between">
              <h3 className="font-label-sm text-on-surface uppercase tracking-widest">{activeTab === 'chat' ? 'Live Discussion' : 'Participants'}</h3>
              <span className="material-symbols-outlined text-primary text-[18px]">bolt</span>
            </div>
            
            {activeTab === 'chat' ? (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                  {/* Chat Message (Other) */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-label-sm text-[11px] text-secondary">MARCUS VANE</span>
                      <span className="text-[10px] text-on-surface-variant opacity-60">14:02</span>
                    </div>
                    <div className="bg-surface-container p-3 rounded-tr-xl rounded-br-xl rounded-bl-xl border-l-2 border-secondary text-body-md text-sm">
                      Can you explain the grid constraints for mobile again? The 8px factor is clear, but I missed the gutter size.
                    </div>
                  </div>

                  {/* Chat Message (Teacher Response) */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-label-sm text-[11px] text-primary">DR. SARAH CHEN</span>
                      <div className="px-1.5 py-0.5 rounded bg-primary-fixed-dim/20 text-primary-fixed-dim text-[8px] font-bold">LECTURER</div>
                    </div>
                    <div className="bg-primary/5 p-3 rounded-tr-xl rounded-br-xl rounded-bl-xl border-l-2 border-primary text-body-md text-sm">
                      Sure! Mobile is a 4-column fluid grid with 16px gutters and 16px margins.
                    </div>
                  </div>

                  {/* Chat Message (System) */}
                  <div className="text-center py-2">
                    <span className="text-[10px] font-label-sm text-on-surface-variant/40 tracking-[0.2em] uppercase">Alex Joined the lab</span>
                  </div>

                  {/* Chat Message (Me) */}
                  <div className="flex flex-col gap-1 items-end">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-on-surface-variant opacity-60">14:05</span>
                      <span className="font-label-sm text-[11px] text-primary-container">YOU</span>
                    </div>
                    <div className="bg-surface-container-high p-3 rounded-tl-xl rounded-br-xl rounded-bl-xl text-body-md text-sm">
                      Thanks Sarah! That helps a lot with the responsive breakpoints.
                    </div>
                  </div>
                </div>

                {/* Chat Input */}
                <div className="p-4 bg-surface-container-lowest">
                  <div className="relative">
                    <input className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all outline-none text-on-surface" placeholder="Type a message..." type="text"/>
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-primary-container hover:scale-110 transition-transform bg-transparent border-none cursor-pointer">
                      <span className="material-symbols-outlined">send</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 overflow-y-auto p-4 flex items-center justify-center text-on-surface-variant">
                Participant list will go here...
              </div>
            )}
          </div>
        </aside>
      </main>

      {/* Footer Identity */}
      <footer className="w-full bg-surface-container-lowest py-4 border-t border-outline-variant z-50">
        <div className="max-w-container-max mx-auto px-margin-desktop flex justify-between items-center">
          <div className="flex gap-6 items-center">
            <span className="text-on-surface-variant font-label-sm text-[10px] uppercase tracking-widest opacity-60">© 2024 SkillSwap Lab. Empowering the Spark of Learning.</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-on-primary-container animate-pulse"></span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Connection: Stable (24ms)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-on-surface-variant">timer</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">00:42:15</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
