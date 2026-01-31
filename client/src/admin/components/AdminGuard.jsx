// components/AdminGuard.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminGuard = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem("admin_logged_in");
      
      // Check if login is older than 24 hours (optional)
      const loginTime = localStorage.getItem("admin_login_time");
      const currentTime = Date.now();
      const hours24 = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      
      if (!isLoggedIn || (loginTime && currentTime - parseInt(loginTime) > hours24)) {
        // Clear expired session
        localStorage.removeItem("admin_logged_in");
        localStorage.removeItem("admin_login_time");
        
        // Redirect to login
        navigate("/admin/login");
      }
    };

    checkAuth();
    
    // Check auth on page focus
    window.addEventListener("focus", checkAuth);
    
    return () => {
      window.removeEventListener("focus", checkAuth);
    };
  }, [navigate]);

  return children;
};

export default AdminGuard;