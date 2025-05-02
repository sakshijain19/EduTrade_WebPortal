import axios from 'axios';
const BASE_URL = '/api/auth';

// API service for authentication
const authService = {
  // Register a new user
  register: async (userData) => {
    try {
      const response = await axios.post(`${BASE_URL}/register`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, credentials);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get current user profile
  getCurrentUser: async (token) => {
    try {
      const response = await axios.get(`${BASE_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update user profile
  updateProfile: async (userData, token) => {
    try {
      const response = await axios.put(`${BASE_URL}/profile`, userData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Verify token
  verifyToken: async (token) => {
    try {
      const response = await axios.get(`${BASE_URL}/verify`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default authService;