import axios from 'axios';

const API_URL = '/api/auth';

// Set up axios interceptor for token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const authService = {
  // Register a new user
  register: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
  },

  // Get current user profile
  getCurrentUser: async () => {
    try {
      const response = await axios.get(`${API_URL}/profile`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Update user profile
  updateProfile: async (userData) => {
    try {
      const response = await axios.put(`${API_URL}/profile`, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Verify token
  verifyToken: async () => {
    try {
      const response = await axios.get(`${API_URL}/verify`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

export default authService;