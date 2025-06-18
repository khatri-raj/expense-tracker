import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    console.log('Token in interceptor:', token); // Debug: Log token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }
        const response = await api.post('/api/token/refresh/', { refresh: refreshToken });
        const newAccessToken = response.data.access;
        console.log('New access token:', newAccessToken); // Debug: Log new token
        localStorage.setItem('access_token', newAccessToken);
        api.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token error:', refreshError); // Debug: Log refresh error
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    console.error('API error:', error.response?.data); // Debug: Log API error
    return Promise.reject(error);
  }
);

export default api;