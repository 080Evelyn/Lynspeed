import React from "react";
import { Navigate } from "react-router-dom";

interface AdminProtectedRouteProps {
  isAdmin: boolean;
  children: React.ReactNode;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ isAdmin, children }) => {
  return isAdmin ? <>{children}</> : <Navigate to="/adminPanel" />;
};

export default AdminProtectedRoute;
