export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3030/api';
export const WS_BASE_URL = process.env.REACT_APP_WS_URL || 'http://localhost:3030/ws';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  CHAT: '/chat/:teamId',
  TEAMS: '/teams',
  FILES: '/files/:teamId',
  PROFILE: '/profile',
  ABOUT: '/about',
};

export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
};
