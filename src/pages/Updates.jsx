// import { useEffect, useState } from "react";

// const UPDATES_API = `${import.meta.env.VITE_BASE_API}/updates`;

// const DEFAULT_UPDATES = [
//   "Admission notifications will be announced shortly",
//   "Online examination schedules will be updated soon",
//   "Students are advised to check the website regularly for announcements",
// ];

// const Updates = () => {
//   const [updates, setUpdates] = useState(DEFAULT_UPDATES);

//   useEffect(() => {
//     fetch(UPDATES_API)
//       .then(res => res.json())
//       .then(result => {
//         if (Array.isArray(result?.data) && result.data.length > 0) {
//           setUpdates(result.data);
//         }
//       })
//       .catch(() => {
//         setUpdates(DEFAULT_UPDATES);
//       });
//   }, []);

//   return (
//     <main
//       className="w-full min-h-screen bg-cover bg-center bg-no-repeat"
//       style={{ backgroundImage: "url('/pictures/website BG Final.jpg')" }}
//     >
//       <section className="max-w-[1200px] mx-auto px-4 py-12">
//         <h1
//           className="text-center font-black uppercase tracking-wide text-slate-900 text-[clamp(20px,4vw,32px)] mb-8"
//           style={{ fontFamily: "'Arial Black', Arial, sans-serif" }}
//         >
//           Latest Updates
//         </h1>

//         <ul className="space-y-4">
//           {updates.map((item, index) => (
//             <li
//               key={index}
//               className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow text-slate-800 font-medium"
//             >
//               {item}
//             </li>
//           ))}
//         </ul>
//       </section>
//     </main>
//   );
// };

// export default Updates;



import React, { useEffect, useState } from "react";

// ✅ 1. Point to '/home' because that is where 'heading_description' lives
const HOME_API_URL = `${import.meta.env.VITE_BASE_API}/home`;

const DEFAULT_UPDATES = [
  "Admission notifications will be announced shortly",
  "Online examination schedules will be updated soon",
  "Students are advised to check the website regularly for announcements",
];

const Updates = () => {
  const [updates, setUpdates] = useState(DEFAULT_UPDATES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        setLoading(true);
        const res = await fetch(HOME_API_URL);
        
        if (res.ok) {
          const result = await res.json();
          
          // ✅ 2. Extract 'heading_description' from the backend JSON
          // Structure: result.data.heading_description
          const descriptionList = result?.data?.heading_description;

          if (Array.isArray(descriptionList) && descriptionList.length > 0) {
            setUpdates(descriptionList);
          }
        }
      } catch (error) {
        console.error("Failed to fetch updates:", error);
        // Keep default updates on error
      } finally {
        setLoading(false);
      }
    };

    fetchUpdates();
  }, []);

  // ✅ 3. Loading Screen
  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
        <h2 className="text-2xl md:text-3xl font-bold text-[#00383D] animate-pulse">
          Loading Updates ...
        </h2>
      </div>
    );
  }

  return (
    <main
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat font-[Arial]"
      style={{ backgroundImage: "url('/pictures/website BG Final.jpg')" }}
    >
      <section className="max-w-[1200px] mx-auto px-4 py-12">
        <h1
          className="text-center font-black uppercase tracking-wide text-slate-900 text-[clamp(20px,4vw,32px)] mb-8"
          style={{ fontFamily: "'Arial Black', Arial, sans-serif" }}
        >
          Latest Updates
        </h1>

        <ul className="space-y-4">
          {updates.map((item, index) => (
            <li
              key={index}
              className="
                bg-white/80 backdrop-blur-sm 
                p-5 rounded-lg shadow-lg 
                text-slate-900 font-bold text-lg
                border-l-8 border-[#00383D]
                transition-transform hover:scale-[1.01]
              "
            >
              {item}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Updates;