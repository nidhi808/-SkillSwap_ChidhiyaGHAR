import React, { useEffect, useState } from 'react';
import { ArrowRight, Users, Compass, Cpu, Layers } from 'lucide-react';

const HUD_PROMPTS = [
  'FIND ME A PYTHON TUTOR AVAILABLE THIS WEEKEND',
  'SWAP MY REACT SKILLS FOR UI/UX DESIGN LESSONS',
  'MATCH ME WITH AN EXPERT IN C++ ALGORITHMS',
  'CONNECT ME WITH A MACHINE LEARNING PEER',
];

interface LandingPageProps {
  scrollProgress: number;
  onNavigate: (section: 'auth') => void;
  setVisorState: (state: 'eyes' | 'quote' | 'swap' | 'success' | 'camera') => void;
}

// Section names for dot navigation
const SECTIONS = [
  { id: 'intro', label: '01 // INTRO' },
  { id: 'solutions', label: '02 // SOLUTIONS' },
  { id: 'ecosystem', label: '03 // ECOSYSTEM' },
  { id: 'team', label: '04 // TEAM' },
  { id: 'roadmap', label: '05 // ROADMAP' },
  { id: 'faq', label: '06 // FAQ' }
];

export const LandingPage: React.FC<LandingPageProps> = ({
  scrollProgress,
  onNavigate,
  setVisorState,
}) => {
  const [activeSection, setActiveSection] = useState('intro');
  const [teamTab, setTeamTab] = useState<'core' | 'advisors'>('core');
  
  // Track open FAQ accordion index
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Dynamically change the visorState of the robot as scroll progress changes
  useEffect(() => {
    setVisorState('eyes');
  }, [scrollProgress, setVisorState]);

  // Scrollspy to detect active section in viewport
  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy);
    // Trigger initially
    handleScrollSpy();
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Sticky Right-side Dot Navigation */}
      <div className="dot-navigation">
        {SECTIONS.map((sec) => (
          <button
            key={sec.id}
            onClick={() => scrollToSection(sec.id)}
            className={`dot-nav-item ${activeSection === sec.id ? 'active' : ''}`}
          >
            <span className="dot-nav-label">{sec.label}</span>
            <div className="dot-nav-circle"></div>
          </button>
        ))}
      </div>

      {/* Background glowing spots */}
      <div className="radial-glow cyan" style={{ top: '10vh', left: '-10vw' }}></div>
      <div className="radial-glow purple" style={{ top: '120vh', right: '-10vw' }}></div>
      <div className="radial-glow green" style={{ top: '240vh', left: '15vw' }}></div>
      <div className="radial-glow cyan" style={{ top: '350vh', right: '10vw' }}></div>

      {/* SCROLL INDICATOR (ChainGPT style bottom-right fixed) */}
      {scrollProgress < 0.9 && (
        <div className="scroll-indicator">
          <span className="scroll-indicator-text">SCROLL</span>
          <div className="scroll-indicator-arrow">↓</div>
        </div>
      )}

      {/* SECTION 1: HERO (INTRO) — ChainGPT style */}
      <section
        id="intro"
        style={{
          minHeight: '100vh',
          display: 'grid',
          gridTemplateColumns: '1.35fr 0.9fr 1.35fr',
          alignItems: 'stretch',
          padding: '100px 0 40px 0',
          position: 'relative',
          zIndex: 10,
          maxWidth: '1680px',
          margin: '0 auto',
          width: '100%',
          borderBottom: '1px solid rgba(255, 255, 255, 0.04)'
        }}
      >
        {/* LEFT COLUMN: ChainGPT bracket headline + HUD prompts */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'flex-start', 
          textAlign: 'left',
          padding: '40px 80px 40px 80px',
          borderRight: '1px solid rgba(255, 255, 255, 0.04)',
          justifyContent: 'center'
        }}>

          {/* Pre-title */}
          <div className="hero-pretitle">UNLEASH THE POWER OF</div>

          {/* Bracket-boxed hero words — exact ChainGPT style */}
          <h1 style={{ marginBottom: '36px', display: 'flex', flexDirection: 'column', gap: '10px', lineHeight: 1 }}>
            <span className="hero-bracket-word">SkillSwap</span>
            <span className="hero-bracket-word" style={{
              background: 'linear-gradient(#000, #000) padding-box, linear-gradient(135deg, #28efce, #00f0ff, #bd00ff) border-box',
            }}>Barter Grid</span>
          </h1>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '14px', marginBottom: '44px' }}>
            <button className="launch-dapp-btn" onClick={() => onNavigate('auth')}>
              <span style={{ fontSize: '0.5rem' }}>••</span> LAUNCH APP
            </button>
            <button
              className="cyber-button-secondary font-mono"
              onClick={() => scrollToSection('solutions')}
              style={{ padding: '10px 22px', fontSize: '0.76rem', borderRadius: '999px', borderColor: 'rgba(255,255,255,0.12)' }}
            >
              Explore Docs
            </button>
          </div>

          {/* HUD cycling prompt — ChainGPT's quote box style */}
          <div className="chaingpt-quote-container hud-prompt-cycling">
            <div className="chaingpt-quote-icon-box">“</div>
            <div className="chaingpt-quote-content-box">
              <p>{HUD_PROMPTS[0]}</p>
            </div>
          </div>

          {/* Sub-prompt */}
          <div className="hud-sub-prompt">
            <span className="hud-label">// SYNC STATUS</span>
            <p>SYNC AND VERIFY HACKATHON RECORDS TO GENERATE HIGHER QUALITY EXCHANGE BADGES.</p>
          </div>
        </div>

        {/* CENTER COLUMN: SVG connectors + robot spacer */}
        <div style={{ 
          position: 'relative', 
          width: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '40px 20px'
        }}>
          <div style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, pointerEvents: 'none', zIndex: 1 }}>
            <svg width="100%" height="100%" viewBox="0 0 400 400" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
              <path d="M -50 180 L 80 180 L 120 200 L 160 200" fill="none" stroke="var(--color-cyan)" strokeWidth="1" strokeDasharray="3 3" opacity="0.35" />
              <path d="M 450 160 L 320 160 L 280 190 L 240 190" fill="none" stroke="var(--color-purple)" strokeWidth="1" strokeDasharray="3 3" opacity="0.35" />
            </svg>
          </div>
        </div>

        {/* RIGHT COLUMN: ChainGPT 'DEPLOYING ON...' + feature list */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          padding: '40px 80px 40px 80px',
          borderLeft: '1px solid rgba(255, 255, 255, 0.04)',
          justifyContent: 'center'
        }}>
          <div className="chaingpt-deploying-wrapper">
            <div className="chaingpt-deploying-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className="deploy-status-dot" />
                <span className="font-mono text-purple" style={{ fontSize: '0.68rem', color: 'var(--color-purple)', letterSpacing: '0.08em' }}>DEPLOYING ON...</span>
              </div>
              <div className="chaingpt-mini-logo">⠿</div>
            </div>
            <div className="chaingpt-deploying-target">
              <span className="deploying-arrow">▶</span>
              <span className="deploying-text">AI SKILL ENGINE</span>
            </div>
          </div>

          <div className="deploy-feature-list">
            {[
              { label: 'PEER VERIFIED BADGES', id: 'solutions' },
              { label: 'COLLABORATIVE DRAWING CANVAS', id: 'solutions' },
              { label: 'AUDITED REPUTATION SCORE', id: 'solutions' },
              { label: 'PAN-COLLEGE ROUTING GRID', id: 'ecosystem' },
              { label: 'AI SKILL MATCHING', id: 'solutions' },
              { label: 'LIVE WHITEBOARD SESSION', id: 'solutions' },
            ].map(item => (
              <div key={item.label} className="deploy-list-item" onClick={() => scrollToSection(item.id)} style={{ cursor: 'pointer' }}>
                <span className="feat-tri">◀</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.55, marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '18px' }}>
            Your personal expert in all college skill barter &amp; branch related topics.
          </p>
        </div>
      </section>

      {/* SECTION 2: SOLUTIONS — ChainGPT sticky-left / scroll-right layout */}
      <section id="solutions" style={{ position: 'relative', zIndex: 10 }}>
        <div className="solutions-wrapper">

          {/* LEFT STICKY — title stays pinned while right scrolls */}
          <div className="solutions-sticky-left">
            <div className="badge-neon purple" style={{ marginBottom: '20px' }}>
              <Cpu size={12} /> ALGORITHMIC UTILITIES
            </div>
            <h2 style={{ fontSize: '2.8rem', color: '#fff', marginBottom: '20px', lineHeight: 1.1, fontFamily: 'var(--font-sans)', fontWeight: 800, letterSpacing: '-0.02em' }}>
              Our Solutions
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.65, marginBottom: '28px' }}>
              Explore the core protocols that drive peer matching, certificate auditing, and collaborative remote canvases.
            </p>
            <div style={{ borderLeft: '2px solid rgba(255,255,255,0.08)', paddingLeft: '16px' }}>
              <span className="font-mono" style={{ fontSize: '0.62rem', color: 'var(--color-purple)', display: 'block', marginBottom: '6px', letterSpacing: '0.06em' }}>// MATCHING PROTOCOLS</span>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Automatically calculates matching indices between learning requirements and teaching capabilities.
              </p>
            </div>
          </div>

          {/* RIGHT SCROLLING — 4 solution entries */}
          <div className="solutions-scroll-right">
            {/* Robot spacer so the 3D bot is visible in this zone */}
            <div style={{ height: '450px' }} />

            {[
              {
                num: '01', title: 'SkillSwap Chatbot',
                desc: 'Reliable & Fast Source of Peer Connections. Ask SkillSwap AI any question related to your college skill barter needs.',
                features: ['BIDIRECTIONAL MATCH SCORE', 'SMART OVERLAP SOLVER', 'REAL-TIME PAIRING', 'PROFILE DEEP SCAN', 'ENTER THE SKILL HUB →'],
              },
              {
                num: '02', title: 'Interactive Whiteboard',
                desc: 'Explain code step-by-step using a live collaborative canvas with WebRTC video and audio sessions.',
                features: ['WEBRTC VIDEO STREAM', 'CANVAS DRAWING TOOLS', 'CODE SYNTAX OVERLAY', 'SESSION NOTES', 'OPEN WHITEBOARD →'],
              },
              {
                num: '03', title: 'Verified Credentials',
                desc: 'Submit certifications and exam scores to earn verified profile badges establishing your expertise level.',
                features: ['HACKATHON UPLOADS', 'EXAM SCORE AUDIT', 'BADGE ISSUANCE', 'REPUTATION SCALING', 'VIEW BADGE SYSTEM →'],
              },
              {
                num: '04', title: 'Branch Channels',
                desc: 'Interact inside dedicated channels filtered by branches, courses, and trending tech stacks across colleges.',
                features: ['CSE / ECE / MECH FILTERS', 'TRENDING STACKS', 'IIT DELHI ROUTING', 'CROSS-CAMPUS GRID', 'EXPLORE CHANNELS →'],
              },
            ].map((sol) => (
              <div key={sol.num} className="solution-entry">
                <div>
                  <div className="solution-num">{sol.num}</div>
                  <div className="solution-title">{sol.title}</div>
                  <p className="solution-desc">{sol.desc}</p>
                </div>
                <div className="solution-feature-list">
                  {sol.features.map((f, fi) => (
                    <div
                      key={fi}
                      className={`solution-feature-item${fi === sol.features.length - 1 ? ' cta-item' : ''}`}
                    >
                      <span className="feat-arrow">▶</span>
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: ECOSYSTEM */}
      <section 
        id="ecosystem"
        style={{ 
          padding: '100px 80px',
          position: 'relative',
          zIndex: 10
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '60px', alignItems: 'center', maxWidth: '1200px' }}>
          <div style={{ textAlign: 'left' }}>
            <div className="badge-neon green" style={{ marginBottom: '16px' }}>
              <Layers size={12} /> ARCHITECTURE LAYERS
            </div>
            <h2 className="font-mono" style={{ fontSize: '2.2rem', color: '#fff', marginBottom: '16px' }}>
              03 // THE ECOSYSTEM LAYERS
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '24px' }}>
              SkillSwap operates as a decentralized routing network for university knowledge exchange, layered specifically for scalability and high-fidelity video feeds.
            </p>
            <button 
              className="cyber-button green"
              onClick={() => onNavigate('auth')}
            >
              LAUNCH PEER NODE
            </button>
          </div>

          {/* Visual stack layers */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { num: 'L3', name: 'COLLABORATIVE INTERFACE', tech: 'WebRTC / Canvas API', desc: 'Frictionless vector canvas with overlay WebRTC video channels.', color: 'var(--color-cyan)' },
              { num: 'L2', name: 'MATCH ROUTING ENGINE', tech: 'Bidirectional Overlap Solver', desc: 'Calculates overlap matrix scores in under 5ms to connect matching peers.', color: 'var(--color-purple)' },
              { num: 'L1', name: 'REPUTATION LEDGER', tech: 'Audit Score Algorithm', desc: 'Validates exam sheets and certificates to issue profile badges.', color: 'var(--color-green)' }
            ].map((layer) => (
              <div 
                key={layer.num}
                className="glass-panel" 
                style={{ 
                  padding: '24px', 
                  borderLeft: `3px solid ${layer.color}`,
                  background: 'rgba(10, 10, 12, 0.7)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span className="font-mono" style={{ color: layer.color, fontWeight: 'bold', fontSize: '0.95rem' }}>{layer.num}</span>
                    <h4 className="font-mono" style={{ color: '#fff', fontSize: '1rem' }}>{layer.name}</h4>
                  </div>
                  <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{layer.tech}</span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.4, textAlign: 'left' }}>{layer.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: TEAM */}
      <section 
        id="team"
        style={{ 
          padding: '100px 80px',
          position: 'relative',
          zIndex: 10
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '50px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '20px' }}>
          <div style={{ textAlign: 'left' }}>
            <div className="badge-neon purple" style={{ marginBottom: '16px' }}>
              <Users size={12} /> CONTRIBUTORS
            </div>
            <h2 className="font-mono" style={{ fontSize: '2.2rem', color: '#fff' }}>
              04 // DEVELOPMENT GRID
            </h2>
          </div>

          {/* Tab Switcher */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              className={`team-tab-btn ${teamTab === 'core' ? 'active' : ''}`}
              onClick={() => setTeamTab('core')}
            >
              CORE CONTRIBUTORS
            </button>
            <button 
              className={`team-tab-btn ${teamTab === 'advisors' ? 'active' : ''}`}
              onClick={() => setTeamTab('advisors')}
            >
              ADVISORS & MENTORS
            </button>
          </div>
        </div>

        {/* Team Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', maxWidth: '1100px' }}>
          {teamTab === 'core' ? (
            <>
              {/* Member 1 */}
              <div className="gradient-border-card team-profile-card" style={{ padding: '20px', textAlign: 'center' }}>
                <div style={{ width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 16px auto', border: '2px solid var(--color-cyan)', background: '#0a0a0d' }}>
                  <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Nidhi" alt="Nidhi Vekhande" style={{ width: '100%', height: '100%' }} />
                </div>
                <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '4px' }}>Nidhi Vekhande</h4>
                <p className="font-mono" style={{ color: 'var(--color-cyan)', fontSize: '0.75rem', marginBottom: '12px' }}>PROJECT LEAD // DEVELOPER</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.4 }}>Student at IIT Delhi. Managing matching algorithms and front-end HUD routers.</p>
              </div>

              {/* Member 2 */}
              <div className="gradient-border-card team-profile-card" style={{ padding: '20px', textAlign: 'center' }}>
                <div style={{ width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 16px auto', border: '2px solid var(--color-purple)', background: '#0a0a0d' }}>
                  <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Sanjay" alt="Sanjay Kumar" style={{ width: '100%', height: '100%' }} />
                </div>
                <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '4px' }}>Sanjay Kumar</h4>
                <p className="font-mono" style={{ color: 'var(--color-purple)', fontSize: '0.75rem', marginBottom: '12px' }}>WHITEBOARD ENGINEER</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.4 }}>Specialist in collaborative vector drawing canvases and real-time streaming sockets.</p>
              </div>

              {/* Member 3 */}
              <div className="gradient-border-card team-profile-card" style={{ padding: '20px', textAlign: 'center' }}>
                <div style={{ width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 16px auto', border: '2px solid var(--color-green)', background: '#0a0a0d' }}>
                  <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Sneha" alt="Sneha Reddy" style={{ width: '100%', height: '100%' }} />
                </div>
                <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '4px' }}>Sneha Reddy</h4>
                <p className="font-mono" style={{ color: 'var(--color-green)', fontSize: '0.75rem', marginBottom: '12px' }}>UI/UX DESIGN ARCHITECT</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.4 }}>Crafting premium dark HUD layouts, custom neon panels, and user workflows.</p>
              </div>
            </>
          ) : (
            <>
              {/* Advisor 1 */}
              <div className="gradient-border-card team-profile-card" style={{ padding: '20px', textAlign: 'center' }}>
                <div style={{ width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 16px auto', border: '2px solid var(--color-orange)', background: '#0a0a0d' }}>
                  <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Professor" alt="Dr. Amit Gupta" style={{ width: '100%', height: '100%' }} />
                </div>
                <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '4px' }}>Dr. Amit Gupta</h4>
                <p className="font-mono" style={{ color: 'var(--color-orange)', fontSize: '0.75rem', marginBottom: '12px' }}>PROFESSOR // ADVISOR</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.4 }}>Guiding algorithm complexity studies and academic credential integration parameters.</p>
              </div>

              {/* Advisor 2 */}
              <div className="gradient-border-card team-profile-card" style={{ padding: '20px', textAlign: 'center' }}>
                <div style={{ width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 16px auto', border: '2px solid var(--color-cyan)', background: '#0a0a0d' }}>
                  <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Alumni" alt="Sneha Rao" style={{ width: '100%', height: '100%' }} />
                </div>
                <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '4px' }}>Sneha Rao</h4>
                <p className="font-mono" style={{ color: 'var(--color-cyan)', fontSize: '0.75rem', marginBottom: '12px' }}>MENTOR // GOOGLE ENG</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.4 }}>Supporting cloud structure planning and scaling WebRTC channels for performance.</p>
              </div>
            </>
          )}
        </div>
      </section>

      {/* SECTION 5: ROADMAP */}
      <section 
        id="roadmap"
        style={{ 
          padding: '100px 80px',
          position: 'relative',
          zIndex: 10
        }}
      >
        <div style={{ maxWidth: '600px', marginBottom: '60px', textAlign: 'left' }}>
          <div className="badge-neon green" style={{ marginBottom: '16px' }}>
            <Compass size={12} /> TIMELINE
          </div>
          <h2 className="font-mono" style={{ fontSize: '2.2rem', color: '#fff', marginBottom: '16px' }}>
            05 // PROGRESS ROADMAP
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
            Track the deployment timeline of new matching pools, external certificate audits, and pan-college expansion.
          </p>
        </div>

        {/* Timeline Blocks */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '20px', maxWidth: '1200px' }}>
          {[
            { q: 'Q1 2026', title: 'SYSTEM CORE', status: 'COMPLETED', desc: 'Deploying core peer database at IIT Delhi with Python, React, and UX barter pipelines.', color: 'var(--color-green)' },
            { q: 'Q2 2026', title: 'RTC AUDIO/VIDEO', status: 'COMPLETED', desc: 'Integrating high-fidelity audio/video feeds alongside drawing whiteboard channels.', color: 'var(--color-cyan)' },
            { q: 'Q3 2026', title: 'AUDITING INTEGRITY', status: 'IN PROGRESS', desc: 'Launching automated validation for hackathon entries and certification uploads.', color: 'var(--color-purple)' },
            { q: 'Q4 2026', title: 'INTER-COLLEGE GRID', status: 'PLANNED', desc: 'Expanding matching routing to cover partner colleges (NSUT, DTU, IIITD).', color: 'var(--color-orange)' }
          ].map((item, idx) => (
            <div 
              key={idx}
              className="glass-panel" 
              style={{ 
                padding: '24px', 
                borderTop: `3px solid ${item.color}`,
                background: 'rgba(10, 10, 12, 0.7)',
                textAlign: 'left'
              }}
            >
              <span className="font-mono" style={{ color: item.color, fontWeight: 'bold', fontSize: '1.25rem' }}>{item.q}</span>
              <h4 className="font-mono" style={{ color: '#fff', fontSize: '0.95rem', margin: '12px 0 4px 0' }}>{item.title}</h4>
              <span className="font-mono" style={{ fontSize: '0.6rem', color: 'var(--text-muted)', display: 'block', marginBottom: '12px' }}>// STATUS: {item.status}</span>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', lineHeight: 1.45 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: FAQ */}
      <section 
        id="faq"
        style={{ 
          padding: '100px 80px',
          position: 'relative',
          zIndex: 10
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '60px', maxWidth: '1200px' }}>
          <div style={{ textAlign: 'left' }}>
            <div className="badge-neon purple" style={{ marginBottom: '16px' }}>
              <Compass size={12} /> FAQ MODULE
            </div>
            <h2 className="font-mono" style={{ fontSize: '2.2rem', color: '#fff', marginBottom: '16px' }}>
              06 // FREQUENTLY ASKED QUESTIONS
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Have questions regarding reputation calculations, pairing rules, or classroom tools? We have indexed responses for easy audit.
            </p>
          </div>

          {/* Accordion List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { q: 'What is SkillSwap // CG?', a: 'SkillSwap // CG is an algorithmic co-learning network designed for college students. It enables direct skill exchanges (bartering) between peers without any financial transactions.' },
              { q: 'How does the bidirectional matching work?', a: 'Our solver analyzes student profiles: what you are willing to teach and what you desire to learn. It then finds mutual matches (e.g. Sanjay teaches React and wants Python; Nidhi teaches Python and wants React) and links you instantly.' },
              { q: 'Is there any course fee involved?', a: 'Zero. The network operates strictly on mutual skill barter. There are no fees or hidden payments involved at any stage.' },
              { q: 'How is the reputation score computed?', a: 'Your reputation starts at 60 and scales up to 100. It increases by completing swaps, submitting academic exam sheets, and adding hackathon prizes, unlocking rare developer badges.' }
            ].map((faq, index) => (
              <div 
                key={index} 
                className={`faq-accordion ${openFaq === index ? 'open' : ''}`}
              >
                <div 
                  className="faq-header" 
                  onClick={() => toggleFaq(index)}
                >
                  <span className="faq-title font-mono">{faq.q}</span>
                  <ArrowRight size={16} className="faq-toggle-icon" />
                </div>
                <div 
                  className="faq-content"
                  style={{ maxHeight: openFaq === index ? '150px' : '0' }}
                >
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA FOOTER BANNER */}
      <section 
        style={{ 
          padding: '100px 80px 140px 80px',
          position: 'relative',
          zIndex: 10,
          borderTop: '1px solid rgba(255, 255, 255, 0.03)',
          background: 'radial-gradient(ellipse at bottom, rgba(0, 240, 255, 0.05) 0%, transparent 60%)'
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 
            className="font-mono"
            style={{ 
              fontSize: '2.5rem', 
              color: '#fff', 
              marginBottom: '20px',
              textShadow: '0 0 20px rgba(189, 0, 255, 0.15)' 
            }}
          >
            READY TO JOIN THE BARTER GRID?
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '36px', maxWidth: '540px', margin: '0 auto 36px auto', lineHeight: 1.6 }}>
            Initialize your student node, complete verification, and begin exchanging programming languages and tech skills today.
          </p>
          <button 
            className="cyber-button"
            onClick={() => onNavigate('auth')}
            style={{ padding: '16px 40px', fontSize: '1rem' }}
          >
            Launch DApp Grid
          </button>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
