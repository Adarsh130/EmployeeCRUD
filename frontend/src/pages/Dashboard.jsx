import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllEmployees } from '../api/employeeApi';
import { Users, IndianRupee, MapPin, TrendingUp, ArrowRight, Building2 } from 'lucide-react';
import '../styles/Dashboard.css';

/* Generate a consistent color from a name */
const AVATAR_COLORS = [
  'linear-gradient(135deg,#7c3aed,#3b82f6)',
  'linear-gradient(135deg,#0d9488,#14b8a6)',
  'linear-gradient(135deg,#be185d,#ec4899)',
  'linear-gradient(135deg,#b45309,#f59e0b)',
  'linear-gradient(135deg,#1d4ed8,#3b82f6)',
  'linear-gradient(135deg,#6d28d9,#8b5cf6)',
];
const avatarColor = (name = '') => AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
const initials = (name = '') =>
  name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase();

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
};

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllEmployees()
      .then((res) => setEmployees(res.data))
      .catch(() => setEmployees([]))
      .finally(() => setLoading(false));
  }, []);

  const total = employees.length;
  const avgSalary = total ? employees.reduce((s, e) => s + (e.emp_salary || 0), 0) / total : 0;
  const maxSalary = total ? Math.max(...employees.map((e) => e.emp_salary || 0)) : 1;
  const avgAge = total ? Math.round(employees.reduce((s, e) => s + (e.age || 0), 0) / total) : 0;
  const cities = new Set(employees.map((e) => e.emp_city).filter(Boolean)).size;

  const stats = [
    {
      id: 'total',
      label: 'Total Employees',
      value: total,
      icon: <Users size={20} />,
      color: 'purple',
      trend: total > 0 ? `${total} active` : '—',
      trendClass: 'up',
    },
    {
      id: 'salary',
      label: 'Average Salary',
      value: `₹${Math.round(avgSalary).toLocaleString('en-IN')}`,
      icon: <IndianRupee size={20} />,
      color: 'blue',
      trend: 'Monthly',
      trendClass: 'blue',
    },
    {
      id: 'age',
      label: 'Average Age',
      value: avgAge ? `${avgAge} yrs` : '—',
      icon: <TrendingUp size={20} />,
      color: 'teal',
      trend: avgAge ? 'Avg age' : '—',
      trendClass: 'blue',
    },
    {
      id: 'cities',
      label: 'Cities Covered',
      value: cities,
      icon: <MapPin size={20} />,
      color: 'amber',
      trend: cities > 0 ? `${cities} location${cities !== 1 ? 's' : ''}` : '—',
      trendClass: 'up',
    },
  ];

  return (
    <div className="dashboard">
      {/* Hero Banner */}
      <div className="dashboard-hero">
        <div className="hero-text">
          <p className="hero-greeting">{getGreeting()}, Admin 👋</p>
          <h1 className="hero-title">
            Employee <span>Management</span>
          </h1>
          <p className="hero-subtitle">
            Track, manage and grow your team from one place.
          </p>
        </div>
        <div className="hero-badge">
          <Building2 size={16} />
          {loading ? '…' : `${total} Records`}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="stats-grid">
        {stats.map((stat, i) => (
          <div
            key={stat.id}
            className={`stat-card ${stat.color}`}
            style={{ animationDelay: `${i * 0.07}s`, animation: 'fadeInUp 0.4s ease both' }}
          >
            {loading ? (
              <div className="skeleton-shimmer" style={{ height: 80, borderRadius: 'var(--r-md)' }} />
            ) : (
              <>
                <div className="stat-card-top">
                  <div className="stat-icon">{stat.icon}</div>
                  <span className={`stat-trend ${stat.trendClass}`}>{stat.trend}</span>
                </div>
                <div>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Recent Employees */}
      {!loading && employees.length > 0 ? (
        <div style={{ animation: 'fadeInUp 0.45s ease 0.25s both' }}>
          <div className="section-header">
            <h2 className="section-title">Recent Employees</h2>
            <Link to="/employees" className="section-link">
              View all <ArrowRight size={13} />
            </Link>
          </div>
          <div className="card-table">
            <table>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Salary</th>
                  <th>Age</th>
                  <th>City</th>
                </tr>
              </thead>
              <tbody>
                {employees.slice(0, 6).map((emp) => (
                  <tr key={emp.emp_id}>
                    <td>
                      <div className="emp-cell">
                        <div
                          className="emp-avatar"
                          style={{ background: avatarColor(emp.emp_name) }}
                        >
                          {initials(emp.emp_name)}
                        </div>
                        <div>
                          <div className="emp-name">{emp.emp_name}</div>
                          <div className="emp-id">ID #{emp.emp_id}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="salary-bar-wrap">
                        <span className="badge-salary">
                          ₹{(emp.emp_salary || 0).toLocaleString('en-IN')}
                        </span>
                        <div className="salary-bar-bg">
                          <div
                            className="salary-bar-fill"
                            style={{ width: `${((emp.emp_salary || 0) / maxSalary) * 100}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td>{emp.age} yrs</td>
                    <td>
                      <span className="badge-city">
                        <MapPin size={11} />
                        {emp.emp_city}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : !loading ? (
        <div className="dashboard-empty">
          <Users size={48} opacity={0.25} />
          <p>No employees yet. <Link to="/employees" style={{ color: 'var(--accent-purple-l)' }}>Add your first one →</Link></p>
        </div>
      ) : null}
    </div>
  );
}
