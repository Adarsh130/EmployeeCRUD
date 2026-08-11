import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EmployeeList from './pages/EmployeeList';
import './styles/global.css';

function ToasterWithTheme() {
  const { theme } = useTheme();
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3500,
        style: {
          background: theme === 'dark' ? '#1a1d35' : '#ffffff',
          color:      theme === 'dark' ? '#eef2ff' : '#0f172a',
          border:     `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
          borderRadius: '12px',
          fontSize: '0.875rem',
          fontWeight: '500',
          boxShadow: theme === 'dark'
            ? '0 8px 32px rgba(0,0,0,0.4)'
            : '0 8px 32px rgba(0,0,0,0.1)',
        },
        success: { iconTheme: { primary: '#22c55e', secondary: '#fff' } },
        error:   { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
      }}
    />
  );
}

/* Layout for authenticated pages (with Navbar) */
function AuthLayout() {
  return (
    <div className="layout">
      <Navbar />
      <main className="page-content">
        <Routes>
          <Route path="/"          element={<Dashboard />} />
          <Route path="/employees" element={<EmployeeList />} />
          {/* Catch-all: redirect unknown paths to dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

/* Root router — public /login vs protected everything else */
function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public route */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
      />

      {/* All other routes are protected */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <AuthLayout />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
          <ToasterWithTheme />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
