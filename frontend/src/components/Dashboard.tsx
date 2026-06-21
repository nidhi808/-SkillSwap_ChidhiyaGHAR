import React, { useState, useEffect } from 'react';
import { Award, BookOpen, Star, User, Users, Plus, Video, FileText, Send } from 'lucide-react';

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
  setVisorState: (state: 'eyes' | 'quote' | 'swap' | 'success' | 'camera') => void;
}

interface Peer {
  id: string;
  name: string;
  college: string;
  branch: string;
  course: string;
  teachingSkills: string[];
  learningSkills: string[];
  rating: number; // out of 5
  avatar: string;
  reputation: number;
  badges: string[];
}

// Mock peer directories in college database
const MOCK_PEERS: Peer[] = [
  {
    id: 'peer_1',
    name: 'Sanjay Kumar',
    college: 'IIT Delhi',
    branch: 'Computer Science',
    course: 'B.Tech',
    teachingSkills: ['C Language', 'React'],
    learningSkills: ['Python', 'Video Editing'],
    rating: 4.8,
    avatar: '👨‍💻',
    reputation: 92,
    badges: ['C Guru', 'Active Peer']
  },
  {
    id: 'peer_2',
    name: 'Sneha Reddy',
    college: 'IIT Delhi',
    branch: 'Electrical Eng',
    course: 'B.Tech',
    teachingSkills: ['UI/UX Design', '3D Modelling'],
    learningSkills: ['Python', 'C Language'],
    rating: 4.9,
    avatar: '👩‍🎨',
    reputation: 96,
    badges: ['Design Master', 'Elite Tutor']
  },
  {
    id: 'peer_3',
    name: 'Aman Sharma',
    college: 'IIT Delhi',
    branch: 'Mathematics',
    course: 'M.Sc',
    teachingSkills: ['Calculus', 'Linear Algebra'],
    learningSkills: ['React', 'Machine Learning'],
    rating: 4.5,
    avatar: '👨‍🏫',
    reputation: 84,
    badges: ['Math Wizard']
  },
  {
    id: 'peer_4',
    name: 'Riya Gupta',
    college: 'IIT Delhi',
    branch: 'Biotechnology',
    course: 'B.Tech',
    teachingSkills: ['Public Speaking', 'Photoshop'],
    learningSkills: ['Python', 'React'],
    rating: 4.2,
    avatar: '👩‍💼',
    reputation: 75,
    badges: ['Speaker Pro']
  }
];

export const Dashboard: React.FC<DashboardProps> = ({ userProfile, onEnterRoom, setVisorState }) => {
  const [profileScore, setProfileScore] = useState(70);
  const [badges, setBadges] = useState<string[]>(['Novice swap']);
  const [exams, setExams] = useState<{ name: string; score: string }[]>([
    { name: 'Python Basics Assessment', score: '95%' }
  ]);
  const [hackathons, setHackathons] = useState<{ name: string; prize: string }[]>([
    { name: 'HackIndia 2026', prize: 'Top 10 Finalist' }
  ]);

  // Form states
  const [newExamName, setNewExamName] = useState('');
  const [newExamScore, setNewExamScore] = useState('');
  const [newHackName, setNewHackName] = useState('');
  const [newHackPrize, setNewHackPrize] = useState('');

  // Connections / Matches States
  const [connectionStates, setConnectionStates] = useState<Record<string, 'none' | 'pending' | 'accepted'>>({});

  useEffect(() => {
    setVisorState('eyes');
  }, [setVisorState]);

  // Recalculate dynamic profile score based on stats
  useEffect(() => {
    let score = 60;
    score += exams.length * 10;
    score += hackathons.length * 15;
    score += Object.values(connectionStates).filter(s => s === 'accepted').length * 20;
    setProfileScore(Math.min(100, score));

    // Dynamic badge unlocks
    const newBadges = ['Novice Swap'];
    if (exams.length >= 2) newBadges.push('Exam Crusher');
    if (hackathons.length >= 2) newBadges.push('Hackathon Winner');
    if (Object.values(connectionStates).some(s => s === 'accepted')) newBadges.push('Active Tutor');
    setBadges(newBadges);
  }, [exams, hackathons, connectionStates]);

  const handleAddExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExamName || !newExamScore) return;
    setExams([...exams, { name: newExamName, score: newExamScore }]);
    setNewExamName('');
    setNewExamScore('');
    setVisorState('success');
  };

  const handleAddHack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHackName || !newHackPrize) return;
    setHackathons([...hackathons, { name: newHackName, prize: newHackPrize }]);
    setNewHackName('');
    setNewHackPrize('');
    setVisorState('success');
  };

  const handleRequestConnection = (peerId: string) => {
    setConnectionStates(prev => ({ ...prev, [peerId]: 'pending' }));
    setVisorState('swap');

    // Simulate peer acceptance after 3 seconds
    setTimeout(() => {
      setConnectionStates(prev => ({ ...prev, [peerId]: 'accepted' }));
      setVisorState('success');
      alert(`Match accepted! Sanjay Kumar is ready to teach you. You can now launch the tutoring whiteboard!`);
    }, 3000);
  };

  // Algorithm for Match Score calculation:
  // formula: Match Score = (Overlap_Score * 0.6) + (Peer_Rating_Normalized * 0.4)
  const calculateMatchScore = (peer: Peer) => {
    // 1. Overlap calculations
    // How much does user want to learn what peer teaches?
    const userWantsPeerTeaches = userProfile.learningSkills.some(s => peer.teachingSkills.includes(s));
    // How much does peer want to learn what user teaches?
    const peerWantsUserTeaches = peer.learningSkills.some(s => userProfile.teachingSkills.includes(s));
    
    let overlapScore = 0;
    if (userWantsPeerTeaches && peerWantsUserTeaches) {
      overlapScore = 1.0; // Perfect Bidirectional Overlap
    } else if (userWantsPeerTeaches || peerWantsUserTeaches) {
      overlapScore = 0.5; // Single sided Overlap
    }

    // 2. Peer Rating normalized (scale 1 to 5 becomes 0.2 to 1.0)
    const ratingNormalized = peer.rating / 5;

    // Combined Score (out of 100%)
    const finalScore = (overlapScore * 0.6 + ratingNormalized * 0.4) * 100;
    return Math.round(finalScore);
  };

  // Sort mock peers by calculated match score
  const matchedPeers = MOCK_PEERS.map(peer => ({
    ...peer,
    matchScore: calculateMatchScore(peer)
  })).sort((a, b) => b.matchScore - a.matchScore);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '30px', padding: '40px', flex: 1, zIndex: 10, maxWidth: '1400px', width: '100%', margin: '0 auto' }}>
      
      {/* LEFT SIDEBAR: PROFILE SUMMARY & FORMS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Profile Card */}
        <div className="glass-panel cyan-glow" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <div style={{ fontSize: '2.5rem', background: 'rgba(0,240,255,0.1)', padding: '12px', borderRadius: '50%', border: '1px solid rgba(0,240,255,0.2)' }}>
              👤
            </div>
            <div>
              <h3 style={{ color: '#fff', fontSize: '1.25rem' }}>{userProfile.name}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }} className="font-mono">
                {userProfile.course} // {userProfile.branch}
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{userProfile.college}</p>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>REPUTATION SCORE</span>
              <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--color-cyan)', fontWeight: 'bold' }}>{profileScore}/100</span>
            </div>
            <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${profileScore}%`, height: '100%', background: 'linear-gradient(90deg, var(--color-cyan), var(--color-purple))', transition: 'width 0.5s ease-in-out' }}></div>
            </div>
          </div>

          {/* User Badges */}
          <div>
            <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>EARNED BADGES</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {badges.map(badge => (
                <span key={badge} className="badge-neon purple" style={{ fontSize: '0.65rem' }}>
                  <Award size={10} /> {badge}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Form: Submitting Exam Certificates */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h4 className="font-mono" style={{ color: '#fff', fontSize: '1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={16} color="var(--color-cyan)" /> SUBMIT EXAMS / CERTS
          </h4>
          
          <div style={{ maxHeight: '100px', overflowY: 'auto', marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '10px' }}>
            {exams.map((ex, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                <span>{ex.name}</span>
                <span style={{ color: 'var(--color-cyan)' }} className="font-mono">{ex.score}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddExam} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input 
              type="text" 
              className="hud-input" 
              placeholder="Exam / Certification Title" 
              style={{ padding: '8px 12px', fontSize: '0.85rem' }} 
              value={newExamName}
              onChange={(e) => setNewExamName(e.target.value)}
            />
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px' }}>
              <input 
                type="text" 
                className="hud-input" 
                placeholder="Score (e.g. 95%)" 
                style={{ padding: '8px 12px', fontSize: '0.85rem' }} 
                value={newExamScore}
                onChange={(e) => setNewExamScore(e.target.value)}
              />
              <button type="submit" className="cyber-button font-mono" style={{ padding: '8px', fontSize: '0.75rem', justifyContent: 'center' }}>
                <Plus size={14} /> ADD
              </button>
            </div>
          </form>
        </div>

        {/* Form: Add Hackathon Wins */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h4 className="font-mono" style={{ color: '#fff', fontSize: '1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={16} color="var(--color-purple)" /> HACKATHON ACCOMPLISHMENTS
          </h4>

          <div style={{ maxHeight: '100px', overflowY: 'auto', marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '10px' }}>
            {hackathons.map((h, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                <span>{h.name}</span>
                <span style={{ color: 'var(--color-purple)' }} className="font-mono">{h.prize}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddHack} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input 
              type="text" 
              className="hud-input" 
              placeholder="Hackathon Name" 
              style={{ padding: '8px 12px', fontSize: '0.85rem' }} 
              value={newHackName}
              onChange={(e) => setNewHackName(e.target.value)}
            />
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px' }}>
              <input 
                type="text" 
                className="hud-input" 
                placeholder="Prize Won" 
                style={{ padding: '8px 12px', fontSize: '0.85rem' }} 
                value={newHackPrize}
                onChange={(e) => setNewHackPrize(e.target.value)}
              />
              <button type="submit" className="cyber-button purple font-mono" style={{ padding: '8px', fontSize: '0.75rem', justifyContent: 'center' }}>
                <Plus size={14} /> ADD
              </button>
            </div>
          </form>
        </div>

      </div>

      {/* RIGHT SIDE: SKILLS PROFILE & MATCHES PANELS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* User Skills Display */}
        <div className="glass-panel" style={{ padding: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <h4 className="font-mono" style={{ color: 'var(--color-purple)', fontSize: '0.9rem', marginBottom: '12px' }}>
              // SKILLS I AM TEACHING
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {userProfile.teachingSkills.map(skill => (
                <span key={skill} className="badge-neon purple">
                  <BookOpen size={10} /> {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-mono" style={{ color: 'var(--color-cyan)', fontSize: '0.9rem', marginBottom: '12px' }}>
              // SKILLS I AM LEARNING
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {userProfile.learningSkills.map(skill => (
                <span key={skill} className="badge-neon">
                  <User size={10} /> {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Matches List */}
        <div className="glass-panel" style={{ padding: '28px', flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px' }}>
            <h3 className="font-mono" style={{ color: '#fff', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={20} color="var(--color-cyan)" /> NETWORK PEER MATCHES
            </h3>
            <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              FORMULA: OVERLAP(60%) + RATING(40%)
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {matchedPeers.map((peer) => {
              const connectState = connectionStates[peer.id] || 'none';
              return (
                <div 
                  key={peer.id} 
                  className="glass-panel cyan-glow" 
                  style={{ 
                    padding: '20px', 
                    display: 'grid', 
                    gridTemplateColumns: 'auto 1fr auto', 
                    alignItems: 'center', 
                    gap: '20px',
                    background: 'rgba(255,255,255,0.01)',
                    border: '1px solid rgba(255,255,255,0.04)'
                  }}
                >
                  {/* Avatar Icon */}
                  <div style={{ fontSize: '2rem', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                    {peer.avatar}
                  </div>

                  {/* Profile Details */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                      <h4 style={{ color: '#fff', fontSize: '1.05rem' }}>{peer.name}</h4>
                      <span className="badge-neon font-mono" style={{ fontSize: '0.65rem', padding: '2px 6px' }}>
                        {peer.matchScore}% Match
                      </span>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '8px' }}>
                      {peer.course} in {peer.branch} // {peer.college}
                    </p>
                    
                    <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem' }}>
                      <div>
                        <span style={{ color: 'var(--color-purple)', fontWeight: 'bold' }}>Teaches:</span>{' '}
                        <span style={{ color: 'var(--text-primary)' }}>{peer.teachingSkills.join(', ')}</span>
                      </div>
                      <div>
                        <span style={{ color: 'var(--color-cyan)', fontWeight: 'bold' }}>Learns:</span>{' '}
                        <span style={{ color: 'var(--text-primary)' }}>{peer.learningSkills.join(', ')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating & Actions */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#ffc107' }}>
                      <Star size={14} fill="#ffc107" />
                      <span className="font-mono" style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>{peer.rating}</span>
                    </div>

                    {connectState === 'none' && (
                      <button 
                        className="cyber-button font-mono" 
                        style={{ padding: '8px 16px', fontSize: '0.75rem' }}
                        onClick={() => handleRequestConnection(peer.id)}
                      >
                        <Send size={12} /> REQUEST SWAP
                      </button>
                    )}

                    {connectState === 'pending' && (
                      <span 
                        className="font-mono pulse-cyan" 
                        style={{ fontSize: '0.75rem', color: 'var(--color-cyan)', border: '1px solid var(--color-cyan)', padding: '6px 12px', borderRadius: '4px' }}
                      >
                        PENDING ACCEPTANCE...
                      </span>
                    )}

                    {connectState === 'accepted' && (
                      <button 
                        className="cyber-button purple font-mono" 
                        style={{ padding: '8px 16px', fontSize: '0.75rem' }}
                        onClick={() => onEnterRoom({
                          tutor: peer.name,
                          student: userProfile.name,
                          skill: userProfile.learningSkills[0] || peer.teachingSkills[0]
                        })}
                      >
                        <Video size={12} /> ENTER CLASSROOM
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
export default Dashboard;
