import React from 'react';
import { format } from 'date-fns';
import { FileText, Download } from 'lucide-react';

const MessageBubble = ({ message, isMe }) => {
  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} w-full animate-in fade-in slide-in-from-bottom-2 duration-300`}>
      <div className={`
        max-w-[70%] flex flex-col
        ${isMe ? 'items-end' : 'items-start'}
      `}>
        <div className={`
          px-5 py-3 rounded-2xl text-sm font-medium shadow-sm overflow-hidden
          ${isMe 
            ? 'bg-indigo-600 text-white rounded-tr-none' 
            : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'}
        `}>
          {message.type === 'IMAGE' && message.attachmentUrl && (
            <div className="mb-2 -mx-2 -mt-1">
              <img 
                src={message.attachmentUrl} 
                alt="Attachment" 
                className="max-w-full rounded-lg hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
                onClick={() => window.open(message.attachmentUrl, '_blank')}
              />
            </div>
          )}

          {message.type === 'VIDEO' && message.attachmentUrl && (
            <div className="mb-2 -mx-2 -mt-1">
              <video 
                src={message.attachmentUrl} 
                controls 
                className="max-w-full rounded-lg shadow-sm"
              />
            </div>
          )}

          {message.type === 'FILE' && message.attachmentUrl && (
            <a 
              href={message.attachmentUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`flex items-center gap-3 p-3 rounded-xl mb-1 border transition-all ${
                isMe 
                  ? 'bg-white/10 border-white/20 hover:bg-white/20' 
                  : 'bg-slate-50 border-slate-100 hover:bg-slate-100'
              }`}
            >
              <div className={`p-2 rounded-lg ${isMe ? 'bg-white/20' : 'bg-white shadow-sm'}`}>
                <FileText size={20} className={isMe ? 'text-white' : 'text-indigo-600'} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold truncate">Attachment</p>
                <p className={`text-[10px] ${isMe ? 'opacity-70' : 'text-slate-400'}`}>Click to download</p>
              </div>
              <Download size={16} className="opacity-50" />
            </a>
          )}

          {message.content && (
            <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
          )}
        </div>
        <div className="flex items-center gap-2 mt-1 px-1">
          {!isMe && <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{message.senderName || 'Anonymous'}</span>}
          <span className="text-[10px] text-slate-400 font-medium">
            {message.timestamp ? format(new Date(message.timestamp), 'h:mm a') : ''}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
