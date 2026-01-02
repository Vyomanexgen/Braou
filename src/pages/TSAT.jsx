// import React from "react";
// import Footer from "../components/Footer";
// import { useEffect, useState } from "react";

// const DEFAULT_VIDYA = {
//   timings: "1:00–2:00 PM",
//   logo: "/pictures/VIDYA.png",
//   schedule_pdf: null
// };

// const DEFAULT_NIPUNA = {
//   timings: "2:00–3:00 PM",
//   logo: "/pictures/NIPUNA.png",
//   schedule_pdf: null
// };


// const TSAT = () => {
//  const [vidya, setVidya] = useState(DEFAULT_VIDYA);
// const [nipuna, setNipuna] = useState(DEFAULT_NIPUNA);


//   const BASE_API = import.meta.env.VITE_BASE_API;


//   useEffect(() => {
//   const fetchTSAT = async () => {
//    try {
//   const [vidyaRes, nipunaRes] = await Promise.all([
//     fetch(`${BASE_API}/tsat/vidya`),
//     fetch(`${BASE_API}/tsat/nipuna`)
//   ]);

//   // ✅ VIDYA (object, not array)
//  // VIDYA (handle array or object)
// // VIDYA (handle array or object)
// if (vidyaRes.ok) {
//   const v = await vidyaRes.json();

//   let latestVidya = null;

//   // Case 1: data is array → pick the newest record
//   if (Array.isArray(v?.data) && v.data.length > 0) {
//     latestVidya = v.data
//       .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
//   }

//   // Case 2: data is single object
//   if (!Array.isArray(v?.data) && v?.data) {
//     latestVidya = v.data;
//   }

//   if (latestVidya) {
//     setVidya({
//       ...DEFAULT_VIDYA,
//       timings: latestVidya.timings,
//       date: latestVidya.date,

//       // SWAPPED FIELDS
//       logo:
//         typeof latestVidya.schedule_pdf === "string"
//           ? latestVidya.schedule_pdf
//           : DEFAULT_VIDYA.logo,

//       schedule_pdf:
//         typeof latestVidya.logo === "string"
//           ? latestVidya.logo
//           : null,
//     });
//   }
// }


//   // ✅ NIPUNA (object, not array)
// if (nipunaRes.ok) {
//   const n = await nipunaRes.json();
// console.log("NIPUNA STATE:", nipuna);

//   let latestNipuna = null;

//   // ✅ Case 1: backend returns array
//   if (Array.isArray(n?.data) && n.data.length > 0) {
//     latestNipuna = n.data.sort(
//       (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//     )[0];
//   }

//   // ✅ Case 2: backend returns single object
//   if (!Array.isArray(n?.data) && n?.data?.schedule_pdf) {
//     latestNipuna = n.data;
//   }

//   if (latestNipuna) {
//     setNipuna({
//       ...DEFAULT_NIPUNA,
//       timings: latestNipuna.timings,
//       date: latestNipuna.date,
//       logo: latestNipuna.logo || DEFAULT_NIPUNA.logo,
//       schedule_pdf: latestNipuna.schedule_pdf,
//     });
//   }
// }

// } catch (error) {
//   // backend failed → defaults stay
//   console.warn("TSAT API failed, using defaults", error);
// }

//   };

//   fetchTSAT();
// }, []);

//   return (
    
//     <>
//       <main
//         className="w-full flex flex-col min-h-screen bg-cover bg-center bg-no-repeat font-[Arial]"
//         style={{
//           backgroundImage: "url('/pictures/website BG Final.jpg')",
//         }}
//       >
//         {/* Page Title */}
//         <section className="pt-16 text-center px-4 pb-5">
//           <h1 className="text-3xl md:text-4xl font-extrabold text-[#121212] pb-2">
//             T-SAT
//           </h1>
//           <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A8EC5]">
//             (Vidya/Nipuna)
//           </h2>
//         </section>

//         {/* Broadcast bar */}
//         <section className="w-full flex justify-center mt-4 px-4">
//           <div
//             className="
//       w-full max-w-2xl
//       bg-[#D6F2F5] 
//       border border-[#0A8EC5] 
//       shadow-md 
//       px-4 py-3 
//       rounded-2xl
//       flex flex-col md:flex-row 
//       items-center justify-center
//       text-center 
//       gap-3
//     "
//           >
//             {/* TEXT */}
//             <p className="text-xs md:text-sm font-semibold leading-tight pr-5">
//               T-SAT Vidya broadcasts lessons from 1:00-2:00 PM and 8:30-9:30 PM
//             </p>

//             {/* BUTTON */}
//             <button
//               className="
//               pl-4
//     bg-[#C62828] 
//     text-white 
//     px-4 py-1.5 
//     rounded-full 
//     text-xs md:text-sm 
//     shadow 
//     border border-[#8B0000]
//     transition-all duration-200
//     hover:bg-[#b72222]
//     hover:shadow-lg
//     hover:scale-105
//     active:scale-95
//     animate-wiggle
//   "
//             >
//               ⚪ Join Now...
//             </button>

//             <style>
//               {`
//   @keyframes wiggle {
//     0%, 100% { transform: translateX(0); }
//     50% { transform: translateX(-5px); }
//   }
//   .animate-wiggle {
//     animation: wiggle 1.3s ease-in-out infinite;
//   }
// `}
//             </style>
//           </div>
//         </section>

//         {/* Cards Section */}
//         <section
//           className="w-full max-w-6xl mx-auto px-4 grid grid-cols-1 
//           md:grid-cols-2 gap-8 md:gap-10 mt-10 md:mt-12"
//         >
//           {/* ==================== VIDYA CARD ==================== */}
//           <div className="relative rounded-[42px] border-[6px] border-[#006A72] shadow-[0px_6px_20px_rgba(0,0,0,0.30)]">
//             <div
//               className="
//                 rounded-[36px]
//                 bg-cover bg-center
//                 p-6 md:p-10
//                 min-h-[280px]
//                 flex flex-col items-center justify-center text-center
//               "
//               style={{
//                 backgroundImage: "url('/pictures/T-SAT Card.png')",
//                 backgroundSize: "200%",
//                 backgroundRepeat: "no-repeat",
//                 backgroundPosition: "center",
//               }}
//             >
//               <img
//   src={vidya.logo}
//   className="w-16 h-20 md:w-20 md:h-24 mb-3"
//   onError={(e) => {
//     e.currentTarget.src = DEFAULT_VIDYA.logo;
//   }}
// />

//               <h2 className="text-2xl md:text-3xl font-bold text-black leading-tight">
//                 T-SAT (Vidya)
//               </h2>
// <p className="mt-2 md:mt-3 text-lg md:text-2xl font-bold text-black">
//  Date:{vidya.date}
// </p>
//               <p className="mt-2 md:mt-3 text-lg md:text-2xl font-bold text-black">
//   Timings: {vidya.timings}
// </p>


//               {/* RESPONSIVE BUTTON (hover + mobile tap fix) */}
//               <button
//                 className="
//                   mt-5 md:mt-6 px-10 md:px-14 py-2.5 md:py-3
//                   text-white text-lg md:text-xl font-semibold
//                   rounded-full shadow-lg 
//                   hover:scale-105 
//                   active:scale-95 active:brightness-90
//                   transition-all duration-200
//                 "
//                 style={{
//                   background: `
//                     linear-gradient(
//                       95deg,
//                       #006A72 0%,
//                       #004B52 40%,
//                       #000000 100%
//                     )
//                   `,
//                 }}  onClick={() =>
//     vidya.schedule_pdf &&
//     window.open(vidya.schedule_pdf, "_blank")
//   }
//               >
//                 Schedule
//               </button>
//             </div>
//           </div>

//           {/* ==================== NIPUNA CARD ==================== */}
//           <div className="relative rounded-[42px] border-[6px] border-[#006A72] shadow-[0px_6px_20px_rgba(0,0,0,0.30)]">
//             <div
//               className="
//                 rounded-[36px]
//                 bg-cover bg-center
//                 p-6 md:p-10
//                 min-h-[280px]
//                 flex flex-col items-center justify-center text-center
//               "
//               style={{
//                 backgroundImage: "url('/pictures/T-SAT Card.png')",
//                 backgroundSize: "200%",
//                 backgroundRepeat: "no-repeat",
//                 backgroundPosition: "center",
//               }}
//             >
//               <img
//                 src="/pictures/NIPUNA.png"
//                 className="w-16 h-20 md:w-20 md:h-24 mb-3"
//               />

//               <h2 className="text-2xl md:text-3xl font-bold text-black leading-tight">
//                 T-SAT (Nipuna)
//               </h2>
//                <p className="mt-2 md:mt-3 text-lg md:text-2xl font-bold text-black">
//   Date:{nipuna.date}
// </p>
//               <p className="mt-2 md:mt-3 text-lg md:text-2xl font-bold text-black">
//                 Timings: {nipuna.timings}
//               </p>

//               {/* RESPONSIVE BUTTON (hover + mobile tap fix) */}
//               <button
//                 className="
//                   mt-5 md:mt-6 px-10 md:px-14 py-2.5 md:py-3
//                   text-white text-lg md:text-xl font-semibold
//                   rounded-full shadow-lg 
//                   hover:scale-105 
//                   active:scale-95 active:brightness-90
//                   transition-all duration-200
//                 "
//                 style={{
//                   background: `
//                     linear-gradient(
//                       95deg,
//                       #006A72 0%,
//                       #004B52 40%,
//                       #000000 100%
//                     )
//                   `,
//                 }} 
//                  onClick={() =>
//     nipuna.schedule_pdf &&
//    window.open(`${nipuna.schedule_pdf}?v=${Date.now()}`, "_blank")
//   }
//               >
//                 Schedule
//               </button>
//             </div>
//           </div>
//         </section>

//         {/* Downlink Frequency Details */}
//         <section className="w-full max-w-5xl mx-auto text-center px-4 mt-12 pb-16">
//           <div className="w-full flex justify-center mt-2 px-4">
//             <img
//               src="/pictures/Group 371.png"
//               alt="Downlink Frequency Info"
//               className="w-full max-w-xl"
//             />
//           </div>
//         </section>
//       </main>
//     </>
//   );
// };

// export default TSAT;



// import React, { useEffect, useState } from "react";
// import Footer from "../components/Footer";

// const DEFAULT_VIDYA = {
//   timings: "1:00–2:00 PM",
//   logo: "/pictures/VIDYA.png",
//   schedule_pdf: null,
// };

// const DEFAULT_NIPUNA = {
//   timings: "2:00–3:00 PM",
//   logo: "/pictures/NIPUNA.png",
//   schedule_pdf: null,
// };

// // --- HELPER: Parse Time Strings ---
// const parseTime = (timeStr, dateStr) => {
//   if (!timeStr) return null;
//   const d = dateStr ? new Date(dateStr) : new Date();
//   const [time, modifier] = timeStr.split(" ");
//   let [hours, minutes] = time.split(":");
//   if (hours === "12") hours = "00";
//   if (modifier === "PM") hours = parseInt(hours, 10) + 12;
//   d.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0);
//   return d;
// };

// const TSAT = () => {
//   const [vidya, setVidya] = useState(DEFAULT_VIDYA);
//   const [nipuna, setNipuna] = useState(DEFAULT_NIPUNA);
//   const [liveBroadcast, setLiveBroadcast] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const BASE_API = import.meta.env.VITE_BASE_API;

//   useEffect(() => {
//     const fetchTSAT = async () => {
//       try {
//         setLoading(true);

//         const [vidyaRes, nipunaRes, scrollingRes] = await Promise.all([
//           fetch(`${BASE_API}/tsat/vidya`).catch(err => null),
//           fetch(`${BASE_API}/tsat/nipuna`).catch(err => null),
//           fetch(`${BASE_API}/tsat/scrolling`).catch(err => null)
//         ]);

//         // Process Vidya
//         if (vidyaRes && vidyaRes.ok) {
//           const v = await vidyaRes.json();
//           let latestVidya = null;
//           if (Array.isArray(v?.data) && v.data.length > 0) {
//             latestVidya = v.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
//           } else if (v?.data) {
//             latestVidya = v.data;
//           }
//           if (latestVidya) {
//             setVidya({
//               ...DEFAULT_VIDYA,
//               timings: latestVidya.timings,
//               date: latestVidya.date,
//               logo: typeof latestVidya.schedule_pdf === "string" ? latestVidya.schedule_pdf : DEFAULT_VIDYA.logo,
//               schedule_pdf: typeof latestVidya.logo === "string" ? latestVidya.logo : null,
//             });
//           }
//         }

//         // Process Nipuna
//         if (nipunaRes && nipunaRes.ok) {
//           const n = await nipunaRes.json();
//           let latestNipuna = null;
//           if (Array.isArray(n?.data) && n.data.length > 0) {
//             latestNipuna = n.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
//           } else if (n?.data) {
//             latestNipuna = n.data;
//           }
//           if (latestNipuna) {
//             setNipuna({
//               ...DEFAULT_NIPUNA,
//               timings: latestNipuna.timings,
//               date: latestNipuna.date,
//               logo: latestNipuna.logo || DEFAULT_NIPUNA.logo,
//               schedule_pdf: latestNipuna.schedule_pdf,
//             });
//           }
//         }

//         // Process Broadcast Bar
//         if (scrollingRes && scrollingRes.ok) {
//             const s = await scrollingRes.json();
//             if (Array.isArray(s?.data)) {
//                 const now = new Date();
                
//                 const activeEvent = s.data.find(item => {
//                     if (!item.date || !item.start_time || !item.end_time) return false;
                    
//                     // 1. Check Date
//                     const eventDate = new Date(item.date);
//                     if (eventDate.toDateString() !== now.toDateString()) return false;

//                     // 2. Check Time
//                     const start = parseTime(item.start_time, item.date);
//                     const end = parseTime(item.end_time, item.date);

//                     return now >= start && now <= end;
//                 });

//                 setLiveBroadcast(activeEvent || null);
//             }
//         }

//       } catch (error) {
//         console.warn("TSAT API failed", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTSAT();
//   }, []);

//   if (loading) {
//     return (
//       <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
//         <h2 className="text-2xl md:text-3xl font-bold text-[#00383D] animate-pulse">
//           Loading TSAT Page ...
//         </h2>
//       </div>
//     );
//   }

//   return (
//     <>
//       <main
//         className="w-full flex flex-col min-h-screen bg-cover bg-center bg-no-repeat font-[Arial]"
//         style={{ backgroundImage: "url('/pictures/website BG Final.jpg')" }}
//       >
//         <section className="pt-16 text-center px-4 pb-5">
//           <h1 className="text-3xl md:text-4xl font-extrabold text-[#121212] pb-2">T-SAT</h1>
//           <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A8EC5]">(Vidya/Nipuna)</h2>
//         </section>

//         {/* ✅ DYNAMIC BROADCAST BAR */}
//         {liveBroadcast && (
//             <section className="w-full flex justify-center mt-4 px-4">
//             <div className="w-full max-w-3xl bg-[#D6F2F5] border border-[#0A8EC5] shadow-md px-4 py-3 rounded-2xl flex flex-col md:flex-row items-center justify-center text-center gap-3">
                
//                 {/* TEXT INFO */}
//                 <div className="text-xs md:text-sm font-semibold leading-tight pr-5 text-[#00383D] flex flex-wrap items-center justify-center gap-2">
                    
//                     {/* Live Indicator */}
//                     <span className="text-red-600 font-bold animate-pulse flex items-center gap-1">
//                         ● LIVE NOW
//                     </span>

//                     {/* ✅ CHANNEL BADGE (Vidya or Nipuna) */}
//                     {liveBroadcast.channel && (
//                         <span className="bg-[#00383D] text-white px-2 py-0.5 rounded text-[10px] md:text-xs uppercase tracking-wide">
//                             {liveBroadcast.channel}
//                         </span>
//                     )}
                    
//                     {/* Title & Time */}
//                     <span>
//                         : {liveBroadcast.title} ({liveBroadcast.start_time} - {liveBroadcast.end_time})
//                     </span>
//                 </div>

//                 {/* JOIN BUTTON */}
//                 {liveBroadcast.join_now_link && (
//                     <button
//                     onClick={() => window.open(liveBroadcast.join_now_link, "_blank")}
//                     className="pl-4 bg-[#C62828] text-white px-4 py-1.5 rounded-full text-xs md:text-sm shadow border border-[#8B0000] transition-all duration-200 hover:bg-[#b72222] hover:shadow-lg hover:scale-105 active:scale-95 animate-wiggle"
//                     >
//                     ⚪ Join Now...
//                     </button>
//                 )}
//             </div>
//             </section>
//         )}

//         <style>
//             {`
//             @keyframes wiggle {
//                 0%, 100% { transform: translateX(0); }
//                 50% { transform: translateX(-5px); }
//             }
//             .animate-wiggle {
//                 animation: wiggle 1.3s ease-in-out infinite;
//             }
//             `}
//         </style>

//         {/* Cards Section */}
//         <section className="w-full max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mt-10 md:mt-12">
          
//           {/* VIDYA CARD */}
//           <div className="relative rounded-[42px] border-[6px] border-[#006A72] shadow-[0px_6px_20px_rgba(0,0,0,0.30)]">
//             <div className="rounded-[36px] bg-cover bg-center p-6 md:p-10 min-h-[280px] flex flex-col items-center justify-center text-center"
//               style={{ backgroundImage: "url('/pictures/T-SAT Card.png')", backgroundSize: "200%", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}
//             >
//               <img src={vidya.logo} alt="Vidya Logo" className="w-16 h-20 md:w-20 md:h-24 mb-3" onError={(e) => { e.currentTarget.src = DEFAULT_VIDYA.logo; }} />
//               <h2 className="text-2xl md:text-3xl font-bold text-black leading-tight">T-SAT (Vidya)</h2>
//               {vidya.date && <p className="mt-2 md:mt-3 text-lg md:text-xl font-bold text-black">Date: {new Date(vidya.date).toLocaleDateString()}</p>}
//               <p className="mt-1 md:mt-2 text-lg md:text-xl font-bold text-black">Timings: {vidya.timings}</p>
//               <button
//                 className="mt-5 md:mt-6 px-10 md:px-14 py-2.5 md:py-3 text-white text-lg md:text-xl font-semibold rounded-full shadow-lg hover:scale-105 active:scale-95 active:brightness-90 transition-all duration-200"
//                 style={{ background: `linear-gradient(95deg, #006A72 0%, #004B52 40%, #000000 100%)` }}
//                 onClick={() => vidya.schedule_pdf && window.open(vidya.schedule_pdf, "_blank")}
//               >
//                 Schedule
//               </button>
//             </div>
//           </div>

//           {/* NIPUNA CARD */}
//           <div className="relative rounded-[42px] border-[6px] border-[#006A72] shadow-[0px_6px_20px_rgba(0,0,0,0.30)]">
//             <div className="rounded-[36px] bg-cover bg-center p-6 md:p-10 min-h-[280px] flex flex-col items-center justify-center text-center"
//               style={{ backgroundImage: "url('/pictures/T-SAT Card.png')", backgroundSize: "200%", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}
//             >
//               <img src="/pictures/NIPUNA.png" alt="Nipuna Logo" className="w-16 h-20 md:w-20 md:h-24 mb-3" />
//               <h2 className="text-2xl md:text-3xl font-bold text-black leading-tight">T-SAT (Nipuna)</h2>
//               {nipuna.date && <p className="mt-2 md:mt-3 text-lg md:text-xl font-bold text-black">Date: {new Date(nipuna.date).toLocaleDateString()}</p>}
//               <p className="mt-1 md:mt-2 text-lg md:text-xl font-bold text-black">Timings: {nipuna.timings}</p>
//               <button
//                 className="mt-5 md:mt-6 px-10 md:px-14 py-2.5 md:py-3 text-white text-lg md:text-xl font-semibold rounded-full shadow-lg hover:scale-105 active:scale-95 active:brightness-90 transition-all duration-200"
//                 style={{ background: `linear-gradient(95deg, #006A72 0%, #004B52 40%, #000000 100%)` }}
//                 onClick={() => nipuna.schedule_pdf && window.open(`${nipuna.schedule_pdf}?v=${Date.now()}`, "_blank")}
//               >
//                 Schedule
//               </button>
//             </div>
//           </div>
//         </section>

//         <section className="w-full max-w-5xl mx-auto text-center px-4 mt-12 pb-16">
//           <div className="w-full flex justify-center mt-2 px-4">
//             <img src="/pictures/Group 371.png" alt="Downlink Frequency Info" className="w-full max-w-xl" />
//           </div>
//         </section>
//       </main>
//     </>
//   );
// };

// export default TSAT;



// import React, { useEffect, useState } from "react";
// import Footer from "../components/Footer";

// const DEFAULT_VIDYA = {
//   timings: "1:00–2:00 PM",
//   logo: "/pictures/VIDYA.png",
//   schedule_pdf: null,
// };

// const DEFAULT_NIPUNA = {
//   timings: "2:00–3:00 PM",
//   logo: "/pictures/NIPUNA.png",
//   schedule_pdf: null,
// };

// const parseTime = (timeStr, dateStr) => {
//   if (!timeStr || !dateStr) return null;

//   const [year, month, day] = dateStr.split("-").map(Number);
//   const [time, modifier] = timeStr.trim().split(" ");
//   let [hours, minutes] = time.split(":").map(Number);

//   if (modifier === "PM" && hours !== 12) hours += 12;
//   if (modifier === "AM" && hours === 12) hours = 0;

//   // ✅ LOCAL time date (IST-safe)
//   return new Date(year, month - 1, day, hours, minutes, 0, 0);
// };


// const TSAT = () => {
//   const [vidya, setVidya] = useState(DEFAULT_VIDYA);
//   const [nipuna, setNipuna] = useState(DEFAULT_NIPUNA);
//   const [liveBroadcast, setLiveBroadcast] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [tickerData, setTickerData] = useState([]); // Store raw data to re-check time

//   const BASE_API = import.meta.env.VITE_BASE_API;

//   useEffect(() => {
//     const fetchTSAT = async () => {
//       try {
//         setLoading(true);

//         const [vidyaRes, nipunaRes, scrollingRes] = await Promise.all([
//           fetch(`${BASE_API}/tsat/vidya`).catch(err => null),
//           fetch(`${BASE_API}/tsat/nipuna`).catch(err => null),
//           fetch(`${BASE_API}/tsat/scrolling`).catch(err => null)
//         ]);

//         // Process Vidya
//         if (vidyaRes && vidyaRes.ok) {
//           const v = await vidyaRes.json();
//           const latest = Array.isArray(v?.data) ? v.data[0] : v.data;
//           if (latest) setVidya({ ...DEFAULT_VIDYA, ...latest, logo: latest.schedule_pdf || DEFAULT_VIDYA.logo, schedule_pdf: latest.logo });
//         }

//         // Process Nipuna
//         if (nipunaRes && nipunaRes.ok) {
//           const n = await nipunaRes.json();
//           const latest = Array.isArray(n?.data) ? n.data[0] : n.data;
//           if (latest) setNipuna({ ...DEFAULT_NIPUNA, ...latest });
//         }

//         // ✅ Process Broadcast Data
//         if (scrollingRes && scrollingRes.ok) {
//             const s = await scrollingRes.json();
//             const dataList = Array.isArray(s?.data) ? s.data : (s?.data ? [s.data] : []);
//             setTickerData(dataList); // Save data to state for the timer
//         }

//       } catch (error) {
//         console.warn("TSAT API failed", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTSAT();
//   }, []);

//   // ✅ NEW: Re-check time every 5 seconds (Auto-Show Logic)
//  // ✅ REFINED: Re-check time every 5 seconds (Strict Admin Logic)
//   useEffect(() => {
//     if (tickerData.length === 0) return;

//     const checkLiveStatus = () => {
//         const now = new Date();
        
//         const activeEvent = tickerData.find(item => {
//             // 1. STRICT FIELD CHECK: All must exist for the bar to show
//             if (!item.start_time || !item.end_time || !item.join_now_link || !item.date) {
//                 return false;
//             }
            
//             // 2. DATE CHECK: Compare only Year, Month, and Day
//             const eventDate = new Date(item.date);
//             const isSameDay = 
//                 eventDate.getFullYear() === now.getFullYear() &&
//                 eventDate.getMonth() === now.getMonth() &&
//                 eventDate.getDate() === now.getDate();

//             if (!isSameDay) return false;

//             // 3. TIME RANGE CHECK
//             const start = parseTime(item.start_time, item.date);
//             const end = parseTime(item.end_time, item.date);

//             // Return true only if current time is between start and end
//             return now >= start && now <= end;
//         });

//         setLiveBroadcast(activeEvent || null);
//     };

//     checkLiveStatus();
//     const interval = setInterval(checkLiveStatus, 5000);
//     return () => clearInterval(interval);

//   }, [tickerData]);
//   if (loading) {
//     return (
//       <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
//         <h2 className="text-2xl md:text-3xl font-bold text-[#00383D] animate-pulse">
//           Loading TSAT Page ...
//         </h2>
//       </div>
//     );
//   }

//   return (
//     <>
//       <main
//         className="w-full flex flex-col min-h-screen bg-cover bg-center bg-no-repeat font-[Arial]"
//         style={{ backgroundImage: "url('/pictures/website BG Final.jpg')" }}
//       >
//         <section className="pt-16 text-center px-4 pb-5">
//           <h1 className="text-3xl md:text-4xl font-extrabold text-[#121212] pb-2">T-SAT</h1>
//           <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A8EC5]">(Vidya/Nipuna)</h2>
//         </section>

//         {/* ✅ DYNAMIC BROADCAST BAR */}
//         {liveBroadcast && (
//             <section className="w-full flex justify-center mt-4 px-4">
//             <div className="w-full max-w-3xl bg-[#D6F2F5] border border-[#0A8EC5] shadow-md px-4 py-3 rounded-2xl flex flex-col md:flex-row items-center justify-center text-center gap-3">
                
//                 <div className="text-xs md:text-sm font-semibold leading-tight pr-5 text-[#00383D] flex flex-wrap items-center justify-center gap-2">
//                     <span className="text-red-600 font-bold animate-pulse flex items-center gap-1">
//                         ● LIVE NOW
//                     </span>

//                     {/* Channel Badge */}
//                     {liveBroadcast.channel && (
//                         <span className="bg-[#00383D] text-white px-2 py-0.5 rounded text-[10px] md:text-xs uppercase tracking-wide">
//                             {liveBroadcast.channel}
//                         </span>
//                     )}
                    
//                     <span>
//                         : {liveBroadcast.title} ({liveBroadcast.start_time} - {liveBroadcast.end_time})
//                     </span>
//                 </div>

//                 {liveBroadcast.join_now_link && (
//                     <button
//                     onClick={() => window.open(liveBroadcast.join_now_link, "_blank")}
//                     className="pl-4 bg-[#C62828] text-white px-4 py-1.5 rounded-full text-xs md:text-sm shadow border border-[#8B0000] transition-all duration-200 hover:bg-[#b72222] hover:shadow-lg hover:scale-105 active:scale-95 animate-wiggle"
//                     >
//                     ⚪ Join Now...
//                     </button>
//                 )}
//             </div>
//             </section>
//         )}
//          <style>
//             {`
//             @keyframes wiggle {
//                 0%, 100% { transform: translateX(0); }
//                 50% { transform: translateX(-5px); }
//             }
//             .animate-wiggle {
//                 animation: wiggle 1.3s ease-in-out infinite;
//             }
//             `}
//         </style>

//         {/* Cards Section */}
//         <section className="w-full max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mt-10 md:mt-12">
          
//           {/* VIDYA CARD */}
//           <div className="relative rounded-[42px] border-[6px] border-[#006A72] shadow-[0px_6px_20px_rgba(0,0,0,0.30)]">
//             <div className="rounded-[36px] bg-cover bg-center p-6 md:p-10 min-h-[280px] flex flex-col items-center justify-center text-center"
//               style={{ backgroundImage: "url('/pictures/T-SAT Card.png')", backgroundSize: "200%", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}
//             >
//               <img src={vidya.logo} alt="Vidya Logo" className="w-16 h-20 md:w-20 md:h-24 mb-3" onError={(e) => { e.currentTarget.src = DEFAULT_VIDYA.logo; }} />
//               <h2 className="text-2xl md:text-3xl font-bold text-black leading-tight">T-SAT (Vidya)</h2>
//               {vidya.date && <p className="mt-2 md:mt-3 text-lg md:text-xl font-bold text-black">Date: {new Date(vidya.date).toLocaleDateString()}</p>}
//               <p className="mt-1 md:mt-2 text-lg md:text-xl font-bold text-black">Timings: {vidya.timings}</p>
//               <button
//                 className="mt-5 md:mt-6 px-10 md:px-14 py-2.5 md:py-3 text-white text-lg md:text-xl font-semibold rounded-full shadow-lg hover:scale-105 active:scale-95 active:brightness-90 transition-all duration-200"
//                 style={{ background: `linear-gradient(95deg, #006A72 0%, #004B52 40%, #000000 100%)` }}
//                 onClick={() => vidya.schedule_pdf && window.open(vidya.schedule_pdf, "_blank")}
//               >
//                 Schedule
//               </button>
//             </div>
//           </div>

//           {/* NIPUNA CARD */}
//           <div className="relative rounded-[42px] border-[6px] border-[#006A72] shadow-[0px_6px_20px_rgba(0,0,0,0.30)]">
//             <div className="rounded-[36px] bg-cover bg-center p-6 md:p-10 min-h-[280px] flex flex-col items-center justify-center text-center"
//               style={{ backgroundImage: "url('/pictures/T-SAT Card.png')", backgroundSize: "200%", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}
//             >
//               <img src="/pictures/NIPUNA.png" alt="Nipuna Logo" className="w-16 h-20 md:w-20 md:h-24 mb-3" />
//               <h2 className="text-2xl md:text-3xl font-bold text-black leading-tight">T-SAT (Nipuna)</h2>
//               {nipuna.date && <p className="mt-2 md:mt-3 text-lg md:text-xl font-bold text-black">Date: {new Date(nipuna.date).toLocaleDateString()}</p>}
//               <p className="mt-1 md:mt-2 text-lg md:text-xl font-bold text-black">Timings: {nipuna.timings}</p>
//               <button
//                 className="mt-5 md:mt-6 px-10 md:px-14 py-2.5 md:py-3 text-white text-lg md:text-xl font-semibold rounded-full shadow-lg hover:scale-105 active:scale-95 active:brightness-90 transition-all duration-200"
//                 style={{ background: `linear-gradient(95deg, #006A72 0%, #004B52 40%, #000000 100%)` }}
//                 onClick={() => nipuna.schedule_pdf && window.open(`${nipuna.schedule_pdf}?v=${Date.now()}`, "_blank")}
//               >
//                 Schedule
//               </button>
//             </div>
//           </div>
//         </section>

//         <section className="w-full max-w-5xl mx-auto text-center px-4 mt-12 pb-16">
//           <div className="w-full flex justify-center mt-2 px-4">
//             <img src="/pictures/Group 371.png" alt="Downlink Frequency Info" className="w-full max-w-xl" />
//           </div>
//         </section>
//       </main>
//     </>
//   );
// };

// export default TSAT;


import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";

const DEFAULT_VIDYA = {
  timings: "1:00–2:00 PM",
  logo: "/pictures/VIDYA.png",
  schedule_pdf: null,
};

const DEFAULT_NIPUNA = {
  timings: "2:00–3:00 PM",
  logo: "/pictures/NIPUNA.png",
  schedule_pdf: null,
};
const pickLatest = (list) => {
  if (!Array.isArray(list) || list.length === 0) return null;

  return list.reduce((latest, item) =>
    new Date(item.updatedAt) > new Date(latest.updatedAt) ? item : latest
  );
};


// ✅ FIXED parseTime: Treats date and time strictly as Local (IST)
const parseTime = (timeStr, dateStr) => {
  if (!timeStr || !dateStr) return null;

  const [year, month, day] = dateStr.split("-").map(Number);
  const timeParts = timeStr.trim().split(/\s+/); // Handles multiple spaces
  const [time, modifier] = timeParts;
  let [hours, minutes] = time.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  // Uses local constructor to avoid 5.5 hour UTC shift
  return new Date(year, month - 1, day, hours, minutes, 0, 0);
};
// ✅ ADD THIS: Converts "14:30" to "2:30 PM" for the frontend display
const format12h = (timeStr) => {
  if (!timeStr) return "";
  let [hours, minutes] = timeStr.split(":").map(Number);
  const suffix = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Converts 0 to 12, 13 to 1, etc.
  return `${hours}:${minutes.toString().padStart(2, '0')} ${suffix}`;
};

const TSAT = () => {
  const [vidya, setVidya] = useState(DEFAULT_VIDYA);
  const [nipuna, setNipuna] = useState(DEFAULT_NIPUNA);
  const [liveBroadcast, setLiveBroadcast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tickerData, setTickerData] = useState([]);

  const BASE_API = import.meta.env.VITE_BASE_API;

  useEffect(() => {
    const fetchTSAT = async () => {
      try {
        setLoading(true);
        const [vidyaRes, nipunaRes, scrollingRes] = await Promise.all([
          fetch(`${BASE_API}/tsat/vidya`).catch(() => null),
          fetch(`${BASE_API}/tsat/nipuna`).catch(() => null),
          fetch(`${BASE_API}/tsat/scrolling`).catch(() => null)
        ]);

        // if (vidyaRes?.ok) {
        //   const v = await vidyaRes.json();
        //   const latest = Array.isArray(v?.data) ? v.data[0] : v.data;
        //   if (latest) setVidya({ ...DEFAULT_VIDYA, ...latest, logo: latest.schedule_pdf || DEFAULT_VIDYA.logo, schedule_pdf: latest.logo });
        // }
        if (vidyaRes?.ok) {
  const v = await vidyaRes.json();
  const latestVidya = pickLatest(v?.data);

  if (latestVidya) {
    setVidya({
      timings: latestVidya.timings || DEFAULT_VIDYA.timings,
      logo: latestVidya.logo || DEFAULT_VIDYA.logo,
      schedule_pdf: latestVidya.schedule_pdf || null,
    });
  }
}
if (nipunaRes?.ok) {
  const n = await nipunaRes.json();
  const latestNipuna = pickLatest(n?.data);

  if (latestNipuna) {
    setNipuna({
      timings: latestNipuna.timings || DEFAULT_NIPUNA.timings,
      logo: latestNipuna.logo || DEFAULT_NIPUNA.logo,
      schedule_pdf: latestNipuna.schedule_pdf || null,
    });
  }
}


        // if (nipunaRes?.ok) {
        //   const n = await nipunaRes.json();
        //   const latest = Array.isArray(n?.data) ? n.data[0] : n.data;
        //   if (latest) setNipuna({ ...DEFAULT_NIPUNA, ...latest });
        // }

        if (scrollingRes?.ok) {
          const s = await scrollingRes.json();
          const dataList = Array.isArray(s?.data) ? s.data : (s?.data ? [s.data] : []);
          setTickerData(dataList);
        }
      } catch (error) {
        console.warn("TSAT API failed", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTSAT();
  }, [BASE_API]);

  // ✅ IMPROVED LOGIC: Reliable Local Date Comparison
// ✅ REFINED LOGIC: Reliable Local Date Comparison based on Postman Data
useEffect(() => {
  if (tickerData.length === 0) return;

const checkLiveStatus = () => {
  const now = new Date();
  console.log("NOW (IST):", now.toString());
console.log("tickerData from backend:", tickerData);

  // LOGIC FIX: If you want to strictly check the [0] position:
  // Use tickerData[0] instead of find() if the backend only sends one active item.
  // Otherwise, use find() to search the list.
  
 const activeEvent = [...tickerData].reverse().find((item) => {
  const event = item.data;   // ⭐ THIS IS THE KEY FIX

  if (!event) return false;

  const now = new Date();

  // check date
  if (event.date !== now.toISOString().slice(0, 10)) return false;

  const start = parseTime(event.start_time, event.date);
  const end = parseTime(event.end_time, event.date);

  console.log("LIVE CHECK:", {
    now: now.toString(),
    start: start.toString(),
    end: end.toString()
  });

  return now >= start && now <= end;
});

setLiveBroadcast(activeEvent?.data || null);

};

  checkLiveStatus();
  // Poll every 5 seconds to automatically show/hide the bar when time passes
  const interval = setInterval(checkLiveStatus, 5000);
  return () => clearInterval(interval);
}, [tickerData]);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
        <h2 className="text-2xl md:text-3xl font-bold text-[#00383D] animate-pulse">
          Loading TSAT Page ...
        </h2>
      </div>
    );
  }

  return (
    <>
      <main
        className="w-full flex flex-col min-h-screen bg-cover bg-center bg-no-repeat font-[Arial]"
        style={{ backgroundImage: "url('/pictures/website BG Final.jpg')" }}
      >
        <section className="pt-16 text-center px-4 pb-5">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#121212] pb-2">T-SAT</h1>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A8EC5]">(Vidya/Nipuna)</h2>
        </section>

        {/* ✅ DYNAMIC BROADCAST BAR */}
       
{liveBroadcast && (
  <section className="w-full flex justify-center mt-4 px-4">
    <div className="w-full max-w-3xl bg-[#D6F2F5] border border-[#0A8EC5] shadow-md px-4 py-3 rounded-2xl flex flex-col md:flex-row items-center justify-center text-center gap-3">
      <div className="text-xs md:text-sm font-semibold leading-tight pr-5 text-[#00383D] flex flex-wrap items-center justify-center gap-2">
        <span className="text-red-600 font-bold animate-pulse flex items-center gap-1">
          ● LIVE NOW
        </span>
        {/* Only show channel tag if the field exists in your API */}
        {liveBroadcast.channel && (
          <span className="bg-[#00383D] text-white px-2 py-0.5 rounded text-[10px] md:text-xs uppercase tracking-wide">
            {liveBroadcast.channel}
          </span>
        )}
        {/* <span>
           {liveBroadcast.title} ({liveBroadcast.start_time} - {liveBroadcast.end_time})
        </span> */}

        {/* <span className="flex items-center gap-1">
  : {liveBroadcast.title} :   
   {new Date(liveBroadcast.date).toLocaleDateString("en-IN")} ( {liveBroadcast.start_time} - {liveBroadcast.end_time} )
</span> */}

<span className="flex items-center gap-1">
  : {liveBroadcast.title}: 
  {/* Show Date as DD/MM/YYYY */}
   {liveBroadcast.date.split('-').reverse().join('/')} 
  {/* Use format12h here */}
  ( {format12h(liveBroadcast.start_time)} - {format12h(liveBroadcast.end_time)} )
</span>

      </div>
      <button
        onClick={() => window.open(liveBroadcast.join_now_link, "_blank")}
        className="bg-[#C62828] text-white px-6 py-1.5 rounded-full text-xs md:text-sm shadow border border-[#8B0000] transition-all hover:bg-[#b72222] hover:scale-105 animate-wiggle"
      >
        ⚪ Join Now...
      </button>
    </div>
  </section>
)}

        <style>
          {`
            @keyframes wiggle {
                0%, 100% { transform: translateX(0); }
                50% { transform: translateX(-5px); }
            }
            .animate-wiggle {
                animation: wiggle 1.3s ease-in-out infinite;
            }
          `}
        </style>

        {/* Cards Section */}
        <section className="w-full max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mt-10 md:mt-12">
          {/* VIDYA CARD */}
          <div className="relative rounded-[42px] border-[6px] border-[#006A72] shadow-[0px_6px_20px_rgba(0,0,0,0.30)]">
            <div className="rounded-[36px] bg-cover bg-center p-6 md:p-10 min-h-[280px] flex flex-col items-center justify-center text-center"
              style={{ backgroundImage: "url('/pictures/T-SAT Card.png')", backgroundSize: "200%", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}
            >
              <img src={vidya.logo} alt="Vidya Logo" className="w-16 h-20 md:w-20 md:h-24 mb-3" onError={(e) => { e.currentTarget.src = DEFAULT_VIDYA.logo; }} />
              <h2 className="text-2xl md:text-3xl font-bold text-black leading-tight">T-SAT (Vidya)</h2>
              {/* {vidya.date && <p className="mt-2 md:mt-3 text-lg md:text-xl font-bold text-black">Date: {new Date(vidya.date).toLocaleDateString()}</p>} */}
              <p className="mt-1 md:mt-2 text-lg md:text-xl font-bold text-black">Timings: {vidya.timings}</p>
              <button
                className="mt-5 md:mt-6 px-10 md:px-14 py-2.5 md:py-3 text-white text-lg md:text-xl font-semibold rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
                style={{ background: `linear-gradient(95deg, #006A72 0%, #004B52 40%, #000000 100%)` }}
                onClick={() => vidya.schedule_pdf && window.open(vidya.schedule_pdf, "_blank")}
              >
                Schedule
              </button>
            </div>
          </div>

          {/* NIPUNA CARD */}
          <div className="relative rounded-[42px] border-[6px] border-[#006A72] shadow-[0px_6px_20px_rgba(0,0,0,0.30)]">
            <div className="rounded-[36px] bg-cover bg-center p-6 md:p-10 min-h-[280px] flex flex-col items-center justify-center text-center"
              style={{ backgroundImage: "url('/pictures/T-SAT Card.png')", backgroundSize: "200%", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}
            >
              {/* <img src="/pictures/NIPUNA.png" alt="Nipuna Logo" className="w-16 h-20 md:w-20 md:h-24 mb-3" /> */}
              <img
  src={nipuna.logo}
  alt="Nipuna Logo"
  className="w-16 h-10 md:w-20 md:h-24 mb-3"
  onError={(e) => (e.currentTarget.src = DEFAULT_NIPUNA.logo)}
/>

              <h2 className="text-2xl md:text-3xl font-bold text-black leading-tight">T-SAT (Nipuna)</h2>
              {/* {nipuna.date && <p className="mt-2 md:mt-3 text-lg md:text-xl font-bold text-black">Date: {new Date(nipuna.date).toLocaleDateString()}</p>} */}
              <p className="mt-1 md:mt-2 text-lg md:text-xl font-bold text-black">Timings: {nipuna.timings}</p>
              <button
                className="mt-5 md:mt-6 px-10 md:px-14 py-2.5 md:py-3 text-white text-lg md:text-xl font-semibold rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
                style={{ background: `linear-gradient(95deg, #006A72 0%, #004B52 40%, #000000 100%)` }}
                onClick={() => nipuna.schedule_pdf && window.open(`${nipuna.schedule_pdf}?v=${Date.now()}`, "_blank")}
              >
                Schedule
              </button>
            </div>
          </div>
        </section>

        <section className="w-full max-w-5xl mx-auto text-center px-4 mt-12 pb-16">
          <div className="w-full flex justify-center mt-2 px-4">
            <img src="/pictures/Group 371.png" alt="Downlink Frequency Info" className="w-full max-w-xl" />
          </div>
        </section>
      </main>
    
    </>
  );
};

export default TSAT;