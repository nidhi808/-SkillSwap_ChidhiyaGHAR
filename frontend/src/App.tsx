import { useState, useEffect, useRef } from 'react';
import { RobotCanvas } from './components/RobotCanvas';
import { LandingPage } from './components/LandingPage';
import { AuthPage } from './components/AuthPage';
import { ProfileBuilder } from './components/ProfileBuilder';
import { Dashboard } from './components/Dashboard';
import { WhiteboardRoom } from './components/WhiteboardRoom';
import { Volume2, VolumeX, Activity } from 'lucide-react';

type AppView = 'landing' | 'auth' | 'profile' | 'dashboard' | 'whiteboard';

interface UserProfile {
  name: string;
  age: number;
  college: string;
  branch: string;
  course: string;
  teachingSkills: string[];
  learningSkills: string[];
}

function App() {
  const [view, setView] = useState<AppView>('landing');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [audioActive, setAudioActive] = useState(false);
  const cursorRef = useRef<HTMLDivElement | null>(null);

  // Visor states for Three.js robot
  const [visorState, setVisorState] = useState<'eyes' | 'quote' | 'swap' | 'success' | 'camera'>('eyes');

  // Onboarded Profile
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Nidhi Vekhande',
    age: 20,
    college: 'IIT Delhi',
    branch: 'Computer Science',
    course: 'B.Tech',
    teachingSkills: ['Python', 'React'],
    learningSkills: ['C Language', 'UI/UX Design'],
  });

  // Whiteboard meet details
  const [activeRoom, setActiveRoom] = useState<{ tutor: string; student: string; skill: string } | null>(null);

  // Announcement banner dismissal
  const [bannerVisible, setBannerVisible] = useState(true);

  // Monitor natural vertical scrolling progress
  useEffect(() => {
    if (view !== 'landing') {
      setScrollProgress(0);
      return;
    }

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const progress = window.scrollY / scrollHeight;
      setScrollProgress(Math.min(1.0, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [view]);

  // Pointer follow cursor
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  const handleEnterRoom = (roomData: { tutor: string; student: string; skill: string }) => {
    setActiveRoom(roomData);
    setView('whiteboard');
  };

  const handleProfileComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setView('dashboard');
  };

  // Scroll to a landing page section smoothly
  const scrollToSection = (sectionId: string) => {
    if (view !== 'landing') {
      setView('landing');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Custom Glowing Pointer Cursor */}
      <div ref={cursorRef} className="glow-cursor" />

      {/* Screen scanlines simulation */}
      <div className="scanlines" />

      {/* HUD Frame Borders */}
      <div className="hud-frame">
        <div className="hud-corner top-left"></div>
        <div className="hud-corner top-right"></div>
        <div className="hud-corner bottom-left"></div>
        <div className="hud-corner bottom-right"></div>
      </div>

      {/* ── Announcement Banner (ChainGPT style) ── */}
      {bannerVisible && (
        <div className="announce-banner">
          <span>New :</span>
          <span className="link" onClick={() => scrollToSection('roadmap')}>
            Inter-College Skill Grid expanding to NSUT, DTU &amp; IIITD &nbsp;↗
          </span>
          <button className="banner-close" onClick={() => setBannerVisible(false)}>✕</button>
        </div>
      )}

      {/* ── Navbar — ChainGPT style ── */}
      <header
        style={{
          height: '68px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0',
          position: 'sticky',
          top: 0,
          background: 'rgba(4, 4, 6, 0.94)',
          backdropFilter: 'blur(14px)',
          zIndex: 99,
          boxSizing: 'border-box',
        }}
      >
        {/* Left: Brand Logo */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '0 32px', flexShrink: 0 }}
          onClick={() => { setView('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
          <span style={{ fontSize: '1.3rem' }}>🛸</span>
          <span className="font-mono" style={{ fontWeight: 800, fontSize: '1rem', letterSpacing: '0.08em', color: '#fff' }}>
            SKILLSWAP <span style={{ color: 'rgba(255,255,255,0.22)' }}>//</span>{' '}
            <span style={{ color: 'var(--color-cyan)' }}>CG</span>
          </span>
        </div>

        {/* Ecosystem tab (ChainGPT column-separator style) */}
        <div
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            padding: '0 26px',
            borderLeft: '1px solid rgba(255,255,255,0.05)',
            borderRight: '1px solid rgba(255,255,255,0.05)',
            gap: '8px',
            cursor: 'pointer',
            flexShrink: 0,
          }}
          onClick={() => scrollToSection('ecosystem')}
        >
          <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.6rem' }}>⠿⠿</span>
          <span className="font-mono" style={{ fontSize: '0.7rem', color: '#fff', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            OUR ECOSYSTEM
          </span>
        </div>

        {/* Center: Nav links with dropdown carets */}
        <nav style={{ display: 'flex', flex: 1, justifyContent: 'center' }} className="font-mono">
          {[
            { label: 'Solutions', id: 'solutions' },
            { label: 'Developers', id: 'ecosystem' },
            { label: 'About AI Hub', id: 'team' },
            { label: 'Learn', id: 'roadmap' },
            { label: 'FAQ', id: 'faq' },
          ].map((sec) => (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'rgba(255,255,255,0.52)',
                cursor: 'pointer',
                fontSize: '0.78rem',
                letterSpacing: '0.02em',
                transition: 'color 0.2s',
                padding: '0 16px',
                height: '68px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.52)')}
            >
              {sec.label}
              <span style={{ fontSize: '0.5rem', opacity: 0.5 }}>▾</span>
            </button>
          ))}
        </nav>

        {/* Right: HUD status + pill LAUNCH DAPP + audio */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px', padding: '0 24px' }}>
          <div className="font-mono" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.68rem', color: 'rgba(255,255,255,0.35)' }}>
            <Activity size={10} color="var(--color-cyan)" className="pulse-cyan" />
            GRID: <span style={{ color: 'var(--color-green)' }}>ONLINE</span>
          </div>

          {/* ChainGPT pill button — rainbow gradient animated border */}
          <button className="launch-dapp-btn" onClick={() => setView('auth')}>
            <span style={{ fontSize: '0.5rem', letterSpacing: '0.05em', opacity: 0.7 }}>••</span>
            LAUNCH DAPP
          </button>

          <button
            onClick={() => setAudioActive(!audioActive)}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.35)', display: 'flex', alignItems: 'center', transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
          >
            {audioActive ? <Volume2 size={14} /> : <VolumeX size={14} />}
          </button>
        </div>

        {/* Animated rainbow bottom border — ChainGPT signature */}
        <div className="navbar-rainbow-border" style={{ position: 'absolute' }} />
      </header>

      {/* Main View Grid */}
      <main style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column' }}>
        
        {/* Render Three.js Mascot */}
        {view === 'landing' && (
          <RobotCanvas 
            scrollProgress={scrollProgress} 
            activeSection={view}
            visorState={visorState}
          />
        )}

        {/* Dynamic page contents */}
        {view === 'landing' && (
          <LandingPage 
            scrollProgress={scrollProgress} 
            onNavigate={(nextView) => setView(nextView)} 
            setVisorState={setVisorState}
          />
        )}

        {view === 'auth' && (
          <AuthPage 
            onAuthSuccess={() => setView('profile')}
            setVisorState={setVisorState}
          />
        )}

        {view === 'profile' && (
          <ProfileBuilder 
            onComplete={handleProfileComplete}
            setVisorState={setVisorState}
          />
        )}

        {view === 'dashboard' && (
          <Dashboard 
            userProfile={userProfile}
            onEnterRoom={handleEnterRoom}
            setVisorState={setVisorState}
          />
        )}

        {view === 'whiteboard' && activeRoom && (
          <WhiteboardRoom 
            roomData={activeRoom}
            onClose={() => setView('dashboard')}
            setVisorState={setVisorState}
          />
        )}

      </main>

      {/* ── ChainGPT-style Multi-Column Mega Footer ── */}
      <footer className="footer-mega">
        <div className="footer-main-grid">
          {/* Col 1: Platform */}
          <div>
            <div className="footer-col-title">Platform</div>
            {['Skill Dashboard', 'Swap Skills', 'Live Whiteboard', 'Profile & Badges', 'Reputation Score', 'Peer Matching'].map(l => (
              <button key={l} className="footer-link" onClick={() => setView('auth')}>{l}</button>
            ))}
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <div className="footer-col-title">Quick Links</div>
            {[
              { label: 'Documentation', id: 'intro' },
              { label: 'Our Ecosystem', id: 'ecosystem' },
              { label: 'Roadmap', id: 'roadmap' },
              { label: 'FAQ', id: 'faq' },
              { label: 'Team', id: 'team' },
              { label: 'Join Community', id: 'faq' },
            ].map(l => (
              <button key={l.label} className="footer-link" onClick={() => scrollToSection(l.id)}>{l.label}</button>
            ))}
          </div>

          {/* Col 3: Legal */}
          <div>
            <div className="footer-col-title">Legal</div>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Eligibility Policy'].map(l => (
              <button key={l} className="footer-link">{l}</button>
            ))}
          </div>

          {/* Col 4: Socials with ↗ arrows (ChainGPT exact style) */}
          <div className="footer-social-col">
            {[
              { name: 'GITHUB', href: 'https://github.com' },
              { name: 'DISCORD', href: '#' },
              { name: 'TWITTER', href: '#' },
              { name: 'LINKEDIN', href: '#' },
              { name: 'YOUTUBE', href: '#' },
              { name: 'TELEGRAM', href: '#' },
              { name: 'INSTAGRAM', href: '#' },
            ].map(s => (
              <a key={s.name} href={s.href} target="_blank" rel="noreferrer" className="footer-social-link">
                {s.name} <span className="footer-social-arrow">↗</span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom-bar">
          <span>© {new Date().getFullYear()} SkillSwap // ChidhiyaGHAR</span>
          <span>All rights reserved by SKILLSWAP.ORG</span>
        </div>
      </footer>
    </>
  );
}

export default App;
