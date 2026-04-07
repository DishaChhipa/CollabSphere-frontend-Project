import React, { createContext, useState, useContext, useEffect, useCallback, useMemo, useRef } from 'react';
import messageService from '../services/messageService';
import socketService from '../socket/socket';
import { useAuth } from './AuthContext';

// Request notification permission on mount
if (typeof window !== 'undefined' && 'Notification' in window) {
  if (Notification.permission === 'default') {
    Notification.requestPermission();
  }
}

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [teamMessages, setTeamMessages] = useState([]);
  const [privateMessages, setPrivateMessages] = useState({}); // { receiverId: [messages] }
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const currentTeamSub = useRef(null);
  const privateSub = useRef(null);

  const loadMessages = useCallback(async (teamId) => {
    if (!teamId) return;
    setLoading(true);
    const result = await messageService.getMessagesForTeam(teamId);
    if (result.success) {
      setTeamMessages(result.data.content || []);
    }
    setLoading(false);
  }, []);

  const loadPrivateMessages = useCallback(async (otherUserId) => {
    if (!otherUserId) return;
    setLoading(true);
    // Assuming messageService.getPrivateMessages exists or will be added
    const result = await messageService.getPrivateMessages(otherUserId);
    if (result.success) {
      setPrivateMessages(prev => ({
        ...prev,
        [otherUserId]: result.data.content || []
      }));
    }
    setLoading(false);
  }, []);

  const showBrowserNotification = useCallback((title, body) => {
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body });
    }
  }, []);

  const handleTeamMessage = useCallback((message) => {
    if (!message) return;
    console.log("Team message received:", message);
    
    setTeamMessages((prev) => {
      const exists = prev.some(m => m.id === message.id);
      if (exists) return prev;
      
      // Notify if it's not from me
      if (message.senderEmail !== user?.email) {
          showBrowserNotification("New Message", `${message.senderName || 'Anonymous'}: ${message.content || 'Sent a file'}`);
      }
      
      return [...prev, message];
    });
  }, [user?.email, showBrowserNotification]);

  const handlePrivateMessage = useCallback((message) => {
    if (!message) return;
    console.log("Private message received:", message);
    
    const otherId = message.senderId === user?.id ? message.receiverId : message.senderId;
    if (!otherId) return;

    setPrivateMessages((prev) => {
      const chat = prev[otherId] || [];
      const exists = chat.some(m => m.id === message.id);
      if (exists) return prev;
      
      // Notify if it's not from me
      if (message.senderEmail !== user?.email) {
          showBrowserNotification("New Private Message", `${message.senderName || 'Anonymous'}: ${message.content || 'Sent a file'}`);
      }

      return {
        ...prev,
        [otherId]: [...chat, message]
      };
    });
  }, [user?.id, user?.email, showBrowserNotification]);

  const subscribeToTeam = useCallback((teamId) => {
    if (!teamId) return;
    if (currentTeamSub.current) {
        socketService.unsubscribe(currentTeamSub.current);
    }
    const destination = `/topic/team/${teamId}`;
    currentTeamSub.current = destination;
    socketService.subscribe(destination, handleTeamMessage);
  }, [handleTeamMessage]);

  const subscribeToPrivate = useCallback(() => {
    if (!user?.email || privateSub.current) return;
    privateSub.current = 'receivePrivateMessage'; // Logic flag
    socketService.on('receivePrivateMessage', handlePrivateMessage);
  }, [user?.email, handlePrivateMessage]);

  const unsubscribeFromTeam = useCallback(() => {
     if (currentTeamSub.current) {
        socketService.unsubscribe(currentTeamSub.current);
        currentTeamSub.current = null;
     }
  }, []);

  const sendMessage = useCallback((teamId, content, attachmentUrl = null, type = 'TEXT') => {
    if (!teamId || (!content?.trim() && !attachmentUrl)) return;
    if (!socketService.isConnected()) return;

    const messageData = {
      teamId: String(teamId),
      content: content?.trim(),
      attachmentUrl: attachmentUrl,
      senderId: user?.id,
      senderEmail: user?.email,
      senderName: user?.name,
      type: type
    };
    console.log("Sending message:", messageData);
    socketService.emit('sendMessage', messageData);
  }, [user]);

  const sendPrivateMessage = useCallback((receiverId, content, attachmentUrl = null, type = 'TEXT', receiverEmail = null) => {
    if (!receiverId || (!content?.trim() && !attachmentUrl)) return;
    if (!socketService.isConnected()) return;

    const messageData = {
      receiverId: receiverId,
      receiverEmail: receiverEmail,
      content: content?.trim(),
      attachmentUrl: attachmentUrl,
      senderId: user?.id,
      senderEmail: user?.email,
      senderName: user?.name,
      type: type
    };
    console.log("Sending private message:", messageData);
    socketService.emit('privateMessage', messageData);
  }, [user]);

  useEffect(() => {
    if (user?.email) {
      subscribeToPrivate();
    }
    return () => {
      if (privateSub.current) {
        socketService.unsubscribe(privateSub.current);
        privateSub.current = null;
      }
    };
  }, [user?.email, subscribeToPrivate]);

  const chatValue = useMemo(() => ({
    teamMessages,
    privateMessages,
    loading,
    loadMessages,
    loadPrivateMessages,
    sendMessage,
    sendPrivateMessage,
    subscribeToTeam,
    unsubscribeFromTeam
  }), [teamMessages, privateMessages, loading, loadMessages, loadPrivateMessages, sendMessage, sendPrivateMessage, subscribeToTeam, unsubscribeFromTeam]);

  return (
    <ChatContext.Provider value={chatValue}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
};
