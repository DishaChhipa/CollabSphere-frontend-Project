import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../store/AuthContext';
import { ROUTES } from '../utils/constants';
import Loader from '../components/common/Loader';

const PrivateRoute = () => {
  const { user, isAuthLoading } = useAuth();

  if (isAuthLoading) return <Loader fullPage />;

  return user ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />;
};

export default PrivateRoute;
