import React, { createContext, useState, useContext, useEffect, useCallback, useMemo, useRef } from 'react';
import messageService from '../services/messageService';
import socketService from '../socket/socket';
import { useAuth } from './AuthContext';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const currentSubscription = useRef(null);

  const loadMessages = useCallback(async (teamId) => {
    if (!teamId) return;
    setLoading(true);
    const result = await messageService.getMessagesForTeam(teamId);
    if (result.success) {
      // Set initial data from REST API
      setMessages(result.data.content || []);
    }
    setLoading(false);
  }, []);

  const handleNewMessage = useCallback((message) => {
    if (!message) return;
    
    setMessages((prev) => {
      // Prevent duplicates if by any chance the same message is received twice
      const exists = prev.some(m => m.id === message.id);
      if (exists) return prev;
      console.log("Incoming message received and added to state:", message);
      return [...prev, message];
    });
  }, []);

  const subscribeToTeam = useCallback((teamId) => {
    if (!teamId) return;

    // 1. Cleanup previous subscription if any
    if (currentSubscription.current) {
        socketService.unsubscribe(currentSubscription.current);
    }

    // 2. Define target destination
    const destination = `/topic/team/${teamId}`;
    console.log("Subscribing to team:", teamId);
    currentSubscription.current = destination;

    // 3. Subscribe via updated socketService
    socketService.subscribe(destination, handleNewMessage);
  }, [handleNewMessage]);

  const unsubscribeFromTeam = useCallback((teamId) => {
     if (currentSubscription.current) {
        socketService.unsubscribe(currentSubscription.current);
        currentSubscription.current = null;
     }
  }, []);

  const sendMessage = useCallback((teamId, content, attachmentUrl = null, type = 'TEXT') => {
    if (!teamId || (!content?.trim() && !attachmentUrl)) return;

    if (!socketService.isConnected()) {
      console.log('STOMP Connected: false. Cannot send message.');
      return;
    }

    const messageData = {
      teamId: String(teamId),
      content: content?.trim(),
      attachmentUrl: attachmentUrl,
      senderEmail: user?.email,
      timestamp: new Date().toISOString(),
      type: type
    };
    
    console.log("Sending payload to /app/chat/" + teamId + ":", messageData);
    
    // Send via WebSocket ONLY (body is stringified in socketService)
    socketService.send(`/app/chat/${teamId}`, messageData);
  }, [user]);

  const chatValue = useMemo(() => ({
    messages, 
    loading, 
    loadMessages, 
    sendMessage, 
    subscribeToTeam, 
    unsubscribeFromTeam 
  }), [messages, loading, loadMessages, sendMessage, subscribeToTeam, unsubscribeFromTeam]);

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
