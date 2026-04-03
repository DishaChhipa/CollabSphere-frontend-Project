import React from 'react';
import { AuthProvider } from './store/AuthContext';
import { TeamProvider } from './store/TeamContext';
import { ChatProvider } from './store/ChatContext';
import { FileProvider } from './store/FileContext';
import AppRoutes from './routes/AppRoutes';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <AuthProvider>
        <TeamProvider>
          <ChatProvider>
            <FileProvider>
              <AppRoutes />
            </FileProvider>
          </ChatProvider>
        </TeamProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
