import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
})

export const sectorService = {
  getAll: () => api.get('/sectors'),
  create: (data) => api.post('/sectors', data),
}

export const employeeService = {
  getAll: () => api.get('/employees'),
  create: (data) => api.post('/employees', data),
  update: (id, data) => api.put(`/employees/${id}`, data),
  delete: (id) => api.delete(`/employees/${id}`),
}

export const attendanceService = {
  getForEmployee: (employeeId, year) =>
    api.get(`/attendance/employee/${employeeId}?year=${year}`),
  update: (recordId, data) =>
    api.put(`/attendance/${recordId}`, data),
  getAggregation: (employeeId, year, month) =>
    api.get(`/attendance/employee/${employeeId}/aggregation?year=${year}&month=${month}`),
}

export default api