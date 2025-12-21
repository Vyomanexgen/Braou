// import React, { useEffect, useState, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { CalendarDays } from "lucide-react";
// const BASE_API = import.meta.env.VITE_BASE_API; // https://emrc-pi.vercel.app/api
// // We need a Base URL for images if they are stored locally like "uploads/..."
// // Usually, it is the root of your API domain (without /api). 
// // If your images break, verify where "uploads/" is served from.
// const IMAGE_BASE_URL = "https://emrc-pi.vercel.app"; 

// const GALLERY_API_URL = `${BASE_API}/braou/gallery`;
// const EVENTS_API_URL = `${BASE_API}/braou/events`;

// const Events = () => {
//   const [gallery, setGallery] = useState([]);
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   const [selectedEvent, setSelectedEvent] = useState(null); 
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const galleryRef = useRef(null);

//   // --- HELPER: Fix Image URLs ---
//   const getFullImageUrl = (path) => {
//     if (!path) return "https://placehold.co/600x400?text=No+Image";
//     // If it's already a full link (Supabase/S3), return it
//     if (path.startsWith("http") || path.startsWith("https")) {
//       return path;
//     }
//     // If it's a local upload (e.g., "uploads/events/image.png"), prepend domain
//     return `${IMAGE_BASE_URL}/${path}`;
//   };

//   // --- SCROLL LOGIC ---
//   const scrollToIndex = (index) => {
//     if (!galleryRef.current) return;
//     const cardWidth = galleryRef.current.firstChild?.offsetWidth || 300;
//     galleryRef.current.scrollTo({ left: cardWidth * index, behavior: "smooth" });
//   };

//   const nextImage = () => {
//     if (gallery.length === 0) return;
//     const maxIndex = Math.max(0, gallery.length - 1);
//     const newIndex = Math.min(currentIndex + 1, maxIndex);
//     setCurrentIndex(newIndex);
//     scrollToIndex(newIndex);
//   };

//   const prevImage = () => {
//     if (gallery.length === 0) return;
//     const newIndex = Math.max(currentIndex - 1, 0);
//     setCurrentIndex(newIndex);
//     scrollToIndex(newIndex);
//   };

//   // --- API FETCH ---
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);

//         const [galleryRes, eventsRes] = await Promise.all([
//             fetch(GALLERY_API_URL).catch(err => null),
//             fetch(EVENTS_API_URL).catch(err => null)
//         ]);

//         // 1. Process Gallery
//         if (galleryRes && galleryRes.ok) {
//             const gData = await galleryRes.json();
//             if (Array.isArray(gData.data)) {
//                 // Check if backend sends 'image' or 'image_url' for gallery too
//                 const images = gData.data.map(item => getFullImageUrl(item.image || item.image_url)).filter(Boolean);
//                 setGallery(images);
//             }
//         }

//         // 2. Process Events
//         if (eventsRes && eventsRes.ok) {
//             const eData = await eventsRes.json();
            
//             // Log data to console to verify
//             console.log("Events Data from Backend:", eData);

//             if (Array.isArray(eData.data)) {
//                 const formattedEvents = eData.data.map(evt => ({
//                     id: evt._id,
//                     title: evt.event_name,       // ✅ Correct
//                     date: evt.date,              // ✅ Correct
//                     img: getFullImageUrl(evt.image_url), // ✅ FIXED: changed evt.image to evt.image_url
//                     content: evt.content         // ✅ Correct
//                 }));
//                 setEvents(formattedEvents);
//             }
//         }

//       } catch (error) {
//         console.error("API Error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
//         <h2 className="text-2xl md:text-3xl font-bold text-[#00383D] animate-pulse">
//           Loading Events ...
//         </h2>
//       </div>
//     );
//   }

//   const mainEvent = events.length > 0 ? events[0] : null;
//   const sideEvents = events.length > 1 ? events.slice(1) : [];

//   return (
//     <main
//       className="w-full flex flex-col min-h-screen bg-cover bg-center bg-no-repeat font-[Arial]"
//       style={{ backgroundImage: "url('/pictures/website BG Final.jpg')" }}
//     >
//       <h1 className="text-center text-[32px] md:text-[40px] font-bold mt-10 text-[#00383D]">
//         BRAOU EVENTS
//       </h1>

//       {/* --- GALLERY SECTION --- */}
//       <div className="max-w-6xl mx-auto w-full px-4 mt-8 mb-3">
//         <h2 className="text-2xl md:text-3xl font-semibold text-[#00383D]">Gallery</h2>
//       </div>

//       <div className="w-full max-w-6xl mx-auto px-4 relative">
//         {gallery.length > 0 ? (
//             <>
//                 <button onClick={prevImage} className="absolute left-6 top-1/2 -translate-y-1/2 bg-[#00383D] text-white px-3 py-2 rounded-full shadow-md z-10 hover:bg-[#025157]">←</button>
//                 <div ref={galleryRef} className="flex gap-4 overflow-hidden snap-x snap-mandatory pb-4">
//                 {gallery.map((imgUrl, idx) => (
//                     <div key={idx} className="min-w-[100%] sm:min-w-[50%] md:min-w-[33.33%] snap-start flex-shrink-0">
//                     <img src={imgUrl} alt="Gallery" className="w-full h-[200px] md:h-[250px] object-cover rounded-lg border shadow-sm" onError={(e) => e.target.style.display = 'none'} />
//                     </div>
//                 ))}
//                 </div>
//                 <button onClick={nextImage} className="absolute right-6 top-1/2 -translate-y-1/2 bg-[#00383D] text-white px-3 py-2 rounded-full shadow-md z-10 hover:bg-[#025157]">→</button>
//             </>
//         ) : (
//             <p className="text-center text-gray-500 italic">No gallery images found.</p>
//         )}
//       </div>

//       {/* --- EVENTS SECTION --- */}
//       <div className="max-w-6xl mx-auto w-full px-4 flex justify-between items-center mt-12 mb-6">
//         <h2 className="text-2xl md:text-3xl font-semibold text-[#00383D]">Events</h2>
//         <a href="https://www.youtube.com/@BRAOUofficial" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-[#00383D] text-white rounded-full shadow-lg hover:bg-[#025157]">View More →</a>
//       </div>

//       <div className="w-full max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 pb-20">
        
//         {/* Main Event */}
//         {mainEvent ? (
//             <div onClick={() => setSelectedEvent(mainEvent)} className="col-span-1 md:col-span-2 p-3 rounded-xl bg-white/30 backdrop-blur-md border border-white/40 shadow-xl cursor-pointer hover:scale-[1.01] hover:bg-white/40 transition-all">
//                 <img src={mainEvent.img} alt={mainEvent.title} className="w-full h-[220px] md:h-[350px] object-cover rounded-lg" onError={(e) => e.target.src = "https://placehold.co/600x400?text=No+Image"} />
//                 <div className="flex items-center gap-2 mt-4 text-[#00383D] font-medium">
//                     <CalendarDays className="w-4 h-4 text-[#00383D]" /><p>{new Date(mainEvent.date).toLocaleDateString()}</p>
//                 </div>
//                 <h3 className="font-bold text-xl md:text-2xl mt-2 text-[#00383D]">{mainEvent.title}</h3>
//                 <p className="mt-2 text-gray-800 line-clamp-2">{mainEvent.content}</p>
//                 <button className="mt-4 px-5 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700">Read More →</button>
//             </div>
//         ) : (
//             <div className="col-span-1 md:col-span-2 flex items-center justify-center bg-white/20 rounded-xl h-[300px]"><p className="text-[#00383D] font-bold">No upcoming events found.</p></div>
//         )}

//         {/* Side Events */}
//         <div className="flex flex-col gap-4">
//           {sideEvents.length > 0 ? (
//             sideEvents.map((ev) => (
//                 <div key={ev.id} onClick={() => setSelectedEvent(ev)} className="flex gap-3 p-3 rounded-xl bg-white/30 backdrop-blur-md border border-white/40 cursor-pointer shadow-lg hover:scale-[1.03] hover:bg-white/50 transition-all">
//                     <img src={ev.img} alt={ev.title} className="w-[100px] h-[80px] object-cover rounded-lg flex-shrink-0" onError={(e) => e.target.src = "https://placehold.co/100x100?text=No+Image"} />
//                     <div className="flex flex-col justify-center">
//                         <div className="flex items-center gap-1 text-xs text-[#00383D] font-semibold mb-1"><CalendarDays className="w-4 h-4 text-[#00383D]" /><p>{new Date(ev.date).toLocaleDateString()}</p></div>
//                         <h3 className="font-bold text-sm text-[#00383D] line-clamp-2">{ev.title}</h3>
//                     </div>
//                 </div>
//             ))
//           ) : (
//              <p className="text-center text-gray-500 mt-10">No other events.</p>
//           )}
//         </div>
//       </div>

//       {/* Modal */}
//       <AnimatePresence>
//         {selectedEvent && (
//             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setSelectedEvent(null)}>
//                 <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto p-6 shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
//                     <button onClick={() => setSelectedEvent(null)} className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl">✕</button>
//                     <img src={selectedEvent.img} className="w-full h-48 object-cover rounded-lg mb-4" />
//                     <h2 className="text-2xl font-bold text-[#00383D] mb-2">{selectedEvent.title}</h2>
//                     <p className="text-gray-500 text-sm mb-4">{new Date(selectedEvent.date).toLocaleDateString()}</p>
//                     <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{selectedEvent.content}</p>
//                 </motion.div>
//             </motion.div>
//         )}
//       </AnimatePresence>
//     </main>
//   );
// };

// export default Events;



// import React, { useEffect, useState, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { CalendarDays } from "lucide-react";

// const BASE_API = import.meta.env.VITE_BASE_API; 
// const IMAGE_BASE_URL = "https://emrc-pi.vercel.app"; 

// const GALLERY_API_URL = `${BASE_API}/braou/gallery`;
// const EVENTS_API_URL = `${BASE_API}/braou/events`;

// const Events = () => {
//   const [gallery, setGallery] = useState([]);
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   // ✅ State for modals
//   const [selectedEvent, setSelectedEvent] = useState(null); 
//   const [selectedGalleryImage, setSelectedGalleryImage] = useState(null); // New state for gallery modal

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const galleryRef = useRef(null);

//   // --- HELPER: Fix Image URLs ---
//   const getFullImageUrl = (path) => {
//     if (!path) return "https://placehold.co/600x400?text=No+Image";
//     if (path.startsWith("http") || path.startsWith("https")) {
//       return path;
//     }
//     return `${IMAGE_BASE_URL}/${path}`;
//   };

//   // --- SCROLL LOGIC ---
//   const scrollToIndex = (index) => {
//     if (!galleryRef.current) return;
//     const cardWidth = galleryRef.current.firstChild?.offsetWidth || 300;
//     galleryRef.current.scrollTo({ left: cardWidth * index, behavior: "smooth" });
//   };

//   const nextImage = () => {
//     if (gallery.length === 0) return;
//     const maxIndex = Math.max(0, gallery.length - 1);
//     const newIndex = Math.min(currentIndex + 1, maxIndex);
//     setCurrentIndex(newIndex);
//     scrollToIndex(newIndex);
//   };

//   const prevImage = () => {
//     if (gallery.length === 0) return;
//     const newIndex = Math.max(currentIndex - 1, 0);
//     setCurrentIndex(newIndex);
//     scrollToIndex(newIndex);
//   };

//   // --- API FETCH ---
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);

//         const [galleryRes, eventsRes] = await Promise.all([
//             fetch(GALLERY_API_URL).catch(err => null),
//             fetch(EVENTS_API_URL).catch(err => null)
//         ]);

//         // Process Gallery
//         if (galleryRes && galleryRes.ok) {
//             const gData = await galleryRes.json();
//             if (Array.isArray(gData.data)) {
//                 const images = gData.data.map(item => getFullImageUrl(item.image || item.image_url)).filter(Boolean);
//                 setGallery(images);
//             }
//         }

//         // Process Events
//         if (eventsRes && eventsRes.ok) {
//             const eData = await eventsRes.json();
//             if (Array.isArray(eData.data)) {
//                 const formattedEvents = eData.data.map(evt => ({
//                     id: evt._id,
//                     title: evt.event_name,
//                     date: evt.date, 
//                     img: getFullImageUrl(evt.image_url),
//                     content: evt.content
//                 }));
//                 // Sort by date, newest first
//                 formattedEvents.sort((a, b) => new Date(b.date) - new Date(a.date));
//                 setEvents(formattedEvents);
//             }
//         }

//       } catch (error) {
//         console.error("API Error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
//         <h2 className="text-2xl md:text-3xl font-bold text-[#00383D] animate-pulse">
//           Loading Events Page ...
//         </h2>
//       </div>
//     );
//   }

//   const mainEvent = events.length > 0 ? events[0] : null;
//   const sideEvents = events.length > 1 ? events.slice(1) : [];

//   return (
//     <main
//       className="w-full flex flex-col min-h-screen bg-cover bg-center bg-no-repeat font-[Arial]"
//       style={{ backgroundImage: "url('/pictures/website BG Final.jpg')" }}
//     >
//       <h1 className="text-center text-[32px] md:text-[40px] font-bold mt-10 text-[#00383D]">
//         BRAOU EVENTS
//       </h1>

//       {/* --- GALLERY SECTION --- */}
//       <div className="max-w-6xl mx-auto w-full px-4 mt-8 mb-3">
//         <h2 className="text-2xl md:text-3xl font-semibold text-[#00383D]">Gallery</h2>
//       </div>

//       <div className="w-full max-w-6xl mx-auto px-4 relative">
//         {gallery.length > 0 ? (
//             <>
//                 <button onClick={prevImage} className="absolute left-6 top-1/2 -translate-y-1/2 bg-[#00383D] text-white px-3 py-2 rounded-full shadow-md z-10 hover:bg-[#025157] transition-all">←</button>
                
//                 <div ref={galleryRef} className="flex gap-4 overflow-hidden snap-x snap-mandatory pb-4">
//                 {gallery.map((imgUrl, idx) => (
//                     <div key={idx} className="min-w-[100%] sm:min-w-[50%] md:min-w-[33.33%] snap-start flex-shrink-0">
//                     <img 
//                         src={imgUrl} 
//                         alt={"Gallery Image " + (idx + 1)} 
//                         // ✅ Added onClick and cursor-pointer
//                         onClick={() => setSelectedGalleryImage(imgUrl)}
//                         className="w-full h-[200px] md:h-[250px] object-cover rounded-lg border shadow-sm cursor-pointer hover:opacity-95 transition-opacity" 
//                         onError={(e) => e.target.style.display = 'none'} 
//                     />
//                     </div>
//                 ))}
//                 </div>

//                 <button onClick={nextImage} className="absolute right-6 top-1/2 -translate-y-1/2 bg-[#00383D] text-white px-3 py-2 rounded-full shadow-md z-10 hover:bg-[#025157] transition-all">→</button>
//             </>
//         ) : (
//             <p className="text-center text-gray-500 italic">No gallery images found.</p>
//         )}
//       </div>

//       {/* --- EVENTS SECTION --- */}
//       <div className="max-w-6xl mx-auto w-full px-4 flex justify-between items-center mt-12 mb-6">
//         <h2 className="text-2xl md:text-3xl font-semibold text-[#00383D]">Events</h2>
//         <a href="https://www.youtube.com/@BRAOUofficial" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-[#00383D] text-white rounded-full shadow-lg hover:bg-[#025157] transition-all">View More →</a>
//       </div>

//       <div className="w-full max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 pb-20">
        
//         {/* Main Event */}
//         {mainEvent ? (
//             <div onClick={() => setSelectedEvent(mainEvent)} className="col-span-1 md:col-span-2 p-3 rounded-xl bg-white/30 backdrop-blur-md border border-white/40 shadow-xl cursor-pointer hover:scale-[1.01] hover:bg-white/40 transition-all">
//                 <img src={mainEvent.img} alt={mainEvent.title} className="w-full h-[220px] md:h-[350px] object-cover rounded-lg" onError={(e) => e.target.src = "https://placehold.co/600x400?text=No+Image"} />
//                 <div className="flex items-center gap-2 mt-4 text-[#00383D] font-medium">
//                     <CalendarDays className="w-4 h-4" /><p>{new Date(mainEvent.date).toLocaleDateString()}</p>
//                 </div>
//                 <h3 className="font-bold text-xl md:text-2xl mt-2 text-[#00383D]">{mainEvent.title}</h3>
//                 <p className="mt-2 text-gray-800 line-clamp-2">{mainEvent.content}</p>
//                 <button className="mt-4 px-5 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-all">Read More →</button>
//             </div>
//         ) : (
//             <div className="col-span-1 md:col-span-2 flex items-center justify-center bg-white/20 rounded-xl h-[300px]"><p className="text-[#00383D] font-bold">No upcoming events found.</p></div>
//         )}

//         {/* Side Events */}
//         <div className="flex flex-col gap-4">
//           {sideEvents.length > 0 ? (
//             sideEvents.map((ev) => (
//                 <div key={ev.id} onClick={() => setSelectedEvent(ev)} className="flex gap-3 p-3 rounded-xl bg-white/30 backdrop-blur-md border border-white/40 cursor-pointer shadow-lg hover:scale-[1.03] hover:bg-white/50 transition-all">
//                     <img src={ev.img} alt={ev.title} className="w-[100px] h-[80px] object-cover rounded-lg flex-shrink-0" onError={(e) => e.target.src = "https://placehold.co/100x100?text=No+Image"} />
//                     <div className="flex flex-col justify-center">
//                         <div className="flex items-center gap-1 text-xs text-[#00383D] font-semibold mb-1">
//                             <CalendarDays className="w-3 h-3" />
//                             <p>{new Date(ev.date).toLocaleDateString()}</p>
//                         </div>
//                         <h3 className="font-bold text-sm text-[#00383D] line-clamp-2">{ev.title}</h3>
//                     </div>
//                 </div>
//             ))
//           ) : (
//              <p className="text-center text-gray-500 mt-10">No other events.</p>
//           )}
//         </div>
//       </div>

//       {/* Modals */}
//       <AnimatePresence>
//         {/* Event Read More Modal */}
//         {selectedEvent && (
//             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setSelectedEvent(null)}>
//                 <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto p-6 shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
//                     <button onClick={() => setSelectedEvent(null)} className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl transition-colors">✕</button>
//                     <img src={selectedEvent.img} alt={selectedEvent.title} className="w-full h-48 object-cover rounded-lg mb-4" />
//                     <h2 className="text-2xl font-bold text-[#00383D] mb-2">{selectedEvent.title}</h2>
//                     <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
//                         <CalendarDays className="w-4 h-4" />
//                         <p>{new Date(selectedEvent.date).toLocaleDateString()}</p>
//                     </div>
//                     <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{selectedEvent.content}</p>
//                 </motion.div>
//             </motion.div>
//         )}

//         {/* ✅ New Gallery Image Modal */}
//         {selectedGalleryImage && (
//             <motion.div 
//                 initial={{ opacity: 0 }} 
//                 animate={{ opacity: 1 }} 
//                 exit={{ opacity: 0 }} 
//                 className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" 
//                 onClick={() => setSelectedGalleryImage(null)}
//             >
//                 <motion.div 
//                     initial={{ scale: 0.8 }} 
//                     animate={{ scale: 1 }} 
//                     exit={{ scale: 0.8 }} 
//                     className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center" 
//                     onClick={(e) => e.stopPropagation()}
//                 >
//                     <button onClick={() => setSelectedGalleryImage(null)} className="absolute -top-10 right-0 text-white hover:text-gray-300 text-3xl transition-colors">✕</button>
//                     <img src={selectedGalleryImage} alt="Gallery Fullscreen" className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" />
//                 </motion.div>
//             </motion.div>
//         )}
//       </AnimatePresence>
//     </main>
//   );
// };

// export default Events;


import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom"; 

const BASE_API = import.meta.env.VITE_BASE_API; 
const IMAGE_BASE_URL = "https://emrc-pi.vercel.app"; 

const GALLERY_API_URL = `${BASE_API}/braou/gallery`;
const EVENTS_API_URL = `${BASE_API}/braou/events`;
const DEFAULT_GALLERY_IMAGES = [
  "https://placehold.co/600x400?text=Gallery+Image+1",
  "https://placehold.co/600x400?text=Gallery+Image+2",
  "https://placehold.co/600x400?text=Gallery+Image+3",
  "https://placehold.co/600x400?text=Gallery+Image+4",
  "https://placehold.co/600x400?text=Gallery+Image+5",
  "https://placehold.co/600x400?text=Gallery+Image+6",
];


const Events = () => {
  const navigate = useNavigate();
  const [gallery, setGallery] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const galleryRef = useRef(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
useEffect(() => {
  console.log("VITE_BASE_API =", import.meta.env.VITE_BASE_API);
}, []);


  const getFullImageUrl = (path) => {
    if (!path) return "https://placehold.co/600x400?text=No+Image";
    if (path.startsWith("http") || path.startsWith("https")) {
      return path;
    }
    return `${IMAGE_BASE_URL}/${path}`;
  };

  const scrollToIndex = (index) => {
    if (!galleryRef.current) return;
    const cardWidth = galleryRef.current.firstChild?.offsetWidth || 300;
    galleryRef.current.scrollTo({ left: cardWidth * index, behavior: "smooth" });
  };

  const nextImage = () => {
    if (gallery.length === 0) return;
    const maxIndex = Math.max(0, gallery.length - 1);
    const newIndex = Math.min(currentIndex + 1, maxIndex);
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const prevImage = () => {
    if (gallery.length === 0) return;
    const newIndex = Math.max(currentIndex - 1, 0);
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [galleryRes, eventsRes] = await Promise.all([
            fetch(GALLERY_API_URL).catch(err => null),
            fetch(EVENTS_API_URL).catch(err => null)
        ]);

       if (galleryRes && galleryRes.ok) {
  const gData = await galleryRes.json();

  if (Array.isArray(gData.data)) {
    const images = gData.data
      .map(item => getFullImageUrl(item.image || item.image_url))
      .filter(Boolean)
      .slice(0, 6);

    if (images.length > 0) {
      setGallery(images);
    } else {
      setGallery(DEFAULT_GALLERY_IMAGES);
    }
  } else {
    setGallery(DEFAULT_GALLERY_IMAGES);
  }
} else {
  setGallery(DEFAULT_GALLERY_IMAGES);
}


        if (eventsRes && eventsRes.ok) {
            const eData = await eventsRes.json();
            if (Array.isArray(eData.data)) {
                const formattedEvents = eData.data.map(evt => ({
                    id: evt._id,
                    title: evt.event_name,
                    date: evt.date, 
                    img: getFullImageUrl(evt.image_url),
                    content: evt.content,
                    eventLink: evt.event_link || "" 
                }));
                
                // formattedEvents.sort((a, b) => {
                //     const hasLinkA = a.eventLink ? 1 : 0;
                //     const hasLinkB = b.eventLink ? 1 : 0;
                //     if (hasLinkB !== hasLinkA) return hasLinkB - hasLinkA;
                //     return new Date(b.date) - new Date(a.date);
                // });

                formattedEvents.sort(
  (a, b) => new Date(b.date) - new Date(a.date)
);


                setEvents(formattedEvents.slice(0, 4));

            }
        }

      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleReadMore = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
        <h2 className="text-2xl md:text-3xl font-bold text-[#00383D] animate-pulse">
          Loading Events Page ...
        </h2>
      </div>
    );
  }

  const mainEvent = events.length > 0 ? events[0] : null;
  const sideEvents = events.length > 1 ? events.slice(1, 4) : [];


  return (
    <main
      className="w-full flex flex-col min-h-screen bg-cover bg-center bg-no-repeat font-[Arial]"
      style={{ backgroundImage: "url('/pictures/website BG Final.jpg')" }}
    >
      <h1 className="text-center text-[32px] md:text-[40px] font-bold mt-10 text-[#00383D]">
        BRAOU EVENTS
      </h1>

      {/* --- GALLERY SECTION --- */}
      <div className="max-w-6xl mx-auto w-full px-4 mt-8 mb-3">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#00383D]">Gallery</h2>
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 relative">
        {gallery.length > 0 ? (
            <>
                <button onClick={prevImage} className="absolute left-6 top-1/2 -translate-y-1/2 bg-[#00383D] text-white px-3 py-2 rounded-full shadow-md z-10 hover:bg-[#025157] transition-all">←</button>
                <div ref={galleryRef} className="flex gap-4 overflow-hidden snap-x snap-mandatory pb-4">
                {gallery.map((imgUrl, idx) => (
                    <div key={idx} className="min-w-[100%] sm:min-w-[50%] md:min-w-[33.33%] snap-start flex-shrink-0">
                    <img 
                        src={imgUrl} 
                        alt={"Gallery " + idx} 
                        onClick={() => setSelectedGalleryImage(imgUrl)}
                        className="w-full h-[200px] md:h-[250px] object-cover rounded-lg border shadow-sm cursor-pointer hover:opacity-95 transition-opacity" 
                        onError={(e) => e.target.style.display = 'none'} 
                    />
                    </div>
                ))}
                </div>
                <button onClick={nextImage} className="absolute right-6 top-1/2 -translate-y-1/2 bg-[#00383D] text-white px-3 py-2 rounded-full shadow-md z-10 hover:bg-[#025157] transition-all">→</button>
            </>
        ) : (
            <p className="text-center text-gray-500 italic">No gallery images found.</p>
        )}
      </div>

      {/* --- EVENTS SECTION --- */}
      <div className="max-w-6xl mx-auto w-full px-4 flex justify-between items-center mt-12 mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#00383D]">Events</h2>
        <a href="https://www.youtube.com/@BRAOUofficial" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-[#00383D] text-white rounded-full shadow-lg hover:bg-[#025157] transition-all">View More →</a>
      </div>

      {/* ✅ RESTORED GRID: Back to 3 columns so main card is wide */}
      <div className="w-full max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 pb-20">
        
        {/* Main Event: Reduced Height but Wide */}
        {mainEvent ? (
            // <div className="col-span-1 md:col-span-2 p-3 rounded-xl bg-white/30 backdrop-blur-md border border-white/40 shadow-xl flex flex-col transition-all hover:scale-[1.01] hover:bg-white/40">
            <div
  onClick={() => setSelectedEvent(mainEvent)}
  className="cursor-pointer col-span-1 md:col-span-2 p-3 rounded-xl bg-white/30 backdrop-blur-md border border-white/40 shadow-xl flex flex-col transition-all hover:scale-[1.01] hover:bg-white/40"
>

                {/* ✅ Reduced Image Height: h-[250px] instead of h-[350px] */}
                <img src={mainEvent.img} alt={mainEvent.title} className="w-full h-[200px] md:h-[250px] object-cover rounded-lg" onError={(e) => e.target.src = "https://placehold.co/600x400?text=No+Image"} />
                
                <div className="flex items-center gap-2 mt-3 text-[#00383D] font-medium text-sm">
                    <CalendarDays className="w-4 h-4" /><p>{new Date(mainEvent.date).toLocaleDateString()}</p>
                </div>

                <h3 className="font-bold text-lg md:text-xl mt-1 text-[#00383D] leading-tight">{mainEvent.title}</h3>
                
                {/* Reduced margin and clamping lines to save height */}
                <p className="mt-2 text-gray-800 text-sm line-clamp-3 flex-grow">{mainEvent.content}</p>
                
                {/* <button onClick={() => handleReadMore(mainEvent.id)} className="mt-3 self-start px-4 py-2 bg-red-600 text-white font-bold text-sm rounded-lg hover:bg-red-700 transition-all shadow-md">Read More →</button> */}
                <button
  onClick={(e) => {
    e.stopPropagation();
    handleReadMore(mainEvent.id);
  }}
  className="mt-3 self-start px-4 py-2 bg-red-600 text-white font-bold text-sm rounded-lg hover:bg-red-700 transition-all shadow-md"
>
  Read More →
</button>

            </div>
        ) : (
            <div className="col-span-1 md:col-span-2 flex items-center justify-center bg-white/20 rounded-xl h-[300px]"><p className="text-[#00383D] font-bold">No upcoming events found.</p></div>
        )}

        {/* Side Events */}
        <div className="flex flex-col gap-4">
          {sideEvents.length > 0 ? (
            sideEvents.map((ev) => (
               <div
  key={ev.id}
  onClick={() => setSelectedEvent(ev)}
  className="cursor-pointer flex flex-col p-3 rounded-xl bg-white/30 backdrop-blur-md border border-white/40 shadow-lg transition-all hover:scale-[1.02] hover:bg-white/50"
>

                    <div className="flex gap-3 mb-3">
                        <img src={ev.img} alt={ev.title} className="w-[80px] h-[60px] object-cover rounded-lg flex-shrink-0" onError={(e) => e.target.src = "https://placehold.co/100x100?text=No+Image"} />
                        <div className="flex flex-col justify-center">
                            <div className="flex items-center gap-1 text-xs text-[#00383D] font-semibold mb-1">
                                <CalendarDays className="w-3 h-3" />
                                <p>{new Date(ev.date).toLocaleDateString()}</p>
                            </div>
                            <h3 className="font-bold text-sm text-[#00383D] line-clamp-2">{ev.title}</h3>
                        </div>
                    </div>
                    <button onClick={() => handleReadMore(ev.id)} className="self-end px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700 transition-all shadow-sm">Read More →</button>
                </div>
            ))
          ) : (
             <p className="text-center text-gray-500 mt-10">No other events.</p>
          )}
        </div>
      </div>

      {/* Gallery Modal */}
      <AnimatePresence>
        {selectedGalleryImage && (
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" 
                onClick={() => setSelectedGalleryImage(null)}
            >
                <motion.div 
                    initial={{ scale: 0.8 }} 
                    animate={{ scale: 1 }} 
                    exit={{ scale: 0.8 }} 
                    className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center" 
                    onClick={(e) => e.stopPropagation()}
                >
                    <button onClick={() => setSelectedGalleryImage(null)} className="absolute -top-10 right-0 text-white hover:text-gray-300 text-3xl transition-colors">✕</button>
                    <img src={selectedGalleryImage} alt="Gallery Fullscreen" className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" />
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
  {selectedEvent && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={() => setSelectedEvent(null)}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white max-w-2xl w-full rounded-xl shadow-2xl p-6 relative"
      >
        {/* Close */}
        <button
          onClick={() => setSelectedEvent(null)}
          className="absolute top-3 right-3 text-2xl text-gray-600 hover:text-black"
        >
          ✕
        </button>

        {/* Image */}
        <img
          src={selectedEvent.img}
          alt={selectedEvent.title}
          className="w-full h-[220px] object-cover rounded-lg mb-4"
        />

        {/* Date */}
        <div className="flex items-center gap-2 text-sm text-[#00383D] font-semibold mb-2">
          <CalendarDays className="w-4 h-4" />
          <span>{new Date(selectedEvent.date).toLocaleDateString()}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-[#00383D] mb-3">
          {selectedEvent.title}
        </h3>

        {/* Content */}
        <p className="text-gray-800 text-sm leading-relaxed max-h-[200px] overflow-y-auto">
          {selectedEvent.content}
        </p>

        {/* Action */}
        <div className="mt-5 text-right">
          <button
            onClick={() => handleReadMore(selectedEvent.id)}
            className="px-5 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-all"
          >
            Read Full Event →
          </button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </main>
  );
};

export default Events;