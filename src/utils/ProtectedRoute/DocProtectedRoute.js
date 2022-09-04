import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedUserRoute = ({ isDoc, children }) => {
  if (!isDoc) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedUserRoute;
