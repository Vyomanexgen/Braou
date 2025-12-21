import { Navigate, useLocation } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";

export default function RequireAdminAuth({ children }) {
  const { isAuthenticated, loading } = useAdmin();
  const location = useLocation();

  const forceReset = localStorage.getItem("FORCE_PASSWORD_RESET") === "true";

  if (loading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  if (forceReset && location.pathname !== "/admin/reset-password") {
    return <Navigate to="/admin/reset-password" replace />;
  }

  return children;
}
