// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { adminFetch } from "../utils/adminFetch";

// export default function AdminForgotPassword() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [isSent, setIsSent] = useState(false); 

//   const handleForgot = async (e) => {
//     e.preventDefault();
//     setError("");
//     setMessage("");
//     setLoading(true);

//     try {
//       const res = await adminFetch("/auth/forgot-password", {
//         method: "POST",
//         body: JSON.stringify({ email: email.trim() }),
//       });
      
//       const data = await res.json();
      
//       if (!res.ok) throw new Error(data?.message || "Failed to send reset email");

//       // Save email and flag so the Reset page is ready
//       localStorage.setItem("FORCE_PASSWORD_RESET", "true");
//       localStorage.setItem("RESET_EMAIL", email.trim()); // Save email for reset page
      
//       setMessage("A temporary password has been sent to your email address.");
//       setIsSent(true);
//     } catch (err) {
//       setError(err.message || "Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen w-full flex relative overflow-hidden bg-[#004d40] md:bg-[#99f6ff]">
//       <div 
//         className="hidden md:block absolute inset-0 z-10 bg-gradient-to-br from-[#004d40] via-[#002d26] to-black"
//         style={{ clipPath: "polygon(45% 0, 100% 0, 100% 100%, 65% 100%)" }}
//       />

//       <div className="relative z-20 hidden md:flex w-[45%] flex-col justify-center px-16 lg:px-24 text-black">
//         <h2 className="text-5xl font-black mb-6 tracking-tight">TROUBLE <br /> LOGGING IN?</h2>
//         <p className="text-xl text-gray-800 font-medium leading-relaxed max-w-sm">
//           Enter your registered email and we'll send you a temporary password to regain access.
//         </p>
//       </div>

//       <div className="relative z-20 w-full md:w-[55%] flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12 text-white">
//         <div className="max-w-md w-full ml-auto md:mr-10">
//           <h1 className="text-4xl md:text-5xl font-bold mb-4">Forgot Password</h1>
          
//           {message && <div className="bg-green-500/20 border border-green-500 text-green-100 p-4 rounded-lg mb-6">{message}</div>}
//           {error && <div className="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded-lg mb-6">{error}</div>}

//           {!isSent ? (
//             <form onSubmit={handleForgot}>
//               <div className="mb-8 relative">
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   className="w-full bg-transparent border-b border-white/50 focus:border-white outline-none text-lg py-3 transition-all placeholder-teal-400"
//                   placeholder="Enter your email"
//                 />
//               </div>

//               <div className="flex flex-col gap-6">
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full md:w-auto px-10 py-3 rounded-full bg-[#ccfaff] text-[#004d40] text-lg font-bold hover:bg-white transition-all shadow-xl disabled:opacity-50"
//                 >
//                   {loading ? "Sending Code..." : "Send Temporary Password"}
//                 </button>
//                 <p onClick={() => navigate("/admin/login")} className="text-white/70 text-sm cursor-pointer hover:text-white hover:underline transition-all">
//                   Remembered it? Back to login
//                 </p>
//               </div>
//             </form>
//           ) : (
//             <div className="flex flex-col gap-4">
//                {/* Updated button to go to Reset Password page */}
//               <button
//                 onClick={() => navigate("/admin/reset-password")}
//                 className="w-full md:w-auto px-10 py-3 rounded-full bg-white text-[#004d40] text-lg font-bold hover:bg-[#ccfaff] transition-all shadow-2xl"
//               >
//                 Reset Password Now
//               </button>
//               <p onClick={() => navigate("/admin/login")} className="text-white/70 text-sm cursor-pointer hover:underline">
//                 Back to login
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminFetch } from "../utils/adminFetch";

export default function AdminForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSent, setIsSent] = useState(false); 

  const handleForgot = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await adminFetch("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email: email.trim() }),
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data?.message || "Failed to send reset email");

      localStorage.setItem("FORCE_PASSWORD_RESET", "true");
      localStorage.setItem("RESET_EMAIL", email.trim()); 
      
      // Updated message to include the old password warning
      setMessage("A temporary password has been sent to your email. Please note: Your old password will no longer work.");
      setIsSent(true);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex relative overflow-hidden bg-[#004d40] md:bg-[#99f6ff]">
      <div 
        className="hidden md:block absolute inset-0 z-10 bg-gradient-to-br from-[#004d40] via-[#002d26] to-black"
        style={{ clipPath: "polygon(45% 0, 100% 0, 100% 100%, 65% 100%)" }}
      />

      {/* LEFT CONTENT: Heading adjusted to text-4xl to fit on one line */}
      <div className="relative z-20 hidden md:flex w-[45%] flex-col justify-center px-12 lg:px-20 text-black">
        <h2 className="text-3xl lg:text-4xl font-black mb-6 tracking-tight whitespace-nowrap">
          TROUBLE LOGGING IN?
        </h2>
        <p className="text-xl text-gray-800 font-medium leading-relaxed max-w-sm">
          Enter your registered email and we'll send you a temporary password to regain access.
        </p>
      </div>

      <div className="relative z-20 w-full md:w-[55%] flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12 text-white">
        <div className="max-w-md w-full ml-auto md:mr-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Forgot Password</h1>
          
          {message && (
            <div className="bg-green-500/20 border border-green-500 text-green-100 p-4 rounded-lg mb-6 text-sm leading-relaxed">
              <p className="font-bold">Success!</p>
              <p>{message}</p>
            </div>
          )}
          
          {error && <div className="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded-lg mb-6">{error}</div>}

          {!isSent ? (
            <form onSubmit={handleForgot}>
              <div className="mb-8 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-transparent border-b border-white/50 focus:border-white outline-none text-lg py-3 transition-all placeholder-teal-400"
                  placeholder="Enter your email"
                />
              </div>

              <div className="flex flex-col gap-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-auto px-10 py-3 rounded-full bg-[#ccfaff] text-[#004d40] text-lg font-bold hover:bg-white transition-all shadow-xl disabled:opacity-50"
                >
                  {loading ? "Sending Code..." : "Send Temporary Password"}
                </button>
                <p onClick={() => navigate("/admin/login")} className="text-white/70 text-sm cursor-pointer hover:text-white hover:underline transition-all">
                  Remembered it? Back to login
                </p>
              </div>
            </form>
          ) : (
            <div className="flex flex-col gap-4">
              <button
                onClick={() => navigate("/admin/reset-password")}
                className="w-full md:w-auto px-10 py-3 rounded-full bg-white text-[#004d40] text-lg font-bold hover:bg-[#ccfaff] transition-all shadow-2xl"
              >
                Reset Password Now
              </button>
              <p onClick={() => navigate("/admin/login")} className="text-white/70 text-sm cursor-pointer hover:underline">
                Back to login
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}