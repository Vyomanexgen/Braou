import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";

const BASE_API = import.meta.env.VITE_BASE_API;
const LIVE_ID = "693440177f37dec04ae069a1";

export default function LiveAdmin() {
  const [title, setTitle] = useState("");
  const [liveLink, setLiveLink] = useState("");

  const [editing, setEditing] = useState(null); // "title" | "live_link"
  const [tempValue, setTempValue] = useState("");

  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);

  /* ---------------- FETCH LIVE DATA ---------------- */
  const fetchLiveData = async () => {
    try {
      setFetching(true);

      // ✅ CORRECT GET API (no ID)
      const res = await fetch(`${BASE_API}/live/`, {
        cache: "no-store",
      });

      const result = await res.json();

      /**
       * Assumption:
       * result.data = {
       *   title: "...",
       *   live_link: "..."
       * }
       */
      if (result?.data) {
        setTitle(result.data.title || "");
        setLiveLink(result.data.live_link || "");
      }
    } catch (err) {
      console.error("Failed to fetch live data", err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchLiveData();
  }, []);

  /* ---------------- SAVE FIELD ---------------- */
  const saveField = async (field, value) => {
    try {
      setSaving(true);

      // ✅ BACKEND EXPECTS BOTH FIELDS (safe update)
      const payload = {
        title,
        live_link: liveLink,
        [field]: value, // overwrite only edited field
      };

      await fetch(`${BASE_API}/live/${LIVE_ID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // ✅ Update local state
      if (field === "title") setTitle(value);
      if (field === "live_link") setLiveLink(value);

      setEditing(null);
    } catch (err) {
      console.error("Save failed", err);
      alert("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  /* ---------------- EDITABLE CARD ---------------- */
  const Card = ({ title: label, value, field }) => (
    <div className="mb-6">
      <h3 className="font-bold text-lg text-blue-900 mb-2">{label}</h3>

      <div className="relative bg-cyan-100 rounded-xl p-5">
        {editing !== field ? (
          <>
            <p className="font-semibold pr-10 break-words">{value || "—"}</p>
            <button
              onClick={() => {
                setTempValue(value);
                setEditing(field);
              }}
              className="absolute top-4 right-4 text-cyan-700 hover:scale-110 transition"
            >
              <FaEdit />
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              className="w-full rounded-lg p-3 border focus:outline-none focus:ring-2 focus:ring-cyan-600"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
            />
            <button
              onClick={() => saveField(field, tempValue)}
              disabled={saving}
              className="
                mt-3 bg-cyan-700 text-white px-4 py-1 rounded-lg
                hover:bg-cyan-800 transition
                disabled:opacity-50
              "
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </>
        )}
      </div>
    </div>
  );

  /* ---------------- LOADING ---------------- */
  if (fetching) {
    return (
      <div className="w-full min-h-[200px] flex items-center justify-center">
        <p className="text-lg font-semibold text-gray-600">
          Loading Live Data...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-extrabold mb-6">Live</h1>

      <Card title="Live Description" value={title} field="title" />
      <Card title="Live Link" value={liveLink} field="live_link" />
    </div>
  );
}
