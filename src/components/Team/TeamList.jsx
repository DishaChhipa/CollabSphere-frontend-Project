import React, { useEffect, useState } from 'react';
import teamService from '../../services/teamService';

const TeamList = ({ onSelectTeam }) => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const data = await teamService.getAllTeams();
                setTeams(data);
            } catch (err) {
                setError("Failed to load teams");
            } finally {
                setLoading(false);
            }
        };

        fetchTeams();
    }, []);

    if (loading) return <div className="p-4 text-center text-gray-500">Loading teams...</div>;
    if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

    return (
        <div className="bg-white rounded-xl shadow-md p-4 h-full flex flex-col">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Your Teams</h3>
            <div className="flex-1 overflow-y-auto space-y-2">
                {teams.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No teams yet</p>
                ) : (
                    teams.map((team) => (
                        <div
                            key={team.id}
                            onClick={() => onSelectTeam(team)}
                            className="p-3 rounded-lg hover:bg-indigo-50 cursor-pointer transition border border-gray-100 flex items-center justify-between"
                        >
                            <div>
                                <h4 className="font-semibold text-gray-800">{team.name}</h4>
                                <p className="text-xs text-gray-500">{team.description}</p>
                            </div>
                            <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                                {team.members?.length || 0} members
                            </span>
                        </div>
                    ))
                )}
            </div>
            <button className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                + Create New Team
            </button>
        </div>
    );
};

export default TeamList;
