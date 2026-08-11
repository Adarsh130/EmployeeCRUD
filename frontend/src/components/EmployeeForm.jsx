import { useState, useEffect } from 'react';
import { createEmployee, updateEmployee } from '../api/employeeApi';
import { X, Save, UserPlus, Pencil } from 'lucide-react';
import toast from 'react-hot-toast';
import '../styles/EmployeeForm.css';

const empty = { emp_name: '', emp_salary: '', age: '', emp_city: '' };

export default function EmployeeForm({ employee, onClose }) {
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const isEdit = !!employee;

  useEffect(() => {
    setForm(
      employee
        ? { emp_name: employee.emp_name || '', emp_salary: employee.emp_salary || '', age: employee.age || '', emp_city: employee.emp_city || '' }
        : empty
    );
  }, [employee]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    if (!form.emp_name.trim())                                            return 'Full name is required.';
    if (!form.emp_salary || isNaN(form.emp_salary) || +form.emp_salary < 0) return 'Enter a valid salary.';
    if (!form.age || isNaN(form.age) || +form.age < 18 || +form.age > 80) return 'Age must be between 18 and 80.';
    if (!form.emp_city.trim())                                            return 'City is required.';
    return null;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { toast.error(err); return; }

    const payload = {
      emp_name:   form.emp_name.trim(),
      emp_salary: parseFloat(form.emp_salary),
      age:        parseInt(form.age),
      emp_city:   form.emp_city.trim(),
    };

    setSaving(true);
    (isEdit ? updateEmployee(employee.emp_id, payload) : createEmployee(payload))
      .then(() => { toast.success(isEdit ? 'Employee updated!' : 'Employee added!'); onClose(true); })
      .catch(() => toast.error('Something went wrong. Please try again.'))
      .finally(() => setSaving(false));
  };

  return (
    <div className="modal-overlay" onClick={() => onClose(false)}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-header-left">
            <div className="modal-icon-wrap">
              {isEdit ? <Pencil size={18} /> : <UserPlus size={18} />}
            </div>
            <div>
              <div className="modal-title">{isEdit ? 'Edit Employee' : 'Add Employee'}</div>
              <div className="modal-subtitle">
                {isEdit ? `Updating record #${employee.emp_id}` : 'Fill in the details below'}
              </div>
            </div>
          </div>
          <button className="modal-close-btn" onClick={() => onClose(false)} aria-label="Close">
            <X size={17} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={onSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label" htmlFor="emp_name">Full Name</label>
              <input
                id="emp_name"
                name="emp_name"
                type="text"
                className="form-input"
                placeholder="e.g. Adarsh Kumar"
                value={form.emp_name}
                onChange={onChange}
                autoComplete="off"
              />
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label" htmlFor="emp_salary">Salary (₹)</label>
                <input
                  id="emp_salary"
                  name="emp_salary"
                  type="number"
                  className="form-input"
                  placeholder="e.g. 50000"
                  value={form.emp_salary}
                  onChange={onChange}
                  min="0"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="age">Age</label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  className="form-input"
                  placeholder="18 – 80"
                  value={form.age}
                  onChange={onChange}
                  min="18"
                  max="80"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="emp_city">City</label>
              <input
                id="emp_city"
                name="emp_city"
                type="text"
                className="form-input"
                placeholder="e.g. Mumbai"
                value={form.emp_city}
                onChange={onChange}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="modal-divider" />
          <div className="modal-footer">
            <button type="button" className="btn-ghost" onClick={() => onClose(false)}>
              Cancel
            </button>
            <button type="submit" className="btn-submit" disabled={saving}>
              {saving ? (
                <><div className="spinner" /> Saving…</>
              ) : (
                <><Save size={15} /> {isEdit ? 'Update' : 'Add Employee'}</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
