import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, role, children }) => {
  // Check if the user is logged in and has the correct role
  if (!user || user.role !== role) {
    return <Navigate to="/login" replace />;  // Redirect to login if not authenticated or incorrect role
  }

  return children;  // Render children if authorized
};

export default ProtectedRoute;
