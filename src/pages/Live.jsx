// import React, { useEffect, useState } from "react";
// import Footer from "../components/Footer";

// const Live = () => {
//   const [videoUrl, setVideoUrl] = useState("");

//   // SAMPLE fallback video if backend gives no URL
//   const sampleVideo = "https://www.youtube.com/embed/pmTrFgzGlJM";

//   useEffect(() => {
//     const fetchLiveVideo = async () => {
//       try {
//         const res = await fetch("https://your-backend-api.com/live-video");
//         const data = await res.json();

//         // If backend gives empty/undefined/null, fallback will be used
//         setVideoUrl(data.videoUrl || "");
//       } catch (error) {
//         console.error("Failed to load live video:", error);
//         // Leave videoUrl empty → fallback will load
//       }
//     };

//     fetchLiveVideo();
//   }, []);

//   // Final URL to use everywhere
//   const finalVideoUrl = videoUrl ? videoUrl : sampleVideo;

//   return (
//     <>
//       <main
//         className="w-full flex flex-col min-h-screen bg-cover bg-center bg-no-repeat font-[Arial]"
//         style={{
//           backgroundImage: "url('/pictures/website BG Final.jpg')",
//         }}
//       >
//         {/* Top Content */}
//         <div className="w-full flex flex-col items-center text-center px-4 pt-16 pb-10">
//           <h1 className="text-3xl md:text-4xl font-bold text-[#004B52]">
//             LIVE
//           </h1>

//           <p className="max-w-4xl mt-5 text-gray-800 text-base md:text-lg leading-relaxed font-semibold text-justify">
//             BRAOU conducts interactive live tele-conference programs every
//             Thursday from 2-3 PM on different subjects. They are broadcast on
//             the BRAOU YouTube channel and T-SAT NIPUNA. Students can clarify
//             their doubts by calling <strong>040-23680456</strong>.
//           </p>

//           {/* CARD BOX */}
//           <div
//             className="
//               mt-10 bg-white rounded-3xl p-10 
//               shadow-[0_0_20px_#00b3ff] border-2 border-[#00b3ff]
//               max-w-2xl w-full flex flex-col items-center
//             "
//           >
//             {/* Live tag */}
//             <div className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 self-start">
//               <span className="w-3 h-3 bg-white rounded-full"></span>
//               Live
//             </div>

//             {/* Video Embed */}
//             <div className="w-full flex justify-center mb-6">
//               <iframe
//                 className="w-full h-56 md:h-80 rounded-xl"
//                 src={finalVideoUrl}
//                 title="YouTube Live Video"
//                 frameBorder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//               ></iframe>
//             </div>

//             {/* Redirect to YouTube */}
//             <button
//               onClick={() => window.open(finalVideoUrl, "_blank")}
//               className="mt-2 bg-[#C7E8F3]
//     text-[#004B52]
//     font-semibold
//     text-lg md:text-xl
//     px-6 py-3
//     rounded-full
//     shadow-md
//     hover:bg-[#135668]
//     hover:shadow-lg
//     hover:text-white
//     transition-all
//     duration-300
//   "
//             >
//               Click to Watch Live Stream
//             </button>
//           </div>
//         </div>
//       </main>
//     </>
//   );
// };

// export default Live;



import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";

/* ---------- HELPERS ---------- */

// Decode HTML entities like &amp;
const decodeHtml = (text = "") => {
  const txt = document.createElement("textarea");
  txt.innerHTML = text;
  return txt.value;
};

// Convert any YouTube URL to a clean embed URL
const getYoutubeEmbedUrl = (url) => {
  if (!url) return "";

  // 1. Decode &amp;
  let cleanUrl = decodeHtml(url);

  // 2. Remove query params like &t=595s
  cleanUrl = cleanUrl.split("&")[0];

  // 3. Convert to embed URL
  if (cleanUrl.includes("watch?v=")) {
    return cleanUrl.replace("watch?v=", "embed/");
  }

  if (cleanUrl.includes("youtu.be/")) {
    return cleanUrl.replace("youtu.be/", "www.youtube.com/embed/");
  }

  if (cleanUrl.includes("/live/")) {
    return cleanUrl.replace("/live/", "/embed/");
  }

  return cleanUrl;
};

const Live = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [liveText, setLiveText] = useState("");

  // Fallback video
  const sampleVideo = "https://www.youtube.com/embed/pmTrFgzGlJM";

  useEffect(() => {
    const fetchLiveVideo = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_API}/live`
        );

        if (!res.ok) return;

        const result = await res.json();
        const liveData = result?.data;

        if (Array.isArray(liveData) && liveData.length > 0) {
          // ✅ pick the latest UPDATED record
          const latestLive = liveData.reduce((latest, item) =>
            new Date(item.updatedAt) > new Date(latest.updatedAt)
              ? item
              : latest
          );

          // Paragraph text from backend title
          setLiveText(latestLive.title || "");

          // Video URL
          const embedUrl = getYoutubeEmbedUrl(latestLive.live_link);
          setVideoUrl(embedUrl);
        }
      } catch (error) {
        console.error("Failed to load live video:", error);
      }
    };

    fetchLiveVideo();
  }, []);

  const finalVideoUrl = videoUrl || sampleVideo;

  return (
    <main
      className="w-full flex flex-col min-h-screen bg-cover bg-center bg-no-repeat font-[Arial]"
      style={{
        backgroundImage: "url('/pictures/website BG Final.jpg')",
      }}
    >
      <div className="w-full flex flex-col items-center text-center px-4 pt-16 pb-10">
        {/* Static heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#004B52]">
          LIVE
        </h1>

        {/* Dynamic paragraph from backend title */}
        <p className="max-w-4xl mt-5 text-gray-800 text-base md:text-lg leading-relaxed font-semibold text-justify">
          {liveText}
        </p>

        {/* Video Card */}
        <div className="mt-10 bg-white rounded-3xl p-10 shadow-[0_0_20px_#00b3ff] border-2 border-[#00b3ff] max-w-2xl w-full">
          <div
  className="
    inline-flex
    items-center
    gap-2
    bg-red-600
    text-white
    px-4 py-2
    rounded-full
    text-xs
    font-bold
    uppercase
    tracking-wide
    mb-4
    self-start
  "
>
  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
  Live
</div>


          {videoUrl ? (
  <iframe
    className="w-full h-56 md:h-80 rounded-xl"
    src={videoUrl}
    title="YouTube Live Video"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
) : (
  <div className="w-full h-56 md:h-80 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
    <p className="text-gray-500 text-sm font-semibold">
      No live stream is available right now
    </p>
  </div>
)}

          <button
            onClick={() =>
              window.open(
                finalVideoUrl.replace("/embed/", "/watch?v="),
                "_blank"
              )
            }
            className="
              mt-6
              inline-flex
              items-center
              justify-center
              px-6 py-3
              bg-[#C7E8F3]
              text-[#004B52]
              font-semibold
              text-lg
              rounded-full
              shadow-md
              hover:bg-[#135668]
              hover:text-white
              transition-all
              duration-300
              mx-auto
            "
          >
            Click to Watch Live Stream
          </button>
        </div>
      </div>

    </main>
  );
};

export default Live;
