import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockLogin, mockValidateSession, mockLogout } from '@/utils/mockAuth';
import { setLoggedOutState } from '@/utils/globalSecurity';
import { nuclearLogout } from '@/utils/nuclearSecurity';

const AuthContext = createContext(null);

/**
 * FRONTEND-ONLY VERSION
 * This app is now a frontend-only demo with mock authentication.
 * Login credentials: admin / admin123
 * No backend database is required.
 */

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wasLoggedOut, setWasLoggedOut] = useState(false);
  const navigate = useNavigate();

  // Validate session (mock version)
  const validateSession = () => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        return mockValidateSession(userData);
      } catch {
        return false;
      }
    }
    return false;
  };

  // Load user data from localStorage on mount
  useEffect(() => {
    const initializeAuth = () => {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        try {
          const userData = JSON.parse(savedUser);
          if (mockValidateSession(userData)) {
            setUser(userData);
          } else {
            localStorage.removeItem('user');
            setUser(null);
          }
        } catch (error) {
          console.error('Error parsing saved user data:', error);
          localStorage.removeItem('user');
          setUser(null);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = (username, password, options = {}) => {
    try {
      // Use mock authentication
      const result = mockLogin(username, password);
      
      if (!result.success) {
        return { success: false, message: result.message || 'Invalid credentials' };
      }

      // Store user in state and localStorage
      const normalizedUser = {
        ...result.user,
        user_type: result.user.role || 'admin'
      };
      
      setUser(normalizedUser);
      localStorage.setItem('user', JSON.stringify(normalizedUser));
      
      // Reset logout flag on successful login
      setWasLoggedOut(false);
      setLoggedOutState(false);
      localStorage.removeItem('userLoggedOut');
      
      // Navigate based on user type
      navigate('/dashboard', { replace: true });
      return { success: true, user: normalizedUser };
    } catch (e) {
      return { success: false, message: 'Login failed' };
    }
  };


  const changePassword = (userId, newPassword, confirmPassword) => {
    // Mock: Just return success
    return { success: true, message: 'Password changed (mock)' };
  };

  const addEmailDuringLogin = (userId, email) => {
    // Mock: Just return success
    return { success: true, message: 'Email added (mock)' };
  };

  const logout = () => {
    // Mark that user was logged out
    setWasLoggedOut(true);
    
    // Set global logout state
    setLoggedOutState(true);
    
    // Set logout flag in localStorage
    localStorage.setItem('userLoggedOut', 'true');
    
    // Clear all user data
    setUser(null);
    localStorage.removeItem('user');
    sessionStorage.clear();
    
    // Clear browser cache
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => {
          caches.delete(name);
        });
      });
    }
    
    nuclearLogout();
  };

  // Update user profile
  const updateProfile = (updates) => {
    setUser((prev) => {
      const updated = { ...prev, ...updates };
      localStorage.setItem('user', JSON.stringify(updated));
      return updated;
    });
  };

  const value = {
    user,
    login,
    logout,
    loading,
    updateProfile,
    validateSession,
    wasLoggedOut,
    addEmailDuringLogin,
    changePassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};