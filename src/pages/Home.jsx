// versiom 2n
// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// const ADMIN_SLIDER_API_URL = `${import.meta.env.VITE_BASE_API}/carousel`;
// const ADMIN_TICKER_API_URL = "http://localhost:5000/api/ticker-news";
// const ADMIN_INFO_API_URL = "http://localhost:5000/api/info-services";


// const DEFAULT_IMAGES = [
//   "https://placehold.co/1920x543/000000/ffffff?text=Slide+1+(1920x543)",
//   "https://placehold.co/1920x543/004d4d/ffffff?text=Slide+2+Educational+Broadcasting",
//   "https://placehold.co/1920x543/00aaaa/ffffff?text=Slide+3+EMR%26RC+Events",
//   "https://placehold.co/1920x543/000000/ffffff?text=Slide+4+Student+Resources",
//   "https://placehold.co/1920x543/004d4d/ffffff?text=Slide+5+Research+Initiatives",
//   "https://placehold.co/1920x543/00aaaa/ffffff?text=Slide+6+Community+Outreach",
// ];


// const DEFAULT_TICKER_NEWS = [
//   "Admission notifications for the academic year 2025 are now officially open online",
//   "New video lectures regarding advanced data science have been uploaded to the portal",
//   "Live teleconference sessions will be held every Thursday from 2 PM to 3 PM",
//   "Students can now download the latest examination schedule from the university website",
// ];

// const DEFAULT_INFO_SERVICES = [
//   {
//     id: 1,
//     title: "LIVE",
//     shortDesc: "BRAOU conducts interactive live tele-conference programs",
//     fullDesc:
//       "BRAOU conducts interactive live tele-conference programs every Thursday from 2–3 PM on different subjects. They are broadcast on the BRAOU YouTube channel and T-SAT NIPUNA, and students can clarify their doubts through the live session by calling 040-23680456.",
//     mobileColor: "bg-[#22b9d3]",
//     layout: { top: "18%", left: "22%", width: "22%", height: "11%" },
//   },
//   {
//     id: 2,
//     title: "Vidyagani",
//     shortDesc:
//       "Vidyagani is Dr. B. R. Ambedkar Open University's digital portal",
//     fullDesc:
//       "Vidyagani (vidyagani.braou.ac.in) is Dr. B.R. Ambedkar Open University’s digital learning portal. It offers students audio lessons, video lectures, and teleconference recordings to support flexible, open-distance learning. The platform enables learners to access and download multimedia study materials anytime, forming an integral part of the university’s online academic support system.",
//     mobileColor: "bg-[#fca51f]",
//     layout: { top: "17%", right: "11%", width: "23%", height: "11%" },
//   },
//   {
//     id: 3,
//     title: "Youtube",
//     shortDesc:
//       "Detailed information on BRAOU's courses, programs, and degrees",
//     fullDesc: [
//       "Video lessons for UG, PG, and distance-learning courses",
//       "Course-wise and subject-wise organized playlists for easy access",
//       "Recordings of seminars, workshops, and university events",
//       "Academic updates, guidance videos, and student information",
//       "Accessible learning resources available anytime on the official BRAOU channel",
//     ],
//     mobileColor: "bg-[#56a877]",
//     layout: { top: "43%", left: "10%", width: "20%", height: "13%" },
//   },
//   {
//   id: 4,
//   title: "T-SAT",
//   subTitle: "Vidya / Nipuna",
//   shortDesc: "T-SAT telecasts video lessons produced by the EMRRC...",
//   fullDesc:
//     "T-SAT telecasts video lessons produced by EMR&RC through its two channels, Vidya and Nipuna, from Monday to Saturday. T-SAT Vidya broadcasts lessons from 1:00–2:00 PM and 8:30–9:30 PM, while T-SAT Nipuna airs lessons from 2:00–3:00 PM. The platform also hosts live teleconferencing sessions for interactive learning.",
//   mobileColor: "bg-[#f25c34]",
//   layout: { top: "43%", right: "2%", width: "20%", height: "14%" },
// }
// ,
//   {
//     id: 5,
//     title: "AIR",
//     shortDesc: "Audio lessons are broadcast on All India Radio according",
//     fullDesc:
//       "All India Radio (AIR): Audio lessons produced by EMR&RC are broadcast on All India Radio (AIR), Hyderabad A (HYD A) according to scheduled time slots. Lessons air daily from 6:25 PM to 6:40 PM on the Medium Wave (MW) frequency 738 kHz (AM), providing students with accessible radio-based learning.",
//     mobileColor: "bg-[#2d5aa8]",
//     layout: { bottom: "20%", left: "20%", width: "19%", height: "11%" },
//   },
//   {
//     id: 6,
//     title: "Web Radio",
//     shortDesc: "Welcome to Web Radio. Your hub for live radio lessons",
//     fullDesc:
//       "Welcome to HiBRAOU Web Radio, your hub for live radio lessons and real-time university updates. Tune in for program schedules, health tips, and engaging live podcasts. Students can also interact live with teachers to clarify their doubts, staying informed, inspired, and connected with campus life—anytime, anywhere.",
//     mobileColor: "bg-[#3e4a59]",
//     layout: { bottom: "20%", right: "12%", width: "20%", height: "11%" },
//   },
// ];

// // ============================================================================
// // HOME COMPONENT
// // ============================================================================
// const Home = ({ onInitialLoadDone }) => {
//   const [sliderImages, setSliderImages] = useState(DEFAULT_IMAGES);
//   const [tickerItems, setTickerItems] = useState(DEFAULT_TICKER_NEWS);
//   const [infoServices, setInfoServices] = useState(DEFAULT_INFO_SERVICES); // NEW
//   const [loading, setLoading] = useState(() => {
//     return sessionStorage.setItem("home_loaded", "true");

//   });

//   useEffect(() => {
//   const fetchData = async () => {
//     try {
//       setLoading(true);

//       const sliderRes = await fetch(ADMIN_SLIDER_API_URL).catch(() => null);
//       if (sliderRes?.ok) {
//         const sData = await sliderRes.json();
//         if (Array.isArray(sData) && sData.length > 0) {
//           setSliderImages(sData);
//         }
//       }

//       const tickerRes = await fetch(ADMIN_TICKER_API_URL).catch(() => null);
//       if (tickerRes?.ok) {
//         const tData = await tickerRes.json();
//         if (Array.isArray(tData) && tData.length > 0) {
//           setTickerItems(tData);
//         }
//       }
//     } catch (err) {
//       console.warn("Home Data API failed, using defaults.");
//     } finally {
//       setTimeout(() => {
//         setLoading(false);
//         onInitialLoadDone?.();
//       }, 500);
//     }
//   };

//   fetchData();
// }, []);


//   if (loading) {
//     return <PageLoader />;
//   }

//   return (
//     <main
//       className="w-full overflow-x-hidden flex flex-col min-h-screen bg-cover bg-center bg-no-repeat"
//       style={{ backgroundImage: "url('/pictures/website BG Final.jpg')" }}
//     >
//       {sliderImages && sliderImages.length > 0 && (
//         <HeroSlider images={sliderImages} />
//       )}

//       <section className="w-full py-6 md:py-10 px-4 text-center">
//         <h1 className="font-black uppercase tracking-wide text-slate-900 text-[clamp(18px,4vw,32px)]" style={{ fontFamily: "'Arial Black', Arial, sans-serif" }}>
//           Welcome To EMR&RC - Educational Broadcasting
//         </h1>
//       </section>

//       <NewsTicker news={tickerItems} />
//       {/* 🔹 Pass dynamic infoServices to InfographicSection */}
//       <InfographicSection infoServices={infoServices} />
//     </main>
//   );
// };

// // --- SUB-COMPONENTS ---

// const PageLoader = () => (
//   <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
//     <motion.div
//       className="w-16 h-16 border-4 border-cyan-200 border-t-cyan-600 rounded-full"
//       animate={{ rotate: 360 }}
//       transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//     />
//   </div>
// );



// const HeroSlider = ({ images }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const timeoutRef = useRef(null);
//   const safeImages = images && images.length > 0 ? images : DEFAULT_IMAGES;

//   useEffect(() => {
//     if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     timeoutRef.current = setTimeout(() => {
//       setCurrentIndex((prev) =>
//         prev === safeImages.length - 1 ? 0 : prev + 1
//       );
//     }, 5000);
//     return () => {
//       if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     };
//   }, [currentIndex, safeImages.length]);

//   return (
//     <div
//       className="
//         relative
//         w-full
//         h-[55vw]
//         sm:h-[40vw]
//         md:aspect-[1920/543]
//         max-h-[540px]
//         overflow-hidden
//         shadow-lg
//         bg-gray-900
//       "
//     >
//       <AnimatePresence mode="wait">
//         <motion.img
//           key={currentIndex}
//           src={safeImages[currentIndex]}
//           className="absolute inset-0 w-full h-full object-cover"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 1.5 }}
//         />
//       </AnimatePresence>
//       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
//         {safeImages.map((_, i) => (
//           <div
//             key={i}
//             onClick={() => setCurrentIndex(i)}
//             className={`h-3 w-3 rounded-full cursor-pointer transition-all ${
//               currentIndex === i ? "bg-cyan-400 w-8" : "bg-white/50"
//             }`}
//           ></div>
//         ))}
//       </div>
//     </div>
//   );
// };


// const NewsTicker = ({ news }) => {
//   const rawNews = news && news.length > 0 ? news : DEFAULT_TICKER_NEWS;

 
//   const repeatedNews = rawNews.length < 10 
//     ? [...rawNews, ...rawNews, ...rawNews, ...rawNews] 
//     : rawNews;

  
//   const [duration, setDuration] = useState(300); 

//   useEffect(() => {
//     const handleResize = () => {
      
//       setDuration(window.innerWidth < 768 ? 200 : 250);
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <div className="w-full overflow-hidden py-2 bg-white/20 backdrop-blur-sm">
//       <motion.div
//         className="flex items-center w-max"
//         animate={{ x: ["0%", "-50%"] }}
//         transition={{
//           duration: duration,
//           repeat: Infinity,
//           ease: "linear",
//         }}
//         key={duration}
//       >
//         {/* Block 1 */}
//         <div className="flex items-center">
//           {repeatedNews.map((item, index) => (
//             <span
//               key={`a-${index}`}
//               className="px-10 font-black text-slate-900 text-sm md:text-lg capitalize whitespace-nowrap"
//               style={{ fontFamily: "'Arial Black', Arial, sans-serif" }}
//             >
//               {item}
//             </span>
//           ))}
//         </div>

//         {/* Block 2 (Duplicate for seamless loop) */}
//         <div className="flex items-center">
//           {repeatedNews.map((item, index) => (
//             <span
//               key={`b-${index}`}
//               className="px-10 font-black text-slate-900 text-sm md:text-lg capitalize whitespace-nowrap"
//               style={{ fontFamily: "'Arial Black', Arial, sans-serif" }}
//             >
//               {item}
//             </span>
//           ))}
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// const InfographicSection = ({ infoServices }) => {
//   const [selectedFeature, setSelectedFeature] = useState(null);

//   return (
//     <section className="w-full py-8 px-2 relative">
//       <div className="max-w-[1200px] mx-auto relative">
//         <img
//           src="/pictures/HOME INFO_edit.png"
//           className="w-full object-contain select-none"
//           alt="infographic"
//         />
//         {infoServices.map((item) => (
//           <div key={item.id} style={item.layout} className="absolute overflow-hidden">
//             <div className="absolute top-[10%] left-[12%] w-[75%]">
//              <h3 className="
//   text-white
//   font-black
//   uppercase
//   leading-tight
//   drop-shadow-md
//   text-[7px]
//   sm:text-[clamp(10px,1.5vw,18px)]
// ">
//   {item.title}

//   {item.subTitle && (
//     <span className="
//       block
//       font-bold
//       normal-case
//       text-[6px]
//       sm:text-[clamp(8px,1.1vw,13px)]
//       mt-[1px]
//       opacity-90
//     ">
//       ({item.subTitle})
//     </span>
//   )}
// </h3>

//             </div>
//             <div className="absolute bottom-[12%] left-[12%] w-[75%]">
//               {/* Description – hidden below 768px */}
//               <p className="hidden md:block text-white font-semibold text-[clamp(7px,1vw,13px)] leading-tight drop-shadow-sm line-clamp-2">
//                 {item.shortDesc}
//               </p>

//               {/* Know More – always visible */}
//               <button
//                 onClick={() => setSelectedFeature(item)}
//                 className="
//   inline-flex items-center justify-center
//   mt-2
//   px-2 py-[2px]
//   font-bold
//   text-white
//   text-[6.5px]
//   sm:text-[clamp(8px,1vw,12px)]
//   bg-white/20
//   backdrop-blur-md
//   border border-white/30
//   rounded
//   transition-all duration-200 ease-out
//   hover:bg-red-600/70
//   hover:border-red-400
// "

//               >
//                 Know More
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//       <AnimatePresence>
//         {selectedFeature && (
//           <motion.div
//             className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setSelectedFeature(null)}
//           >
//             <motion.div
//               className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden"
//               initial={{ scale: 0.9, opacity: 0, y: 20 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.9, opacity: 0, y: 20 }}
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div
//                 className={`${selectedFeature.mobileColor} p-4 flex justify-between items-center`}
//               >
//                 <h3 className="text-xl font-black text-white uppercase">
//                   {selectedFeature.title}
//                 </h3>
//                 <button
//                   onClick={() => setSelectedFeature(null)}
//                   className="text-white bg-white/20 rounded-full w-8 h-8 flex items-center justify-center hover:bg-white/30"
//                 >
//                   X
//                 </button>
//               </div>
//               <div className="p-8">
//                 <div className="text-slate-700 text-sm sm:text-lg leading-relaxed">
//                   {Array.isArray(selectedFeature.fullDesc) ? (
//                     <ul className="list-disc pl-6 space-y-2">
//                       {selectedFeature.fullDesc.map((point, index) => (
//                         <li key={index}>{point}</li>
//                       ))}
//                     </ul>
//                   ) : (
//                     <p>{selectedFeature.fullDesc}</p>
//                   )}
//                 </div>

//                 <div className="mt-6 text-right">
//                   <button
//                     onClick={() => setSelectedFeature(null)}
//                     className="px-5 py-2 bg-slate-200 rounded-lg font-bold hover:bg-slate-300 text-slate-800"
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

// version 3


import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
const ADMIN_SLIDER_API_URL = `${import.meta.env.VITE_BASE_API}/carousel`;
const ADMIN_TICKER_API_URL = "http://localhost:5000/api/ticker-news";
const ADMIN_INFO_API_URL = "http://localhost:5000/api/info-services";


const DEFAULT_IMAGES = [
  "https://placehold.co/1920x543/000000/ffffff?text=Slide+1+(1920x543)",
  "https://placehold.co/1920x543/004d4d/ffffff?text=Slide+2+Educational+Broadcasting",
  "https://placehold.co/1920x543/00aaaa/ffffff?text=Slide+3+EMR%26RC+Events",
  "https://placehold.co/1920x543/000000/ffffff?text=Slide+4+Student+Resources",
  "https://placehold.co/1920x543/004d4d/ffffff?text=Slide+5+Research+Initiatives",
  "https://placehold.co/1920x543/00aaaa/ffffff?text=Slide+6+Community+Outreach",
];

const decodeHtml = (text = "") => {
  const txt = document.createElement("textarea");
  txt.innerHTML = text;
  return txt.value;
};


const DEFAULT_TICKER_NEWS = [
  "Admission notifications for the academic year 2025 are now officially open online",
  "New video lectures regarding advanced data science have been uploaded to the portal",
  "Live teleconference sessions will be held every Thursday from 2 PM to 3 PM",
  "Students can now download the latest examination schedule from the university website",
];

const DEFAULT_INFO_SERVICES = [
  {
    id: 1,
    fullDesc:
      "BRAOU conducts interactive live tele-conference programs every Thursday from 2–3 PM on different subjects. They are broadcast on the BRAOU YouTube channel and T-SAT NIPUNA, and students can clarify their doubts through the live session by calling 040-23680456.",
    mobileColor: "bg-[#22b9d3]",
    layout: { top: "17%", left: "17%", width: "22%", height: "11%" },
    buttonLayout: { bottom: "8%", left: "30%", width: "36%", height: "22px" },
  },
  {
    id: 2,
    fullDesc:
      "Vidyagani (vidyagani.braou.ac.in) is Dr. B.R. Ambedkar Open University’s digital learning portal. It offers students audio lessons, video lectures, and teleconference recordings to support flexible, open-distance learning. The platform enables learners to access and download multimedia study materials anytime, forming an integral part of the university’s online academic support system.",
    mobileColor: "bg-[#fca51f]",
    layout: { top: "17%", right: "11%", width: "23%", height: "11%" },
    buttonLayout: { bottom: "6%", left: "30%", width: "36%", height: "22px" },
  },
  {
    id: 3,
    fullDesc: [

      "Video lessons for UG, PG, and distance-learning courses",
"Course-wise and subject-wise organized playlists for easy access.",
"Recordings of seminars, workshops, and university events.",
"Academic updates, guidance videos, and student information.",
"Accessible learning resources available anytime on the official BRAOU channel."
    ],
    mobileColor: "bg-[#56a877]",
    layout: { top: "39%", left: "5%", width: "23%", height: "13%" },
    buttonLayout: { bottom: "5%", left: "20%", width: "36%", height: "18px" },
  },
  {
    id: 4,
    fullDesc:
      "T-SAT telecasts video lessons produced by EMR&RC through its two channels, Vidya andNipuna, from Monday to Saturday. T-SAT Vidya broadcasts lessons from 1:00–2:00 Pand 8:30–9:30 PM, while T-SAT Nipuna airs lessons from 2:00–3:00 PM. The platform also hosts live teleconferencing sessions for interactive learning.",
    mobileColor: "bg-[#f25c34]",
    layout: { top: "39%", right: "1%", width: "22%", height: "13%" },
    buttonLayout: { bottom: "6%", left: "18%", width: "36%", height: "18px" },
  },
  {
    id: 5,
    fullDesc:
      "Audio lessons produced by EMR&RC are broadcast on All India Radio (AIR), Hyderabad A (HYD A) according to scheduled time slots. Lessons air daily from 6:25 PM to 6:40 PM on the Medium Wave (MW) frequency 738 kHz (AM), providing students with accessible radio-based learning.",
    mobileColor: "bg-[#2d5aa8]",
    layout: { bottom: "27%", left: "16%", width: "22%", height: "13%" },
    buttonLayout: { top: "60%", left: "25%", width: "36%", height: "22px" },
  },
  {
    id: 6,
    fullDesc:
      "Welcome to HiBRAOU Web Radio, your hub for live radio lessons and real-time university updates. Tune in for program schedules, health tips, and engaging live podcasts. Students can also interact live with teachers to clarify their doubts, staying informed, inspired, and connected with campus life anytime, anywhere.",
    mobileColor: "bg-[#3e4a59]",
    layout: { bottom: "27%", right: "9%", width: "23%", height: "13%" },
    buttonLayout: { top: "60%", left: "20%", width: "36%", height: "22px" },
  },
];
const DEFAULT_HOME = {
  heading: "Welcome To EMR&RC - Educational Broadcasting",
};



// ============================================================================
// HOME COMPONENT
// ============================================================================
const Home = ({ onInitialLoadDone }) => {
  const [sliderImages, setSliderImages] = useState(DEFAULT_IMAGES);
  const [loading, setLoading] = useState(() => {
    return sessionStorage.setItem("home_loaded", "true");

  });
  const [homeContent, setHomeContent] = useState(DEFAULT_HOME);
const [tickerItems, setTickerItems] = useState(DEFAULT_TICKER_NEWS);
const [infoServices, setInfoServices] = useState(DEFAULT_INFO_SERVICES);



  useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);

      const sliderRes = await fetch(ADMIN_SLIDER_API_URL).catch(() => null);
      if (sliderRes?.ok) {
         const result = await sliderRes.json();
         if (Array.isArray(result.data) && result.data.length > 0) {
          const sortedImages = result.data
      .sort((a, b) => a.priority - b.priority)
      .map(item => item.url);

    setSliderImages(sortedImages);
        }
      }

      // const tickerRes = await fetch(ADMIN_TICKER_API_URL).catch(() => null);
      // if (tickerRes?.ok) {
      //   const tData = await tickerRes.json();
      //   if (Array.isArray(tData) && tData.length > 0) {
      //     setTickerItems(tData);
      //   }
      // }

            // ---------- HOME HEADING ----------
      try {
        const homeRes = await fetch(`${import.meta.env.VITE_BASE_API}/home`);
        if (homeRes.ok) {
          const homeJson = await homeRes.json();

          // Postman shows: { status, message, data: { heading: "...", ... } }
         if (homeJson?.data) {
  setHomeContent((prev) => ({
    ...prev,
    ...homeJson.data,
  }));

  // ✅ OPTION 2: Derive popup descriptions from heading_cat_*
setInfoServices((prev) =>
  prev.map((item) => {
    switch (item.id) {
      case 1:
        return {
          ...item,
          fullDesc: `${homeJson.data.heading_cat_live} programs are conducted regularly with expert faculty through interactive live sessions.`,
        };

      case 2:
        return {
          ...item,
          fullDesc: `${homeJson.data.heading_cat_vidyagani} provides digital learning resources including audio lessons, video lectures, and recorded sessions.`,
        };

      case 3:
        return {
          ...item,
          fullDesc: [
            `${homeJson.data.heading_cat_youtube} offers subject-wise video lessons.`,
            `Recorded university programs and special lectures.`,
            `Academic updates and student guidance content.`,
          ],
        };

      case 4:
        return {
          ...item,
          fullDesc: `${homeJson.data.heading_cat_tsat} broadcasts EMR&RC lessons through Vidya and Nipuna channels with scheduled telecasts.`,
        };

      case 5:
        return {
          ...item,
          fullDesc: `${homeJson.data.heading_cat_air}`,
        };

      case 6:
        return {
          ...item,
          fullDesc: `${homeJson.data.heading_cat_web_radio} streams live radio programs, podcasts, and real-time academic updates for students.`,
        };

      default:
        return item;
    }
  })
);

// demo
  // ✅ IMPORTANT: Replace popup content from backend
if (Array.isArray(homeJson.data.info_services)) {
  setInfoServices(homeJson.data.info_services);
}

  // ✅ USE heading_description as ticker
  if (
    Array.isArray(homeJson.data.heading_description) &&
    homeJson.data.heading_description.length > 0
  ) {
    setTickerItems(homeJson.data.heading_description);
  }
}

        }
      } catch (e) {
        console.warn("Failed to load /home. Using default heading.");
      }

    } catch (err) {
      console.warn("Home Data API failed, using defaults.");
    } finally {
      setTimeout(() => {
        setLoading(false);
        onInitialLoadDone?.();
      }, 500);
    }
  };

  fetchData();
}, []);

useEffect(() => {
  const fetchHome = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_API}/home`);
      if (!res.ok) return;
      const json = await res.json();
      if (json?.data) setHomeData(json.data);
    } catch {}
  };
  fetchHome();
}, []);


  if (loading) {
    return <PageLoader />;
  }

  return (
    <main
      className="w-full overflow-x-hidden flex flex-col min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/pictures/website BG Final.jpg')" }}
    >
      {sliderImages && sliderImages.length > 0 && (
        <HeroSlider images={sliderImages} />
      )}

      <section className="w-full py-6 md:py-10 px-4 text-center">
         <h1
    className="font-black uppercase tracking-wide text-slate-900 text-[clamp(18px,4vw,32px)]"
    style={{ fontFamily: "'Arial Black', Arial, sans-serif" }}
  >
    {decodeHtml(homeContent.heading)}
  </h1>


      </section>

      <NewsTicker news={tickerItems} />
      {/* 🔹 Pass dynamic infoServices to InfographicSection */}
      <InfographicSection infoServices={infoServices} />
    </main>
  );
};

// --- SUB-COMPONENTS ---

const PageLoader = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
    <motion.div
      className="w-16 h-16 border-4 border-cyan-200 border-t-cyan-600 rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  </div>
);



const HeroSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);
  const safeImages = images && images.length > 0 ? images : DEFAULT_IMAGES;

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) =>
        prev === safeImages.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex, safeImages.length]);

  return (
    <div
      className="
        relative
        w-full
        h-[55vw]
        sm:h-[40vw]
        md:aspect-[1920/543]
        max-h-[540px]
        overflow-hidden
        shadow-lg
        bg-gray-900
      "
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={safeImages[currentIndex]}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
        />
      </AnimatePresence>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {safeImages.map((_, i) => (
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


const NewsTicker = ({ news }) => {
  const rawNews = news && news.length > 0 ? news : DEFAULT_TICKER_NEWS;

 
  const repeatedNews = rawNews.length < 10 
    ? [...rawNews, ...rawNews, ...rawNews, ...rawNews] 
    : rawNews;

  
  const [duration, setDuration] = useState(300); 

  useEffect(() => {
    const handleResize = () => {
      
      setDuration(window.innerWidth < 768 ? 200 : 250);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full overflow-hidden py-2 bg-white/20 backdrop-blur-sm">
      <motion.div
        className="flex items-center w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
        }}
        key={duration}
      >
        {/* Block 1 */}
        <div className="flex items-center">
          {repeatedNews.map((item, index) => (
            <span
              key={`a-${index}`}
              className="px-10 font-black text-slate-900 text-sm md:text-lg capitalize whitespace-nowrap"
              style={{ fontFamily: "'Arial Black', Arial, sans-serif" }}
            >
              {item}
            </span>
          ))}
        </div>

        {/* Block 2 (Duplicate for seamless loop) */}
        <div className="flex items-center">
          {repeatedNews.map((item, index) => (
            <span
              key={`b-${index}`}
              className="px-10 font-black text-slate-900 text-sm md:text-lg capitalize whitespace-nowrap"
              style={{ fontFamily: "'Arial Black', Arial, sans-serif" }}
            >
              {item}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const InfographicSection = ({ infoServices }) => {
  const [selectedFeature, setSelectedFeature] = useState(null);

  return (
    <section className="w-full py-8 px-2 relative">
      <div className="max-w-[1200px] mx-auto relative">
        <img
          src="/pictures/second.png"
          className="w-full object-contain select-none"
          alt="infographic"
        />
{infoServices.map((item) => (
  <div
    key={item.id}
    style={item.layout}
    onClick={() => setSelectedFeature(item)}
    className="absolute cursor-pointer group"
  >
    {/* Desktop only: Know More */}
    <button
      className="
        hidden md:flex
        absolute
        bottom-[10%]
        left-[30%]

        h-[28px]
        px-3

        items-center justify-center
        text-[12px]
        font-bold

        bg-white/50
        text-white
        backdrop-blur-md
        border border-white/30
        rounded

        transition
        hover:bg-red-600
        hover:text-white
      "
    >
      Know more
    </button>
  </div>
))}


      </div>

      {/* Popup */}
      <AnimatePresence>
        {selectedFeature && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
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
              <div className={`${selectedFeature.mobileColor} p-4 flex justify-end`}>
                <button
                  onClick={() => setSelectedFeature(null)}
                  className="text-white bg-white/20 rounded-full w-8 h-8 flex items-center justify-center hover:bg-white/30"
                >
                  ✕
                </button>
              </div>

              <div className="p-8">
                <div className="text-slate-700 text-sm sm:text-lg leading-relaxed">
                  {Array.isArray(selectedFeature.fullDesc) ? (
                    <ul className="list-disc pl-6 space-y-2">
                      {selectedFeature.fullDesc.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{selectedFeature.fullDesc}</p>
                  )}
                </div>

                <div className="mt-6 text-right">
                  <button
                    onClick={() => setSelectedFeature(null)}
                    className="px-5 py-2 bg-slate-200 rounded-lg font-bold hover:bg-slate-300 text-slate-800"
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

