import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import AdminHeader from "../components/AdminHeader";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [headerHeight, setHeaderHeight] = useState(0);

  const forceReset = localStorage.getItem("FORCE_PASSWORD_RESET") === "true";

  useEffect(() => {
    const updateHeight = () => {
      const header = document.getElementById("admin-header");
      if (header) {
        setHeaderHeight(header.offsetHeight);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  useEffect(() => {
    const handleUnauthorized = (event) => {
      if (event.detail === 401) {
        navigate("/admin/login", { replace: true });
      }
    };

    window.addEventListener("admin-unauthorized", handleUnauthorized);
    return () =>
      window.removeEventListener("admin-unauthorized", handleUnauthorized);
  }, [navigate]);

  return (
    <div className="bg-sky-50">
      {/* FIXED HEADER */}
      <AdminHeader />

      {/* FIXED SIDEBAR */}
      {!forceReset && <Sidebar headerHeight={headerHeight} />}

      {/* MAIN CONTENT */}
      <main
        className={`ml-64 p-6 transition-all ${
          forceReset ? "ml-0" : "max-md:ml-0"
        }`}
        style={{
          marginTop: headerHeight,
          height: `calc(100vh - ${headerHeight}px)`,
          overflowY: "auto",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}
