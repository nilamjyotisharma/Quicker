import React from "react";
import { useSelector } from "react-redux";
import {Navigate, Route } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

  const { loading, isAuthenticated, userInfo } = useSelector((state) => state.authentication);

  return (
    <>   
      {isAuthenticated === false ? (
        <Navigate to="/login" />
      ):(
        children 
      )}
    </>
  );
};

export default ProtectedRoute;