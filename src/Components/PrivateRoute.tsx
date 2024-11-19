import { useSelector } from "react-redux";
import { RootState } from "../State/Store";  // Import RootState
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  // Derive isAuthenticated from auth state
  const jwt = useSelector((state: RootState) => state.auth.jwt);
  const user = useSelector((state: RootState) => state.auth.user);

  const isAuthenticated = !!jwt && !!user;

  // Log user and JWT for debugging
  console.log("User from Redux state:", user);
  console.log("JWT from Redux state:", jwt);

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the protected route
  return element;
};

export default PrivateRoute;
