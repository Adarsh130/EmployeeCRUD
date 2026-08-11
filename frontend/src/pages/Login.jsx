import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Users, Eye, EyeOff, LogIn, Shield, BarChart2, Lock,
  Sun, Moon, AlertCircle, KeyRound, UserRound, Loader2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import '../styles/Login.css';

const FEATURES = [
  { icon: <BarChart2 size={15} />, text: 'Real-time employee analytics dashboard' },
  { icon: <Users size={15} />,     text: 'Full CRUD — add, edit and remove records' },
  { icon: <Shield size={15} />,    text: 'Role-based secure access control' },
  { icon: <Lock size={15} />,      text: 'MySQL-backed persistent data storage' },
];

export default function Login() {
  const { login }       = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate        = useNavigate();
  const location        = useLocation();

  const from = location.state?.from?.pathname || '/';

  const [form, setForm]       = useState({ username: '', password: '' });
  const [showPw, setShowPw]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [shakeKey, setShakeKey] = useState(0); // to re-trigger shake

  const onChange = (e) => {
    setError('');
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.username.trim() || !form.password) {
      setError('Please enter both username and password.');
      setShakeKey((k) => k + 1);
      return;
    }

    setLoading(true);
    // Simulate a brief network delay for realism
    setTimeout(() => {
      const result = login(form.username, form.password);
      setLoading(false);
      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setError(result.error);
        setShakeKey((k) => k + 1);
      }
    }, 800);
  };

  return (
    <div className="login-page">
      {/* Floating theme toggle */}
      <button className="login-theme-btn" onClick={toggleTheme} title="Toggle theme">
        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      {/* ── Left Branding Panel ── */}
      <div className="login-left">
        <div className="login-brand">
          <div className="login-brand-icon"><Users size={22} /></div>
          <span className="login-brand-name">EmpManager</span>
        </div>

        <div className="login-hero">
          <h1 className="login-hero-title">
            Manage your<br />team smarter.
          </h1>
          <p className="login-hero-subtitle">
            A full-stack Employee Management System built with Spring Boot &amp; React — your B.Tech mini project.
          </p>

          <div className="login-features">
            {FEATURES.map((f) => (
              <div className="login-feature" key={f.text}>
                <div className="login-feature-dot">{f.icon}</div>
                {f.text}
              </div>
            ))}
          </div>
        </div>

        <p className="login-footer-note">
          B.Tech Mini Project · Spring Boot 4 · React 19 · MySQL
        </p>
      </div>

      {/* ── Right Form Panel ── */}
      <div className="login-right">
        <div className="login-form-box">
          <div className="login-form-header">
            <h2 className="login-form-title">Welcome back 👋</h2>
            <p className="login-form-subtitle">Sign in to access the dashboard</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {/* Error message */}
            {error && (
              <div className="login-error">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            {/* Username */}
            <div className="login-field">
              <label className="login-label" htmlFor="username">Username</label>
              <div className="login-input-wrap">
                <UserRound size={16} className="login-input-icon" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  className={`login-input ${error ? 'error-state' : ''}`}
                  key={`u-${shakeKey}`}
                  placeholder="Enter your username"
                  value={form.username}
                  onChange={onChange}
                  autoComplete="username"
                  autoFocus
                />
              </div>
            </div>

            {/* Password */}
            <div className="login-field">
              <label className="login-label" htmlFor="password">Password</label>
              <div className="login-input-wrap">
                <KeyRound size={16} className="login-input-icon" />
                <input
                  id="password"
                  name="password"
                  type={showPw ? 'text' : 'password'}
                  className={`login-input ${error ? 'error-state' : ''}`}
                  key={`p-${shakeKey}`}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={onChange}
                  autoComplete="current-password"
                  style={{ paddingRight: '2.8rem' }}
                />
                <button
                  type="button"
                  className="pw-toggle"
                  onClick={() => setShowPw(!showPw)}
                  tabIndex={-1}
                  aria-label={showPw ? 'Hide password' : 'Show password'}
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button type="submit" className="login-btn" disabled={loading} id="login-submit">
              {loading ? (
                <><Loader2 size={18} className="spin-icon" style={{ animation: 'spin 0.7s linear infinite' }} /> Signing in…</>
              ) : (
                <><LogIn size={18} /> Sign In</>
              )}
            </button>
          </form>

          {/* Credential hint card */}
          <div className="login-hint">
            <div className="login-hint-title">
              <Shield size={13} /> Demo Credentials
            </div>
            <div className="login-hint-row">
              <span>Admin:</span>
              <span className="login-hint-key">admin</span>
              <span>/</span>
              <span className="login-hint-key">admin123</span>
            </div>
            <div className="login-hint-row">
              <span>HR:</span>
              <span className="login-hint-key">adarsh</span>
              <span>/</span>
              <span className="login-hint-key">adarsh@1306</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
