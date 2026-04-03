import React, { useRef, useEffect, useState } from 'react';
import MessageBubble from './MessageBubble';
import { Send, MessageSquare, Plus, Loader2 } from 'lucide-react';
import Button from '../common/Button';
import fileService from '../../services/fileService';

const ChatBox = ({ messages, onSendMessage, loading, teamId }) => {
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const [content, setContent] = useState('');
  const [uploading, setUploading] = useState(false);

  const scrollToBottom = (behavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  // Initial scroll (instant)
  useEffect(() => {
    scrollToBottom('auto');
  }, [loading]);

  // Subsequent scrolls (smooth)
  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom('smooth');
    }
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSendMessage(content);
    setContent('');
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const result = await fileService.uploadFile(file, teamId);
    
    if (result.success) {
      const fileData = result.data;
      // Construct the full URL
      const fileUrl = `http://localhost:3030/uploads/${fileData.s3Key || fileData.fileName}`;
      
      // Determine type
      let type = 'FILE';
      if (file.type.startsWith('image/')) type = 'IMAGE';
      else if (file.type.startsWith('video/')) type = 'VIDEO';
      else if (file.type.startsWith('audio/')) type = 'AUDIO';

      onSendMessage('', fileUrl, type);
    } else {
      alert(result.error || 'Failed to upload file');
    }
    
    setUploading(false);
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden font-inter">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/30">
        {messages.length === 0 && !loading && (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-4 animate-in fade-in duration-700">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center shadow-inner">
              <MessageSquare size={40} className="text-slate-300" />
            </div>
            <div className="text-center">
              <p className="font-bold text-slate-600">No messages yet</p>
              <p className="text-sm">Start the conversation with your team!</p>
            </div>
          </div>
        )}
        
        {messages.map((msg, index) => (
          <MessageBubble 
            key={msg.id || index} 
            message={msg} 
            isMe={msg.senderEmail === JSON.parse(localStorage.getItem('user'))?.email} 
          />
        ))}
        
        {/* Scroll Anchor */}
        <div ref={messagesEndRef} className="h-1" />
      </div>

      {/* Input Area */}
      <form 
        onSubmit={handleSubmit}
        className="p-4 bg-white border-t border-slate-100 flex items-center gap-2"
      >
        <input 
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx,.zip"
        />
        
        <button
          type="button"
          onClick={handleFileClick}
          disabled={uploading}
          className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all disabled:opacity-50"
          title="Upload file"
        >
          {uploading ? <Loader2 size={24} className="animate-spin" /> : <Plus size={24} />}
        </button>

        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type your message here..."
          disabled={uploading}
          className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-6 py-3.5 outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm font-medium"
        />
        <Button 
          type="submit" 
          disabled={(!content.trim() && !uploading) || uploading} 
          className="px-4 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-100"
        >
          <Send size={20} />
        </Button>
      </form>
    </div>
  );
};

export default ChatBox;
