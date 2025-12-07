// // Simple placeholder component for pages you haven't built yet
// const PageTitle = ({ title }) => (
//   <div className="mt-10 max-w-[1200px] mx-auto p-10 bg-white shadow-md rounded-lg text-center border border-gray-200">
//     <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
//     <p className="text-gray-500 mt-2">Content for {title} goes here.</p>
//   </div>
// );

// export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// // 1. Import Pages
// import Home from './pages/Home';

// // 2. Import Components
// import Header from "./components/Header";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer"; // <--- ADDED IMPORT

// function App() {
//   return (
//     <Router>
//       {/* Main Container: Flex column ensures vertical stacking */}
//       <div className="flex flex-col min-h-screen bg-gray-50">

//         {/* Header appears first at the very top */}
//         <Header />

//         {/* Navbar appears second, naturally sitting below the Header */}
//         <Navbar />

//         {/* Main Content Area */}
//         <main className="flex-grow w-full">
//           <Routes>
//             {/* Redirect root "/" to "/home" */}
//             <Route path="/" element={<Navigate to="/home" replace />} />

//             {/* 3. Use the actual Home component here */}
//             <Route path="/home" element={<Home />} />

//             {/* Placeholders for other pages */}
//             <Route path="/about" element={<PageTitle title="About Us" />} />
//             <Route path="/live" element={<PageTitle title="Live Streaming" />} />
//             <Route path="/youtube" element={<PageTitle title="Youtube (EMR&RC)" />} />
//             <Route path="/webradio" element={<PageTitle title="Web Radio" />} />
//             <Route path="/vidyagani" element={<PageTitle title="Vidyagani" />} />
//             <Route path="/tsat" element={<PageTitle title="T-SAT Vidya/Nipuna" />} />
//             <Route path="/air" element={<PageTitle title="All India Radio (AIR)" />} />
//             <Route path="/events" element={<PageTitle title="BRAOU Events" />} />
//           </Routes>
//         </main>

//         {/* --- FOOTER ADDED HERE --- */}
//         <Footer />

//       </div>
//     </Router>
//   );
// }

// // Simple placeholder component for pages you haven't built yet
// const PageTitle = ({ title }) => (
//   <div className="mt-10 max-w-[1200px] mx-auto p-10 bg-white shadow-md rounded-lg text-center border border-gray-200">
//     <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
//     <p className="text-gray-500 mt-2">Content for {title} goes here.</p>
//   </div>
// );

// export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// // Pages
// import Home from './pages/Home';

// // Components
// import Header from "./components/Header";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";     // The big footer
// import BottomBar from "./components/BottomBar"; // The copyright bar

// function App() {
//   return (
//     <Router>
//       <MainLayout />
//     </Router>
//   );
// }

// // We need a separate component here to use the 'useLocation' hook
// const MainLayout = () => {
//   const location = useLocation();

//   // LOGIC: Show Big Footer ONLY on '/home' and '/tsat'
//   const showBigFooter = location.pathname === '/home' || location.pathname === '/tsat';

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">

//       {/* Fixed Header & Navbar */}
//       <Header />
//       <Navbar />

//       {/* Main Content Area */}
//       <main className="flex-grow w-full">
//         <Routes>
//           <Route path="/" element={<Navigate to="/home" replace />} />

//           {/* Real Pages */}
//           <Route path="/home" element={<Home />} />

//           {/* Placeholder Pages (You will replace these with real components later) */}
//           <Route path="/about" element={<PageTitle title="About Us" />} />
//           <Route path="/live" element={<PageTitle title="Live Streaming" />} />
//           <Route path="/youtube" element={<PageTitle title="Youtube (EMR&RC)" />} />
//           <Route path="/webradio" element={<PageTitle title="Web Radio" />} />
//           <Route path="/vidyagani" element={<PageTitle title="Vidyagani" />} />
//           <Route path="/tsat" element={<PageTitle title="T-SAT Vidya/Nipuna" />} />
//           <Route path="/air" element={<PageTitle title="All India Radio (AIR)" />} />
//           <Route path="/events" element={<PageTitle title="BRAOU Events" />} />
//         </Routes>
//       </main>

//       {/* CONDITIONAL: Big Footer (Only Home & TSAT) */}
//       {showBigFooter && <Footer />}

//       {/* UNCONDITIONAL: Bottom Bar (All Pages) */}
//       <BottomBar />

//     </div>
//   );
// };

// // Placeholder Component for pages you haven't built yet
// const PageTitle = ({ title }) => (
//   <div className="mt-10 max-w-[1200px] mx-auto p-10 bg-white shadow-md rounded-lg text-center border border-gray-200">
//     <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
//     <p className="text-gray-500 mt-2">Content for {title} goes here.</p>
//   </div>
// );

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

// --- PAGES ---
import Home from "./pages/Home";

// --- COMPONENTS ---
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BottomBar from "./components/BottomBar";
import About from "./pages/About";
import Live from "./pages/Live";
import TSAT from "./pages/TSAT";
import AIR from "./pages/AIR";
import Events from "./pages/Events";

// ============================================================================
// CONFIGURATION
// ============================================================================
const ADMIN_BANNER_API_URL = "http://localhost:5000/api/popup-banner";

// FOR TESTING ONLY: Use this image if the API is not ready yet
const TEST_BANNER_IMAGE =
  "https://placehold.co/800x600/004B52/ffffff/png?text=Welcome+to+BRAOU+Admission+Open";

const SHOW_DUMMY_BANNER = true;

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

// Separate component to allow usage of 'useLocation' hook
const MainLayout = () => {
  const location = useLocation();

  // STATE: Banner Logic
  const [bannerImage, setBannerImage] = useState(null);
  const [isBannerOpen, setIsBannerOpen] = useState(false);
  const [isInitialLoadDone, setIsInitialLoadDone] = useState(false);


  // EFFECT: Check for Banner on App Load
  
// useEffect(() => {
//   const checkBannerStatus = async () => {
//     try {
//       const response = await fetch(ADMIN_BANNER_API_URL);

//       if (response.ok) {
//         const data = await response.json();
//         const imageUrl = data.url || data;

//         if (imageUrl) {
//           setBannerImage(imageUrl);
//           setIsBannerOpen(true);
//         }
//       }
//     } catch (error) {
//       console.warn("Banner API unavailable:", error);

//   // ✅ Show test banner ONLY when explicitly enabled
//   if (import.meta.env.VITE_USE_TEST_BANNER === "true") {
//     setBannerImage(TEST_BANNER_IMAGE);
//     setIsBannerOpen(true);
//   }
//     }
//   };

//   checkBannerStatus();
// }, []);

useEffect(() => {
  if (!isInitialLoadDone) return; // ⛔ wait for loader

  const checkBannerStatus = async () => {
    // ✅ TEMPORARY demo banner
    if (SHOW_DUMMY_BANNER) {
      setBannerImage(TEST_BANNER_IMAGE);
      setIsBannerOpen(true);
      return;
    }


    // ✅ FUTURE: admin-controlled banner
    try {
      const response = await fetch(ADMIN_BANNER_API_URL);

      if (response.ok) {
        const data = await response.json();
        const imageUrl = data?.url || data;

        if (imageUrl) {
          setBannerImage(imageUrl);
          setIsBannerOpen(true);
        }
      }
    } catch (error) {
      console.warn("Banner API unavailable:", error);
    }
  };

  checkBannerStatus();
}, [isInitialLoadDone]);


  // Logic: Show Big Footer ONLY on '/home' and '/tsat'
  const showBigFooter =
    location.pathname === "/home" || location.pathname === "/tsat";

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 relative">
      {/* --- GLOBAL POPUP BANNER (Z-Index 9999 to cover everything) --- */}
      <PopupBanner
        isOpen={isBannerOpen}
        onClose={() => setIsBannerOpen(false)}
        imageSrc={bannerImage}
      />

      {/* --- HEADER & NAVBAR --- */}
      <Header />
      <Navbar />

      {/* --- MAIN CONTENT --- */}
      <main className="flex-grow w-full">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          
          {/* Pages */}
      <Route
  path="/home"
  element={<Home onInitialLoadDone={() => setIsInitialLoadDone(true)} />}
/>

          <Route path="/about" element={<About />} />
          <Route path="/live" element={<Live />} />
          {/* <Route path="/youtube" element={<Youtube />} />
          <Route path="/webradio" element={<WebRadio />} />
          <Route path="/vidyagani" element={<Vidyagani />} /> */}
          <Route path="/tsat" element={<TSAT />} />
          <Route path="/air" element={<AIR />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </main>


      

      {/* --- FOOTER LOGIC --- */}
      {/* {showBigFooter && <Footer />} */}
      <Footer />
      <BottomBar />
    </div>
  );
};

// --- COMPONENT: POPUP BANNER ---
const PopupBanner = ({ isOpen, onClose, imageSrc }) => {
  return (
    <AnimatePresence>
      {isOpen && imageSrc && (
        <motion.div
          // Fixed overlay covering the entire screen
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} // Clicking background closes it
        >
          <motion.div
            className="relative bg-white p-2 rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()} // Clicking inside doesn't close it
          >
            {/* Close Button (Top Right) */}
            <div className="flex justify-end mb-2">
              <button
                onClick={onClose}
                className="bg-red-600 hover:bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors font-bold shadow-md"
                title="Close Banner"
              >
                ✕
              </button>
            </div>

            {/* Banner Image */}
            <div className="w-full flex justify-center bg-gray-100 rounded overflow-hidden">
              <img
                src={imageSrc}
                alt="Announcement Banner"
                className="w-full h-auto object-contain max-h-[80vh]"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Placeholder Component for routing
const PageTitle = ({ title }) => (
  <div className="mt-10 max-w-[1200px] mx-auto p-10 bg-white shadow-md rounded-lg text-center border border-gray-200">
    <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
    <p className="text-gray-500 mt-2">Content for {title} goes here.</p>
  </div>
);

export default App;
