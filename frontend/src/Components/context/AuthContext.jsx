/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';

// Create the context
export const AuthContext = createContext(null);

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Set up the API base URL
  const API_URL = 'http://localhost:5001/api';

  // Initialize auth state on component mount
  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        try {
          // Fetch current user info if token exists
          await fetchUserProfile();
        } catch (error) {
          console.error('Error initializing auth:', error);
          // Clear invalid token
          logout();
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [token]);

  // Fetch user profile
  const fetchUserProfile = async () => {
    try {
      setError(null);
      
      const response = await fetch(`${API_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) throw new Error('Failed to fetch user profile');
      const data = await response.json();
      setUser(data);
      
    } catch (error) {
      setError(error.message);   
      console.error('Error fetching user profile:', error);
      throw error;
    }
  };

  // Register a new user
  const register = async (name, email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name, 
          email, 
          password
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
      
      return { success: true };
    } catch (error) {
      setError(error.message);
      console.error('Registration error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Login a user
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser(data.user);
      
      return { success: true };
    } catch (error) {
      setError(error.message);
      console.error('Login error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Logout the user
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_URL}/auth/update-profile`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Profile update failed');
      }
      
      const data = await response.json();
      setUser(data.user);
      
      return { success: true };
    } catch (error) {
      setError(error.message);
      console.error('Profile update error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Change password
  const changePassword = async (currentPassword, newPassword) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_URL}/auth/change-password`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Password change failed');
      }
      
      return { success: true };
    } catch (error) {
      setError(error.message);
      console.error('Password change error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Context value
  const value = {
    user,
    token,
    loading,
    error,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    register,
    login,
    logout,
    updateProfile,
    changePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};