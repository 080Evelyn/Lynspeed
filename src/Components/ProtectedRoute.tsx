import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../State/Store";

const ProtectedRoute = () => {
  //Access user from local storage
  const jwt = localStorage.getItem("authToken");
  // getting the isAuthenticated state from redux store
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  // If not authenticated, redirect to login
  if (!isAuthenticated || !jwt) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the protected route
  return <Outlet />;
};

export default ProtectedRoute;
