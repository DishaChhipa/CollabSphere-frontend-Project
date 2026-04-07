import axiosInstance from '../api/axios';

const teamService = {
  createTeam: async (name, description) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("CREATE TEAM: No token found in localStorage");
      }

      const payload = { 
        name: name?.trim(), 
        description: description?.trim() || "" 
      };

      console.log("CREATE TEAM: Sending payload:", payload);

      const response = await axiosInstance.post('/teams', payload);
      console.log("CREATE TEAM: Success response:", response.data);

      return { success: true, data: response.data };
    } catch (error) {
      console.error("CREATE TEAM: Full error response:", error.response || error);
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
