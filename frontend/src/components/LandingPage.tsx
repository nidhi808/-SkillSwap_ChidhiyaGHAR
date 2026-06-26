import React, { useEffect } from 'react';

interface LandingPageProps {
  scrollProgress: number;
  onNavigate: (view: 'auth' | 'leaderboard' | 'skills' | 'sessions' | 'dashboard') => void;
  setVisorState: (state: 'eyes' | 'quote' | 'swap' | 'success' | 'camera') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  setVisorState,
}) => {
  useEffect(() => {
    setVisorState('eyes');
  }, [setVisorState]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => {
      el.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-10');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full">
      <div className="noise-overlay"></div>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px]"></div>
        </div>
        <div className="max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-2 gap-gutter relative z-10 w-full">
          <div className="flex flex-col justify-center space-y-8">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-surface-container border border-outline-variant w-fit">
              <span className="font-label-sm text-label-sm text-primary tracking-widest uppercase">The Spark Experience</span>
            </div>
            <h1 className="font-display-lg text-display-lg text-primary leading-none">
              Master any skill.<br />
              <span className="skill-gradient-text">Pay with knowledge.</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
              The peer-to-peer exchange where you trade what you know for what you want to learn. No fees, just growth. Join a global lab of innovators.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => onNavigate('auth')}
                className="px-8 py-4 bg-primary text-on-primary font-bold rounded-lg shadow-[0_0_20px_rgba(0,219,233,0.3)] hover:scale-105 active:scale-95 transition-all outline-none border-none cursor-pointer"
              >
                Get Started
              </button>
              <button
                onClick={() => onNavigate('leaderboard')}
                className="px-8 py-4 rainbow-border text-primary font-bold rounded-lg hover:scale-105 active:scale-95 transition-all outline-none bg-transparent cursor-pointer"
              >
                View Leaderboard
              </button>
            </div>
          </div>
          <div className="relative flex justify-center items-center">
            <div className="relative w-full max-w-lg aspect-square robot-container group/robot">
              {/* Pulse Glow Background */}
              <div className="robot-aura"></div>
              {/* Shimmer Effect Layer (Scoped to band area) */}
              <div className="shimmer-layer"></div>
              <img
                alt="SkillSwap Mascot"
                className="w-full h-full object-contain drop-shadow-[0_0_50px_rgba(0,219,233,0.2)] robot-hover-tilt relative z-10"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmUsx9o_KQYRfP47-YMK5CAFNwgukoEFVgWGp_pMRV_8D-AhnE2lE4ZK4jtgT-BCnTqREw5yPY9X7dpaj4jMS9r-oEAursXfA2QEujJVKUI66H6-K9pYzZHzq_UmBir8LY9J7eM72tGFdMshYHJVI6smKh9bN0JMPb9iGOl6biPEL7lj99RY96L6WgT27NXnlYRueqdHh5pDZ-QI7WzFXQusciBCpOXJ5uu9Xe8upNuGk5XV8o18ZaOfvYd5T2BCUMpkVqOYgU05Y"
              />
              {/* Floating Micro-UI elements */}
              <div className="absolute top-10 right-0 p-4 bg-surface-container/60 backdrop-blur-md border border-outline-variant rounded-xl animate-bounce z-20" style={{ animationDuration: '4s' }}>
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>code</span>
                <div className="mt-2 text-xs font-label-sm text-primary">React Native</div>
              </div>
              <div className="absolute bottom-20 left-0 p-4 bg-surface-container/60 backdrop-blur-md border border-outline-variant rounded-xl animate-bounce z-20" style={{ animationDelay: '1s', animationDuration: '5s' }}>
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>brush</span>
                <div className="mt-2 text-xs font-label-sm text-secondary">UI Design</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Skills */}
      <section className="py-12 bg-surface-container-low border-y border-outline-variant overflow-hidden w-full">
        <div className="marquee-container">
          <div className="marquee-content">
            <div className="flex items-center gap-2 px-6 py-2 rounded-full border border-outline-variant bg-surface">
              <span className="font-label-sm text-label-sm text-primary">JAVASCRIPT</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-2 rounded-full border border-outline-variant bg-surface">
              <span className="font-label-sm text-label-sm text-secondary">MOTION GRAPHICS</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-2 rounded-full border border-outline-variant bg-surface">
              <span className="font-label-sm text-label-sm text-tertiary-fixed-dim">DATA SCIENCE</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-2 rounded-full border border-outline-variant bg-surface">
              <span className="font-label-sm text-label-sm text-primary">URBAN GARDENING</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-2 rounded-full border border-outline-variant bg-surface">
              <span className="font-label-sm text-label-sm text-secondary">CHEF ESSENTIALS</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-2 rounded-full border border-outline-variant bg-surface">
              <span className="font-label-sm text-label-sm text-tertiary-fixed-dim">CRYPTO TRADING</span>
            </div>
          </div>
          {/* Duplicate for seamless loop */}
          <div aria-hidden="true" className="marquee-content">
            <div className="flex items-center gap-2 px-6 py-2 rounded-full border border-outline-variant bg-surface">
              <span className="font-label-sm text-label-sm text-primary">JAVASCRIPT</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-2 rounded-full border border-outline-variant bg-surface">
              <span className="font-label-sm text-label-sm text-secondary">MOTION GRAPHICS</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-2 rounded-full border border-outline-variant bg-surface">
              <span className="font-label-sm text-label-sm text-tertiary-fixed-dim">DATA SCIENCE</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-2 rounded-full border border-outline-variant bg-surface">
              <span className="font-label-sm text-label-sm text-primary">URBAN GARDENING</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-2 rounded-full border border-outline-variant bg-surface">
              <span className="font-label-sm text-label-sm text-secondary">CHEF ESSENTIALS</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-2 rounded-full border border-outline-variant bg-surface">
              <span className="font-label-sm text-label-sm text-tertiary-fixed-dim">CRYPTO TRADING</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works (Bento Layout) */}
      <section className="py-section-gap max-w-container-max mx-auto px-margin-desktop w-full">
        <div className="mb-16 text-center">
          <h2 className="font-headline-xl text-headline-xl text-primary mb-4">How it Works</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Learn from the community, teach your passions. Our ecosystem ensures fair value for everyone's time.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {/* Step 1: Match */}
          <div className="md:col-span-4 animate-on-scroll p-8 rounded-2xl bg-surface-container border border-outline-variant flex flex-col justify-between group hover:border-primary/50 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary text-3xl">handshake</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-4">1. Match</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Our AI matching engine pairs you with mentors who want to learn exactly what you excel at.
              </p>
            </div>
            <div className="mt-12 h-32 relative overflow-hidden rounded-lg bg-surface-container-low border border-outline-variant">
              <div className="absolute inset-0 flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 animate-pulse"></div>
                <div className="w-8 h-[2px] bg-outline-variant"></div>
                <div className="w-12 h-12 rounded-full bg-secondary/20 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              </div>
            </div>
          </div>

          {/* Step 2: Swap */}
          <div className="md:col-span-8 animate-on-scroll p-8 rounded-2xl bg-surface-container border border-outline-variant flex flex-col md:flex-row gap-8 group hover:border-secondary/50 transition-colors">
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-secondary text-3xl">sync_alt</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-4">2. Swap</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Schedule a session through our integrated calendar. One hour of your time equals one "Spark Credit."
                </p>
              </div>
              <button
                onClick={() => onNavigate('auth')}
                className="mt-8 px-6 py-2 w-fit rounded-full bg-secondary text-on-secondary font-bold text-sm cursor-pointer hover:opacity-90 transition-opacity outline-none border-none"
              >
                Explore Schedule
              </button>
            </div>
            <div className="flex-1 min-h-[200px] relative overflow-hidden rounded-lg bg-surface-container-low border border-outline-variant p-4">
              <div className="space-y-3">
                <div className="p-3 bg-surface rounded-lg border border-outline-variant/30 flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-primary/20"></div>
                  <div className="h-2 w-24 bg-outline-variant rounded"></div>
                </div>
                <div className="p-3 bg-surface rounded-lg border border-primary/40 flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-secondary/20"></div>
                  <div className="h-2 w-32 bg-outline-variant rounded"></div>
                </div>
                <div className="p-3 bg-surface rounded-lg border border-outline-variant/30 flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-tertiary-fixed-dim/20"></div>
                  <div className="h-2 w-20 bg-outline-variant rounded"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Learn */}
          <div className="md:col-span-12 animate-on-scroll p-10 rounded-2xl bg-surface-container border border-outline-variant flex flex-col md:flex-row items-center gap-12 group hover:border-primary/50 transition-all">
            <div className="flex-1 order-2 md:order-1">
              <div className="w-12 h-12 rounded-lg bg-primary-container/10 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary-container text-3xl">school</span>
              </div>
              <h3 className="font-headline-xl text-headline-xl text-on-surface mb-6">3. Learn & Grow</h3>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
                Knowledge is the only currency that grows when you spend it. Track your progress on the Skill Spectrum and climb the global leaderboard.
              </p>
              <div className="flex gap-4">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-primary">95%</span>
                  <span className="text-xs font-label-sm text-outline uppercase tracking-wider">Completion</span>
                </div>
                <div className="w-[1px] bg-outline-variant"></div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-secondary">12k+</span>
                  <span className="text-xs font-label-sm text-outline uppercase tracking-wider">Experts</span>
                </div>
              </div>
            </div>
            <div className="flex-1 order-1 md:order-2 w-full max-w-md">
              <div className="relative p-6 bg-surface border border-outline-variant rounded-2xl">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-label-sm text-primary">Skill: Cyber Security</span>
                  <span className="font-label-sm text-on-surface-variant">Expert Level</span>
                </div>
                <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden mb-6">
                  <div className="h-full bg-gradient-to-r from-primary via-secondary to-tertiary-fixed-dim w-[85%]"></div>
                </div>
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full border-2 border-surface bg-primary/20"></div>
                  <div className="w-10 h-10 rounded-full border-2 border-surface bg-secondary/20"></div>
                  <div className="w-10 h-10 rounded-full border-2 border-surface bg-tertiary/20"></div>
                  <div className="w-10 h-10 rounded-full border-2 border-surface bg-surface-container flex items-center justify-center text-xs">+42</div>
                </div>
              </div>
            </div>
          </div>
        </div>
       </section>
 
       {/* Featured Skills Section */}
       <section className="py-section-gap bg-surface-container-low/30 overflow-hidden">
         <div className="max-w-container-max mx-auto px-margin-desktop w-full">
           <div className="mb-16 text-center">
             <h2 className="font-headline-xl text-headline-xl text-primary mb-4">Popular Skills</h2>
             <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
               Explore the most in-demand skills currently being swapped in our community.
             </p>
           </div>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
             {[
               { name: 'React & Web Dev', icon: 'code', color: 'text-primary' },
               { name: 'UI/UX Design', icon: 'brush', color: 'text-secondary' },
               { name: 'Data Science', icon: 'analytics', color: 'text-tertiary-fixed-dim' },
               { name: 'Python Mastery', icon: 'terminal', color: 'text-primary' },
               { name: 'Mobile Apps', icon: 'smartphone', color: 'text-secondary' },
               { name: 'Cyber Security', icon: 'security', color: 'text-tertiary-fixed-dim' },
               { name: 'Motion Graphics', icon: 'animation', color: 'text-primary' },
               { name: 'Cloud Computing', icon: 'cloud', color: 'text-secondary' },
             ].map((skill, idx) => (
               <div 
                 key={idx} 
                 className="animate-on-scroll p-6 rounded-2xl bg-surface border border-outline-variant/50 flex flex-col items-center text-center group hover:border-primary/50 transition-all cursor-pointer"
                 onClick={() => onNavigate('skills')}
               >
                 <div className={`w-14 h-14 rounded-full bg-surface-container flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                   <span className={`material-symbols-outlined text-3xl ${skill.color}`}>{skill.icon}</span>
                 </div>
                 <h3 className="font-headline-md text-lg text-on-surface">{skill.name}</h3>
                 <p className="text-xs text-on-surface-variant mt-2">View all learners</p>
               </div>
             ))}
           </div>
         </div>
       </section>
 
       {/* CTA Section with animated background */}
       <section className="relative py-section-gap overflow-hidden">

        <div className="max-w-container-max mx-auto px-margin-desktop relative z-10 text-center">
          <div className="bg-surface-container/60 backdrop-blur-xl border border-outline-variant p-16 rounded-[40px] max-w-4xl mx-auto shadow-2xl">
            <h2 className="font-display-lg text-headline-xl md:text-display-lg text-primary mb-8 leading-tight">Ready to join the Lab?</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-12 max-w-xl mx-auto">
              Join 50,000+ creators, developers, and thinkers trading knowledge across the globe. Your first swap is on us.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button
                onClick={() => onNavigate('auth')}
                className="px-12 py-5 bg-primary text-on-primary font-bold rounded-xl hover:scale-105 transition-transform ambient-glow-cyan cursor-pointer border-none"
              >
                Create Free Account
              </button>
              <button className="px-12 py-5 border border-outline-variant text-on-surface font-bold rounded-xl hover:bg-surface-container-highest transition-colors cursor-pointer bg-transparent">
                Join Discord
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
