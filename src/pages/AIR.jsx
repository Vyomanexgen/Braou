// import React, { useEffect, useState } from "react";
// import Footer from "../components/Footer";
// import { useNavigate } from "react-router-dom";

// const AIR = () => {
//   const [scrollText, setScrollText] = useState("");
//   const navigate = useNavigate();

//   // -------------------------
//   // Fetch API Data (Scroller)
//   // -------------------------
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Replace with API
//         const scrollRes = await fetch("API_URL_FOR_TOP_SCROLLER");
//         const scrollData = await scrollRes.json();

//         setScrollText(scrollData?.text || "");
//       } catch (error) {
//         console.error("API Fetch Error:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <>
//       <main
//         className="w-full flex flex-col min-h-screen bg-cover bg-center bg-no-repeat font-[Arial]"
//         style={{ backgroundImage: "url('/pictures/website BG Final.jpg')" }}
//       >
//         {/* TOP AUTO SCROLLING TEXT */}
//         <div className="w-full bg-[#0c929e] text-white py-2 overflow-hidden">
//           <p className="marquee whitespace-nowrap text-lg font-medium">
//             {scrollText ||
//               "27-Nov-2025 • 11:00AM • Audio lessons are broadcast on All India Radio (A.I.R.) according to scheduled time slots. A.I.R. Hyderabad A (HYD A) broadcasts these lessons daily from 6:25 PM to 6:40 PM on MW 738 kHz (AM)."}
//           </p>
//         </div>

//         {/* Main Content */}
//         <section className="w-full max-w-6xl mx-auto px-2 py-8">
//           <h2 className="text-center text-3xl md:text-4xl font-bold mb-12 ">
//             AIR <span className="text-[#00383D]">(All India Radio)</span>
//           </h2>

//           {/* IMAGE SECTION */}
//           <div className="flex justify-center">
//             <div
//               className="
//       relative w-full md:w-4/5 lg:w-3/4 rounded-3xl overflow-hidden
//       border-[3px] border-[#00A8FF] 
//       shadow-[0_0_15px_#00A8FF]  /* Blue glow */
//     "
//             >
//               {/* AIR IMAGE — Base Layer */}
//               <img
//                 src="/pictures/AIR.png"
//                 alt="AIR Studio"
//                 className="w-full h-auto object-cover rounded-2xl"
//               />

//               {/* SHADOW IMAGE — Overlay Layer */}
//               <img
//                 src="/pictures/AIR Shadow.png"
//                 alt="Shadow Overlay"
//                 className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl pointer-events-none"
//               />

//               {/* AIR Hyderabad Logo — Top Right */}
//               <div
//                 className="
//         absolute top-4 right-4 
//         bg-white rounded-xl shadow-lg
//         p-3 w-32 md:w-40
//         flex flex-col items-center
//       "
//               >
//                 <img
//                   src="/pictures/AIR HYD.png" /* Replace with actual file */
//                   alt="AIR Hyderabad"
//                   className="w-full object-contain"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* BUTTON */}
//           <div className="flex justify-center mt-6">
//             <button
//               onClick={() => navigate("")}
//               className="
//       text-white text-2xl font-bold py-3 px-10 rounded-full shadow-xl transition 
//       bg-gradient-to-r from-[#09727b] to-[#004B52]
//       hover:from-[#0a5057] hover:to-[#02363b]
//       active:scale-95
//     "
//             >
//               Schedule
//             </button>
//           </div>
//         </section>
//       </main>

//       {/* Marquee Animation */}
//       <style>
//         {`
//           .marquee {
//             animation: scrollText 30s linear infinite;
//           }
//           @keyframes scrollText {
//             0% { transform: translateX(100%); }
//             100% { transform: translateX(-100%); }
//           }
//         `}
//       </style>
//     </>
//   );
// };

// export default AIR;



import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";

const AIR = () => {
  const [scrollText, setScrollText] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");

  useEffect(() => {
    const fetchAirData = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_API}/air`
        );

        if (!res.ok) return;

        const result = await res.json();
        const airData = result?.data;

        if (Array.isArray(airData) && airData.length > 0) {
          // ✅ pick latest updated record
          const latestAir = airData.reduce((latest, item) =>
            new Date(item.updatedAt) > new Date(latest.updatedAt)
              ? item
              : latest
          );

          setScrollText(latestAir.scrolling_text || "");
          setPdfUrl(latestAir.pdf || "");
        }
      } catch (error) {
        console.error("Failed to load AIR data:", error);
      }
    };

    fetchAirData();
  }, []);

  return (
    <>
      <main
        className="w-full flex flex-col min-h-screen bg-cover bg-center bg-no-repeat font-[Arial]"
        style={{ backgroundImage: "url('/pictures/website BG Final.jpg')" }}
      >
        {/* TOP AUTO SCROLLING TEXT */}
        <div className="w-full bg-[#0c929e] text-white py-2 overflow-hidden">
          <p className="marquee whitespace-nowrap text-lg font-medium">
            {scrollText ||
              "No TEXT AVAILABLE Currently for All India Radio (AIR) updates."}
          </p>
        </div>

        {/* Main Content */}
        <section className="w-full max-w-6xl mx-auto px-2 py-8">
          <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">
            AIR <span className="text-[#00383D]">(All India Radio)</span>
          </h2>

          {/* IMAGE SECTION */}
          <div className="flex justify-center">
            <div className="relative w-full md:w-4/5 lg:w-3/4 rounded-3xl overflow-hidden border-[3px] border-[#00A8FF] shadow-[0_0_15px_#00A8FF]">
              <img
                src="/pictures/AIR.png"
                alt="AIR Studio"
                className="w-full h-auto object-cover"
              />

              <img
                src="/pictures/AIR Shadow.png"
                alt="Shadow Overlay"
                className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
              />

              <div className="absolute top-4 right-4 bg-white rounded-xl shadow-lg p-3 w-32 md:w-40">
                <img
                  src="/pictures/AIR HYD.png"
                  alt="AIR Hyderabad"
                  className="w-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* BUTTON */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => pdfUrl && window.open(pdfUrl, "_blank")}
              disabled={!pdfUrl}
              className="
                text-white text-2xl font-bold py-3 px-10 rounded-full shadow-xl
                transition bg-gradient-to-r from-[#09727b] to-[#004B52]
                hover:from-[#0a5057] hover:to-[#02363b]
                active:scale-95 disabled:opacity-50
              "
            >
              Schedule
            </button>
          </div>
        </section>
      </main>

      {/* Marquee Animation */}
      <style>
        {`
          .marquee {
            animation: scrollText 30s linear infinite;
          }

          @keyframes scrollText {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
        `}
      </style>

     
    </>
  );
};

export default AIR;
