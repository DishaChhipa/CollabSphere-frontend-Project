import { useAuth as useAuthFromStore } from '../store/AuthContext';

export const useAuth = () => {
  const context = useAuthFromStore();
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
