import React from 'react';
import { FileText, Download, Trash2, Calendar, HardDrive } from 'lucide-react';
import { format } from 'date-fns';

const FileCard = ({ file, onDownload, onDelete }) => {
  const getFileIcon = (type) => {
    return <FileText className="text-indigo-500" size={24} />;
  };

  const formatSize = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="group bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center border border-indigo-100 group-hover:scale-110 transition-transform">
          {getFileIcon(file.fileType)}
        </div>
        <div className="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onDownload(file)}
            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
            title="Download"
          >
            <Download size={18} />
          </button>
          <button 
            onClick={() => onDelete(file.id)}
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold text-slate-900 truncate mb-1" title={file.fileName}>{file.fileName}</h4>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <div className="flex items-center gap-1.5 text-slate-400">
            <HardDrive size={12} />
            <span className="text-[10px] font-bold uppercase tracking-wider">{formatSize(file.fileSize)}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <Calendar size={12} />
            <span className="text-[10px] font-bold uppercase tracking-wider">
              {file.uploadTime ? format(new Date(file.uploadTime), 'MMM d, yyyy') : 'Recently'}
            </span>
          </div>
        </div>
      </div>
      
      <div className="pt-3 border-t border-slate-50">
        <button 
          onClick={() => onDownload(file)}
          className="w-full py-2.5 rounded-xl bg-slate-50 text-indigo-600 text-xs font-bold hover:bg-indigo-600 hover:text-white transition-all transform active:scale-95"
        >
          Download File
        </button>
      </div>
    </div>
  );
};

export default FileCard;
