import React, { useEffect, useState } from 'react';

interface WhiteboardRoomProps {
  roomId: string;
  onLeave: () => void;
  setVisorState: (state: 'eyes' | 'quote' | 'swap' | 'success' | 'camera') => void;
}

export const WhiteboardRoom: React.FC<WhiteboardRoomProps> = ({ roomId, onLeave, setVisorState }) => {
  const [activeTool, setActiveTool] = useState('select');
  void roomId;

  useEffect(() => {
    // Show 'camera' state for collaboration
    setVisorState('camera');
  }, [setVisorState]);

  return (
    <div className="flex flex-col h-screen w-full bg-background text-on-surface overflow-hidden">
      {/* Top Bar */}
      <header className="w-full top-0 sticky bg-surface border-b border-outline-variant z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-16 flex justify-between items-center h-20">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              </span>
              <h1 className="font-headline-md text-2xl font-bold text-primary tracking-tight">SkillSwap</h1>
            </div>
            <div className="h-6 w-[1px] bg-outline-variant mx-2"></div>
            <div>
              <p className="font-label-sm text-[12px] font-semibold text-on-surface-variant uppercase tracking-widest">Live Session</p>
              <h2 className="font-body-md text-base font-semibold text-on-surface">Teaching: Python Fundamentals</h2>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2 mr-4">
              <div className="w-8 h-8 rounded-full border-2 border-surface bg-primary flex items-center justify-center ring-2 ring-primary-container ring-offset-0" title="Host: You">
                <span className="material-symbols-outlined text-on-primary text-sm">person</span>
              </div>
              <div className="w-8 h-8 rounded-full border-2 border-surface bg-secondary-container flex items-center justify-center" title="Student: Alex">
                <span className="material-symbols-outlined text-secondary text-sm">person</span>
              </div>
              <div className="w-8 h-8 rounded-full border-2 border-surface bg-surface-container-high flex items-center justify-center text-[10px] font-bold">
                +12
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface border border-outline-variant cursor-pointer outline-none">
              <span className="material-symbols-outlined text-[20px]">videocam</span>
              <span className="font-body-md text-base">Back to Video</span>
            </button>
            <button 
              onClick={onLeave}
              className="px-4 py-2 rounded-lg bg-primary-container text-on-primary font-bold hover:scale-105 active:scale-95 transition-transform cursor-pointer outline-none border-none"
            >
              End Session
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-grow relative overflow-hidden flex">
        {/* Toolbar (Floating Sidebar) */}
        <aside className="absolute left-6 top-1/2 -translate-y-1/2 z-40">
          <div className="bg-[#161B22]/80 backdrop-blur-xl p-2 rounded-2xl flex flex-col gap-2 shadow-2xl border border-white/10">
            {/* Selection & Drawing */}
            {['select', 'pencil', 'pen'].map(tool => (
              <button 
                key={tool}
                className={`p-3 rounded-xl transition-all outline-none border-none cursor-pointer ${activeTool === tool ? 'bg-[#00f0ff] text-[#00363a] shadow-[0_0_15px_rgba(0,240,255,0.4)]' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
                onClick={() => setActiveTool(tool)}
              >
                <span className="material-symbols-outlined">
                  {tool === 'select' ? 'near_me' : tool === 'pencil' ? 'edit' : 'stylus'}
                </span>
              </button>
            ))}
            
            <div className="h-[1px] bg-outline-variant mx-2 my-1"></div>
            
            {/* Shapes */}
            {['rectangle', 'circle', 'arrow'].map(tool => (
              <button 
                key={tool}
                className={`p-3 rounded-xl transition-all outline-none border-none cursor-pointer ${activeTool === tool ? 'bg-[#00f0ff] text-[#00363a] shadow-[0_0_15px_rgba(0,240,255,0.4)]' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
                onClick={() => setActiveTool(tool)}
              >
                <span className="material-symbols-outlined">
                  {tool === 'rectangle' ? 'rectangle' : tool === 'circle' ? 'circle' : 'trending_flat'}
                </span>
              </button>
            ))}

            <div className="h-[1px] bg-outline-variant mx-2 my-1"></div>
            
            {/* Utilities */}
            {['text', 'emoji', 'eraser'].map(tool => (
              <button 
                key={tool}
                className={`p-3 rounded-xl transition-all outline-none border-none cursor-pointer ${activeTool === tool ? 'bg-[#00f0ff] text-[#00363a] shadow-[0_0_15px_rgba(0,240,255,0.4)]' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
                onClick={() => setActiveTool(tool)}
              >
                <span className="material-symbols-outlined">
                  {tool === 'text' ? 'title' : tool === 'emoji' ? 'mood' : 'ink_eraser'}
                </span>
              </button>
            ))}
          </div>
        </aside>

        {/* Canvas Area */}
        <div className="flex-grow bg-surface-dim relative cursor-crosshair overflow-auto" style={{
          backgroundImage: 'radial-gradient(rgba(185, 202, 203, 0.1) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}>
          {/* Collaborative Cursors (Simulated) */}
          <div className="absolute left-1/4 top-1/3 flex flex-col items-start pointer-events-none group translate-x-12 translate-y-8 transition-transform duration-[2000ms]">
            <span className="material-symbols-outlined text-secondary transform -rotate-45" style={{ fontVariationSettings: "'FILL' 1" }}>near_me</span>
            <span className="bg-secondary text-on-secondary-fixed text-[12px] font-semibold px-2 py-0.5 rounded-full mt-1 ml-4">Alex is typing...</span>
          </div>

          {/* Content on Canvas */}
          <div className="p-20 flex flex-col gap-12 max-w-4xl mx-auto">
            <div className="bg-[#161B22]/80 backdrop-blur-xl p-8 rounded-xl border border-dashed border-primary/30">
              <h3 className="text-2xl font-bold text-primary-container mb-4">Agenda: Lists vs Dictionaries</h3>
              <pre className="bg-surface-container-lowest p-6 rounded-lg text-[12px] font-semibold text-primary overflow-x-auto border border-outline-variant/30 text-left">
{`# Dictionary Example
user_skills = {
    "name": "Jordan",
    "role": "Lead Mentor",
    "primary": "Python"
}

# List Example
skills_list = ["Python", "JS", "Design"]`}
              </pre>
            </div>
            <div className="relative text-left">
              {/* Hand-drawn arrow simulation */}
              <svg className="absolute -left-12 top-0 w-32 h-32 text-secondary opacity-80" viewBox="0 0 100 100">
                <path d="M10,10 Q50,0 90,90" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="3"></path>
                <path d="M80,85 L90,90 L85,80" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="3"></path>
              </svg>
              <div className="bg-surface-container p-4 rounded-lg inline-block shadow-lg border border-secondary/20">
                <p className="text-base italic text-on-surface-variant">"Key-Value pairs are the core of dictionaries."</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions Bar (Floating) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-6 px-6 py-3 bg-[#161B22]/80 backdrop-blur-xl rounded-full shadow-2xl border border-white/10">
          {/* Undo/Redo Group */}
          <div className="flex items-center gap-1">
            <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors group cursor-pointer border-none outline-none bg-transparent" title="Undo">
              <span className="material-symbols-outlined group-active:scale-90 transition-transform text-on-surface">undo</span>
            </button>
            <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors group cursor-pointer border-none outline-none bg-transparent" title="Redo">
              <span className="material-symbols-outlined group-active:scale-90 transition-transform text-on-surface">redo</span>
            </button>
          </div>
          <div className="h-8 w-[1px] bg-outline-variant"></div>
          
          {/* Color Palette */}
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-full bg-primary-container ring-2 ring-offset-2 ring-offset-surface ring-primary-container cursor-pointer outline-none border-none"></button>
            <button className="w-8 h-8 rounded-full bg-secondary hover:scale-110 transition-transform cursor-pointer outline-none border-none"></button>
            <button className="w-8 h-8 rounded-full bg-error hover:scale-110 transition-transform cursor-pointer outline-none border-none"></button>
            <button className="w-8 h-8 rounded-full bg-tertiary-container hover:scale-110 transition-transform cursor-pointer outline-none border-none"></button>
            <div className="h-8 w-8 rounded-full bg-surface-container-high flex items-center justify-center cursor-pointer hover:bg-outline-variant transition-colors">
              <span className="material-symbols-outlined text-sm text-on-surface">colorize</span>
            </div>
          </div>
          
          <div className="h-8 w-[1px] bg-outline-variant"></div>
          
          {/* Zoom & View */}
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors cursor-pointer border-none outline-none bg-transparent">
              <span className="material-symbols-outlined text-on-surface">remove_circle_outline</span>
            </button>
            <span className="text-[12px] font-semibold min-w-[40px] text-center text-on-surface">85%</span>
            <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors cursor-pointer border-none outline-none bg-transparent">
              <span className="material-symbols-outlined text-on-surface">add_circle_outline</span>
            </button>
          </div>
        </div>

        {/* Right Side: Mini Chat/Participants Toggle */}
        <aside className="absolute right-6 top-8 bottom-8 z-40 flex flex-col gap-4">
          <div className="bg-[#161B22]/80 backdrop-blur-xl p-2 rounded-2xl flex flex-col gap-4 shadow-xl border border-white/10">
            <button className="p-3 rounded-xl bg-surface-container-high text-primary transition-all cursor-pointer outline-none border-none">
              <span className="material-symbols-outlined">chat_bubble</span>
            </button>
            <button className="p-3 rounded-xl hover:bg-surface-container-high text-on-surface-variant transition-all cursor-pointer bg-transparent border-none outline-none">
              <span className="material-symbols-outlined">group</span>
            </button>
            <button className="p-3 rounded-xl hover:bg-surface-container-high text-on-surface-variant transition-all cursor-pointer bg-transparent border-none outline-none">
              <span className="material-symbols-outlined">settings</span>
            </button>
          </div>
          {/* Mini Map / Canvas Overview */}
          <div className="mt-auto bg-[#161B22]/80 backdrop-blur-xl w-32 h-24 rounded-xl overflow-hidden relative cursor-default border border-white/10">
            <div className="absolute inset-0 bg-surface-container-lowest opacity-50"></div>
            <div className="absolute top-1/4 left-1/4 w-12 h-8 border border-primary-container bg-primary-container/10"></div>
            <p className="absolute bottom-1 right-2 text-[10px] font-semibold text-on-surface-variant uppercase">Navigator</p>
          </div>
        </aside>
      </main>

      {/* Footer-like UI for Session Stats */}
      <div className="bg-surface-container-lowest py-2 px-4 md:px-16 flex justify-between items-center border-t border-outline-variant flex-shrink-0">
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-on-primary-container animate-pulse"></span>
            <span className="text-[12px] font-semibold text-on-surface-variant">Connection: Stable (24ms)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-on-surface-variant">timer</span>
            <span className="text-[12px] font-semibold text-on-surface-variant">00:42:15</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[12px] font-semibold text-on-surface-variant uppercase">Collaboration Active</span>
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[18px] text-secondary">cloud_done</span>
            <span className="text-[12px] font-semibold text-on-surface-variant">Auto-saved</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhiteboardRoom;
