import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ element: Component, requiredRole, ...rest }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole === 'admin' && !isAdmin) {
    return <Navigate to="/" />;
  }

  if (requiredRole === 'coordinator' && isAdmin) {
    return <Navigate to="/" />;
  }

  return Component;
};

export default PrivateRoute;
