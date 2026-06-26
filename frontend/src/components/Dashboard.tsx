import React, { useState, useEffect } from 'react';
import { Plus, Video, Send, Calendar, Check, X } from 'lucide-react';
import { api } from '../services/api';

interface UserProfile {
  name: string;
  age: number;
  college: string;
  branch: string;
  course: string;
  teachingSkills: string[];
  learningSkills: string[];
}

interface DashboardProps {
  userProfile: UserProfile;
  onEnterRoom: (roomData: { tutor: string; student: string; skill: string }) => void;
  onScheduleSession: () => void;
  onNavigate: (view: 'auth' | 'leaderboard' | 'skills' | 'sessions' | 'dashboard' | 'profile') => void;
  setVisorState: (state: 'eyes' | 'quote' | 'swap' | 'success' | 'camera') => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ userProfile, onEnterRoom, onScheduleSession, onNavigate, setVisorState }) => {
  const [profileScore, setProfileScore] = useState(70);
  const [badges, setBadges] = useState<any[]>([]);
  void profileScore;
  void badges;
  const [exams, setExams] = useState<{ id?: string; name: string; score: string }[]>([]);
  const [hackathons, setHackathons] = useState<{ id?: string; name: string; prize: string }[]>([]);

  // Real data state
  const [realProfile, setRealProfile] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'teach' | 'learn'>('teach');
  const [activePanelTab, setActivePanelTab] = useState<'profile' | 'feed' | 'credentials'>('profile');
  
  const [nearbyLearners, setNearbyLearners] = useState<any[]>([]);
  const [nearbyTeachers, setNearbyTeachers] = useState<any[]>([]);
  const [scheduledSessions, setScheduledSessions] = useState<any[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<any>(null);

  // Form states
  const [newExamName, setNewExamName] = useState('');
  const [newExamScore, setNewExamScore] = useState('');
  const [newHackName, setNewHackName] = useState('');
  const [newHackPrize, setNewHackPrize] = useState('');

  // Feed states
  const [feedList, setFeedList] = useState<any[]>([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostBody, setNewPostBody] = useState('');

  // Connections / Matches States
  const [connectionStates, setConnectionStates] = useState<Record<string, 'none' | 'pending' | 'accepted'>>({});

  // Mock pending requests for sidebar
  const [pendingRequests, setPendingRequests] = useState([
    { id: 'req_1', name: 'Elena Vance', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDy41kjio3Gyyx22Sy2eIwtqciB86_BAxv7fr0FA1zhTB330rsyFNyB5tetazK5-EpPbRGI7NuIJ6LJ_MgVKLk9yLP1uBX1b8DdVmIDR4rNKzQpdicxBdMAFxqeq8LqF5XCPD2hJ4dH5c6shKJ8erkk-UDmKpLmZOmH_ZKoAmMhpVdVww1_aS8-75CORUfH4bWt7w_xPJVJQY9QBTfrzXYd-KxHPZ5BvOaHUBWOQfM0pe904H_MWSCAsF4HYyo6qgr3fZcRk6oGZY', skillOffered: 'UI Design', skillWanted: 'React', college: 'RISD' },
    { id: 'req_2', name: 'Marcus Chen', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1BmkFQGbYno-tzgy9wKtnOH9QFIrjf02eqtGFr_pz_mfCZ0r1qCLSlDcgJdcqyRxfzW0hA7Ev37Rb3gG4KNDPtG4tHUcUZ6Uh-5wv3hRu_6nQq_KrlZXxSZP0dUrL3ydpuT9ff77A74sqlVrbyY1iBDgxl_tso8JJpp8NvDuEoPG95evBmgXXbmyeV_qLuN36L5fKzwWsh1BvUKQJ1tR-PoYEwD0u6vZH8Lpgcypchxx_g65MvNhANp-L96Qu2Xze1QZkn_QTt2g', skillOffered: 'Python help', skillWanted: 'SQL', college: 'MIT' },
    { id: 'req_3', name: 'Sasha Grey', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLnAIA7AqW-l3UH_fiBynYiBZPOQxRDPJyKcDaMByAP5g320c1Vi8ZDabE6H-nD6--RfIUEGCfbQEq5NOgnZ7UnSKHw3t95rm_9dJVaN8aQLPQBZOD3ruqnVKz8E7PcD3YIiDAjn5OmnkzM_TspQ5qUVSfAKF28bbtSdhDBmJ5qnu6VoZ4jxIu_2Xjp1B0TnNkpsj_0X3dmtU8RYtKeXViPP73YMtqEL_ZE3HahNxk7wQhkM5dq59-87qKjv-k-pX9vj83Yy7zjCI', skillOffered: 'Portfolio Review', skillWanted: 'Motion Design', college: 'Stanford University' }
  ]);

  // Fetch real matches, profile, education, experience, badges, and feed on mount
  useEffect(() => {
    setVisorState('eyes');
    const loadDashboardData = async () => {
      try {
        const profileRes = await api.profile.getMyProfile();
        if (profileRes.data) {
          setRealProfile(profileRes.data);
          setProfileScore(profileRes.data.reputation_points || 70);
        }

        try {
          const learnersRes = await api.matching.getNearbyLearners();
          setNearbyLearners(learnersRes.data || []);
        } catch (e) {
          console.warn('Failed to load nearby learners:', e);
        }

        try {
          const teachersRes = await api.matching.getNearbyTeachers();
          setNearbyTeachers(teachersRes.data || []);
        } catch (e) {
          console.warn('Failed to load nearby teachers:', e);
        }

        const badgesRes = await api.badges.getMyBadges();
        setBadges(badgesRes.data || []);

        const eduRes = await api.profile.getEducation();
         const parsedExams = (eduRes.data || []).map((edu: any) => {
           const match = edu.description?.match(/Passed with score:\s*(.*)/i);
           const score = match ? match[1] : (edu.description || '');
           return {
             id: edu.id,
             name: edu.degree,
             score: score
           };
         });
         setExams(parsedExams);
 
         const expRes = await api.profile.getExperience();
         const parsedHacks = (expRes.data || []).map((exp: any) => {
           const match = exp.description?.match(/Accomplished:\s*(.*)/i);
           const prize = match ? match[1] : (exp.description || '');
           return {
             id: exp.id,
             name: exp.company,
             prize: prize
           };
         });
         setHackathons(parsedHacks);


        const feedRes = await api.feed.getFeed();
        setFeedList(feedRes.data || []);

        // Load sessions
        try {
          const sessionsRes = await api.sessions.getMySessions();
          setScheduledSessions(sessionsRes.data || []);
        } catch {
          // Fallback static scheduled sessions
          setScheduledSessions([
            { id: '1', skill: 'React Hooks', peer: 'Arjun Mehta', date: '25-06-2026', time: '15:00', status: 'scheduled', meetLink: 'https://meet.google.com/abc-defg-hij' },
            { id: '2', skill: 'Figma Basics', peer: 'Priya Sharma', date: '28-06-2026', time: '11:00', status: 'scheduled' },
          ]);
        }

      } catch (err) {
        console.error('Failed to load dashboard data from backend:', err);
      }
    };
    loadDashboardData();
  }, [setVisorState]);

   // Recalculate dynamic profile score based on stats
   useEffect(() => {
     let score = realProfile?.reputation_points || 60;
     score += exams.length * 5;
     score += hackathons.length * 10;
     
     // Use a timeout or requestAnimationFrame to avoid synchronous setState in effect if needed,
     // but better to just use useMemo for derived state if possible.
     // However, since this is a side effect of other state changes, we'll stick to a safe update.
     const updateScore = () => setProfileScore(Math.min(100, score));
     const timer = setTimeout(updateScore, 0);
     return () => clearTimeout(timer);
   }, [exams, hackathons, realProfile]);


  const handleAddExam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExamName || !newExamScore) return;

    try {
      const res = await api.profile.addEducation({
        institution: userProfile.college || 'College',
        degree: newExamName,
        field_of_study: userProfile.branch || 'General',
        start_year: new Date().getFullYear() - 2,
        end_year: new Date().getFullYear(),
        description: `Passed with score: ${newExamScore}`
      });
      setExams([...exams, { id: res.data?.id, name: newExamName, score: newExamScore }]);
      setNewExamName('');
      setNewExamScore('');
      setVisorState('success');
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddHack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHackName || !newHackPrize) return;

    try {
      const res = await api.profile.addExperience({
        company: newHackName,
        title: 'Participant / Winner',
        start_date: new Date().toISOString().substring(0, 10),
        is_current: false,
        description: `Accomplished: ${newHackPrize}`
      });
      setHackathons([...hackathons, { id: res.data?.id, name: newHackName, prize: newHackPrize }]);
      setNewHackName('');
      setNewHackPrize('');
      setVisorState('success');
    } catch (err) {
      console.error(err);
    }
  };

  const handleRequestConnection = async (peerId: string, peerName: string) => {
    setConnectionStates(prev => ({ ...prev, [peerId]: 'pending' }));
    setVisorState('swap');

    try {
      await api.matching.sendMatchRequest(peerId);
      setTimeout(() => {
        setConnectionStates(prev => ({ ...prev, [peerId]: 'accepted' }));
        setVisorState('success');
        alert(`Match accepted! ${peerName} is ready to teach you. You can now enter the tutoring classroom!`);
      }, 2500);
    } catch (err: any) {
      console.warn('API connection request error:', err.message);
      setConnectionStates(prev => ({ ...prev, [peerId]: 'accepted' }));
      setVisorState('success');
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim()) return;

    try {
      const res = await api.feed.createPost({
        title: newPostTitle,
        body: newPostBody
      });
      if (res.data) {
        setFeedList(prev => [res.data, ...prev]);
        setNewPostTitle('');
        setNewPostBody('');
        setVisorState('success');
      }
    } catch (err) {
      console.error('Failed to create post:', err);
    }
  };

  const handleAcceptRequest = (id: string, name: string) => {
    setPendingRequests(prev => prev.filter(r => r.id !== id));
    setVisorState('success');
    alert(`Request accepted from ${name}! They have been added to your Matched Peers.`);
  };

  const handleRejectRequest = (id: string) => {
    setPendingRequests(prev => prev.filter(r => r.id !== id));
    setVisorState('eyes');
  };

  const displayPeers = (activeTab === 'teach' ? nearbyLearners : nearbyTeachers).map((s: any) => {
    const prof = s.profile || {};
    const skillListOffered = s.skillsOffered && s.skillsOffered.length > 0
      ? s.skillsOffered
      : (prof.user_skills_offered?.map((so: any) => so.skills?.name).filter(Boolean) || [userProfile.learningSkills[0] || 'Python']);

    const skillListWanted = s.skillsWanted && s.skillsWanted.length > 0
      ? s.skillsWanted
      : (prof.user_skills_wanted?.map((sw: any) => sw.skills?.name).filter(Boolean) || [userProfile.teachingSkills[0] || 'React']);

    return {
      id: s.userId || s.id,
      name: prof.full_name || s.username || 'Co-learner Node',
      college: prof.location || 'Grid Network',
      branch: prof.city || 'General Engineering',
      course: prof.state_code || 'B.Tech',
      teachingSkills: skillListOffered,
      learningSkills: skillListWanted,
      rating: prof.avg_rating || 4.7,
      avatar: prof.avatar_url || `https://api.dicebear.com/7.x/bottts/svg?seed=${s.username || 'Peer'}`,
      reputation: prof.reputation_points || 90,
      badges: s.badges || (s.isLive ? ['LIVE NOW', 'Verified Peer'] : ['Verified Peer']),
      matchScore: Math.round(s.matchScore || (s.isLive ? 95 : 85)),
      distance: s.distance !== undefined ? s.distance : 1.4,
      isLive: s.isLive
    };
  });

  const activeMatch = selectedMatch || displayPeers[0] || null;

  return (
    <div className="flex-grow flex flex-col md:flex-row max-w-7xl w-full mx-auto px-4 md:px-16 py-8 pt-24 gap-6 overflow-hidden text-on-surface">
      <div className="noise-overlay"></div>

      {/* Sidebar: Chat / Match Requests */}
      <aside className="w-full md:w-80 flex flex-col gap-6 h-full flex-shrink-0">
        <div className="flex items-center justify-between">
          <h2 className="font-headline-md text-headline-md font-bold text-on-surface">Requests</h2>
          {pendingRequests.length > 0 && (
            <span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full text-label-sm font-bold">
              {pendingRequests.length} New
            </span>
          )}
        </div>
        <div className="flex flex-col gap-3 overflow-y-auto pr-2 max-h-[450px] md:max-h-[600px] custom-scrollbar">
          {pendingRequests.length > 0 ? (
            pendingRequests.map((req) => (
              <div key={req.id} className="glass-card p-4 rounded-xl flex flex-col gap-3 bg-surface-container/60 hover:bg-surface-container border border-outline-variant/60 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-outline-variant">
                    <img className="w-full h-full object-cover" src={req.avatar} alt={req.name} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-body-md font-semibold text-on-surface truncate">{req.name}</p>
                    <p className="text-label-sm text-on-surface-variant truncate font-sans">{req.college}</p>
                  </div>
                </div>
                <div className="space-y-1 text-xs text-on-surface-variant font-sans">
                  <p><strong className="text-secondary">Offers:</strong> {req.skillOffered}</p>
                  <p><strong className="text-primary">Wants:</strong> {req.skillWanted}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-outline-variant/20">
                  <button 
                    onClick={() => handleAcceptRequest(req.id, req.name)}
                    className="py-1 px-3 bg-primary text-on-primary rounded text-xs font-bold hover:scale-105 active:scale-95 transition-all outline-none border-none cursor-pointer flex items-center justify-center gap-1"
                  >
                    <Check size={12} /> Accept
                  </button>
                  <button 
                    onClick={() => handleRejectRequest(req.id)}
                    className="py-1 px-3 bg-surface-container-highest/60 hover:bg-surface-container text-on-surface-variant rounded text-xs font-bold transition-all outline-none border-none cursor-pointer flex items-center justify-center gap-1"
                  >
                    <X size={12} /> Reject
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-xs text-on-surface-variant bg-surface-container/20 border border-dashed border-outline-variant rounded-xl font-mono">
              NO PENDING REQUESTS
            </div>
          )}
        </div>

        {/* System operational / status card */}
        <div className="mt-auto p-6 rounded-2xl bg-gradient-to-br from-primary-fixed-variant to-secondary-container text-on-primary-fixed">
          <span className="material-symbols-outlined text-4xl mb-2 text-primary">auto_awesome</span>
          <p className="font-headline-md font-bold text-lg mb-2 text-primary">Level Up Fast!</p>
          <p className="text-label-sm opacity-90 leading-relaxed mb-4 font-sans">Complete your Profile Strengths to unlock 3x more relevant matches.</p>
          <button className="w-full py-2 bg-on-primary text-primary-container rounded-lg font-bold text-label-sm hover:opacity-90 transition-opacity border-none cursor-pointer">Improve Profile</button>
        </div>
      </aside>

       {/* Main Canvas */}
       <section className="flex-grow flex flex-col gap-6 min-w-0">
         
         {/* Welcome Header & Quick Actions */}
         <div className="flex flex-col gap-6">
           <div className="flex flex-col">
             <h1 className="font-display-lg text-headline-lg text-primary">Welcome back, {userProfile.name}!</h1>
             <p className="text-body-md text-on-surface-variant">Ready to expand your horizons today?</p>
           </div>

           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <button 
               onClick={() => onNavigate('skills')}
               className="p-4 rounded-2xl bg-surface-container border border-outline-variant/50 hover:border-primary/50 hover:bg-surface-container-high transition-all flex flex-col items-center gap-2 group"
             >
               <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">explore</span>
               <span className="font-label-sm font-bold text-on-surface">Explore Skills</span>
             </button>
             <button 
               onClick={() => onNavigate('profile')}
               className="p-4 rounded-2xl bg-surface-container border border-outline-variant/50 hover:border-secondary/50 hover:bg-surface-container-high transition-all flex flex-col items-center gap-2 group"
             >
               <span className="material-symbols-outlined text-secondary group-hover:scale-110 transition-transform">person</span>
               <span className="font-label-sm font-bold text-on-surface">My Profile</span>
             </button>
             <button 
               onClick={() => onNavigate('leaderboard')}
               className="p-4 rounded-2xl bg-surface-container border border-outline-variant/50 hover:border-tertiary-fixed-dim/50 hover:bg-surface-container-high transition-all flex flex-col items-center gap-2 group"
             >
               <span className="material-symbols-outlined text-tertiary-fixed-dim group-hover:scale-110 transition-transform">emoji_events</span>
               <span className="font-label-sm font-bold text-on-surface">Leaderboard</span>
             </button>
             <button 
               onClick={onScheduleSession}
               className="p-4 rounded-2xl bg-surface-container border border-outline-variant/50 hover:border-primary/50 hover:bg-surface-container-high transition-all flex flex-col items-center gap-2 group"
             >
               <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">calendar_add</span>
               <span className="font-label-sm font-bold text-on-surface">Schedule</span>
             </button>
           </div>
         </div>

         {/* Horizontal Matches List */}
         <div className="flex flex-col gap-4">

          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
            <h1 className="font-headline-xl text-headline-xl text-primary font-bold">Your Top Matches</h1>
            <div className="flex gap-2">
              <button 
                onClick={() => { setActiveTab('teach'); setSelectedMatch(null); }}
                className={`px-4 py-1.5 rounded-full border text-label-sm font-label-sm cursor-pointer transition-all ${
                  activeTab === 'teach' ? 'border-primary bg-primary/10 text-primary shadow-[0_0_12px_rgba(0,219,233,0.3)]' : 'border-outline-variant hover:border-primary text-on-surface-variant bg-transparent'
                }`}
              >
                Learners Nearby
              </button>
              <button 
                onClick={() => { setActiveTab('learn'); setSelectedMatch(null); }}
                className={`px-4 py-1.5 rounded-full border text-label-sm font-label-sm cursor-pointer transition-all ${
                  activeTab === 'learn' ? 'border-secondary bg-secondary/10 text-secondary shadow-[0_0_12px_rgba(233,179,255,0.3)]' : 'border-outline-variant hover:border-secondary text-on-surface-variant bg-transparent'
                }`}
              >
                Mentors Live
              </button>
            </div>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {displayPeers.length > 0 ? (
              displayPeers.map((peer) => {
                const isActive = activeMatch?.id === peer.id;
                return (
                  <div 
                    key={peer.id} 
                    onClick={() => setSelectedMatch(peer)}
                    className={`min-w-[240px] glass-card p-5 rounded-2xl cursor-pointer transition-all flex flex-col justify-between ${
                      isActive 
                        ? 'border-primary bg-surface-container-high scale-105 border-2 shadow-[0_0_20px_rgba(0,219,233,0.15)]' 
                        : 'bg-surface-container/60 hover:bg-surface-container border border-outline-variant/60'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden border border-outline-variant">
                        <img className="w-full h-full object-cover" src={peer.avatar} alt={peer.name} />
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        isActive ? 'bg-primary text-on-primary' : 'bg-surface-container-highest text-on-surface-variant border border-outline-variant'
                      }`}>
                        {peer.matchScore}% Match
                      </span>
                    </div>
                    <div>
                      <p className="font-headline-md text-lg text-on-surface truncate">{peer.name}</p>
                      <p className="text-label-sm text-on-surface-variant truncate font-sans">{peer.college}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-6 text-center text-xs text-on-surface-variant bg-surface-container/20 border border-dashed border-outline-variant rounded-xl font-mono w-full">
                NO ACTIVE PEER MATCHES DETECTED
              </div>
            )}
          </div>
        </div>

        {/* Detailed Panel Canvas */}
        {activeMatch && (
          <div className="flex-grow glass-card rounded-3xl p-8 relative overflow-hidden bg-surface-container-low/50 border border-outline-variant/50 flex flex-col gap-6">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/5 blur-[100px] rounded-full pointer-events-none"></div>
            
            {/* Header Tabs */}
            <div className="flex gap-4 border-b border-outline-variant/30 pb-4 relative z-10">
              <button 
                onClick={() => setActivePanelTab('profile')}
                className={`font-label-sm text-label-sm pb-2 border-b-2 cursor-pointer transition-all bg-transparent border-none ${
                  activePanelTab === 'profile' ? 'border-primary text-primary font-bold' : 'border-transparent text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Match Profile
              </button>
              <button 
                onClick={() => setActivePanelTab('credentials')}
                className={`font-label-sm text-label-sm pb-2 border-b-2 cursor-pointer transition-all bg-transparent border-none ${
                  activePanelTab === 'credentials' ? 'border-primary text-primary font-bold' : 'border-transparent text-on-surface-variant hover:text-on-surface'
                }`}
              >
                My Credentials
              </button>
              <button 
                onClick={() => setActivePanelTab('feed')}
                className={`font-label-sm text-label-sm pb-2 border-b-2 cursor-pointer transition-all bg-transparent border-none ${
                  activePanelTab === 'feed' ? 'border-primary text-primary font-bold' : 'border-transparent text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Activity Broadcasts
              </button>
            </div>

            {/* TAB CONTENT: PROFILE */}
            {activePanelTab === 'profile' && (
              <div className="relative z-10 flex flex-col lg:flex-row gap-12 flex-grow">
                {/* Left: Info */}
                <div className="flex flex-col gap-8 lg:w-1/3">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <h3 className="font-headline-xl text-3xl text-on-surface leading-none">{activeMatch.name}</h3>
                      <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                    </div>
                    <p className="text-body-md text-on-surface-variant leading-relaxed font-sans">
                      Enrolled in {activeMatch.course} ({activeMatch.branch}) at {activeMatch.college}. Dedicated to building and swapping knowledge with peer students.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <p className="font-label-sm text-primary tracking-widest uppercase">Verified Badges</p>
                    <div className="flex flex-wrap gap-2">
                      <div className="rainbow-border rounded-full p-[1px]">
                        <div className="rainbow-content rounded-full px-4 py-1.5 flex items-center gap-2 bg-surface-container">
                          <span className="material-symbols-outlined text-lg text-primary">terminal</span>
                          <span className="text-label-sm text-on-surface">{activeMatch.teachingSkills[0] || 'Python'} Mentor</span>
                        </div>
                      </div>
                      {activeMatch.badges.map((b: string, bi: number) => (
                        <div key={bi} className="bg-surface-container-highest rounded-full px-4 py-1.5 flex items-center gap-2 border border-outline-variant text-on-surface-variant">
                          <span className="material-symbols-outlined text-lg text-secondary">workspace_premium</span>
                          <span className="text-label-sm">{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {connectionStates[activeMatch.id] === 'accepted' ? (
                    <button 
                      onClick={() => onEnterRoom({
                        tutor: activeMatch.name,
                        student: userProfile.name,
                        skill: userProfile.learningSkills[0] || activeMatch.teachingSkills[0]
                      })}
                      className="mt-4 py-4 bg-secondary text-on-secondary rounded-xl font-bold font-headline-md text-center hover:shadow-[0_0_20px_rgba(189,0,255,0.4)] transition-all flex items-center justify-center gap-3 border-none cursor-pointer active:scale-95"
                    >
                      <span className="material-symbols-outlined">video_chat</span>
                      Enter Lab Classroom
                    </button>
                  ) : connectionStates[activeMatch.id] === 'pending' ? (
                    <div className="mt-4 py-4 bg-surface-container-highest border border-outline-variant text-primary text-center font-bold font-headline-md rounded-xl animate-pulse tracking-wider">
                      Request Pending...
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleRequestConnection(activeMatch.id, activeMatch.name)}
                      className="mt-4 py-4 bg-primary text-on-primary rounded-xl font-bold font-headline-md text-center hover:shadow-[0_0_20px_rgba(0,219,233,0.4)] transition-all flex items-center justify-center gap-3 border-none cursor-pointer active:scale-95"
                    >
                      <span className="material-symbols-outlined">sync_alt</span>
                      Request Swap Session
                    </button>
                  )}
                </div>

                {/* Right: History & Stats */}
                <div className="flex-grow flex flex-col gap-10">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-2xl bg-surface-container/30 border border-outline-variant/40">
                      <p className="text-label-sm text-on-surface-variant mb-1 font-sans">Reputation Points</p>
                      <p className="text-headline-md font-bold text-primary">{activeMatch.reputation}</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-surface-container/30 border border-outline-variant/40">
                      <p className="text-label-sm text-on-surface-variant mb-1 font-sans">Avg. Rating</p>
                      <p className="text-headline-md font-bold text-secondary">{activeMatch.rating}/5.0</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-surface-container/30 border border-outline-variant/40">
                      <p className="text-label-sm text-on-surface-variant mb-1 font-sans">Match Distance</p>
                      <p className="text-headline-md font-bold text-on-surface">{activeMatch.distance} km</p>
                    </div>
                  </div>

                  {/* Teaching History */}
                  <div className="flex flex-col gap-6">
                    <h4 className="font-headline-md text-xl text-on-surface flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">history</span>
                      Teaching Details & Skills
                    </h4>
                    <div className="space-y-4 font-sans text-on-surface-variant text-sm">
                      <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/30 flex gap-4 items-start">
                        <span className="material-symbols-outlined text-primary text-xl mt-0.5">menu_book</span>
                        <div>
                          <p className="font-bold text-on-surface">Available Offerd Skills</p>
                          <p className="text-xs mt-1 text-on-surface-variant">{activeMatch.teachingSkills.join(', ')}</p>
                        </div>
                      </div>
                      <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/30 flex gap-4 items-start">
                        <span className="material-symbols-outlined text-secondary text-xl mt-0.5">psychology</span>
                        <div>
                          <p className="font-bold text-on-surface">Learning Interests</p>
                          <p className="text-xs mt-1 text-on-surface-variant">{activeMatch.learningSkills.join(', ')}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Spectrum of Learning Progress */}
                  <div className="mt-auto p-4 border border-outline-variant/40 rounded-2xl">
                    <div className="flex justify-between text-label-sm mb-2 px-1">
                      <span className="text-primary">Foundational</span>
                      <span className="text-secondary">Expert Mastery</span>
                    </div>
                    <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary via-secondary to-secondary-fixed shadow-[0_0_10px_rgba(0,219,233,0.5)]" style={{ width: `${activeMatch.reputation}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: CREDENTIALS */}
            {activePanelTab === 'credentials' && (
              <div className="relative z-10 flex-grow flex flex-col md:flex-row gap-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {/* Academic Exams */}
                <div className="flex-1 bg-surface-container/30 border border-outline-variant/40 rounded-2xl p-6 space-y-4">
                  <h4 className="font-headline-md text-sm font-bold text-on-surface uppercase tracking-wider border-b border-outline-variant/20 pb-2 flex justify-between items-center">
                    <span>Verify Academic Exams</span>
                    <span className="text-primary text-xs tracking-normal">Score +5 Rep</span>
                  </h4>
                  <form onSubmit={handleAddExam} className="space-y-3">
                    <input 
                      type="text"
                      required
                      className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-xs text-on-surface outline-none focus:border-primary"
                      placeholder="Degree / Exam Name (e.g. Calculus I)"
                      value={newExamName}
                      onChange={(e) => setNewExamName(e.target.value)}
                    />
                    <input 
                      type="text"
                      required
                      className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-xs text-on-surface outline-none focus:border-primary"
                      placeholder="Final Grade / Score (e.g. A+ / 9.5 CGPA)"
                      value={newExamScore}
                      onChange={(e) => setNewExamScore(e.target.value)}
                    />
                    <button 
                      type="submit" 
                      className="py-1.5 px-4 bg-primary text-on-primary rounded text-xs font-bold border-none cursor-pointer hover:shadow-lg transition-all"
                    >
                      Add Academic Record
                    </button>
                  </form>
                  <div className="space-y-2 pt-2 max-h-40 overflow-y-auto custom-scrollbar">
                    {exams.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs p-2 bg-surface-container-lowest/80 rounded border border-outline-variant/30 font-sans">
                        <span className="font-semibold text-on-surface">{item.name}</span>
                        <span className="font-mono text-primary font-bold">{item.score}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hackathon Wins */}
                <div className="flex-1 bg-surface-container/30 border border-outline-variant/40 rounded-2xl p-6 space-y-4">
                  <h4 className="font-headline-md text-sm font-bold text-on-surface uppercase tracking-wider border-b border-outline-variant/20 pb-2 flex justify-between items-center">
                    <span>Verify Hackathon Wins</span>
                    <span className="text-secondary text-xs tracking-normal">Score +10 Rep</span>
                  </h4>
                  <form onSubmit={handleAddHack} className="space-y-3">
                    <input 
                      type="text"
                      required
                      className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-xs text-on-surface outline-none focus:border-secondary"
                      placeholder="Hackathon Name (e.g. Smart India Hackathon)"
                      value={newHackName}
                      onChange={(e) => setNewHackName(e.target.value)}
                    />
                    <input 
                      type="text"
                      required
                      className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-xs text-on-surface outline-none focus:border-secondary"
                      placeholder="Prize / Position (e.g. Winner / 1st Runner Up)"
                      value={newHackPrize}
                      onChange={(e) => setNewHackPrize(e.target.value)}
                    />
                    <button 
                      type="submit" 
                      className="py-1.5 px-4 bg-secondary text-on-secondary rounded text-xs font-bold border-none cursor-pointer hover:shadow-lg transition-all"
                    >
                      Add Achievement
                    </button>
                  </form>
                  <div className="space-y-2 pt-2 max-h-40 overflow-y-auto custom-scrollbar">
                    {hackathons.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs p-2 bg-surface-container-lowest/80 rounded border border-outline-variant/30 font-sans">
                        <span className="font-semibold text-on-surface">{item.name}</span>
                        <span className="font-mono text-secondary font-bold">{item.prize}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: COMMUNITY FEED */}
            {activePanelTab === 'feed' && (
              <div className="relative z-10 flex-grow flex flex-col gap-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {/* Broadcast Form */}
                <form onSubmit={handleCreatePost} className="p-4 bg-surface-container-low/50 rounded-xl border border-outline-variant/40 space-y-3">
                  <span className="font-label-sm text-[10px] text-on-surface-variant block tracking-wider uppercase">Broadcasting Node Transmission</span>
                  <input 
                    type="text"
                    required
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-xs text-on-surface outline-none focus:border-primary"
                    placeholder="Title / Topic summary..."
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                  />
                  <textarea 
                    rows={2}
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-xs text-on-surface outline-none focus:border-primary font-sans"
                    placeholder="What are you working on or looking for?"
                    value={newPostBody}
                    onChange={(e) => setNewPostBody(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <button 
                      type="submit"
                      className="py-1.5 px-5 bg-secondary text-on-secondary rounded font-label-sm text-xs font-bold border-none cursor-pointer hover:opacity-90 transition-opacity"
                    >
                      <Send size={10} className="inline mr-1" /> Broadcast
                    </button>
                  </div>
                </form>

                {/* Broadcast Feed list */}
                <div className="space-y-3">
                  {feedList.length > 0 ? (
                    feedList.map((activity) => {
                      const isCustomPost = activity.type === 'post';
                      const actorName = activity.user_profile?.full_name || 'System Grid';
                      const avatarSeed = activity.user_profile?.username || actorName;
                      
                      return (
                        <div 
                          key={activity.id} 
                          className={`p-4 rounded-xl border ${isCustomPost ? 'border-primary/20 bg-primary/5' : 'border-secondary/20 bg-secondary/5'} flex gap-3 items-start font-sans`}
                        >
                          <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant bg-surface-container flex-shrink-0">
                            <img className="w-full h-full object-cover" src={`https://api.dicebear.com/7.x/bottts/svg?seed=${avatarSeed}`} alt="Actor" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap text-xs text-on-surface-variant">
                              <span className="font-semibold text-on-surface">{actorName}</span>
                              <span>•</span>
                              <span>{new Date(activity.created_at).toLocaleDateString()}</span>
                              <span className="text-[9px] font-label-sm px-1.5 py-0.25 bg-surface-container border border-outline-variant uppercase rounded">
                                {activity.type}
                              </span>
                            </div>
                            <h5 className="font-bold text-sm text-on-surface mt-2 mb-1">{activity.title}</h5>
                            {activity.body && (
                              <p className="text-xs text-on-surface-variant leading-relaxed">{activity.body}</p>
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-6 text-xs text-on-surface-variant font-mono">
                      NO TRANSMISSIONS YET
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        )}

        {/* Scheduled Sessions list */}
        <div className="glass-card p-6 rounded-2xl bg-surface-container-low/60 border border-outline-variant/60 flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-outline-variant/20 pb-3">
            <h3 className="font-headline-md text-base text-on-surface font-bold flex items-center gap-2">
              <Calendar size={16} className="text-primary" /> Upcoming Sessions
            </h3>
            <button 
              onClick={onScheduleSession}
              className="py-1.5 px-4 border border-primary/45 rounded text-primary hover:bg-primary/5 text-xs font-semibold flex items-center gap-1 cursor-pointer outline-none bg-transparent"
            >
              <Plus size={12} /> Schedule New
            </button>
          </div>
          <div className="space-y-3 max-h-56 overflow-y-auto pr-1 custom-scrollbar font-sans">
            {scheduledSessions.length > 0 ? (
              scheduledSessions.map((session) => (
                <div key={session.id} className="p-3 bg-surface-container-lowest/80 rounded-xl border border-outline-variant/30 flex justify-between items-center text-sm">
                  <div>
                    <h4 className="font-semibold text-on-surface text-sm">{session.skill}</h4>
                    <p className="text-xs text-on-surface-variant mt-0.5 font-mono">
                      with {session.peer} • {session.date} @ {session.time}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-secondary-container/25 text-secondary text-[10px] rounded uppercase font-mono tracking-wider font-semibold">
                      {session.status}
                    </span>
                    {session.meetLink && (
                      <a href={session.meetLink} target="_blank" rel="noopener noreferrer" className="p-1.5 hover:bg-surface-container rounded-lg text-primary flex items-center">
                        <Video size={14} />
                      </a>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-xs text-on-surface-variant font-mono">
                NO UPCOMING SESSIONS SCHEDULED
              </div>
            )}
          </div>
        </div>

      </section>
    </div>
  );
};

export default Dashboard;
