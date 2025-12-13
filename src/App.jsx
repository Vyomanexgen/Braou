// import React, { useState, useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
//   useLocation,
// } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";

// // --- PAGES ---
// import Home from "./pages/Home";

// // --- COMPONENTS ---
// import Header from "./components/Header";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import BottomBar from "./components/BottomBar";
// import About from "./pages/About";
// import Live from "./pages/Live";
// import TSAT from "./pages/TSAT";
// import AIR from "./pages/AIR";
// import Events from "./pages/Events";

// // ============================================================================
// // CONFIGURATION
// // ============================================================================
// const ADMIN_BANNER_API_URL = "http://localhost:5000/api/popup-banner";

// // FOR TESTING ONLY: Use this image if the API is not ready yet
// const TEST_BANNER_IMAGE =
//   "https://placehold.co/800x600/004B52/ffffff/png?text=Welcome+to+BRAOU+Admission+Open";

// const SHOW_DUMMY_BANNER = true;

// function App() {
//   return (
//     <Router>
//       <MainLayout />
//     </Router>
//   );
// }

// // Separate component to allow usage of 'useLocation' hook
// const MainLayout = () => {
//   const location = useLocation();

//   // STATE: Banner Logic
//   const [bannerImage, setBannerImage] = useState(null);
//   const [isBannerOpen, setIsBannerOpen] = useState(false);
//   const [isInitialLoadDone, setIsInitialLoadDone] = useState(false);


//   // EFFECT: Check for Banner on App Load
  
// // useEffect(() => {
// //   const checkBannerStatus = async () => {
// //     try {
// //       const response = await fetch(ADMIN_BANNER_API_URL);

// //       if (response.ok) {
// //         const data = await response.json();
// //         const imageUrl = data.url || data;

// //         if (imageUrl) {
// //           setBannerImage(imageUrl);
// //           setIsBannerOpen(true);
// //         }
// //       }
// //     } catch (error) {
// //       console.warn("Banner API unavailable:", error);

// //   // ✅ Show test banner ONLY when explicitly enabled
// //   if (import.meta.env.VITE_USE_TEST_BANNER === "true") {
// //     setBannerImage(TEST_BANNER_IMAGE);
// //     setIsBannerOpen(true);
// //   }
// //     }
// //   };

// //   checkBannerStatus();
// // }, []);

// useEffect(() => {
//   if (!isInitialLoadDone) return; // ⛔ wait for loader

//   const checkBannerStatus = async () => {
//     // ✅ TEMPORARY demo banner
//     if (SHOW_DUMMY_BANNER) {
//       setBannerImage(TEST_BANNER_IMAGE);
//       setIsBannerOpen(true);
//       return;
//     }


//     // ✅ FUTURE: admin-controlled banner
//     try {
//       const response = await fetch(ADMIN_BANNER_API_URL);

//       if (response.ok) {
//         const data = await response.json();
//         const imageUrl = data?.url || data;

//         if (imageUrl) {
//           setBannerImage(imageUrl);
//           setIsBannerOpen(true);
//         }
//       }
//     } catch (error) {
//       console.warn("Banner API unavailable:", error);
//     }
//   };

//   checkBannerStatus();
// }, [isInitialLoadDone]);


//   // Logic: Show Big Footer ONLY on '/home' and '/tsat'
//   const showBigFooter =
//     location.pathname === "/home" || location.pathname === "/tsat";

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50 relative">
//       {/* --- GLOBAL POPUP BANNER (Z-Index 9999 to cover everything) --- */}
//       <PopupBanner
//         isOpen={isBannerOpen}
//         onClose={() => setIsBannerOpen(false)}
//         imageSrc={bannerImage}
//       />

//       {/* --- HEADER & NAVBAR --- */}
//       <Header />
//       <Navbar />

//       {/* --- MAIN CONTENT --- */}
//       <main className="flex-grow w-full">
//         <Routes>
//           <Route path="/" element={<Navigate to="/home" replace />} />
          
//           {/* Pages */}
//       <Route
//   path="/home"
//   element={<Home onInitialLoadDone={() => setIsInitialLoadDone(true)} />}
// />

//           <Route path="/about" element={<About />} />
//           <Route path="/live" element={<Live />} />
//           <Route path="/tsat" element={<TSAT />} />
//           <Route path="/air" element={<AIR />} />
//           <Route path="/events" element={<Events />} />
//         </Routes>
//       </main>


  
//       <Footer />
//       <BottomBar />
//     </div>
//   );
// };

// // --- COMPONENT: POPUP BANNER ---
// const PopupBanner = ({ isOpen, onClose, imageSrc }) => {
//   return (
//     <AnimatePresence>
//       {isOpen && imageSrc && (
//         <motion.div
//           // Fixed overlay covering the entire screen
//           className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           onClick={onClose} // Clicking background closes it
//         >
//           <motion.div
//             className="relative bg-white p-2 rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col"
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.8, opacity: 0 }}
//             onClick={(e) => e.stopPropagation()} // Clicking inside doesn't close it
//           >
//             {/* Close Button (Top Right) */}
//             <div className="flex justify-end mb-2">
//               <button
//                 onClick={onClose}
//                 className="bg-red-600 hover:bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors font-bold shadow-md"
//                 title="Close Banner"
//               >
//                 ✕
//               </button>
//             </div>

//             {/* Banner Image */}
//             <div className="w-full flex justify-center bg-gray-100 rounded overflow-hidden">
//               <img
//                 src={imageSrc}
//                 alt="Announcement Banner"
//                 className="w-full h-auto object-contain max-h-[80vh]"
//               />
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// // Placeholder Component for routing
// const PageTitle = ({ title }) => (
//   <div className="mt-10 max-w-[1200px] mx-auto p-10 bg-white shadow-md rounded-lg text-center border border-gray-200">
//     <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
//     <p className="text-gray-500 mt-2">Content for {title} goes here.</p>
//   </div>
// );

// export default App;




// import React, { useState, useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
//   useLocation,
// } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";

// // Pages
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Live from "./pages/Live";
// import TSAT from "./pages/TSAT";
// import AIR from "./pages/AIR";
// import Events from "./pages/Events";

// // Components
// import Header from "./components/Header";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import BottomBar from "./components/BottomBar";

// // ✅ Correct API URL (from .env)
// const BANNER_API_URL = `${import.meta.env.VITE_BASE_API}/banner`;

// function App() {
//   return (
//     <Router>
//       <MainLayout />
//     </Router>
//   );
// }

// const MainLayout = () => {
//   const location = useLocation();

//   const [bannerImage, setBannerImage] = useState(null);
//   const [isBannerOpen, setIsBannerOpen] = useState(false);
//   const [isInitialLoadDone, setIsInitialLoadDone] = useState(false);

//   // ✅ Fetch banner ONLY after loader finishes
//   useEffect(() => {
//     if (!isInitialLoadDone) return;

//     const fetchBanner = async () => {
//       try {
//         const response = await fetch(BANNER_API_URL);
//         if (!response.ok) return;

//         const result = await response.json();

//         // ✅ EXACT backend response handling
//         const imageUrl = result?.data?.[0]?.image_url;

//         if (imageUrl) {
//           setBannerImage(imageUrl);
//           setIsBannerOpen(true);
//         }
//       } catch (err) {
//         console.error("Failed to fetch banner", err);
//       }
//     };

//     fetchBanner();
//   }, [isInitialLoadDone]);

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50 relative">
//       {/* Popup Banner */}
//       <PopupBanner
//         isOpen={isBannerOpen}
//         onClose={() => setIsBannerOpen(false)}
//         imageSrc={bannerImage}
//       />

//       <Header />
//       <Navbar />

//       <main className="flex-grow w-full">
//         <Routes>
//           <Route path="/" element={<Navigate to="/home" replace />} />
//           <Route
//             path="/home"
//             element={
//               <Home onInitialLoadDone={() => setIsInitialLoadDone(true)} />
//             }
//           />
//           <Route path="/about" element={<About />} />
//           <Route path="/live" element={<Live />} />
//           <Route path="/tsat" element={<TSAT />} />
//           <Route path="/air" element={<AIR />} />
//           <Route path="/events" element={<Events />} />
//         </Routes>
//       </main>

//       <Footer />
//       <BottomBar />
//     </div>
//   );
// };

// const PopupBanner = ({ isOpen, onClose, imageSrc }) => {
//   return (
//     <AnimatePresence>
//       {isOpen && imageSrc && (
//         <motion.div
//           className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 px-1 py-6"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           onClick={onClose}
//         >
//           <motion.div
//             className="relative bg-white rounded-lg shadow-2xl w-full max-w-3xl"
//             initial={{ scale: 0.9 }}
//             animate={{ scale: 1 }}
//             exit={{ scale: 0.9 }}
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* ✅ Close button */}
//             <button
//               onClick={onClose}
//               className="absolute top-3 right-3 z-50 bg-black/70 text-white rounded-full w-9 h-9 flex items-center justify-center text-lg font-bold hover:bg-black"
//             >
//               ✕
//             </button>

//             {/* ✅ Controlled height container */}
//             <div className="max-h-[80vh] w-full overflow-hidden flex items-center justify-center bg-gray-100 rounded-lg">
//               <img
//                 src={imageSrc}
//                 alt="Popup Banner"
//                 className="max-h-[80vh] max-w-[90vw]  object-contain"
//               />
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default App;


import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Live from "./pages/Live";
import TSAT from "./pages/TSAT";
import AIR from "./pages/AIR";
import Events from "./pages/Events";

// Components
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BottomBar from "./components/BottomBar";

const BANNER_API_URL = `${import.meta.env.VITE_BASE_API}/banner`;

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

const MainLayout = () => {
  // --- STATE MANAGEMENT ---
  // 1. Loader starts TRUE. It only runs on Refresh/First Load.
  //    Since 'App' doesn't unmount on route change, this won't run when switching pages.
  const [isLoading, setIsLoading] = useState(true);

  // 2. Banner State
  const [bannerImage, setBannerImage] = useState(null);
  const [isBannerOpen, setIsBannerOpen] = useState(false);

  // --- LOGIC: INITIAL LOAD & BANNER FETCH ---
  useEffect(() => {
    const initApp = async () => {
      try {
        // Run Banner Fetch and a Minimum Timer in parallel
        // This ensures the loader shows for at least 1.5 seconds so it looks smooth
        const [bannerRes] = await Promise.all([
          fetch(BANNER_API_URL).catch(() => null),
          new Promise((resolve) => setTimeout(resolve, 1500)), // Min wait time
        ]);

        if (bannerRes?.ok) {
          const result = await bannerRes.json();
          const imageUrl = result?.data?.[0]?.image_url;
          if (imageUrl) {
            setBannerImage(imageUrl);
          }
        }
      } catch (err) {
        console.error("App Init Error:", err);
      } finally {
        // 1. Stop Loader
        setIsLoading(false);
        
        // 2. If we found a banner, show it immediately after loader
        // We use a slight delay (100ms) to let the loader fade out first
        setTimeout(() => {
            setBannerImage((prev) => {
                if(prev) setIsBannerOpen(true);
                return prev;
            })
        }, 100);
      }
    };

    initApp();
  }, []); // Empty dependency = Runs once on Refresh/Mount

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 relative">
      
      {/* --- GLOBAL COMPONENTS (Overlay on top of everything) --- */}
      
      {/* 1. Global Loader */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-white"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 border-4 border-cyan-200 border-t-cyan-600 rounded-full animate-spin"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Popup Banner */}
      <PopupBanner
        isOpen={isBannerOpen}
        onClose={() => setIsBannerOpen(false)}
        imageSrc={bannerImage}
      />

      {/* --- MAIN APP STRUCTURE --- */}
      <Header />
      <Navbar />

      <main className="flex-grow w-full">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/live" element={<Live />} />
          <Route path="/tsat" element={<TSAT />} />
          <Route path="/air" element={<AIR />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </main>

      <Footer />
      <BottomBar />
    </div>
  );
};

// --- SUB-COMPONENT: POPUP BANNER ---
const PopupBanner = ({ isOpen, onClose, imageSrc }) => {
  return (
    <AnimatePresence>
      {isOpen && imageSrc && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 px-1 py-6"
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
              className="absolute top-3 right-3 z-50 bg-red-700 text-white rounded-full w-9 h-9 flex items-center justify-center text-lg font-bold hover:bg-black "
            >
              ✕
            </button>

            <div className="max-h-[80vh] w-full overflow-hidden flex items-center justify-center bg-gray-100 rounded-lg">
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

export default App;