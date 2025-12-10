// import React from "react";
// import { motion } from "framer-motion";

// const Header = () => {
//   return (
//     <header className="w-full bg-white border-b border-gray-300 shadow-sm">
//       <div
//         className="
//           w-full max-w-[1900px] mx-auto px-4 md:px-8 py-4
//           flex items-center
//           gap-4 md:gap-6
//         "
//       >
        
//         <div className="flex-shrink-0">
//           <motion.img
//             whileHover={{ scale: 1.03 }}
//             src="/pictures/Logo_C_PNG[1] 1.png"
//             alt="University Logo"
//             className="h-[55px] sm:h-[65px] md:h-[90px] lg:h-[120px] w-auto object-contain"
//           />
//         </div>

      
//         <div
//           className="
//             flex-1 flex flex-col
//             items-start
//             text-left
//           "
//         >
//           <h1
//             className="
//               font-extrabold text-black tracking-tight leading-tight
//               text-[16px] sm:text-[18px] md:text-[28px] lg:text-[34px]
//             "
//           >
//             <span className="normal-case">Dr.</span>{" "}
//             <span className="uppercase">B. R. Ambedkar Open University</span>
//           </h1>

//           <h2
//             className="
//               font-extrabold text-black leading-snug mt-1 capitalize
//               text-[13px] sm:text-[15px] md:text-[20px] lg:text-[28px]
//             "
//           >
//             Electronic Media Resources & Research Centre
//           </h2>

//          <h3
//   className="
//     font-bold text-black mt-2 uppercase
//     text-[12px] sm:text-[13px] md:text-[18px]
//     self-center -ml-48
//   "
// >
//   (EMR&RC)
// </h3>

//         </div>

// <div className="hidden md:flex items-center gap-20 ml-auto">

 
//   <img
//     src="/pictures/PNG[1] 1.png"
//     alt="NAAC A Grade"
//     className="h-[85px] lg:h-[110px] xl:h-[120px] w-auto object-contain"
//   />

 
//   <div
//     className="rounded-full overflow-hidden border
//                h-[90px] w-[90px]
//                lg:h-[115px] lg:w-[115px]
//                xl:h-[125px] xl:w-[135px]"
//   >
//     <img
//       src="/pictures/Group 45.png"
//       alt="Dr. Ambedkar"
//       className="h-full w-full object-cover"
//     />
//   </div>


//   <img
//     src="/pictures/Group 88.png"
//     alt="Telangana Rising"
//     className="h-[85px] lg:h-[110px] xl:h-[120px] w-auto object-contain"
//   />
// </div>

//       </div>
//     </header>
//   );
// };

// export default Header;


import React from "react";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <header className="w-full bg-white border-b border-gray-300 shadow-sm">
      <div
        className="
          w-full max-w-[1900px] mx-auto
          px-2 md:px-8 py-3
          flex flex-wrap items-center
          gap-2 md:gap-6
        "
      >
        {/* Left Logo */}
        <div className="flex-shrink-0">
          <motion.img
            whileHover={{ scale: 1.03 }}
            src="/pictures/Logo_C_PNG[1] 1.png"
            alt="University Logo"
            className="h-[40px] sm:h-[65px] md:h-[90px] lg:h-[120px] w-auto object-contain"
          />
        </div>

        {/* Center Text */}
        <div className="flex-1 flex flex-col items-start text-left">
          <h1
            className="
              font-extrabold text-black tracking-tight leading-tight
              text-[13px] sm:text-[18px] md:text-[28px] lg:text-[34px]
            "
          >
            <span className="normal-case">Dr.</span>{" "}
            <span className="uppercase">B. R. Ambedkar Open University</span>
          </h1>

          <h2
            className="
              font-extrabold text-black leading-snug mt-1 capitalize
              text-[11px] sm:text-[15px] md:text-[20px] lg:text-[28px]
            "
          >
            Electronic Media Resources & Research Centre
          </h2>

          <h3
            className="
              font-bold text-black mt-1 uppercase
              text-[10px] sm:text-[13px] md:text-[18px]
            "
          >
            (EMR&RC)
          </h3>
        </div>

        {/* Right Logos */}
        <div className="hidden md:flex items-center gap-20 ml-auto">
          <img
            src="/pictures/PNG[1] 1.png"
            alt="NAAC A Grade"
            className="h-[85px] lg:h-[110px] xl:h-[120px] w-auto object-contain"
          />

          <div
            className="
              rounded-full overflow-hidden border
              h-[90px] w-[90px]
              lg:h-[115px] lg:w-[115px]
              xl:h-[125px] xl:w-[135px]
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
            className="h-[85px] lg:h-[110px] xl:h-[120px] w-auto object-contain"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
