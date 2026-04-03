import React, { createContext, useState, useContext, useEffect, useCallback, useMemo } from 'react';
import teamService from '../services/teamService';

const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);
  const [activeTeam, setActiveTeam] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [membersLoading, setMembersLoading] = useState(false);

  const fetchTeams = React.useCallback(async () => {
    setLoading(true);
    const result = await teamService.listMyTeams();
    if (result.success) {
      setTeams(result.data);
    }
    setLoading(false);
  }, []);

  const createTeam = useCallback(async (name, description) => {
    const result = await teamService.createTeam(name, description);
    if (result.success) {
      await fetchTeams();
    }
    return result;
  }, [fetchTeams]);

  const fetchMembers = useCallback(async (teamId) => {
    if (!teamId) return;
    setMembersLoading(true);
    const result = await teamService.getTeamMembers(teamId);
    if (result.success) {
      setMembers(result.data);
    }
    setMembersLoading(false);
  }, []);

  const selectTeam = useCallback((team) => {
    setActiveTeam(team);
    if (team) {
       fetchMembers(team.id);
    } else {
       setMembers([]);
    }
  }, [fetchMembers]);

  const addMember = useCallback(async (teamId, email) => {
    const result = await teamService.addMember(teamId, email);
    if (result.success) {
      await fetchTeams();
    }
    return result;
  }, [fetchTeams]);


  const teamValue = useMemo(() => ({
    teams,
    activeTeam,
    members,
    loading,
    membersLoading,
    fetchTeams,
    fetchMembers,
    createTeam,
    selectTeam,
    addMember
  }), [teams, activeTeam, members, loading, membersLoading, fetchTeams, fetchMembers, createTeam, selectTeam, addMember]);

  return (
    <TeamContext.Provider value={teamValue}>
      {children}
    </TeamContext.Provider>
  );
};

export const useTeams = () => useContext(TeamContext);
