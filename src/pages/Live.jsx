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
  
  // ✅ 1. Add Loading State
  const [loading, setLoading] = useState(true);

  // Fallback video
  const sampleVideo = "https://www.youtube.com/embed/pmTrFgzGlJM";

  useEffect(() => {
    const fetchLiveVideo = async () => {
      try {
        setLoading(true); // Ensure loading starts
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
      } finally {
        // ✅ 2. Stop Loading when API finishes (Success or Error)
        setLoading(false);
      }
    };

    fetchLiveVideo();
  }, []);

  const finalVideoUrl = videoUrl || sampleVideo;

  // ✅ 3. Show Loading Screen
  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
        <h2 className="text-2xl md:text-3xl font-bold text-[#004B52] animate-pulse">
          Loading LIVE page ...
        </h2>
      </div>
    );
  }

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