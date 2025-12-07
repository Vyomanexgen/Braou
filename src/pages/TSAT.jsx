import React from "react";
import Footer from "../components/Footer";

const TSAT = () => {
  return (
    <>
      <main
        className="w-full flex flex-col min-h-screen bg-cover bg-center bg-no-repeat font-[Arial]"
        style={{
          backgroundImage: "url('/pictures/website BG Final.jpg')",
        }}
      >
        {/* Page Title */}
        <section className="pt-16 text-center px-4 pb-5">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#121212] pb-2">
            T-SAT
          </h1>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A8EC5]">
            (Vidya/Nipuna)
          </h2>
        </section>

        {/* Broadcast bar */}
        <section className="w-full flex justify-center mt-4 px-4">
          <div
            className="
      w-full max-w-2xl
      bg-[#D6F2F5] 
      border border-[#0A8EC5] 
      shadow-md 
      px-4 py-3 
      rounded-2xl
      flex flex-col md:flex-row 
      items-center justify-center
      text-center 
      gap-3
    "
          >
            {/* TEXT */}
            <p className="text-xs md:text-sm font-semibold leading-tight pr-5">
              T-SAT Vidya broadcasts lessons from 1:00-2:00 PM and 8:30-9:30 PM
            </p>

            {/* BUTTON */}
            <button
              className="
              pl-4
    bg-[#C62828] 
    text-white 
    px-4 py-1.5 
    rounded-full 
    text-xs md:text-sm 
    shadow 
    border border-[#8B0000]
    transition-all duration-200
    hover:bg-[#b72222]
    hover:shadow-lg
    hover:scale-105
    active:scale-95
    animate-wiggle
  "
            >
              ⚪ Join Now...
            </button>

            <style>
              {`
  @keyframes wiggle {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(-5px); }
  }
  .animate-wiggle {
    animation: wiggle 1.3s ease-in-out infinite;
  }
`}
            </style>
          </div>
        </section>

        {/* Cards Section */}
        <section
          className="w-full max-w-6xl mx-auto px-4 grid grid-cols-1 
          md:grid-cols-2 gap-8 md:gap-10 mt-10 md:mt-12"
        >
          {/* ==================== VIDYA CARD ==================== */}
          <div className="relative rounded-[42px] border-[6px] border-[#006A72] shadow-[0px_6px_20px_rgba(0,0,0,0.30)]">
            <div
              className="
                rounded-[36px]
                bg-cover bg-center
                p-6 md:p-10
                min-h-[280px]
                flex flex-col items-center justify-center text-center
              "
              style={{
                backgroundImage: "url('/pictures/T-SAT Card.png')",
                backgroundSize: "200%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              <img
                src="/pictures/VIDYA.png"
                className="w-16 h-20 md:w-20 md:h-24 mb-3"
              />

              <h2 className="text-2xl md:text-3xl font-bold text-black leading-tight">
                T-SAT (Vidya)
              </h2>

              <p className="mt-2 md:mt-3 text-lg md:text-2xl font-bold text-black">
                Timings: 1:00–2:00PM
              </p>

              {/* RESPONSIVE BUTTON (hover + mobile tap fix) */}
              <button
                className="
                  mt-5 md:mt-6 px-10 md:px-14 py-2.5 md:py-3
                  text-white text-lg md:text-xl font-semibold
                  rounded-full shadow-lg 
                  hover:scale-105 
                  active:scale-95 active:brightness-90
                  transition-all duration-200
                "
                style={{
                  background: `
                    linear-gradient(
                      95deg,
                      #006A72 0%,
                      #004B52 40%,
                      #000000 100%
                    )
                  `,
                }}
              >
                Schedule
              </button>
            </div>
          </div>

          {/* ==================== NIPUNA CARD ==================== */}
          <div className="relative rounded-[42px] border-[6px] border-[#006A72] shadow-[0px_6px_20px_rgba(0,0,0,0.30)]">
            <div
              className="
                rounded-[36px]
                bg-cover bg-center
                p-6 md:p-10
                min-h-[280px]
                flex flex-col items-center justify-center text-center
              "
              style={{
                backgroundImage: "url('/pictures/T-SAT Card.png')",
                backgroundSize: "200%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              <img
                src="/pictures/NIPUNA.png"
                className="w-16 h-20 md:w-20 md:h-24 mb-3"
              />

              <h2 className="text-2xl md:text-3xl font-bold text-black leading-tight">
                T-SAT (Nipuna)
              </h2>

              <p className="mt-2 md:mt-3 text-lg md:text-2xl font-bold text-black">
                Timings: 2:00–3:00PM
              </p>

              {/* RESPONSIVE BUTTON (hover + mobile tap fix) */}
              <button
                className="
                  mt-5 md:mt-6 px-10 md:px-14 py-2.5 md:py-3
                  text-white text-lg md:text-xl font-semibold
                  rounded-full shadow-lg 
                  hover:scale-105 
                  active:scale-95 active:brightness-90
                  transition-all duration-200
                "
                style={{
                  background: `
                    linear-gradient(
                      95deg,
                      #006A72 0%,
                      #004B52 40%,
                      #000000 100%
                    )
                  `,
                }}
              >
                Schedule
              </button>
            </div>
          </div>
        </section>

        {/* Downlink Frequency Details */}
        <section className="w-full max-w-5xl mx-auto text-center px-4 mt-12 pb-16">
          <div className="w-full flex justify-center mt-2 px-4">
            <img
              src="/pictures/Group 371.png"
              alt="Downlink Frequency Info"
              className="w-full max-w-xl"
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default TSAT;
