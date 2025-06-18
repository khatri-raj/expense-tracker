import { createContext, useContext, useState, useEffect } from 'react';
import { isAuthenticated } from '../utils/auth';
import api from '../api/axiosConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(isAuthenticated());
  const [categories, setCategories] = useState([]);

  const login = (accessToken, refreshToken) => {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
    setLoggedIn(true);
    fetchCategories();
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setLoggedIn(false);
    setCategories([]);
    // Navigation will be handled by the calling component
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('/api/categories/');
      console.log('Fetched categories:', response.data); // Debug: Log categories
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error.response?.data);
      if (error.response?.status === 401) {
        logout(); // Trigger logout, but let components handle navigation
      }
    }
  };

  useEffect(() => {
    if (loggedIn) {
      fetchCategories();
    }
  }, [loggedIn]);

  const handleStorageChange = () => {
    setLoggedIn(isAuthenticated());
  };

  useEffect(() => {
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout, categories, setCategories, fetchCategories }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);