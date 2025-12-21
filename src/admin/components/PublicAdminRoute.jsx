import { Navigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";

export default function PublicAdminRoute({ children }) {
  const { isAuthenticated, loading } = useAdmin();

  if (loading) return null;

  if (isAuthenticated) {
    return <Navigate to="/admin/home" replace />;
  }

  return children;
}
