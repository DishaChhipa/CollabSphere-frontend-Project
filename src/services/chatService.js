import { axiosInstance } from './authService';

const chatService = {
    getMessages: async (teamId) => {
        try {
            const response = await axiosInstance.get(`/chats/team/${teamId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching messages", error);
            throw error;
        }
    },

    sendMessage: async (messageData) => {
        try {
            const response = await axiosInstance.post('/chats', messageData);
            return response.data;
        } catch (error) {
            console.error("Error sending message", error);
            throw error;
        }
    }
};

export default chatService;
