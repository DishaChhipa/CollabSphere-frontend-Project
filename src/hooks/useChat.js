import { useChat as useChatFromStore } from '../store/ChatContext';

export const useChat = () => {
  const context = useChatFromStore();
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
