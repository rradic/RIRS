import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, role, children }) => {
  // Check if the user is logged in and has the correct role
  if (!user || user.role !== role) {
    console.log(user)
    return <Navigate to="/login" replace />; // Redirect to login if not authenticated or incorrect role
  }
  if (user.role !== role) {
    return <Navigate to="/" replace />; // Redirect unauthorized users
  }
  return children; // Render children if authorized
};

export default ProtectedRoute;
