import React, { useEffect, useRef, useState } from "react";
import { adminFetch } from "../utils/adminFetch";

export default function BannerAdmin() {
  const [bannerId, setBannerId] = useState(null);
  const [bannerUrl, setBannerUrl] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);

  const fileInputRef = useRef(null);

  /* ================= FETCH BANNER ================= */
  const fetchBanner = async () => {
    try {
      setFetching(true);

      const res = await adminFetch("/banner", {
        cache: "no-store",
      });

      const result = await res.json();

      if (Array.isArray(result?.data) && result.data.length > 0) {
        const lastItem = result.data[result.data.length - 1];
        setBannerId(lastItem._id);
        setBannerUrl(lastItem.image_url || "");
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

  /* ================= FILE PICK ================= */
  const openFilePicker = () => {
    if (!saving) {
      fileInputRef.current?.click();
    }
  };

  const onFileSelected = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 🔐 Validate image
    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be less than 5MB");
      return;
    }

    if (previewUrl) URL.revokeObjectURL(previewUrl);

    const objectUrl = URL.createObjectURL(file);
    setSelectedFile(file);
    setPreviewUrl(objectUrl);
  };

  /* ================= CANCEL ================= */
  const cancelChange = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);

    setSelectedFile(null);
    setPreviewUrl("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /* ================= SAVE ================= */
  const saveBanner = async () => {
    if (!bannerId || !selectedFile || saving) return;

    try {
      setSaving(true);

      const formData = new FormData();
      formData.append("image", selectedFile);

      await adminFetch(`/banner/${bannerId}`, {
        method: "PUT",
        body: formData,
      });

      cancelChange();
      fetchBanner();
    } catch (err) {
      console.error("Upload banner failed:", err);
      alert("Failed to upload banner");
    } finally {
      setSaving(false);
    }
  };

  /* ================= CLEANUP ================= */
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  /* ================= LOADING ================= */
  if (fetching) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="w-10 h-10 border-4 border-cyan-300 border-t-cyan-700 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-extrabold mb-6">Banner</h1>

      {/* CURRENT / PREVIEW BANNER */}
      {bannerUrl && (
        <div className="mb-4">
          <img
            src={previewUrl || bannerUrl}
            alt="Banner"
            className="w-full max-h-[180px] object-cover rounded-lg shadow"
          />
        </div>
      )}

      {/* HIDDEN FILE INPUT */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={onFileSelected}
        disabled={saving}
        className="hidden"
      />

      {/* ACTION BUTTONS */}
      <div className="flex gap-3">
        {!selectedFile ? (
          <button
            onClick={openFilePicker}
            disabled={saving}
            className="bg-cyan-700 text-white px-5 py-2 rounded-lg
            hover:bg-cyan-800 transition disabled:opacity-50"
          >
            Upload Banner
          </button>
        ) : (
          <>
            <button
              onClick={saveBanner}
              disabled={saving}
              className="bg-green-600 text-white px-5 py-2 rounded-lg
              hover:bg-green-700 transition disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>

            <button
              onClick={cancelChange}
              disabled={saving}
              className="bg-gray-400 text-white px-5 py-2 rounded-lg
              hover:bg-gray-500 transition disabled:opacity-50"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}
