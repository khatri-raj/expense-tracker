import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { isAuthenticated } from '../utils/auth';
import api from '../api/axiosConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(isAuthenticated());
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [categoriesError, setCategoriesError] = useState(null);
  const [lastFetchTime, setLastFetchTime] = useState(0); // Prevent rapid refetches

  const login = (accessToken, refreshToken) => {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
    setLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setLoggedIn(false);
    setCategories([]);
    setCategoriesError(null);
  };

  const fetchCategories = useCallback(async () => {
    const now = Date.now();
    if (now - lastFetchTime < 1000) {
      console.log('Skipping fetch: too soon'); // Debug
      return; // Prevent fetching too frequently
    }
    if (categoriesLoading) {
      console.log('Skipping fetch: already loading'); // Debug
      return; // Prevent concurrent fetches
    }

    setCategoriesLoading(true);
    setCategoriesError(null);
    try {
      const response = await api.get('/api/categories/');
      console.log('Fetched categories:', response.data); // Debug
      if (!Array.isArray(response.data)) {
        throw new Error('Invalid response format: Expected JSON array');
      }
      setCategories(response.data);
      setLastFetchTime(now);
    } catch (error) {
      console.error('Error fetching categories:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      let errorMessage = error.message || 'Failed to fetch categories';
      if (error.response?.status === 401) {
        errorMessage = 'Unauthorized: Please log in again';
        logout();
      } else if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      }
      setCategoriesError(errorMessage);
    } finally {
      setCategoriesLoading(false);
    }
  }, [categoriesLoading, lastFetchTime]); // Dependencies for useCallback

  useEffect(() => {
    if (loggedIn && !categories.length && !categoriesLoading && !categoriesError) {
      fetchCategories();
    }
  }, [loggedIn, categories.length, categoriesLoading, categoriesError, fetchCategories]);

  const handleStorageChange = () => {
    setLoggedIn(isAuthenticated());
  };

  useEffect(() => {
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        login,
        logout,
        categories,
        setCategories,
        fetchCategories,
        categoriesLoading,
        categoriesError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);