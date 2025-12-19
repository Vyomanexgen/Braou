import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

/* ========= PUBLIC PAGES ========= */
import Home from "./pages/Home";
import About from "./pages/About";
import Live from "./pages/Live";
import TSAT from "./pages/TSAT";
import AIR from "./pages/AIR";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Updates from "./pages/Updates";

/* ========= LAYOUTS ========= */
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./admin/layout/AdminLayout";

/* ========= ADMIN ========= */
import { AdminProvider } from "./admin/context/AdminContext";
import HomeAdmin from "./admin/pages/HomeAdmin";
import LiveAdmin from "./admin/pages/LiveAdmin";
import AIRAdmin from "./admin/pages/AIRAdmin";
import BannerAdmin from "./admin/pages/BannerAdmin";
import AboutAdmin from "./admin/pages/AboutAdmin";
import YoutubeAdmin from "./admin/pages/YoutubeAdmin";
import WebRadioAdmin from "./admin/pages/WebRadioAdmin";
import VidyaganiAdmin from "./admin/pages/VidyaganiAdmin";
import TSATAdmin from "./admin/pages/TSATAdmin";
import EventsAdmin from "./admin/pages/EventsAdmin";
import ContactAdmin from "./admin/pages/ContactAdmin";

import AdminLogin from "./admin/pages/AdminLogin";
import AdminForgotPassword from "./admin/pages/AdminForgotPassword";
import AdminResetPassword from "./admin/pages/AdminResetPassword";

import RequireAdminAuth from "./admin/components/RequireAdminAuth";

/* ========= CONFIG ========= */
const BANNER_API_URL = `${import.meta.env.VITE_BASE_API}/banner`;

export default function App() {
  return (
    <Router>
      <AdminProvider>
        <AppInitializer />
      </AdminProvider>
    </Router>
  );
}

/* ========= APP INITIALIZER ========= */
const AppInitializer = () => {
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(true);
  const [bannerImage, setBannerImage] = useState(null);
  const [isBannerOpen, setIsBannerOpen] = useState(false);

  // ✅ Detect admin route
  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    const initApp = async () => {
      let fetchedBanner = null;

      try {
        const [bannerRes] = await Promise.all([
          fetch(BANNER_API_URL).catch(() => null),
          new Promise((res) => setTimeout(res, 1500)),
        ]);

        if (bannerRes?.ok) {
          const result = await bannerRes.json();
          const banners = result?.data || [];
          const lastBanner = banners[banners.length - 1];
          fetchedBanner = lastBanner?.image_url || null;

          if (fetchedBanner) setBannerImage(fetchedBanner);
        }
      } catch (err) {
        console.error("Init error:", err);
      } finally {
        setIsLoading(false);

        // Show banner only for public routes
        if (fetchedBanner && !isAdminRoute) {
          setTimeout(() => setIsBannerOpen(true), 100);
        }
      }
    };

    initApp();
  }, [isAdminRoute]);

  return (
    <>
      {/* ===== GLOBAL LOADER ===== */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-white"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="w-16 h-16 border-4 border-cyan-200 border-t-cyan-600 rounded-full animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== POPUP BANNER (PUBLIC ONLY) ===== */}
      {!isAdminRoute && (
        <PopupBanner
          isOpen={isBannerOpen}
          onClose={() => setIsBannerOpen(false)}
          imageSrc={bannerImage}
        />
      )}

      {/* ===== ROUTES ===== */}
      <Routes>
        {/* -------- PUBLIC ROUTES -------- */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/live" element={<Live />} />
          <Route path="/tsat" element={<TSAT />} />
          <Route path="/air" element={<AIR />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/updates" element={<Updates />} />

          {/* ADMIN AUTH (PUBLIC ACCESS) */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/forgot-password"
            element={<AdminForgotPassword />}
          />
        </Route>

        {/* 🔐 RESET PASSWORD (ADMIN, BUT NOT PROTECTED) */}
        <Route path="/admin/reset-password" element={<AdminResetPassword />} />

        {/* -------- ADMIN PROTECTED ROUTES -------- */}
        <Route
          path="/admin"
          element={
            <RequireAdminAuth>
              <AdminLayout />
            </RequireAdminAuth>
          }
        >
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<HomeAdmin />} />
          <Route path="about" element={<AboutAdmin />} />
          <Route path="live" element={<LiveAdmin />} />
          <Route path="youtube" element={<YoutubeAdmin />} />
          <Route path="radio" element={<WebRadioAdmin />} />
          <Route path="vidyagani" element={<VidyaganiAdmin />} />
          <Route path="tsat" element={<TSATAdmin />} />
          <Route path="air" element={<AIRAdmin />} />
          <Route path="events" element={<EventsAdmin />} />
          <Route path="banner" element={<BannerAdmin />} />
          <Route path="footer-contact" element={<ContactAdmin />} />
        </Route>
      </Routes>
    </>
  );
};

/* ========= POPUP BANNER ========= */
const PopupBanner = ({ isOpen, onClose, imageSrc }) => {
  return (
    <AnimatePresence>
      {isOpen && imageSrc && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 px-2 py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative bg-white rounded-lg shadow-2xl w-full max-w-3xl"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-50 bg-red-700 text-white rounded-full w-9 h-9 flex items-center justify-center font-bold"
            >
              ✕
            </button>

            <div className="max-h-[80vh] w-full flex items-center justify-center bg-gray-100 rounded-lg">
              <img
                src={imageSrc}
                alt="Popup Banner"
                className="max-h-[80vh] max-w-[90vw] object-contain"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
