import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { api } from '../services/api';

interface ProfileBuilderProps {
  onComplete: (data: {
    name: string;
    age: number;
    college: string;
    branch: string;
    course: string;
    teachingSkills: string[];
    learningSkills: string[];
  }) => void;
  setVisorState: (state: 'eyes' | 'quote' | 'swap' | 'success' | 'camera') => void;
}

const AVAILABLE_SKILLS = [
  'Python', 'C Language', 'React', 'Flutter', 'Data Structures', 'Machine Learning',
  'UI/UX Design', '3D Modelling', 'Video Editing', 'Photoshop',
  'Calculus', 'Linear Algebra', 'Public Speaking', 'Business Writing'
];

export const ProfileBuilder: React.FC<ProfileBuilderProps> = ({ onComplete, setVisorState }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [age, setAge] = useState<number>(20);
  const [college, setCollege] = useState('');
  const [branch, setBranch] = useState('');
  const [course, setCourse] = useState('');
  
  const [teachingSkills, setTeachingSkills] = useState<string[]>([]);
  const [learningSkills, setLearningSkills] = useState<string[]>([]);
  
  const [dbSkills, setDbSkills] = useState<any[]>([]);

  // Fetch skills on mount
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await api.skills.getAll();
        setDbSkills(res.data || []);
      } catch (err) {
        console.error('Failed to fetch skills from database:', err);
      }
    };
    fetchSkills();
  }, []);

  const handleNextStep = () => {
    if (!name || !college || !branch || !course) {
      alert('Please fill out all fields.');
      return;
    }
    setStep(2);
    setVisorState('swap');
  };

  const handlePrevStep = () => {
    setStep(1);
    setVisorState('eyes');
  };

  const handleToggleTeach = (skill: string) => {
    if (teachingSkills.includes(skill)) {
      setTeachingSkills(teachingSkills.filter(s => s !== skill));
    } else {
      setTeachingSkills([...teachingSkills.filter(s => s !== skill), skill]);
      setLearningSkills(learningSkills.filter(s => s !== skill));
    }
  };

  const handleToggleLearn = (skill: string) => {
    if (learningSkills.includes(skill)) {
      setLearningSkills(learningSkills.filter(s => s !== skill));
    } else {
      setLearningSkills([...learningSkills.filter(s => s !== skill), skill]);
      setTeachingSkills(teachingSkills.filter(s => s !== skill));
    }
  };

  const handleFinish = async () => {
    if (teachingSkills.length === 0 || learningSkills.length === 0) {
      alert('Please select at least one skill to teach and one skill to learn.');
      return;
    }

    try {
      // 1. Update Profile in Backend
      await api.profile.updateProfile({
        full_name: name,
        location: college,
        city: branch,
        state_code: course,
        country_code: 'IN',
        bio: `I am studying ${course} in ${branch} at ${college}.`
      });

      // 2. Associate Offered and Wanted Skills
      // Helper to find skill ID in DB by name overlap
      const getSkillId = (name: string) => {
        const match = dbSkills.find(
          s => s.name.toLowerCase().includes(name.toLowerCase()) || 
               name.toLowerCase().includes(s.name.toLowerCase())
        );
        return match ? match.id : dbSkills[0]?.id; // Fallback to first skill if no match
      };

      // Insert offered skills
      for (const skillName of teachingSkills) {
        const id = getSkillId(skillName);
        if (id) {
          await api.skills.addOffered({
            skill_id: id,
            proficiency_level: 'intermediate',
            years_experience: 1.0,
            description: `I teach ${skillName}.`
          }).catch(err => console.warn(err));
        }
      }

      // Insert wanted skills
      for (const skillName of learningSkills) {
        const id = getSkillId(skillName);
        if (id) {
          await api.skills.addWanted({
            skill_id: id,
            current_level: 'beginner',
            target_level: 'intermediate',
            urgency: 'medium',
            notes: `I want to learn ${skillName}.`
          }).catch(err => console.warn(err));
        }
      }

      setVisorState('success');
      setTimeout(() => {
        onComplete({
          name,
          age,
          college,
          branch,
          course,
          teachingSkills,
          learningSkills,
        });
      }, 800);
    } catch (err: any) {
      alert(`Profile compilation error: ${err.message}`);
    }
  };

  return (
    <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', minHeight: '80vh', zIndex: 10 }}>
      <div 
        className="glass-panel purple-glow"
        style={{ 
          width: '100%', 
          maxWidth: '520px', 
          padding: '36px',
          border: '1px solid rgba(189, 0, 255, 0.15)',
          background: 'rgba(7, 7, 9, 0.85)'
        }}
      >
        {/* Step Indicator Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '12px' }}>
          <span className="font-mono" style={{ color: 'var(--color-purple)', fontSize: '0.85rem' }}>
            [ STEP_0{step}_OF_02 ]
          </span>
          <span className="font-mono" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            {step === 1 ? 'PERSONAL_DOSSIER' : 'SKILL_PROVISION'}
          </span>
        </div>

        {step === 1 ? (
          <div>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '8px', color: '#fff' }} className="font-mono">
              BUILD PROFILE
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '24px' }}>
              Enter your college details to align with peer matches.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <div>
                <label className="hud-label">Full Name</label>
                <input 
                  type="text" 
                  className="hud-input" 
                  placeholder="Nidhi Vekhande" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="hud-label">Age</label>
                <input 
                  type="number" 
                  className="hud-input" 
                  value={age}
                  onChange={(e) => setAge(parseInt(e.target.value) || 20)}
                />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label className="hud-label">College / University</label>
              <input 
                type="text" 
                className="hud-input" 
                placeholder="Indian Institute of Technology" 
                value={college}
                onChange={(e) => setCollege(e.target.value)}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
              <div>
                <label className="hud-label">Branch</label>
                <input 
                  type="text" 
                  className="hud-input" 
                  placeholder="Computer Science" 
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                />
              </div>
              <div>
                <label className="hud-label">Course / Degree</label>
                <input 
                  type="text" 
                  className="hud-input" 
                  placeholder="B.Tech" 
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                />
              </div>
            </div>

            <button 
              className="cyber-button purple" 
              onClick={handleNextStep}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              PROCEED TO SKILL GRID <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <div>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '8px', color: '#fff' }} className="font-mono">
              SKILL DIRECTORY
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '24px' }}>
              Select skills you want to teach (Purple) and learn (Cyan).
            </p>

            <div style={{ maxHeight: '280px', overflowY: 'auto', paddingRight: '6px', marginBottom: '30px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <th className="font-mono" style={{ textAlign: 'left', paddingBottom: '8px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>SKILL NAME</th>
                    <th className="font-mono" style={{ textAlign: 'center', paddingBottom: '8px', fontSize: '0.75rem', color: 'var(--color-purple)' }}>TEACH</th>
                    <th className="font-mono" style={{ textAlign: 'center', paddingBottom: '8px', fontSize: '0.75rem', color: 'var(--color-cyan)' }}>LEARN</th>
                  </tr>
                </thead>
                <tbody>
                  {AVAILABLE_SKILLS.map((skill) => {
                    const isTeaching = teachingSkills.includes(skill);
                    const isLearning = learningSkills.includes(skill);
                    return (
                      <tr key={skill} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.03)' }}>
                        <td style={{ padding: '10px 0', fontSize: '0.9rem', color: '#fff', fontWeight: 500 }}>{skill}</td>
                        
                        {/* Teach Column checkbox */}
                        <td style={{ textAlign: 'center' }}>
                          <button
                            onClick={() => handleToggleTeach(skill)}
                            style={{
                              width: '20px',
                              height: '20px',
                              border: `1px solid ${isTeaching ? 'var(--color-purple)' : 'rgba(255,255,255,0.15)'}`,
                              background: isTeaching ? 'rgba(189, 0, 255, 0.2)' : 'transparent',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: '3px'
                            }}
                          >
                            {isTeaching && <Check size={12} color="var(--color-purple)" />}
                          </button>
                        </td>

                        {/* Learn Column checkbox */}
                        <td style={{ textAlign: 'center' }}>
                          <button
                            onClick={() => handleToggleLearn(skill)}
                            style={{
                              width: '20px',
                              height: '20px',
                              border: `1px solid ${isLearning ? 'var(--color-cyan)' : 'rgba(255,255,255,0.15)'}`,
                              background: isLearning ? 'rgba(0, 240, 255, 0.2)' : 'transparent',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: '3px'
                            }}
                          >
                            {isLearning && <Check size={12} color="var(--color-cyan)" />}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px' }}>
              <button 
                className="cyber-button font-mono" 
                onClick={handlePrevStep}
                style={{ justifyContent: 'center', border: '1px solid rgba(255,255,255,0.15)', background: 'transparent' }}
              >
                <ArrowLeft size={16} /> BACK
              </button>
              <button 
                className="cyber-button purple" 
                onClick={handleFinish}
                style={{ justifyContent: 'center' }}
              >
                COMPILE PROFILE <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ProfileBuilder;
