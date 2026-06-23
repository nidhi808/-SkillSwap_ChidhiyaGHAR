import React, { useState } from 'react';
import { Mail, Lock, ShieldAlert, ArrowRight } from 'lucide-react';
import { api } from '../services/api';

interface AuthPageProps {
  onAuthSuccess: () => void;
  setVisorState: (state: 'eyes' | 'quote' | 'swap' | 'success' | 'camera') => void;
}

type AuthMode = 'login' | 'signup' | 'verify';

export const AuthPage: React.FC<AuthPageProps> = ({ onAuthSuccess, setVisorState }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        if (!email || !password) {
          setError('All fields are required.');
          setLoading(false);
          return;
        }
        await api.auth.login({ email, password });
        setVisorState('success');
        setTimeout(() => {
          onAuthSuccess();
        }, 800);
      } else if (mode === 'signup') {
        if (!email || !password) {
          setError('All fields are required.');
          setLoading(false);
          return;
        }
        if (password.length < 6) {
          setError('Password must be at least 6 characters.');
          setLoading(false);
          return;
        }
        // Sanitize username to conform to backend validation: 3-30 characters, alphanumeric/underscore only
        let username = email.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '_');
        if (username.length < 3) {
          username = username.padEnd(3, '0');
        } else if (username.length > 30) {
          username = username.substring(0, 30);
        }
        await api.auth.register({ email, password, username });
        // Automatically log in the user immediately after successful registration
        await api.auth.login({ email, password });
        setVisorState('success');
        setTimeout(() => {
          onAuthSuccess();
        }, 800);
      } else if (mode === 'verify') {
        if (!code) {
          setError('Verification code is required.');
          setLoading(false);
          return;
        }

        // Submit the OTP code/token to verify email via native Supabase Auth
        await api.auth.verifyEmail(email, code);

        // Log user in automatically after registration
        await api.auth.login({ email, password });
        setVisorState('success');
        setTimeout(() => {
          onAuthSuccess();
        }, 800);
      }

    } catch (err: any) {
      setError(err.message || 'Authentication error.');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthMock = (provider: string) => {
    // Initiate OAuth flow by redirecting
    window.location.href = `http://localhost:4000/api/auth/oauth/${provider.toLowerCase()}`;
  };

  return (
    <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', minHeight: '80vh', zIndex: 10 }}>
      <div 
        className="glass-panel cyan-glow"
        style={{ 
          width: '100%', 
          maxWidth: '420px', 
          padding: '36px',
          border: '1px solid rgba(0, 240, 255, 0.15)',
          background: 'rgba(7, 7, 9, 0.85)'
        }}
      >
        {/* Panel HUD Headers */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '12px' }}>
          <span className="font-mono" style={{ color: 'var(--color-cyan)', fontSize: '0.85rem' }}>
            [ AUTH_MODULE_v1.0 ]
          </span>
          <span className="font-mono" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            SECURE_ACCESS
          </span>
        </div>

        <h2 style={{ fontSize: '1.75rem', marginBottom: '8px', color: '#fff' }} className="font-mono">
          {mode === 'login' && 'LOGIN'}
          {mode === 'signup' && 'CREATE ACCOUNT'}
          {mode === 'verify' && 'VERIFY EMAIL'}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '24px' }}>
          {mode === 'login' && 'Log in to connect to the peer grid.'}
          {mode === 'signup' && 'Sign up to exchange skills with peers.'}
          {mode === 'verify' && 'An verification code was simulated to your email.'}
        </p>

        {error && (
          <div 
            style={{ 
              background: 'rgba(255, 0, 0, 0.08)', 
              border: '1px solid rgba(255, 0, 0, 0.3)', 
              color: '#ff4d4d', 
              padding: '12px', 
              borderRadius: '4px', 
              marginBottom: '20px',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            className="font-mono"
          >
            <ShieldAlert size={16} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {mode !== 'verify' ? (
            <>
              <div style={{ marginBottom: '20px' }}>
                <label className="hud-label">Email Address</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="email" 
                    className="hud-input" 
                    placeholder="student@college.edu" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ paddingLeft: '40px' }}
                  />
                  <Mail size={16} style={{ position: 'absolute', left: '14px', top: '15px', color: 'var(--text-muted)' }} />
                </div>
              </div>

              <div style={{ marginBottom: '28px' }}>
                <label className="hud-label">Password</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="password" 
                    className="hud-input" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ paddingLeft: '40px' }}
                  />
                  <Lock size={16} style={{ position: 'absolute', left: '14px', top: '15px', color: 'var(--text-muted)' }} />
                </div>
              </div>
            </>
          ) : (
            <div style={{ marginBottom: '28px' }}>
              <label className="hud-label">Verification Code (Enter "12345")</label>
              <input 
                type="text" 
                className="hud-input" 
                placeholder="12345" 
                value={code}
                onChange={(e) => setCode(e.target.value)}
                maxLength={5}
                style={{ textAlign: 'center', letterSpacing: '0.5em', fontSize: '1.2rem' }}
              />
            </div>
          )}

          <button 
            type="submit" 
            className="cyber-button" 
            disabled={loading}
            style={{ width: '100%', justifyContent: 'center', marginBottom: '20px', opacity: loading ? 0.6 : 1 }}
          >
            {loading ? 'TRANSMITTING...' : (
              <>
                {mode === 'login' && 'INITIALIZE SESSION'}
                {mode === 'signup' && 'SEND VERIFICATION'}
                {mode === 'verify' && 'CONFIRM AUTHENTICATION'}
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {mode !== 'verify' && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '24px 0' }}>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.08)' }}></div>
              <span className="font-mono" style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>OR INTERFACE WITH</span>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.08)' }}></div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
              <button className="cyber-button font-mono" style={{ padding: '10px', fontSize: '0.8rem', justifyContent: 'center', gap: '8px' }} onClick={() => handleOAuthMock('Google')}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-6.887 4.114-4.695 0-8.503-3.808-8.503-8.503s3.808-8.503 8.503-8.503c2.202 0 4.21.754 5.802 2.202l3.037-3.037C18.243 1.096 15.357 0 12.24 0 5.58 0 0 5.58 0 12.24s5.58 12.24 12.24 12.24c6.762 0 11.76-4.762 11.76-11.96 0-.776-.07-1.536-.188-2.235H12.24z"/></svg> GOOGLE
              </button>
              <button className="cyber-button font-mono" style={{ padding: '10px', fontSize: '0.8rem', justifyContent: 'center', gap: '8px' }} onClick={() => handleOAuthMock('GitHub')}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.22.694.825.576C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg> GITHUB
              </button>
            </div>
          </>
        )}

        <div style={{ textAlign: 'center' }}>
          {mode === 'login' ? (
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              New to the grid?{' '}
              <span 
                style={{ color: 'var(--color-cyan)', cursor: 'pointer', textDecoration: 'underline' }} 
                onClick={() => setMode('signup')}
              >
                Sign Up
              </span>
            </p>
          ) : (
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Already registered?{' '}
              <span 
                style={{ color: 'var(--color-cyan)', cursor: 'pointer', textDecoration: 'underline' }} 
                onClick={() => setMode('login')}
              >
                Log In
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
export default AuthPage;
