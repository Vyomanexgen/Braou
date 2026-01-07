// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { adminFetch } from "../utils/adminFetch";

// export default function AdminResetPassword() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [tempPassword, setTempPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const strongPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

//   const handleReset = async (e) => {
//     e.preventDefault();
//     setError("");

//     /* ================= VALIDATIONS ================= */
//     if (!email || !tempPassword) {
//       setError("Email and temporary password are required");
//       return;
//     }

//     if (!strongPassword.test(newPassword)) {
//       setError(
//         "Password must be at least 8 characters and include uppercase, number and symbol"
//       );
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     setLoading(true);

//     try {
//       /* ================= API CALL ================= */
//       const res = await adminFetch("/auth/reset-password", {
//         method: "POST",
//         body: JSON.stringify({
//           email: email.trim(),
//           temp_password: tempPassword.trim(),
//           new_password: newPassword,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data?.message || "Password reset failed");
//       }

//       /* ================= SUCCESS ================= */
//       localStorage.removeItem("FORCE_PASSWORD_RESET");

//       alert("Password reset successful. Please login again.");

//       // ✅ SAFE REDIRECT
//       setTimeout(() => {
//         navigate("/admin/login", { replace: true });
//       }, 300);
//     } catch (err) {
//       setError(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 overflow-x-hidden">
//       <div className="relative w-full max-w-6xl md:min-h-[520px] rounded-xl overflow-hidden shadow-2xl bg-white">
//         {/* LIGHT BACKGROUND */}
//         <div className="hidden md:block absolute inset-0 bg-gradient-to-br from-cyan-100 via-cyan-200 to-cyan-300 z-0" />

//         {/* DIAGONAL OVERLAY */}
//         <div
//           className="hidden md:block absolute top-[-40%] right-[-65%] w-[170%] h-[160%]
//           bg-gradient-to-b from-teal-700 via-teal-800 to-black rotate-[70deg] z-10"
//         />

//         {/* CONTENT */}
//         <div className="relative z-20 flex flex-col md:flex-row h-full">
//           {/* LEFT INFO */}
//           <div className="hidden md:flex w-[45%] px-14 items-center">
//             <div>
//               <h2 className="text-4xl font-extrabold mb-6">RESET PASSWORD</h2>
//               <p className="text-lg text-gray-800 leading-relaxed">
//                 Enter your temporary password and set a new secure password to
//                 regain access.
//               </p>
//             </div>
//           </div>

//           {/* FORM */}
//           <form
//             onSubmit={handleReset}
//           className="w-full md:w-[55%] px-6 sm:px-10 md:px-20 py-8 md:py-20
// bg-white md:bg-none text-black md:text-white"

//           >
//             <h1 className="text-3xl sm:text-4xl font-bold mb-8">
//               Reset Password
//             </h1>

//             {error && <p className="text-red-300 mb-6 text-sm">{error}</p>}

//             {/* EMAIL */}
//             <div className="mb-6">
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 placeholder="Email"
//                className="w-full bg-transparent outline-none text-lg
// text-black md:text-white placeholder-gray-400 md:placeholder-cyan-200"

//               />
//               <div className="w-full h-[2px] bg-white mt-3" />
//             </div>

//             {/* TEMP PASSWORD */}
//             <div className="mb-6">
//               <input
//                 type="text"
//                 value={tempPassword}
//                 onChange={(e) => setTempPassword(e.target.value)}
//                 required
//                 placeholder="Temporary Password"
//                className="w-full bg-transparent outline-none text-lg
// text-black md:text-white placeholder-gray-400 md:placeholder-cyan-200"

//               />
//               <div className="w-full h-[2px] bg-white mt-3" />
//             </div>

//             {/* NEW PASSWORD */}
//             <div className="mb-6">
//               <input
//                 type="password"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 required
//                 placeholder="New Password"
//                className="w-full bg-transparent outline-none text-lg
// text-black md:text-white placeholder-gray-400 md:placeholder-cyan-200"

//               />
//               <div className="w-full h-[2px] bg-white mt-3" />
//             </div>

//             {/* CONFIRM PASSWORD */}
//             <div className="mb-8">
//               <input
//                 type="password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//                 placeholder="Confirm New Password"
//                 className="w-full bg-transparent outline-none text-lg
// text-black md:text-white placeholder-gray-400 md:placeholder-cyan-200"

//               />
//             <div className="w-full h-[2px] bg-gray-300 md:bg-white mt-3" />

//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full px-14 py-3 rounded-full bg-cyan-100 text-black
//                 text-lg font-semibold hover:bg-cyan-200 transition disabled:opacity-60"
//             >
//               {loading ? "Resetting..." : "Reset Password"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { adminFetch } from "../utils/adminFetch";

// export default function AdminResetPassword() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [tempPassword, setTempPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const strongPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

//   const handleReset = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!email || !tempPassword) {
//       setError("Email and temporary password are required");
//       return;
//     }

//     if (!strongPassword.test(newPassword)) {
//       setError("Password must be at least 8 characters, include uppercase, number and symbol");
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await adminFetch("/auth/reset-password", {
//         method: "POST",
//         body: JSON.stringify({
//           email: email.trim(),
//           temp_password: tempPassword.trim(),
//           new_password: newPassword,
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data?.message || "Password reset failed");

//       localStorage.removeItem("FORCE_PASSWORD_RESET");
//       alert("Password reset successful. Please login again.");
      
//       navigate("/admin/login", { replace: true });
//     } catch (err) {
//       setError(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="relative w-full max-w-6xl flex flex-col md:flex-row rounded-xl overflow-hidden shadow-2xl bg-white min-h-[600px]">
        
//         {/* LEFT SIDE: Info (Visible on Desktop) */}
//         <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-cyan-100 to-cyan-300 items-center px-12">
//           <div>
//             <h2 className="text-4xl font-extrabold mb-6 text-teal-900">RESET PASSWORD</h2>
//             <p className="text-lg text-teal-800 leading-relaxed">
//               Enter the temporary password sent to your email and set a new secure password to regain access to your dashboard.
//             </p>
//           </div>
//         </div>

//         {/* RIGHT SIDE: Form */}
//         <div className="w-full md:w-1/2 p-8 md:p-16 bg-[#004d40] text-white flex flex-col justify-center">
//           <h1 className="text-3xl font-bold mb-8">Set New Password</h1>

//           {error && <p className="bg-red-500/20 border border-red-500 text-red-100 p-3 rounded mb-6 text-sm">{error}</p>}

//           <form onSubmit={handleReset} className="space-y-6">
//             <div>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 placeholder="Email Address"
//                 className="w-full bg-transparent border-b border-white/50 focus:border-white outline-none py-2 text-lg placeholder-gray-400"
//               />
//             </div>

//             <div>
//               <input
//                 type="password"
//                 value={tempPassword}
//                 onChange={(e) => setTempPassword(e.target.value)}
//                 required
//                 placeholder="Temporary Password"
//                 className="w-full bg-transparent border-b border-white/50 focus:border-white outline-none py-2 text-lg placeholder-gray-400"
//               />
//             </div>

//             <div>
//               <input
//                 type="password"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 required
//                 placeholder="New Password"
//                 className="w-full bg-transparent border-b border-white/50 focus:border-white outline-none py-2 text-lg placeholder-gray-400"
//               />
//             </div>

//             <div>
//               <input
//                 type="password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//                 placeholder="Confirm New Password"
//                 className="w-full bg-transparent border-b border-white/50 focus:border-white outline-none py-2 text-lg placeholder-gray-400"
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-3 mt-4 rounded-full bg-cyan-100 text-[#004d40] text-lg font-bold hover:bg-white transition disabled:opacity-50"
//             >
//               {loading ? "Resetting..." : "Update Password"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminFetch } from "../utils/adminFetch";

export default function AdminResetPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [tempPassword, setTempPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const strongPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !tempPassword) {
      setError("Email and temporary password are required");
      return;
    }

    if (!strongPassword.test(newPassword)) {
      setError("Password must be at least 8 characters, include uppercase, number and symbol");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await adminFetch("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({
          email: email.trim(),
          temp_password: tempPassword.trim(),
          new_password: newPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Password reset failed");

      localStorage.removeItem("FORCE_PASSWORD_RESET");
      alert("Password reset successful. Please login again.");
      
      navigate("/admin/login", { replace: true });
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex relative overflow-hidden bg-[#004d40] md:bg-[#99f6ff]">
      
      {/* THE SLICER - Adjusted to move the "/" divider slightly to the left */}
      <div 
        className="hidden md:block absolute inset-0 z-10 bg-gradient-to-br from-[#004d40] via-[#002d26] to-black"
        style={{
          /* Original: 45% top, 65% bottom 
             New: 35% top, 55% bottom (Moves it left)
          */
          clipPath: "polygon(35% 0, 100% 0, 100% 100%, 55% 100%)"
        }}
      />

      {/* LEFT CONTENT */}
      <div className="relative z-20 hidden md:flex w-[35%] flex-col justify-center pl-16 lg:pl-20 text-black">
        <h2 className="text-5xl font-black mb-6 tracking-tight leading-tight">
          SECURE YOUR <br /> ACCOUNT
        </h2>
        <p className="text-xl text-gray-800 font-medium leading-relaxed max-w-sm">
          Set a new permanent password to regain full access to the admin panel.
        </p>
      </div>

      {/* RIGHT CONTENT */}
      <div className="relative z-20 w-full md:w-[65%] flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12 text-white">
        <div className="max-w-md w-full ml-auto md:mr-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-10">Reset Password</h1>

          {error && (
            <p className="bg-red-500/20 border border-red-400 text-red-100 p-3 rounded-lg mb-6 text-sm">
              {error}
            </p>
          )}

          <form onSubmit={handleReset} className="space-y-6">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email Address"
                className="w-full bg-transparent border-b border-white/50 focus:border-white outline-none py-3 text-lg placeholder-teal-400 transition-all"
              />
            </div>

            <div className="relative">
              <input
                type="password"
                value={tempPassword}
                onChange={(e) => setTempPassword(e.target.value)}
                required
                placeholder="Temporary Password"
                className="w-full bg-transparent border-b border-white/50 focus:border-white outline-none py-3 text-lg placeholder-teal-400 transition-all"
              />
            </div>

            <div className="relative">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="New Password"
                className="w-full bg-transparent border-b border-white/50 focus:border-white outline-none py-3 text-lg placeholder-teal-400 transition-all"
              />
            </div>

            <div className="relative">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm New Password"
                className="w-full bg-transparent border-b border-white/50 focus:border-white outline-none py-3 text-lg placeholder-teal-400 transition-all"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto px-14 py-4 rounded-full bg-[#ccfaff] text-[#004d40] text-xl font-bold hover:bg-white transition-all shadow-xl disabled:opacity-50"
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}