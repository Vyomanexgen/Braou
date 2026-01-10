import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminFetch } from "../utils/adminFetch";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";

export default function AdminResetPassword() {
  const navigate = useNavigate();

  // State Management
  const [email, setEmail] = useState(localStorage.getItem("RESET_EMAIL") || "");
  const [tempPassword, setTempPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Visibility States
  const [showTemp, setShowTemp] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Regex for strong password: 8+ chars, Uppercase, Number, Symbol
  const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  /**
   * Calculates password strength for the UI meter
   */
  const calculateStrength = (pass) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[@$!%*?&]/.test(pass)) score++;
    return score; // Returns 0 to 4
  };

  const strength = calculateStrength(newPassword);
  const strengthColors = ["bg-gray-400", "bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500"];
  const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");

    if (!strongPasswordRegex.test(newPassword)) {
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

      // Cleanup storage after success
      localStorage.removeItem("FORCE_PASSWORD_RESET");
      localStorage.removeItem("RESET_EMAIL");
      
      alert("Password reset successful. Please login again with your new password.");
      navigate("/admin/login", { replace: true });
    } catch (err) {
      setError(err.message || "Something went wrong during reset");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex relative overflow-hidden bg-[#004d40] md:bg-[#99f6ff]">
      
      {/* Visual Divider (Slicer) */}
      <div 
        className="hidden md:block absolute inset-0 z-10 bg-gradient-to-br from-[#004d40] via-[#002d26] to-black"
        style={{ clipPath: "polygon(35% 0, 100% 0, 100% 100%, 55% 100%)" }}
      />

      {/* Info Section */}
      <div className="relative z-20 hidden md:flex w-[35%] flex-col justify-center pl-16 lg:pl-20 text-black">
        <h2 className="text-5xl font-black mb-6 tracking-tight leading-tight">
          SECURE YOUR <br /> ACCOUNT
        </h2>
        <p className="text-xl text-gray-800 font-medium leading-relaxed max-w-sm">
          Set a new permanent password to regain full access to the admin panel.
        </p>
      </div>

      {/* Form Section */}
      <div className="relative z-20 w-full md:w-[65%] flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12 text-white">
        <div className="max-w-md w-full ml-auto md:mr-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-10">Reset Password</h1>

          {error && (
            <div className="bg-red-500/20 border border-red-400 text-red-100 p-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleReset} className="space-y-6">
            {/* Email (Pre-filled) */}
            <div className="relative border-b border-white/30 focus-within:border-white py-1">
              <label className="text-[10px] uppercase tracking-widest text-teal-200 block">Email Address</label>
              <input
                type="email"
                value={email}
                readOnly
                className="w-full bg-transparent outline-none py-1 text-lg opacity-70 cursor-not-allowed"
              />
            </div>

            {/* Temporary Password */}
            <div className="relative border-b border-white/30 focus-within:border-white py-1">
              <label className="text-[10px] uppercase tracking-widest text-teal-200 block">Temporary Password</label>
              <input
                type={showTemp ? "text" : "password"}
                value={tempPassword}
                onChange={(e) => setTempPassword(e.target.value)}
                required
                placeholder="Check your email"
                className="w-full bg-transparent outline-none py-1 text-lg pr-10 placeholder-teal-600/50"
              />
              <button type="button" onClick={() => setShowTemp(!showTemp)} className="absolute right-0 bottom-2 text-white/50 hover:text-white">
                {showTemp ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* New Password + Strength Meter */}
            <div className="relative border-b border-white/30 focus-within:border-white py-1">
              <label className="text-[10px] uppercase tracking-widest text-teal-200 block">New Password</label>
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="Min. 8 characters"
                className="w-full bg-transparent outline-none py-1 text-lg pr-10 placeholder-teal-600/50"
              />
              <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-0 bottom-2 text-white/50 hover:text-white">
                {showNew ? <FaEyeSlash /> : <FaEye />}
              </button>

              {/* Password Strength Indicator */}
              {newPassword && (
                <div className="mt-2 space-y-1">
                  <div className="flex gap-1 h-1">
                    {[1, 2, 3, 4].map((step) => (
                      <div key={step} className={`flex-1 rounded-full transition-colors duration-500 ${strength >= step ? strengthColors[strength] : "bg-white/20"}`} />
                    ))}
                  </div>
                  <p className={`text-[10px] font-bold uppercase ${strength >= 3 ? "text-green-400" : "text-orange-400"}`}>
                    {strengthLabels[strength]}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className={`relative border-b py-1 transition-all ${confirmPassword && newPassword !== confirmPassword ? "border-red-500" : "border-white/30 focus-within:border-white"}`}>
              <label className="text-[10px] uppercase tracking-widest text-teal-200 block">Confirm Password</label>
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full bg-transparent outline-none py-1 text-lg pr-10"
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-0 bottom-2 text-white/50 hover:text-white">
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto px-16 py-4 rounded-full bg-[#ccfaff] text-[#004d40] text-xl font-bold hover:bg-white transition-all shadow-xl disabled:opacity-50"
              >
                {loading ? "Updating Account..." : "Update Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}