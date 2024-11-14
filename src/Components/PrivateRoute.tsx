import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../State/Store';  // Import RootState from the store file

interface PrivateRouteProps {
  element: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  // Access the state from the Redux store
  const { user, jwt } = useSelector((state: RootState) => state.auth);

  // If authenticated (i.e., user exists and jwt is present), render the element
  // If not authenticated, redirect to login
  return user && jwt ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
