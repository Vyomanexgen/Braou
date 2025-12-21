import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { adminFetch } from "../utils/adminFetch";

export default function WebRadioAdmin() {
  const [radioId, setRadioId] = useState(null);
  const [radioLink, setRadioLink] = useState("");

  const [editing, setEditing] = useState(false);
  const [tempValue, setTempValue] = useState("");
  const [backupValue, setBackupValue] = useState("");

  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);

  /* ================= FETCH WEB RADIO ================= */
  const fetchWebRadio = async () => {
    try {
      setFetching(true);

      const res = await adminFetch("/web-radio/", {
        cache: "no-store",
      });

      const result = await res.json();

      const list = result?.data;

      if (!Array.isArray(list) || list.length === 0) {
        setRadioId(null);
        setRadioLink("");
        return;
      }

      // backend stores as array → take latest or first
      const item = list[list.length - 1];

      setRadioId(item._id);
      setRadioLink(item.web_radio_link || "");
      setTempValue(item.web_radio_link || "");
    } catch (err) {
      console.error("Failed to load Web Radio", err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchWebRadio();
  }, []);

  /* ================= VALIDATION ================= */
  const validateLink = (value) => {
    if (!value.trim()) {
      alert("Radio link cannot be empty");
      return false;
    }

    try {
      new URL(value);
    } catch {
      alert("Invalid radio link URL");
      return false;
    }

    return true;
  };

  /* ================= SAVE RADIO LINK ================= */
  const saveRadioLink = async () => {
    if (!radioId || saving) {
      alert("Radio ID not found");
      return;
    }

    if (!validateLink(tempValue)) return;

    try {
      setSaving(true);

      await adminFetch(`/web-radio/${radioId}`, {
        method: "PUT",
        body: JSON.stringify({
          web_radio_link: tempValue, // ✅ EXACT MATCH
        }),
      });

      setRadioLink(tempValue);
      setEditing(false);
      setBackupValue("");
    } catch (err) {
      console.error("Update Web Radio failed", err);
      alert("Failed to save radio link");
    } finally {
      setSaving(false);
    }
  };

  /* ================= CANCEL EDIT ================= */
  const cancelEdit = () => {
    if (saving) return;
    setTempValue(backupValue);
    setEditing(false);
    setBackupValue("");
  };

  /* ================= LOADING ================= */
  if (fetching) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="w-10 h-10 border-4 border-cyan-300 border-t-cyan-700 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full px-6">
      <h1 className="text-2xl font-extrabold mb-6">Web Radio</h1>

      <div className="mb-6">
        <h3 className="font-bold text-lg text-blue-900 mb-2">Radio Link</h3>

        <div className="relative bg-cyan-100 rounded-xl p-5 w-full">
          {!editing ? (
            <>
              <p className="font-semibold pr-10 break-all">
                {radioLink || "—"}
              </p>

              <button
                disabled={saving}
                onClick={() => {
                  setBackupValue(radioLink);
                  setTempValue(radioLink);
                  setEditing(true);
                }}
                className="absolute top-4 right-4 text-cyan-700
                hover:scale-110 transition disabled:opacity-50"
              >
                <FaEdit />
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-3">
              <textarea
                rows={3}
                disabled={saving}
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                className="w-full rounded-lg p-3 border
                focus:outline-none focus:ring-2 focus:ring-cyan-600"
              />

              <div className="flex gap-3">
                <button
                  onClick={saveRadioLink}
                  disabled={saving}
                  className="flex-1 bg-cyan-700 text-white py-2 rounded-lg
                  hover:bg-cyan-800 transition disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save"}
                </button>

                <button
                  onClick={cancelEdit}
                  disabled={saving}
                  className="flex-1 border border-cyan-700 text-cyan-700 py-2 rounded-lg
                  hover:bg-cyan-200 transition disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
