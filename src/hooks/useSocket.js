import { useEffect } from 'react';
import socketService from '../socket/socket';
import { useAuth } from './useAuth';

export const useSocket = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      socketService.connect();
    } else {
      socketService.disconnect();
    }

    return () => {
      socketService.disconnect();
    };
  }, [user]);

  return socketService;
};
