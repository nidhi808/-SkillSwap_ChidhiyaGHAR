import { useState, useEffect, useRef } from 'react';

import { LandingPage } from './components/LandingPage';
import { AuthPage } from './components/AuthPage';
import { ProfileBuilder } from './components/ProfileBuilder';
import { Dashboard } from './components/Dashboard';
import { WhiteboardRoom } from './components/WhiteboardRoom';
import { SkillBrowser } from './components/SkillBrowser';
import { ChatPanel } from './components/ChatPanel';
import { SessionScheduler } from './components/SessionScheduler';
import { Leaderboard } from './components/Leaderboard';
import { ReviewModal } from './components/ReviewModal';
import { LiveLecture } from './components/LiveLecture';
import { api } from './services/api';

type AppView = 'landing' | 'auth' | 'profile' | 'dashboard' | 'whiteboard' | 'skills' | 'chat' | 'sessions' | 'leaderboard' | 'live-lecture';

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
  const cursorRef = useRef<HTMLDivElement | null>(null);

  // Visor states for Three.js robot
  const [, setVisorState] = useState<'eyes' | 'quote' | 'swap' | 'success' | 'camera'>('eyes');

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



  // Review modal state
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewTarget, setReviewTarget] = useState({ sessionId: '', peerName: '', peerAvatar: '', skillName: '' });
  void setReviewTarget; // Retain setter reference for future use

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
        const prof = res.data as any;
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
          console.warn('[Session Check] Profile data is null, routing to profile builder...');
          setIsLoggedIn(true);
          setView('profile');
        }
      } catch (err) {
        console.error('[Session Check] Failed to retrieve user profile:', err);
        // Do not clear token on error to prevent aggressive logout during transient backend issues
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
      {/* Top NavBar from Stitch design */}
      <header className="w-full top-0 sticky z-50 bg-surface/80 border-b border-outline-variant backdrop-blur-md">
        <nav className="max-w-container-max mx-auto px-margin-desktop flex justify-between items-center h-20">
          {/* Left Logo */}
          <div className="flex items-center gap-8">
            <div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => { setView('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
              <img src="/logo.png" alt="SkillSwap Logo" className="w-10 h-10 object-contain drop-shadow-[0_0_10px_rgba(0,219,233,0.8)]" />
              <span className="font-headline-md text-headline-md font-bold text-primary tracking-tight">SkillSwap</span>
            </div>

            {/* Center Links (Visible when logged in or for navigation) */}
            <div className="hidden md:flex gap-6 items-center">
              <button 
                onClick={() => setView('landing')}
                className={`font-body-md text-body-md transition-colors duration-200 outline-none border-none bg-transparent cursor-pointer ${
                  view === 'landing' ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                Home
              </button>
              <button 
                onClick={() => setView('skills')}
                className={`font-body-md text-body-md transition-colors duration-200 outline-none border-none bg-transparent cursor-pointer ${
                  view === 'skills' ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                Browse Skills
              </button>
              <button 
                onClick={() => {
                  if (isLoggedIn) {
                    setView('dashboard');
                  } else {
                    setView('auth');
                  }
                }}
                className={`font-body-md text-body-md transition-colors duration-200 outline-none border-none bg-transparent cursor-pointer ${
                  view === 'dashboard' ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                My Matches
              </button>
              <button 
                onClick={() => {
                  if (isLoggedIn) {
                    setView('sessions');
                  } else {
                    setView('auth');
                  }
                }}
                className={`font-body-md text-body-md transition-colors duration-200 outline-none border-none bg-transparent cursor-pointer ${
                  view === 'sessions' ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                Schedule
              </button>
              <button 
                onClick={() => setView('leaderboard')}
                className={`font-body-md text-body-md transition-colors duration-200 outline-none border-none bg-transparent cursor-pointer ${
                  view === 'leaderboard' ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                Leaderboard
              </button>
            </div>
          </div>

          {/* Right Action Block */}
          <div className="flex items-center gap-4">
            <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors bg-transparent border-none cursor-pointer">search</button>
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <button 
                  className="p-2 text-primary hover:text-primary-container transition-colors bg-transparent border-none cursor-pointer flex items-center"
                  onClick={() => setView('live-lecture')}
                  title="Live Lecture"
                >
                  <span className="material-symbols-outlined text-[24px]">cast</span>
                </button>
                {view !== 'chat' && (
                  <button 
                    className="p-2 text-on-surface-variant hover:text-primary transition-colors bg-transparent border-none cursor-pointer flex items-center"
                    onClick={() => setView('chat')}
                    title="Messages"
                  >
                    <span className="material-symbols-outlined text-[24px]">chat</span>
                  </button>
                )}
                
                <div 
                  className="flex items-center gap-2 group cursor-pointer"
                  onClick={() => setView('profile')}
                >
                  <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-primary transition-colors max-w-[100px] truncate">
                    {userProfile.name || 'Profile'}
                  </span>
                  <div className="w-10 h-10 rounded-full border border-primary/20 overflow-hidden">
                    <img 
                      className="w-full h-full object-cover" 
                      src={`https://api.dicebear.com/7.x/bottts/svg?seed=${userProfile.name || 'Peer'}`} 
                      alt="Profile Avatar"
                    />
                  </div>
                </div>

                <button 
                  onClick={handleLogout}
                  className="text-label-sm font-label-sm text-error hover:text-red-400 font-bold bg-transparent border-none cursor-pointer transition-colors ml-2"
                  title="Logout"
                >
                  <span className="material-symbols-outlined text-[20px]">logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setView('auth')}
                  className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors px-4 py-2 bg-transparent border-none cursor-pointer"
                >
                  Login
                </button>
                <button 
                  onClick={() => setView('auth')}
                  className="bg-primary-container text-on-primary font-label-sm text-label-sm px-6 py-2 rounded-lg hover:scale-95 active:scale-90 transition-transform cursor-pointer border-none font-bold"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* Main View Area */}
      <main className="flex-grow flex flex-col relative w-full">
        {/* Render Three.js Mascot ONLY on the landing page */}


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
            onComplete={() => handleProfileComplete(userProfile)}
            setVisorState={setVisorState}
          />
        )}

        {view === 'dashboard' && (
          <Dashboard 
            userProfile={userProfile}
            onEnterRoom={handleEnterRoom}
            onScheduleSession={() => setView('sessions')}
            onNavigate={setView as any}
            setVisorState={setVisorState}
          />
        )}

        {view === 'whiteboard' && activeRoom && (
          <WhiteboardRoom 
            roomId={`${activeRoom.tutor}-${activeRoom.student}`}
            onLeave={() => setView('dashboard')}
            setVisorState={setVisorState}
          />
        )}

        {view === 'skills' && (
          <SkillBrowser 
            setVisorState={setVisorState}
            onRequestSwap={(peerId) => {
              console.log('Swap requested with peer:', peerId);
              setVisorState('swap');
            }}
          />
        )}

        {view === 'chat' && (
          <ChatPanel 
            setVisorState={setVisorState}
          />
        )}

        {view === 'sessions' && (
          <SessionScheduler 
            setVisorState={setVisorState}
          />
        )}

        {view === 'leaderboard' && (
          <Leaderboard 
            setVisorState={setVisorState}
          />
        )}

        {view === 'live-lecture' && (
          <LiveLecture 
            onBack={() => setView('dashboard')}
          />
        )}

        {/* Review Modal — can be triggered from anywhere */}
        <ReviewModal
          isOpen={reviewModalOpen}
          onClose={() => setReviewModalOpen(false)}
          sessionId={reviewTarget.sessionId}
          peerName={reviewTarget.peerName}
          peerAvatar={reviewTarget.peerAvatar}
          skillName={reviewTarget.skillName}
          onSubmit={async (review) => {
            try {
              await api.reviews.submitReview({ session_id: review.sessionId, rating: review.rating, comment: review.comment });
            } catch { /* stub */ }
            setReviewModalOpen(false);
          }}
        />
      </main>

      {/* Stitch Design-compliant Footer */}
      <footer className="w-full mt-section-gap bg-surface-container-lowest border-t border-outline-variant">
        <div className="max-w-container-max mx-auto px-margin-desktop py-16 grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className="md:col-span-4 flex flex-col gap-6 animate-on-scroll">
            <span className="font-headline-md text-headline-md text-primary font-bold">SkillSwap</span>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xs">
              © {new Date().getFullYear()} SkillSwap Lab. Empowering the Spark of Learning through community-driven peer education.
            </p>
            <div className="flex gap-4">
              <a className="material-symbols-outlined text-secondary hover:text-primary transition-colors no-underline cursor-pointer" href="#">public</a>
              <a className="material-symbols-outlined text-secondary hover:text-primary transition-colors no-underline cursor-pointer" href="#">share</a>
              <a className="material-symbols-outlined text-secondary hover:text-primary transition-colors no-underline cursor-pointer" href="#">hub</a>
            </div>
          </div>
          <div className="md:col-span-2">
            <h4 className="font-label-sm text-label-sm text-primary mb-6 tracking-widest uppercase font-bold">Platform</h4>
            <ul className="space-y-4 font-body-md text-body-md text-on-surface-variant list-none p-0 m-0">
              <li><button onClick={() => setView('skills')} className="hover:text-secondary-fixed-dim bg-transparent border-none cursor-pointer text-on-surface-variant transition-colors p-0 text-left">Browse Skills</button></li>
              <li><button onClick={() => setView('leaderboard')} className="hover:text-secondary-fixed-dim bg-transparent border-none cursor-pointer text-on-surface-variant transition-colors p-0 text-left">Leaderboard</button></li>
              <li><a className="hover:text-secondary-fixed-dim transition-colors no-underline text-on-surface-variant" href="#">Safety Center</a></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h4 className="font-label-sm text-label-sm text-primary mb-6 tracking-widest uppercase font-bold">Community</h4>
            <ul className="space-y-4 font-body-md text-body-md text-on-surface-variant list-none p-0 m-0">
              <li><a className="hover:text-secondary-fixed-dim transition-colors no-underline text-on-surface-variant" href="#">Discord</a></li>
              <li><a className="hover:text-secondary-fixed-dim transition-colors no-underline text-on-surface-variant" href="#">Guidelines</a></li>
              <li><a className="hover:text-secondary-fixed-dim transition-colors no-underline text-on-surface-variant" href="#">Help Desk</a></li>
            </ul>
          </div>
          <div className="md:col-span-4 animate-on-scroll">
            <h4 className="font-label-sm text-label-sm text-primary mb-6 tracking-widest uppercase font-bold">Newsletter</h4>
            <p className="font-body-md text-body-md text-on-surface-variant mb-4">Get curated skill matches every Monday.</p>
            <div className="flex gap-2">
              <input className="bg-surface border border-outline-variant rounded-lg px-4 py-2 flex-1 focus:ring-1 focus:ring-primary focus:border-primary outline-none text-on-surface" placeholder="Your email" type="email"/>
              <button className="bg-primary text-on-primary px-4 py-2 rounded-lg font-bold border-none hover:opacity-90 cursor-pointer">Join</button>
            </div>
          </div>
        </div>
        <div className="max-w-container-max mx-auto px-margin-desktop py-8 border-t border-outline-variant text-center">
          <p className="font-label-sm text-label-sm text-outline">Designed with the Spark of Innovation. SkillSwap © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </>
  );
}

export default App;
