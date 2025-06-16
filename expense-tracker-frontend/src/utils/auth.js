export const isAuthenticated = () => {
  const token = localStorage.getItem('access_token');
  if (!token) return false;
  try {
    return true; // Simplified check for now
  } catch (error) {
    return false;
  }
};