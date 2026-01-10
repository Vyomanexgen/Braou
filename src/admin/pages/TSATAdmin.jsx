// // import { useEffect, useState } from "react";
// // import {
// //   FaEdit,
// //   FaClock,
// //   FaFilePdf,
// //   FaEye,
// //   FaEyeSlash,
// //   FaLink,
// //   FaCalendarAlt,
// // } from "react-icons/fa";
// // import { adminFetch } from "../utils/adminFetch";

// // const SCROLLING_API = "/tsat/scrolling";
// // const NIPUNA_API = "/tsat/nipuna";
// // const VIDYA_API = "/tsat/vidya";

// // const clone = (o) => JSON.parse(JSON.stringify(o));

// // /* ========================= MAIN ========================= */
// // export default function TSATAdmin() {
// //   return (
// //     <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
// //       <h1 className="text-3xl font-extrabold text-blue-900">T-SAT Admin</h1>

// //       <Section title="Scrolling Text">
// //         <ScrollingAdmin />
// //       </Section>

// //       <Section title="Schedules">
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //           <MediaAdmin title="Nipuna" api={NIPUNA_API} />
// //           <MediaAdmin title="Vidya" api={VIDYA_API} />
// //         </div>
// //       </Section>
// //     </div>
// //   );
// // }

// // /* ========================= SECTION ========================= */
// // function Section({ title, children }) {
// //   return (
// //     <div className="space-y-3">
// //       <h2 className="text-xl font-bold text-blue-900 border-b pb-2">{title}</h2>
// //       {children}
// //     </div>
// //   );
// // }

// // /* ========================= EDITABLE CARD ========================= */
// // function EditableCard({ title, view, edit, onSave, onCancel }) {
// //   const [editing, setEditing] = useState(false);
// //   const [saving, setSaving] = useState(false);

// //   const handleSave = async () => {
// //     setSaving(true);
// //     await onSave();
// //     setSaving(false);
// //     setEditing(false);
// //   };

// //   return (
// //     <div className="relative bg-cyan-100 rounded-xl p-4 shadow-md">
// //       <h3 className="font-bold text-lg text-cyan-900 mb-3">{title}</h3>

// //       {!editing ? (
// //         <>
// //           {view}
// //           <button
// //             onClick={() => setEditing(true)}
// //             className="absolute top-3 right-3 text-cyan-700 hover:scale-110 transition"
// //           >
// //             <FaEdit />
// //           </button>
// //         </>
// //       ) : (
// //         <>
// //           {edit}
// //           <div className="flex gap-3 mt-4">
// //             <button
// //               onClick={handleSave}
// //               disabled={saving}
// //               className="flex-1 bg-cyan-700 text-white py-2 rounded-lg"
// //             >
// //               {saving ? "Saving..." : "Save"}
// //             </button>
// //             <button
// //               onClick={() => {
// //                 onCancel();
// //                 setEditing(false);
// //               }}
// //               className="flex-1 border border-cyan-700 text-cyan-700 py-2 rounded-lg"
// //             >
// //               Cancel
// //             </button>
// //           </div>
// //         </>
// //       )}
// //     </div>
// //   );
// // }

// // /* ========================= SCROLLING ========================= */
// // function ScrollingAdmin() {
// //   const [item, setItem] = useState(null);
// //   const [original, setOriginal] = useState(null);

// //   // Helper to show 12h format in the View mode
// //   const format12h = (timeStr) => {
// //     if (!timeStr) return "—";
// //     const [h, m] = timeStr.split(":");
// //     let hours = parseInt(h, 10);
// //     const suffix = hours >= 12 ? "PM" : "AM";
// //     hours = hours % 12 || 12;
// //     return `${hours}:${m} ${suffix}`;
// //   };

// //   useEffect(() => {
// //     adminFetch(SCROLLING_API)
// //       .then((r) => r.json())
// //       .then((j) => {
// //         const scrollingItem = j?.data?.data;
// //         if (!scrollingItem) return;

// //         const normalized = {
// //           ...clone(scrollingItem),
// //           show: Boolean(scrollingItem.show),
// //         };

// //         setItem(normalized);
// //         setOriginal(clone(normalized));
// //       });
// //   }, []);

// //   if (!item) return <Empty />;

// //   const save = async () => {
// //     await adminFetch(`${SCROLLING_API}/${item._id}`, {
// //       method: "PUT",
// //       body: JSON.stringify({
// //         title: item.title,
// //         date: item.date,
// //         start_time: item.start_time,
// //         end_time: item.end_time,
// //         join_now_link: item.join_now_link,
// //         show: item.show ? 1 : 0,
// //       }),
// //     });
// //     setOriginal(clone(item));
// //   };

// //   return (
// //     <EditableCard
// //       title="Scrolling Content"
// //       view={
// //         <div className="space-y-4 pr-10">
// //           <Info label="Title" value={item.title} />
          
// //          <IconRow icon={<FaCalendarAlt />} label="Broadcast Date" value={item.date} />

// //           <div className="grid grid-cols-2 gap-3">
// //             {/* UPDATED: Wrap values in format12h() */}
// //             <IconRow
// //               icon={<FaClock />}
// //               label="Start Time"
// //               value={format12h(item.start_time)}
// //             />
// //             <IconRow
// //               icon={<FaClock />}
// //               label="End Time"
// //               value={format12h(item.end_time)}
// //             />
// //           </div>

// //           <StatusBox show={item.show} />
// //         </div>
// //       }
// //       edit={
// //         <div className="space-y-3">
// //           <Input
// //             label="Title"
// //             value={item.title}
// //             onChange={(v) => setItem({ ...item, title: v })}
// //           />
          
// //           <Input
// //             type="date"
// //             label="Date"
// //             value={item.date}
// //             onChange={(v) => setItem({ ...item, date: v })}
// //           />

// //           <div className="grid grid-cols-2 gap-4">
// //             {/* Keep type="time" here - it needs 24h format to work correctly */}
// //             <Input
// //               type="time"
// //               label="Start Time"
// //               value={item.start_time}
// //               onChange={(v) => setItem({ ...item, start_time: v })}
// //             />
// //             <Input
// //               type="time"
// //               label="End Time"
// //               value={item.end_time}
// //               onChange={(v) => setItem({ ...item, end_time: v })}
// //             />
// //           </div>

// //           <Input
// //             label="Join Now Link"
// //             value={item.join_now_link || ""}
// //             onChange={(v) => setItem({ ...item, join_now_link: v })}
// //           />

// //           {/* <Toggle
// //             label="Show scrolling"
// //             checked={item.show}
// //             onChange={(v) => setItem({ ...item, show: v })}
// //           /> */}
// //         </div>
// //       }
// //       onSave={save}
// //       onCancel={() => setItem(clone(original))}
// //     />
// //   );
// // }

// // /* ========================= MEDIA ========================= */


// // function MediaAdmin({ api, title }) {
// //   const BASE_API = import.meta.env.VITE_BASE_API;
// //   const [item, setItem] = useState(null);
// //   const [original, setOriginal] = useState(null);
// //   const [logoFile, setLogoFile] = useState(null);
// //   const [pdfFile, setPdfFile] = useState(null);

// //   useEffect(() => {
// //     adminFetch(api)
// //       .then((r) => r.json())
// //       .then((j) => {
// //         const last = j?.data?.slice(-1)[0];
// //         if (!last) return;
// //         setItem(clone(last));
// //         setOriginal(clone(last));
// //       });
// //   }, [api]);
// // const resolveFileUrl = (path) => {
// //   if (!path) return "";
// //   // If backend already gives full URL, use it
// //   if (path.startsWith("http")) return path;
// //   // Otherwise, prefix with BASE_API
// //   return `${BASE_API}${path}`;
// // };

// //   if (!item) return <Empty />;

// // const save = async () => {
// //   const fd = new FormData();
// //   fd.append("timings", item.timings || "");
// //   fd.append("date", item.date || "");
// //   if (logoFile) fd.append("logo", logoFile);
// //   if (pdfFile) fd.append("schedule_pdf", pdfFile);

// //   await adminFetch(`${api}/${item._id}`, {
// //     method: "PUT",
// //     body: fd,
// //   });

// //   // ✅ REFETCH UPDATED DATA
// //   const res = await adminFetch(api);
// //   const json = await res.json();
// //   const latest = json?.data?.slice(-1)[0];

// //   if (latest) {
// //     setItem(clone(latest));
// //     setOriginal(clone(latest));
// //   }

// //   setLogoFile(null);
// //   setPdfFile(null);
// // };


// //   return (
// //     <EditableCard
// //       title={title}
// //       view={
// //         <div className="space-y-3 pr-10">
// //           <IconRow
// //             icon={<FaClock />}
// //             label="Timings"
// //             value={item.timings || "—"}
// //           />
// //           {/* <IconRow icon="📅" label="Date" value={item.date || "—"} /> */}
// //           {item.logo && (
// //             <img
// //               src={item.logo}
// //               className="h-16 bg-white p-2 rounded object-contain"
// //             />
// //           )}
// //           {item.schedule_pdf && (
// //           <a
// //   href={`${resolveFileUrl(item.schedule_pdf)}?v=${item.updatedAt || Date.now()}`}
// //   target="_blank"
// //   rel="noopener noreferrer"
// // >
// //   <FaFilePdf /> View Schedule PDF
// // </a>

// //           )}
// //         </div>
// //       }
// //       edit={
// //         <div className="space-y-4">
// //           {item.logo && (
// //             <div className="bg-white p-3 rounded shadow-sm">
// //               <p className="text-xs text-gray-500 mb-1">Existing Logo</p>
// //        <img
// //   src={`${resolveFileUrl(item.logo)}?v=${item.updatedAt || Date.now()}`}
// //   className="h-16 bg-white p-2 rounded object-contain"
// // />


// //             </div>
// //           )}

// //           <FileInput
// //             label="Upload New Logo"
// //             accept="image/*"
// //             onChange={setLogoFile}
// //           />

// //           {item.schedule_pdf && (
// //             <div className="bg-white p-3 rounded shadow-sm">
// //               <p className="text-xs text-gray-500 mb-1">
// //                 Existing Schedule PDF
// //               </p>


// //               <a
// //   href={resolveFileUrl(item.schedule_pdf)}
// //   target="_blank"
// //   rel="noopener noreferrer"
// //   className="flex items-center gap-2 text-red-600 font-semibold"
// // >
// //   <FaFilePdf /> View Current PDF
// // </a>

// //             </div>
// //           )}

// //           <FileInput
// //             label="Upload New Schedule PDF"
// //             accept="application/pdf"
// //             onChange={setPdfFile}
// //           />

// //           <Input
// //             label="Timings"
// //             value={item.timings || ""}
// //             onChange={(v) => setItem({ ...item, timings: v })}
// //           />
// //           {/* <Input
// //             type="date"
// //             label="Date"
// //             value={item.date || ""}
// //             onChange={(v) => setItem({ ...item, date: v })}
// //           /> */}
// //         </div>
// //       }
// //       onSave={save}
// //       onCancel={() => setItem(clone(original))}
// //     />
// //   );
// // }

// // /* ========================= UI HELPERS ========================= */
// // function Info({ label, value }) {
// //   return (
// //     <div className="bg-white p-3 rounded shadow-sm">
// //       <p className="text-xs text-gray-500">{label}</p>
// //       <p className="font-semibold break-all">{value}</p>
// //     </div>
// //   );
// // }

// // function IconRow({ icon, label, value }) {
// //   return (
// //     <div className="flex items-center gap-3 bg-white p-3 rounded shadow-sm">
// //       <div className="p-2 bg-cyan-100 text-cyan-700 rounded-full">{icon}</div>
// //       <div>
// //         <p className="text-xs text-gray-500">{label}</p>
// //         <p className="font-semibold break-all">{value}</p>
// //       </div>
// //     </div>
// //   );
// // }

// // function StatusBox({ show }) {
// //   return (
// //     <IconRow
// //       icon={show ? <FaEye /> : <FaEyeSlash />}
// //       label="Status"
// //       value={show ? "Visible" : "Hidden"}
// //     />
// //   );
// // }

// // function Input({ label, value, onChange, type = "text" }) {
// //   return (
// //     <div>
// //       <label className="text-sm font-semibold">{label}</label>
// //       <input
// //         type={type}
// //         value={value || ""}
// //         onChange={(e) => onChange(e.target.value)}
// //         className="w-full mt-1 p-2 border rounded"
// //       />
// //     </div>
// //   );
// // }

// // function FileInput({ label, accept, onChange }) {
// //   return (
// //     <div>
// //       <label className="text-sm font-semibold">{label}</label>
// //       <input
// //         type="file"
// //         accept={accept}
// //         onChange={(e) => onChange(e.target.files[0])}
// //         className="w-full mt-1 p-2 border rounded bg-white"
// //       />
// //     </div>
// //   );
// // }

// // function Toggle({ label, checked, onChange }) {
// //   return (
// //     <label className="flex items-center gap-2 font-semibold">
// //       <input
// //         type="checkbox"
// //         checked={!!checked}
// //         onChange={(e) => onChange(e.target.checked)}
// //       />
// //       {label}
// //     </label>
// //   );
// // }

// // function Empty() {
// //   return <div className="text-sm text-gray-500">No data available</div>;
// // }





//  // TSATAdmin.jsx

// import { useEffect, useState } from "react";
// import {
//   FaEdit,
//   FaClock,
//   FaFilePdf,
//   FaEye,
//   FaEyeSlash,
//   FaCalendarAlt,
// } from "react-icons/fa";
// import { adminFetch } from "../utils/adminFetch";

// const SCROLLING_API = "/tsat/scrolling";
// const NIPUNA_API = "/tsat/nipuna";
// const VIDYA_API = "/tsat/vidya";

// const clone = (o) => JSON.parse(JSON.stringify(o));

// /* ========================= MAIN ========================= */
// export default function TSATAdmin() {
//   return (
//     <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
//       <h1 className="text-3xl font-extrabold text-blue-900">T-SAT Admin</h1>

//       <Section title="Scrolling Text">
//         <ScrollingAdmin />
//       </Section>

//       <Section title="Schedules">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <MediaAdmin title="Nipuna" api={NIPUNA_API} />
//           <MediaAdmin title="Vidya" api={VIDYA_API} />
//         </div>
//       </Section>
//     </div>
//   );
// }

// /* ========================= SECTION ========================= */
// function Section({ title, children }) {
//   return (
//     <div className="space-y-3">
//       <h2 className="text-xl font-bold text-blue-900 border-b pb-2">
//         {title}
//       </h2>
//       {children}
//     </div>
//   );
// }

// /* ========================= EDITABLE CARD ========================= */
// function EditableCard({ title, view, edit, onSave, onCancel }) {
//   const [editing, setEditing] = useState(false);
//   const [saving, setSaving] = useState(false);

//   const handleSave = async () => {
//     setSaving(true);
//     await onSave();
//     setSaving(false);
//     setEditing(false);
//   };

//   return (
//     <div className="relative bg-cyan-100 rounded-xl p-4 shadow-md">
//       <h3 className="font-bold text-lg text-cyan-900 mb-3">{title}</h3>

//       {!editing ? (
//         <>
//           {view}
//           <button
//             onClick={() => setEditing(true)}
//             className="absolute top-3 right-3 text-cyan-700 hover:scale-110 transition"
//           >
//             <FaEdit />
//           </button>
//         </>
//       ) : (
//         <>
//           {edit}
//           <div className="flex gap-3 mt-4">
//             <button
//               onClick={handleSave}
//               disabled={saving}
//               className="flex-1 bg-cyan-700 text-white py-2 rounded-lg"
//             >
//               {saving ? "Saving..." : "Save"}
//             </button>
//             <button
//               onClick={() => {
//                 onCancel();
//                 setEditing(false);
//               }}
//               className="flex-1 border border-cyan-700 text-cyan-700 py-2 rounded-lg"
//             >
//               Cancel
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// /* ========================= SCROLLING ========================= */
// function ScrollingAdmin() {
//   const [item, setItem] = useState(null);
//   const [original, setOriginal] = useState(null);

//   const format12h = (timeStr) => {
//     if (!timeStr) return "—";
//     const [h, m] = timeStr.split(":");
//     let hours = parseInt(h, 10);
//     const suffix = hours >= 12 ? "PM" : "AM";
//     hours = hours % 12 || 12;
//     return `${hours}:${m} ${suffix}`;
//   };

//   useEffect(() => {
//     adminFetch(SCROLLING_API)
//       .then((r) => r.json())
//       .then((j) => {
//         const scrollingItem = j?.data?.data;
//         if (!scrollingItem) return;

//         const normalized = {
//           ...clone(scrollingItem),
//           show: Boolean(scrollingItem.show),
//         };

//         setItem(normalized);
//         setOriginal(clone(normalized));
//       });
//   }, []);

//   if (!item) return <Empty />;

//   const save = async () => {
//     await adminFetch(`${SCROLLING_API}/${item._id}`, {
//       method: "PUT",
//       body: JSON.stringify({
//         title: item.title,
//         date: item.date,
//         start_time: item.start_time,
//         end_time: item.end_time,
//         join_now_link: item.join_now_link,
//         show: item.show ? 1 : 0,
//       }),
//     });
//     setOriginal(clone(item));
//   };

//   return (
//     <EditableCard
//       title="Scrolling Content"
//       view={
//         <div className="space-y-4 pr-10">
//           <Info label="Title" value={item.title} />
//           <IconRow
//             icon={<FaCalendarAlt />}
//             label="Broadcast Date"
//             value={item.date}
//           />
//           <div className="grid grid-cols-2 gap-3">
//             <IconRow
//               icon={<FaClock />}
//               label="Start Time"
//               value={format12h(item.start_time)}
//             />
//             <IconRow
//               icon={<FaClock />}
//               label="End Time"
//               value={format12h(item.end_time)}
//             />
//           </div>
//           <StatusBox show={item.show} />
//         </div>
//       }
//       edit={
//         <div className="space-y-3">
//           <Input
//             label="Title"
//             value={item.title}
//             onChange={(v) => setItem({ ...item, title: v })}
//           />
//           <Input
//             type="date"
//             label="Date"
//             value={item.date}
//             onChange={(v) => setItem({ ...item, date: v })}
//           />
//           <div className="grid grid-cols-2 gap-4">
//             <Input
//               type="time"
//               label="Start Time"
//               value={item.start_time}
//               onChange={(v) =>
//                 setItem({ ...item, start_time: v })
//               }
//             />
//             <Input
//               type="time"
//               label="End Time"
//               value={item.end_time}
//               onChange={(v) =>
//                 setItem({ ...item, end_time: v })
//               }
//             />
//           </div>
//           <Input
//             label="Join Now Link"
//             value={item.join_now_link || ""}
//             onChange={(v) =>
//               setItem({ ...item, join_now_link: v })
//             }
//           />
//         </div>
//       }
//       onSave={save}
//       onCancel={() => setItem(clone(original))}
//     />
//   );
// }

// /* ========================= MEDIA ========================= */
// function MediaAdmin({ api, title }) {
//   const [item, setItem] = useState(null);
//   const [original, setOriginal] = useState(null);
//   const [logoFile, setLogoFile] = useState(null);
//   const [pdfFile, setPdfFile] = useState(null);

//   useEffect(() => {
//     adminFetch(api)
//       .then((r) => r.json())
//       .then((j) => {
//         const last = j?.data?.slice(-1)[0];
//         if (!last) return;
//         setItem(clone(last));
//         setOriginal(clone(last));
//       });
//   }, [api]);

//   if (!item) return <Empty />;

//   const save = async () => {
//     const fd = new FormData();
//     fd.append("timings", item.timings || "");
//     fd.append("date", item.date || "");
//     if (logoFile) fd.append("logo", logoFile);
//     if (pdfFile) fd.append("schedule_pdf", pdfFile);

//     await adminFetch(`${api}/${item._id}`, {
//       method: "PUT",
//       body: fd,
//     });

//     setOriginal(clone(item));
//     setLogoFile(null);
//     setPdfFile(null);
//   };

//   return (
//     <EditableCard
//       title={title}
//       view={
//         <div className="space-y-3 pr-10">
//           <IconRow
//             icon={<FaClock />}
//             label="Timings"
//             value={item.timings || "—"}
//           />
//           {item.logo && (
//             <img
//               src={item.logo}
//               className="h-16 bg-white p-2 rounded object-contain"
//             />
//           )}
//           {item.schedule_pdf && (
//             <a
//               href={item.schedule_pdf}
//               target="_blank"
//               className="flex items-center gap-2 text-red-600 font-semibold"
//             >
//               <FaFilePdf /> View Schedule PDF
//             </a>
//           )}
//         </div>
//       }
//       edit={
//         <div className="space-y-4">
//           <FileInput
//             label="Upload New Logo"
//             accept="image/*"
//             onChange={setLogoFile}
//           />
//           <FileInput
//             label="Upload New Schedule PDF"
//             accept="application/pdf"
//             onChange={setPdfFile}
//           />
//           <Input
//             label="Timings"
//             value={item.timings || ""}
//             onChange={(v) =>
//               setItem({ ...item, timings: v })
//             }
//           />
//         </div>
//       }
//       onSave={save}
//       onCancel={() => setItem(clone(original))}
//     />
//   );
// }

// /* ========================= UI HELPERS ========================= */
// function Info({ label, value }) {
//   return (
//     <div className="bg-white p-3 rounded shadow-sm">
//       <p className="text-xs text-gray-500">{label}</p>
//       <p className="font-semibold break-all">{value}</p>
//     </div>
//   );
// }

// function IconRow({ icon, label, value }) {
//   return (
//     <div className="flex items-center gap-3 bg-white p-3 rounded shadow-sm">
//       <div className="p-2 bg-cyan-100 text-cyan-700 rounded-full">
//         {icon}
//       </div>
//       <div>
//         <p className="text-xs text-gray-500">{label}</p>
//         <p className="font-semibold break-all">{value}</p>
//       </div>
//     </div>
//   );
// }

// function StatusBox({ show }) {
//   return (
//     <IconRow
//       icon={show ? <FaEye /> : <FaEyeSlash />}
//       label="Status"
//       value={show ? "Visible" : "Hidden"}
//     />
//   );
// }

// function Input({ label, value, onChange, type = "text" }) {
//   return (
//     <div>
//       <label className="text-sm font-semibold">{label}</label>
//       <input
//         type={type}
//         value={value || ""}
//         onChange={(e) => onChange(e.target.value)}
//         className="w-full mt-1 p-2 border rounded"
//       />
//     </div>
//   );
// }

// function FileInput({ label, accept, onChange }) {
//   return (
//     <div>
//       <label className="text-sm font-semibold">{label}</label>
//       <input
//         type="file"
//         accept={accept}
//         onChange={(e) => onChange(e.target.files[0])}
//         className="w-full mt-1 p-2 border rounded bg-white"
//       />
//     </div>
//   );
// }

// function Empty() {
//   return (
//     <div className="text-sm text-gray-500">No data available</div>
//   );
// }

import { useEffect, useState } from "react";
import {
  FaEdit,
  FaClock,
  FaFilePdf,
  FaEye,
  FaEyeSlash,
  FaCalendarAlt,
} from "react-icons/fa";
import { adminFetch } from "../utils/adminFetch";

const SCROLLING_API = "/tsat/scrolling";
const NIPUNA_API = "/tsat/nipuna";
const VIDYA_API = "/tsat/vidya";

const clone = (o) => JSON.parse(JSON.stringify(o));

// Helper to ensure Admin and Frontend always target the same "latest" record
const pickLatest = (list) => {
  if (!Array.isArray(list) || list.length === 0) return null;
  return list.reduce((latest, item) =>
    new Date(item.updatedAt) > new Date(latest.updatedAt) ? item : latest
  );
};

/* ========================= MAIN ========================= */
export default function TSATAdmin() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      <h1 className="text-3xl font-extrabold text-blue-900">T-SAT Admin</h1>

      <Section title="Scrolling Text">
        <ScrollingAdmin />
      </Section>

      <Section title="Schedules">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MediaAdmin title="Nipuna" api={NIPUNA_API} />
          <MediaAdmin title="Vidya" api={VIDYA_API} />
        </div>
      </Section>
    </div>
  );
}

/* ========================= SECTION ========================= */
function Section({ title, children }) {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold text-blue-900 border-b pb-2">
        {title}
      </h2>
      {children}
    </div>
  );
}

/* ========================= EDITABLE CARD ========================= */
function EditableCard({ title, view, edit, onSave, onCancel }) {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const success = await onSave();
    setSaving(false);
    if (success) setEditing(false);
  };

  return (
    <div className="relative bg-cyan-100 rounded-xl p-4 shadow-md">
      <h3 className="font-bold text-lg text-cyan-900 mb-3">{title}</h3>

      {!editing ? (
        <>
          {view}
          <button
            onClick={() => setEditing(true)}
            className="absolute top-3 right-3 text-cyan-700 hover:scale-110 transition"
          >
            <FaEdit />
          </button>
        </>
      ) : (
        <>
          {edit}
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 bg-cyan-700 text-white py-2 rounded-lg disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => {
                onCancel();
                setEditing(false);
              }}
              className="flex-1 border border-cyan-700 text-cyan-700 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* ========================= SCROLLING ========================= */
function ScrollingAdmin() {
  const [item, setItem] = useState(null);
  const [original, setOriginal] = useState(null);

  const format12h = (timeStr) => {
    if (!timeStr) return "—";
    const [h, m] = timeStr.split(":");
    let hours = parseInt(h, 10);
    const suffix = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${m} ${suffix}`;
  };

  useEffect(() => {
    adminFetch(SCROLLING_API)
      .then((r) => r.json())
      .then((j) => {
        // Handle both single object and array responses
        const data = Array.isArray(j?.data) ? j.data : [j?.data?.data || j?.data];
        const scrollingItem = pickLatest(data);
        
        if (!scrollingItem) return;

        const normalized = {
          ...clone(scrollingItem),
          show: Boolean(scrollingItem.show),
        };

        setItem(normalized);
        setOriginal(clone(normalized));
      });
  }, []);

  if (!item) return <Empty />;

  const save = async () => {
    try {
      const res = await adminFetch(`${SCROLLING_API}/${item._id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: item.title,
          date: item.date,
          start_time: item.start_time,
          end_time: item.end_time,
          join_now_link: item.join_now_link,
          show: item.show ? 1 : 0,
        }),
      });
      const result = await res.json();
      if (result.status === "success") {
        setOriginal(clone(item));
        return true;
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return (
    <EditableCard
      title="Scrolling Content"
      view={
        <div className="space-y-4 pr-10">
          <Info label="Title" value={item.title} />
          <IconRow
            icon={<FaCalendarAlt />}
            label="Broadcast Date"
            value={item.date}
          />
          <div className="grid grid-cols-2 gap-3">
            <IconRow
              icon={<FaClock />}
              label="Start Time"
              value={format12h(item.start_time)}
            />
            <IconRow
              icon={<FaClock />}
              label="End Time"
              value={format12h(item.end_time)}
            />
          </div>
          <StatusBox show={item.show} />
        </div>
      }
      edit={
        <div className="space-y-3">
          <Input
            label="Title"
            value={item.title}
            onChange={(v) => setItem({ ...item, title: v })}
          />
          <Input
            type="date"
            label="Date"
            value={item.date}
            onChange={(v) => setItem({ ...item, date: v })}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="time"
              label="Start Time"
              value={item.start_time}
              onChange={(v) => setItem({ ...item, start_time: v })}
            />
            <Input
              type="time"
              label="End Time"
              value={item.end_time}
              onChange={(v) => setItem({ ...item, end_time: v })}
            />
          </div>
          <Input
            label="Join Now Link"
            value={item.join_now_link || ""}
            onChange={(v) => setItem({ ...item, join_now_link: v })}
          />
        </div>
      }
      onSave={save}
      onCancel={() => setItem(clone(original))}
    />
  );
}

/* ========================= MEDIA ========================= */
// function MediaAdmin({ api, title }) {
//   const [item, setItem] = useState(null);
//   const [original, setOriginal] = useState(null);
//   const [logoFile, setLogoFile] = useState(null);
//   const [pdfFile, setPdfFile] = useState(null);

//   useEffect(() => {
//     adminFetch(api)
//       .then((r) => r.json())
//       .then((j) => {
//         const latest = pickLatest(j?.data);
//         if (!latest) return;
//         setItem(clone(latest));
//         setOriginal(clone(latest));
//       });
//   }, [api]);

//   if (!item) return <Empty />;

//   const save = async () => {
//     try {
//       const fd = new FormData();
//       fd.append("timings", item.timings || "");
//       fd.append("date", item.date || "");
//       if (logoFile) fd.append("logo", logoFile);
//       if (pdfFile) fd.append("schedule_pdf", pdfFile);

//       const res = await adminFetch(`${api}/${item._id}`, {
//         method: "PUT",
//         body: fd,
//       });

//       const result = await res.json();

//       if (result.status === "success") {
//         // IMPORTANT: The backend returns the new object with updated Supabase URLs.
//         // We update the local state with that data.
//         const updatedData = result.data;
//         setItem(clone(updatedData));
//         setOriginal(clone(updatedData));
//         setLogoFile(null);
//         setPdfFile(null);
//         return true;
//       }
//       return false;
//     } catch (err) {
//       console.error("Save failed", err);
//       return false;
//     }
//   };

//   return (
//     <EditableCard
//       title={title}
//       view={
//         <div className="space-y-3 pr-10">
//           <IconRow
//             icon={<FaClock />}
//             label="Timings"
//             value={item.timings || "—"}
//           />
//           {item.logo && (
//             <div className="space-y-1">
//                <p className="text-xs text-gray-500">Current Logo:</p>
//                <img
//                 src={`${item.logo}?t=${Date.now()}`}
//                 className="h-16 bg-white p-2 rounded shadow-sm border object-contain"
//               />
//             </div>
//           )}
//           {item.schedule_pdf && (
//             <a
//               href={`${item.schedule_pdf}?t=${Date.now()}`}
//               target="_blank"
//               rel="noreferrer"
//               className="flex items-center gap-2 text-red-600 font-semibold hover:underline mt-2"
//             >
//               <FaFilePdf /> View Current Schedule PDF
//             </a>
//           )}
//         </div>
//       }
//       edit={
//         <div className="space-y-4">
//           <FileInput
//             label="Upload New Logo"
//             accept="image/*"
//             onChange={setLogoFile}
//           />
//           <FileInput
//             label="Upload New Schedule PDF"
//             accept="application/pdf"
//             onChange={setPdfFile}
//           />
//           <Input
//             label="Timings"
//             value={item.timings || ""}
//             onChange={(v) => setItem({ ...item, timings: v })}
//           />
//         </div>
//       }
//       onSave={save}
//       onCancel={() => {
//         setItem(clone(original));
//         setLogoFile(null);
//         setPdfFile(null);
//       }}
//     />
//   );
// }

/* ========================= MEDIA ========================= */
/* ========================= MEDIA ========================= */
function MediaAdmin({ api, title }) {
  const [item, setItem] = useState(null);
  const [original, setOriginal] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  
  // State for the success notification
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    adminFetch(api)
      .then((r) => r.json())
      .then((j) => {
        const latest = pickLatest(j?.data);
        if (!latest) return;
        setItem(clone(latest));
        setOriginal(clone(latest));
      });
  }, [api]);

  if (!item) return <Empty />;

  const save = async () => {
    try {
      const fd = new FormData();
      fd.append("timings", item.timings || "");
      fd.append("date", item.date || "");
      if (logoFile) fd.append("logo", logoFile);
      if (pdfFile) fd.append("schedule_pdf", pdfFile);

      const res = await adminFetch(`${api}/${item._id}`, {
        method: "PUT",
        body: fd,
      });

      const result = await res.json();
      if (result.status === "success") {
        setItem(clone(result.data));
        setOriginal(clone(result.data));
        setLogoFile(null);
        setPdfFile(null);
        
        // Trigger the success notification
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000); // Hide after 3 seconds
        
        return true;
      }
      return false;
    } catch (err) {
      console.error("Save failed", err);
      return false;
    }
  };

  return (
    <div className="relative">
      {/* SUCCESS TOAST NOTIFICATION */}
      {showToast && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-bounce">
          <span className="font-bold text-sm">✓ {title} Updated Successfully!</span>
        </div>
      )}

      <EditableCard
        title={title}
        view={
          <div className="space-y-4 pr-10">
            <IconRow
              icon={<FaClock />}
              label="Timings"
              value={item.timings || "—"}
            />
            {/* PREVIEW REMAINS HORIZONTAL */}
            <div className="flex flex-wrap gap-6 items-end">
              {item.logo && (
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Current Logo</p>
                  <div className="bg-white p-2 rounded-lg border shadow-sm inline-block">
                    <img
                      src={`${item.logo}?t=${Date.now()}`}
                      className="h-12 w-auto object-contain"
                      alt="Current Logo"
                    />
                  </div>
                </div>
              )}
              {item.schedule_pdf && (
                <a
                  href={`${item.schedule_pdf}?t=${Date.now()}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg border border-red-100 font-semibold hover:bg-red-100 transition-colors h-fit"
                >
                  <FaFilePdf /> View PDF
                </a>
              )}
            </div>
          </div>
        }
        edit={
          <div className="space-y-5">
            {/* EDIT INPUTS STACKED VERTICALLY (ONE BY ONE) */}
            <div className="flex flex-col gap-4">
              <ModernFileInput
                label="Update Logo"
                accept="image/*"
                fileName={logoFile?.name}
                onChange={setLogoFile}
                color="cyan"
              />
              <ModernFileInput
                label="Update Schedule PDF"
                accept="application/pdf"
                fileName={pdfFile?.name}
                onChange={setPdfFile}
                color="red"
              />
            </div>
            
            <div className="bg-white p-4 rounded-xl border shadow-inner">
               <Input
                  label="Timings (e.g., 1:00–2:00 PM)"
                  value={item.timings || ""}
                  onChange={(v) => setItem({ ...item, timings: v })}
                />
            </div>
          </div>
        }
        onSave={save}
        onCancel={() => {
          setItem(clone(original));
          setLogoFile(null);
          setPdfFile(null);
        }}
      />
    </div>
  );
}

/* ========================= NEW UI HELPERS ========================= */

function ModernFileInput({ label, accept, onChange, fileName, color = "cyan" }) {
  const accentClass = color === "red" ? "text-red-600 bg-red-50 border-red-200" : "text-cyan-700 bg-cyan-50 border-cyan-200";
  
  return (
    <div className="space-y-1">
      <label className="text-xs font-bold text-gray-600 uppercase ml-1">{label}</label>
      <label className={`flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-xl cursor-pointer transition-all hover:bg-opacity-70 ${accentClass}`}>
        <div className="flex flex-col items-center justify-center pt-2 pb-3 px-2 text-center">
          <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="text-[10px] font-medium truncate max-w-full">
            {fileName ? fileName : "Click to upload"}
          </p>
        </div>
        <input 
          type="file" 
          className="hidden" 
          accept={accept} 
          onChange={(e) => onChange(e.target.files[0])} 
        />
      </label>
    </div>
  );
}

/* ========================= UI HELPERS ========================= */
function Info({ label, value }) {
  return (
    <div className="bg-white p-3 rounded shadow-sm">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-semibold break-all">{value}</p>
    </div>
  );
}

function IconRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 bg-white p-3 rounded shadow-sm">
      <div className="p-2 bg-cyan-100 text-cyan-700 rounded-full">
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-semibold break-all">{value}</p>
      </div>
    </div>
  );
}

function StatusBox({ show }) {
  return (
    <IconRow
      icon={show ? <FaEye /> : <FaEyeSlash />}
      label="Status"
      value={show ? "Visible" : "Hidden"}
    />
  );
}

function Input({ label, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="text-sm font-semibold">{label}</label>
      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-cyan-500 outline-none"
      />
    </div>
  );
}

function FileInput({ label, accept, onChange }) {
  return (
    <div>
      <label className="text-sm font-semibold">{label}</label>
      <input
        type="file"
        accept={accept}
        onChange={(e) => onChange(e.target.files[0])}
        className="w-full mt-1 p-2 border rounded bg-white text-sm"
      />
    </div>
  );
}

function Empty() {
  return (
    <div className="p-10 text-center text-sm text-gray-500 italic bg-gray-50 rounded-xl border-2 border-dashed">
      No data available to manage.
    </div>
  );
}