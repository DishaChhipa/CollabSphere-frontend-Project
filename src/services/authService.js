import axiosInstance from '../api/axios';
import { STORAGE_KEYS } from '../utils/constants';

const authService = {
  login: async (email, password) => {
    try {
      const response = await axiosInstance.post('/auth/login', { email, password });
      if (response.data.token) {
        localStorage.setItem(STORAGE_KEYS.TOKEN, response.data.token);
        const userData = {
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          role: response.data.role
        };
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
      }
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || error.response?.data?.message || 'Invalid email or password' 
      };
    }
  },

  register: async (userData) => {
    try {
      const response = await axiosInstance.post('/auth/register', userData);
      return { success: true, data: response.data };
    } catch (error) {
      console.error("DEBUG: AuthService registration error:", error);
      if (error.response) {
        console.error("DEBUG: Backend response data:", error.response.data);
      }
      return { 
        success: false, 
        error: error.response?.data?.error || error.response?.data?.message || 'Registration failed' 
      };
    }
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem(STORAGE_KEYS.USER);
    if (!userStr) return null;
    
    try {
      const user = JSON.parse(userStr);
      if (!user || !user.email) {
        console.warn("STALE USER DATA: Missing email. Clearing storage.");
        localStorage.removeItem(STORAGE_KEYS.USER);
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        return null;
      }
      return user;
    } catch (e) {
      localStorage.removeItem(STORAGE_KEYS.USER);
      return null;
    }
  },

  isAuthenticated: () => {
    return !!localStorage.getItem(STORAGE_KEYS.TOKEN);
  }
};

export default authService;