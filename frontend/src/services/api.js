import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Vehicles
export const getVehicles = (params) => api.get('/vehicles', { params })
export const getVehicle = (id) => api.get(`/vehicles/${id}`)
export const createVehicle = (data) => api.post('/vehicles', data)
export const updateVehicle = (id, data) => api.put(`/vehicles/${id}`, data)
export const deleteVehicle = (id) => api.delete(`/vehicles/${id}`)

// Inspections
export const getInspections = (params) => api.get('/inspections', { params })
export const getInspection = (id) => api.get(`/inspections/${id}`)
export const createInspection = (data) => api.post('/inspections', data)
export const updateInspection = (id, data) => api.put(`/inspections/${id}`, data)
export const getInspectionStats = () => api.get('/inspections/stats/summary')

// Users
export const getUsers = () => api.get('/users')
export const getUser = (id) => api.get(`/users/${id}`)
export const createUser = (data) => api.post('/users', data)

// Standards
export const getStandards = (params) => api.get('/standards', { params })
export const getStandard = (id) => api.get(`/standards/${id}`)

export default {
  getVehicles,
  getVehicle,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  getInspections,
  getInspection,
  createInspection,
  updateInspection,
  getInspectionStats,
  getUsers,
  getUser,
  createUser,
  getStandards,
  getStandard,
}
