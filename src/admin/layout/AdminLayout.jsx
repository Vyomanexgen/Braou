import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "../../components/Header";

export default function AdminLayout() {
  const navigate = useNavigate();

  // 🚨 FORCE RESET FLAG
  const forceReset = localStorage.getItem("FORCE_PASSWORD_RESET") === "true";

  useEffect(() => {
    const handleUnauthorized = (event) => {
      if (event.detail === 401) {
        navigate("/admin/login", { replace: true });
      }
    };

    window.addEventListener("admin-unauthorized", handleUnauthorized);

    return () => {
      window.removeEventListener("admin-unauthorized", handleUnauthorized);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-sky-50 flex flex-col">
      {/* SAME HEADER USED IN PUBLIC + ADMIN */}
      {/* <Header /> */}

      <div className="flex flex-1">
        {/*  Hide sidebar during forced password reset */}
        {!forceReset && <Sidebar />}

        <main
          className={`flex-1 p-6 transition-all ${
            forceReset ? "ml-0" : "ml-64 max-md:ml-0"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
