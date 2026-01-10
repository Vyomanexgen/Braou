// import { useState } from "react";
// import { Navigate, useNavigate } from "react-router-dom";
// import { useAdmin } from "../context/AdminContext";
// import { adminFetch } from "../utils/adminFetch";

// export default function AdminLogin() {
//   const navigate = useNavigate();
//   const { loginSuccess, isAuthenticated } = useAdmin();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const forceReset = localStorage.getItem("FORCE_PASSWORD_RESET") === "true";

//   if (isAuthenticated && !forceReset) {
//     return <Navigate to="/admin/home" replace />;
//   }
//   if (isAuthenticated) {
//     const isForced = localStorage.getItem("FORCE_PASSWORD_RESET") === "true";
//     if (isForced) {
//       return <Navigate to="/admin/reset-password" replace />;
//     }
//     return <Navigate to="/admin/home" replace />;
//   }


// // const handleLogin = async (e) => {
// //   e.preventDefault();
// //   setError("");
// //   setLoading(true);

// //   try {
// //     const res = await adminFetch("/auth/login", {
// //       method: "POST",
// //       body: JSON.stringify({ email, password }),
// //     });

// //     // const data = await res.json();

// //     // if (!res.ok) {
// //     //   throw new Error(data?.message || "Login failed");
// //     // }

// //     // // --- CRITICAL CHANGE START ---
// //     // // Check if the server says this user needs to reset their password
// //     // // (Ensure 'mustReset' matches the exact key your backend sends)
// //     // const needsReset = data.mustReset === true || data.user?.mustReset === true;

// //     // if (needsReset) {
// //     //   // 1. Mark the session as "Reset Required"
// //     //   localStorage.setItem("FORCE_PASSWORD_RESET", "true");
// //     //   // 2. Save the email for the next screen
// //     //   localStorage.setItem("RESET_EMAIL", email);
      
// //     //   loginSuccess(); // Update context to authenticated
      
// //     //   // 3. Force them to the reset page instead of home
// //     //   navigate("/admin/reset-password", { replace: true });
// //     // } else {
// //     //   // 4. Normal login flow
// //     //   localStorage.removeItem("FORCE_PASSWORD_RESET");
// //     //   localStorage.removeItem("RESET_EMAIL");
      
// //     //   loginSuccess();
// //     //   navigate("/admin/home", { replace: true });
// //     // }

// //     // Inside AdminLogin.jsx handleLogin
// // const data = await res.json();
// // const needsReset = data.mustReset === true || data.user?.mustReset === true;

// // if (needsReset) {
// //   localStorage.setItem("FORCE_PASSWORD_RESET", "true");
// //   localStorage.setItem("RESET_EMAIL", email);
// //   loginSuccess();
// //   navigate("/admin/reset-password", { replace: true }); // Go directly to reset
// // } else {
// //   localStorage.removeItem("FORCE_PASSWORD_RESET");
// //   loginSuccess();
// //   navigate("/admin/home", { replace: true });
// // }
// //     // --- CRITICAL CHANGE END ---

// //   } catch (err) {
// //     setError(err.message || "Invalid email or password");
// //   } finally {
// //     setLoading(false);
// //   }
// // };
// const handleLogin = async (e) => {
//   e.preventDefault();
//   setError("");
//   setLoading(true);

//   try {
//     const res = await adminFetch("/auth/login", {
//       method: "POST",
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await res.json();
    
//     // 🔥 DEBUG LOG: Open your browser console (F12) to see this!
//     console.log("Login Response Data:", data);

//     if (!res.ok) {
//       throw new Error(data?.message || "Login failed");
//     }

//     // A more robust check for "truthy" values (handles 1, "true", or true)
//     const needsReset = 
//       data.mustReset == true || 
//       data.user?.mustReset == true || 
//       data.data?.mustReset == true;

//     console.log("Needs Reset Evaluation:", needsReset);

//     if (needsReset) {
//       console.log("Redirecting to Reset Password...");
//       localStorage.setItem("FORCE_PASSWORD_RESET", "true");
//       localStorage.setItem("RESET_EMAIL", email);
      
//       // Update context state
//       loginSuccess(); 
      
//       // Navigate directly
//       navigate("/admin/reset-password", { replace: true });
//     } else {
//       console.log("Normal login, redirecting to Home...");
//       localStorage.removeItem("FORCE_PASSWORD_RESET");
//       localStorage.removeItem("RESET_EMAIL");
      
//       loginSuccess();
//       navigate("/admin/home", { replace: true });
//     }

//   } catch (err) {
//     console.error("Login Error:", err);
//     setError(err.message || "Invalid email or password");
//   } finally {
//     setLoading(false);
//   }
// };  

// return (
//     // On small screens, background is the dark green. On large screens, it's the light blue.
//     <div className="min-h-screen w-full flex relative overflow-hidden bg-[#004d40] md:bg-[#99f6ff]">
      
//       {/* THE SLICER (Only visible on MD screens and up) */}
//       <div 
//         className="hidden md:block absolute inset-0 z-10 bg-gradient-to-br from-[#004d40] via-[#00695c] to-black"
//         style={{
//           clipPath: "polygon(0 0, 45% 0, 65% 100%, 0% 100%)"
//         }}
//       />

//       {/* LEFT CONTENT (Form) */}
//       {/* On mobile, this takes full width and height. On desktop, it takes 55% */}
//       <div className="relative z-20 w-full md:w-[55%] flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12 text-white">
//         <h1 className="text-4xl md:text-5xl font-bold mb-2">Admin Login</h1>
        
//         {error && <p className="text-red-400 mt-4 text-sm font-medium">{error}</p>}

//         <form onSubmit={handleLogin} className="mt-10 md:mt-12 max-w-md">
//           <div className="mb-8 md:mb-10">
//            <input
//   type="email"
//   value={email}
//   onChange={(e) => setEmail(e.target.value)}
//   required
//   className="w-full bg-transparent border-b border-white/50 focus:border-white outline-none text-lg py-2 transition-all placeholder-[#99f6ff]"
//   placeholder="Enter Your Email"
// />

//           </div>

//           <div className="mb-6 md:mb-8">
//            <input
//   type="password"
//   value={password}
//   onChange={(e) => setPassword(e.target.value)}
//   required
//   className="w-full bg-transparent border-b border-white/50 focus:border-white outline-none text-lg py-2 transition-all placeholder-[#99f6ff]"
//   placeholder="Enter Your Password"
// />

//           </div>

//           <p
//             onClick={() => navigate("/admin/forgot-password")}
//             className="text-white/70 text-sm mb-10 md:mb-12 cursor-pointer hover:underline"
//           >
//             Forgot Password?
//           </p>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full md:w-auto px-14 py-3 rounded-full bg-[#ccfaff] text-[#004d40] text-xl font-bold hover:bg-white transition-all shadow-xl"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>
//       </div>

//       {/* RIGHT CONTENT (Welcome Text - Hidden on Mobile) */}
//       <div className="hidden md:flex flex-1 items-center justify-center z-0">
//         <div className="max-w-md text-center">
//         <h2 className="text-5xl font-black text-black mb-6 tracking-tight whitespace-nowrap">
//   WELCOME BACK!
// </h2>

//           <p className="text-xl text-gray-800 font-medium leading-relaxed px-4">
//             We are happy to have you with us again. If <br />
//             you need anything, we are here to help.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import { adminFetch } from "../utils/adminFetch";
import { FaEye, FaEyeSlash } from "react-icons/fa";


export default function AdminLogin() {
  const navigate = useNavigate();
  const { loginSuccess, isAuthenticated } = useAdmin();
const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /**
   * 1. PRE-RENDER REDIRECT
   * If the user is already authenticated, decide where to send them immediately.
   */
  if (isAuthenticated) {
    const forceReset = localStorage.getItem("FORCE_PASSWORD_RESET") === "true";
    if (forceReset) {
      return <Navigate to="/admin/reset-password" replace />;
    }
    return <Navigate to="/admin/home" replace />;
  }

  /**
   * 2. LOGIN HANDLER
   */
  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setError("");
  //   setLoading(true);

  //   try {
  //     const res = await adminFetch("/auth/login", {
  //       method: "POST",
  //       body: JSON.stringify({ email, password }),
  //     });

  //     const data = await res.json();

  //     if (!res.ok) {
  //       throw new Error(data?.message || "Login failed");
  //     }

  //     // 3. CHECK BACKEND RESPONSE FOR RESET FLAG
  //     // This handles both data.mustReset and data.user.mustReset structures
  //     const needsReset = data.mustReset === true || data.user?.mustReset === true;

  //     if (needsReset) {
  //       // Set flags before triggering context update
  //       localStorage.setItem("FORCE_PASSWORD_RESET", "true");
  //       localStorage.setItem("RESET_EMAIL", email);
        
  //       // Update Global Auth State
  //       //loginSuccess(); 
        
  //       // Navigate to Reset Page
  //       navigate("/admin/reset-password", { replace: true });
  //     } else {
  //       // Normal Login: Clear any stale reset flags
  //       localStorage.removeItem("FORCE_PASSWORD_RESET");
  //       localStorage.removeItem("RESET_EMAIL");
        
  //       // Update Global Auth State
  //       loginSuccess();
        
  //       // Navigate to Dashboard
  //       navigate("/admin/home", { replace: true });
  //     }
  //   } catch (err) {
  //     setError(err.message || "Invalid email or password");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await adminFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      // NEW: Catch the 403 error specifically for password reset requirement
      if (res.status === 403 && data.errors?.code === "PASSWORD_RESET_REQUIRED") {
        localStorage.setItem("FORCE_PASSWORD_RESET", "true");
        localStorage.setItem("RESET_EMAIL", email);
        navigate("/admin/reset-password", { replace: true });
        return; 
      }

      if (!res.ok) {
        throw new Error(data?.message || "Login failed");
      }

      // Check for reset flag in successful response (fallback)
      const needsReset = data.mustReset === true || data.user?.mustReset === true;

      if (needsReset) {
        localStorage.setItem("FORCE_PASSWORD_RESET", "true");
        localStorage.setItem("RESET_EMAIL", email);
        navigate("/admin/reset-password", { replace: true });
      } else {
        localStorage.removeItem("FORCE_PASSWORD_RESET");
        localStorage.removeItem("RESET_EMAIL");
        loginSuccess();
        navigate("/admin/home", { replace: true });
      }
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen w-full flex relative overflow-hidden bg-[#004d40] md:bg-[#99f6ff]">
      
      {/* THE SLICER (Design Element) */}
      <div 
        className="hidden md:block absolute inset-0 z-10 bg-gradient-to-br from-[#004d40] via-[#00695c] to-black"
        style={{
          clipPath: "polygon(0 0, 45% 0, 65% 100%, 0% 100%)"
        }}
      />

      {/* LEFT CONTENT (Form) */}
      <div className="relative z-20 w-full md:w-[55%] flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Admin Login</h1>
        
        {error && (
          <div className="bg-red-500/20 border border-red-400 text-red-100 p-3 rounded-lg mt-4 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="mt-10 md:mt-12 max-w-md">
         <div className="mb-8 md:mb-10">
  <input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
    className="w-full bg-transparent border-b border-white/50 focus:border-white outline-none text-lg py-2 transition-all placeholder-[#99f6ff]"
    placeholder="Enter you Email ID"
  />
</div>

          {/* <div className="mb-6 md:mb-8">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-transparent border-b border-white/50 focus:border-white outline-none text-lg py-2 transition-all placeholder-[#99f6ff]"
              placeholder="Enter Your Password"
            />
          </div> */}
          <div className="mb-6 md:mb-8 relative">
  <input
    type={showPassword ? "text" : "password"}
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
    className="w-full bg-transparent border-b border-white/50 focus:border-white outline-none text-lg py-2 pr-10 transition-all placeholder-[#99f6ff]"
    placeholder="Enter Your Password"
  />
<br />
  <button
    type="button"
    onClick={() => setShowPassword((prev) => !prev)}
    className="absolute right-0 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
  >
    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
  </button>
</div>


          <p
  onClick={() => navigate("/admin/forgot-password")}
  className="text-white/70 text-sm mb-6 cursor-pointer hover:underline block"
>
  Forgot Password?
</p>


          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto px-14 py-3 rounded-full bg-[#ccfaff] text-[#004d40] text-xl font-bold hover:bg-white transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>

      {/* RIGHT CONTENT (Welcome Text) */}
      <div className="hidden md:flex flex-1 items-center justify-center z-0">
        <div className="max-w-md text-center">
          <h2 className="text-5xl font-black text-black mb-6 tracking-tight">
            WELCOME BACK!
          </h2>
          <p className="text-xl text-gray-800 font-medium leading-relaxed px-4">
            We are happy to have you with us again. If <br />
            you need anything, we are here to help.
          </p>
        </div>
      </div>
    </div>
  );
}