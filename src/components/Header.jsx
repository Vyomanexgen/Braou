
// import React from 'react';
// import { motion } from 'framer-motion';

// const iconVariants = {
//   hover: { scale: 1.05, transition: { duration: 0.2 } }
// };

// const Header = () => {
//   return (
//     <header className="w-full bg-white shadow-sm overflow-hidden">
//       {/* FLUID PADDING: 
//         px-[clamp(0.5rem,2vw,1rem)] -> Padding scales smoothly from 8px to 16px based on screen width.
//       */}
//       <div className="w-full max-w-[1600px] mx-auto px-[clamp(0.5rem,2vw,1rem)] py-2 flex flex-row items-center justify-between">
        
//         {/* --- LEFT SECTION: Logo --- */}
//         <div className="flex-shrink-0">
//           <motion.img 
//             whileHover={{ scale: 1.02 }}
//             src="/pictures/Logo_C_PNG[1] 1.png" 
//             alt="University Logo" 
            
//             className="h-[clamp(50px,8vw,112px)] w-auto object-contain"
//           />
//         </div>

//         {/* --- CENTER SECTION: Text Content --- */}
//         {/* flex-1: Takes up all available space between left and right.
//           px-[clamp...]: Adds dynamic breathing room so text doesn't touch the logos.
//         */}
// <div className="
//   flex-1
//   flex
//   flex-col
//   items-center
//   justify-center
//   text-center
//   px-[clamp(0.5rem,2vw,1.5rem)]
// ">



        
    
//    <h1 className="
//     font-extrabold text-black tracking-tight
//     leading-tight
//     text-[clamp(14px,2.4vw,42px)]
//     whitespace-nowrap
//     max-[336px]:text-[13px]
//   "
// >
//   Dr. <span className="uppercase">B. R. Ambedkar Open University</span>
// </h1>


// <h2 className="font-semibold text-black mt-[2px] leading-snug text-[clamp(10px,1.6vw,22px)]">
//   Electronic Media Resources & Research Centre
// </h2>

// <h3 className="font-semibold text-black leading-none text-[clamp(10px,1.2vw,16px)]">
//   (EMR&amp;RC)
// </h3>

//         </div>

//         {/* --- RIGHT SECTION: Icons --- */}
//         {/* These icons are hidden on very small mobile (< 640px) to prevent crushing the text.
//            On screens > 640px, they appear and scale fluidly.
//         */}
//       <div className="hidden sm:flex flex-shrink-0 items-center gap-[clamp(1rem,2vw,2.5rem)] ml-[clamp(1rem,3vw,4rem)]">

//           {/* Icon 1: NAAC */}
//           <motion.img 
//             variants={iconVariants}
//             whileHover="hover"
//             src="/pictures/PNG[1] 1.png" 
//             alt="NAAC A Grade" 
//             // Fluid height matches the Main Logo logic
//             className="h-[clamp(40px,7vw,100px)] w-auto object-contain" 
//           />
          
//           {/* Icon 2: Portrait */}
//           <motion.div 
//             variants={iconVariants}
//             whileHover="hover"
//             // Fluid width/height for the circle container
//             className="relative rounded-full overflow-hidden border-2 border-gray-200 shadow-sm
//                        h-[clamp(40px,6.5vw,90px)] w-[clamp(40px,6.5vw,90px)]"
//           >
//             <img 
//               src="https://braou.ac.in/assets/images/user/braou-ambedkar.jpg" 
//               alt="Dr. Ambedkar" 
//               className="h-full w-full object-cover" 
//             />
//           </motion.div>

//           {/* Icon 3: Telangana Rising */}
//           <motion.img 
//             variants={iconVariants}
//             whileHover="hover"
//             src="https://braou.ac.in/assets/images/user/RisingLogo.jpg" 
//             alt="Telangana Rising" 
//             className="h-[clamp(40px,7vw,100px)] w-auto object-contain" 
//           />
//         </div>

//       </div>
//     </header>
//   );
// };

// export default Header;

// import React from "react";
// import { motion } from "framer-motion";

// const iconVariants = {
//   hover: { scale: 1.05, transition: { duration: 0.2 } },
// };

// const Header = () => {
//   return (
//     <header className="w-full bg-white border-b border-gray-300 shadow-sm">
//       <div
//         className="
//           w-full max-w-[1900px] mx-auto px-8 py-4
//           grid grid-cols-[auto_1fr_auto]
//           items-center
//         "
//       >

//         {/* ===== LEFT: UNIVERSITY LOGO ===== */}
//         <div className="flex items-center">
//           <motion.img
//             whileHover={{ scale: 1.03 }}
//             src="/pictures/Logo_C_PNG[1] 1.png"
//             alt="University Logo"
//             className="h-[80px] md:h-[105px] lg:h-[120px] w-auto object-contain"
//           />
//         </div>

//         {/* ===== CENTER: TEXT BLOCK ===== */}
//         <div className="flex flex-col items-start text-left px-10">

//           <h1
//             className="
//               font-extrabold text-black tracking-tight leading-tight
//               text-[20px] sm:text-[26px] md:text-[34px] lg:text-[36px]
//             "
//           >
//             <span className="normal-case">Dr.</span>{" "}
//             <span className="uppercase">B. R. Ambedkar Open University</span>
//           </h1>

//           <h2
//             className="
//               font-extrabold text-black leading-snug mt-1 capitalize
//               text-[15px] sm:text-[20px] md:text-[24px] lg:text-[30px]
//             "
//           >
//             Electronic Media Resources & Research Centre
//           </h2>

//           {/* EMR&RC – centered under text */}
//           <h3
//             className="
//               font-extrabold text-black mt-2 uppercase self-center
//               text-[13px] sm:text-[15px] md:text-[20px]
//             "
//           >
//             (EMR&RC)
//           </h3>

//         </div>

//         {/* ===== RIGHT: ICONS (MOVED RIGHT + BIGGER) ===== */}
//         <div className="flex items-center gap-10 justify-end">

//           {/* NAAC */}
//           <motion.img
//             variants={iconVariants}
//             whileHover="hover"
//             src="/pictures/PNG[1] 1.png"
//             alt="NAAC A Grade"
//             className="h-[80px] md:h-[100px] lg:h-[120px] w-auto object-contain"
//           />

//           {/* Dr. Ambedkar portrait */}
//           <motion.div
//             variants={iconVariants}
//             whileHover="hover"
//             className="
//               rounded-full overflow-hidden border border-gray-300
//               h-[85px] w-[85px]
//               md:h-[105px] md:w-[105px]
//               lg:h-[125px] lg:w-[125px]
//             "
//           >
//             <img
//               src="https://braou.ac.in/assets/images/user/braou-ambedkar.jpg"
//               alt="Dr. Ambedkar"
//               className="h-full w-full object-cover"
//             />
//           </motion.div>

//           {/* Telangana Rising */}
//           <motion.img
//             variants={iconVariants}
//             whileHover="hover"
//             src="https://braou.ac.in/assets/images/user/RisingLogo.jpg"
//             alt="Telangana Rising"
//             className="h-[80px] md:h-[100px] lg:h-[120px] w-auto object-contain"
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
    <header className="w-full bg-white border-b border-gray-300 shadow-sm">
      <div
        className="
          w-full max-w-[1900px] mx-auto px-4 md:px-8 py-4
          flex items-center
          gap-4 md:gap-6
        "
      >
        
        <div className="flex-shrink-0">
          <motion.img
            whileHover={{ scale: 1.03 }}
            src="/pictures/Logo_C_PNG[1] 1.png"
            alt="University Logo"
            className="h-[55px] sm:h-[65px] md:h-[90px] lg:h-[120px] w-auto object-contain"
          />
        </div>

      
        <div
          className="
            flex-1 flex flex-col
            items-start
            text-left
          "
        >
          <h1
            className="
              font-extrabold text-black tracking-tight leading-tight
              text-[16px] sm:text-[18px] md:text-[28px] lg:text-[34px]
            "
          >
            <span className="normal-case">Dr.</span>{" "}
            <span className="uppercase">B. R. Ambedkar Open University</span>
          </h1>

          <h2
            className="
              font-extrabold text-black leading-snug mt-1 capitalize
              text-[13px] sm:text-[15px] md:text-[20px] lg:text-[28px]
            "
          >
            Electronic Media Resources & Research Centre
          </h2>

         <h3
  className="
    font-bold text-black mt-2 uppercase
    text-[12px] sm:text-[13px] md:text-[18px]
    self-center -ml-48
  "
>
  (EMR&RC)
</h3>

        </div>

<div className="hidden md:flex items-center gap-20 ml-auto">

 
  <img
    src="/pictures/PNG[1] 1.png"
    alt="NAAC A Grade"
    className="h-[85px] lg:h-[110px] xl:h-[120px] w-auto object-contain"
  />

 
  <div
    className="rounded-full overflow-hidden border
               h-[90px] w-[90px]
               lg:h-[115px] lg:w-[115px]
               xl:h-[125px] xl:w-[135px]"
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
