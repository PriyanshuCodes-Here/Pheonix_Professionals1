// src/admin/context/AdminAuthContext.jsx
import React, { createContext, useContext, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const navigate = useNavigate();
  const [token, setToken] = useState(() =>
    localStorage.getItem("adminToken")
  );

  const login = (newToken) => {
    localStorage.setItem("adminToken", newToken);
    setToken(newToken);
    navigate("/admin");
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
    navigate("/admin/login");
  };

  const value = useMemo(
    () => ({
      token,
      isAuthenticated: !!token,
      login,
      logout,
    }),
    [token]
  );

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error(
      "useAdminAuth must be used inside AdminAuthProvider"
    );
  }
  return context;
}
