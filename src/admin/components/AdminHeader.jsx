import React from "react";
import { motion } from "framer-motion";

const AdminHeader = () => {
  return (
    <header id="admin-header" className="fixed top-0 left-0 z-50 w-full bg-white border-b border-gray-300 shadow-sm">
      <div
        className="
          w-full max-w-[1900px] mx-auto
          px-2 md:px-4 lg:px-8 py-3
          flex items-center justify-between
        "
      >
        {/* LEFT LOGO */}
        <div className="flex-shrink-0 pr-2">
          <motion.img
            whileHover={{ scale: 1.03 }}
            src="/pictures/Logo_C_PNG[1] 1.png"
            alt="University Logo"
            className="h-[45px] sm:h-[65px] md:h-[85px] lg:h-[110px] xl:h-[120px] w-auto object-contain"
          />
        </div>

        {/* CENTER TEXT */}
        <div className="flex-grow flex flex-col min-w-0 px-2 items-center text-center sm:items-start sm:text-left">
          <h1 className="font-extrabold text-black tracking-tight whitespace-nowrap text-[11px] sm:text-[15px] md:text-[20px] lg:text-[28px] xl:text-[34px]">
            <span className="normal-case">Dr.</span>{" "}
            <span className="uppercase">B. R. Ambedkar Open University</span>
          </h1>

          <h2 className="font-extrabold text-black mt-0.5 whitespace-nowrap text-[9px] sm:text-[12px] md:text-[17px] lg:text-[23px] xl:text-[28px]">
            Electronic Media Resources & Research Centre
          </h2>

          <h3 className="font-bold text-black uppercase mt-0.5 text-[8px] sm:text-[10px] md:text-[14px] lg:text-[18px]">
            (EMR&RC)
          </h3>
        </div>

        {/* RIGHT LOGOS */}
        <div className="hidden md:flex flex-shrink-0 items-center gap-6">
          <img
            src="/pictures/PNG[1] 1.png"
            alt="NAAC A Grade"
            className="h-[70px] lg:h-[90px] xl:h-[110px] object-contain"
          />

          <div className="rounded-full overflow-hidden border h-[75px] w-[75px] lg:h-[100px] lg:w-[100px] xl:h-[120px] xl:w-[120px]">
            <img
              src="/pictures/Group 45.png"
              alt="Dr. Ambedkar"
              className="h-full w-full object-cover"
            />
          </div>

          <img
            src="/pictures/Group 88.png"
            alt="Telangana Rising"
            className="h-[70px] lg:h-[90px] xl:h-[110px] object-contain"
          />
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
