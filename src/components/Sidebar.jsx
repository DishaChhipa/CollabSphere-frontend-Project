import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Files, 
  Settings, 
  LogOut, 
  Info,
  User,
  Plus,
  Users,
  Search,
  Bell
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useTeams } from '../store/TeamContext';
import { ROUTES } from '../utils/constants';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const { teams, activeTeam, selectTeam } = useTeams();
  const navigate = useNavigate();
  const location = useLocation();

  const primaryItems = [
    { icon: LayoutDashboard, label: 'Activity', path: ROUTES.DASHBOARD },
    { icon: MessageSquare, label: 'Chat', path: activeTeam ? ROUTES.CHAT.replace(':teamId', activeTeam.id) : ROUTES.DASHBOARD },
    { icon: Users, label: 'Teams', path: ROUTES.DASHBOARD },
    { icon: Files, label: 'Files', path: activeTeam ? ROUTES.FILES.replace(':teamId', activeTeam.id) : ROUTES.DASHBOARD },
    { icon: Info, label: 'About', path: ROUTES.ABOUT },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex bg-slate-100 border-r border-slate-200 shadow-sm z-40">
      {/* Narrow App Bar (Extreme Left) */}
      <aside className="w-[72px] bg-slate-900 flex flex-col items-center py-4 gap-4 text-slate-400">
        {primaryItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path.split('/:')[0]);
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`
                group relative w-12 h-12 flex items-center justify-center rounded-xl transition-all
                ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'hover:bg-slate-800 hover:text-slate-200'}
              `}
              title={item.label}
            >
              <item.icon size={22} />
              {/* Active Indicator */}
              {isActive && (
                <div className="absolute left-[-16px] w-1 h-6 bg-white rounded-r-full"></div>
              )}
              {/* Tooltip */}
              <span className="absolute left-16 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                {item.label}
              </span>
            </button>
          );
        })}

        <div className="mt-auto flex flex-col items-center gap-4 w-full">
            <button 
                onClick={() => navigate(ROUTES.PROFILE)}
                className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all hover:bg-slate-800 ${location.pathname === ROUTES.PROFILE ? 'bg-slate-800 text-white border border-slate-700' : ''}`}
                title="Profile"
            >
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-xs border border-indigo-500/30">
                    {user?.name?.[0] || 'U'}
                </div>
            </button>
            <button 
                onClick={handleLogout}
                className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition-all"
                title="Logout"
            >
                <LogOut size={22} />
            </button>
        </div>
      </aside>

      {/* Contextual Bar (Middle Left) */}
      <aside className="w-64 bg-white flex flex-col border-r border-slate-200">
        <div className="p-6 h-[72px] flex items-center justify-between border-b border-slate-100">
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            {location.pathname.includes('/chat') ? 'Chat' : 
             location.pathname.includes('/files') ? 'Files' : 
             location.pathname.includes('/dashboard') ? 'Dashboard' : 
             location.pathname.includes('/about') ? 'About' : 'App'}
          </h2>
          <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400">
            <Settings size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-8">
          {/* Teams Context */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Your Teams</span>
              <button className="text-indigo-600 hover:text-indigo-700">
                <Plus size={16} />
              </button>
            </div>
            
            <div className="space-y-1">
              {teams.length === 0 ? (
                <p className="px-2 text-xs text-slate-400 italic">No teams joined</p>
              ) : (
                teams.map((team) => (
                    <button
                        key={team.id}
                        onClick={() => {
                            selectTeam(team);
                            navigate(ROUTES.CHAT.replace(':teamId', team.id));
                        }}
                        className={`
                            w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all text-sm font-medium
                            ${activeTeam?.id === team.id 
                                ? 'bg-indigo-50 text-indigo-700 border border-indigo-100 shadow-sm' 
                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                        `}
                    >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold border ${
                            activeTeam?.id === team.id ? 'bg-white border-indigo-200' : 'bg-slate-100 border-slate-200'
                        }`}>
                            {team.name[0].toUpperCase()}
                        </div>
                        <span className="truncate">{team.name}</span>
                    </button>
                ))
              )}
            </div>
          </div>


          {/* Quick Filters / Recent */}
          <div className="space-y-4">
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Recent activity</span>
             <div className="px-2 space-y-3">
                <div className="flex items-center gap-3 text-xs text-slate-500">
                    <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                    <span>System update v1.2</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                    <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                    <span>New team "Marketing"</span>
                </div>
             </div>
          </div>
        </div>

        {/* User Quick Info */}
        <div className="p-4 bg-slate-50/50 m-4 rounded-2xl border border-slate-100 shadow-inner">
            <div className="flex items-center gap-3 text-xs">
                <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-900 truncate">{user?.name}</p>
                    <p className="text-slate-500 truncate">{user?.email}</p>
                </div>
            </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
