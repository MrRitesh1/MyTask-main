import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateCommponet = () => {
  const auth = localStorage.getItem("usar");
  return auth ? <Outlet /> : <Navigate to="/singUp" />;
};

export default PrivateCommponet;
