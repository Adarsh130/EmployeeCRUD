import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const getAllEmployees    = ()         => api.get('/employees');
export const getEmployeeById   = (id)       => api.get(`/employees/${id}`);
export const createEmployee    = (data)     => api.post('/employees', data);
export const updateEmployee    = (id, data) => api.put(`/employees/${id}`, data);
export const deleteEmployee    = (id)       => api.delete(`/employees/${id}`);
export const deleteAllEmployees = ()        => api.delete('/employees');

export default api;
