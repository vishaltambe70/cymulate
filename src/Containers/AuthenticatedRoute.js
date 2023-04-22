import React from "react";
import { Route, Navigate } from "react-router-dom";

// AuthenticatedRoute component
const AuthenticatedRoute = ({
  component: Component,
  isAuthenticated,
  ...rest
}) => (
  <div
    {...rest}
    element={
      isAuthenticated ? <Component /> : <Navigate to="/signin" replace />
    }
  />
);

export default AuthenticatedRoute;
