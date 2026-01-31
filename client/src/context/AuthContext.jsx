import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user from localStorage on initial render
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        
        if (token && storedUser) {
          setUser(JSON.parse(storedUser));
          
          // Verify token is still valid
          await authAPI.getMe();
        }
      } catch (error) {
        console.error('Error loading user:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Register function
  const register = async (userData) => {
    try {
      setError(null);
      const response = await authAPI.register(userData);
      
      if (response.data.success) {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
      }
      
      return response.data;
    } catch (error) {
      setError(error.message || 'Registration failed');
      throw error;
    }
  };

  // Login function
  const login = async (credentials) => {
    try {
      setError(null);
      const response = await authAPI.login(credentials);
      
      if (response.data.success) {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
      }
      
      return response.data;
    } catch (error) {
      setError(error.message || 'Login failed');
      throw error;
    }
  };

  // Google login function
  const googleLogin = async (token) => {
    try {
      setError(null);
      const response = await authAPI.googleLogin(token);
      
      if (response.data.success) {
        const { token: jwtToken, user } = response.data;
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
      }
      
      return response.data;
    } catch (error) {
      setError(error.message || 'Google login failed');
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      window.location.href = '/login';
    }
  };

  // Update profile function
  const updateProfile = async (profileData) => {
    try {
      setError(null);
      const response = await authAPI.updateProfile(profileData);
      
      if (response.data.success) {
        const updatedUser = response.data.user;
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
      
      return response.data;
    } catch (error) {
      setError(error.message || 'Profile update failed');
      throw error;
    }
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!user;
  };

  // Check if user is admin
  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const value = {
    user,
    loading,
    error,
    register,
    login,
    googleLogin,
    logout,
    updateProfile,
    isAuthenticated,
    isAdmin,
    setError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};