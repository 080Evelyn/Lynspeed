import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

const AdminProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAuthenticated, children }) => {
  return isAuthenticated ? <>{children}</> : <Navigate to="/adminLogin" />;
};

export default AdminProtectedRoute;
