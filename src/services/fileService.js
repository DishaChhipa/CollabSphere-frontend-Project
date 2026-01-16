import { axiosInstance } from './authService';

const fileService = {
    uploadFile: async (file, teamId) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('teamId', teamId);

        try {
            const response = await axiosInstance.post('/files/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error uploading file", error);
            throw error;
        }
    },

    getFiles: async (teamId) => {
        try {
            const response = await axiosInstance.get(`/files/team/${teamId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching files", error);
            throw error;
        }
    },

    downloadFile: async (fileId) => {
        try {
            const response = await axiosInstance.get(`/files/download/${fileId}`, {
                responseType: 'blob', // Important for file downloads
            });
            return response.data;
        } catch (error) {
            console.error("Error downloading file", error);
            throw error;
        }
    }
};

export default fileService;
