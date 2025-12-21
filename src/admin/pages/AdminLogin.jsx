import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import { adminFetch } from "../utils/adminFetch";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { loginSuccess, isAuthenticated } = useAdmin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const forceReset = localStorage.getItem("FORCE_PASSWORD_RESET") === "true";

  if (isAuthenticated && !forceReset) {
    return <Navigate to="/admin/home" replace />;
  }

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

      if (!res.ok) {
        throw new Error(data?.message || "Login failed");
      }

      loginSuccess();

      if (forceReset) {
        navigate("/admin/reset-password", { replace: true });
      } else {
        navigate("/admin/home", { replace: true });
      }
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 overflow-x-hidden">
      <div className="relative w-full max-w-6xl md:min-h-[520px] rounded-xl overflow-hidden shadow-2xl bg-white">
        {/* RIGHT BACKGROUND */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-br from-cyan-100 via-cyan-200 to-cyan-300 z-0" />

        {/* LEFT DIAGONAL */}
        <div
          className="hidden md:block absolute top-[-40%] left-[-60%] w-[140%] h-[160%]
          bg-gradient-to-b from-teal-700 via-teal-800 to-black rotate-[60deg] z-10"
        />

        {/* CONTENT */}
        <div className="relative z-20 flex flex-col md:flex-row h-full">
          {/* FORM */}
          <form
            onSubmit={handleLogin}
            className="w-full md:w-[55%] px-6 sm:px-10 md:px-20 py-10 md:py-16
              bg-gradient-to-b from-teal-700 via-teal-800 to-black md:bg-none text-white"
          >
            <h1 className="text-3xl sm:text-4xl font-bold mb-8 pt-6">
              Admin Login
            </h1>

            {error && <p className="text-red-300 mb-6 text-sm">{error}</p>}

            {/* EMAIL */}
            <div className="mb-8">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent outline-none text-lg placeholder-cyan-200"
                placeholder="Enter email"
              />
              <div className="w-full h-[2px] bg-white mt-3" />
            </div>

            {/* PASSWORD */}
            <div className="mb-6">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-transparent outline-none text-lg placeholder-cyan-200"
                placeholder="Enter password"
              />
              <div className="w-full h-[2px] bg-white mt-3" />
            </div>

            <p
              onClick={() => navigate("/admin/forgot-password")}
              className="text-cyan-100 text-sm mb-8 cursor-pointer hover:underline"
            >
              Forgot Password?
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-14 py-3 rounded-full bg-cyan-100 text-black
                text-lg font-semibold hover:bg-cyan-200 transition disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* RIGHT CONTENT */}
          <div className="hidden md:flex w-[40%] items-center justify-start text-center px-14">
            <div>
              <h2 className="text-4xl font-extrabold mb-6">WELCOME BACK!</h2>
              <p className="text-lg text-gray-800 leading-relaxed text-justify">
                We are happy to have you with us again. If you need anything, we
                are here to help.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
