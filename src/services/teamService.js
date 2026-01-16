import { axiosInstance } from './authService';

const teamService = {
    getAllTeams: async () => {
        try {
            const response = await axiosInstance.get('/teams');
            return response.data;
        } catch (error) {
            console.error("Error fetching teams", error);
            throw error;
        }
    },

    createTeam: async (teamData) => {
        try {
            const response = await axiosInstance.post('/teams', teamData);
            return response.data;
        } catch (error) {
            console.error("Error creating team", error);
            throw error;
        }
    },

    getTeamDetails: async (teamId) => {
        try {
            const response = await axiosInstance.get(`/teams/${teamId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching team details", error);
            throw error;
        }
    },

    addMember: async (teamId, userId) => {
        try {
            const response = await axiosInstance.post(`/teams/${teamId}/members`, { userId });
            return response.data;
        } catch (error) {
            console.error("Error adding member", error);
            throw error;
        }
    }
};

export default teamService;
