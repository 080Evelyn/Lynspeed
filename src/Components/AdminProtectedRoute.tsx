import React from "react";
import { Navigate } from "react-router-dom";

interface AdminProtectedRouteProps {
  is_admin: boolean;
  children: React.ReactNode;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ is_admin, children }) => {
  return is_admin ? <>{children}</> : <Navigate to="/adminPanel" />;
};

export default AdminProtectedRoute;
