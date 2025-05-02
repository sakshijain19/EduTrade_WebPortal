import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check if user is already logged in
        const token = localStorage.getItem('token');
        if (token) {
            verifyToken(token);
        } else {
            setLoading(false);
        }
    }, []);

    const verifyToken = async (token) => {
        try {
            const response = await axios.get('http://localhost:5000/api/auth/verify', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUser(response.data.user);
        } catch (error) {
            console.error('Token verification failed:', error);
            localStorage.removeItem('token');
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        try {
            setError(null);
            const response = await axios.post('http://localhost:5000/api/auth/register', userData);
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            setUser(user);
            return { success: true };
        } catch (error) {
            const message = error.response?.data?.message || 'Registration failed';
            setError(message);
            return { success: false, error: message };
        }
    };

    const login = async (credentials) => {
        try {
            setError(null);
            const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            setUser(user);
            return { success: true };
        } catch (error) {
            const message = error.response?.data?.message || 'Login failed';
            setError(message);
            return { success: false, error: message };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const value = {
        user,
        loading,
        error,
        register,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};