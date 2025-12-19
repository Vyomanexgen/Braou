import { createContext, useContext, useEffect, useState } from "react";
import { logoutAllTabs } from "../utils/adminSession";

const AdminContext = createContext();
const BASE_API = import.meta.env.VITE_BASE_API;

export const AdminProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  /* ================= CHECK AUTH ================= */
  const checkAuth = async () => {
    try {
      const res = await fetch(`${BASE_API}/auth/refresh`, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Not authenticated");

      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  /* ================= INITIAL CHECK ================= */
  useEffect(() => {
    checkAuth();
  }, []);

  /* ================= CROSS-TAB LOGOUT ================= */
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === "admin-logout") {
        setIsAuthenticated(false);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  /* ================= LOGIN ================= */
  const loginSuccess = () => {
    setIsAuthenticated(true);
  };

  /* ================= LOGOUT ================= */
  const logout = async () => {
    try {
      await fetch(`${BASE_API}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // ignore backend failure
    } finally {
      setIsAuthenticated(false);
      logoutAllTabs(); // 🔥 sync logout across tabs
    }
  };

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        loading,
        loginSuccess,
        logout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
