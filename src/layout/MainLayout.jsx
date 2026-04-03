import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useTeams } from '../store/TeamContext';
import { useSocket } from '../hooks/useSocket';
import { useAuth } from '../hooks/useAuth';
import { Search, Bell } from 'lucide-react';

const MainLayout = () => {
  const { fetchTeams } = useTeams();
  const { user } = useAuth();
  useSocket(); // Trigger socket connection when authenticated

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  return (
    <div className="flex h-screen bg-slate-50 font-inter overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Top Header (MS Teams Command Bar style) */}
        <header className="h-[72px] bg-white border-b border-slate-200 flex items-center justify-between px-8 z-30 shadow-sm">
          <div className="flex-1 max-w-2xl relative">
            <div className="absolute inset-y-0 left-4 flex items-center text-slate-400 pointer-events-none">
              <Search size={18} />
            </div>
            <input 
              type="text" 
              placeholder="Search for messages, teams, or files..." 
              className="w-full h-10 bg-slate-100 border-none rounded-xl pl-12 pr-4 text-sm focus:ring-2 focus:ring-indigo-600/20 transition-all outline-none"
            />
          </div>
          
          <div className="flex items-center gap-4 ml-6">
            <button className="p-2.5 bg-slate-50 text-slate-500 rounded-xl hover:bg-slate-100 hover:text-indigo-600 transition-all relative">
              <Bell size={20} />
              <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></div>
            </button>
            <div className="h-6 w-px bg-slate-200 mx-1"></div>
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900">{user?.name}</p>
                <div className="flex items-center justify-end gap-1.5 leading-none mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Available</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 relative">
          {/* Subtle background gradient for depth */}
          <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-indigo-50/30 to-transparent pointer-events-none -z-10"></div>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
