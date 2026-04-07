import axiosInstance from '../api/axios';

const messageService = {
  getMessagesForTeam: async (teamId, page = 0, size = 50) => {
    try {
      const response = await axiosInstance.get(`/chat/teams/${teamId}/messages?page=${page}&size=${size}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to fetch messages' };
    }
  },

  sendMessage: async (messageData) => {
    try {
      const response = await axiosInstance.post('/chat/messages', messageData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to send message' };
    }
  },

  getPrivateMessages: async (otherUserId, page = 0, size = 50) => {
    try {
      // Channel name convention: private_minId_maxId
      const response = await axiosInstance.get(`/chat/private/${otherUserId}/messages?page=${page}&size=${size}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to fetch private messages' };
    }
  },

  deleteMessage: async (messageId) => {
    try {
      await axiosInstance.delete(`/chat/messages/${messageId}`);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to delete message' };
    }
  }
};

export default messageService;
