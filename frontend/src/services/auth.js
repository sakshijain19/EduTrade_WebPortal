import axios from 'axios';

// Use your backend URL from environment variables
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'https://edutrade-webportal.onrender.com/api';
const API_URL = `${API_BASE_URL}/auth`;

// Axios instance for all auth requests
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // 🛡️ allows cookies to be sent if needed
});

// Interceptor to attach token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const authService = {
  // Register
  register: async (userData) => {
    try {
      const response = await axiosInstance.post('/register', userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Login
  login: async (credentials) => {
    try {
      const response = await axiosInstance.post('/login', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
  },

  // Get user profile
  getCurrentUser: async () => {
    try {
      const response = await axiosInstance.get('/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Update profile
  updateProfile: async (userData) => {
    try {
      const response = await axiosInstance.put('/profile', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Verify token
  verifyToken: async () => {
    try {
      const response = await axiosInstance.get('/verify');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Check auth
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

export default authService;
