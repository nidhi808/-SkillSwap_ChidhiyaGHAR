import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

interface AuthPageProps {
  onAuthSuccess: () => void;
  setVisorState: (state: 'eyes' | 'quote' | 'swap' | 'success' | 'camera') => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onAuthSuccess, setVisorState }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [fullName, setFullName] = useState('');
   const [error, setError] = useState('');
   const [emailError, setEmailError] = useState('');
   const [passwordError, setPasswordError] = useState('');
   const [fullNameError, setFullNameError] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   const [showPassword, setShowPassword] = useState(false);

   useEffect(() => {
     setVisorState('eyes');
     // Reset errors when switching modes
     setEmailError('');
     setPasswordError('');
     setFullNameError('');
   }, [isLoginMode, setVisorState]);

   const validate = () => {
     let isValid = true;
     setEmailError('');
     setPasswordError('');
     setFullNameError('');

     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if (!emailRegex.test(email)) {
       setEmailError('Please enter a valid email address');
       isValid = false;
     }

     if (password.length < 8) {
       setPasswordError('Password must be at least 8 characters long');
       isValid = false;
     }

     if (!isLoginMode && !fullName.trim()) {
       setFullNameError('Full name is required');
       isValid = false;
     }

     return isValid;
   };

   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     if (!validate()) return;

     setError('');
     setIsLoading(true);


    try {
      if (isLoginMode) {
        const res = await api.auth.login({ username: email, password });
        if (res.access_token) {
          localStorage.setItem('access_token', res.access_token);
          setVisorState('success');
          onAuthSuccess();
        } else {
          setError('Login failed: No access token received');
        }
      } else {
        // Sign Up mode
        const regRes = await api.auth.register({ 
          username: email, 
          email: email, 
          password: password, 
          full_name: fullName 
        });
        if (regRes.user_id) {
          const loginRes = await api.auth.login({ username: email, password });
          if (loginRes.access_token) {
            localStorage.setItem('access_token', loginRes.access_token);
            setVisorState('success');
            onAuthSuccess();
          }
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || 'Authentication failed. Please try again.');
      setVisorState('eyes');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-split-container">
      {/* Left Panel - Branding & Features */}
      <div className="auth-left-panel">
        <div className="auth-left-glow auth-left-glow-cyan"></div>
        <div className="auth-left-glow auth-left-glow-purple"></div>

        <div className="auth-brand-block">
          <div className="auth-brand-icon">
            <span className="material-symbols-outlined text-primary">bolt</span>
          </div>
          <div>
            <h1 className="auth-brand-title">SKILLSWAP</h1>
            <p className="auth-brand-subtitle">THE SPARK ECOSYSTEM</p>
          </div>
        </div>

        <div className="auth-tagline">
          <h2>Fuel the <span className="spark-gradient">Spark</span> of Peer Genius.</h2>
          <p>Join a global network of 50k+ creators, engineers, and designers swapping mastery for curiosity.</p>
        </div>

        <div className="auth-features-carousel">
          <div className={`auth-feature-card ${isLoginMode ? '' : 'auth-feature-active'}`}>
            <span className="material-symbols-outlined auth-feature-icon">psychology</span>
            <div>
              <div className="auth-feature-title">SMART MATCHING</div>
              <div className="auth-feature-desc">AI-driven peer pairings based on your unique skill graph.</div>
            </div>
          </div>
          <div className={`auth-feature-card ${isLoginMode ? 'auth-feature-active' : ''}`}>
            <span className="material-symbols-outlined auth-feature-icon">sync_alt</span>
            <div>
              <div className="auth-feature-title">DIRECT SWAPS</div>
              <div className="auth-feature-desc">No money, just knowledge. Exchange hours for expertise.</div>
            </div>
          </div>
          <div className={`auth-feature-card ${!isLoginMode ? 'auth-feature-active' : ''}`}>
            <span className="material-symbols-outlined auth-feature-icon">school</span>
            <div className="auth-feature-desc">Continuous growth through real-world collaboration.</div>
            <div className="auth-feature-title">PEER LEARNING</div>
          </div>
        </div>

        <div className="auth-stats-bar">
          <div className="auth-stat">
            <span className="auth-stat-num">50k+</span>
            <span className="auth-stat-label">EXPERTS</span>
          </div>
          <div className="auth-stat-divider"></div>
          <div className="auth-stat">
            <span className="auth-stat-num">120+</span>
            <span className="auth-stat-label">SKILLS</span>
          </div>
          <div className="auth-stat-divider"></div>
          <div className="auth-stat">
            <span className="auth-stat-num">24/7</span>
            <span className="auth-stat-label">ACCESS</span>
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="auth-right-panel">
        <div className="auth-form-container">
          <div className="auth-hud-header">
            <h2 className="auth-form-title">{isLoginMode ? 'Welcome Back' : 'Join the Lab'}</h2>
            <span className="font-mono text-[10px] text-primary/50">AUTH_MODE: {isLoginMode ? 'LOGIN' : 'REGISTER'}</span>
          </div>

          <div className="auth-mode-tabs">
            <button 
              className={`auth-tab ${isLoginMode ? 'auth-tab-active' : ''}`}
              onClick={() => setIsLoginMode(true)}
            >
              <span className="material-symbols-outlined text-[16px]">login</span>
              Login
            </button>
            <button 
              className={`auth-tab ${!isLoginMode ? 'auth-tab-active' : ''}`}
              onClick={() => setIsLoginMode(false)}
            >
              <span className="material-symbols-outlined text-[16px]">person_add</span>
              Sign Up
            </button>
          </div>

          {error && (
            <div className="auth-error-banner">
              <span className="material-symbols-outlined text-[18px]">error</span>
              {error}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
             {!isLoginMode && (
               <div className={`auth-field ${fullNameError ? 'auth-field-error' : ''}`}>
                 <label className="hud-label" htmlFor="fullName">Full Name</label>
                 <div className="auth-input-wrap">
                   <span className="material-symbols-outlined auth-input-icon">person</span>
                   <input
                     className={`hud-input auth-input-padded ${fullNameError ? 'auth-input-error' : ''}`}
                     id="fullName"
                     type="text"
                     placeholder="Alex Rivera"
                     value={fullName}
                     onChange={(e) => setFullName(e.target.value)}
                     required
                   />
                 </div>
                 {fullNameError && <span className="auth-error-text">{fullNameError}</span>}
               </div>
             )}
 
             <div className={`auth-field ${emailError ? 'auth-field-error' : ''}`}>
               <label className="hud-label" htmlFor="email">Email Address</label>
               <div className="auth-input-wrap">
                 <span className="material-symbols-outlined auth-input-icon">mail</span>
                 <input
                   className={`hud-input auth-input-padded ${emailError ? 'auth-input-error' : ''}`}
                   id="email"
                   type="email"
                   placeholder="name@example.com"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   required
                 />
               </div>
               {emailError && <span className="auth-error-text">{emailError}</span>}
             </div>
 
             <div className={`auth-field ${passwordError ? 'auth-field-error' : ''}`}>
               <label className="hud-label" htmlFor="password">Master Password</label>
               <div className="auth-input-wrap">
                 <span className="material-symbols-outlined auth-input-icon">lock</span>
                 <input
                   className={`hud-input auth-input-padded ${!showPassword ? 'pr-12' : ''} ${passwordError ? 'auth-input-error' : ''}`}
                   id="password"
                   type={showPassword ? 'text' : 'password'}
                   placeholder="••••••••"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   required
                 />
                 <button
                   type="button"
                   className="auth-toggle-pw"
                   onClick={() => setShowPassword(!showPassword)}
                 >
                   <span className="material-symbols-outlined text-[20px]">
                     {showPassword ? 'visibility_off' : 'visibility'}
                   </span>
                 </button>
               </div>
               {passwordError && <span className="auth-error-text">{passwordError}</span>}
             </div>


            <button
              className="cyber-button auth-submit-btn"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="auth-spinner-wrap">
                  <div className="auth-spinner"></div>
                  <span>Initializing...</span>
                </div>
              ) : (
                <>
                  {isLoginMode ? 'Enter the Lab' : 'Initialize Profile'}
                  <span className="material-symbols-outlined text-[18px]">bolt</span>
                </>
              )}
            </button>
          </form>

          <div className="auth-divider">
            <span>OR CONTINUE WITH</span>
            <div className="auth-divider-line"></div>
          </div>

          <div className="auth-oauth-row">
            <button className="auth-oauth-btn">
              <img className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1sHaGbKzjUu1NOvH8kk-U5je-0aWip-uLfnw-Z0NiMvJXkbsFR3GQwRR25V4ITJVmzfD_8R8s_qJkxpTxabPI_DiwvqVb6s0zOFaqRULtVAp0jWzpyK2gICPMo7DqhP4YD1-HlsaRPAtGfCeoS32KSzM9LuGqeLQT2DQ8TXGfL7UXqEX9WYKC9_2bNnAxxjTo3kDPnOAh4-g_G4mRIoHeLEHQLPDH0y_dA3rqs1knrsS9qJBV8E7panqX721H4lkYGnkoMl95UuY" alt="Google" />
              <span>Google</span>
            </button>
            <button className="auth-oauth-btn">
              <img className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqhICjbiyhEL1GyFajl3qIaWU99Aek7Ge4iziRmS4Sg7FYMA1mumWn7ho2H8oH1TwGtc35D0IIZXdXwE5LSt47CCXu3nZTPStAwYJFokExZRC2gC5CksWdBFXpf-IMWkZJVK8KbEfnqJks5tIToOi9Q1pLT_i78Xf07cEM1x-sbPqrngbiknkSaGubpG0WJ0Hblumwg6sMaYKvXi2_ysMCzlOJExn6Jx4B76ol6E-BC-11p6BlqHjEFPQj-s7n18w-k8iBL1jv5hc" alt="GitHub" />
              <span>GitHub</span>
            </button>
          </div>

          <div className="auth-switch-mode">
            <p>
              {isLoginMode ? "Don't have an account yet?" : "Already in the lab?"}{' '}
              <span 
                className="auth-switch-link"
                onClick={() => setIsLoginMode(!isLoginMode)}
              >
                {isLoginMode ? 'Sign up for free' : 'Sign in'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
