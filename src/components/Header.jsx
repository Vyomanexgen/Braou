
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
  px-[clamp(0.5rem,2vw,1.5rem)]
">



        
    
   <h1 className="
    font-extrabold text-black tracking-tight
    leading-tight
    text-[clamp(14px,2.4vw,42px)]
    whitespace-nowrap
    max-[336px]:text-[13px]
  "
>
  Dr. <span className="uppercase">B. R. Ambedkar Open University</span>
</h1>


<h2 className="font-semibold text-black mt-[2px] leading-snug text-[clamp(10px,1.6vw,22px)]">
  Electronic Media Resources & Research Centre
</h2>

<h3 className="font-semibold text-black leading-none text-[clamp(10px,1.2vw,16px)]">
  (EMR&amp;RC)
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