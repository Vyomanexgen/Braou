import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";

const Navbar = () => {
const DEFAULT_MEDIA_LINKS = {
  youtube: "https://www.youtube.com/@BRAOUOfficial",
  webradio: "https://example-webradio-url.com",
  vidyagani: "https://vidyagani.braou.ac.in/",
};

  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();

const YOUTUBE_API_URL = `${import.meta.env.VITE_BASE_API}/youtube/`;
const VIDYAGANI_API_URL = `${import.meta.env.VITE_BASE_API}/vidyagani`;
const WEBRADIO_API_URL = `${import.meta.env.VITE_BASE_API}/web-radio/`;


  const navItems = [

    { name: "Home", path: "/home" },

    { name: "About", path: "/about" },

    { name: "Live", path: "/live" },

    { name: "Youtube (EMR&RC)", path: "/youtube" },

    { name: "Web Radio", path: "/webradio" },

    { name: "Vidyagani", path: "/vidyagani" },

    { name: "T-SAT Vidya/Nipuna", path: "/tsat" },

    { name: "AIR", path: "/air" },

    { name: "BRAOU Events", path: "/events" },

  ];
const [mediaLinks, setMediaLinks] = useState(DEFAULT_MEDIA_LINKS);



const externalLinks = {
  "Youtube (EMR&RC)": mediaLinks.youtube,
  "Web Radio": mediaLinks.webradio,
  "Vidyagani": mediaLinks.vidyagani,
};

useEffect(() => {
  const fetchMediaLinks = async () => {
    try {
      const [ytRes, vgRes, wrRes] = await Promise.all([
        fetch(YOUTUBE_API_URL),
        fetch(VIDYAGANI_API_URL),
        fetch(WEBRADIO_API_URL),
      ]);

      const ytJson = await ytRes.json();
      const vgJson = await vgRes.json();
      const wrJson = await wrRes.json();

      const latestYoutube =
        Array.isArray(ytJson?.data) && ytJson.data.length > 0
          ? ytJson.data[ytJson.data.length - 1].youtube_link
          : DEFAULT_MEDIA_LINKS.youtube;

      const latestVidyagani =
        Array.isArray(vgJson?.data) && vgJson.data.length > 0
          ? vgJson.data[vgJson.data.length - 1].vidyagani_link
          : DEFAULT_MEDIA_LINKS.vidyagani;

      const latestWebRadio =
        Array.isArray(wrJson?.data) && wrJson.data.length > 0
          ? wrJson.data[wrJson.data.length - 1].web_radio_link
          : DEFAULT_MEDIA_LINKS.webradio;

      setMediaLinks({
        youtube: latestYoutube,
        vidyagani: latestVidyagani,
        webradio: latestWebRadio,
      });

      console.log("Navbar media links:", {
        youtube: latestYoutube,
        vidyagani: latestVidyagani,
        webradio: latestWebRadio,
      });
      
    } catch (err) {
      console.error("Navbar media link fetch failed", err);
    }
  };

  fetchMediaLinks();
}, []);


  const isActive = (path) => location.pathname === path;



  const sidebarVariants = {

    closed: { x: "-100%", opacity: 0 },

    open: {

      x: 0,

      opacity: 1,

      transition: { type: "spring", stiffness: 300, damping: 30 },

    },

  };



  const itemVariants = {

    closed: { x: -20, opacity: 0 },

    open: { x: 0, opacity: 1 },


  };



  const renderLabel = (itemName) => {

    if (itemName === "Youtube (EMR&RC)") {

      return (

        <span className="leading-tight text-center block">

          Youtube

          <br />

          <span className="text-xs font-semibold opacity-90">(EMR&amp;RC)</span>

        </span>

      );

    }



    if (itemName === "T-SAT Vidya/Nipuna") {

      return (

        <span className="leading-tight text-center block">

          T-SAT

          <br />

          <span className="text-xs font-semibold opacity-90">

            (Vidya/Nipuna)

          </span>

        </span>

      );

    }



    return <span className="whitespace-nowrap">{itemName}</span>;


  };



  return (

    <>


      {/* ================= MAIN NAVBAR ================= */}

      <nav

        className="

          w-full

          h-14 sm:h-16 lg:h-20

          bg-black

          bg-[url('/pictures/navbarbg.png')]

          bg-cover bg-center bg-no-repeat

          shadow-lg

          z-40

          relative

          flex items-center

        "

      >

        <div className="w-full max-w-[1600px] mx-auto px-3 sm:px-4 lg:px-6 flex items-center justify-between">

         

          {/* Hamburger */}


          <div className="flex lg:hidden">

            <button

              onClick={() => setIsOpen(true)}

              className="text-white hover:text-cyan-300 p-2"

            >


              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">

                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />


              </svg>

            </button>

          </div>




          {/* ================= DESKTOP MENU ================= */}

          <div className="hidden lg:flex w-full items-center justify-center xl:justify-end xl:pr-45 space-x-1 xl:space-x-2">



            {navItems.map((item) => {

              const isExternal = externalLinks[item.name];

              const classes = `

               px-5 py-2 rounded-full text-[15px] font-bold transition-all duration-300



${

  isActive(item.path)

    ? "bg-cyan-500 text-white shadow-md scale-105"

    : "text-white/85 hover:text-white hover:bg-white/5"

}



              `;



              return isExternal ? (

                <a

                  key={item.name}

                  href={externalLinks[item.name]}

                  target="_blank"

                  rel="noopener noreferrer"

                  className={classes}

                >

                  {renderLabel(item.name)}

                </a>

              ) : (

                <Link key={item.name} to={item.path} className={classes}>

                  {renderLabel(item.name)}

                </Link>

              );

            })}


          </div>

        </div>

      </nav>



      {/* ================= MOBILE DRAWER ================= */}

      <AnimatePresence>

        {isOpen && (

          <>

            <motion.div

              initial={{ opacity: 0 }}

              animate={{ opacity: 1 }}

              exit={{ opacity: 0 }}

              onClick={() => setIsOpen(false)}

              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"

            />



           <motion.div
  initial="closed"
  animate="open"
  exit="closed"
  variants={sidebarVariants}
  className="fixed top-0 left-0 h-full w-[80%] max-w-[320px] bg-gradient-to-b from-gray-900 to-black z-[70] lg:hidden shadow-2xl"
>
  <div className="flex flex-col h-full">

    {/* HEADER */}
    <div className="p-6 flex justify-between items-center border-b border-gray-700">
      <span className="text-xl font-bold text-white">MENU</span>
      <button
        onClick={() => setIsOpen(false)}
        className="text-gray-400 hover:text-white text-xl"
      >
        ✕
      </button>
    </div>

    {/* SCROLLABLE MENU */}
    <div className="flex-1 overflow-y-auto py-4">
      {navItems.map((item, index) => {
        const isExternal = externalLinks[item.name];

        return (
          <motion.div
            key={item.name}
            variants={itemVariants}
            transition={{ delay: index * 0.05 }}
          >
            {isExternal ? (
              <a
                href={externalLinks[item.name]}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-6 py-4 text-lg text-gray-300 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ) : (
              <Link
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="block px-6 py-4 text-lg text-gray-300 hover:text-white"
              >
                {item.name}
              </Link>
            )}
          </motion.div>
        );
      })}
    </div>

    {/* FOOTER */}
    <div className="p-4 text-center text-gray-500 text-xs border-t border-gray-700">
      © 2025 BRAOU – EMR&RC. All Rights Reserved
    </div>

  </div>
</motion.div>


          </>

        )}

      </AnimatePresence>

    </>

  );

};



export default Navbar;