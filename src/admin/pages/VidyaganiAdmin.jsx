import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { adminFetch } from "../utils/adminFetch";

export default function VidyaganiAdmin() {
  const [vidyaId, setVidyaId] = useState(null);
  const [vidyaLink, setVidyaLink] = useState("");

  const [editing, setEditing] = useState(false);
  const [tempValue, setTempValue] = useState("");
  const [backupValue, setBackupValue] = useState("");

  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);

  /* ---------- FETCH VIDYAGANI LINK ---------- */
  const fetchVidyaganiLink = async () => {
    try {
      setFetching(true);

      const res = await adminFetch("/vidyagani", {
        cache: "no-store",
      });

      const result = await res.json();

      if (Array.isArray(result?.data) && result.data.length > 0) {
        const lastItem = result.data[result.data.length - 1];
        setVidyaId(lastItem._id);
        setVidyaLink(lastItem.vidyagani_link || "");
        setTempValue(lastItem.vidyagani_link || "");
      }
    } catch (err) {
      console.error("Fetch vidyagani failed:", err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchVidyaganiLink();
  }, []);

  /* ---------- VALIDATION ---------- */
  const validateLink = (value) => {
    if (!value.trim()) {
      alert("Link cannot be empty");
      return false;
    }

    try {
      new URL(value);
    } catch {
      alert("Invalid URL");
      return false;
    }

    return true;
  };

  /* ---------- UPDATE VIDYAGANI LINK ---------- */
  const updateVidyaganiLink = async () => {
    if (!vidyaId || saving) return;

    if (!validateLink(tempValue)) return;

    try {
      setSaving(true);

      await adminFetch(`/vidyagani/${vidyaId}`, {
        method: "PUT",
        body: JSON.stringify({
          vidyagani_link: tempValue,
        }),
      });

      setVidyaLink(tempValue);
      setEditing(false);
      setBackupValue("");
    } catch (err) {
      console.error("Update vidyagani failed:", err);
      alert("Failed to update vidyagani link");
    } finally {
      setSaving(false);
    }
  };

  /* ---------- CANCEL EDIT ---------- */
  const cancelEdit = () => {
    if (saving) return;
    setTempValue(backupValue);
    setEditing(false);
    setBackupValue("");
  };

  /* ---------- LOADING ---------- */
  if (fetching) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="w-10 h-10 border-4 border-cyan-300 border-t-cyan-700 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full px-6">
      <h1 className="text-2xl font-extrabold mb-6">Vidyagani</h1>

      <div className="mb-6">
        <h3 className="font-bold text-lg text-blue-900 mb-2">Vidyagani Link</h3>

        <div className="relative bg-cyan-100 rounded-xl p-5 w-full">
          {!editing ? (
            <>
              <p className="font-semibold pr-10 break-words">
                {vidyaLink || "—"}
              </p>

              <button
                disabled={saving}
                onClick={() => {
                  setBackupValue(vidyaLink);
                  setTempValue(vidyaLink);
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
              <input
                type="text"
                disabled={saving}
                className="w-full rounded-lg p-3 border
                focus:outline-none focus:ring-2 focus:ring-cyan-600"
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
              />

              <div className="flex gap-3">
                <button
                  onClick={updateVidyaganiLink}
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
