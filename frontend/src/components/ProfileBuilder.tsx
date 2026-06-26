import React, { useState, useEffect } from 'react';

interface ProfileBuilderProps {
  onComplete: () => void;
  setVisorState: (state: 'eyes' | 'quote' | 'swap' | 'success' | 'camera') => void;
}

export const ProfileBuilder: React.FC<ProfileBuilderProps> = ({ onComplete, setVisorState }) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    name: '',
    college: '',
    bio: ''
  });

  useEffect(() => {
    setVisorState('eyes');
  }, [setVisorState]);

  const handleNextStep = (nextStepNum: number) => {
    setStep(nextStepNum);
    if (nextStepNum === 3) {
      // Simulate save
      setTimeout(() => {
        setVisorState('success');
        onComplete();
      }, 500);
    }
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 md:px-16 py-12 pt-24 text-on-surface">
      <div className="noise-overlay"></div>
      
      {/* Background radial gradient from the original */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,_rgba(0,219,233,0.15),_transparent_70%)] pointer-events-none z-[-1]" />

      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-surface-container-highest -translate-y-1/2 z-0"></div>
          <div 
            className="absolute top-1/2 left-0 h-[2px] bg-gradient-to-r from-primary to-secondary -translate-y-1/2 z-0 transition-all duration-500" 
            style={{ width: step === 1 ? '33.3%' : step === 2 ? '66.6%' : '100%' }}
          ></div>
          
          {/* Step 1 */}
          <div className="relative z-10 flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-primary text-on-primary neon-glow-cyan' : 'bg-surface-container-highest text-on-surface-variant border border-outline-variant'}`}>
              1
            </div>
            <span className={`mt-2 text-[12px] font-semibold tracking-wider uppercase ${step >= 1 ? 'text-primary' : 'text-on-surface-variant'}`}>Basics</span>
          </div>
          
          {/* Step 2 */}
          <div className="relative z-10 flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-primary text-on-primary neon-glow-cyan' : 'bg-surface-container-highest text-on-surface-variant border border-outline-variant'}`}>
              2
            </div>
            <span className={`mt-2 text-[12px] font-semibold tracking-wider uppercase ${step >= 2 ? 'text-primary' : 'text-on-surface-variant'}`}>Skills</span>
          </div>
          
          {/* Step 3 */}
          <div className="relative z-10 flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-primary text-on-primary neon-glow-cyan' : 'bg-surface-container-highest text-on-surface-variant border border-outline-variant'}`}>
              3
            </div>
            <span className={`mt-2 text-[12px] font-semibold tracking-wider uppercase ${step >= 3 ? 'text-primary' : 'text-on-surface-variant'}`}>Review</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Form Section */}
        <section className="lg:col-span-7 space-y-8">
          <div className="bg-[#161B22]/80 backdrop-blur-xl border border-white/10 p-8 rounded-xl shadow-lg">
            
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="border-l-4 border-primary pl-4">
                  <h1 className="font-headline-xl text-[32px] md:text-[40px] text-on-background font-bold leading-tight">Tell us about yourself</h1>
                  <p className="text-lg text-on-surface-variant mt-2">The Spark starts with your story. Let others know who you are.</p>
                </div>
                
                <div className="space-y-4 pt-4">
                  <div className="space-y-2 text-left">
                    <label className="text-[12px] font-semibold tracking-wider uppercase text-primary">Full Name</label>
                    <input 
                      className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-4 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition-all text-on-surface" 
                      placeholder="Alex Rivera" 
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2 text-left">
                    <label className="text-[12px] font-semibold tracking-wider uppercase text-primary">College / Institution</label>
                    <input 
                      className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-4 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition-all text-on-surface" 
                      placeholder="University of Innovation" 
                      type="text"
                      value={profile.college}
                      onChange={(e) => setProfile({...profile, college: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2 text-left">
                    <label className="text-[12px] font-semibold tracking-wider uppercase text-primary">Bio</label>
                    <textarea 
                      className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-4 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition-all text-on-surface" 
                      placeholder="Share your journey, interests, and what drives your curiosity..." 
                      rows={4}
                      value={profile.bio}
                      onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    ></textarea>
                  </div>
                </div>
                
                <div className="flex justify-end pt-6">
                  <button 
                    className="bg-primary text-on-primary px-8 py-3 rounded-lg font-bold hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(0,219,233,0.3)] cursor-pointer outline-none border-none" 
                    onClick={() => handleNextStep(2)}
                  >
                    Next: Add Skills <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="border-l-4 border-secondary pl-4">
                  <h1 className="font-headline-xl text-[32px] md:text-[40px] text-on-background font-bold leading-tight">Define your Spark</h1>
                  <p className="text-lg text-on-surface-variant mt-2">What can you teach? What do you want to master?</p>
                </div>
                
                <div className="space-y-8 pt-4 text-left">
                  {/* Skills I Can Teach */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-2xl font-bold text-secondary">Skills I Can Teach</h3>
                      <span className="text-[12px] font-semibold text-secondary-fixed-dim px-3 py-1 bg-secondary-container/20 rounded-full uppercase tracking-wider">Mentoring Mode</span>
                    </div>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
                      <input className="w-full bg-surface-container-low border border-outline-variant rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-1 focus:ring-secondary transition-all text-on-surface" placeholder="Search or type a skill..." type="text"/>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button className="px-4 py-2 rounded-full border border-secondary text-secondary text-[12px] font-semibold uppercase tracking-wider hover:bg-secondary/10 transition-all cursor-pointer bg-transparent">+ UI Design</button>
                      <button className="px-4 py-2 rounded-full border border-secondary text-secondary text-[12px] font-semibold uppercase tracking-wider hover:bg-secondary/10 transition-all cursor-pointer bg-transparent">+ Python</button>
                      <button className="px-4 py-2 rounded-full border border-secondary text-secondary text-[12px] font-semibold uppercase tracking-wider hover:bg-secondary/10 transition-all cursor-pointer bg-transparent">+ Public Speaking</button>
                      <button className="px-4 py-2 rounded-full border border-secondary text-secondary text-[12px] font-semibold uppercase tracking-wider hover:bg-secondary/10 transition-all cursor-pointer bg-transparent">+ Photography</button>
                    </div>
                    <div className="p-4 bg-surface-container-highest/30 rounded-lg space-y-3">
                      <div className="flex items-center justify-between bg-surface-container p-3 rounded-lg border border-outline-variant">
                        <span className="text-base text-on-surface">UI Design</span>
                        <select className="bg-surface-container-low border-none rounded text-[12px] font-semibold text-primary focus:ring-0 outline-none p-2 cursor-pointer">
                          <option>Beginner</option>
                          <option selected>Intermediate</option>
                          <option>Expert</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between bg-surface-container p-3 rounded-lg border border-outline-variant">
                        <span className="text-base text-on-surface">Python</span>
                        <select className="bg-surface-container-low border-none rounded text-[12px] font-semibold text-primary focus:ring-0 outline-none p-2 cursor-pointer">
                          <option>Beginner</option>
                          <option>Intermediate</option>
                          <option selected>Expert</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Skills I Want To Learn */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-2xl font-bold text-primary">Skills I Want to Learn</h3>
                      <span className="text-[12px] font-semibold text-primary-fixed-dim px-3 py-1 bg-primary-container/10 rounded-full uppercase tracking-wider">Learning Mode</span>
                    </div>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
                      <input className="w-full bg-surface-container-low border border-outline-variant rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary transition-all text-on-surface" placeholder="Search or type a skill..." type="text"/>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button className="px-4 py-2 rounded-full border border-primary text-primary text-[12px] font-semibold uppercase tracking-wider hover:bg-primary/10 transition-all cursor-pointer bg-transparent">+ React</button>
                      <button className="px-4 py-2 rounded-full border border-primary text-primary text-[12px] font-semibold uppercase tracking-wider hover:bg-primary/10 transition-all cursor-pointer bg-transparent">+ Spanish</button>
                      <button className="px-4 py-2 rounded-full border border-primary text-primary text-[12px] font-semibold uppercase tracking-wider hover:bg-primary/10 transition-all cursor-pointer bg-transparent">+ Data Science</button>
                      <button className="px-4 py-2 rounded-full border border-primary text-primary text-[12px] font-semibold uppercase tracking-wider hover:bg-primary/10 transition-all cursor-pointer bg-transparent">+ Guitar</button>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between pt-6">
                  <button 
                    className="text-on-surface-variant px-8 py-3 rounded-lg font-bold hover:text-primary transition-all flex items-center gap-2 cursor-pointer bg-transparent border-none outline-none" 
                    onClick={() => handleNextStep(1)}
                  >
                    <span className="material-symbols-outlined">arrow_back</span> Back
                  </button>
                  <button 
                    className="bg-primary text-on-primary px-8 py-3 rounded-lg font-bold hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(0,219,233,0.3)] cursor-pointer border-none outline-none" 
                    onClick={() => handleNextStep(3)}
                  >
                    Finish Profile <span className="material-symbols-outlined">check_circle</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Preview Card Section */}
        <aside className="lg:col-span-5 sticky top-32 text-left">
          <div className="space-y-4">
            <h3 className="text-[12px] font-semibold text-on-surface-variant uppercase tracking-widest text-center">Live Card Preview</h3>
            
            {/* Profile Card */}
            <div className="bg-[#161B22]/70 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden group transition-all hover:border-primary/50 shadow-lg">
              <div className="h-32 bg-gradient-to-r from-primary-container/20 to-secondary-container/20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-30"></div>
                <div className="absolute -bottom-10 left-8">
                  <div className="w-24 h-24 rounded-2xl border-4 border-surface overflow-hidden shadow-[0_0_15px_rgba(0,219,233,0.3)]">
                    <img className="w-full h-full object-cover" src={`https://api.dicebear.com/7.x/bottts/svg?seed=${profile.name || 'Alex'}`} alt="Avatar" />
                  </div>
                </div>
              </div>
              <div className="pt-14 pb-8 px-8 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-on-background">{profile.name || 'Alex Rivera'}</h2>
                  <p className="text-base text-primary font-medium">{profile.college || 'University of Innovation'}</p>
                </div>
                <p className="text-base text-on-surface-variant line-clamp-3">
                  {profile.bio || 'Aspiring creative developer passionate about bridging the gap between design and technology. I love helping others understand the foundations of UI design while I deep dive into complex data structures and Python algorithms.'}
                </p>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-[12px] font-semibold text-secondary uppercase tracking-tighter">Teaching</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant text-[12px] font-semibold text-on-surface">UI Design <span className="text-secondary ml-1">• Int</span></span>
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-[#111318] text-[12px] font-semibold">Python <span className="ml-1">• Exp</span></span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[12px] font-semibold text-primary uppercase tracking-tighter">Learning</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant text-[12px] font-semibold text-on-surface">React</span>
                      <span className="px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant text-[12px] font-semibold text-on-surface">Spanish</span>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-outline-variant flex justify-between items-center">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full border-2 border-surface bg-surface-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-xs text-on-surface-variant">person</span>
                    </div>
                    <div className="w-8 h-8 rounded-full border-2 border-surface bg-primary/20 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-primary">12+</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-on-surface-variant">
                    <span className="material-symbols-outlined text-sm">verified_user</span>
                    <span className="text-[12px] font-semibold text-on-surface">Ready to Swap</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 rounded-xl bg-surface-container-low border border-outline-variant border-dashed">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
                <p className="text-base text-on-surface-variant">
                  <strong className="text-secondary font-semibold">Tip:</strong> Profiles with expert-level skills receive <span className="text-primary font-bold">40% more</span> match requests.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ProfileBuilder;
