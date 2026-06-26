import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

interface SkillBrowserProps {
  setVisorState: (state: 'eyes' | 'quote' | 'swap' | 'success' | 'camera') => void;
  onRequestSwap: (peerId: string) => void;
}

interface PeerCard {
  id: string;
  name: string;
  avatar: string;
  college: string;
  branch: string;
  rating: number;
  skillsOffered: string[];
  skillsWanted: string[];
  matchScore: number;
  activeStatus: string;
  isActiveNow: boolean;
}

export const SkillBrowser: React.FC<SkillBrowserProps> = ({ setVisorState, onRequestSwap }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeProficiency, setActiveProficiency] = useState('Any Level');
  const [peers, setPeers] = useState<PeerCard[]>([]);
  const [loading, setLoading] = useState(true);

  // High-fidelity stub data from the mockup
  const stubPeers: PeerCard[] = [
    { 
      id: 'p1', 
      name: 'Alex Chen', 
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAE7lVv4YQWOKqVShZbWKUUb7mUQsW9uSRy0bRmIdetJCCrPcohuinnYS7_7mWJDHb8o9Qj5n-TUKFUd20NtIG_nNqX9ZIbyWpa0Fgx3Gpy5mEQu5Fyj_0PZ9Pr3aFpShqJvjTL76pmC3VUEQPYJnYCUTcFKAcL8wOjiacYdl6tdtcuShaVJYDCjCw67PDNCrkHuy1dJAX2P9tBDqR2_kMxUEwjKiSvfejmZMbsHy9udZyig-xIsKPSivuMS7OaRT2XRYtuYVYzOm8', 
      college: 'Stanford University', 
      branch: 'CSE', 
      rating: 4.9, 
      skillsOffered: ['React Native', 'Typescript'], 
      skillsWanted: ['Motion Design'], 
      matchScore: 95,
      activeStatus: 'Active now',
      isActiveNow: true
    },
    { 
      id: 'p2', 
      name: 'Sarah Miller', 
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3W0jGPgDQ1zRebkA0bLj69SZl_vQmY5Ug3Jw7IK4WNEad7Cdof1YK6TghY1bKFmhlWlAVOPmAR2MMI9Fto9nFN8E9LtSlomwFG-SNedi0-Rs6COgIVIM5-PpIw-wvHRULEyDCGbj3Aojm-WEQ4pjf3Z38K4EXfGjl5RBJmhQQKoLPzJnq2WkMFovhdxkLFswpK1Bgec4sVV8i1nQvO9YSkL90tr7_Lc_zOll7RRIJ5gLaGsuYZMjKZ0HagHmsOAXvXv0m2zzVRTc', 
      college: 'RISD', 
      branch: 'Design', 
      rating: 5.0, 
      skillsOffered: ['UX Strategy', 'Figma'], 
      skillsWanted: ['Python Basics'], 
      matchScore: 98,
      activeStatus: 'Last active 2h ago',
      isActiveNow: false
    },
    { 
      id: 'p3', 
      name: 'Liam Park', 
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkGGNllLaKNcu0ntyORo7Mjj-RpK_WyM1leM4xWO1JkJuoxBMXgZ0OFjMzxhfBbjjGLjBq_sF-DdprAW7rqr6L2zK1oaGWR8GoC6wI7Y_QSLHz3HZrGvLEQFYJxKXia8YiNgqujx_8FyyaainPSwbD7e2-5MJydjs1so-Z-u7kzkte2xh41Pe_11x51UhZ7DFDWp8Hya6mIO_nRGnv6WZmKQWAWCJNlOGsy1jNXgOLIltHtithjL-VUIZ4lFhebTjCZUVDzZYBd6E', 
      college: 'MIT', 
      branch: 'Mathematics', 
      rating: 4.7, 
      skillsOffered: ['Data Structures', 'Algorithms'], 
      skillsWanted: ['Public Speaking', 'French'], 
      matchScore: 90,
      activeStatus: 'Active now',
      isActiveNow: true
    },
    { 
      id: 'p4', 
      name: 'Elena Rodriguez', 
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAknH5DvSOdMk9sV4c9OVXiUYC3FapTTf-ZeqDHIXpA7GgUdFdXGKuu46RNfrdKYTVCWXcxiHsj4OA6vQwvDpG_sW-e9ItG9z-fuZy6q2ColpUxpQ162z4LsA9s4YIweJBzOAjNCnw5stYRlgDz2aaZc3vcjZw21FpXfmjdbLQ9fHesy9d4EkIFfyknjCOs_9jeF35JESvNP9iCHpe9rLgF_YLACTckuB2BlZUlc3lXylwfyJX2LZfUvlkaFHhy-Y68hRzYxG8iizk', 
      college: 'UCLA', 
      branch: 'Literature', 
      rating: 4.8, 
      skillsOffered: ['Spanish', 'Creative Writing'], 
      skillsWanted: ['3D Modeling'], 
      matchScore: 85,
      activeStatus: 'Last active 5m ago',
      isActiveNow: false
    },
    { 
      id: 'p5', 
      name: 'Marcus Wu', 
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1mtKyLCJaNnhpNRTtT9S-HhZd8yW6rLk7wgNAJI2Y-TeFfF7WfhzvNTq63PeDLZRh7y4JSNxy_vUA4XWRRXJIT8pVtjYdgVK08g1ZLNxkCv2XEHucu7TITrPhZndedkdd8h76ZQ3AgaYU7Gg3kxQHzD2ZM4vKAoWjpRIWtfUsS0fg4ckqlHbFMl8ssxYvARA9Gs7EAsW6hhPCea5-_RyTWoqgSM8v8dNRIwq53iORmcwY4OTCBNw1vbCNnueweexW-xpC1QfyZx4', 
      college: 'Georgia Tech', 
      branch: 'CSE', 
      rating: 4.9, 
      skillsOffered: ['Solidity', 'Cryptography'], 
      skillsWanted: ['Jazz Piano'], 
      matchScore: 92,
      activeStatus: 'Last active 1d ago',
      isActiveNow: false
    },
    { 
      id: 'p6', 
      name: 'Chloe Taylor', 
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAewuou3TKYO92CEbvRRXLGtJiCQmeiAIpHAg2lQ49cGa9nIsY1gVljoI22dPXAdcKJR7QwyvGAShRsi4Jws6AsyoDIiNmzI0FHJOAQWLUpt6wzXSiGHgayPY1DYyUwNICVgfLLVvWzjztj9mqV6FslCYP-ez04Mv8nAXCpAQPe_cqLbGbP6xdwUA_-vEAISKq6R_ATtqX8Ccu5-AS0_xfj85T3FPHdScMKMDTl-fmGDxp7a4okl6aSXah_NB4rdT7ar5pvj7BByuc', 
      college: 'Parsons School', 
      branch: 'Communication Design', 
      rating: 5.0, 
      skillsOffered: ['Brand Design', 'Typography'], 
      skillsWanted: ['Product Management', 'Agile'], 
      matchScore: 94,
      activeStatus: 'Active now',
      isActiveNow: true
    }
  ];

  useEffect(() => {
    setVisorState('eyes');
    const loadPeers = async () => {
      try {
        const learnersRes = await api.matching.getNearbyLearners();
        const teachersRes = await api.matching.getNearbyTeachers();
        const combined = [...(learnersRes.data || []), ...(teachersRes.data || [])];
        
        if (combined.length > 0) {
          // Map backend profiles to UI representation
          const mapped = combined.map((p: any, idx) => ({
            id: p.user_id || `peer_${idx}`,
            name: p.full_name || p.username || 'Peer Learner',
            avatar: p.avatar_url || `https://api.dicebear.com/7.x/bottts/svg?seed=${p.username || idx}`,
            college: p.location || 'Grid Node',
            branch: p.city || 'Tech Stack',
            rating: parseFloat((4.5 + Math.random() * 0.5).toFixed(1)),
            skillsOffered: p.teaching_skills || ['Coding', 'Design'],
            skillsWanted: p.learning_skills || ['Strategy'],
            matchScore: Math.floor(80 + Math.random() * 20),
            activeStatus: Math.random() > 0.5 ? 'Active now' : 'Last active 1h ago',
            isActiveNow: Math.random() > 0.5
          }));
          setPeers(mapped);
        } else {
          setPeers(stubPeers);
        }
      } catch (err) {
        console.warn('API error, falling back to high-fidelity stub peers:', err);
        setPeers(stubPeers);
      }
      setLoading(false);
    };
    loadPeers();
  }, [setVisorState]);

  const filteredPeers = peers.filter(peer => {
    const matchesSearch = !searchQuery || 
      peer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      peer.skillsOffered.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      peer.skillsWanted.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      peer.college.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = activeCategory === 'all' || 
      (activeCategory === 'Coding' && peer.skillsOffered.some(s => ['python', 'react', 'machine learning', 'c language', 'data structures', 'flutter', 'solidity', 'cryptography', 'typescript', 'react native', 'algorithms'].includes(s.toLowerCase()))) ||
      (activeCategory === 'Design' && peer.skillsOffered.some(s => ['ui/ux design', 'photoshop', 'figma', 'ux strategy', 'brand design', 'motion design', 'typography'].includes(s.toLowerCase()))) ||
      (activeCategory === 'Languages' && peer.skillsOffered.some(s => ['spanish', 'french'].includes(s.toLowerCase()))) ||
      (activeCategory === 'Marketing' && peer.skillsOffered.some(s => ['public speaking', 'creative writing', 'product management', 'agile'].includes(s.toLowerCase())));

    return matchesSearch && matchesCategory;
  });

  const handleRequestSwap = (peerId: string) => {
    onRequestSwap(peerId);
    setVisorState('swap');
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 md:px-16 py-12 pt-24 text-on-surface">
      <div className="noise-overlay"></div>

      {/* Hero Header */}
      <section className="mb-12">
        <div className="flex flex-col gap-6">
          <div className="border-l-4 border-primary pl-4">
            <h1 className="font-headline-xl text-3xl md:text-headline-xl text-primary font-bold">
              Find your next spark.
            </h1>
            <p className="text-on-surface-variant text-body-lg mt-2 max-w-2xl">
              Connect with thousands of learners in the lab. Swap your expertise and accelerate your learning journey through direct collaboration.
            </p>
          </div>

          {/* Search bar card */}
          <div className="bg-surface-container border border-outline-variant rounded-xl p-6 flex flex-wrap gap-4 items-end bg-[#161B22]/80 backdrop-blur-md">
            <div className="flex-1 min-w-[280px] space-y-2">
              <label className="block text-label-sm text-[10px] text-on-surface-variant uppercase tracking-widest font-semibold">Which Skill?</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary">psychology</span>
                <input 
                  type="text" 
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg py-3 pl-10 pr-4 focus:ring-1 focus:ring-primary focus:border-transparent transition-all text-sm text-on-surface outline-none"
                  placeholder="e.g. React Native, UI Design..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="w-full md:w-48 space-y-2">
              <label className="block text-label-sm text-[10px] text-on-surface-variant uppercase tracking-widest font-semibold">Category</label>
              <select 
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg py-3 px-4 focus:ring-1 focus:ring-primary focus:border-transparent text-sm text-on-surface outline-none cursor-pointer appearance-none"
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="Coding">Coding</option>
                <option value="Design">Design</option>
                <option value="Languages">Languages</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>

            <div className="w-full md:w-48 space-y-2">
              <label className="block text-label-sm text-[10px] text-on-surface-variant uppercase tracking-widest font-semibold">Proficiency</label>
              <select 
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg py-3 px-4 focus:ring-1 focus:ring-primary focus:border-transparent text-sm text-on-surface outline-none cursor-pointer appearance-none"
                value={activeProficiency}
                onChange={(e) => setActiveProficiency(e.target.value)}
              >
                <option value="Any Level">Any Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Expert">Expert</option>
              </select>
            </div>

            <button 
              className="bg-primary-fixed-dim hover:bg-primary-container text-on-primary font-bold px-8 py-3 rounded-lg hover:scale-105 active:scale-95 transition-all outline-none border-none cursor-pointer h-[50px] flex items-center gap-2 text-xs font-label-sm uppercase tracking-wider neon-glow-cyan"
              onClick={() => {
                if (filteredPeers.length > 0) {
                  handleRequestSwap(filteredPeers[0].id);
                }
              }}
            >
              <span className="material-symbols-outlined">filter_list</span>
              Find Match
            </button>
          </div>

          {/* Trending list */}
          <div className="flex flex-wrap gap-3 items-center text-xs">
            <span className="text-label-sm text-[10px] text-on-surface-variant tracking-wider uppercase font-semibold">Trending:</span>
            {['#Python', '#Figma', '#Spanish', '#Web3'].map(hash => (
              <button 
                key={hash}
                onClick={() => setSearchQuery(hash.replace('#', ''))}
                className="bg-surface-container-highest text-on-surface border border-outline-variant hover:border-primary px-4 py-1.5 rounded-full text-[11px] font-label-sm cursor-pointer transition-colors outline-none"
              >
                {hash}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid container */}
      {loading ? (
        <div className="text-center py-20 text-on-surface-variant font-mono">
          <span className="animate-pulse">LOADING CO-LEARNING GRID...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPeers.length > 0 ? (
            filteredPeers.map(peer => {
              return (
                <div 
                  key={peer.id}
                  className="glass-card rounded-xl p-6 flex flex-col justify-between gap-6 group border border-outline-variant/60 bg-[#161B22]/80 hover:border-primary-fixed-dim/40 transition-all shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-full border-2 overflow-hidden p-0.5 ${peer.isActiveNow ? 'border-primary' : 'border-secondary'}`}>
                        <img className="w-full h-full object-cover rounded-full" src={peer.avatar} alt={peer.name} />
                      </div>
                      <div>
                        <h3 className="font-headline-md text-on-surface text-lg font-bold group-hover:text-primary transition-colors">
                          {peer.name}
                        </h3>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                          <span className="text-label-sm text-on-surface text-xs">{peer.rating}</span>
                          <span className="text-label-sm text-on-surface-variant text-[11px] ml-2">{peer.college} // {peer.branch}</span>
                        </div>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors cursor-pointer">more_vert</span>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div>
                      <span className="text-label-sm text-[10px] text-on-surface-variant tracking-wider uppercase block mb-2">OFFERING</span>
                      <div className="flex flex-wrap gap-2">
                        {peer.skillsOffered.map((skill, i) => (
                          <span key={i} className="bg-primary-container/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-xs font-semibold">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-label-sm text-[10px] text-on-surface-variant tracking-wider uppercase block mb-2">WANTING</span>
                      <div className="flex flex-wrap gap-2">
                        {peer.skillsWanted.map((skill, i) => (
                          <span key={i} className="bg-secondary-container/10 text-secondary border border-secondary/20 px-3 py-1 rounded-full text-xs font-semibold">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-outline-variant flex items-center justify-between">
                    <span className={`text-label-sm text-xs font-mono ${peer.isActiveNow ? 'text-primary' : 'text-on-surface-variant'}`}>
                      {peer.activeStatus}
                    </span>
                    <button
                      onClick={() => handleRequestSwap(peer.id)}
                      className="bg-primary hover:bg-white text-on-primary font-bold px-5 py-2.5 rounded-lg transition-all active:scale-95 neon-glow-cyan text-xs cursor-pointer border-none outline-none"
                    >
                      Swap Request
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full py-16 text-center bg-surface-container/20 border border-dashed border-outline-variant rounded-2xl">
              <p className="font-mono text-sm text-on-surface-variant">NO MATCHING PEERS FOUND</p>
              <p className="text-xs text-on-surface-variant/70 mt-1">Try searching for other stacks or categories.</p>
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {!loading && filteredPeers.length > 0 && (
        <div className="mt-20 flex justify-center items-center gap-4">
          <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container transition-colors disabled:opacity-30 cursor-pointer" disabled>
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <span className="bg-primary text-on-primary w-10 h-10 rounded-full flex items-center justify-center font-bold">1</span>
          <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container transition-colors cursor-pointer">2</button>
          <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container transition-colors cursor-pointer">3</button>
          <span className="text-on-surface-variant">...</span>
          <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container transition-colors cursor-pointer">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      )}

      {/* FAB for quick action */}
      <button className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-primary-container text-on-primary-container shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] flex items-center justify-center hover:scale-110 active:scale-90 transition-transform neon-glow-cyan z-50 cursor-pointer border-none outline-none">
        <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
      </button>
    </div>
  );
};

export default SkillBrowser;
