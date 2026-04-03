import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useFile } from '../hooks/useFile';
import { useTeams } from '../store/TeamContext';
import { useAuth } from '../hooks/useAuth';
import FileCard from '../components/file/FileCard';
import Loader from '../components/common/Loader';
import Button from '../components/common/Button';
import { Upload, HardDrive, Files, Search, Filter, Users, ChevronDown } from 'lucide-react';
import fileService from '../services/fileService';

const FilesPage = () => {
  const { teamId } = useParams();
  const { files, loading: filesLoading, fetchTeamFiles, uploadFile, deleteFile } = useFile();
  const { teams, activeTeam, members, membersLoading, selectTeam, loading: teamsLoading } = useTeams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isMembersOpen, setIsMembersOpen] = useState(false);
  const loadedTeamId = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const setupFiles = async () => {
      // Don't do anything if teams are still loading or if this team is already loaded
      if (teamsLoading || (teamId === loadedTeamId.current && activeTeam?.id.toString() === teamId)) return;

      if (teamId && teams.length > 0) {
        setLoading(true);
        setPageLoading(true);
        const team = teams.find(t => t.id.toString() === teamId);
        if (team) {
          try {
            selectTeam(team);
            await fetchTeamFiles(teamId);
            loadedTeamId.current = teamId;
          } catch (error) {
            console.error("Failed to load files:", error);
          } finally {
            setLoading(false);
            setPageLoading(false);
          }
        } else {
          setLoading(false);
          setPageLoading(false);
        }
      } else if (!teamsLoading && teams.length === 0) {
        setLoading(false);
        setPageLoading(false);
      }
    };
    
    setupFiles();

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMembersOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [teamId, teamsLoading, fetchTeamFiles, selectTeam]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const result = await uploadFile(file, teamId);
    if (!result.success) alert(result.error);
    setIsUploading(false);
  };

  const handleDownload = async (file) => {
    const result = await fileService.getDownloadUrl(file.id);
    if (result.success) {
      window.open(result.url, '_blank');
    } else {
      alert(result.error);
    }
  };

  if (loading) return <div className="h-full flex items-center justify-center">Loading files...</div>;

  if (teamsLoading || pageLoading || (filesLoading && files.length === 0)) {
    return <Loader fullPage />;
  }

  // If we reach here but still don't have an activeTeam
  if (!activeTeam) {
    return (
      <div className="h-full flex items-center justify-center text-slate-500">
        Team not found or access denied.
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col gap-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <Files className="text-indigo-600" size={32} />
            Team Files 
            <span className="text-slate-300 font-light mx-2">/</span>
            <span className="text-slate-500">{activeTeam?.name}</span>
          </h1>
          <div className="flex items-center gap-4 mt-1">
            <p className="text-slate-500 font-medium italic text-sm">Manage and access team documents.</p>
            <div className="relative" ref={dropdownRef}>
                <button 
                    onClick={() => setIsMembersOpen(!isMembersOpen)}
                    className="flex items-center gap-2 px-2 py-1 bg-slate-50 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50/50 rounded-lg text-[11px] font-bold transition-all border border-transparent hover:border-indigo-100"
                >
                    <Users size={12} />
                    {activeTeam?.memberCount || 0} Members
                    <ChevronDown size={10} className={`transition-transform ${isMembersOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Members Dropdown */}
                {isMembersOpen && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                        <div className="px-3 py-2 mb-2 border-b border-slate-50">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <Users size={12} /> Team Members
                            </span>
                        </div>
                        <div className="max-h-[250px] overflow-y-auto space-y-1">
                            {membersLoading ? (
                                <div className="p-4 space-y-3">
                                    <div className="h-3 bg-slate-50 rounded animate-pulse w-3/4"></div>
                                    <div className="h-3 bg-slate-50 rounded animate-pulse w-1/2"></div>
                                </div>
                            ) : members.length === 0 ? (
                                <p className="px-3 py-4 text-xs text-slate-400 italic text-center">No members found</p>
                            ) : (
                                members.map((member) => (
                                    <div 
                                        key={member.id} 
                                        className="group flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50 transition-all cursor-default"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-xs font-bold text-indigo-600">
                                            {member.name[0].toUpperCase()}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-bold text-slate-700 truncate group-hover:text-indigo-600 transition-colors">
                                                {member.name}
                                                {member.email === user?.email && <span className="ml-1.5 text-[8px] font-black text-indigo-500 uppercase tracking-tight">(You)</span>}
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
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={handleFileUpload}
            disabled={isUploading}
          />
          <Button 
            onClick={() => document.getElementById('file-upload').click()} 
            icon={Upload}
            loading={isUploading}
          >
            Upload File
          </Button>
        </div>
      </div>

      {/* Filter/Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 py-2">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by file name or type..." 
            className="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm"
          />
        </div>
        <Button variant="secondary" className="w-full sm:w-auto px-4 py-3 rounded-2xl border-slate-200" icon={Filter}>
          Filters
        </Button>
      </div>

      {/* Files Grid */}
      <div className="flex-1 min-h-0">
        {files.length === 0 ? (
          <div className="h-64 bg-white rounded-3xl border border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
              <HardDrive size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No files uploaded yet</h3>
            <p className="text-sm text-slate-500 max-w-xs mt-1">Shared files for {activeTeam?.name} will appear here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {files.map((file) => (
              <FileCard 
                key={file.id} 
                file={file} 
                onDownload={handleDownload} 
                onDelete={(id) => deleteFile(id, teamId)} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilesPage;
