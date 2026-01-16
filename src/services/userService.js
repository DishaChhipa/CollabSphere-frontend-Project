import { axiosInstance } from './authService';

const userService = {
    getCurrentUser: async () => {
        try {
            const response = await axiosInstance.get('/users/me');
            return response.data;
        } catch (error) {
            console.error("Error fetching current user", error);
            throw error;
        }
    },

    updateUser: async (userData) => {
        try {
            const response = await axiosInstance.put('/users/me', userData);
            return response.data;
        } catch (error) {
            console.error("Error updating user", error);
            throw error;
        }
    },

    searchUsers: async (query) => {
        try {
            const response = await axiosInstance.get(`/users/search?query=${query}`);
            return response.data;
        } catch (error) {
            console.error("Error searching users", error);
            throw error;
        }
    }
};

export default userService;
