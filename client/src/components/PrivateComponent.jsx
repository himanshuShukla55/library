import React, { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { Navigate } from "react-router-dom";

const PrivateComponent = ({ children }) => {
  const { auth } = useContext(UserContext);
  return auth ? children : <Navigate to="/login" />;
};

export default PrivateComponent;
