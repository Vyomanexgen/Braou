import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaYoutube,
  FaPodcast,
  FaSatelliteDish,
  FaWifi,
  FaTrophy,
  FaRegImage,
  FaBars,
  FaTimes,
  FaGraduationCap,
  FaAddressBook,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdLiveTv } from "react-icons/md";
import { useState, useEffect } from "react";
import { useAdmin } from "../context/AdminContext";

const menu = [
  { to: "/admin/home", label: "Home", icon: FaHome },
  { to: "/admin/about", label: "About", icon: FaUser },
  { to: "/admin/live", label: "Live", icon: MdLiveTv },
  { to: "/admin/youtube", label: "Youtube", icon: FaYoutube },
  { to: "/admin/radio", label: "Web Radio", icon: FaPodcast },
  { to: "/admin/vidyagani", label: "Vidyagani", icon: FaGraduationCap },
  { to: "/admin/tsat", label: "T-SAT", icon: FaSatelliteDish },
  { to: "/admin/air", label: "AIR", icon: FaWifi },
  { to: "/admin/events", label: "Events", icon: FaTrophy },
  { to: "/admin/banner", label: "Banner", icon: FaRegImage },
  { to: "/admin/footer-contact", label: "Footer Contact", icon: FaAddressBook },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAdmin();

  // 🚨 FORCE RESET FLAG
  const forceReset = localStorage.getItem("FORCE_PASSWORD_RESET") === "true";

  // 🚫 Auto close sidebar if force reset starts
  useEffect(() => {
    if (forceReset) setOpen(false);
  }, [forceReset]);

  const handleLogout = async () => {
    if (forceReset) {
      alert("Please reset your password before logging out.");
      return;
    }

    await logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <>
      {/* ===== MOBILE TOGGLE ===== */}
      {!forceReset && (
        <button
          onClick={() => setOpen(!open)}
          className="fixed top-3 left-3 z-[9999] md:hidden bg-cyan-700 text-white p-2 rounded-lg"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      )}

      {/* ===== SIDEBAR ===== */}
      <aside
        className={`fixed top-0 left-0 z-[9998] h-full w-64
        bg-gradient-to-b from-cyan-200 to-cyan-300 p-4
        transition-transform duration-300
        overflow-y-auto no-scrollbar
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* TITLE */}
        <h2 className="text-xl font-extrabold text-cyan-900 mb-6 text-center">
          Admin Panel
        </h2>

        {/* MENU */}
        <ul className="space-y-2">
          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.label}>
                <NavLink
                  to={forceReset ? "#" : item.to}
                  onClick={(e) => {
                    if (forceReset) {
                      e.preventDefault();
                      alert("Please reset your password first.");
                      return;
                    }
                    setOpen(false);
                  }}
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-lg font-semibold transition
                    ${
                      isActive
                        ? "bg-white text-cyan-700 border-l-4 border-cyan-700"
                        : "hover:bg-white/50 text-gray-800"
                    }
                    ${forceReset ? "opacity-50 cursor-not-allowed" : ""}`
                  }
                >
                  <Icon className="text-lg" />
                  {item.label}
                </NavLink>
              </li>
            );
          })}
        </ul>

        {/* LOGOUT */}
        <div className="mt-6">
          <button
            disabled={forceReset}
            onClick={handleLogout}
            className={`w-full flex items-center justify-center gap-3
            font-semibold py-3 rounded-lg transition
            ${
              forceReset
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 text-white hover:bg-red-700"
            }`}
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
