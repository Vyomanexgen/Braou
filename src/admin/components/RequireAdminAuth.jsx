import { Navigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";

export default function RequireAdminAuth({ children }) {
  const { isAuthenticated, loading } = useAdmin();

  const forceReset = localStorage.getItem("FORCE_PASSWORD_RESET") === "true";

  // Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  // Logged in but forced reset
  if (forceReset) {
    return <Navigate to="/admin/reset-password" replace />;
  }

  return children;
}
