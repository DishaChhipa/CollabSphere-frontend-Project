import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import TeamList from '../components/Team/TeamList';
import ChatWindow from '../components/Chat/ChatWindow';

const Dashboard = () => {
    const [selectedTeam, setSelectedTeam] = useState(null);

    return (
        <div className="h-screen flex flex-col bg-gray-50">
            <Navbar />
            <div className="flex-1 flex overflow-hidden p-4 gap-4 max-w-7xl mx-auto w-full">
                {/* Left Sidebar - Team List */}
                <div className="w-1/3 max-w-sm">
                    <TeamList onSelectTeam={setSelectedTeam} />
                </div>

                {/* Right Area - Chat Window */}
                <div className="flex-1">
                    <ChatWindow team={selectedTeam} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
