// import { Navigate } from "react-router-dom";
// import { useAdmin } from "../context/AdminContext";

// export default function PublicAdminRoute({ children }) {
//   const { isAuthenticated, loading } = useAdmin();

//   if (loading) return null;

//   if (isAuthenticated) {
//     return <Navigate to="/admin/home" replace />;
//   }

//   return children;
// }

import { Navigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";

export default function PublicAdminRoute({ children }) {
  const { isAuthenticated, loading } = useAdmin();

  const forceReset = localStorage.getItem("FORCE_PASSWORD_RESET") === "true";

  if (loading) return null;

  if (isAuthenticated) {
    // If they are logged in but need a reset, send them to the reset page
    if (forceReset) {
      return <Navigate to="/admin/reset-password" replace />;
    }
    // Otherwise, send them to the normal home page
    return <Navigate to="/admin/home" replace />;
  }

  return children;
}
