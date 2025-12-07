// import React from 'react';
// import { motion } from 'framer-motion';

// const iconVariants = {
//   hover: { scale: 1.05, transition: { duration: 0.2 } }
// };

// const Header = () => {
//   return (
//     <header className="w-full bg-white shadow-sm">
//       <div className="max-w-[1600px] mx-auto px-2 md:px-4 py-2 md:py-4 flex flex-row items-center justify-between gap-2 md:gap-0">
        
//         {/* --- LEFT SECTION: Main University Logo --- */}
//         <div className="flex-shrink-0">
//           <motion.img 
//             whileHover={{ scale: 1.02 }}
//             src="/pictures/Logo_C_PNG[1] 1.png" 
//             alt="University Logo" 
//             // Logo size kept at h-20 for good mobile visibility
//             className="h-20 md:h-28 w-auto object-contain"
//           />
//         </div>

//         {/* --- CENTER SECTION: Text Content --- */}
//         <div className="flex-1 flex flex-col items-center justify-center text-center pl-4 md:pl-6 md:px-6">
          
//           {/* Increased mobile size to text-lg */}
//           <h1 className="text-lg sm:text-2xl md:text-4xl font-[900] text-black tracking-tight uppercase leading-none md:leading-tight">
//             Dr.B.R. AMBEDKAR OPEN UNIVERSITY
//           </h1>
          
//           {/* Increased mobile size to text-xs */}
//           <h2 className="text-xs sm:text-sm md:text-xl font-bold text-black mt-1 md:mt-2 tracking-wide leading-tight">
//             Electronic Media Resources & Research Centre
//           </h2>
          
//           {/* Increased mobile size to text-xs */}
//           <h3 className="text-xs sm:text-sm md:text-lg font-bold text-black">
//             (EMR&RC)
//           </h3>
//         </div>

//         {/* --- RIGHT SECTION: Icons (Hidden on Mobile) --- */}
//         <div className="hidden md:flex flex-shrink-0 items-center gap-8">
          
//           {/* Icon 1: NAAC */}
//           <motion.img 
//             variants={iconVariants}
//             whileHover="hover"
//             src="/pictures/PNG[1] 1.png" 
//             alt="NAAC A Grade" 
//             className="h-28 w-auto object-contain" 
//           />
          
//           {/* Icon 2: Portrait */}
//           <motion.div 
//             variants={iconVariants}
//             whileHover="hover"
//             className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-gray-200 shadow-sm"
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
//             className="h-28 w-auto object-contain" 
//           />
//         </div>

//       </div>
//     </header>
//   );
// };

// export default Header;



// import React from 'react';
// import { motion } from 'framer-motion';

// const iconVariants = {
//   hover: { scale: 1.05, transition: { duration: 0.2 } }
// };

// const Header = () => {
//   return (
//     <header className="w-full bg-white shadow-sm overflow-hidden">
//       <div className="max-w-[1600px] mx-auto px-2 md:px-4 py-2 md:py-4 flex flex-row items-center justify-between">
        
//         {/* --- LEFT SECTION: Main University Logo --- */}
//         <div className="flex-shrink-0">
//           <motion.img 
//             whileHover={{ scale: 1.02 }}
//             src="/pictures/Logo_C_PNG[1] 1.png" 
//             alt="University Logo" 
//             // UPDATED FOR < 480px: 
//             // - h-14 (56px): Small enough to fit on tiny screens
//             // - sm:h-20 (80px): Regular mobile/tablet
//             // - md:h-28 (112px): Desktop
//             className="h-14 sm:h-20 md:h-28 w-auto object-contain"
//           />
//         </div>

//         {/* --- CENTER SECTION: Text Content --- */}
//         {/* UPDATED: 
//            - pl-2: Reduced padding on tiny screens to save space.
//            - sm:pl-4: More padding on larger screens.
//         */}
//         <div className="flex-1 flex flex-col items-center justify-center text-center pl-2 sm:pl-4 md:px-6">
          
//           {/* UPDATED TYPOGRAPHY FOR < 480px:
//              - text-xs: Ensures the long title fits on one or two lines without breaking layout.
//              - sm:text-lg: Bigger on regular mobile.
//           */}
//           <h1 className="text-xs sm:text-lg md:text-4xl font-[900] text-black tracking-tight uppercase leading-tight md:leading-tight">
//             Dr.B.R. AMBEDKAR OPEN UNIVERSITY
//           </h1>
          
//           <h2 className="text-[10px] sm:text-xs md:text-xl font-bold text-black mt-1 md:mt-2 tracking-wide leading-tight">
//             Electronic Media Resources & Research Centre
//           </h2>
          
//           <h3 className="text-[10px] sm:text-xs md:text-lg font-bold text-black">
//             (EMR&RC)
//           </h3>
//         </div>

//         {/* --- RIGHT SECTION: Icons (Hidden on Mobile/Tablet Portrait) --- */}
//         <div className="hidden md:flex flex-shrink-0 items-center gap-6 lg:gap-8">
          
//           {/* Icon 1: NAAC */}
//           <motion.img 
//             variants={iconVariants}
//             whileHover="hover"
//             src="/pictures/PNG[1] 1.png" 
//             alt="NAAC A Grade" 
//             className="h-20 lg:h-28 w-auto object-contain" 
//           />
          
//           {/* Icon 2: Portrait */}
//           <motion.div 
//             variants={iconVariants}
//             whileHover="hover"
//             className="relative h-16 w-16 lg:h-24 lg:w-24 rounded-full overflow-hidden border-2 border-gray-200 shadow-sm"
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
//             className="h-20 lg:h-28 w-auto object-contain" 
//           />
//         </div>

//       </div>
//     </header>
//   );
// };

// export default Header;


import React from 'react';
import { motion } from 'framer-motion';

const iconVariants = {
  hover: { scale: 1.05, transition: { duration: 0.2 } }
};

const Header = () => {
  return (
    <header className="w-full bg-white shadow-sm overflow-hidden">
      {/* FLUID PADDING: 
        px-[clamp(0.5rem,2vw,1rem)] -> Padding scales smoothly from 8px to 16px based on screen width.
      */}
      <div className="w-full max-w-[1600px] mx-auto px-[clamp(0.5rem,2vw,1rem)] py-2 flex flex-row items-center justify-between">
        
        {/* --- LEFT SECTION: Logo --- */}
        <div className="flex-shrink-0">
          <motion.img 
            whileHover={{ scale: 1.02 }}
            src="/pictures/Logo_C_PNG[1] 1.png" 
            alt="University Logo" 
            // FLUID HEIGHT: 
            // Logo starts at 50px (mobile) and grows smoothly to 112px (desktop)
            // It will never be "too big" or "too small" at intermediate sizes (like 768px)
            className="h-[clamp(50px,8vw,112px)] w-auto object-contain"
          />
        </div>

        {/* --- CENTER SECTION: Text Content --- */}
        {/* flex-1: Takes up all available space between left and right.
          px-[clamp...]: Adds dynamic breathing room so text doesn't touch the logos.
        */}
<div className="
  flex-1
  flex
  flex-col
  items-center
  justify-center
  text-center
  pl-[clamp(0.5rem,1.5vw,1rem)]
  pr-[clamp(3rem,6vw,6rem)]
">


        
          
          {/* FLUID FONT SIZE (Title):
             - Minimum: 10px (Very small phones)
             - Preferred: 2.2% of screen width (Scaling)
             - Maximum: 36px (Desktop)
             leading-tight ensures lines don't space out too much.
          */}
     <h1 className="font-extrabold text-black tracking-tight leading-[1.1] text-[clamp(12px,2.4vw,38px)]">

  Dr.B.R.AMBEDKAR OPEN UNIVERSITY
</h1>

          
          {/* FLUID FONT SIZE (Subtitle): */}
          <h2 className="font-bold text-black mt-1 tracking-wide leading-[1.2] text-[clamp(10px,1.6vw,24px)]">


            Electronic Media Resources & Research Centre
          </h2>
          
          {/* FLUID FONT SIZE (Acronym): */}
          <h3 className="font-bold text-black text-[clamp(9px,1.2vw,18px)]">

            (EMR&RC)
          </h3>
        </div>

        {/* --- RIGHT SECTION: Icons --- */}
        {/* These icons are hidden on very small mobile (< 640px) to prevent crushing the text.
           On screens > 640px, they appear and scale fluidly.
        */}
      <div className="hidden sm:flex flex-shrink-0 items-center gap-[clamp(1rem,2vw,2.5rem)] ml-[clamp(1rem,3vw,4rem)]">

          {/* Icon 1: NAAC */}
          <motion.img 
            variants={iconVariants}
            whileHover="hover"
            src="/pictures/PNG[1] 1.png" 
            alt="NAAC A Grade" 
            // Fluid height matches the Main Logo logic
            className="h-[clamp(40px,7vw,100px)] w-auto object-contain" 
          />
          
          {/* Icon 2: Portrait */}
          <motion.div 
            variants={iconVariants}
            whileHover="hover"
            // Fluid width/height for the circle container
            className="relative rounded-full overflow-hidden border-2 border-gray-200 shadow-sm
                       h-[clamp(40px,6.5vw,90px)] w-[clamp(40px,6.5vw,90px)]"
          >
            <img 
              src="https://braou.ac.in/assets/images/user/braou-ambedkar.jpg" 
              alt="Dr. Ambedkar" 
              className="h-full w-full object-cover" 
            />
          </motion.div>

          {/* Icon 3: Telangana Rising */}
          <motion.img 
            variants={iconVariants}
            whileHover="hover"
            src="https://braou.ac.in/assets/images/user/RisingLogo.jpg" 
            alt="Telangana Rising" 
            className="h-[clamp(40px,7vw,100px)] w-auto object-contain" 
          />
        </div>

      </div>
    </header>
  );
};

export default Header;