import React from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token") !== null;

  // Render children only if authenticated
  if (!isAuthenticated) {
    return navigate("/login");
  }

  return { children };
};

export default ProtectedRoute;
