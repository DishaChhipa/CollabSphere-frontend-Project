import { useFiles as useFilesFromStore } from '../store/FileContext';

export const useFile = () => {
  const context = useFilesFromStore();
  if (!context) {
    throw new Error('useFile must be used within a FileProvider');
  }
  return context;
};
