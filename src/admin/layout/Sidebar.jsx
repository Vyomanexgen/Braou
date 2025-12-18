import { NavLink } from "react-router-dom";
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
} from "react-icons/fa";
import { MdLiveTv } from "react-icons/md";
import { useState } from "react";

const menu = [
  { to: "/admin/home", label: "Home", icon: FaHome },
  { to: "/admin/about", label: "About", icon: FaUser },
  { to: "/admin/live", label: "Live", icon: MdLiveTv },
  { to: "/admin/youtube", label: "Youtube", icon: FaYoutube },
  { to: "/admin/radio", label: "Web Radio", icon: FaPodcast },
  { to: "/admin/vidyagani", label: "Vidyagani", icon: FaPodcast },
  { to: "/admin/tsat", label: "T-SAT", icon: FaSatelliteDish },
  { to: "/admin/air", label: "AIR", icon: FaWifi },
  { to: "/admin/events", label: "Events", icon: FaTrophy },
  { to: "/admin/banner", label: "Banner", icon: FaRegImage },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ===== MOBILE TOGGLE BUTTON ===== */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-3 left-3 z-[9999] md:hidden bg-cyan-700 text-white p-2 rounded-lg"
      >
        {open ? <FaTimes /> : <FaBars />}
      </button>

      {/* ===== SIDEBAR ===== */}
      <aside
        className={`fixed top-0 left-0 z-[9998] h-full w-64 bg-gradient-to-b from-cyan-200 to-cyan-300 p-4
        transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <h2 className="text-xl font-extrabold text-cyan-900 mb-6 text-center">
          Admin Panel
        </h2>

        <ul className="space-y-2">
          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.label}>
                <NavLink
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-lg font-semibold transition
                     ${
                       isActive
                         ? "bg-white text-cyan-700 border-l-4 border-cyan-700"
                         : "hover:bg-white/50 text-gray-800"
                     }`
                  }
                >
                  <Icon className="text-lg" />
                  {item.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </aside>
    </>
  );
}
