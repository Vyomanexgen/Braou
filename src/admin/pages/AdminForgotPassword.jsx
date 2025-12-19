import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminFetch } from "../utils/adminFetch";

export default function AdminForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await adminFetch("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to send reset email");
      }

      localStorage.setItem("FORCE_PASSWORD_RESET", "true");

      setMessage(
        "Temporary password has been sent to your email. Please login and reset your password."
      );
      setEmail("");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 overflow-x-hidden">
      <div className="relative w-full max-w-6xl md:min-h-[520px] rounded-xl overflow-hidden shadow-2xl bg-white">
        {/* LIGHT BACKGROUND (DESKTOP ONLY) */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-br from-cyan-100 via-cyan-200 to-cyan-300 z-0" />

        {/* DIAGONAL DARK OVERLAY (DESKTOP ONLY) */}
        <div
          className="hidden md:block absolute top-[-35%] right-[-55%] w-[140%] h-[160%]
          bg-gradient-to-b from-teal-700 via-teal-800 to-black rotate-[60deg] z-10"
        />

        {/* CONTENT */}
        <div className="relative z-20 flex flex-col md:flex-row h-full">
          {/* LEFT TEXT */}
          <div className="hidden md:flex w-[45%] px-14 items-center">
            <div>
              <h2 className="text-4xl font-extrabold mb-6">WELCOME BACK!</h2>
              <p className="text-lg text-gray-800 leading-relaxed">
                Forgot your password? Don’t worry - you can easily reset it
                using your E-Mail.
              </p>
            </div>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleReset}
            className="w-full md:w-[55%] px-8 sm:px-10 md:px-20 py-8 md:py-20
              bg-gradient-to-b from-teal-700 via-teal-800 to-black md:bg-none text-white"
          >
            <h1 className="text-3xl sm:text-4xl font-bold mb-8 mt-8">
              Forgot Password
            </h1>

            {message && (
              <p className="text-green-300 mb-6 text-sm w-md">{message}</p>
            )}
            {error && <p className="text-red-300 mb-6 text-sm">{error}</p>}

            {/* EMAIL INPUT */}
            <div className="mb-8">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent outline-none text-lg placeholder-cyan-200"
                placeholder="Enter your email"
              />
              <div className="w-full h-[2px] bg-white mt-3" />
            </div>

            {/* BACK TO LOGIN */}
            <p
              onClick={() => navigate("/admin/login")}
              className="text-cyan-100 text-sm mb-8 cursor-pointer hover:underline"
            >
              Back to login?
            </p>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-3 rounded-full bg-cyan-100 text-black
                text-lg font-semibold hover:bg-cyan-200 transition disabled:opacity-60"
            >
              {loading ? "Sending..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
