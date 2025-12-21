import axios from 'axios';

// Base API URL - Change this to your Spring Boot backend URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Create axios instance with default config
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// Request interceptor - Add JWT token to all requests
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - Handle 401 errors globally
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token expired or invalid - clear storage and redirect to login
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth Service
const authService = {
    /**
     * Login user with email and password
     * @param {string} email - User email
     * @param {string} password - User password
     * @returns {Promise} Response with token and user data
     */
    login: async (email, password) => {
        try {
            const response = await axiosInstance.post('/auth/login', {
                email,
                password,
            });

            const { token, user } = response.data;

            // Store token and user data in localStorage
            if (token) {
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
            }

            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Login failed. Please try again.',
            };
        }
    },

    /**
     * Register new user
     * @param {object} userData - User registration data
     * @returns {Promise} Response with token and user data
     */
    register: async (userData) => {
        try {
            const response = await axiosInstance.post('/auth/register', userData);

            const { token, user } = response.data;

            // Store token and user data
            if (token) {
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
            }

            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Registration failed. Please try again.',
            };
        }
    },

    /**
     * Logout user - Clear local storage and redirect
     */
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    },

    /**
     * Get current user from localStorage
     * @returns {object|null} User object or null
     */
    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                return JSON.parse(userStr);
            } catch (error) {
                console.error('Error parsing user data:', error);
                return null;
            }
        }
        return null;
    },

    /**
     * Get JWT token from localStorage
     * @returns {string|null} JWT token or null
     */
    getToken: () => {
        return localStorage.getItem('token');
    },

    /**
     * Check if user is authenticated
     * @returns {boolean} True if user has valid token
     */
    isAuthenticated: () => {
        const token = localStorage.getItem('token');
        return !!token;
    },

    /**
     * Validate token with backend
     * @returns {Promise<boolean>} True if token is valid
     */
    validateToken: async () => {
        try {
            const response = await axiosInstance.get('/auth/validate');
            return response.data.valid === true;
        } catch (error) {
            return false;
        }
    },
};

export default authService;
export { axiosInstance };