import React, { useState, useMemo, useEffect } from 'react';
import { Video, ChevronLeft, ChevronRight, Check, Code, Brain, Brush } from 'lucide-react';
import { api } from '../services/api';

interface SessionSchedulerProps {
  setVisorState: (state: 'eyes' | 'quote' | 'swap' | 'success' | 'camera') => void;
}

interface UpcomingSession {
  id: string;
  peerName: string;
  peerAvatar: string;
  skill: string;
  date: string;
  time: string;
  duration: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  meetLink?: string;
}

export const SessionScheduler: React.FC<SessionSchedulerProps> = ({ setVisorState }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ peerName: '', skill: '', time: '', duration: '60', meetLink: '' });
  const [filterStatus, setFilterStatus] = useState<'all' | 'scheduled' | 'completed' | 'cancelled'>('all');

  const stubSessions: UpcomingSession[] = [
    { id: 's1', peerName: 'Arjun Mehta', peerAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Arjun', skill: 'React Hooks', date: '2026-06-25', time: '15:00', duration: '60 min', status: 'scheduled', meetLink: 'https://meet.google.com/abc-defg-hij' },
    { id: 's2', peerName: 'Priya Sharma', peerAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Priya', skill: 'Figma Basics', date: '2026-06-28', time: '11:00', duration: '45 min', status: 'scheduled' },
    { id: 's3', peerName: 'Rohan Gupta', peerAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Rohan', skill: 'ML Fundamentals', date: '2026-06-20', time: '14:00', duration: '90 min', status: 'completed' },
  ];

  const [sessions, setSessions] = useState<UpcomingSession[]>(stubSessions);

  useEffect(() => {
    setVisorState('eyes');
  }, [setVisorState]);

  // Calendar logic
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

  const sessionDates = useMemo(() => {
    const dates = new Set<number>();
    sessions.forEach(s => {
      const d = new Date(s.date);
      if (d.getFullYear() === year && d.getMonth() === month) {
        dates.add(d.getDate());
      }
    });
    return dates;
  }, [sessions, year, month]);

  const calendarCells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) calendarCells.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarCells.push(d);

  const filteredSessions = sessions.filter(s => filterStatus === 'all' || s.status === filterStatus);

  const handleSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !formData.skill || !formData.time) return;

    const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`;
    const newSession: UpcomingSession = {
      id: `s_${Date.now()}`,
      peerName: formData.peerName || 'Peer Node',
      peerAvatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${formData.peerName || 'Peer'}`,
      skill: formData.skill,
      date: formattedDate,
      time: formData.time,
      duration: `${formData.duration} min`,
      status: 'scheduled',
      meetLink: formData.meetLink || undefined
    };

    setSessions(prev => [newSession, ...prev]);

    try {
      await api.sessions.schedule({
        date: formattedDate,
        time: formData.time,
        duration_minutes: parseInt(formData.duration),
        skill_name: formData.skill,
        meet_link: formData.meetLink || undefined,
      });
      setVisorState('success');
    } catch {
      // Local fallback success
      setVisorState('success');
    }

    setShowForm(false);
    setFormData({ peerName: '', skill: '', time: '', duration: '60', meetLink: '' });
  };

  return (
    <div className="flex-grow flex flex-col md:flex-row max-w-7xl mx-auto w-full px-4 md:px-16 py-8 pt-24 gap-6 overflow-hidden text-on-surface">
      <div className="noise-overlay"></div>

      <style>{`
        .glass-panel {
          background: rgba(22, 27, 34, 0.7);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .neon-glow {
          box-shadow: 0 0 20px rgba(0, 219, 233, 0.2);
        }
        .cyber-grid {
          background-image: linear-gradient(rgba(0, 219, 233, 0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0, 219, 233, 0.05) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .spark-gradient {
          background: linear-gradient(90deg, #00dbe9, #e9b3ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      {/* LEFT COLUMN: Animated Visual Sidecar */}
      <div className="hidden md:flex md:w-1/2 relative overflow-hidden items-center justify-center bg-surface-container-lowest/20 rounded-2xl border border-outline-variant/30">
        <div className="absolute inset-0 cyber-grid opacity-20"></div>
        <div className="relative z-10 w-full flex flex-col items-center justify-center p-8 text-center max-w-lg">
          <h2 className="font-display-lg text-4xl mb-6 leading-tight font-bold">
            Fuel the <span className="spark-gradient font-bold">Spark</span> of Peer Genius.
          </h2>
          <p className="font-body-lg text-sm text-on-surface-variant leading-relaxed mb-8">
            Join a global network of creators, creators, and developers swapping mastery for curiosity. Book sessions and swap knowledge.
          </p>

          {/* abstract knowledge nodes graph */}
          <div className="grid grid-cols-3 gap-6 w-full max-w-sm pt-4">
            <div className="p-4 rounded-xl glass-panel flex flex-col items-center justify-center gap-2 border border-primary/20 transform -rotate-3 hover:rotate-0 transition-transform">
              <Code size={20} className="text-primary" />
              <span className="font-label-sm text-[10px] uppercase font-mono tracking-wider">React</span>
            </div>
            <div className="p-4 rounded-xl glass-panel flex flex-col items-center justify-center gap-2 border border-secondary/20 transform rotate-6 hover:rotate-0 transition-transform">
              <Brain size={20} className="text-secondary" />
              <span className="font-label-sm text-[10px] uppercase font-mono tracking-wider">Python</span>
            </div>
            <div className="p-4 rounded-xl glass-panel flex flex-col items-center justify-center gap-2 border border-primary-fixed-dim/20 transform -rotate-6 hover:rotate-0 transition-transform">
              <Brush size={20} className="text-primary-fixed-dim" />
              <span className="font-label-sm text-[10px] uppercase font-mono tracking-wider">Figma</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Calendar & Sessions list */}
      <section className="flex-grow space-y-6 min-w-0">
        <div className="flex justify-between items-center">
          <h2 className="font-headline-md text-xl font-bold text-on-surface">Scheduler Console</h2>
          <span className="font-label-sm text-[10px] text-on-surface-variant tracking-wider uppercase font-mono">// LAB WORKSPACE</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
          {/* Calendar Picker Panel */}
          <div className="sm:col-span-6 glass-panel p-5 rounded-2xl bg-[#161B22]/85 border border-outline-variant/60">
            <div className="flex justify-between items-center mb-6">
              <button 
                onClick={() => setCurrentMonth(new Date(year, month - 1))}
                className="p-1 hover:bg-surface-container rounded text-on-surface-variant hover:text-primary transition-colors bg-transparent border-none cursor-pointer outline-none"
              >
                <ChevronLeft size={16} />
              </button>
              <h3 className="font-label-sm text-xs font-bold text-on-surface tracking-wider font-mono">{monthName.toUpperCase()}</h3>
              <button 
                onClick={() => setCurrentMonth(new Date(year, month + 1))}
                className="p-1 hover:bg-surface-container rounded text-on-surface-variant hover:text-primary transition-colors bg-transparent border-none cursor-pointer outline-none"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Calendar header */}
            <div className="grid grid-cols-7 gap-1 text-center font-mono text-[9px] text-on-surface-variant tracking-wider font-semibold mb-2">
              {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                <div key={day} className="py-2">{day}</div>
              ))}
            </div>

            {/* Days cells */}
            <div className="grid grid-cols-7 gap-1.5 text-xs text-center">
              {calendarCells.map((day, idx) => {
                if (day === null) {
                  return <div key={`empty-${idx}`} className="py-2.5"></div>;
                }
                const hasSession = sessionDates.has(day);
                const isSelected = selectedDate === day;
                const isToday = isCurrentMonth && today.getDate() === day;
                
                return (
                  <button
                    key={`day-${day}`}
                    onClick={() => { setSelectedDate(day); setShowForm(true); }}
                    className={`py-2 rounded-lg font-mono relative cursor-pointer outline-none border transition-all ${
                      isSelected 
                        ? 'bg-primary text-surface border-primary font-bold' 
                        : isToday 
                        ? 'border-primary text-primary font-bold bg-primary/10' 
                        : 'border-transparent text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    {day}
                    {hasSession && (
                      <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${isSelected ? 'bg-surface' : 'bg-secondary'}`} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Session Bookings list */}
          <div className="sm:col-span-6 space-y-4 w-full">
            {/* Filter Tabs */}
            <div className="flex gap-2 p-1 bg-surface-container/30 border border-outline-variant/40 rounded-xl">
              {['all', 'scheduled', 'completed'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setFilterStatus(tab as any)}
                  className={`flex-1 py-1.5 rounded-lg font-label-sm text-[10px] font-semibold uppercase tracking-wider transition-all border-none outline-none cursor-pointer ${filterStatus === tab ? 'bg-[#161B22] text-primary border border-outline-variant/60 shadow-sm' : 'text-on-surface-variant hover:text-on-surface bg-transparent'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Scheduled list */}
            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
              {filteredSessions.length > 0 ? (
                filteredSessions.map((session) => (
                  <div key={session.id} className="glass-card p-4 rounded-xl border border-outline-variant/60 bg-[#161B22]/80 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full border border-primary/20 overflow-hidden bg-surface-container flex-shrink-0">
                        <img className="w-full h-full object-cover" src={session.peerAvatar} alt="Partner avatar" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-on-surface text-xs">{session.skill}</h4>
                        <p className="text-[10px] text-on-surface-variant font-mono mt-0.5">
                          with {session.peerName} • {session.date} @ {session.time} ({session.duration})
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[9px] uppercase font-mono tracking-wider font-semibold ${
                        session.status === 'scheduled' ? 'bg-primary-container/20 text-primary border border-primary/20' : 'bg-surface-container-high/40 text-on-surface-variant border border-outline-variant/30'
                      }`}>
                        {session.status}
                      </span>
                      {session.meetLink && (
                        <a href={session.meetLink} target="_blank" rel="noopener noreferrer" className="p-1 hover:bg-surface-container rounded text-primary">
                          <Video size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center bg-surface-container/10 border border-dashed border-outline-variant rounded-xl text-xs text-on-surface-variant font-mono">
                  NO SESSION TRANSCRIPTS DETECTED
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Floating schedule form popover */}
        {showForm && selectedDate && (
          <div className="glass-panel p-6 rounded-2xl bg-[#161B22] border border-primary/40 relative shadow-2xl mt-4">
            <button 
              onClick={() => setShowForm(false)}
              className="absolute right-4 top-4 hover:text-primary transition-colors bg-transparent border-none cursor-pointer outline-none text-on-surface-variant text-sm font-mono"
            >
              ✕
            </button>
            <h3 className="font-headline-md text-sm font-bold text-on-surface mb-4">
              Schedule Session for {monthName.split(' ')[0]} {selectedDate}, {year}
            </h3>

            <form onSubmit={handleSchedule} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-[10px] font-label-sm text-on-surface-variant uppercase tracking-wider">Peer Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Arjun Mehta"
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2.5 text-xs text-on-surface outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                  value={formData.peerName}
                  onChange={(e) => setFormData({ ...formData, peerName: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-label-sm text-on-surface-variant uppercase tracking-wider">Skill / Topic</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. React Hooks, Python"
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2.5 text-xs text-on-surface outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                  value={formData.skill}
                  onChange={(e) => setFormData({ ...formData, skill: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-label-sm text-on-surface-variant uppercase tracking-wider">Time Slot</label>
                <input 
                  type="time" 
                  required
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2.5 text-xs text-on-surface outline-none cursor-pointer focus:ring-1 focus:ring-primary focus:border-transparent"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-label-sm text-on-surface-variant uppercase tracking-wider">Duration (Minutes)</label>
                <select 
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2.5 text-xs text-on-surface outline-none cursor-pointer focus:ring-1 focus:ring-primary focus:border-transparent"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                >
                  <option value="30">30 min</option>
                  <option value="45">45 min</option>
                  <option value="60">60 min</option>
                  <option value="90">90 min</option>
                </select>
              </div>

              <div className="sm:col-span-2 space-y-2">
                <label className="block text-[10px] font-label-sm text-on-surface-variant uppercase tracking-wider">Meet Link (Optional)</label>
                <input 
                  type="url" 
                  placeholder="https://meet.google.com/..."
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2.5 text-xs text-on-surface outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                  value={formData.meetLink}
                  onChange={(e) => setFormData({ ...formData, meetLink: e.target.value })}
                />
              </div>

              <div className="sm:col-span-2 flex justify-end gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowForm(false)}
                  className="py-2 px-4 rounded text-xs font-semibold hover:text-primary transition-colors bg-transparent border-none cursor-pointer outline-none text-on-surface-variant"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="py-2 px-6 bg-primary text-on-primary font-bold rounded hover:scale-105 active:scale-95 transition-all outline-none border-none cursor-pointer flex items-center gap-1 neon-glow-cyan"
                >
                  Schedule Swap <Check size={14} />
                </button>
              </div>
            </form>
          </div>
        )}
      </section>
    </div>
  );
};

export default SessionScheduler;
