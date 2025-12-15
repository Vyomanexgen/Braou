import { useEffect, useState } from "react";

const UPDATES_API = `${import.meta.env.VITE_BASE_API}/updates`;

const DEFAULT_UPDATES = [
  "Admission notifications will be announced shortly",
  "Online examination schedules will be updated soon",
  "Students are advised to check the website regularly for announcements",
];

const Updates = () => {
  const [updates, setUpdates] = useState(DEFAULT_UPDATES);

  useEffect(() => {
    fetch(UPDATES_API)
      .then(res => res.json())
      .then(result => {
        if (Array.isArray(result?.data) && result.data.length > 0) {
          setUpdates(result.data);
        }
      })
      .catch(() => {
        setUpdates(DEFAULT_UPDATES);
      });
  }, []);

  return (
    <main
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/pictures/website BG Final.jpg')" }}
    >
      <section className="max-w-[1200px] mx-auto px-4 py-12">
        <h1
          className="text-center font-black uppercase tracking-wide text-slate-900 text-[clamp(20px,4vw,32px)] mb-8"
          style={{ fontFamily: "'Arial Black', Arial, sans-serif" }}
        >
          Latest Updates
        </h1>

        <ul className="space-y-4">
          {updates.map((item, index) => (
            <li
              key={index}
              className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow text-slate-800 font-medium"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Updates;
