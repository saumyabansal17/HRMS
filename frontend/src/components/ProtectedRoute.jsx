import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  
  if (!userData || !allowedRoles.includes(userData.role)) {
    return <Navigate to="/login"  />;
  }

  return children;
};

export default ProtectedRoute;
