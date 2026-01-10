// import { Navigate, useLocation } from "react-router-dom";
// import { useAdmin } from "../context/AdminContext";

// export default function RequireAdminAuth({ children }) {
//   const { isAuthenticated, loading } = useAdmin();
//   const location = useLocation();

//   const forceReset = localStorage.getItem("FORCE_PASSWORD_RESET") === "true";

//   if (loading) return null;

//   if (!isAuthenticated) {
//     return <Navigate to="/admin/login" replace />;
//   }

//   if (forceReset && location.pathname !== "/admin/reset-password") {
//     return <Navigate to="/admin/reset-password" replace />;
//   }

//   return children;
// }

import { Navigate, useLocation } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";

// export default function RequireAdminAuth({ children }) {
//   const { isAuthenticated, loading } = useAdmin();
//   const location = useLocation();

//   // Check if the reset flag is present in storage
//   const forceReset = localStorage.getItem("FORCE_PASSWORD_RESET") === "true";

//   if (loading) return null;

//   // 1. If not logged in, go to login
//   if (!isAuthenticated) {
//     return <Navigate to="/admin/login" state={{ from: location }} replace />;
//   }

//   // 2. If logged in but must reset, and trying to access ANY admin page
//   // We don't need to check "location.pathname !== ..." here because 
//   // this guard only wraps the internal admin routes, not the reset page itself.
//   if (forceReset) {
//     return <Navigate to="/admin/reset-password" replace />;
//   }

//   return children;
// }


export default function RequireAdminAuth({ children }) {
  const { isAuthenticated, loading } = useAdmin();
  const location = useLocation();
  
  const forceReset = localStorage.getItem("FORCE_PASSWORD_RESET") === "true";

  if (loading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // BLOCKER: If logged in but must reset, prevent them from seeing the dashboard
  if (forceReset) {
    return <Navigate to="/admin/reset-password" replace />;
  }

  return children;
}