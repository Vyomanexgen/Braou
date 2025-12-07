import React, { useEffect, useState, useRef } from "react";

const Events = () => {
  const [gallery, setGallery] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);
  const galleryRef = useRef(null);

  // Scroll gallery to index
  const scrollToIndex = (index) => {
    if (!galleryRef.current) return;
    const cardWidth = galleryRef.current.firstChild?.offsetWidth || 300;

    galleryRef.current.scrollTo({
      left: cardWidth * index,
      behavior: "smooth",
    });
  };

  const nextImage = () => {
    const maxIndex = Math.max(0, gallery.length - 3);
    const newIndex = Math.min(currentIndex + 1, maxIndex);
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const prevImage = () => {
    const newIndex = Math.max(currentIndex - 1, 0);
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  // Load API or fallback data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/events-data");
        const data = await res.json();

        setGallery(data.gallery || []);
        setEvents(data.events || []);
      } catch (error) {
        console.error("API Error:", error);

        // Fallback
        setGallery([
          "/pictures/event1.png",
          "/pictures/event2.png",
          "/pictures/event3.png",
          "/pictures/event4.png",
          "/pictures/event3.png",
          "/pictures/event2.png",
        ]);

        setEvents([
          {
            id: 1,
            title: "Sample Event 1",
            date: "August 25, 2025",
            img: "/pictures/event1.png",
          },
          {
            id: 2,
            title: "Sample Event 2",
            date: "August 26, 2025",
            img: "/pictures/event2.png",
          },
          {
            id: 3,
            title: "Sample Event 3",
            date: "August 27, 2025",
            img: "/pictures/event3.png",
          },
        ]);
      }

      setTimeout(() => setLoading(false), 300);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-full text-center py-20 text-xl text-[#00383D] font-[Arial]">
        Loading events...
      </div>
    );
  }

  const mainEvent = events[0] || {};
  const sideEvents = events.slice(1);

  return (
    <main
      className="w-full flex flex-col min-h-screen bg-cover bg-center bg-no-repeat font-[Arial]"
      style={{ backgroundImage: "url('/pictures/website BG Final.jpg')" }}
    >
      {/* PAGE TITLE */}
      <h1 className="text-center text-[32px] md:text-[40px] font-bold mt-10 text-[#00383D]">
        BRAOU EVENTS
      </h1>

      {/* ------------------ GALLERY HEADING ------------------ */}
      <div className="max-w-6xl mx-auto w-full px-4 flex justify-start items-center mt-8 mb-3">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#00383D]">
          Gallery
        </h2>
      </div>

      {/* ----------------- HORIZONTAL GALLERY ----------------- */}
      <div className="w-full max-w-6xl mx-auto px-4 relative">
        <button
          onClick={prevImage}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-[#00383D] text-white 
               px-3 py-2 rounded-full shadow-md z-10 hover:bg-[#025157] active:scale-90"
        >
          ←
        </button>

        <div
          ref={galleryRef}
          className="flex gap-4 overflow-hidden snap-x snap-mandatory"
        >
          {gallery.map((img, idx) => (
            <div
              key={idx}
              className="min-w-[100%] sm:min-w-[50%] md:min-w-[33.33%] snap-start"
            >
              <img
                src={img}
                alt={"Gallery " + idx}
                className="w-full h-[200px] md:h-[250px] object-cover rounded-lg"
              />
            </div>
          ))}
        </div>

        <button
          onClick={nextImage}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-[#00383D] text-white 
               px-3 py-2 rounded-full shadow-md z-10 hover:bg-[#025157] active:scale-90"
        >
          →
        </button>
      </div>

      {/* Bubble Indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: Math.max(1, gallery.length - 2) }).map(
          (_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx);
                scrollToIndex(idx);
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                currentIndex === idx ? "bg-[#00383D]" : "bg-gray-400"
              }`}
            />
          )
        )}
      </div>

      {/* ------------------ EVENTS TITLE + VIEW MORE ------------------ */}
      <div className="max-w-6xl mx-auto w-full px-4 flex justify-between items-center mt-12 mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#00383D]">
          Events
        </h2>

        {/* YOUTUBE REDIRECT BUTTON */}
        <a
          href="https://www.youtube.com/@BRAOUofficial"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2 bg-[#00383D] text-white rounded-full shadow-lg 
                     hover:bg-[#025157] active:scale-95"
        >
          View More →
        </a>
      </div>

      {/* ------------------ EVENTS GRID ------------------ */}
      <div className="w-full max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ---- MAIN EVENT ---- */}
        <div
          className="col-span-1 md:col-span-2 p-2 md:p-3 rounded-xl bg-white/10 backdrop-blur
                     transition-all duration-300 cursor-pointer
                     hover:scale-[1.01] active:scale-95 hover:shadow-lg hover:bg-white/20
                     h-3/5"
        >
          <img
            src={mainEvent.img}
            alt={mainEvent.title}
            className="w-full h-[220px] md:h-[280px] object-cover rounded-lg"
          />

          <div className="flex items-center gap-2 mt-2 text-[#00383D]">
            <span>🕒</span>
            <p>{mainEvent.date}</p>
          </div>

          <h3 className="font-semibold text-lg mt-1 text-[#00383D]">
            {mainEvent.title}
          </h3>

          <button className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 active:scale-95">
            Read More →
          </button>
        </div>

        {/* ---- SIDE EVENTS COLUMN ---- */}
        <div className="flex flex-col gap-6 pb-10">
          {sideEvents.map((ev) => (
            <div
              key={ev.id}
              className="p-4 rounded-xl bg-white/20 backdrop-blur
                         transition-all duration-300 cursor-pointer
                         hover:scale-[1.03] active:scale-95 hover:shadow-lg hover:bg-white/30"
            >
              <img
                src={ev.img}
                alt={ev.title}
                className="w-full h-[120px] object-cover rounded-lg"
              />

              <div className="flex items-center gap-2 mt-2 text-[#00383D]">
                <span>🕒</span>
                <p>{ev.date}</p>
              </div>

              <h3 className="font-semibold text-[#00383D]">{ev.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Events;
