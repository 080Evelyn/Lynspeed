import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  //Access token from local storage
  const jwt = localStorage.getItem("authToken");

  // If no token, redirect to login
  if (!jwt) {
    return <Navigate to="/login" />;
  }

  // If token, render the protected route
  return <Outlet />;
};

export default ProtectedRoute;
