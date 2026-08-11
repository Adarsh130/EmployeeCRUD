import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Users, LayoutDashboard, Menu, X, Sun, Moon, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme }      = useTheme();
  const { user, logout }            = useAuth();
  const navigate                    = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <nav className="navbar">
      {/* Brand */}
      <Link to="/" className="navbar-brand">
        <div className="navbar-logo"><Users size={18} /></div>
        <span className="navbar-title">EmpManager</span>
      </Link>

      {/* Center pill nav */}
      <div className={`navbar-links ${mobileOpen ? 'open' : ''}`}>
        <NavLink
          to="/"
          end
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          onClick={() => setMobileOpen(false)}
        >
          <LayoutDashboard size={15} />
          Dashboard
        </NavLink>
        <NavLink
          to="/employees"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          onClick={() => setMobileOpen(false)}
        >
          <Users size={15} />
          Employees
        </NavLink>
      </div>

      {/* Right controls */}
      <div className="navbar-right">
        {/* Theme toggle */}
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label="Toggle theme"
        >
          <div className="theme-toggle-thumb">
            {theme === 'dark' ? <Moon size={12} /> : <Sun size={12} />}
          </div>
        </button>

        {/* User avatar + logout */}
        {user && (
          <div className="navbar-user">
            <div className="navbar-avatar" title={`${user.name} — ${user.role}`}>
              {user.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)}
            </div>
            <div className="navbar-user-info">
              <span className="navbar-user-name">{user.name}</span>
              <span className="navbar-user-role">{user.role}</span>
            </div>
            <button
              className="navbar-logout"
              onClick={handleLogout}
              title="Sign out"
              aria-label="Sign out"
            >
              <LogOut size={15} />
            </button>
          </div>
        )}

        {/* Mobile hamburger */}
        <button
          className="mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </nav>
  );
}
