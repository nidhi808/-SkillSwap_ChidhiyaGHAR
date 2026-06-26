import React, { useState, useEffect } from 'react';
import { Trophy, Star, Award, Zap } from 'lucide-react';
import { api } from '../services/api';

interface LeaderboardProps {
  setVisorState: (state: 'eyes' | 'quote' | 'swap' | 'success' | 'camera') => void;
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  college: string;
  sessions: number;
  avgRating: number;
  badges: number;
  xp: number;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ setVisorState }) => {
  const [filter, setFilter] = useState<'weekly' | 'monthly' | 'all'>('monthly');
  const [data, setData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const stubData: LeaderboardEntry[] = [
    { rank: 1, name: 'Arjun Mehta', avatar: '👨‍💻', college: 'IIT Delhi', sessions: 47, avgRating: 4.9, badges: 8, xp: 2340 },
    { rank: 2, name: 'Priya Sharma', avatar: '👩‍🎨', college: 'NID Ahmedabad', sessions: 42, avgRating: 4.8, badges: 7, xp: 2100 },
    { rank: 3, name: 'Rohan Gupta', avatar: '🧑‍💻', college: 'BITS Pilani', sessions: 38, avgRating: 4.7, badges: 6, xp: 1900 },
    { rank: 4, name: 'Sneha Reddy', avatar: '👩‍🔬', college: 'IIIT Hyderabad', sessions: 35, avgRating: 4.6, badges: 5, xp: 1750 },
    { rank: 5, name: 'Vikram Singh', avatar: '👨‍🏫', college: 'DTU Delhi', sessions: 32, avgRating: 4.5, badges: 5, xp: 1600 },
    { rank: 6, name: 'Ananya Patel', avatar: '👩‍💼', college: 'NMIMS Mumbai', sessions: 30, avgRating: 4.5, badges: 4, xp: 1500 },
    { rank: 7, name: 'Karan Joshi', avatar: '🧑‍🎓', college: 'VIT Vellore', sessions: 28, avgRating: 4.4, badges: 4, xp: 1400 },
    { rank: 8, name: 'Nisha Kapoor', avatar: '👩‍🎓', college: 'SRM Chennai', sessions: 25, avgRating: 4.3, badges: 3, xp: 1250 },
    { rank: 9, name: 'Dev Malhotra', avatar: '🧑‍💻', college: 'LNMIIT Jaipur', sessions: 22, avgRating: 4.3, badges: 3, xp: 1100 },
    { rank: 10, name: 'Ritika Bose', avatar: '👩‍🔬', college: 'Jadavpur University', sessions: 20, avgRating: 4.2, badges: 2, xp: 1000 },
  ];

  useEffect(() => {
    setVisorState('eyes');
    const loadData = async () => {
      try {
        // Try existing feed trending as a proxy — no backend change needed
        const res = await api.feed.getTrending(10);
        if (res.data && res.data.length > 0) {
          setData(res.data.map((item: any, idx: number) => ({
            rank: idx + 1,
            name: item.author?.full_name || item.author?.username || 'User',
            avatar: item.author?.avatar_url || '👤',
            college: item.author?.college || 'Unknown',
            sessions: Math.max(50 - idx * 5, 10),
            avgRating: parseFloat((4.9 - idx * 0.08).toFixed(1)),
            badges: Math.max(8 - idx, 1),
            xp: Math.max(2500 - idx * 200, 500),
          })));
        } else {
          setData(stubData);
        }
      } catch {
        setData(stubData);
      }
      setLoading(false);
    };
    loadData();
  }, [setVisorState]);

  // Filter multiplier for demo
  const filteredData = data.map(d => ({
    ...d,
    sessions: filter === 'weekly' ? Math.floor(d.sessions / 4) : filter === 'monthly' ? Math.floor(d.sessions / 1.5) : d.sessions,
    xp: filter === 'weekly' ? Math.floor(d.xp / 4) : filter === 'monthly' ? Math.floor(d.xp / 1.5) : d.xp,
  }));

  const top3 = filteredData.slice(0, 3);
  const rest = filteredData.slice(3);

  return (
    <div className="leaderboard-container">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <div>
          <h2 className="font-mono" style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '8px' }}>
            <Trophy size={22} color="#ffd700" style={{ verticalAlign: 'middle', marginRight: '12px' }} />
            LEADERBOARD
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Top contributors in the SkillSwap community.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {(['weekly', 'monthly', 'all'] as const).map(f => (
            <button
              key={f}
              className={`skill-cat-tab ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? 'ALL TIME' : f.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px' }}>
          <div className="auth-spinner" style={{ margin: '0 auto 16px' }} />
          <span className="font-mono" style={{ color: 'var(--text-muted)' }}>LOADING RANKINGS...</span>
        </div>
      ) : (
        <>
          {/* Podium */}
          <div className="leaderboard-podium">
            {top3.map((entry, i) => {
              const spotClass = i === 0 ? 'first' : i === 1 ? 'second' : 'third';
              return (
                <div key={entry.rank} className={`podium-spot ${spotClass}`}>
                  <div className="podium-avatar">
                    <span style={{ fontSize: i === 0 ? '2.2rem' : '1.6rem' }}>{entry.avatar}</span>
                    {i === 0 && <span className="podium-crown">👑</span>}
                  </div>
                  <div>
                    <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>{entry.name}</div>
                    <div className="font-mono" style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>{entry.college}</div>
                    <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', marginTop: '6px', alignItems: 'center' }}>
                      <Star size={12} fill="#ffc107" color="#ffc107" />
                      <span style={{ color: '#ffc107', fontSize: '0.82rem', fontWeight: 700 }}>{entry.avgRating}</span>
                    </div>
                  </div>
                  <div className={`podium-bar`}>#{entry.rank}</div>
                </div>
              );
            })}
          </div>

          {/* Table */}
          <div className="glass-panel" style={{ borderRadius: '12px', overflow: 'hidden' }}>
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th style={{ width: '60px' }}>RANK</th>
                  <th>USER</th>
                  <th style={{ textAlign: 'center' }}>SESSIONS</th>
                  <th style={{ textAlign: 'center' }}>RATING</th>
                  <th style={{ textAlign: 'center' }}>BADGES</th>
                  <th style={{ textAlign: 'right' }}>XP</th>
                </tr>
              </thead>
              <tbody>
                {rest.map(entry => (
                  <tr key={entry.rank}>
                    <td>
                      <span className="leaderboard-rank">#{entry.rank}</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '1.3rem' }}>{entry.avatar}</span>
                        <div>
                          <div style={{ fontWeight: 600 }}>{entry.name}</div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{entry.college}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span className="font-mono" style={{ fontSize: '0.9rem' }}>{entry.sessions}</span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                        <Star size={12} fill="#ffc107" color="#ffc107" /> {entry.avgRating}
                      </div>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                        <Award size={12} color="var(--color-purple)" /> {entry.badges}
                      </div>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <span className="font-mono" style={{ color: 'var(--color-cyan)', fontWeight: 700 }}>
                        <Zap size={12} style={{ verticalAlign: 'middle' }} /> {entry.xp.toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};
export default Leaderboard;
