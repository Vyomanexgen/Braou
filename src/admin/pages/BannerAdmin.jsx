// import React, { useEffect, useRef, useState } from "react";
// import { adminFetch } from "../utils/adminFetch";

// export default function BannerAdmin() {
//   const [bannerId, setBannerId] = useState(null);
//   const [bannerUrl, setBannerUrl] = useState("");

//   const [selectedFile, setSelectedFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState("");

//   const [fetching, setFetching] = useState(true);
//   const [saving, setSaving] = useState(false);
// const [bannerEnabled, setBannerEnabled] = useState(true);

//   const fileInputRef = useRef(null);

//   /* ================= FETCH BANNER ================= */
//   const fetchBanner = async () => {
//     try {
//       setFetching(true);

//       const res = await adminFetch("/banner", {
//         cache: "no-store",
//       });

//       const result = await res.json();

//       if (Array.isArray(result?.data) && result.data.length > 0) {
//         const lastItem = result.data[result.data.length - 1];
//         setBannerId(lastItem._id);
//         setBannerUrl(lastItem.image_url || "");
//          setBannerEnabled(lastItem.is_active ?? true);
//       }
//     } catch (err) {
//       console.error("Fetch banner failed:", err);
//     } finally {
//       setFetching(false);
//     }
//   };

//   useEffect(() => {
//     fetchBanner();
//   }, []);

//   /* ================= FILE PICK ================= */
//   const openFilePicker = () => {
//     if (!saving) {
//       fileInputRef.current?.click();
//     }
//   };

//   const onFileSelected = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     // 🔐 Validate image
//     if (!file.type.startsWith("image/")) {
//       alert("Only image files are allowed");
//       return;
//     }

//     if (file.size > 5 * 1024 * 1024) {
//       alert("Image must be less than 5MB");
//       return;
//     }

//     if (previewUrl) URL.revokeObjectURL(previewUrl);

//     const objectUrl = URL.createObjectURL(file);
//     setSelectedFile(file);
//     setPreviewUrl(objectUrl);
//   };

//   /* ================= CANCEL ================= */
//   const cancelChange = () => {
//     if (previewUrl) URL.revokeObjectURL(previewUrl);

//     setSelectedFile(null);
//     setPreviewUrl("");

//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   /* ================= SAVE ================= */
//   // const saveBanner = async () => {
//   //   if (!bannerId || !selectedFile || saving) return;

//   //   try {
//   //     setSaving(true);

//   //     const formData = new FormData();
//   //     formData.append("image", selectedFile);

//   //     await adminFetch(`/banner/${bannerId}`, {
//   //       method: "PUT",
//   //       body: formData,
//   //     });

//   //     cancelChange();
//   //     fetchBanner();
//   //   } catch (err) {
//   //     console.error("Upload banner failed:", err);
//   //     alert("Failed to upload banner");
//   //   } finally {
//   //     setSaving(false);
//   //   }
//   // };
// const saveBanner = async () => {
//   if (!bannerId || saving) return;

//   try {
//     setSaving(true);

//     const formData = new FormData();
//     formData.append("is_active", bannerEnabled);

//     if (selectedFile) {
//       formData.append("image", selectedFile);
//     }

//     await adminFetch(`/banner/${bannerId}`, {
//       method: "PUT",
//       body: formData,
//     });

//     cancelChange();
//     fetchBanner();
//   } catch (err) {
//     console.error("Upload banner failed:", err);
//     alert("Failed to update banner");
//   } finally {
//     setSaving(false);
//   }
// };

//   /* ================= CLEANUP ================= */
//   useEffect(() => {
//     return () => {
//       if (previewUrl) URL.revokeObjectURL(previewUrl);
//     };
//   }, [previewUrl]);

//   /* ================= LOADING ================= */
//   if (fetching) {
//     return (
//       <div className="flex justify-center items-center min-h-[200px]">
//         <div className="w-10 h-10 border-4 border-cyan-300 border-t-cyan-700 rounded-full animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl">
//       <h1 className="text-2xl font-extrabold mb-6">Banner</h1>
//       <div className="flex items-center gap-3 mb-4">
//   <label className="font-semibold text-gray-800">
//     Show Banner
//   </label>

//   <input
//     type="checkbox"
//     checked={bannerEnabled}
//     onChange={(e) => setBannerEnabled(e.target.checked)}
//     disabled={saving}
//     className="w-5 h-5 cursor-pointer"
//   />
// </div>


//       {/* CURRENT / PREVIEW BANNER */}
//       {bannerUrl && (
//         <div className="mb-4">
//           <img
//             src={previewUrl || bannerUrl}
//             alt="Banner"
//             className="w-full max-h-[180px] object-cover rounded-lg shadow"
//           />
//         </div>
//       )}

//       {/* HIDDEN FILE INPUT */}
//       <input
//         type="file"
//         accept="image/*"
//         ref={fileInputRef}
//         onChange={onFileSelected}
//         disabled={saving}
//         className="hidden"
//       />

//       {/* ACTION BUTTONS */}
//       <div className="flex gap-3">
//         {!selectedFile ? (
//           <button
//             onClick={openFilePicker}
//             disabled={saving}
//             className="bg-cyan-700 text-white px-5 py-2 rounded-lg
//             hover:bg-cyan-800 transition disabled:opacity-50"
//           >
//             Upload Banner
//           </button>
//         ) : (
//           <>
//             <button
//               onClick={saveBanner}
//               disabled={saving}
//               className="bg-green-600 text-white px-5 py-2 rounded-lg
//               hover:bg-green-700 transition disabled:opacity-50"
//             >
//               {saving ? "Saving..." : "Save"}
//             </button>

//             <button
//               onClick={cancelChange}
//               disabled={saving}
//               className="bg-gray-400 text-white px-5 py-2 rounded-lg
//               hover:bg-gray-500 transition disabled:opacity-50"
//             >
//               Cancel
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useRef, useState } from "react";
import { adminFetch } from "../utils/adminFetch";

export default function BannerAdmin() {
  const [bannerId, setBannerId] = useState(null);
  const [bannerUrl, setBannerUrl] = useState("");

  // States for scheduling and visibility
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);

  const fileInputRef = useRef(null);

  /* ================= FETCH BANNER ================= */
  // const fetchBanner = async () => {
    
  //   try {
  //     setFetching(true);
  //     const res = await adminFetch("/banner", {
  //       cache: "no-store",
  //     });

  //     const result = await res.json();

  //     if (Array.isArray(result?.data) && result.data.length > 0) {
  //       const lastItem = result.data[result.data.length - 1];
  //       setBannerId(lastItem._id);
  //       setBannerUrl(lastItem.image_url || "");
        
  //       // Populate dates (Stripping T00:00:00Z if present)
  //       if (lastItem.start_date) setStartDate(lastItem.start_date.split("T")[0]);
  //       if (lastItem.end_date) setEndDate(lastItem.end_date.split("T")[0]);
        
  //       // Sync the toggle state
  //       setIsActive(lastItem.active ?? lastItem.is_active ?? true);
  //     }
  //   } catch (err) {
  //     console.error("Fetch banner failed:", err);
  //   } finally {
  //     setFetching(false);
  //   }
  // };

  const fetchBanner = async () => {
  try {
    setFetching(true);
    // 1. Fetch the data
    const res = await adminFetch("/banner", { cache: "no-store" });
    
    // 2. Convert to JSON
    const result = await res.json();

    // 3. Safety Check: If backend sends "data: null", stop here
    if (!result || result.data === null) {
      console.error("Backend Error: API returned null data.");
      setFetching(false);
      return; 
    }

    // 4. If we have data, populate the admin fields
    if (Array.isArray(result.data) && result.data.length > 0) {
      const lastItem = result.data[result.data.length - 1];
      setBannerId(lastItem._id);
      setBannerUrl(lastItem.image_url || "");
      
      // Update dates only if they exist in the DB
      if (lastItem.start_date) setStartDate(lastItem.start_date.split("T")[0]);
      if (lastItem.end_date) setEndDate(lastItem.end_date.split("T")[0]);
      
      // Update active status
      setIsActive(lastItem.active ?? lastItem.is_active ?? false);
    }
  } catch (err) {
    console.error("Fetch banner failed:", err);
  } finally {
    setFetching(false);
  }
};
  useEffect(() => {
    fetchBanner();
  }, []);

  /* ================= FILE PICKER LOGIC ================= */
  const openFilePicker = () => {
    if (!saving) fileInputRef.current?.click();
  };

  const onFileSelected = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed");
      return;
    }

    if (previewUrl) URL.revokeObjectURL(previewUrl);
    const objectUrl = URL.createObjectURL(file);
    setSelectedFile(file);
    setPreviewUrl(objectUrl);
  };

  const cancelChange = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(null);
    setPreviewUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  /* ================= SAVE (PUT REQUEST) ================= */
  const saveBanner = async () => {
  if (!bannerId || saving) return;

  try {
    setSaving(true);
    const formData = new FormData();
    
    // 🔥 Ensure these keys match your Postman request exactly
    formData.append("start_date", startDate); 
    formData.append("end_date", endDate);
    
    // Convert boolean to string so backend parsers (like Multer) can read it
    formData.append("active", String(isActive)); 

    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    const res = await adminFetch(`/banner/${bannerId}`, {
      method: "PUT",
      body: formData,
    });

    if (res.ok) {
      alert("Banner updated successfully!");
      fetchBanner(); 
    }
  } catch (err) {
    console.error("Save Error:", err);
  } finally {
    setSaving(false);
  }
};
  useEffect(() => {
    return () => { if (previewUrl) URL.revokeObjectURL(previewUrl); };
  }, [previewUrl]);

  if (fetching) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="w-10 h-10 border-4 border-cyan-300 border-t-cyan-700 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <h1 className="text-2xl font-extrabold mb-6 text-gray-800">Banner Administration</h1>

      {/* SCHEDULE & STATUS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-slate-50 p-6 rounded-lg border border-slate-200">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Display Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Display End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none"
          />
        </div>

        <div className="md:col-span-2 flex items-center gap-3 pt-2">
          <input
            id="active-toggle"
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            disabled={saving}
            className="w-5 h-5 cursor-pointer accent-cyan-700"
          />
          <label htmlFor="active-toggle" className="font-bold text-slate-800 cursor-pointer select-none">
            Banner Active (Visible to Public)
          </label>
        </div>
      </div>

      {/* IMAGE PREVIEW */}
      <div className="mb-8">
        <label className="block text-sm font-bold text-slate-700 mb-3">
          {selectedFile ? "New Banner Preview:" : "Current Active Banner:"}
        </label>
        <div className="relative group overflow-hidden rounded-xl border-2 border-slate-100 shadow-sm">
          {bannerUrl || previewUrl ? (
            <img
              src={previewUrl || bannerUrl}
              alt="Banner"
              className="w-full max-h-[250px] object-cover"
            />
          ) : (
            <div className="w-full h-40 bg-slate-100 flex items-center justify-center text-slate-400 italic">
              No banner image uploaded yet
            </div>
          )}
        </div>
      </div>

      {/* ACTION BAR */}
      <div className="flex flex-wrap gap-4 border-t pt-6">
        <input type="file" accept="image/*" ref={fileInputRef} onChange={onFileSelected} className="hidden" />
        
        <button
          onClick={openFilePicker}
          disabled={saving}
          className="bg-cyan-700 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-cyan-800 transition shadow-sm disabled:opacity-50"
        >
          {selectedFile ? "Change Image" : "Select Image"}
        </button>

        <button
          onClick={saveBanner}
          disabled={saving}
          className="bg-green-600 text-white px-10 py-2.5 rounded-lg font-bold hover:bg-green-700 transition shadow-md disabled:opacity-50"
        >
          {saving ? "Processing..." : "Update Settings & Banner"}
        </button>

        {selectedFile && !saving && (
          <button
            onClick={cancelChange}
            className="bg-slate-200 text-slate-700 px-6 py-2.5 rounded-lg font-medium hover:bg-slate-300 transition"
          >
            Cancel Selection
          </button>
        )}
      </div>
    </div>
  );
}