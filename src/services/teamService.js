import axiosInstance from '../api/axios';

const teamService = {
  createTeam: async (name, description) => {
    try {
      const response = await axiosInstance.post('/teams', { name, description });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to create team' };
    }
  },

  getTeam: async (id) => {
    try {
      const response = await axiosInstance.get(`/teams/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to fetch team' };
    }
  },

  listMyTeams: async () => {
    try {
      const response = await axiosInstance.get('/teams');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to list teams' };
    }
  },

  addMember: async (teamId, email) => {
    try {
      const response = await axiosInstance.post(`/teams/${teamId}/members?email=${email}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to add member' };
    }
  },

  removeMember: async (teamId, email) => {
    try {
      const response = await axiosInstance.delete(`/teams/${teamId}/members?email=${email}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to remove member' };
    }
  },

  deleteTeam: async (id) => {
    try {
      await axiosInstance.delete(`/teams/${id}`);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to delete team' };
    }
  },

  getTeamMembers: async (teamId) => {
    try {
      const response = await axiosInstance.get(`/teams/${teamId}/members`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to fetch team members' };
    }
  }
};

export default teamService;
