// import React, { useState, useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
//   useLocation,
// } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";

// /* ========= PUBLIC PAGES ========= */
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Live from "./pages/Live";
// import TSAT from "./pages/TSAT";
// import AIR from "./pages/AIR";
// import Events from "./pages/Events";
// import EventDetails from "./pages/EventDetails";
// import Updates from "./pages/Updates";

// /* ========= LAYOUTS ========= */
// import PublicLayout from "./layouts/PublicLayout";
// import AdminLayout from "./admin/layout/AdminLayout";

// /* ========= ADMIN ========= */
// import { AdminProvider } from "./admin/context/AdminContext";
// import HomeAdmin from "./admin/pages/HomeAdmin";
// import LiveAdmin from "./admin/pages/LiveAdmin";
// import AIRAdmin from "./admin/pages/AIRAdmin";
// import BannerAdmin from "./admin/pages/BannerAdmin";
// import AboutAdmin from "./admin/pages/AboutAdmin";
// import YoutubeAdmin from "./admin/pages/YoutubeAdmin";
// import WebRadioAdmin from "./admin/pages/WebRadioAdmin";
// import VidyaganiAdmin from "./admin/pages/VidyaganiAdmin";
// import TSATAdmin from "./admin/pages/TSATAdmin";
// import EventsAdmin from "./admin/pages/EventsAdmin";
// import ContactAdmin from "./admin/pages/ContactAdmin";

// import AdminLogin from "./admin/pages/AdminLogin";
// import AdminForgotPassword from "./admin/pages/AdminForgotPassword";
// import AdminResetPassword from "./admin/pages/AdminResetPassword";

// /* ========= ROUTE GUARDS ========= */
// import RequireAdminAuth from "./admin/components/RequireAdminAuth";
// import PublicAdminRoute from "./admin/components/PublicAdminRoute";

// /* ========= CONFIG ========= */
// const BANNER_API_URL = `${import.meta.env.VITE_BASE_API}/banner`;

// /* ========= APP ROOT ========= */
// export default function App() {
//   return (
//     <Router>
//       <AdminProvider>
//         <AppInitializer />
//       </AdminProvider>
//     </Router>
//   );
// }

// /* ========= APP INITIALIZER ========= */
// const AppInitializer = () => {
//   const location = useLocation();

//   const [isLoading, setIsLoading] = useState(true);
//   const [bannerImage, setBannerImage] = useState(null);
//   const [isBannerOpen, setIsBannerOpen] = useState(false);

//   const isAdminRoute = location.pathname.startsWith("/admin");

//   /* 🔥 RUN ONLY ONCE */
//   useEffect(() => {
//     let mounted = true;

//     // const initApp = async () => {
//     //   let fetchedBanner = null;

//     //   try {
//     //     const bannerRes = await fetch(BANNER_API_URL).catch(() => null);

//     //     if (bannerRes?.ok) {
//     //       const result = await bannerRes.json();
//     //       const banners = result?.data || [];
//     //       fetchedBanner = banners[banners.length - 1]?.image_url || null;

//     //       if (mounted) setBannerImage(fetchedBanner);
//     //     }
//     //   } catch (err) {
//     //     console.error("Init error:", err);
//     //   } finally {
//     //     if (mounted) setIsLoading(false);
//     //   }
//     // };

// const initApp = async () => {
//   try {
//     const bannerRes = await fetch(BANNER_API_URL).catch(() => null);

//     if (bannerRes?.ok) {
//       const result = await bannerRes.json();
//       const banners = result?.data || [];
      
//       // Get the most recent banner entry
//       const latestBanner = banners[banners.length - 1];

//       if (latestBanner) {
//         // 1. Get Today's date in YYYY-MM-DD format based on local time
//         const now = new Date();
//         const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

//         // 2. Map fields exactly as they appear in your Postman request/response
//         // We use .split('T')[0] in case the backend returns a full ISO timestamp
//         const cleanStart = (latestBanner.start_date || "").split('T')[0];
//         const cleanEnd = (latestBanner.end_date || "").split('T')[0];
        
//         // Check for 'active' property
//         const isActive = latestBanner.active ?? false;

//         // 3. Debugging Log - Check this in F12 Console
//         console.log("Banner Debug Final:", { todayStr, cleanStart, cleanEnd, isActive });

//         // 4. Strict Comparison Logic
//         // The banner shows ONLY if:
//         // - It is explicitly marked as active
//         // - Dates are not empty strings
//         // - Today falls within the start and end range
//         const isLive = 
//           isActive === true && 
//           cleanStart !== "" && 
//           cleanEnd !== "" && 
//           todayStr >= cleanStart && 
//           todayStr <= cleanEnd;

//         if (isLive && latestBanner.image_url && mounted) {
//           setBannerImage(latestBanner.image_url);
//         } else if (mounted) {
//           // Hide banner if any condition fails
//           setBannerImage(null);
//         }
//       }
//     }
//   } catch (err) {
//     console.error("Init error:", err);
//   } finally {
//     if (mounted) setIsLoading(false);
//   }
// };
//     initApp();

//     return () => {
//       mounted = false;
//     };
//   }, []);

//   /* 🔥 OPEN BANNER ONLY WHEN ROUTE CHANGES TO PUBLIC */
//   // useEffect(() => {
//   //   if (bannerImage && !isAdminRoute) {
//   //     const timer = setTimeout(() => setIsBannerOpen(true), 100);
//   //     return () => clearTimeout(timer);
//   //   }
//   // }, [bannerImage, isAdminRoute]);
//   /* 🔥 OPEN BANNER ONLY WHEN CONDITIONS ARE MET */
//   useEffect(() => {
//     // Only show if we have an image AND we are not in the admin panel
//     if (bannerImage && !isAdminRoute) {
//       const timer = setTimeout(() => setIsBannerOpen(true), 100);
//       return () => clearTimeout(timer);
//     } else {
//       // Ensure banner is closed if the image is null or user navigates to admin
//       setIsBannerOpen(false);
//     }
//   }, [bannerImage, isAdminRoute]);

//   return (
//     <>
//       {/* ===== GLOBAL LOADER ===== */}
//       <AnimatePresence>
//         {isLoading && (
//           <motion.div
//             className="fixed inset-0 z-[99999] flex items-center justify-center bg-white"
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.4 }}
//           >
//             <div className="w-16 h-16 border-4 border-cyan-200 border-t-cyan-600 rounded-full animate-spin" />
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* ===== POPUP BANNER (PUBLIC ONLY) ===== */}
//       {!isAdminRoute && (
//         <PopupBanner
//           isOpen={isBannerOpen}
//           onClose={() => setIsBannerOpen(false)}
//           imageSrc={bannerImage}
//         />
//       )}

//       {/* ===== ROUTES ===== */}
//       <Routes>
//         {/* ---------- PUBLIC ---------- */}
//         <Route element={<PublicLayout />}>
//           <Route path="/" element={<Navigate to="/home" replace />} />
//           <Route path="/home" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/live" element={<Live />} />
//           <Route path="/tsat" element={<TSAT />} />
//           <Route path="/air" element={<AIR />} />
//           <Route path="/events" element={<Events />} />
//           <Route path="/events/:id" element={<EventDetails />} />
//           <Route path="/updates" element={<Updates />} />
//         </Route>

//         {/* ---------- ADMIN AUTH (PUBLIC) ---------- */}
//         <Route
//           path="/admin/login"
//           element={
//             <PublicAdminRoute>
//               <AdminLogin />
//             </PublicAdminRoute>
//           }
//         />

//         <Route
//           path="/admin/forgot-password"
//           element={
//             <PublicAdminRoute>
//               <AdminForgotPassword />
//             </PublicAdminRoute>
//           }
//         />

//         <Route
//           path="/admin/reset-password"
//           element={
//             <PublicAdminRoute>
//               <AdminResetPassword />
//             </PublicAdminRoute>
//           }
//         />

//         {/* ---------- ADMIN PROTECTED ---------- */}
//         <Route
//           path="/admin"
//           element={
//             <RequireAdminAuth>
//               <AdminLayout />
//             </RequireAdminAuth>
//           }
//         >
//           <Route index element={<Navigate to="home" replace />} />
//           <Route path="home" element={<HomeAdmin />} />
//           <Route path="about" element={<AboutAdmin />} />
//           <Route path="live" element={<LiveAdmin />} />
//           <Route path="youtube" element={<YoutubeAdmin />} />
//           <Route path="radio" element={<WebRadioAdmin />} />
//           <Route path="vidyagani" element={<VidyaganiAdmin />} />
//           <Route path="tsat" element={<TSATAdmin />} />
//           <Route path="air" element={<AIRAdmin />} />
//           <Route path="events" element={<EventsAdmin />} />
//           <Route path="banner" element={<BannerAdmin />} />
//           <Route path="footer-contact" element={<ContactAdmin />} />
//         </Route>
//       </Routes>
//     </>
//   );
// };

// /* ========= POPUP BANNER ========= */
// /* ========= POPUP BANNER ========= */
// const PopupBanner = ({ isOpen, onClose, imageSrc }) => {
//   const AUTO_CLOSE_TIME = 20; // <-- auto close after 8 seconds

//   // Auto-close effect
//   useEffect(() => {
//     if (!isOpen || !imageSrc) return;

//     const timer = setTimeout(() => {
//       onClose();
//     }, AUTO_CLOSE_TIME * 1000);

//     return () => clearTimeout(timer);
//   }, [isOpen, imageSrc, onClose]);

//   return (
//     <AnimatePresence>
//       {isOpen && imageSrc && (
//         <motion.div
//           className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 px-2 py-6"
//           onClick={onClose}
//         >
//           <motion.div
//             className="relative bg-white rounded-lg shadow-2xl inline-block max-w-[90vw] max-h-[90vh]"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Responsive scalable close button */}
//             <button
//               onClick={onClose}
//               className="absolute top-2 right-2 z-50 bg-red-700 text-white 
//               rounded-full font-bold flex items-center justify-center
//               w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12
//               text-xs sm:text-sm md:text-base lg:text-lg"
//             >
//               ✕
//             </button>

//             <img
//               src={imageSrc}
//               alt="Popup Banner"
//               className="max-h-[80vh] max-w-[90vw] object-contain mx-auto"
//             />
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

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

/* ========= ROUTE GUARDS ========= */
import RequireAdminAuth from "./admin/components/RequireAdminAuth";
import PublicAdminRoute from "./admin/components/PublicAdminRoute";

/* ========= CONFIG ========= */
const BANNER_API_URL = `${import.meta.env.VITE_BASE_API}/banner`;

/* ========= APP ROOT ========= */
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

  const isAdminRoute = location.pathname.startsWith("/admin");

  /* 🔥 RUN ONLY ONCE */
  useEffect(() => {
    let mounted = true;

    const initApp = async () => {
      try {
        const bannerRes = await fetch(BANNER_API_URL).catch(() => null);

        if (bannerRes?.ok) {
          const result = await bannerRes.json();
          const banners = result?.data || [];
          
          // Get the most recent banner entry
          const latestBanner = banners[banners.length - 1];

          if (latestBanner) {
            // 1. Get Today's date in YYYY-MM-DD format based on local time
            const now = new Date();
            const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

            // 2. Map fields exactly as they appear in backend
            const cleanStart = (latestBanner.start_date || "").split('T')[0];
            const cleanEnd = (latestBanner.end_date || "").split('T')[0];
            
            const isActive = latestBanner.active ?? false;

            // 3. Debugging Log
            console.log("Banner Debug Final:", { todayStr, cleanStart, cleanEnd, isActive });

            // 4. Strict Comparison Logic
            const isLive = 
              isActive === true && 
              cleanStart !== "" && 
              cleanEnd !== "" && 
              todayStr >= cleanStart && 
              todayStr <= cleanEnd;

            if (isLive && latestBanner.image_url && mounted) {
              setBannerImage(latestBanner.image_url);
            } else if (mounted) {
              setBannerImage(null);
            }
          }
        }
      } catch (err) {
        console.error("Init error:", err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    initApp();

    return () => {
      mounted = false;
    };
  }, []);

  /* 🔥 OPEN BANNER ONLY WHEN CONDITIONS ARE MET */
  useEffect(() => {
    if (bannerImage && !isAdminRoute) {
      const timer = setTimeout(() => setIsBannerOpen(true), 100);
      return () => clearTimeout(timer);
    } else {
      setIsBannerOpen(false);
    }
  }, [bannerImage, isAdminRoute]);

  return (
    <>
      {/* ===== GLOBAL LOADER ===== */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-white"
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
        {/* ---------- PUBLIC ---------- */}
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
        </Route>

        {/* ---------- ADMIN AUTH (PUBLIC) ---------- */}
        <Route
          path="/admin/login"
          element={
            <PublicAdminRoute>
              <AdminLogin />
            </PublicAdminRoute>
          }
        />

        <Route
          path="/admin/forgot-password"
          element={
            <PublicAdminRoute>
              <AdminForgotPassword />
            </PublicAdminRoute>
          }
        />

        {/* ✅ MOVED OUTSIDE PublicAdminRoute to fix the white screen. 
          This page needs to be accessible during the reset flow without guard interference.
        */}
        <Route
          path="/admin/reset-password"
          element={<AdminResetPassword />}
        />

        {/* ---------- ADMIN PROTECTED ---------- */}
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
  const AUTO_CLOSE_TIME = 20;

  useEffect(() => {
    if (!isOpen || !imageSrc) return;
    const timer = setTimeout(() => {
      onClose();
    }, AUTO_CLOSE_TIME * 1000);
    return () => clearTimeout(timer);
  }, [isOpen, imageSrc, onClose]);

  return (
    <AnimatePresence>
      {isOpen && imageSrc && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 px-2 py-6"
          onClick={onClose}
        >
          <motion.div
            className="relative bg-white rounded-lg shadow-2xl inline-block max-w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-2 right-2 z-50 bg-red-700 text-white 
              rounded-full font-bold flex items-center justify-center
              w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12
              text-xs sm:text-sm md:text-base lg:text-lg"
            >
              ✕
            </button>
            <img
              src={imageSrc}
              alt="Popup Banner"
              className="max-h-[80vh] max-w-[90vw] object-contain mx-auto"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};