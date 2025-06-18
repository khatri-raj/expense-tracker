import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    console.log('Axios request:', config.url, 'Token:', token); // Debug
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log('Response error:', {
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers,
    }); // Debug
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }
        const response = await api.post('/api/token/refresh/', { refresh: refreshToken });
        const newAccessToken = response.data.access;
        console.log('New access token:', newAccessToken); // Debug
        localStorage.setItem('access_token', newAccessToken);
        api.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token error:', refreshError);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        return Promise.reject(refreshError);
      }
    }
    // Handle non-JSON responses
    if (error.response?.headers['content-type']?.includes('text/html')) {
      console.error('Received HTML response:', error.response.data.substring(0, 100)); // Log first 100 chars
      error.message = 'Server returned HTML instead of JSON';
    }
    return Promise.reject(error);
  }
);

export default api;