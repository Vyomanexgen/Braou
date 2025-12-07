import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";

const Live = () => {
  const [videoUrl, setVideoUrl] = useState("");

  // SAMPLE fallback video if backend gives no URL
  const sampleVideo = "https://www.youtube.com/embed/pmTrFgzGlJM";

  useEffect(() => {
    const fetchLiveVideo = async () => {
      try {
        const res = await fetch("https://your-backend-api.com/live-video");
        const data = await res.json();

        // If backend gives empty/undefined/null, fallback will be used
        setVideoUrl(data.videoUrl || "");
      } catch (error) {
        console.error("Failed to load live video:", error);
        // Leave videoUrl empty → fallback will load
      }
    };

    fetchLiveVideo();
  }, []);

  // Final URL to use everywhere
  const finalVideoUrl = videoUrl ? videoUrl : sampleVideo;

  return (
    <>
      <main
        className="w-full flex flex-col min-h-screen bg-cover bg-center bg-no-repeat font-[Arial]"
        style={{
          backgroundImage: "url('/pictures/website BG Final.jpg')",
        }}
      >
        {/* Top Content */}
        <div className="w-full flex flex-col items-center text-center px-4 pt-16 pb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#004B52]">
            LIVE
          </h1>

          <p className="max-w-4xl mt-5 text-gray-800 text-base md:text-lg leading-relaxed font-semibold text-justify">
            BRAOU conducts interactive live tele-conference programs every
            Thursday from 2-3 PM on different subjects. They are broadcast on
            the BRAOU YouTube channel and T-SAT NIPUNA. Students can clarify
            their doubts by calling <strong>040-23680456</strong>.
          </p>

          {/* CARD BOX */}
          <div
            className="
              mt-10 bg-white rounded-3xl p-10 
              shadow-[0_0_20px_#00b3ff] border-2 border-[#00b3ff]
              max-w-2xl w-full flex flex-col items-center
            "
          >
            {/* Live tag */}
            <div className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 self-start">
              <span className="w-3 h-3 bg-white rounded-full"></span>
              Live
            </div>

            {/* Video Embed */}
            <div className="w-full flex justify-center mb-6">
              <iframe
                className="w-full h-56 md:h-80 rounded-xl"
                src={finalVideoUrl}
                title="YouTube Live Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Redirect to YouTube */}
            <button
              onClick={() => window.open(finalVideoUrl, "_blank")}
              className="mt-2 bg-[#C7E8F3]
    text-[#004B52]
    font-semibold
    text-lg md:text-xl
    px-6 py-3
    rounded-full
    shadow-md
    hover:bg-[#135668]
    hover:shadow-lg
    hover:text-white
    transition-all
    duration-300
  "
            >
              Click to Watch Live Stream
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Live;
