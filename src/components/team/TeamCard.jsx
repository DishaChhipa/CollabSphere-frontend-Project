import React from 'react';
import { Users, ChevronRight, Settings, MessageSquare, Folder } from 'lucide-react';
import Button from '../common/Button';

const TeamCard = ({ team, onChat, onFiles, variant = 'default' }) => {
  const isGlass = variant === 'glass';
  
  return (
    <div 
      onClick={() => onChat(team)}
      className={`
        group rounded-[2rem] p-8 transition-all cursor-pointer flex flex-col justify-between h-full
        ${isGlass 
          ? 'bg-white/40 backdrop-blur-md border border-white/60 shadow-lg hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2' 
          : 'bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1'}
      `}
    >
      <div className="flex justify-between items-start mb-6">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl border transition-transform group-hover:scale-110 ${
            isGlass ? 'bg-white border-white shadow-sm text-indigo-600' : 'bg-indigo-50 border-indigo-100 text-indigo-600'
        }`}>
          {team.name[0].toUpperCase()}
        </div>
        <button className="p-2 text-slate-300 hover:text-indigo-600 transition-colors bg-slate-50 rounded-xl group-hover:bg-white group-hover:shadow-sm">
          <Settings size={18} />
        </button>
      </div>

      <div className="space-y-4">
        <div>
            <h4 className="text-xl font-black text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors truncate">{team.name}</h4>
            <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed h-10 font-medium">{team.description || 'Seamless real-time collaboration space.'}</p>
        </div>
        
        <div className="flex items-center gap-3 pt-6 border-t border-slate-100/50">
          <button 
            onClick={(e) => { e.stopPropagation(); onChat(team); }}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-indigo-50 text-indigo-600 rounded-xl font-bold text-xs hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
          >
            <MessageSquare size={14} />
            Chat
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onFiles(team); }}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-slate-50 text-slate-600 rounded-xl font-bold text-xs hover:bg-slate-900 hover:text-white transition-all shadow-sm"
          >
            <Folder size={14} />
            Files
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
