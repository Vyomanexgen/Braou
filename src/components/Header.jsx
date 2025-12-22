// import React from "react";
// import { motion } from "framer-motion";

// const Header = () => {
//   return (
//     <header className="w-full bg-white border-b border-gray-300 shadow-sm">
//       <div
//         className="
//           w-full max-w-[1900px] mx-auto
//           px-2 md:px-8 py-3
//           flex flex-wrap items-center
//           gap-2 md:gap-6
//         "
//       >
//         {/* Left Logo */}
//         <div className="flex-shrink-0">
//           <motion.img
//             whileHover={{ scale: 1.03 }}
//             src="/pictures/Logo_C_PNG[1] 1.png"
//             alt="University Logo"
//             className="h-[40px] sm:h-[65px] md:h-[90px] lg:h-[120px] w-auto object-contain"
//           />
//         </div>

//         {/* Center Text */}
//         <div className="flex-1 flex flex-col items-start text-left">
//           <h1
//             className="
//               font-extrabold text-black tracking-tight leading-tight
//               text-[13px] sm:text-[18px] md:text-[28px] lg:text-[34px]
//             "
//           >
//             <span className="normal-case">Dr.</span>{" "}
//             <span className="uppercase">B. R. Ambedkar Open University</span>
//           </h1>

//           <h2
//             className="
//               font-extrabold text-black leading-snug mt-1 capitalize
//               text-[11px] sm:text-[15px] md:text-[20px] lg:text-[28px]
//             "
//           >
//             Electronic Media Resources & Research Centre
//           </h2>

//          <h3
//   className="
//     font-bold text-black mt-1 uppercase
//     text-[10px] sm:text-[13px] md:text-[18px]
//     ml-1 sm:ml-8 md:ml-8 lg:ml-[245px]
//   "
// >
//   (EMR&RC)
// </h3>

//         </div>

//         {/* Right Logos */}
//       <div className="flex-shrink-0 flex items-center gap-4 sm:gap-6 md:gap-10 lg:gap-16 ml-auto">


//           <img
//             src="/pictures/PNG[1] 1.png"
//             alt="NAAC A Grade"
//            className="h-[45px] sm:h-[60px] md:h-[85px] lg:h-[110px] xl:h-[120px] w-auto object-contain"
//           />

//           <div
//             className="
//               rounded-full overflow-hidden border
//              h-[50px] w-[50px]
// sm:h-[70px] sm:w-[70px]
// md:h-[90px] md:w-[90px]
// lg:h-[115px] lg:w-[115px]
// xl:h-[125px] xl:w-[135px]

//             "
//           >
//             <img
//               src="/pictures/Group 45.png"
//               alt="Dr. Ambedkar"
//               className="h-full w-full object-cover"
//             />
//           </div>

//           <img
//             src="/pictures/Group 88.png"
//             alt="Telangana Rising"
//             className="h-[45px] sm:h-[60px] md:h-[85px] lg:h-[110px] xl:h-[120px] w-auto object-contain"
//           />
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React from "react";
import { motion } from "framer-motion";

const Header = () => {
  return (
 <header className="w-full bg-white border-b border-gray-300 shadow-sm overflow-hidden m-0 p-0">
      <div
  className="
    w-full max-w-[1900px] mx-auto
    px-2 md:px-4 lg:px-8 py-0
    flex items-center 
    justify-between
  "
>


        {/* LEFT SECTION: Logo */}
        <div className="flex-shrink-0 z-10 bg-white pr-2 m-0">

          <motion.img
            whileHover={{ scale: 1.03 }}
            src="/pictures/Logo_C_PNG[1] 1.png"
            alt="University Logo"
            className="h-[45px] sm:h-[65px] md:h-[85px] lg:h-[110px] xl:h-[120px] w-auto object-contain"
          />
        </div>

        {/* CENTER SECTION: Text Content 
            - Center aligned by default
            - On screens < 768px: items-start and text-left to align with the left logo
        */}
        <div className="flex-grow flex flex-col min-w-0 px-2 items-center text-center md:items-center md:text-center sm:items-start sm:text-left items-start text-left">
          <h1
            className="
              font-extrabold text-black tracking-tight leading-tight whitespace-nowrap
              text-[11px] sm:text-[15px] md:text-[20px] lg:text-[28px] xl:text-[34px]
            "
          >
            <span className="normal-case">Dr.</span>{" "}
            <span className="uppercase">B. R. Ambedkar Open University</span>
          </h1>

          <h2
            className="
              font-extrabold text-black leading-snug mt-0.5 md:mt-1 capitalize whitespace-nowrap
              text-[9px] sm:text-[12px] md:text-[17px] lg:text-[23px] xl:text-[28px]
            "
          >
            Electronic Media Resources & Research Centre
          </h2>

          <h3
            className="
              font-bold text-black uppercase mt-0.5
              text-[8px] sm:text-[10px] md:text-[14px] lg:text-[18px]
            "
          >
            (EMR&RC)
          </h3>
        </div>

        {/* RIGHT SECTION: Icons
            - hidden on screens < 768px
            - flex-shrink-0 prevents them from squashing the text
        */}
        <div className="hidden md:flex flex-shrink-0 items-center gap-2 lg:gap-6 xl:gap-12 ml-2">
          <img
            src="/pictures/PNG[1] 1.png"
            alt="NAAC A Grade"
            className="h-[55px] md:h-[70px] lg:h-[90px] xl:h-[110px] w-auto object-contain"
          />

          <div
            className="
              rounded-full overflow-hidden border border-gray-100
              h-[60px] w-[60px]
              md:h-[75px] md:w-[75px]
              lg:h-[100px] lg:w-[100px]
              xl:h-[120px] xl:w-[120px]
            "
          >
            <img
              src="/pictures/Group 45.png"
              alt="Dr. Ambedkar"
              className="h-full w-full object-cover"
            />
          </div>

          <img
            src="/pictures/Group 88.png"
            alt="Telangana Rising"
            className="h-[55px] md:h-[70px] lg:h-[90px] xl:h-[110px] w-auto object-contain"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;