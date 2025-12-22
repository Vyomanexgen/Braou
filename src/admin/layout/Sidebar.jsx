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

export default function Sidebar({ headerHeight }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAdmin();

  const forceReset = localStorage.getItem("FORCE_PASSWORD_RESET") === "true";

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
      {/* MOBILE TOGGLE */}
      {!forceReset && (
        <button
          onClick={() => setOpen(!open)}
          style={{ top: headerHeight + 12 }}
          className="fixed left-3 z-[9999] md:hidden bg-cyan-700 text-white p-2 rounded-lg"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed left-0 z-40 w-64
          bg-gradient-to-b from-cyan-200 to-cyan-300 p-4
          transition-transform duration-300
          overflow-y-auto no-scrollbar
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0`}
        style={{
          top: headerHeight,
          height: `calc(100vh - ${headerHeight}px)`,
        }}
      >
        <h2 className="text-xl font-extrabold text-cyan-900 mb-6 text-center">
          Admin Panel
        </h2>

        <ul className="space-y-2">
          {menu.map(({ to, label, icon: Icon }) => (
            <li key={label}>
              <NavLink
                to={forceReset ? "#" : to}
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
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <button
            disabled={forceReset}
            onClick={handleLogout}
            className={`w-full flex items-center justify-center gap-3 py-3 rounded-lg font-semibold transition
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
