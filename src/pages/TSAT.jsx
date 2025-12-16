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

// --- HELPER: Parse Time Strings ---
const parseTime = (timeStr, dateStr) => {
  if (!timeStr) return null;
  const d = dateStr ? new Date(dateStr) : new Date();
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":");
  if (hours === "12") hours = "00";
  if (modifier === "PM") hours = parseInt(hours, 10) + 12;
  d.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0);
  return d;
};

const TSAT = () => {
  const [vidya, setVidya] = useState(DEFAULT_VIDYA);
  const [nipuna, setNipuna] = useState(DEFAULT_NIPUNA);
  const [liveBroadcast, setLiveBroadcast] = useState(null);
  const [loading, setLoading] = useState(true);

  const BASE_API = import.meta.env.VITE_BASE_API;

  useEffect(() => {
    const fetchTSAT = async () => {
      try {
        setLoading(true);

        const [vidyaRes, nipunaRes, scrollingRes] = await Promise.all([
          fetch(`${BASE_API}/tsat/vidya`).catch(err => null),
          fetch(`${BASE_API}/tsat/nipuna`).catch(err => null),
          fetch(`${BASE_API}/tsat/scrolling`).catch(err => null)
        ]);

        // Process Vidya
        if (vidyaRes && vidyaRes.ok) {
          const v = await vidyaRes.json();
          let latestVidya = null;
          if (Array.isArray(v?.data) && v.data.length > 0) {
            latestVidya = v.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
          } else if (v?.data) {
            latestVidya = v.data;
          }
          if (latestVidya) {
            setVidya({
              ...DEFAULT_VIDYA,
              timings: latestVidya.timings,
              date: latestVidya.date,
              logo: typeof latestVidya.schedule_pdf === "string" ? latestVidya.schedule_pdf : DEFAULT_VIDYA.logo,
              schedule_pdf: typeof latestVidya.logo === "string" ? latestVidya.logo : null,
            });
          }
        }

        // Process Nipuna
        if (nipunaRes && nipunaRes.ok) {
          const n = await nipunaRes.json();
          let latestNipuna = null;
          if (Array.isArray(n?.data) && n.data.length > 0) {
            latestNipuna = n.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
          } else if (n?.data) {
            latestNipuna = n.data;
          }
          if (latestNipuna) {
            setNipuna({
              ...DEFAULT_NIPUNA,
              timings: latestNipuna.timings,
              date: latestNipuna.date,
              logo: latestNipuna.logo || DEFAULT_NIPUNA.logo,
              schedule_pdf: latestNipuna.schedule_pdf,
            });
          }
        }

        // Process Broadcast Bar
        if (scrollingRes && scrollingRes.ok) {
            const s = await scrollingRes.json();
            if (Array.isArray(s?.data)) {
                const now = new Date();
                
                const activeEvent = s.data.find(item => {
                    if (!item.date || !item.start_time || !item.end_time) return false;
                    
                    // 1. Check Date
                    const eventDate = new Date(item.date);
                    if (eventDate.toDateString() !== now.toDateString()) return false;

                    // 2. Check Time
                    const start = parseTime(item.start_time, item.date);
                    const end = parseTime(item.end_time, item.date);

                    return now >= start && now <= end;
                });

                setLiveBroadcast(activeEvent || null);
            }
        }

      } catch (error) {
        console.warn("TSAT API failed", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTSAT();
  }, []);

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
                
                {/* TEXT INFO */}
                <div className="text-xs md:text-sm font-semibold leading-tight pr-5 text-[#00383D] flex flex-wrap items-center justify-center gap-2">
                    
                    {/* Live Indicator */}
                    <span className="text-red-600 font-bold animate-pulse flex items-center gap-1">
                        ● LIVE NOW
                    </span>

                    {/* ✅ CHANNEL BADGE (Vidya or Nipuna) */}
                    {liveBroadcast.channel && (
                        <span className="bg-[#00383D] text-white px-2 py-0.5 rounded text-[10px] md:text-xs uppercase tracking-wide">
                            {liveBroadcast.channel}
                        </span>
                    )}
                    
                    {/* Title & Time */}
                    <span>
                        : {liveBroadcast.title} ({liveBroadcast.start_time} - {liveBroadcast.end_time})
                    </span>
                </div>

                {/* JOIN BUTTON */}
                {liveBroadcast.join_now_link && (
                    <button
                    onClick={() => window.open(liveBroadcast.join_now_link, "_blank")}
                    className="pl-4 bg-[#C62828] text-white px-4 py-1.5 rounded-full text-xs md:text-sm shadow border border-[#8B0000] transition-all duration-200 hover:bg-[#b72222] hover:shadow-lg hover:scale-105 active:scale-95 animate-wiggle"
                    >
                    ⚪ Join Now...
                    </button>
                )}
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
              {vidya.date && <p className="mt-2 md:mt-3 text-lg md:text-xl font-bold text-black">Date: {new Date(vidya.date).toLocaleDateString()}</p>}
              <p className="mt-1 md:mt-2 text-lg md:text-xl font-bold text-black">Timings: {vidya.timings}</p>
              <button
                className="mt-5 md:mt-6 px-10 md:px-14 py-2.5 md:py-3 text-white text-lg md:text-xl font-semibold rounded-full shadow-lg hover:scale-105 active:scale-95 active:brightness-90 transition-all duration-200"
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
              <img src="/pictures/NIPUNA.png" alt="Nipuna Logo" className="w-16 h-20 md:w-20 md:h-24 mb-3" />
              <h2 className="text-2xl md:text-3xl font-bold text-black leading-tight">T-SAT (Nipuna)</h2>
              {nipuna.date && <p className="mt-2 md:mt-3 text-lg md:text-xl font-bold text-black">Date: {new Date(nipuna.date).toLocaleDateString()}</p>}
              <p className="mt-1 md:mt-2 text-lg md:text-xl font-bold text-black">Timings: {nipuna.timings}</p>
              <button
                className="mt-5 md:mt-6 px-10 md:px-14 py-2.5 md:py-3 text-white text-lg md:text-xl font-semibold rounded-full shadow-lg hover:scale-105 active:scale-95 active:brightness-90 transition-all duration-200"
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