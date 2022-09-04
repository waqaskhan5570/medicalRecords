import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedUserRoute = ({ isPatient, children }) => {
  if (!isPatient) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedUserRoute;
