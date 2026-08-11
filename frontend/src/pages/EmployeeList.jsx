import { useEffect, useState } from 'react';
import { getAllEmployees, deleteEmployee } from '../api/employeeApi';
import { Plus, Search, Pencil, Trash2, UserX, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';
import EmployeeForm from '../components/EmployeeForm';
import '../styles/EmployeeList.css';

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

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState(null);

  const fetchAll = () => {
    setLoading(true);
    getAllEmployees()
      .then((res) => { setEmployees(res.data); setFiltered(res.data); })
      .catch(() => toast.error('Failed to load employees'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchAll(); }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      employees.filter(
        (e) =>
          e.emp_name?.toLowerCase().includes(q) ||
          e.emp_city?.toLowerCase().includes(q) ||
          String(e.emp_id).includes(q)
      )
    );
  }, [search, employees]);

  const handleDelete = (id, name) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    deleteEmployee(id)
      .then(() => { toast.success(`${name} deleted`); fetchAll(); })
      .catch(() => toast.error('Failed to delete employee'));
  };

  const openAdd  = () => { setEditTarget(null); setShowForm(true); };
  const openEdit = (emp) => { setEditTarget(emp); setShowForm(true); };
  const closeForm = (refresh) => {
    setShowForm(false);
    setEditTarget(null);
    if (refresh) fetchAll();
  };

  return (
    <div className="emp-list-page">
      {/* Header */}
      <div className="page-header">
        <div className="page-title-group">
          <h1 className="page-title">Employees</h1>
          <p className="page-subtitle">
            Manage your team
            <span className="count-pill">{employees.length}</span>
          </p>
        </div>
        <button className="btn-primary" onClick={openAdd}>
          <Plus size={16} />
          Add Employee
        </button>
      </div>

      {/* Search toolbar */}
      <div className="toolbar">
        <div className="search-wrap">
          <Search size={16} className="search-icon-inner" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by name, city or ID…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            id="employee-search"
          />
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="table-skeleton-wrap">
          <div className="table-skeleton-header" />
          <div className="skeleton-rows">
            {[...Array(5)].map((_, i) => <div key={i} className="skeleton-row" />)}
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <UserX size={28} />
          </div>
          <h3>{search ? 'No results found' : 'No employees yet'}</h3>
          <p>
            {search
              ? `No employees match "${search}". Try a different search.`
              : 'Get started by adding your first employee using the button above.'}
          </p>
        </div>
      ) : (
        <div className="table-container">
          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Salary</th>
                  <th>Age</th>
                  <th>City</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((emp, i) => (
                  <tr key={emp.emp_id} style={{ animationDelay: `${i * 0.04}s` }}>
                    <td>
                      <div className="emp-cell">
                        <div
                          className="emp-avatar"
                          style={{ background: avatarColor(emp.emp_name) }}
                        >
                          {initials(emp.emp_name)}
                        </div>
                        <div className="emp-cell-text">
                          <div className="emp-cell-name">{emp.emp_name}</div>
                          <div className="emp-cell-meta">ID #{emp.emp_id}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="salary-text">
                        ₹{(emp.emp_salary || 0).toLocaleString('en-IN')}
                      </span>
                    </td>
                    <td>
                      <span className="age-text">{emp.age}</span>
                    </td>
                    <td>
                      <span className="badge-city">
                        <MapPin size={11} />
                        {emp.emp_city}
                      </span>
                    </td>
                    <td>
                      <div className="row-actions">
                        <button
                          className="icon-btn icon-btn-edit"
                          onClick={() => openEdit(emp)}
                          title="Edit employee"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          className="icon-btn icon-btn-delete"
                          onClick={() => handleDelete(emp.emp_id, emp.emp_name)}
                          title="Delete employee"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showForm && (
        <EmployeeForm employee={editTarget} onClose={closeForm} />
      )}
    </div>
  );
}
