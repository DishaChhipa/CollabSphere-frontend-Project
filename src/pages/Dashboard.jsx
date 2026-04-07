import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useTeams } from '../store/TeamContext';
import TeamCard from '../components/Team/TeamCard';
import CreateTeamModal from '../components/Team/CreateTeamModal';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import { Plus, Users, LayoutGrid, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, isAuthLoading } = useAuth();
  const { teams, fetchTeams, createTeam, selectTeam, loading: teamsLoading } = useTeams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleChat = (team) => {
    selectTeam(team);
    navigate(`/chat/${team.id}`);
  };

  const handleFiles = (team) => {
    selectTeam(team);
    navigate(`/files/${team.id}`);
  };

  React.useEffect(() => {
    if (user?.email) {
      console.log("DASHBOARD FETCH: Loading teams for", user.email);
      fetchTeams();
    }
    
    // Cleanup to prevent stale data visibility
    return () => {
      // Clear team list on unmount if needed
    };
  }, [fetchTeams, user?.email]);


  if (isAuthLoading || (teamsLoading && teams.length === 0)) return <Loader fullPage />;
  if (!user) return null; // Let PrivateRoute handle redirections

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">
            Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}, {user?.name?.split(' ')[0] || 'User'}!
          </h1>
          <p className="text-slate-500 font-medium text-lg">You have <span className="text-indigo-600 font-bold">{teams.length} active teams</span> to collaborate with today.</p>
        </div>
        <div className="flex gap-3">
            <Button variant="secondary" onClick={() => navigate('/about')} className="bg-white border-slate-200">
                How it works
            </Button>
            <Button onClick={() => setIsModalOpen(true)} icon={Plus} className="shadow-indigo-200 shadow-xl">
                Create Team
            </Button>
        </div>
      </div>

      {/* Grid Layout for Hub feel */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Teams List */}
        <div className="lg:col-span-3 space-y-8">
            <div className="bg-white/40 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/40 shadow-xl shadow-slate-200/50">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                        <Users className="text-indigo-600" size={28} />
                        Your Collaboration Hub
                    </h2>
                    <div className="flex gap-2">
                        <button className="p-2 bg-slate-100 text-slate-400 rounded-lg hover:bg-indigo-600 hover:text-white transition-all">
                            <LayoutGrid size={18} />
                        </button>
                    </div>
                </div>
                
                {teams.length === 0 ? (
                    <div className="py-20 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-300 mb-6 rotate-3">
                            <Users size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Start your first team</h3>
                        <p className="text-slate-500 max-w-sm mb-8">Bring your people together for seamless real-time collaboration.</p>
                        <Button onClick={() => setIsModalOpen(true)} icon={Plus}>Get Started</Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {teams.map((team) => (
                            <TeamCard key={team.id} team={team} onChat={handleChat} onFiles={handleFiles} variant="glass" />
                        ))}
                    </div>
                )}
            </div>
        </div>

        {/* Right Sidebar: Activity & Stats */}
        <div className="lg:col-span-1 space-y-8">
             <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-200 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-md">
                    <Zap size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Premium Member</h3>
                <p className="text-indigo-100 text-xs mb-6 opacity-80 leading-relaxed">You have full access to all collaboration tools and unlimited storage.</p>
                <button className="w-full py-3 bg-white text-indigo-600 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all">
                    View Benefits
                </button>
             </div>

             <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-lg shadow-slate-200/50">
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 px-2">Recent activity</h3>
                <div className="space-y-6">
                    {[
                        { label: 'Chat in General', time: '2m ago', color: 'bg-indigo-500' },
                        { label: 'Uploaded Plan.pdf', time: '1h ago', color: 'bg-purple-500' },
                        { label: 'New team created', time: '3h ago', color: 'bg-emerald-500' },
                    ].map((act, i) => (
                        <div key={i} className="flex gap-4 group cursor-pointer hover:translate-x-1 transition-transform">
                            <div className={`mt-1 h-3 w-3 rounded-full flex-shrink-0 ${act.color} ring-4 ring-slate-50`}></div>
                            <div className="min-w-0">
                                <p className="text-sm font-bold text-slate-800 truncate group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{act.label}</p>
                                <p className="text-[10px] text-slate-400 font-medium italic">{act.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
             </div>
        </div>
      </div>

      <CreateTeamModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onCreate={createTeam} 
      />
    </div>
  );
};

export default Dashboard;
