import axiosInstance from '../api/axios';

const userService = {
  getUserProfile: async () => {
    try {
      const response = await axiosInstance.get('/users/me');
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to fetch profile' 
      };
    }
  },

  updateProfile: async (id, userData) => {
    try {
      const response = await axiosInstance.put(`/users/${id}`, userData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to update profile' 
      };
    }
  },

  updatePassword: async (id, passwords) => {
    // Note: The backend UserController.java:updateUser takes UserRequest
    // We might need a specific endpoint for password update if updateUser doesn't handle it well
    // For now, aligning with UserController.java put mapping
    try {
      const response = await axiosInstance.put(`/users/${id}`, passwords);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to update password' 
      };
    }
  }
};

export default userService;
