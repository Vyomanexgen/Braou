// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// // =========================================
// // DATA
// // =========================================

// const sliderImages = [
//   "https://placehold.co/1920x543/000000/ffffff?text=Slide+1+(1920x543)",
//   "https://placehold.co/1920x543/004d4d/ffffff?text=Slide+2+Educational+Broadcasting",
//   "https://placehold.co/1920x543/00aaaa/ffffff?text=Slide+3+EMR%26RC+Events",
//   "https://placehold.co/1920x543/000000/ffffff?text=Slide+4+Student+Resources",
//   "https://placehold.co/1920x543/004d4d/ffffff?text=Slide+5+Research+Initiatives",
//   "https://placehold.co/1920x543/00aaaa/ffffff?text=Slide+6+Community+Outreach",
// ];

// const tickerNews = [
//   "Admission notifications for 2024 are now open",
//   "New video lectures added to Vidyagani portal",
//   "Live T-SAT schedule updated for this week",
//   "Workshop on digital media resources scheduled for next Monday",
//   "Check out the latest podcast on Web Radio"
// ];


// // =========================================
// // COMPONENT: Home Page
// // =========================================
// const Home = () => {
//   return (
//     // Background: Gradient mixing White and Light Blue
//     <main className="w-full flex flex-col bg-gradient-to-b from-white via-cyan-50 to-cyan-200 min-h-screen">
      
//       {/* Section 1: Hero Image Slider */}
//       <HeroSlider />

//       {/* Section 2: Static Welcome Text */}
//       <section className="w-full py-8 md:py-12 px-4 text-center">
//         <div className="max-w-[1400px] mx-auto">
//           <h1 className="text-2xl md:text-4xl font-[900] uppercase tracking-tight mb-4 text-slate-900 drop-shadow-sm">
//             Welcome To EMR&RC - Educational Broadcasting
//           </h1>
//         </div>
//       </section>

//       {/* Section 3: Ticker with Bullet Points */}
//       <NewsTicker />

//       {/* Section 4: Content Placeholder */}
//       <section className="min-h-[400px] p-8 text-center text-slate-500 font-medium">
//         (More Homepage Content Goes Here)
//       </section>
//     </main>
//   );
// };


// // =========================================
// // SUB-COMPONENT: Hero Image Slider
// // =========================================
// const HeroSlider = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const timeoutRef = useRef(null);

//   const resetTimeout = () => {
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }
//   };

//   useEffect(() => {
//     resetTimeout();
//     timeoutRef.current = setTimeout(() => {
//         setCurrentIndex((prevIndex) =>
//           prevIndex === sliderImages.length - 1 ? 0 : prevIndex + 1
//         );
//     }, 5000);

//     return () => resetTimeout();
//   }, [currentIndex]);

//   const slideVariants = {
//     hidden: { opacity: 0 },
//     visible: { 
//         opacity: 1,
//         transition: { duration: 1.5, ease: "easeInOut" }
//     },
//     exit: {
//         opacity: 0,
//         transition: { duration: 1.5, ease: "easeInOut" }
//     }
//   };

//   return (
//     <div className="relative w-full h-[250px] sm:h-[400px] md:h-[500px] lg:h-auto lg:aspect-[1920/543] bg-black overflow-hidden z-10 shadow-lg">
//       <AnimatePresence initial={false} mode='wait'>
//         <motion.img
//           key={currentIndex}
//           src={sliderImages[currentIndex]}
//           alt={`Slide ${currentIndex + 1}`}
//           variants={slideVariants}
//           initial="hidden"
//           animate="visible"
//           exit="exit"
//           className="absolute inset-0 w-full h-full object-cover"
//         />
//       </AnimatePresence>

//        {/* Dots Indicator */}
//        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
//         {sliderImages.map((_, index) => (
//           <div
//             key={index}
//             className={`h-2 w-2 lg:h-3 lg:w-3 rounded-full transition-all duration-300 cursor-pointer ${
//               index === currentIndex ? "bg-cyan-400 w-6 lg:w-8" : "bg-white/50 hover:bg-white"
//             }`}
//             onClick={() => setCurrentIndex(index)} 
//           />
//         ))}
//       </div>
//     </div>
//   );
// };


// // =========================================
// // SUB-COMPONENT: News Ticker
// // =========================================
// const NewsTicker = () => {
//   // SEPARATOR: Using a large Bullet Point (•) with extra spaces
//   const separator = "   \u2022   "; 
//   const newsString = tickerNews.join(separator) + separator;
  
//   const duplicatedContent = (
//     <>
//       <span className="mr-4">{newsString}</span>
//       <span className="mr-4">{newsString}</span>
//     </>
//   );

//   return (
//     <div className="w-full overflow-hidden py-4 relative z-20 bg-gradient-to-r from-transparent via-cyan-100/30 to-transparent border-y border-cyan-100/50 backdrop-blur-sm">
//       <motion.div
//         className="whitespace-nowrap flex items-center text-slate-800 font-bold text-sm md:text-base tracking-wider uppercase"
//         animate={{ x: ["0%", "-50%"] }}
//         transition={{
//           x: {
//             repeat: Infinity,
//             repeatType: "loop",
//             duration: 20, 
//             ease: "linear",
//           },
//         }}
//       >
//         {duplicatedContent}
//       </motion.div>
//     </div>
//   );
// };

// export default Home;


// VERSION 2 - WITH INFOGRAPHIC SECTION AND MODAL POPUPS

// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { title } from 'framer-motion/client';
// // import { FiX } from 'react-icons/fi'; // Optional

// // =========================================
// // DATA: Slider & Ticker
// // =========================================

// const sliderImages = [
//   "https://placehold.co/1920x543/000000/ffffff?text=Slide+1+(1920x543)",
//   "https://placehold.co/1920x543/004d4d/ffffff?text=Slide+2+Educational+Broadcasting",
//   "https://placehold.co/1920x543/00aaaa/ffffff?text=Slide+3+EMR%26RC+Events",
//   "https://placehold.co/1920x543/000000/ffffff?text=Slide+4+Student+Resources",
//   "https://placehold.co/1920x543/004d4d/ffffff?text=Slide+5+Research+Initiatives",
//   "https://placehold.co/1920x543/00aaaa/ffffff?text=Slide+6+Community+Outreach",
// ];

// const tickerNews = [
//   "Admission notifications for 2024 are now open",
//   "New video lectures added to Vidyagani portal",
//   "Live T-SAT schedule updated for this week"
// ];

// // =========================================
// // DATA: Infographic Content (Separated Layouts)
// // =========================================
// const infoServices = [
//   {
//     id: 1,
//     title: "LIVE",
//     shortDesc: "BRAOU conducts interactive live tele-conference programs...",
//     fullDesc: "BRAOU conducts interactive live tele-conference programs every Thursday from 2-3 PM on different subjects. They are broadcast on the BRAOU YouTube channel and T-SAT NIPUNA.",
//     mobileColor: "bg-[#22b9d3]", 
//     layout: {
//       top: "15%",
//       left: "23%",
//       width: "18%",
//       height: "14%"
//     }
//   },
//   {
//     id: 2,
//     title: "Vidyagani",
//     shortDesc: "Vidyagani is Dr. B. R. Ambedkar Open University's digital portal...",
//     fullDesc: "Vidyagani (vidyagani.braou.ac.in) is Dr. B. R. Ambedkar Open University's digital learning portal. It provides students with audio lessons, video lectures, and other digital resources.",
//     mobileColor: "bg-[#fca51f]",
//     titleWidth: "100%",
//     titleSize: "clamp(15px,1.9vw,20px)",
//     titleHeight: "10%",
//     layout: {
//       top: "15%",
//       right: "14%",
//       width: "18%",
//       height: "13%"
//     }
//   },
//   {
//     id: 3,
//     title: "Youtube",
//     shortDesc: "Detailed information on BRAOU's courses, programs, and degrees...",
//     fullDesc: "Detailed information on BRAOU's courses, programs, and degree offerings. Step-by-step guides on admissions, exam preparations, and assignments are available on our channel.",
//     mobileColor: "bg-[#56a877]", 
//     layout: {
//       top: "41%",
//       left: "11%",
//       width: "15%",
//       height: "15%"
//     }
//   },
//   {
//     id: 4,
//     title: "T-SAT Vidya/Nipuna",
//     shortDesc: "T-SAT telecasts video ",
//     fullDesc: "T-SAT telecasts video lessons produced by the EMRRC through its two channels, Vidya and Nipuna, from Monday to Saturday. T-SAT Vidya broadcasts lessons from 1:00-2:00 PM.",
//     mobileColor: "bg-[#f25c34]", 
//     layout: {
//       top: "42%",
//       right: "1%",
//       width: "26%",
//       height: "15%"
//     }
//   },
//   {
//     id: 5,
//     title: "AIR",
//     shortDesc: "Audio lessons are broadcast on All India Radio according to schedule",
//     fullDesc: "Audio lessons are broadcast on All India Radio (A.I.R.) according to scheduled time slots. A.I.R. Hyderabad A (HYD A) broadcasts these lessons daily from 6:25 PM to 6:40 PM.",
//     mobileColor: "bg-[#2d5aa8]", 
//     layout: {
//   bottom: "19%",
//   left: "20%",
//   width: "19%",
//   height: "14%"
// }

//   },
//   {
//     id: 6,
//     title: "Web Radio",
//     shortDesc: "Welcome to Web Radio. Your hub for live radio lessons and updates...",
//     fullDesc: "Welcome to [HiBraou] Web Radio. Your hub for live radio lessons, real-time university updates, program schedules, health tips, and engaging live podcasts. Stay informed.",
//     mobileColor: "bg-[#3e4a59]", 
//    layout: {
//   bottom: "15%",
//   right: "16%",
//   width: "23%",
//   height: "14%"
// }

//   }
// ];
// // Centering the short description for ID 1
// infoServices[0].shortDesc = (
//   <div className="text-center">{infoServices[0].shortDesc}</div>
// );

// // Centering the short description for ID 4
// infoServices[3].shortDesc = (
//   <div className="text-center">{infoServices[3].shortDesc}</div>
// );

// // Control for left and right adjustment
// const adjustPosition = (id, direction) => {
//   const item = infoServices.find(service => service.id === id);
//   if (item) {
//     item.layout.left = direction === 'left' ? `${parseFloat(item.layout.left) - 5}%` : `${parseFloat(item.layout.left) + 5}%`;
//   }
// };


// // =========================================
// // COMPONENT: Home Page
// // =========================================
// const Home = () => {
//   return (
//     <main className="w-full flex flex-col bg-gradient-to-b from-white via-cyan-50 to-cyan-200 min-h-screen">
      
//       {/* 1. Hero Image Slider */}
//       <HeroSlider />

//       {/* 2. Static Welcome Text */}
//       <section className="w-full py-6 md:py-10 px-4 text-center">
//         <div className="max-w-[1600px] mx-auto">
//           <h1 className="font-[900] font-['Arial'] uppercase tracking-wide mb-2 text-slate-900 leading-tight
//                          text-[clamp(18px,4vw,36px)]">
//             Welcome To EMR&RC - Educational Broadcasting
//           </h1>
//         </div>
//       </section>

//       {/* 3. Ticker */}
//       <NewsTicker />

//       {/* 4. Infographic Section (Updated) */}
//       <InfographicSection />

//       {/* 5. Footer Content Placeholder */}
//       <section className="min-h-[100px] p-8 text-center text-slate-500 font-medium font-['Arial']">
//         (More Homepage Content Goes Here)
//       </section>
//     </main>
//   );
// };


// // =========================================
// // SUB-COMPONENT: Hero Image Slider
// // =========================================
// const HeroSlider = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const timeoutRef = useRef(null);

//   const resetTimeout = () => {
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }
//   };

//   useEffect(() => {
//     resetTimeout();
//     timeoutRef.current = setTimeout(() => {
//         setCurrentIndex((prevIndex) =>
//           prevIndex === sliderImages.length - 1 ? 0 : prevIndex + 1
//         );
//     }, 5000);

//     return () => resetTimeout();
//   }, [currentIndex]);

//   const slideVariants = {
//     hidden: { opacity: 0 },
//     visible: { 
//         opacity: 1,
//         transition: { duration: 1.5, ease: "easeInOut" }
//     },
//     exit: {
//         opacity: 0,
//         transition: { duration: 1.5, ease: "easeInOut" }
//     }
//   };

//   return (
//     <div className="relative w-full min-h-[220px] md:min-h-0 md:aspect-[1920/543] bg-black overflow-hidden z-10 shadow-lg">
//       <AnimatePresence initial={false} mode='wait'>
//         <motion.img
//           key={currentIndex}
//           src={sliderImages[currentIndex]}
//           alt={`Slide ${currentIndex + 1}`}
//           variants={slideVariants}
//           initial="hidden"
//           animate="visible"
//           exit="exit"
//           className="absolute inset-0 w-full h-full object-cover object-center"
//         />
//       </AnimatePresence>

//        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
//         {sliderImages.map((_, index) => (
//           <div
//             key={index}
//             className={`h-2 w-2 lg:h-3 lg:w-3 rounded-full transition-all duration-300 cursor-pointer ${
//               index === currentIndex ? "bg-cyan-400 w-6 lg:w-8" : "bg-white/50 hover:bg-white"
//             }`}
//             onClick={() => setCurrentIndex(index)} 
//           />
//         ))}
//       </div>
//     </div>
//   );
// };


// // =========================================
// // SUB-COMPONENT: News Ticker
// // =========================================
// const NewsTicker = () => {
//   const separator = "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"; 
//   const newsString = tickerNews.join(separator) + separator;
  
//   const duplicatedContent = (
//     <>
//       <span className="mr-20">{newsString}</span>
//       <span className="mr-20">{newsString}</span>
//     </>
//   );

//   return (
//     <div className="w-full overflow-hidden py-3 relative z-20 bg-gradient-to-r from-transparent via-cyan-100/30 to-transparent border-y border-cyan-100/50 backdrop-blur-sm">
//       <motion.div
//         className="whitespace-nowrap flex items-center text-slate-800 font-extrabold font-['Arial'] text-sm md:text-base tracking-wide uppercase"
//         animate={{ x: ["0%", "-50%"] }}
//         transition={{
//           x: {
//             repeat: Infinity,
//             repeatType: "loop",
//             duration: 25,
//             ease: "linear",
//           },
//         }}
//       >
//         {duplicatedContent}
//       </motion.div>
//     </div>
//   );
// };


// // =========================================
// // SUB-COMPONENT: Infographic Section (UPDATED)
// // =========================================
// // =========================================
// // SUB-COMPONENT: Infographic Section (FINAL VERSION)
// // =========================================
// const InfographicSection = () => {
//   const [selectedFeature, setSelectedFeature] = useState(null);

//   return (
//     <section className="w-full py-6 md:py-10 px-2 md:px-4 relative z-30">
//       <div className="max-w-[1200px] mx-auto relative w-full">

//         {/* ---- MAIN PNG IMAGE ---- */}
//         <img
//           src="/pictures/HOME INFO_edit.png"
//           alt="Services Infographic"
//           className="w-full h-auto object-contain select-none"
//         />

//         {/* ---- TEXT OVERLAYS ---- */}
//         {infoServices.map((item) => (
//           <div
//             key={item.id}
//             style={{
//               top: item.layout.top,
//               bottom: item.layout.bottom,
//               left: item.layout.left,
//               right: item.layout.right,
//               width: item.layout.width,
//               height: item.layout.height,
//             }}
//             className="absolute"
//           >

//             {/* ---------- TITLE BLOCK ---------- */}
//             <div className="absolute top-10 left-18 w-full h-[10%] flex items-start px-1 md:px-2">
//               <h3
//                 className="text-white font-[900] uppercase tracking-tighter 
//                            text-[clamp(5px,1.4vw,18px)] leading-none drop-shadow-md"
//               >
//                 {item.title}
//               </h3>
//             </div>

//             {/* ---------- DESCRIPTION BLOCK ---------- */}
//             <div className="absolute bottom-2 left-3 w-full h-[50%] flex flex-col justify-center px-1 md:px-2">
//               <p
//                 className="text-white font-bold 
//                            text-[clamp(4px,0.9vw,12px)] leading-[1.1] 
//                            line-clamp-2 md:line-clamp-3 drop-shadow-sm"
//               >
//                 {item.shortDesc}
//               </p>

//               <button
//                 onClick={() => setSelectedFeature(item)}
//                 className="mt-[2px] text-white font-[900] uppercase underline cursor-pointer 
//                            text-[clamp(4px,0.8vw,11px)] hover:text-cyan-200 drop-shadow-md"
//               >
//                 Know More
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ---- POPUP MODAL ---- */}
//       <AnimatePresence>
//         {selectedFeature && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
//             onClick={() => setSelectedFeature(null)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0, y: 20 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.9, opacity: 0, y: 20 }}
//               className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className={`${selectedFeature.mobileColor} p-4 flex justify-between items-center`}>
//                 <h3 className="text-xl font-black text-white uppercase tracking-wide">
//                   {selectedFeature.title}
//                 </h3>

//                 <button
//                   onClick={() => setSelectedFeature(null)}
//                   className="text-white/80 hover:text-white transition-colors bg-white/20 rounded-full
//                              p-1 w-8 h-8 flex items-center justify-center font-bold"
//                 >
//                   X
//                 </button>
//               </div>

//               <div className="p-8">
//                 <p className="text-slate-700 text-lg leading-relaxed font-medium">
//                   {selectedFeature.fullDesc}
//                 </p>

//                 <div className="mt-8 flex justify-end">
//                   <button
//                     onClick={() => setSelectedFeature(null)}
//                     className="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 
//                                font-bold rounded-lg transition-colors"
//                   >
//                     Close
//                   </button>
//                 </div>
//               </div>

//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// };


// export default Home;



import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ============================================================================
// DATA: Slider Images
// ============================================================================
const sliderImages = [
  "https://placehold.co/1920x543/000000/ffffff?text=Slide+1+(1920x543)",
  "https://placehold.co/1920x543/004d4d/ffffff?text=Slide+2+Educational+Broadcasting",
  "https://placehold.co/1920x543/00aaaa/ffffff?text=Slide+3+EMR%26RC+Events",
  "https://placehold.co/1920x543/000000/ffffff?text=Slide+4+Student+Resources",
  "https://placehold.co/1920x543/004d4d/ffffff?text=Slide+5+Research+Initiatives",
  "https://placehold.co/1920x543/00aaaa/ffffff?text=Slide+6+Community+Outreach",
];

// ============================================================================
// DATA: News Ticker
// ============================================================================
const tickerNews = [
  "Admission notifications for 2024 are now open",
  "New video lectures added to Vidyagani portal",
  "Live T-SAT schedule updated for this week",
];

// ============================================================================
// DATA: Infographic Cards (FINAL COORDINATES)
// ============================================================================
const infoServices = [
  {
    id: 1,
    title: "LIVE",
    shortDesc: "BRAOU conducts interactive live tele-conference programs",
    fullDesc:
      "BRAOU conducts interactive live tele-conference programs every Thursday from 2–3 PM.",
    mobileColor: "bg-[#22b9d3]",
    layout: { top: "18%", left: "22%", width: "22%", height: "11%" },
  },
  {
    id: 2,
    title: "Vidyagani",
    shortDesc:
      "Vidyagani is Dr. B. R. Ambedkar Open University's digital portal",
    fullDesc:
      "Vidyagani provides access to digital learning materials, audio, and video lessons.",
    mobileColor: "bg-[#fca51f]",
    layout: { top: "17%", right: "11%", width: "23%", height: "11%" },
  },
  {
    id: 3,
    title: "Youtube",
    shortDesc:
      "Detailed information on BRAOU's courses, programs, and degrees",
    fullDesc:
      "The YouTube channel offers detailed guides on courses, admissions, and exam prep.",
    mobileColor: "bg-[#56a877]",
    layout: { top: "43%", left: "10%", width: "21%", height: "11%" },
  },
  {
    id: 4,
    title: "T-SAT (Vidya/Nipuna)",
    shortDesc:
      "T-SAT telecasts video lessons produced by the EMRRC...",
    fullDesc:
      "T-SAT Vidya and Nipuna broadcast educational video lessons Monday–Saturday.",
    mobileColor: "bg-[#f25c34]",
    layout: { top: "43%", right: "2%", width: "20%", height: "14%" },
  },
  {
    id: 5,
    title: "AIR",
    shortDesc:
      "Audio lessons are broadcast on All India Radio according",
    fullDesc:
      "Daily audio lessons are aired on AIR Hyderabad A from 6:25 PM to 6:40 PM.",
    mobileColor: "bg-[#2d5aa8]",
    layout: {
  bottom: "20%",
  left: "20%",
  width: "19%",
  height: "11%"
}
  },
  {
    id: 6,
    title: "Web Radio",
    shortDesc:
      "Welcome to Web Radio. Your hub for live radio lessons",
    fullDesc:
      "Web Radio provides real-time updates, schedules, podcasts, and learning tips.",
    mobileColor: "bg-[#3e4a59]",
    layout: {
  bottom: "20%",
  right: "12%",
  width: "19%",
  height: "11%"
}
  },
];

// ============================================================================
// MAIN HOME COMPONENT
// ============================================================================
const Home = () => {
  return (
   <main
  className="w-full flex flex-col min-h-screen bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: "url('/pictures/website BG Final.jpg')",
  }}
>

      <HeroSlider />

      <section className="w-full py-6 md:py-10 px-4 text-center">
        <h1 className="font-black uppercase tracking-wide text-slate-900 text-[clamp(18px,4vw,36px)]">
          Welcome To EMR&RC - Educational Broadcasting
        </h1>
      </section>

      <NewsTicker />
      <InfographicSection />

   
    </main>
  );
};

// ============================================================================
// SLIDER
// ============================================================================
const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) =>
        prev === sliderImages.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex]);

  return (
    <div className="relative w-full aspect-[1920/543] overflow-hidden shadow-lg">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={sliderImages[currentIndex]}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
        />
      </AnimatePresence>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {sliderImages.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-3 w-3 rounded-full cursor-pointer transition-all ${
              currentIndex === i ? "bg-cyan-400 w-8" : "bg-white/50"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// NEWS TICKER
// ============================================================================
const NewsTicker = () => {
  const separator = "        ";
  const newsString = tickerNews.join(separator) + separator;

  return (
    <div className="w-full overflow-hidden py-3 border-y bg-cyan-50/40">
      <motion.div
        className="whitespace-nowrap font-extrabold uppercase text-slate-800"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <span className="mr-20">{newsString}</span>
        <span className="mr-20">{newsString}</span>
      </motion.div>
    </div>
  );
};

// ============================================================================
// INFOGRAPHIC SECTION (FINAL WORKING VERSION)
// ============================================================================
const InfographicSection = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);

  return (
    <section className="w-full py-8 px-2 relative">
      <div className="max-w-[1200px] mx-auto relative">
        <img
          src="/pictures/HOME INFO_edit.png"
          className="w-full object-contain select-none"
          alt="infographic"
        />

        {infoServices.map((item) => (
          <div
            key={item.id}
            style={item.layout}
            className="absolute overflow-hidden"
          >
            {/* TITLE */}
            <div className="absolute top-[10%] left-[12%] w-[75%]">
              <h3 className="text-white font-black uppercase text-[clamp(10px,1.5vw,20px)] leading-tight drop-shadow-md">
                {item.title}
              </h3>
            </div>

            {/* SHORT DESC */}
            <div className="absolute bottom-[12%] left-[12%] w-[75%]">
              <p className="text-white font-semibold text-[clamp(7px,1vw,13px)] leading-tight drop-shadow-sm line-clamp-2">
                {item.shortDesc}
              </p>

              <button
                onClick={() => setSelectedFeature(item)}
                className="text-white underline font-bold uppercase text-[clamp(7px,1vw,12px)] mt-1"
              >
                Know More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedFeature && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedFeature(null)}
          >
            <motion.div
              className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={`${selectedFeature.mobileColor} p-4 flex justify-between items-center`}
              >
                <h3 className="text-xl font-black text-white uppercase">
                  {selectedFeature.title}
                </h3>
                <button
                  onClick={() => setSelectedFeature(null)}
                  className="text-white bg-white/20 rounded-full w-8 h-8 flex items-center justify-center"
                >
                  X
                </button>
              </div>

              <div className="p-8">
                <p className="text-slate-700 text-lg leading-relaxed">
                  {selectedFeature.fullDesc}
                </p>
                <div className="mt-6 text-right">
                  <button
                    onClick={() => setSelectedFeature(null)}
                    className="px-5 py-2 bg-slate-200 rounded-lg font-bold hover:bg-slate-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Home;
