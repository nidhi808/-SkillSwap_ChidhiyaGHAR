import React from 'react';

interface MyMatchesProps {
  setVisorState: (state: 'eyes' | 'quote' | 'swap' | 'success' | 'camera') => void;
  onRequestSwap?: (peerId: string) => void;
}

export const MyMatches: React.FC<MyMatchesProps> = ({ setVisorState }) => {
  void setVisorState;
  return (
    <div className="flex-grow flex flex-col md:flex-row max-w-7xl mx-auto w-full px-4 md:px-16 py-8 gap-6 overflow-hidden">
      {/* Sidebar: Chat Requests */}
      <aside className="w-full md:w-80 flex flex-col gap-6 h-full">
        <div className="flex items-center justify-between">
          <h2 className="font-headline-md text-headline-md font-bold text-on-surface">Requests</h2>
          <span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full text-label-sm">3 New</span>
        </div>
        <div className="flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
          {/* Request Item 1 */}
          <div className="glass-card p-4 rounded-xl flex items-center gap-4 cursor-pointer hover:bg-surface-container-high transition-all bg-[#161B22]/80 border border-outline-variant/60 hover:border-primary/40 shadow-sm">
            <div className="relative">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#e9b3ff]">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDy41kjio3Gyyx22Sy2eIwtqciB86_BAxv7fr0FA1zhTB330rsyFNyB5tetazK5-EpPbRGI7NuIJ6LJ_MgVKLk9yLP1uBX1b8DdVmIDR4rNKzQpdicxBdMAFxqeq8LqF5XCPD2hJ4dH5c6shKJ8erkk-UDmKpLmZOmH_ZKoAmMhpVdVww1_aS8-75CORUfH4bWt7w_xPJVJQY9QBTfrzXYd-KxHPZ5BvOaHUBWOQfM0pe904H_MWSCAsF4HYyo6qgr3fZcRk6oGZY" alt="Elena Vance"/>
              </div>
            </div>
            <div className="flex-grow overflow-hidden">
              <p className="font-body-md font-semibold text-on-surface truncate">Elena Vance</p>
              <p className="text-label-sm text-on-surface-variant truncate">Wants to learn React</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
          </div>
          {/* Request Item 2 */}
          <div className="glass-card p-4 rounded-xl flex items-center gap-4 cursor-pointer hover:bg-surface-container-high transition-all bg-[#161B22]/80 border border-outline-variant/60 hover:border-primary/40 shadow-sm">
            <div className="relative">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1BmkFQGbYno-tzgy9wKtnOH9QFIrjf02eqtGFr_pz_mfCZ0r1qCLSlDcgJdcqyRxfzW0hA7Ev37Rb3gG4KNDPtG4tHUcUZ6Uh-5wv3hRu_6nQq_KrlZXxSZP0dUrL3ydpuT9ff77A74sqlVrbyY1iBDgxl_tso8JJpp8NvDuEoPG95evBmgXXbmyeV_qLuN36L5fKzwWsh1BvUKQJ1tR-PoYEwD0u6vZH8Lpgcypchxx_g65MvNhANp-L96Qu2Xze1QZkn_QTt2g" alt="Marcus Chen"/>
              </div>
            </div>
            <div className="flex-grow overflow-hidden">
              <p className="font-body-md font-semibold text-on-surface truncate">Marcus Chen</p>
              <p className="text-label-sm text-on-surface-variant truncate">Offers Python help</p>
            </div>
          </div>
          {/* Request Item 3 */}
          <div className="glass-card p-4 rounded-xl flex items-center gap-4 cursor-pointer hover:bg-surface-container-high transition-all bg-[#161B22]/80 border border-outline-variant/60 hover:border-primary/40 shadow-sm">
            <div className="relative">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#e9b3ff]">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLnAIA7AqW-l3UH_fiBynYiBZPOQxRDPJyKcDaMByAP5g320c1Vi8ZDabE6H-nD6--RfIUEGCfbQEq5NOgnZ7UnSKHw3t95rm_9dJVaN8aQLPQBZOD3ruqnVKz8E7PcD3YIiDAjn5OmnkzM_TspQ5qUVSfAKF28bbtSdhDBmJ5qnu6VoZ4jxIu_2Xjp1B0TnNkpsj_0X3dmtU8RYtKeXViPP73YMtqEL_ZE3HahNxk7wQhkM5dq59-87qKjv-k-pX9vj83Yy7zjCI" alt="Sasha Grey"/>
              </div>
            </div>
            <div className="flex-grow overflow-hidden">
              <p className="font-body-md font-semibold text-on-surface truncate">Sasha Grey</p>
              <p className="text-label-sm text-on-surface-variant truncate">Portfolio Review</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
          </div>
        </div>
        {/* Ad/Pro Tip Section */}
        <div className="mt-auto p-6 rounded-2xl bg-gradient-to-br from-primary-fixed-variant to-secondary-container text-on-primary-fixed">
          <span className="material-symbols-outlined text-4xl mb-2">auto_awesome</span>
          <p className="font-headline-md font-bold text-lg mb-2">Level Up Fast!</p>
          <p className="text-label-sm opacity-90 leading-relaxed mb-4">Complete your Profile Strengths to unlock 3x more relevant matches.</p>
          <button className="w-full py-2 bg-on-primary text-primary-container rounded-lg font-bold text-label-sm hover:opacity-90 transition-opacity border-none cursor-pointer">Improve Profile</button>
        </div>
      </aside>

      {/* Center Canvas: Selected Match Profile */}
      <section className="flex-grow flex flex-col gap-6">
        {/* Header/Matches Horizontal Scroll */}
        <div className="flex flex-col gap-4">
          <h1 className="font-headline-xl text-headline-xl text-primary font-bold">Your Top Matches</h1>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {/* Match Card 1 (Active) */}
            <div className="min-w-[240px] glass-card p-5 rounded-2xl border-primary bg-surface-container-high scale-[1.02] border-2 shadow-[0_0_20px_rgba(0,219,233,0.15)] relative">
              <div className="absolute top-4 right-4 bg-primary text-on-primary px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">98% Match</div>
              <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-primary">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAt7jTTsPH5V1g8-1FGgjMdV0Ev9uUmlJ6DcQNrNVLtXG7-dQS4j2gMUkv9Z7Uy0hh1BI0sjqJ-8u-Kz8OZIrYFI-3T85Y91zfU6lCePSMR3F0PQVLm1kbh4tmYoOuPetP9RZPkGoa_rZ0YgYoAhgAO2OQNcHAA7axcZvj9Wr_FtB7fdo9PSbXw6_dajMjTCXTlmpKBTTadoVQCRqQogwVpKTDBX4qTgvjc9EoyrSCJs2W3w2ee7dhxOOEPLfnjJzFxLcYVvDlfDSY" alt="Dr. Julian Reed"/>
              </div>
              <p className="font-headline-md text-lg text-on-surface font-bold">Dr. Julian Reed</p>
              <p className="text-label-sm text-primary mb-3">AI & Python Expert</p>
              <div className="flex gap-1">
                <span className="w-full h-1 bg-primary rounded-full"></span>
                <span className="w-full h-1 bg-primary rounded-full"></span>
                <span className="w-full h-1 bg-primary rounded-full opacity-30"></span>
              </div>
            </div>
            {/* Match Card 2 */}
            <div className="min-w-[240px] glass-card p-5 rounded-2xl flex flex-col opacity-60 hover:opacity-100 cursor-pointer bg-[#161B22]/80 border border-outline-variant/60 transition-all">
              <div className="absolute top-4 right-4 bg-surface-container-highest text-on-surface-variant px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">92% Match</div>
              <div className="w-16 h-16 rounded-full overflow-hidden mb-4 grayscale">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-QEXYVDnXzlo8TFftNX2j4UnzXKkXYiTCH_tRjpkGOVcL3NAg1_PriXT6EqShQ-0AjzyD6-EwSK8bkkUHG5ittQ-SpSqsemLaF1czqkaUeLrJ0rF4aZWuF9qpceds82PP8XU2qtB3E2i-l4pgc_33ooqmBrPhirTUYUSX4sSM35oJoHzveGoeVRWIMqv9oAle81jUlzD7n7Z6m_IlFw96UEuMw3QdcB4eL7DYmRb021c_9nhLuXGQGwjnG3PWVtI2TFlTVarBg3Y" alt="Lena Soren"/>
              </div>
              <p className="font-headline-md text-lg text-on-surface font-bold">Lena Soren</p>
              <p className="text-label-sm text-on-surface-variant mb-3">UI/UX Strategy</p>
              <div className="flex gap-1">
                <span className="w-full h-1 bg-outline-variant rounded-full"></span>
                <span className="w-full h-1 bg-outline-variant rounded-full"></span>
                <span className="w-full h-1 bg-outline-variant rounded-full"></span>
              </div>
            </div>
            {/* Match Card 3 */}
            <div className="min-w-[240px] glass-card p-5 rounded-2xl flex flex-col opacity-60 hover:opacity-100 cursor-pointer bg-[#161B22]/80 border border-outline-variant/60 transition-all">
              <div className="absolute top-4 right-4 bg-surface-container-highest text-on-surface-variant px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">85% Match</div>
              <div className="w-16 h-16 rounded-full overflow-hidden mb-4 grayscale">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnVj_fUEk7PRwuMS3-48KND4M8lgYLNh9LqlPoh4x84NCgZ3XqN7KShoTani93ojzwVqFPBzFZbVqgBi4LD3ryJsFFbSJoKtXzKxlbgEdHLJ0i60ivVyL4LAyUcAjBVeJmO_jazfnTsx5adsQhuLZogv8eat_AWbUJmB90o2SHKbuuXAGltJeFL2-kQH2WrRM33zuuH5dxo57qITVawOerA8PIJYsWhymtm8UPVy5JpS75U_hcdyrxTrQs3fQfbj8r8cW6ESdmubI" alt="Kai Yamamoto"/>
              </div>
              <p className="font-headline-md text-lg text-on-surface font-bold">Kai Yamamoto</p>
              <p className="text-label-sm text-on-surface-variant mb-3">Backend Systems</p>
              <div className="flex gap-1">
                <span className="w-full h-1 bg-outline-variant rounded-full"></span>
                <span className="w-full h-1 bg-outline-variant rounded-full"></span>
                <span className="w-full h-1 bg-outline-variant rounded-full"></span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Profile Detail Canvas */}
        <div className="flex-grow glass-card rounded-3xl p-8 relative overflow-hidden bg-[#161B22]/80 border border-outline-variant/50">
          {/* Background Atmospheric Glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 blur-[100px] rounded-full"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row gap-12">
            {/* Left: Profile Info */}
            <div className="flex flex-col gap-8 lg:w-1/3">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <h3 className="font-headline-xl text-3xl text-on-surface font-bold">Dr. Julian Reed</h3>
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                </div>
                <p className="font-body-lg text-on-surface-variant leading-relaxed text-sm">
                  Lead AI Engineer at Spark Labs. Passionate about teaching complex Python architectures to the next generation of innovators.
                </p>
              </div>
              
              <div className="flex flex-col gap-4">
                <p className="font-label-sm text-primary tracking-widest uppercase text-[10px] font-bold">Badges Earned</p>
                <div className="flex flex-wrap gap-3">
                  <div className="rounded-full p-[1px] bg-gradient-to-r from-primary via-secondary to-primary" style={{ animation: 'rotate 4s linear infinite' }}>
                    <div className="bg-[#161B22] rounded-full px-4 py-1.5 flex items-center gap-2">
                      <span className="material-symbols-outlined text-lg text-primary">terminal</span>
                      <span className="text-label-sm text-on-surface text-xs font-semibold">Verified Python Mentor</span>
                    </div>
                  </div>
                  <div className="bg-surface-container-highest rounded-full px-4 py-1.5 flex items-center gap-2 border border-outline-variant">
                    <span className="material-symbols-outlined text-lg text-secondary">psychology</span>
                    <span className="text-label-sm text-on-surface text-xs font-semibold">Quick Responder</span>
                  </div>
                  <div className="bg-surface-container-highest rounded-full px-4 py-1.5 flex items-center gap-2 border border-outline-variant">
                    <span className="material-symbols-outlined text-lg text-tertiary-fixed-dim">military_tech</span>
                    <span className="text-label-sm text-on-surface text-xs font-semibold">50+ Sessions</span>
                  </div>
                </div>
              </div>
              
              <button className="mt-4 py-4 bg-primary text-on-primary rounded-xl font-bold font-headline-md text-center hover:shadow-[0_0_20px_rgba(0,219,233,0.4)] transition-all flex items-center justify-center gap-3 active:scale-[0.98] cursor-pointer outline-none border-none text-sm">
                <span className="material-symbols-outlined">calendar_today</span>
                Schedule Session
              </button>
            </div>
            
            {/* Right: History & Stats */}
            <div className="flex-grow flex flex-col gap-10">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant">
                  <p className="text-label-sm text-on-surface-variant mb-1 text-xs">Students Taught</p>
                  <p className="text-headline-md font-bold text-primary text-2xl">124</p>
                </div>
                <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant">
                  <p className="text-label-sm text-on-surface-variant mb-1 text-xs">Avg. Rating</p>
                  <p className="text-headline-md font-bold text-secondary text-2xl">4.9/5.0</p>
                </div>
                <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant">
                  <p className="text-label-sm text-on-surface-variant mb-1 text-xs">Response Time</p>
                  <p className="text-headline-md font-bold text-on-surface text-2xl">~2 hrs</p>
                </div>
              </div>
              
              {/* Teaching History */}
              <div className="flex flex-col gap-6">
                <h4 className="font-headline-md text-xl text-on-surface flex items-center gap-2 font-bold">
                  <span className="material-symbols-outlined text-primary">history</span>
                  Teaching History
                </h4>
                <div className="space-y-4">
                  {/* History Entry 1 */}
                  <div className="flex gap-4 items-start p-4 rounded-xl hover:bg-white/5 transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <span className="material-symbols-outlined">code</span>
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-center mb-1">
                        <p className="font-body-md font-bold text-on-surface">Data Structures in Python</p>
                        <span className="text-label-sm text-on-surface-variant text-xs">2 days ago</span>
                      </div>
                      <p className="text-body-md text-on-surface-variant leading-relaxed text-sm">Assisted a junior developer in optimizing Big O complexity for a search algorithm implementation. "Julian was incredibly clear!" - *M. Rossi*</p>
                    </div>
                  </div>
                  {/* History Entry 2 */}
                  <div className="flex gap-4 items-start p-4 rounded-xl hover:bg-white/5 transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                      <span className="material-symbols-outlined">robot</span>
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-center mb-1">
                        <p className="font-body-md font-bold text-on-surface">Intro to TensorFlow</p>
                        <span className="text-label-sm text-on-surface-variant text-xs">1 week ago</span>
                      </div>
                      <p className="text-body-md text-on-surface-variant leading-relaxed text-sm">Built a simple image classification model. Focused on tensor manipulation and layer definitions.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Spectrum of Learning Indicator */}
              <div className="mt-auto p-4 border border-outline-variant rounded-2xl">
                <div className="flex justify-between text-label-sm mb-2 px-1 text-[10px] font-bold uppercase tracking-wider">
                  <span className="text-primary">Foundational</span>
                  <span className="text-secondary">Expert Mastery</span>
                </div>
                <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full w-[88%] bg-gradient-to-r from-primary via-secondary to-secondary-fixed shadow-[0_0_10px_rgba(0,219,233,0.5)]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyMatches;
