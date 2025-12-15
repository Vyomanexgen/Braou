import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// You can use lucide-react or just text if you don't have the library
// import { WifiOff } from "lucide-react"; 

const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="fixed top-0 left-0 w-full z-[100000] bg-red-600 text-white shadow-xl"
        >
          <div className="flex items-center justify-center gap-2 py-3 px-4 font-bold text-sm md:text-base">
            {/* Icon (SVG Fallback if no library) */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" height="24" 
              viewBox="0 0 24 24" fill="none" 
              stroke="currentColor" strokeWidth="2" 
              strokeLinecap="round" strokeLinejoin="round"
              className="animate-pulse"
            >
              <line x1="1" y1="1" x2="23" y2="23"></line>
              <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path>
              <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path>
              <path d="M10.71 5.05A16 16 0 0 1 22.58 9"></path>
              <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"></path>
              <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
              <line x1="12" y1="20" x2="12.01" y2="20"></line>
            </svg>
            <span>No Internet Connection. Please check your network.</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NetworkStatus;