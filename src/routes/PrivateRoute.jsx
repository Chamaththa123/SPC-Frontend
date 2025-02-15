import React from "react";
import { Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/UserContext";

const PrivateRoute = ({ element }) => {
  const { token } = useStateContext();

  if (!token) {
    return <Navigate to="/login" />; 
  }

  return element;
};

export default PrivateRoute;
