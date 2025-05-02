/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, AlertCircle, Loader } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const { login, register, error } = useAuth();
  const navigate = useNavigate();

  // Reset form when modal visibility changes
  useEffect(() => {
    if (isOpen) {
      setFormErrors({});
      setLoginSuccess(false);
    } else {
      // Reset form when closed
      setEmail('');
      setPassword('');
      setName('');
      setIsLogin(true);
    }
  }, [isOpen]);

  // Update form errors when auth context error changes
  useEffect(() => {
    if (error) {
      setFormErrors({ submit: error });
    }
  }, [error]);

  if (!isOpen) return null;

  // Form validation
  const validateForm = () => {
    const errors = {};

    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else {
      // Enhanced password validation for registration
      if (!isLogin) {
        if (password.length < 6) {
          errors.password = 'Password must be at least 6 characters';
        } else if (!/[A-Z]/.test(password)) {
          errors.password = 'Password must contain at least one uppercase letter';
        } else if (!/[0-9]/.test(password)) {
          errors.password = 'Password must contain at least one number';
        }
      }
    }

    if (!isLogin && !name) {
      errors.name = 'Name is required';
    } else if (!isLogin && name.length < 2) {
      errors.name = 'Name must be at least 2 characters long';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setFormErrors({});

    try {
      if (isLogin) {
        // Login user
        const result = await login(email, password);
        if (result.success) {
          setLoginSuccess(true);
          if (onAuthSuccess) {
            onAuthSuccess(result);
          }
          // Navigate to home page after successful login
          setTimeout(() => {
            onClose();
            navigate('/');
          }, 1500);
        } else {
          setFormErrors({ submit: result.error || 'Login failed. Please try again.' });
        }
      } else {
        // Register user
        const result = await register(name, email, password);
        if (result?.success) {
          setLoginSuccess(true);
          if (onAuthSuccess) {
            onAuthSuccess(result);
          }
          // Navigate to home page after successful registration
          setTimeout(() => {
            onClose();
            navigate('/');
          }, 1500);
        } else if (result?.error) {
          setFormErrors({ submit: result.error });
        }
      }
    } catch (err) {
      setFormErrors({ submit: 'An unexpected error occurred. Please try again.' });
      console.error('Auth error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            {isLogin ? 'Login to Your Account' : 'Create an Account'}
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 transition-colors focus:outline-none"
          >
            <X size={24} />
          </button>
        </div>

        {/* Success message */}
        {loginSuccess && (
          <div className="bg-green-50 p-4 border-l-4 border-green-500">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-800">
                  {isLogin 
                    ? 'Successfully logged in! Redirecting...' 
                    : 'Account created successfully! Logging you in...'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Error message */}
          {formErrors.submit && (
            <div className="bg-red-50 p-4 rounded-md flex items-start">
              <AlertCircle className="h-5 w-5 text-red-400 mr-3 mt-0.5" />
              <span className="text-sm text-red-800">{formErrors.submit}</span>
            </div>
          )}

          {/* Name field (sign up only) */}
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`pl-10 block w-full border ${formErrors.name ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="John Doe"
                />
              </div>
              {formErrors.name && (
                <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
              )}
            </div>
          )}

          {/* Email field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`pl-10 block w-full border ${formErrors.email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                placeholder="you@example.com"
              />
            </div>
            {formErrors.email && (
              <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
            )}
          </div>

          {/* Password field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`pl-10 pr-10 block w-full border ${formErrors.password ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                placeholder={isLogin ? "Enter password" : "Create password"}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            {formErrors.password && (
              <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>
            )}
          </div>

          {/* Submit button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                  {isLogin ? 'Logging in...' : 'Creating account...'}
                </>
              ) : (
                isLogin ? 'Login' : 'Sign Up'
              )}
            </button>
          </div>

          {/* Removed forgot password section */}
        </form>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-blue-600 hover:text-blue-500 font-medium"
          >
            {isLogin 
              ? "Don't have an account? Sign up" 
              : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
}