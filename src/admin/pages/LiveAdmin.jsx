import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { adminFetch } from "../utils/adminFetch";

/* =========================
   REUSABLE EDITABLE CARD
   ========================= */
function EditableCard({
  label,
  value,
  field,
  editing,
  tempValue,
  saving,
  multiline = false,
  onEdit,
  onChange,
  onSave,
  onCancel,
}) {
  return (
    <div className="mb-6">
      <h3 className="font-bold text-lg text-blue-900 mb-2">{label}</h3>

      <div className="relative bg-cyan-100 rounded-xl p-5 w-full">
        {editing !== field ? (
          <>
            <p className="font-semibold pr-10 whitespace-pre-wrap">
              {value || "—"}
            </p>

            <button
              disabled={saving}
              onClick={() => onEdit(field, value)}
              className="absolute top-4 right-4 text-cyan-700
              hover:scale-110 transition disabled:opacity-50"
            >
              <FaEdit />
            </button>
          </>
        ) : (
          <div className="flex flex-col gap-3">
            {multiline ? (
              <textarea
                autoFocus
                value={tempValue}
                disabled={saving}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-lg p-3 min-h-[120px] border
                focus:outline-none focus:ring-2 focus:ring-cyan-600"
              />
            ) : (
              <input
                autoFocus
                type="text"
                value={tempValue}
                disabled={saving}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-lg p-3 border
                focus:outline-none focus:ring-2 focus:ring-cyan-600"
              />
            )}

            <div className="flex gap-3">
              <button
                onClick={onSave}
                disabled={saving}
                className="flex-1 bg-cyan-700 text-white py-2 rounded-lg
                hover:bg-cyan-800 transition disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save"}
              </button>

              <button
                onClick={onCancel}
                disabled={saving}
                className="flex-1 border border-cyan-700 text-cyan-700 py-2 rounded-lg
                hover:bg-cyan-200 transition disabled:opacity-60"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================
   MAIN COMPONENT
   ========================= */
export default function LiveAdmin() {
  const [liveId, setLiveId] = useState(null);
  const [title, setTitle] = useState("");
  const [liveLink, setLiveLink] = useState("");

  const [editing, setEditing] = useState(null);
  const [tempValue, setTempValue] = useState("");
  const [backupValue, setBackupValue] = useState("");

  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);

  /* ---------------- FETCH LIVE DATA ---------------- */
  useEffect(() => {
    const fetchLiveData = async () => {
      try {
        setFetching(true);

        const res = await adminFetch("/live", {
          cache: "no-store",
        });

        const result = await res.json();

        if (Array.isArray(result?.data) && result.data.length > 0) {
          const lastLive = result.data[result.data.length - 1];
          setLiveId(lastLive._id);
          setTitle(lastLive.title || "");
          setLiveLink(lastLive.live_link || "");
        }
      } catch (err) {
        console.error("Failed to fetch live data", err);
      } finally {
        setFetching(false);
      }
    };

    fetchLiveData();
  }, []);

  /* ---------------- VALIDATION ---------------- */
  const validateField = (field, value) => {
    if (!value.trim()) {
      alert("Value cannot be empty");
      return false;
    }

    if (field === "live_link") {
      try {
        new URL(value);
      } catch {
        alert("Invalid live link URL");
        return false;
      }
    }

    return true;
  };

  /* ---------------- SAVE FIELD ---------------- */
  const saveField = async (field, value) => {
    if (!liveId || saving) return;
    if (!validateField(field, value)) return;

    try {
      setSaving(true);

      const payload = {
        title,
        live_link: liveLink,
        [field]: value,
      };

      await adminFetch(`/live/${liveId}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });

      if (field === "title") setTitle(value);
      if (field === "live_link") setLiveLink(value);

      setEditing(null);
      setTempValue("");
      setBackupValue("");
    } catch (err) {
      console.error("Save failed", err);
      alert("Failed to save live data");
    } finally {
      setSaving(false);
    }
  };

  /* ---------------- EDIT HANDLERS ---------------- */
  const startEdit = (field, value) => {
    setEditing(field);
    setTempValue(value);
    setBackupValue(value);
  };

  const cancelEdit = () => {
    if (saving) return;
    setTempValue(backupValue);
    setEditing(null);
    setBackupValue("");
  };

  /* ---------------- LOADING ---------------- */
  if (fetching) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="w-10 h-10 border-4 border-cyan-300 border-t-cyan-700 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full px-6">
      <h1 className="text-2xl font-extrabold mb-6">Live</h1>

      {/* Live Description → TEXTAREA */}
      <EditableCard
        label="Live Description"
        value={title}
        field="title"
        editing={editing}
        tempValue={tempValue}
        saving={saving}
        multiline
        onEdit={startEdit}
        onChange={setTempValue}
        onSave={() => saveField("title", tempValue)}
        onCancel={cancelEdit}
      />

      {/* Live Link → INPUT */}
      <EditableCard
        label="Live Link"
        value={liveLink}
        field="live_link"
        editing={editing}
        tempValue={tempValue}
        saving={saving}
        onEdit={startEdit}
        onChange={setTempValue}
        onSave={() => saveField("live_link", tempValue)}
        onCancel={cancelEdit}
      />
    </div>
  );
}
