import { useState, useEffect, useRef } from 'react';
import { RobotCanvas } from './components/RobotCanvas';
import { LandingPage } from './components/LandingPage';
import { AuthPage } from './components/AuthPage';
import { ProfileBuilder } from './components/ProfileBuilder';
import { Dashboard } from './components/Dashboard';
import { WhiteboardRoom } from './components/WhiteboardRoom';
import { Volume2, VolumeX, Activity, ShieldCheck } from 'lucide-react';
import { api } from './services/api';

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [audioActive, setAudioActive] = useState(false);
  const cursorRef = useRef<HTMLDivElement | null>(null);

  // Visor states for Three.js robot
  const [visorState, setVisorState] = useState<'eyes' | 'quote' | 'swap' | 'success' | 'camera'>('eyes');

  // Onboarded Profile
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '',
    age: 20,
    college: '',
    branch: '',
    course: '',
    teachingSkills: [],
    learningSkills: [],
  });

  // Whiteboard meet details
  const [activeRoom, setActiveRoom] = useState<{ tutor: string; student: string; skill: string } | null>(null);

  // Announcement banner dismissal
  const [bannerVisible, setBannerVisible] = useState(true);

  // Monitor page scrolling for mascot tracking & natural vertical scrolling progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) {
        setScrollProgress(0);
        return;
      }
      const progress = scrollTop / scrollHeight;
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

  const checkAuthAndSetView = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    try {
      console.log('[Session Check] Fetching profile from backend...');
      const res = await api.profile.getMyProfile();
      console.log('[Session Check] Profile response received:', res);
      if (res.data) {
        const prof = res.data;
        const teaching = prof.user_skills_offered?.map((s: any) => s.skills?.name).filter(Boolean) || [];
        const learning = prof.user_skills_wanted?.map((s: any) => s.skills?.name).filter(Boolean) || [];
        
        setUserProfile({
          name: prof.full_name || prof.users?.username || 'Cyber Node',
          age: 20,
          college: prof.location || 'Grid Network',
          branch: prof.city || 'General Engineering',
          course: prof.state_code || 'B.Tech',
          teachingSkills: teaching.length ? teaching : ['Python', 'React'],
          learningSkills: learning.length ? learning : ['C Language', 'UI/UX Design'],
        });

        setIsLoggedIn(true);

        const isComplete = prof.is_profile_complete || !!(prof.full_name && prof.location && prof.city);
        console.log('[Session Check] Profile complete:', isComplete, 'Routing to:', isComplete ? 'dashboard' : 'profile');

        if (isComplete) {
          setView('dashboard');
        } else {
          setView('profile');
        }
      } else {
        console.warn('[Session Check] Profile data is null, redirecting to landing...');
        localStorage.removeItem('access_token');
        setIsLoggedIn(false);
        setView('landing');
      }
    } catch (err: any) {
      console.error('[Session Check] Failed to retrieve user profile:', err);
      localStorage.removeItem('access_token');
      setIsLoggedIn(false);
      setView('landing');
    }
  };

  // Handle Supabase Auth Redirect hashes (e.g. email confirmation redirect)
  useEffect(() => {
    const handleHashAuth = async () => {
      const hash = window.location.hash;
      if (!hash) {
        // Normal mount flow
        checkAuthAndSetView();
        return;
      }

      const params = new URLSearchParams(hash.substring(1));
      const accessToken = params.get('access_token');
      const refreshToken = params.get('refresh_token');

      if (accessToken) {
        console.log('[Auth Callback] Detected access token in URL hash');
        localStorage.setItem('access_token', accessToken);
        if (refreshToken) {
          localStorage.setItem('refresh_token', refreshToken);
        }
        
        // Clear the hash from address bar for clean URL
        window.history.replaceState(null, '', window.location.pathname);

        checkAuthAndSetView();
        setVisorState('success');
      }
    };

    handleHashAuth();
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

  const handleLogout = async () => {
    try {
      await api.auth.logout();
      setIsLoggedIn(false);
      setVisorState('eyes');
      setView('landing');
    } catch (err) {
      console.error('Logout error:', err);
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

        {/* Right: HUD status + buttons + audio */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px', padding: '0 24px' }}>
          <div className="font-mono" style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.68rem', color: 'rgba(255,255,255,0.35)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Activity size={10} color="var(--color-cyan)" className="pulse-cyan" />
              GRID: <span style={{ color: 'var(--color-green)' }}>ONLINE</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={10} color="var(--color-purple)" />
              NODE: <span style={{ color: 'var(--color-purple)' }}>VERIFIED</span>
            </div>
          </div>

          {isLoggedIn ? (
            <div style={{ display: 'flex', gap: '10px' }}>
              {view !== 'dashboard' && view !== 'whiteboard' && (
                <button 
                  className="cyber-button font-mono" 
                  style={{ padding: '6px 12px', fontSize: '0.7rem', border: '1px solid rgba(0, 240, 255, 0.3)' }}
                  onClick={() => setView('dashboard')}
                >
                  DASHBOARD
                </button>
              )}
              {view !== 'profile' && (
                <button 
                  className="cyber-button font-mono" 
                  style={{ padding: '6px 12px', fontSize: '0.7rem', border: '1px solid rgba(0, 240, 255, 0.3)' }}
                  onClick={() => setView('profile')}
                >
                  PROFILE
                </button>
              )}
              <button 
                className="cyber-button purple font-mono" 
                style={{ padding: '6px 12px', fontSize: '0.7rem', border: '1px solid rgba(189, 0, 255, 0.3)' }}
                onClick={handleLogout}
              >
                LOG OUT
              </button>
            </div>
          ) : (
            view !== 'auth' && (
              <button className="launch-dapp-btn" onClick={() => setView('auth')}>
                <span style={{ fontSize: '0.5rem', letterSpacing: '0.05em', opacity: 0.7 }}>••</span>
                LAUNCH DAPP
              </button>
            )
          )}

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
        <RobotCanvas 
          scrollProgress={scrollProgress} 
          activeSection={view}
          visorState={visorState}
        />

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
            onAuthSuccess={() => checkAuthAndSetView()}
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
