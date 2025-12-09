// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FaFacebookF, FaLinkedinIn, FaYoutube, FaInstagram } from 'react-icons/fa'; 

// const Footer = () => {
//   return (
//     <footer className="w-full bg-[#004B52] text-white font-['Arial'] relative z-10">
//       <div className="max-w-[1600px] mx-auto px-4 py-10 md:py-14">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

//           {/* --- BRANDING --- */}
//           <div className="flex flex-col items-start space-y-4">
//             <div className="flex items-center space-x-3">
//               <div className="h-20 w-20 bg-white rounded-full p-1 flex-shrink-0 flex items-center justify-center overflow-hidden">
//                  <img 
//                   src="/pictures/Logo_C_PNG[1] 1.png" 
//                   alt="BRAOU Logo" 
//                   className="h-full w-full object-contain"
//                 />
//               </div>
//               <div className="flex flex-col">
//                 <h2 className="text-3xl font-black uppercase tracking-wide leading-none font-['Arial']">
//                   BRAOU
//                 </h2>
//                 <h3 className="text-lg font-bold tracking-wider font-serif mt-1">
//                   EMR&RC
//                 </h3>
//                  <p className="text-sm italic text-cyan-100/80 mt-1 pl-1">
//               Education at your door step
//             </p>
//               </div>
//             </div>
           
//             <div className="flex space-x-4 mt-4 pl-1">
//               <SocialIcon icon={<FaFacebookF />} href="https://m.facebook.com/avprc.braou/" />
//               <SocialIcon icon={<FaLinkedinIn />} href="https://www.linkedin.com/company/dr-b-r-ambedkar-open-university/?originalSubdomain=in" />
//               <SocialIcon icon={<FaYoutube />} href="https://www.youtube.com/@BRAOUOfficial" />
//               <SocialIcon icon={<FaInstagram />} href="https://www.instagram.com/emrrcbraou?igsh=MWt3MzJzZGxuMGdwdQ==" />
//             </div>
//           </div>

//           {/* --- STUDENT SERVICES --- */}
//           <div>
//             <h3 className="text-lg font-bold uppercase mb-4 text-cyan-200 border-b border-cyan-200/30 pb-2 inline-block">
//               Student Services
//             </h3>
//             <ul className="space-y-2 text-sm md:text-base">
//               <FooterLink to="/live">Live</FooterLink>
//               <FooterLink to="https://www.youtube.com/@BRAOUOfficial" target="_blank">Youtube</FooterLink>
//               <FooterLink to="/air" target="_blank" >AIR</FooterLink>
             
//               <FooterLink to="/tsat">T-SAT Vidya/Nipuna</FooterLink>
//               <FooterLink to="https://example-webradio-url.com/" target="_blank">Web Radio</FooterLink>
//                <FooterLink to="https://vidyagani.braou.ac.in/" target="_blank">Vidyagani</FooterLink>
//             </ul>
//           </div>

//           {/* --- USEFUL LINKS --- */}
//           <div>
//             <h3 className="text-lg font-bold uppercase mb-4 text-cyan-200 border-b border-cyan-200/30 pb-2 inline-block">
//               Useful Links
//             </h3>
//             <ul className="space-y-2 text-sm md:text-base">
//               <FooterLink to="https://www.youtube.com/@BRAOUOfficial" target="_blank">Youtube (EMR&RC)</FooterLink>
//               <FooterLink to="https://vidyagani.braou.ac.in/" target="_blank">Vidyagani</FooterLink>
//               <FooterLink to="https://example-webradio-url.com/" target="_blank">Web Radio</FooterLink>
//               <FooterLink to="/tsat">T-SAT Vidya/Nipuna</FooterLink>
//             </ul>
//           </div>

//           {/* --- CONTACT US --- */}
//           <div>
//             <h3 className="text-lg font-bold uppercase mb-4 text-cyan-200 border-b border-cyan-200/30 pb-2 inline-block">
//               Contact US
//             </h3>
//             <div className="space-y-3 text-sm md:text-base text-gray-100">
//               <p className="font-bold text-white text-base">Prof. D. Rabindranath Solomon</p>
//               <p className="leading-relaxed opacity-90">Director, Electronic Media Resources & Research Centre (EMR&RC)</p>
//               <p className="pt-2">
//                 <a href="mailto:directoravprc@braou.ac.in" className="hover:text-cyan-300 transition-colors flex items-center gap-2">
//                   <span>✉</span> directoravprc@braou.ac.in
//                 </a>
//               </p>
//               <p>
//                 <a href="tel:040-23680320" className="hover:text-cyan-300 transition-colors flex items-center gap-2">
//                   <span>📞</span> 040-23680320, 9281013602
//                 </a>
//               </p>
//             </div>
//           </div>

//         </div>
//       </div>
//     </footer>
//   );
// };

// const FooterLink = ({ to, children }) => (
//   <li>
//     <Link to={to} className="hover:text-cyan-300 hover:pl-2 transition-all duration-300 inline-block opacity-90 hover:opacity-100">
//       {children}
//     </Link>
//   </li>
// );

// const SocialIcon = ({ icon, href }) => (
//   <a href={href} className="bg-white/10 hover:bg-white hover:text-[#004B52] h-9 w-9 flex items-center justify-center rounded-md transition-all duration-300">
//     {icon}
//   </a>
// );

// export default Footer;



import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaLinkedinIn, FaYoutube, FaInstagram, FaEnvelope, FaPhoneAlt } from 'react-icons/fa'; 
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  const [contactData, setContactData] = useState({
    name: "Prof. D. Rabindranath Solomon",
    designation: "Director, Electronic Media Resources & Research Centre (EMR&RC)",
    email: "directoravprc@braou.ac.in",
    phone: "040-23680320, 9281013602"
  });

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        // !!! IMPORTANT: Replace with your real Admin API endpoint !!!
        const response = await fetch('https://your-api-domain.com/api/contact-info'); 
        
        if (response.ok) {
          const data = await response.json();
          setContactData(data);
        }
      } catch (error) {
        console.error("Failed to fetch contact info, using default data:", error);
      }
    };

    fetchContactDetails();
  }, []);

  return (
    <footer className="w-full bg-[#004B52] text-white font-['Arial'] relative z-10">
      <div className="max-w-[1600px] mx-auto px-4 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          {/* --- BRANDING --- */}
          <div className="flex flex-col items-start space-y-4">
            <div className="flex items-center space-x-3">
              <div className="h-20 w-20 bg-white rounded-full p-1 flex-shrink-0 flex items-center justify-center overflow-hidden">
                 <img 
                  src="/pictures/Logo_C_PNG[1] 1.png" 
                  alt="BRAOU Logo" 
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <h2 className="text-3xl font-black uppercase tracking-wide leading-none font-['Arial']">
                  BRAOU
                </h2>
                <h3 className="text-lg font-bold tracking-wider font-serif mt-1">
                  EMR&RC
                </h3>
                 <p className="text-sm italic text-cyan-100/80 mt-1 pl-1">
              Education at your door step
            </p>
              </div>
            </div>
           
            <div className="flex space-x-4 mt-4 pl-1">
              <SocialIcon icon={<FaFacebookF />} href="https://m.facebook.com/avprc.braou/" />
              <SocialIcon icon={<FaLinkedinIn />} href="https://www.linkedin.com/company/dr-b-r-ambedkar-open-university/?originalSubdomain=in" />
              <SocialIcon icon={<FaYoutube />} href="https://www.youtube.com/@BRAOUOfficial" />
              <SocialIcon icon={<FaInstagram />} href="https://www.instagram.com/emrrcbraou?igsh=MWt3MzJzZGxuMGdwdQ==" />
              <SocialIcon icon={<FaXTwitter />} href="https://x.com/braouofficial" />
            </div>
          </div>

          {/* --- MEDIA SERVICES --- */}
          <div>
            <h3 className="text-lg font-bold uppercase mb-4 text-cyan-200 border-b border-cyan-200/30 pb-2 inline-block">
              Media Services
            </h3>
            <ul className="space-y-2 text-sm md:text-base">
              {/* Internal Link */}
              <FooterLink to="/live">Live</FooterLink>
              
              {/* External Links - Now working correctly with target="_blank" */}
              <FooterLink to="https://www.youtube.com/@BRAOUOfficial" target="_blank">Youtube</FooterLink>
              <FooterLink to="/air" target="_blank" >AIR</FooterLink>
              <FooterLink to="/tsat">T-SAT Vidya/Nipuna</FooterLink>
              <FooterLink to="https://example-webradio-url.com/" target="_blank">Web Radio</FooterLink>
               <FooterLink to="https://vidyagani.braou.ac.in/" target="_blank">Vidyagani</FooterLink>
            </ul>
          </div>

          {/* --- USEFUL LINKS --- */}
          <div>
            <h3 className="text-lg font-bold uppercase mb-4 text-cyan-200 border-b border-cyan-200/30 pb-2 inline-block">
              Useful Links
            </h3>
            <ul className="space-y-2 text-sm md:text-base">
              <FooterLink to="https://www.youtube.com/@BRAOUOfficial" target="_blank">Youtube (EMR&RC)</FooterLink>
              <FooterLink to="https://vidyagani.braou.ac.in/" target="_blank">Vidyagani</FooterLink>
              <FooterLink to="https://example-webradio-url.com/" target="_blank">Web Radio</FooterLink>
              <FooterLink to="/tsat">T-SAT Vidya/Nipuna</FooterLink>
            </ul>
          </div>

          {/* --- CONTACT US (Dynamic) --- */}
          <div>
            <h3 className="text-lg font-bold uppercase mb-4 text-cyan-200 border-b border-cyan-200/30 pb-2 inline-block">
              Contact US
            </h3>
            <div className="space-y-3 text-sm md:text-base text-gray-100">
              <p className="font-bold text-white text-base">
                {contactData.name}
              </p>
              
              <p className="leading-relaxed opacity-90">
                {contactData.designation}
              </p>
              
              <p className="pt-2">
                <a href={`mailto:${contactData.email}`} className="hover:text-cyan-300 transition-colors flex items-center gap-3 group">
                  <FaEnvelope className="text-cyan-200 group-hover:text-white transition-colors" /> 
                  <span>{contactData.email}</span>
                </a>
              </p>
              
              <p>
                <a href={`tel:${contactData.phone ? contactData.phone.split(',')[0] : ''}`} className="hover:text-cyan-300 transition-colors flex items-center gap-3 group">
                  <FaPhoneAlt className="text-cyan-200 group-hover:text-white transition-colors" />
                  <span>{contactData.phone}</span>
                </a>
              </p>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

// --- HELPER COMPONENTS (UPDATED) ---

// 1. UPDATED FooterLink: Now handles external vs internal links automatically
const FooterLink = ({ to, children, ...props }) => {
  // Check if link is external (starts with http)
  const isExternal = to.startsWith('http');
  const commonClasses = "hover:text-cyan-300 hover:pl-2 transition-all duration-300 inline-block opacity-90 hover:opacity-100";

  return (
    <li>
      {isExternal ? (
        // Use standard <a> tag for external links to support target="_blank"
        <a 
          href={to} 
          className={commonClasses}
          {...props} // This passes "target" and other props down
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ) : (
        // Use React Router <Link> for internal pages
        <Link 
          to={to} 
          className={commonClasses}
          {...props}
        >
          {children}
        </Link>
      )}
    </li>
  );
};

// 2. UPDATED SocialIcon: Added target="_blank"
const SocialIcon = ({ icon, href }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="bg-white/10 hover:bg-white hover:text-[#004B52] h-9 w-9 flex items-center justify-center rounded-md transition-all duration-300"
  >
    {icon}
  </a>
);

export default Footer;