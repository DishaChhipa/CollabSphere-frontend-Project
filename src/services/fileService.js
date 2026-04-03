import axiosInstance from '../api/axios';

const fileService = {
  /**
   * Upload a file to the backend
   * @param {File} file - The file to upload
   * @param {number|string} teamId - Optional team ID to associate the file with
   * @returns {Promise<{success: boolean, data?: any, error?: string}>}
   */
  uploadFile: async (file, teamId) => {
    const formData = new FormData();
    formData.append('file', file);
    if (teamId) {
      formData.append('teamId', teamId);
    }

    try {
      const response = await axiosInstance.post('/files', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return { success: true, data: response.data };
    } catch (error) {
      console.error('File upload error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to upload file',
      };
    }
  },

  /**
   * Get a presigned download URL for a file
   * @param {number|string} fileId - The file ID
   * @returns {Promise<{success: boolean, url?: string, error?: string}>}
   */
  getDownloadUrl: async (fileId) => {
    try {
      const response = await axiosInstance.get(`/files/${fileId}/download`);
      return { success: true, url: response.data.url };
    } catch (error) {
      console.error('Failed to get download URL:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to get download URL',
      };
    }
  },

  /**
   * Delete a file
   * @param {number|string} fileId - The file ID
   * @returns {Promise<{success: boolean, error?: string}>}
   */
  deleteFile: async (fileId) => {
    try {
      await axiosInstance.delete(`/files/${fileId}`);
      return { success: true };
    } catch (error) {
      console.error('Failed to delete file:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to delete file',
      };
    }
  }
};

export default fileService;
