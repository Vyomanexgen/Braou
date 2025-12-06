import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/home' },
    { name: 'About', path: '/about' },
    { name: 'Live', path: '/live' },
    { name: 'Youtube (EMR&RC)', path: '/youtube' },
    { name: 'Web Radio', path: '/webradio' },
    { name: 'Vidyagani', path: '/vidyagani' },
    { name: 'T-SAT Vidya/Nipuna', path: '/tsat' },
    { name: 'AIR', path: '/air' },
    { name: 'BRAOU Events', path: '/events' },
  ];

  const isActive = (path) => location.pathname === path;

  // Animation for the side drawer
  const sidebarVariants = {
    closed: { x: "-100%", opacity: 0 },
    open: { 
      x: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  };

  const itemVariants = {
    closed: { x: -20, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  return (
    <>
      {/* --- MAIN NAVBAR --- */}
      {/* 1. relative: Ensures it sits AFTER the Header in the flow (doesn't overlap top).
         2. h-20: Keeps the height you liked.
         3. Gradient: Black -> Deep Teal -> Cyan/Aqua.
      */}
      <nav className="w-full h-20 bg-gradient-to-r from-black via-[#004d4d] to-[#00ffff] shadow-lg z-40 relative flex items-center">
        
        {/* Container */}
        <div className="w-full max-w-[1600px] mx-auto px-4 flex items-center justify-between">

          {/* --- HAMBURGER (Left Side - Mobile Only) --- */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(true)}
              className="text-white hover:text-cyan-300 focus:outline-none transition-colors p-2"
            >
              <svg className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* --- DESKTOP MENU (Right/Center Side) --- */}
          {/* UPDATED ALIGNMENT:
             - justify-center: Moves items away from the far right edge, shifting them "slightly left".
             - space-x-2: Controls gap between items.
          */}
          <div className="hidden lg:flex w-full items-center justify-center xl:justify-end xl:pr-20 space-x-1 xl:space-x-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`
                  px-5 py-2 rounded-full text-sm font-bold transition-all duration-300
                  ${isActive(item.path) 
                    ? 'bg-cyan-500 text-white shadow-md scale-105' // UPDATED: text-white instead of text-black
                    : 'text-gray-200 hover:text-white hover:bg-white/10' // Standard hover effect
                  }
                `}
              >
                <span className="whitespace-nowrap">{item.name}</span>
              </Link>
            ))}
          </div>

        </div>
      </nav>

      {/* --- MOBILE DRAWER (Left to Right) --- */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
            />

            {/* Sidebar Content */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
              className="fixed top-0 left-0 h-full w-[80%] max-w-[320px] bg-gradient-to-b from-gray-900 to-black z-[70] lg:hidden shadow-2xl border-r border-gray-800 overflow-y-auto"
            >
              <div className="p-6 flex flex-col h-full">
                
                {/* Header of Drawer */}
                <div className="flex justify-between items-center mb-8 border-b border-gray-700 pb-4">
                  <span className="text-xl font-bold text-white tracking-wider">MENU</span>
                  <button 
                    onClick={() => setIsOpen(false)} 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* List Items */}
                <div className="flex flex-col space-y-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      variants={itemVariants}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`
                          block px-4 py-4 text-lg font-medium border-b border-gray-800/50 transition-all duration-200
                          ${isActive(item.path) 
                            ? 'text-cyan-400 border-l-4 border-l-cyan-400 bg-white/5 pl-3' 
                            : 'text-gray-300 hover:text-white hover:pl-6'
                          }
                        `}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-auto pt-8 text-center text-gray-500 text-xs">
                  © Dr.B.R. Ambedkar Open University
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;