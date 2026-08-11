import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({ user: null, login: () => {}, logout: () => {}, isAuthenticated: false });

// Hardcoded credentials for the mini project
// In production, this would be verified against the backend
const VALID_USERS = [
  { username: 'admin', password: 'admin123', role: 'Administrator', name: 'Admin User' },
  { username: 'adarsh', password: 'adarsh@1306', role: 'HR Manager', name: 'Adarsh Kumar' },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('emp-user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const login = (username, password) => {
    const match = VALID_USERS.find(
      (u) => u.username === username.trim() && u.password === password
    );
    if (match) {
      const userData = { username: match.username, role: match.role, name: match.name };
      setUser(userData);
      localStorage.setItem('emp-user', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: 'Invalid username or password.' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('emp-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
