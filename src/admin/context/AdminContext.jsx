import { createContext, useContext, useEffect, useState } from "react";
import { logoutAllTabs } from "../utils/adminSession";

const AdminContext = createContext();
const BASE_API = import.meta.env.VITE_BASE_API;

export const AdminProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      try {
        const res = await fetch(`${BASE_API}/auth/refresh`, {
          method: "POST",
          credentials: "include",
        });

        if (!res.ok) throw new Error("Not authenticated");

        if (mounted) setIsAuthenticated(true);
      } catch {
        if (mounted) setIsAuthenticated(false);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    checkAuth();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === "admin-logout") {
        setIsAuthenticated(false);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const loginSuccess = () => {
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      await fetch(`${BASE_API}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // ignore
    } finally {
      setIsAuthenticated(false);
      logoutAllTabs();
    }
  };

  return (
    <AdminContext.Provider
      value={{ isAuthenticated, loading, loginSuccess, logout }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) {
    throw new Error("useAdmin must be used inside AdminProvider");
  }
  return ctx;
};
