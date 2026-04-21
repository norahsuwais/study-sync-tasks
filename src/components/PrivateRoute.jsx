import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext) || {};

  if (loading) return <div>Loading...</div>;
  // if no user, redirect to login
  return user ? children : <Navigate to="/login" replace />;
}