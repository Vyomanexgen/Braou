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
      setError(
        "Password must be at least 8 characters and include uppercase, number and symbol"
      );
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

      if (!res.ok) {
        throw new Error(data?.message || "Password reset failed");
      }

      localStorage.removeItem("FORCE_PASSWORD_RESET");

      alert("Password reset successful. Please login with your new password.");
      navigate("/admin/login", { replace: true });
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 overflow-x-hidden">
      <div className="relative w-full max-w-6xl md:min-h-[520px] rounded-xl overflow-hidden shadow-2xl bg-white">
        {/* LIGHT BACKGROUND */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-br from-cyan-100 via-cyan-200 to-cyan-300 z-0" />

        {/* DIAGONAL OVERLAY */}
        <div
          className="hidden md:block absolute top-[-40%] right-[-65%] w-[140%] h-[160%]
          bg-gradient-to-b from-teal-700 via-teal-800 to-black rotate-[60deg] z-10"
        />

        {/* CONTENT */}
        <div className="relative z-20 flex flex-col md:flex-row h-full">
          {/* LEFT INFO */}
          <div className="hidden md:flex w-[45%] px-14 items-center">
            <div>
              <h2 className="text-4xl font-extrabold mb-6">RESET PASSWORD</h2>
              <p className="text-lg text-gray-800 leading-relaxed">
                Enter your temporary password and set a new secure password to
                regain access.
              </p>
            </div>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleReset}
            className="w-full md:w-[55%] px-6 sm:px-10 md:px-20 py-8 md:py-20
              bg-gradient-to-b from-teal-700 via-teal-800 to-black md:bg-none text-white"
          >
            <h1 className="text-3xl sm:text-4xl font-bold mb-8">
              Reset Password
            </h1>

            {error && <p className="text-red-300 mb-6 text-sm">{error}</p>}

            {/* EMAIL */}
            <div className="mb-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
                className="w-full bg-transparent outline-none text-lg placeholder-cyan-200"
              />
              <div className="w-full h-[2px] bg-white mt-3" />
            </div>

            {/* TEMP PASSWORD */}
            <div className="mb-6">
              <input
                type="text"
                value={tempPassword}
                onChange={(e) => setTempPassword(e.target.value)}
                required
                placeholder="Temporary Password"
                className="w-full bg-transparent outline-none text-lg placeholder-cyan-200"
              />
              <div className="w-full h-[2px] bg-white mt-3" />
            </div>

            {/* NEW PASSWORD */}
            <div className="mb-6">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="New Password"
                className="w-full bg-transparent outline-none text-lg placeholder-cyan-200"
              />
              <div className="w-full h-[2px] bg-white mt-3" />
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="mb-8">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm New Password"
                className="w-full bg-transparent outline-none text-lg placeholder-cyan-200"
              />
              <div className="w-full h-[2px] bg-white mt-3" />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-14 py-3 rounded-full bg-cyan-100 text-black
                text-lg font-semibold hover:bg-cyan-200 transition disabled:opacity-60"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
