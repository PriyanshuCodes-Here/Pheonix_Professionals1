// src/admin/components/AdminGuard.jsx
import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

const HOURS_24 = 24 * 60 * 60 * 1000;

const AdminGuard = ({ children }) => {
  const { token, logout } = useAdminAuth();

  // no token → not authenticated
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  // check expiry (feature preserved)
  const loginTime = localStorage.getItem("admin_login_time");

  if (loginTime) {
    const isExpired = Date.now() - parseInt(loginTime, 10) > HOURS_24;

    if (isExpired) {
      logout(); // clears token + storage
      localStorage.removeItem("admin_login_time");
      return <Navigate to="/admin/login" replace />;
    }
  }

  return children;
};

export default AdminGuard;
