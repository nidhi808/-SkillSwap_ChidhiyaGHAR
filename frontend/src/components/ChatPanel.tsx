import React, { useState, useEffect, useRef } from 'react';

interface ChatPanelProps {
  onClose?: () => void;
  setVisorState: (state: 'eyes' | 'quote' | 'swap' | 'success' | 'camera') => void;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({ onClose, setVisorState }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey! I've been reviewing the new bento grid design for the landing page. It looks sharp! 🚀", sender: 'Elena Vance', time: '12:30 PM', isMe: false },
    { id: 2, text: "Thanks Elena! I was trying to balance the Cyber-Minimalist vibe with clean functionality. Did the neon accents feel too much?", sender: 'You', time: '12:35 PM', isMe: true },
    { id: 3, text: "Not at all! Check out how it looks on mobile. The 'Spark' vs 'Lab' transition is seamless. Great job on the tonal layering.", sender: 'Elena Vance', time: '12:40 PM', isMe: false, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOeW3CVGe4Fuxd-JAFfXKTO-DqiGjjaVpgb8SGmR2fjAdAZTNf9bwFfQJUGiZAr7d0VNq6cxFo7FagHGaNF9X1TIXDryvVOfN6kAc4ykl02-cDXEKgg3dGQjWAFXsWxMW4goxNcq1tAebmsl24DgnfDXJsL0IhbD44agU7Le2eJiB_MMq85LnoSizAGRoDIQGYdzqZllhVdr9kdmaA7jpOWNmTj8-Tm8JnE-alm4Vo5qQQfmXMHCchZjhfb5lapoN3xSHMXyetuEY" },
    { id: 4, text: "That layout looks incredible! Let's discuss the collaboration indicators next session. Maybe we can use the JetBrains Mono for those status chips?", sender: 'You', time: '12:45 PM', isMe: true },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisorState('eyes');
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, setVisorState]);

  const handleSend = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, {
        id: Date.now(),
        text: inputMessage,
        sender: 'You',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: true
      }]);
      setInputMessage('');
    }
  };

  return (
    <div className="flex flex-1 overflow-hidden h-[calc(100vh-64px)] w-full max-w-7xl mx-auto pt-16">
      {/* Sidebar: Active Chats/Matches */}
      <aside className="w-full md:w-80 lg:w-96 border-r border-outline-variant flex flex-col bg-surface-container-lowest h-full">
        <div className="p-6 border-b border-outline-variant">
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-headline-md text-2xl font-bold text-on-surface">Matches</h1>
            <button className="text-primary-container hover:bg-primary-container/10 p-2 rounded-full transition-all active:scale-95 cursor-pointer outline-none border-none bg-transparent">
              <span className="material-symbols-outlined">edit_square</span>
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
            <div className="flex-shrink-0 flex flex-col items-center gap-1 group cursor-pointer">
              <div className="w-14 h-14 rounded-full p-0.5 border-2 border-primary-container">
                <img className="w-full h-full rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqHgIkuwhJ065h9Gul-yYKRkESESEbKV8AZ2rolrJF2EZQIkWpnSzCl4dvqLh4SAcNKKa9FrwNdTxSt7ETmpFy7HAzV7PyzmOhD4tavxeVC0pAn1Abs7Ze0Iq8Ewx9z3DzyFC8TUSeihgtlKgoVsFJe1qz-wJAcshi0MJlFoHwi5WzvYuHX1khCH4aDxJRB3RXr8V1rQY5no45MhEeOabZxtn_Rr_KKhfzjsPDDhQ0D8fqswtTe1TLHPrgzxu7zcB7Lw0GwPSQ_p4" alt="You" />
              </div>
              <span className="text-[12px] font-semibold text-on-surface-variant group-hover:text-primary transition-colors">You</span>
            </div>
            {/* Story-style Match Indicators */}
            <div className="flex-shrink-0 flex flex-col items-center gap-1 group cursor-pointer">
              <div className="w-14 h-14 rounded-full p-0.5 border-2 border-secondary-container">
                <img className="w-full h-full rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUFDAW5ubiNRLdQvzu2LoJl06yLXysxDkYoLva8f95QKDPVz3noHsy41FaaeXJCkM6k7a3AbZIIcjcjrIl_dQcQQCfz-etcRkWiO_ZAjWsfsHBWJ_cN8rENpbxfMersCAYOA7iATbt4OIGlS_7sC7KBbKFxH4nrQN4_l6BA8HsHFx8Uf0byg8psju9FGjp8PsDZlcHLu_0q2va_a2qmGUJQ89bZu39pjl9KanL4xf1ZCAx70_HEBW3AmXCqaY8iPE_jntOPMuMr-4" alt="Dr. Aris" />
              </div>
              <span className="text-[12px] font-semibold text-on-surface-variant group-hover:text-primary transition-colors">Dr. Aris</span>
            </div>
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {/* Active Chat */}
          <div className="p-4 flex items-center gap-4 bg-surface-container-high border-l-4 border-primary-container cursor-pointer transition-all">
            <div className="relative">
              <div className="w-14 h-14 rounded-full overflow-hidden">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDYz4K_U_WjnqhUFUQifrOrIe0goabphDJ5l3iMrcRANfP8bBFcvgnDRuHkc4UGcnQAwCMvY_w0Np9NTdGH8dak33yBVgQ-P_vXlt4Nsiwk6lCrL3Mjz8HY0UtkzKh_ydS17kApFcVke-8T8rSqDq01h41_xOeOWAPlP8mAsqmb8BWnyyesO2yKX4wg5JxSaXZ-DiaylGK8X6nCAKES-s7TxwjQkL9Ab0cuiaMMvVJMSadFK2SkGBQ0s-qpI3WxKsII_DQGCBPXls" alt="Elena Vance" />
              </div>
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-primary-container rounded-full border-2 border-surface-container-high"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-on-surface truncate">Elena Vance</span>
                <span className="text-[12px] font-semibold text-primary-container">12:45 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-on-surface-variant truncate">That layout looks incredible! Let's...</p>
                <span className="bg-primary-container text-on-primary-container text-[10px] font-bold px-1.5 py-0.5 rounded-full">2</span>
              </div>
            </div>
          </div>

          {/* Chat Item 2 */}
          <div className="p-4 flex items-center gap-4 hover:bg-surface-container transition-all cursor-pointer border-b border-outline-variant/30">
            <div className="relative">
              <div className="w-14 h-14 rounded-full overflow-hidden opacity-80">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuArJ1QvAHid4MwTSHsyMc6qVts5OcgrjcdBLjUs4VoiDdUhdQRL0d5CHAEIxXucr59wZ8sGUrFho57eLdhlkEpKqbJZS6ngbex4WPeN6heGNz_yl78uBFxf5cwYAIIHpRhjaLSP0g-CU5ndA4T8utZ7T0trx4bAu3UVFQitRPrQB2qfM0IzbA_zeANVGcenxLUFUfGI14smHKDdWR59CS1JnBfWanT5hhN18a4gY5mWsoNSMiuJdk4S-mvTk3UOZQWiYZUExXuIUXw" alt="Marcus Chen" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-on-surface truncate">Marcus Chen</span>
                <span className="text-[12px] font-semibold text-outline">Yesterday</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>done_all</span>
                <p className="text-sm text-outline truncate">Thanks for the Python tips!</p>
              </div>
            </div>
          </div>

          {/* Chat Item 3 */}
          <div className="p-4 flex items-center gap-4 hover:bg-surface-container transition-all cursor-pointer border-b border-outline-variant/30">
            <div className="relative">
              <div className="w-14 h-14 rounded-full overflow-hidden opacity-80">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5JecUR-ExYCKpuxvegJqzOMcEur5fDqEIWX1-6ZImG4x8t7rkE3919TP0Ssrbc7ZoNlxrGAKRzw_P8paHTMbzUb9Novgo2bRHpwVK9zKCIBzceCpvY2Xt3Kj7RwxCt-R9PwdrZivHubpY4Jdh6mt5CAQuvhHXqb19FU8o7MMVb2_9anBoHbqLAuZjeH4qmRnVIyHOFe-Mug8WGpymV1JlvaVBQcIkjLIcRYNuyA3ONL_C98YsXdBGk5UYOqmUpjG8y-5IOlN0OhA" alt="Sarah Jenkins" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-on-surface truncate">Sarah Jenkins</span>
                <span className="text-[12px] font-semibold text-outline">Tue</span>
              </div>
              <div className="flex items-center gap-1">
                <p className="text-sm text-outline truncate">Are we still on for our Figma session?</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Message Window */}
      <section className="flex-1 flex flex-col relative h-full">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(0,240,255,0.05),_transparent),radial-gradient(circle_at_bottom_left,_rgba(125,1,177,0.05),_transparent)] pointer-events-none" />
        
        {/* Chat Header */}
        <header className="h-20 px-6 border-b border-outline-variant bg-surface/80 backdrop-blur-md flex items-center justify-between z-10 flex-shrink-0">
          <div className="flex items-center gap-4">
            {onClose && (
              <button onClick={onClose} className="md:hidden text-on-surface mr-2 bg-transparent border-none cursor-pointer">
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
            )}
            <div className="relative">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-outline-variant">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDp8PpxEj1ZY8EBSdK1dcT7JiKxdXZqOZK8F1hi_xY6kY6HSdFR4kjPNhz9GU2JP4GX5T2UVAXr51zaO3CZqCW8oVs3A6urnIW7W8WAQc1mc3IMsTr78MT_PVj6DzW0mMFLEdNdq9wCjOYezQjWtcXQiMfDl-yhQLcfdQWjwLF7MKb0uJuQIXOI5J0tINwtYjthYRtZMrXfbM07BHdPD_ieHSB0rOdZs15ZAE8mGwBO5TBTZn3sNEWfoykX1vUhy-pBEMrhdZaiGHg" alt="Elena Vance" />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-primary-container rounded-full border-2 border-surface"></div>
            </div>
            <div>
              <h2 className="font-bold text-on-surface">Elena Vance</h2>
              <span className="text-[12px] font-semibold text-primary-container">Active now</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container transition-all cursor-pointer bg-transparent border-none">
              <span className="material-symbols-outlined">videocam</span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container transition-all cursor-pointer bg-transparent border-none">
              <span className="material-symbols-outlined">call</span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container transition-all cursor-pointer bg-transparent border-none">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 custom-scrollbar text-left z-10">
          <div className="flex justify-center">
            <span className="bg-surface-container text-[12px] font-semibold text-outline px-4 py-1 rounded-full border border-outline-variant/30">Today</span>
          </div>

          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isMe ? 'flex-col items-end ml-auto' : 'items-end gap-3'} max-w-[80%]`}>
              {!msg.isMe && (
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVzQDnsX2g5IirNO5nVg_Rwqkj8CMpmT1bXXaQrJsjsQfSVi9r3IPcdPYKoDCvVacKUbfU5ALRMU6eRZRjniqVK0gMx03y4WWHaJlyVoZu2VnGcGI11AS7L4BG2ltIbE9B2Z74n-l8J7RZd5mRdr5cDqqfOmsrqd7bCwNUfMcEYsUQncWNTzohZbeOgwSKTWRmeYfG3E0fT-tF_wuZ-ikhYXwOmznWIWymIwVW4a2_LmtDhqPLEQePzZ2JFOfgV3NQ3nzYX9_M2sE" alt="Elena Vance" />
                </div>
              )}
              
              <div className={`flex flex-col gap-1 ${!msg.isMe ? 'w-full' : ''}`}>
                {msg.isMe ? (
                  <div className="text-on-primary p-4 rounded-2xl rounded-br-none shadow-lg shadow-primary-container/15 bg-gradient-to-br from-[#006970] to-[#004f54]">
                    <p className="text-base">{msg.text}</p>
                  </div>
                ) : (
                  <div className={`bg-surface-container-high text-on-surface p-4 rounded-2xl rounded-bl-none border border-outline-variant/20 shadow-sm ${msg.image ? 'p-2 overflow-hidden' : ''}`}>
                    {msg.image && (
                      <div className="rounded-xl overflow-hidden mb-2">
                        <img className="w-full h-48 object-cover" src={msg.image} alt="Attachment" />
                      </div>
                    )}
                    <div className={msg.image ? 'px-2 pb-2' : ''}>
                      <p className="text-base">{msg.text}</p>
                    </div>
                  </div>
                )}
                
                <div className={`flex items-center gap-1 ${msg.isMe ? 'mr-1' : 'ml-1'}`}>
                  <span className="text-[12px] font-semibold text-outline">{msg.time}</span>
                  {msg.isMe && (
                    <span className="material-symbols-outlined text-[16px] text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>done_all</span>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Bottom Input Bar */}
        <footer className="p-6 bg-surface/80 backdrop-blur-md border-t border-outline-variant flex-shrink-0 z-10">
          <div className="flex items-end gap-4 max-w-4xl mx-auto">
            <div className="flex items-center gap-2 pb-1">
              <button className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container transition-all active:scale-90 cursor-pointer bg-transparent border-none">
                <span className="material-symbols-outlined">add_circle</span>
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container transition-all active:scale-90 cursor-pointer bg-transparent border-none">
                <span className="material-symbols-outlined">mood</span>
              </button>
            </div>
            <div className="flex-1 bg-surface-container rounded-2xl border border-outline-variant px-4 py-3 flex items-center focus-within:ring-1 focus-within:ring-primary-container focus-within:shadow-[0_0_15px_rgba(0,240,255,0.15)] transition-all">
              <textarea 
                className="flex-1 bg-transparent border-none focus:ring-0 text-base text-on-surface placeholder:text-outline resize-none max-h-32 outline-none" 
                placeholder="Type a message..." 
                rows={1}
                value={inputMessage}
                onChange={(e) => {
                  setInputMessage(e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              ></textarea>
              <button className="text-on-surface-variant hover:text-primary-container transition-colors cursor-pointer bg-transparent border-none outline-none">
                <span className="material-symbols-outlined">attach_file</span>
              </button>
            </div>
            <button 
              onClick={handleSend}
              className="w-12 h-12 bg-primary-container text-on-primary rounded-full flex items-center justify-center shadow-lg hover:shadow-primary-container/20 transition-all active:scale-95 group cursor-pointer border-none outline-none"
            >
              <span className="material-symbols-outlined group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">send</span>
            </button>
          </div>
        </footer>
      </section>
    </div>
  );
};

export default ChatPanel;
