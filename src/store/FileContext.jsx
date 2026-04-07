import React, { createContext, useState, useContext, useCallback, useMemo } from 'react';
import fileService from '../services/fileService';

const FileContext = createContext();

export const FileProvider = ({ children }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTeamFiles = useCallback(async (teamId) => {
    setLoading(true);
    const result = await fileService.listFilesForTeam(teamId);
    if (result.success) {
      setFiles(result.data);
    }
    setLoading(false);
    return result;
  }, []);

  const uploadFile = useCallback(async (file, teamId) => {
    const result = await fileService.uploadFile(file, teamId);
    if (result.success) {
      await fetchTeamFiles(teamId);
    }
    return result;
  }, [fetchTeamFiles]);

  const deleteFile = useCallback(async (fileId, teamId) => {
    const result = await fileService.deleteFile(fileId);
    if (result.success) {
      await fetchTeamFiles(teamId);
    }
    return result;
  }, [fetchTeamFiles]);

  const fileValue = useMemo(() => ({
    files,
    loading,
    fetchTeamFiles,
    uploadFile,
    deleteFile
  }), [files, loading, fetchTeamFiles, uploadFile, deleteFile]);

  return (
    <FileContext.Provider value={fileValue}>
      {children}
    </FileContext.Provider>
  );
};

export const useFiles = () => useContext(FileContext);
