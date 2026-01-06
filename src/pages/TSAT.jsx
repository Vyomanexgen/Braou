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
// const pickLatest = (list) => {
//   if (!Array.isArray(list) || list.length === 0) return null;

//   return list.reduce((latest, item) =>
//     new Date(item.updatedAt) > new Date(latest.updatedAt) ? item : latest
//   );
// };


// // ✅ FIXED parseTime: Treats date and time strictly as Local (IST)
// const parseTime = (timeStr, dateStr) => {
//   if (!timeStr || !dateStr) return null;

//   const [year, month, day] = dateStr.split("-").map(Number);
//   const timeParts = timeStr.trim().split(/\s+/); // Handles multiple spaces
//   const [time, modifier] = timeParts;
//   let [hours, minutes] = time.split(":").map(Number);

//   if (modifier === "PM" && hours !== 12) hours += 12;
//   if (modifier === "AM" && hours === 12) hours = 0;

//   // Uses local constructor to avoid 5.5 hour UTC shift
//   return new Date(year, month - 1, day, hours, minutes, 0, 0);
// };
// // ✅ ADD THIS: Converts "14:30" to "2:30 PM" for the frontend display
// const format12h = (timeStr) => {
//   if (!timeStr) return "";
//   let [hours, minutes] = timeStr.split(":").map(Number);
//   const suffix = hours >= 12 ? "PM" : "AM";
//   hours = hours % 12 || 12; // Converts 0 to 12, 13 to 1, etc.
//   return `${hours}:${minutes.toString().padStart(2, '0')} ${suffix}`;
// };

// // TSAT.jsx - Update this function
// const resolveFileUrl = (url) => {
//   if (!url) return "";
//   // If backend already gives full URL (like the Supabase ones in your Postman), use it
//   if (url.startsWith("http")) return url;
//   // IMPORTANT: You must use the BASE_API for relative paths (e.g., /uploads/...)
//   const BASE_API = import.meta.env.VITE_BASE_API || "";
//   return `${BASE_API}${url}`;
// };

// const TSAT = () => {
//   const [vidya, setVidya] = useState(DEFAULT_VIDYA);
//   const [nipuna, setNipuna] = useState(DEFAULT_NIPUNA);
//   const [liveBroadcast, setLiveBroadcast] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [tickerData, setTickerData] = useState([]);

//   const BASE_API = import.meta.env.VITE_BASE_API;

//   useEffect(() => {
//     const fetchTSAT = async () => {
//       try {
//         setLoading(true);
//         const [vidyaRes, nipunaRes, scrollingRes] = await Promise.all([
//           fetch(`${BASE_API}/tsat/vidya`).catch(() => null),
//           fetch(`${BASE_API}/tsat/nipuna`).catch(() => null),
//           fetch(`${BASE_API}/tsat/scrolling`).catch(() => null)
//         ]);

//         // if (vidyaRes?.ok) {
//         //   const v = await vidyaRes.json();
//         //   const latest = Array.isArray(v?.data) ? v.data[0] : v.data;
//         //   if (latest) setVidya({ ...DEFAULT_VIDYA, ...latest, logo: latest.schedule_pdf || DEFAULT_VIDYA.logo, schedule_pdf: latest.logo });
//         // }
// //         if (vidyaRes?.ok) {
// //   const v = await vidyaRes.json();
// //   const latestVidya = pickLatest(v?.data);

// //   if (latestVidya) {
// //     setVidya({
// //       timings: latestVidya.timings || DEFAULT_VIDYA.timings,
// //       logo: latestVidya.logo || DEFAULT_VIDYA.logo,
// //       schedule_pdf: latestVidya.schedule_pdf || null,
// //     });
// //   }
// // }

// if (vidyaRes?.ok) {
//   const v = await vidyaRes.json();
//   const latestVidya = pickLatest(v?.data);

//   if (latestVidya) {
//     setVidya({
//       ...DEFAULT_VIDYA, 
//       timings: latestVidya.timings || DEFAULT_VIDYA.timings,
//       logo: latestVidya.logo || DEFAULT_NIPUNA.logo,
//       schedule_pdf: latestVidya.schedule_pdf || null,
//       updatedAt: latestVidya.updatedAt // Store this for cache busting
//     });
//   }
// }

// if (nipunaRes?.ok) {
//   const n = await nipunaRes.json();
//   const latestNipuna = pickLatest(n?.data);

//   if (latestNipuna) {
//     setNipuna({
//       ...DEFAULT_NIPUNA,
//       timings: latestNipuna.timings || DEFAULT_NIPUNA.timings,
//       logo: latestNipuna.logo || DEFAULT_NIPUNA.logo,
//       schedule_pdf: latestNipuna.schedule_pdf || null,
//       updatedAt: latestNipuna.updatedAt // Store this for cache busting
//     });
//   }
// }

//         // if (nipunaRes?.ok) {
//         //   const n = await nipunaRes.json();
//         //   const latest = Array.isArray(n?.data) ? n.data[0] : n.data;
//         //   if (latest) setNipuna({ ...DEFAULT_NIPUNA, ...latest });
//         // }

//         if (scrollingRes?.ok) {
//           const s = await scrollingRes.json();
//           const dataList = Array.isArray(s?.data) ? s.data : (s?.data ? [s.data] : []);
//           setTickerData(dataList);
//         }
//       } catch (error) {
//         console.warn("TSAT API failed", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTSAT();
//   }, [BASE_API]);

//   // ✅ IMPROVED LOGIC: Reliable Local Date Comparison
// // ✅ REFINED LOGIC: Reliable Local Date Comparison based on Postman Data
// useEffect(() => {
//   if (tickerData.length === 0) return;

// const checkLiveStatus = () => {
//   const now = new Date();
//   console.log("NOW (IST):", now.toString());
// console.log("tickerData from backend:", tickerData);

//   // LOGIC FIX: If you want to strictly check the [0] position:
//   // Use tickerData[0] instead of find() if the backend only sends one active item.
//   // Otherwise, use find() to search the list.
  
//  const activeEvent = [...tickerData].reverse().find((item) => {
//   const event = item.data;   // ⭐ THIS IS THE KEY FIX

//   if (!event) return false;

//   const now = new Date();

//   // check date
//   if (event.date !== now.toISOString().slice(0, 10)) return false;

//   const start = parseTime(event.start_time, event.date);
//   const end = parseTime(event.end_time, event.date);

//   console.log("LIVE CHECK:", {
//     now: now.toString(),
//     start: start.toString(),
//     end: end.toString()
//   });

//   return now >= start && now <= end;
// });

// setLiveBroadcast(activeEvent?.data || null);

// };

//   checkLiveStatus();
//   // Poll every 5 seconds to automatically show/hide the bar when time passes
//   const interval = setInterval(checkLiveStatus, 5000);
//   return () => clearInterval(interval);
// }, [tickerData]);

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
       
// {liveBroadcast && (
//   <section className="w-full flex justify-center mt-4 px-4">
//     <div className="w-full max-w-3xl bg-[#D6F2F5] border border-[#0A8EC5] shadow-md px-4 py-3 rounded-2xl flex flex-col md:flex-row items-center justify-center text-center gap-3">
//       <div className="text-xs md:text-sm font-semibold leading-tight pr-5 text-[#00383D] flex flex-wrap items-center justify-center gap-2">
//         <span className="text-red-600 font-bold animate-pulse flex items-center gap-1">
//           ● LIVE NOW
//         </span>
//         {/* Only show channel tag if the field exists in your API */}
//         {liveBroadcast.channel && (
//           <span className="bg-[#00383D] text-white px-2 py-0.5 rounded text-[10px] md:text-xs uppercase tracking-wide">
//             {liveBroadcast.channel}
//           </span>
//         )}
//         {/* <span>
//            {liveBroadcast.title} ({liveBroadcast.start_time} - {liveBroadcast.end_time})
//         </span> */}

//         {/* <span className="flex items-center gap-1">
//   : {liveBroadcast.title} :   
//    {new Date(liveBroadcast.date).toLocaleDateString("en-IN")} ( {liveBroadcast.start_time} - {liveBroadcast.end_time} )
// </span> */}

// <span className="flex items-center gap-1">
//   : {liveBroadcast.title}: 
//   {/* Show Date as DD/MM/YYYY */}
//    {liveBroadcast.date.split('-').reverse().join('/')} 
//   {/* Use format12h here */}
//   ( {format12h(liveBroadcast.start_time)} - {format12h(liveBroadcast.end_time)} )
// </span>

//       </div>
//       <button
//         onClick={() => window.open(liveBroadcast.join_now_link, "_blank")}
//         className="bg-[#C62828] text-white px-6 py-1.5 rounded-full text-xs md:text-sm shadow border border-[#8B0000] transition-all hover:bg-[#b72222] hover:scale-105 animate-wiggle"
//       >
//         ⚪ Join Now...
//       </button>
//     </div>
//   </section>
// )}

//         <style>
//           {`
//             @keyframes wiggle {
//                 0%, 100% { transform: translateX(0); }
//                 50% { transform: translateX(-5px); }
//             }
//             .animate-wiggle {
//                 animation: wiggle 1.3s ease-in-out infinite;
//             }
//           `}
//         </style>

//         {/* Cards Section */}
//         <section className="w-full max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mt-10 md:mt-12">
//           {/* VIDYA CARD */}
//           <div className="relative rounded-[42px] border-[6px] border-[#006A72] shadow-[0px_6px_20px_rgba(0,0,0,0.30)]">
//             <div className="rounded-[36px] bg-cover bg-center p-6 md:p-10 min-h-[280px] flex flex-col items-center justify-center text-center"
//               style={{ backgroundImage: "url('/pictures/T-SAT Card.png')", backgroundSize: "200%", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}
//             >
//              <img
//   src={`${resolveFileUrl(vidya.logo)}?v=${Date.now()}`}
//   alt="Vidya Logo"
//   className="w-16 h-20 md:w-20 md:h-24 mb-3"
//   onError={(e) => { e.currentTarget.src = DEFAULT_VIDYA.logo; }}
// />

//               <h2 className="text-2xl md:text-3xl font-bold text-black leading-tight">T-SAT (Vidya)</h2>
//               {/* {vidya.date && <p className="mt-2 md:mt-3 text-lg md:text-xl font-bold text-black">Date: {new Date(vidya.date).toLocaleDateString()}</p>} */}
//               <p className="mt-1 md:mt-2 text-lg md:text-xl font-bold text-black">Timings: {vidya.timings}</p>
//           <button
//   disabled={!vidya.schedule_pdf}
//   className="..."
//   onClick={() => {
//     if (vidya.schedule_pdf) {
//       // 1. Get the correct URL
//       const fullUrl = resolveFileUrl(vidya.schedule_pdf);
//       // 2. Add a version timestamp to bypass browser cache
//       const versionedUrl = `${fullUrl}?v=${vidya.updatedAt || Date.now()}`;
//       window.open(versionedUrl, "_blank");
//     }
//   }}
// >
//   Schedule
// </button>
//             </div>
//           </div>

//           {/* NIPUNA CARD */}
//           <div className="relative rounded-[42px] border-[6px] border-[#006A72] shadow-[0px_6px_20px_rgba(0,0,0,0.30)]">
//             <div className="rounded-[36px] bg-cover bg-center p-6 md:p-10 min-h-[280px] flex flex-col items-center justify-center text-center"
//               style={{ backgroundImage: "url('/pictures/T-SAT Card.png')", backgroundSize: "200%", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}
//             >
//               {/* <img src="/pictures/NIPUNA.png" alt="Nipuna Logo" className="w-16 h-20 md:w-20 md:h-24 mb-3" /> */}
//     <img
//   src={`${resolveFileUrl(nipuna.logo)}?v=${Date.now()}`}
//   alt="Nipuna Logo"
//   className="w-16 h-10 md:w-20 md:h-24 mb-3"
//   onError={(e) => (e.currentTarget.src = DEFAULT_NIPUNA.logo)}
// />

//               <h2 className="text-2xl md:text-3xl font-bold text-black leading-tight">T-SAT (Nipuna)</h2>
//               {/* {nipuna.date && <p className="mt-2 md:mt-3 text-lg md:text-xl font-bold text-black">Date: {new Date(nipuna.date).toLocaleDateString()}</p>} */}
//               <p className="mt-1 md:mt-2 text-lg md:text-xl font-bold text-black">Timings: {nipuna.timings}</p>
//              <button
//   disabled={!nipuna.schedule_pdf}
//   className={`mt-5 md:mt-6 px-10 md:px-14 py-2.5 md:py-3 text-white text-lg md:text-xl font-semibold rounded-full shadow-lg transition-all duration-200
//     ${
//       nipuna.schedule_pdf
//         ? "hover:scale-105 active:scale-95"
//         : "opacity-50 cursor-not-allowed"
//     }`}
//   style={{
//     background: `linear-gradient(95deg, #006A72 0%, #004B52 40%, #000000 100%)`
//   }}
//   onClick={() =>
//     nipuna.schedule_pdf &&
//     window.open(`${nipuna.schedule_pdf}?v=${Date.now()}`, "_blank")
//   }
// >
//   Schedule
// </button>
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


// TSAT.jsx

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

// Treat date & time as local (IST)
const parseTime = (timeStr, dateStr) => {
  if (!timeStr || !dateStr) return null;

  const [year, month, day] = dateStr.split("-").map(Number);
  const timeParts = timeStr.trim().split(/\s+/);
  const [time, modifier] = timeParts;
  let [hours, minutes] = time.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  return new Date(year, month - 1, day, hours, minutes, 0, 0);
};

// Convert 24h → 12h
const format12h = (timeStr) => {
  if (!timeStr) return "";
  let [hours, minutes] = timeStr.split(":").map(Number);
  const suffix = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes.toString().padStart(2, "0")} ${suffix}`;
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
          fetch(`${BASE_API}/tsat/scrolling`).catch(() => null),
        ]);

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

        if (scrollingRes?.ok) {
          const s = await scrollingRes.json();
          const dataList = Array.isArray(s?.data)
            ? s.data
            : s?.data
            ? [s.data]
            : [];
          setTickerData(dataList);
        }
      } catch (e) {
        console.warn("TSAT API failed", e);
      } finally {
        setLoading(false);
      }
    };

    fetchTSAT();
  }, [BASE_API]);

  useEffect(() => {
    if (tickerData.length === 0) return;

    const checkLiveStatus = () => {
      const now = new Date();

      const activeEvent = [...tickerData].reverse().find((item) => {
        const event = item.data;
        if (!event) return false;

        if (event.date !== now.toISOString().slice(0, 10)) return false;

        const start = parseTime(event.start_time, event.date);
        const end = parseTime(event.end_time, event.date);

        return now >= start && now <= end;
      });

      setLiveBroadcast(activeEvent?.data || null);
    };

    checkLiveStatus();
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
        style={{
          backgroundImage: "url('/pictures/website BG Final.jpg')",
        }}
      >
        <section className="pt-16 text-center px-4 pb-5">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#121212]">
            T-SAT
          </h1>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A8EC5]">
            (Vidya / Nipuna)
          </h2>
        </section>

        {liveBroadcast && (
          <section className="w-full flex justify-center mt-4 px-4">
            <div className="w-full max-w-3xl bg-[#D6F2F5] border border-[#0A8EC5] px-4 py-3 rounded-2xl flex flex-col md:flex-row items-center gap-3">
              <div className="text-xs md:text-sm font-semibold text-[#00383D] flex flex-wrap items-center gap-2">
                <span className="text-red-600 font-bold animate-pulse">
                  ● LIVE NOW
                </span>
                <span>
                  : {liveBroadcast.title} :{" "}
                  {liveBroadcast.date
                    .split("-")
                    .reverse()
                    .join("/")}{" "}
                  (
                  {format12h(liveBroadcast.start_time)} -{" "}
                  {format12h(liveBroadcast.end_time)})
                </span>
              </div>

              <button
                onClick={() =>
                  window.open(liveBroadcast.join_now_link, "_blank")
                }
                className="bg-[#C62828] text-white px-6 py-1.5 rounded-full text-xs md:text-sm shadow"
              >
                Join Now
              </button>
            </div>
          </section>
        )}

        <section className="w-full max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* VIDYA */}
          <div className="rounded-[42px] border-[6px] border-[#006A72] shadow-lg">
            <div
              className="rounded-[36px] p-6 md:p-10 min-h-[280px] flex flex-col items-center justify-center text-center"
              style={{
                backgroundImage: "url('/pictures/T-SAT Card.png')",
                backgroundSize: "200%",
              }}
            >
              <img
                src={vidya.logo}
                className="w-16 h-20 mb-3"
                onError={(e) => (e.currentTarget.src = DEFAULT_VIDYA.logo)}
              />
              <h2 className="text-2xl font-bold">T-SAT (Vidya)</h2>
              <p className="mt-2 text-lg font-bold">
                Timings: {vidya.timings}
              </p>
              <button
                className="mt-6 px-12 py-3 text-white font-semibold rounded-full"
                style={{
                  background:
                    "linear-gradient(95deg,#006A72,#004B52,#000)",
                }}
                onClick={() =>
                  vidya.schedule_pdf &&
                  window.open(vidya.schedule_pdf, "_blank")
                }
              >
                Schedule
              </button>
            </div>
          </div>

          {/* NIPUNA */}
          <div className="rounded-[42px] border-[6px] border-[#006A72] shadow-lg">
            <div
              className="rounded-[36px] p-6 md:p-10 min-h-[280px] flex flex-col items-center justify-center text-center"
              style={{
                backgroundImage: "url('/pictures/T-SAT Card.png')",
                backgroundSize: "200%",
              }}
            >
              <img
                src={nipuna.logo}
                className="w-16 h-20 mb-3"
                onError={(e) => (e.currentTarget.src = DEFAULT_NIPUNA.logo)}
              />
              <h2 className="text-2xl font-bold">T-SAT (Nipuna)</h2>
              <p className="mt-2 text-lg font-bold">
                Timings: {nipuna.timings}
              </p>
              <button
                className="mt-6 px-12 py-3 text-white font-semibold rounded-full"
                style={{
                  background:
                    "linear-gradient(95deg,#006A72,#004B52,#000)",
                }}
                onClick={() =>
                  nipuna.schedule_pdf &&
                  window.open(
                    `${nipuna.schedule_pdf}?v=${Date.now()}`,
                    "_blank"
                  )
                }
              >
                Schedule
              </button>
            </div>
          </div>
        </section>

      
      </main>
    </>
  );
};

export default TSAT;
