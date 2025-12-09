// import React from "react";
// import Footer from "../components/Footer";

// const emrrc = [
//   {
//     about:
//       "The Electronic Media Resources & Research Centre (EMR&RC) was established in 1985 as a part of the Material Production Directorate. The Centre became a separate directorate in 1993. This Centre has been successfully organising a series of Radio and Tele-Lessons for the benefit of the learners of the University.",
//   },
// ];

// const activities = [
//   {
//     title: "Educational Content Production:",
//     points: [
//       "Video and Audio Lessons: Producing content for undergraduate (UG), postgraduate (PG), and distance education students.",
//       "Event Coverage: Coverage of university events edited and uploaded in social media platforms.",
//     ],
//   },
//   {
//     title: "T-SAT:",
//     points: [
//       "Telecasting Programs on T-SAT: Broadcasting Video Lessons through T-SAT Vidya and T-SAT Nipuna.",
//       "T-SAT Vidya: 1:00 PM to 2:00 PM.",
//       "T-SAT Nipuna: 2:00 PM to 3:00 PM.",
//       "Event Coverage: Coverage of university events edited and uploaded in social media platforms.",
//     ],
//   },
//   {
//     title: "Broadcasting in AIR:",
//     points: [
//       "Audio lessons aired daily in All India Radio, Hyderabad A, from 6:25 PM to 6:40 PM.",
//     ],
//   },
//   {
//     title: "University Website:",
//     points: [
//       "Uploading all video and audio lessons on the university’s website.",
//     ],
//   },
//   {
//     title: "YouTube Channel:",
//     points: [
//       "Video lessons uploaded on BRAOU’s YouTube channel, organized into course-wise and subject-wise playlists.",
//       "YouTube Live Teleconferences: Hosting live teleconferences every Thursday from 02:00 PM to 03:00 PM for interaction.",
//       "Live Streaming: Teleconference streams available on BRAOU's YouTube channel and T-SAT Nipuna.",
//     ],
//   },
//   {
//     title: "Web Radio:",
//     points: [
//       "Interactive Radio Phone-in program.",
//       "HIRRBAV Web Radio: Radio lessons broadcast through Web Radio Daily.",
//     ],
//   },
// ];

// const About = () => {
//   return (
//     <>
//       <main
//         className="w-full min-h-screen bg-cover bg-center bg-no-repeat font-[Arial]"
//         style={{ backgroundImage: "url('/pictures/website BG Final.jpg')" }}
//       >
//         {/* ABOUT SECTION */}
//         <section className="w-full max-w-5xl mx-auto text-center px-4 pt-10 pb-3">
//           <h2 className="text-3xl md:text-4xl font-bold text-[#004B52] mb-3">
//             ABOUT EMR&RC
//           </h2>

//           <p className="text-gray-800 text-lg leading-relaxed font-bold text-justify">
//             {emrrc[0].about}
//           </p>
//         </section>

//         {/* MIDDLE IMAGE */}
//         <div className="w-full flex justify-center mt-2 px-4">
//           <img
//             src="/pictures/MISSION VISION  INFOGRAPHICS.png"
//             alt="EMR&RC Middle Section Image"
//             className="w-full max-w-4xl"
//           />
//         </div>

//         {/* ACTIVITIES SECTION */}
//         <section className="w-full max-w-6xl mx-auto px-4 pb-12">
//           <h2 className="text-3xl md:text-4xl text-center font-bold text-[#004B52] mb-10">
//             ACTIVITIES
//           </h2>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {activities.map((item, index) => (
//               <div
//                 key={index}
//                 className="
//                   group bg-[#D9D9D966] rounded-[28px] p-8 shadow-md
//                   transition-all duration-700 ease-in-out

//                   hover:scale-[1.03] hover:shadow-xl
//                   hover:bg-gradient-to-b hover:from-[#00828D] hover:via-[#004B52] hover:to-[#000000]

//                   active:scale-[1.03] active:shadow-xl
//                   active:bg-gradient-to-b active:from-[#00828D] active:via-[#004B52] active:to-[#000000]

//                   focus:scale-[1.03] focus:shadow-xl
//                   focus:bg-gradient-to-b focus:from-[#00828D] focus:via-[#004B52] focus:to-[#000000]
//                 "
//               >
//                 {/* Title */}
//                 <h4
//                   className="
//                     text-2xl font-bold text-[#004F56] mb-4 text-center
//                     transition-all duration-700
//                     group-hover:text-white group-active:text-white group-focus:text-white
//                   "
//                 >
//                   {item.title}
//                 </h4>

//                 {/* Points */}
//              <ul className="list-disc pl-6 space-y-2 text-[15px] leading-relaxed">

//                   {item.points.map((pt, i) => (
//                     <li
//   key={i}
//   className="
//     text-justify font-semibold text-[#004F56]
//     transition-all duration-700
//     group-hover:text-white group-active:text-white group-focus:text-white
//   "
// >
//   {pt}


                     
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </section>
//       </main>
//     </>
//   );
// };

// export default About;



// import React, { useState, useEffect } from "react";
// const decodeHtml = (text = "") => {
//   const txt = document.createElement("textarea");
//   txt.innerHTML = text;
//   return txt.value;
// };

// // ---------- DEFAULT FALLBACK DATA ----------
// const defaultActivities = [
//   {
//     title: "Educational Content Production",
//     points: [
//       "Video and Audio lessons for UG, PG, and distance education students.",
//     ],
//   },
//   {
//     title: "T-SAT",
//     points: [
//       "Telecasting video lessons on T-SAT Vidya and T-SAT Nipuna.",
//     ],
//   },
//   {
//     title: "Broadcasting in AIR",
//     points: [
//       "Audio lessons aired daily in All India Radio, Hyderabad A.",
//     ],
//   },
//   {
//     title: "University Website",
//     points: [
//       "Uploading all video and audio lessons on the university website.",
//     ],
//   },
//   {
//     title: "YouTube Channel",
//     points: [
//       "Uploading video lessons and hosting live teleconferences.",
//     ],
//   },
//   {
//     title: "Web Radio",
//     points: [
//       "Broadcasting radio lessons and interactive phone-in programs.",
//     ],
//   },
// ];

// const defaultAboutText =
//   "The Electronic Media Resources & Research Centre (EMR&RC) was established in 1985 as a part of the Material Production Directorate.";

// const About = () => {
//   // ---------- STATE ----------
//   const [activities, setActivities] = useState(defaultActivities);
//   const [aboutText, setAboutText] = useState(defaultAboutText);

//   // ---------- FETCH FROM BACKEND ----------
//   useEffect(() => {
//     const fetchAboutData = async () => {
//       try {
//         const response = await fetch(
//           "https://emrc-pi.vercel.app/api/about"
//         );

//         if (!response.ok) return;

//         const result = await response.json();

//         const apiData = result?.data;

//         // ✅ Update About text
//         if (apiData?.about_text) {
//           setAboutText(apiData.about_text);
//         }

//         // ✅ Update Activities
//         if (apiData?.activities) {
//           const updatedActivities = Object.values(apiData.activities).map(
//             item => ({
//               title: item.title,
//               points: item.bullet_points ?? [],
//             })
//           );

//           if (updatedActivities.length) {
//             setActivities(updatedActivities);
//           }
//         }
//       } catch (err) {
//         console.warn("Backend unreachable. Using default content.", err);
//       }
//     };

//     fetchAboutData();
//   }, []);

//   return (
//     <main
//       className="w-full min-h-screen bg-cover bg-center bg-no-repeat font-[Arial]"
//       style={{ backgroundImage: "url('/pictures/website BG Final.jpg')" }}
//     >
//       {/* ---------- ABOUT SECTION ---------- */}
//       <section className="w-full max-w-5xl mx-auto text-center px-4 pt-10 pb-3">
//         <h2 className="text-3xl md:text-4xl font-bold text-[#004B52] mb-3">
//           ABOUT EMR&RC
//         </h2>

//         <p className="text-gray-800 text-lg leading-relaxed font-bold text-justify">
//           {aboutText}
//         </p>
//       </section>

//       {/* ---------- IMAGE ---------- */}
//       <div className="w-full flex justify-center mt-2 px-4">
//         <img
//           src="/pictures/MISSION VISION  INFOGRAPHICS.png"
//           alt="Mission Vision"
//           className="w-full max-w-4xl"
//         />
//       </div>

//       {/* ---------- ACTIVITIES ---------- */}
//       <section className="w-full max-w-6xl mx-auto px-4 pb-12">
//         <h2 className="text-3xl md:text-4xl text-center font-bold text-[#004B52] mb-10">
//           Activities
//         </h2>

//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {activities.map((item, index) => (
//             <div
//               key={index}
//               className="
//                 group bg-[#D9D9D966] rounded-[28px] p-8 shadow-md
//                 transition-all duration-700 ease-in-out
//                 hover:scale-[1.03] hover:shadow-xl
//                 hover:bg-gradient-to-b hover:from-[#00828D] hover:via-[#004B52] hover:to-black
//               "
//             >
//               <h4
//                 className="
//                   text-2xl font-bold text-[#004F56] mb-4 text-center
//                   transition-all duration-700 group-hover:text-white
//                 "
//               >
//                 {item.title}
//               </h4>

//               <ul className="list-disc pl-6 space-y-2 text-[15px] leading-relaxed">
//                 {item.points.map((pt, i) => (
//                   <li
//                     key={i}
//                     className="
//                       text-justify font-semibold text-[#004F56]
//                       transition-all duration-700 group-hover:text-white
//                     "
//                   >
//                     {pt}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       </section>
//     </main>
//   );
// };

// export default About;




import React, { useState, useEffect } from "react";

// ---------- HTML DECODE HELPER ----------
const decodeHtml = (text = "") => {
  const txt = document.createElement("textarea");
  txt.innerHTML = text;
  return txt.value;
};

// ---------- DEFAULT FALLBACK DATA ----------
const defaultActivities = [
  {
    title: "Educational Content Production",
    points: [
      "Video and Audio lessons for UG, PG, and distance education students.",
    ],
  },
  {
    title: "T-SAT",
    points: [
      "Telecasting video lessons on T-SAT Vidya and T-SAT Nipuna.",
    ],
  },
  {
    title: "Broadcasting in AIR",
    points: [
      "Audio lessons aired daily in All India Radio, Hyderabad A.",
    ],
  },
  {
    title: "University Website",
    points: [
      "Uploading all video and audio lessons on the university website.",
    ],
  },
  {
    title: "YouTube Channel",
    points: [
      "Uploading video lessons and hosting live teleconferences.",
    ],
  },
  {
    title: "Web Radio",
    points: [
      "Broadcasting radio lessons and interactive phone-in programs.",
    ],
  },
];

const defaultAboutText =
  "The Electronic Media Resources & Research Centre (EMR&RC) was established in 1985 as a part of the Material Production Directorate.";

const About = () => {
  const [activities, setActivities] = useState(defaultActivities);
  const [aboutText, setAboutText] = useState(defaultAboutText);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch(
          "https://emrc-pi.vercel.app/api/about"
        );

        if (!response.ok) return;

        const result = await response.json();
        const apiData = result?.data;

        if (apiData?.about_text) {
          setAboutText(apiData.about_text);
        }

        if (apiData?.activities) {
          const updatedActivities = Object.values(apiData.activities).map(
            item => ({
              title: item.title,
              points: item.bullet_points ?? [],
            })
          );

          if (updatedActivities.length) {
            setActivities(updatedActivities);
          }
        }
      } catch (err) {
        console.warn("Backend unreachable. Using default content.", err);
      }
    };

    fetchAboutData();
  }, []);

  return (
    <main
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat font-[Arial]"
      style={{ backgroundImage: "url('/pictures/website BG Final.jpg')" }}
    >
      {/* ABOUT SECTION */}
      <section className="w-full max-w-5xl mx-auto text-center px-4 pt-10 pb-3">
        <h2 className="text-3xl md:text-4xl font-bold text-[#004B52] mb-3">
          ABOUT EMR&RC
        </h2>

        <p className="text-gray-800 text-lg leading-relaxed font-bold text-justify">
          {decodeHtml(aboutText)}
        </p>
      </section>

      {/* IMAGE */}
      <div className="w-full flex justify-center mt-2 px-4">
        <img
          src="/pictures/MISSION VISION  INFOGRAPHICS.png"
          alt="Mission Vision"
          className="w-full max-w-4xl"
        />
      </div>

      {/* ACTIVITIES */}
      <section className="w-full max-w-6xl mx-auto px-4 pb-12">
        <h2 className="text-3xl md:text-4xl text-center font-bold text-[#004B52] mb-10">
          Activities
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((item, index) => (
            <div
              key={index}
              className="
                group bg-[#D9D9D966] rounded-[28px] p-8 shadow-md
                transition-all duration-700 ease-in-out
                hover:scale-[1.03] hover:shadow-xl
                hover:bg-gradient-to-b hover:from-[#00828D] hover:via-[#004B52] hover:to-black
              "
            >
              <h4
                className="
                  text-2xl font-bold text-[#004F56] mb-4 text-center
                  transition-all duration-700 group-hover:text-white
                "
              >
                {item.title}
              </h4>

              <ul className="list-disc pl-6 space-y-2 text-[15px] leading-relaxed">
                {item.points.map((pt, i) => (
                  <li
                    key={i}
                    className="
                      text-justify font-semibold text-[#004F56]
                      transition-all duration-700 group-hover:text-white
                    "
                  >
                    {decodeHtml(pt)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default About;
