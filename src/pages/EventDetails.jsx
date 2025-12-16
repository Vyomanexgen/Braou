import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CalendarDays, ExternalLink, Link as LinkIcon, ArrowLeft } from "lucide-react";

const BASE_API = import.meta.env.VITE_BASE_API; 
const IMAGE_BASE_URL = "https://emrc-pi.vercel.app"; 

const EventDetails = () => {
  const { id } = useParams(); // Get event ID from URL
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- HELPER: Fix Image URLs ---
  const getFullImageUrl = (path) => {
    if (!path) return "https://placehold.co/600x400?text=No+Image";
    if (path.startsWith("http") || path.startsWith("https")) {
      return path;
    }
    return `${IMAGE_BASE_URL}/${path}`;
  };

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setLoading(true);
        // Fetch all events and find the one matching the ID
        // (Optimally, your API should have an endpoint like /braou/events/:id)
        const res = await fetch(`${BASE_API}/braou/events`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.data)) {
            const foundEvent = data.data.find((evt) => evt._id === id);
            if (foundEvent) {
              setEvent({
                id: foundEvent._id,
                title: foundEvent.event_name,
                date: foundEvent.date,
                img: getFullImageUrl(foundEvent.image_url),
                content: foundEvent.content,
                eventLink: foundEvent.event_link || ""
              });
            }
          }
        }
      } catch (error) {
        console.error("Failed to load event details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold text-[#00383D] animate-pulse">
          Loading Event Details...
        </h2>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
        <h2 className="text-2xl font-bold text-red-600">Event Not Found</h2>
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#00383D] font-semibold hover:underline">
          <ArrowLeft size={20} /> Go Back
        </button>
      </div>
    );
  }

  return (
    <main
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat font-[Arial] py-10 px-4 flex justify-center items-center"
      style={{ backgroundImage: "url('/pictures/website BG Final.jpg')" }}
    >
      <div className="bg-white/40 backdrop-blur-md rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden border border-white/50">
        
        {/* Back Button */}
        <div className="p-6 pb-0">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#00383D] font-bold hover:underline transition-all">
                <ArrowLeft size={24} /> Back to Events
            </button>
        </div>

        {/* Large Image */}
        <div className="w-full h-[300px] md:h-[450px] p-6">
            <img src={event.img} alt={event.title} className="w-full h-full object-cover rounded-2xl shadow-lg" />
        </div>

        {/* Content Section */}
        <div className="p-8 pt-2">
            <div className="flex items-center gap-2 text-[#00383D] font-semibold mb-3">
                <CalendarDays className="w-5 h-5" />
                <p className="text-lg">{new Date(event.date).toLocaleDateString()}</p>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-[#00383D] mb-6 leading-tight">{event.title}</h1>
            
            <p className="text-gray-800 text-lg whitespace-pre-wrap leading-relaxed mb-10">
                {event.content}
            </p>

            {/* Open Link Button */}
            {event.eventLink ? (
                <a 
                    href={event.eventLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-[#00383D] text-white font-bold text-xl rounded-full hover:bg-[#025157] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                    Open Link <ExternalLink size={20} />
                </a>
            ) : (
                <button 
                    disabled 
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gray-300 text-gray-500 font-bold text-xl rounded-full cursor-not-allowed shadow-inner"
                >
                    No Link Available <LinkIcon size={20} />
                </button>
            )}
        </div>
      </div>
    </main>
  );
};

export default EventDetails;