import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useChat } from '../hooks/useChat';
import { useTeams } from '../store/TeamContext';
import { useAuth } from '../hooks/useAuth';
import ChatBox from '../components/Chat/ChatBox';
import Loader from '../components/common/Loader';
import { Users, Info, Hash, Settings, ChevronDown } from 'lucide-react';

const ChatPage = () => {
  const { teamId } = useParams();
  const { messages, loading: chatLoading, loadMessages, sendMessage, subscribeToTeam, unsubscribeFromTeam } = useChat();
  const { teams, selectTeam, activeTeam, members, membersLoading, loading: teamsLoading, addMember } = useTeams();
  const { user } = useAuth();
  const [pageLoading, setPageLoading] = useState(true);
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [isMembersOpen, setIsMembersOpen] = useState(false);
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [addLoading, setAddLoading] = useState(false);

  const loadedTeamId = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const setupChat = async () => {
      // Don't do anything if teams are still loading or if this team is already loaded
      if (teamsLoading || (teamId === loadedTeamId.current && activeTeam?.id.toString() === teamId)) return;

      if (teamId && teams.length > 0) {
        setPageLoading(true);
        const team = teams.find(t => t.id.toString() === teamId);
        if (team) {
          try {
            selectTeam(team);
            await loadMessages(teamId);
            subscribeToTeam(teamId);
            loadedTeamId.current = teamId;
          } catch (error) {
            console.error("Failed to load chat:", error);
          } finally {
            setPageLoading(false);
          }
        } else {
          setPageLoading(false);
        }
      } else if (!teamsLoading && teams.length === 0) {
        setPageLoading(false);
      }
    };

    setupChat();

    return () => {
      // Logic for cleanup if needed
    };
  }, [teamId, teamsLoading, loadMessages, subscribeToTeam, selectTeam]);

  // Handle unmount specifically for socket unsubscribe
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMembersOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      if (teamId) unsubscribeFromTeam(teamId);
      loadedTeamId.current = null;
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [teamId, unsubscribeFromTeam]);

  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!newMemberEmail.trim()) return;
    
    setAddLoading(true);
    const result = await addMember(teamId, newMemberEmail);
    if (result.success) {
      setNewMemberEmail('');
      setIsAddingMember(false);
      alert('Member added successfully!');
    } else {
      alert(result.error || 'Failed to add member');
    }
    setAddLoading(false);
  };


  if (teamsLoading || pageLoading || (chatLoading && messages.length === 0)) {
    return <Loader fullPage />;
  }

  // If we reach here but still don't have an activeTeam, 
  // it might be an invalid teamId or still synchronizing
  if (!activeTeam) {
    return (
      <div className="h-full flex items-center justify-center text-slate-500">
        Team not found or access denied.
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col gap-6 animate-in fade-in duration-500">
      {/* Header Info */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-100">
            {activeTeam?.name?.[0].toUpperCase() || '#'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">{activeTeam?.name}</h2>
              <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded uppercase">General</span>
            </div>
            <div className="relative" ref={dropdownRef}>
                <button 
                    onClick={() => setIsMembersOpen(!isMembersOpen)}
                    className="text-[11px] text-slate-500 font-medium flex items-center gap-2 mt-1 hover:text-indigo-600 transition-colors py-0.5 px-1 rounded-md hover:bg-slate-50"
                >
                    <span className="flex items-center gap-1"><Users size={12} /> {activeTeam?.memberCount || 0} Members</span>
                    <ChevronDown size={10} className={`transition-transform duration-200 ${isMembersOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Members Dropdown */}
                {isMembersOpen && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                        <div className="px-3 py-2 mb-2 border-b border-slate-50">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <Users size={12} /> Team Members
                            </span>
                        </div>
                        <div className="max-h-[300px] overflow-y-auto space-y-1">
                            {membersLoading ? (
                                <div className="p-4 space-y-3">
                                    <div className="h-4 bg-slate-50 rounded animate-pulse w-3/4"></div>
                                    <div className="h-4 bg-slate-50 rounded animate-pulse w-1/2"></div>
                                </div>
                            ) : members.length === 0 ? (
                                <p className="px-3 py-4 text-xs text-slate-400 italic text-center">No members found</p>
                            ) : (
                                members.map((member) => (
                                    <div 
                                        key={member.id} 
                                        className="group flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-indigo-50/50 transition-all cursor-default"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600 border border-indigo-200">
                                            {member.name[0].toUpperCase()}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-bold text-slate-700 truncate group-hover:text-indigo-600 transition-colors">
                                                {member.name}
                                                {member.email === user?.email && <span className="ml-1.5 text-[9px] font-black text-indigo-500 uppercase tracking-tight">(You)</span>}
                                            </p>
                                            <p className="text-[10px] text-slate-400 truncate">{member.email}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isAddingMember ? (
            <form onSubmit={handleAddMember} className="flex items-center gap-2 animate-in slide-in-from-right-4 duration-300">
              <input
                type="email"
                placeholder="User email"
                className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none w-48"
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e.target.value)}
                autoFocus
                disabled={addLoading}
              />
              <button 
                type="submit" 
                className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                disabled={addLoading}
              >
                {addLoading ? 'Adding...' : 'Add'}
              </button>
              <button 
                type="button" 
                onClick={() => setIsAddingMember(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
                disabled={addLoading}
              >
                <Hash size={16} className="rotate-45" />
              </button>
            </form>
          ) : (
            <button 
              onClick={() => setIsAddingMember(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200 hover:border-indigo-200 rounded-xl text-xs font-bold transition-all"
            >
              <Users size={14} /> Add Member
            </button>
          )}
          <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition-all"><Info size={20} /></button>
          <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition-all"><Settings size={20} /></button>
        </div>

      </div>

      {/* Chat Area */}
      <div className="flex-1 min-h-0">
        <ChatBox 
          messages={messages} 
          onSendMessage={(content, attachmentUrl, type) => sendMessage(teamId, content, attachmentUrl, type)} 
          loading={chatLoading}
          teamId={teamId}
        />
      </div>
    </div>
  );
};

export default ChatPage;
