import React from 'react';

const BottomBar = () => {
  return (
    <div className="w-full bg-[#091220] py-4 px-4 border-t border-white/10 font-['Arial'] relative z-20">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center text-xs md:text-sm text-gray-400 space-y-2 md:space-y-0 text-center md:text-left">
        <p className="font-bold text-white tracking-wide">
          BRAOU-EMR&RC. All Rights Reserved
        </p>
        <p>
          © Powered by <span className="text-white font-semibold">Software Development Cell, Computer Division</span>
        </p>
      </div>
    </div>
  );
};

export default BottomBar;