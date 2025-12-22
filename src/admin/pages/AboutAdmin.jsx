import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { adminFetch } from "../utils/adminFetch";

/* =========================
   UTILITY FUNCTIONS
   ========================= */
const decodeHtml = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

/* =========================
   EDITABLE CARD (OUTSIDE)
   ========================= */
function EditableCard({
  title,
  content,
  isEditing,
  isActivity,
  tempTitle,
  tempText,
  saving,
  onEdit,
  onTitleChange,
  onTextChange,
  onSave,
  onCancel,
}) {

  return (
    
    <div className="mb-6">
      {/* Title */}
      {!isEditing || !isActivity ? (
        <h3 className="font-bold text-lg text-blue-900 mb-2">{title}</h3>
      ) : (
        <input
          autoFocus
          className="w-full mb-2 p-2 rounded-lg font-bold text-lg border
          focus:outline-none focus:ring-2 focus:ring-cyan-600"
          value={tempTitle}
          onChange={(e) => onTitleChange(e.target.value)}
          disabled={saving}
        />
      )}

      {/* Content */}
      <div className="relative bg-cyan-100 rounded-xl p-5">
        {!isEditing ? (
          <>
            {Array.isArray(content) ? (
              <ul className="list-disc pl-5 pr-10 space-y-1">
                {content.map((c, i) => (
  <li key={i} className="font-semibold">
    {decodeHtml(c)}
  </li>
))}

              </ul>
            ) : (
              <p className="font-semibold pr-10 whitespace-pre-wrap">
  {decodeHtml(content)}
</p>

            )}

            <button
              onClick={onEdit}
              className="absolute top-4 right-4 text-cyan-700
              hover:scale-110 transition"
            >
              <FaEdit />
            </button>
          </>
        ) : (
          <div className="flex flex-col gap-3">
            <textarea
              autoFocus
              className="w-full rounded-lg p-3 min-h-[120px] border
              focus:outline-none focus:ring-2 focus:ring-cyan-600"
              value={tempText}
              onChange={(e) => onTextChange(e.target.value)}
              disabled={saving}
            />

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
export default function AboutAdmin() {
  const [aboutText, setAboutText] = useState("");
  const [activities, setActivities] = useState({});
  const [editingKey, setEditingKey] = useState(null);

  const [tempText, setTempText] = useState("");
  const [tempTitle, setTempTitle] = useState("");

  const [backupText, setBackupText] = useState("");
  const [backupTitle, setBackupTitle] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* ---------------- FETCH ---------------- */
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await adminFetch("/about");
        const result = await res.json();

        if (result?.data) {
          setAboutText(result.data.about_text || "");
          setActivities(result.data.activities || {});
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  /* ---------------- UPDATE API ---------------- */
  const updateAbout = async (payload) => {
    setSaving(true);
    try {
      const res = await adminFetch("/about", {
        method: "PUT",
        body: JSON.stringify(payload),
      });
      return await res.json();
    } finally {
      setSaving(false);
    }
  };

  /* ---------------- SAVE ABOUT ---------------- */
  const saveAboutText = async () => {
    const res = await updateAbout({
      about_text: tempText,
      activities,
    });

    setAboutText(res.data.about_text);
    setActivities(res.data.activities);
    setEditingKey(null);
  };

  /* ---------------- SAVE ACTIVITY ---------------- */
  const saveActivity = async (key) => {
    const bulletPoints = tempText
      .split("\n")
      .map((t) => t.trim())
      .filter(Boolean);

    const updatedActivities = {
      ...activities,
      [key]: {
        ...activities[key],
        title: tempTitle,
        bullet_points: bulletPoints,
      },
    };

    const res = await updateAbout({
      about_text: aboutText,
      activities: updatedActivities,
    });

    setActivities(res.data.activities);
    setEditingKey(null);
  };

  /* ---------------- CANCEL ---------------- */
  const cancelEdit = () => {
    setTempText(backupText);
    setTempTitle(backupTitle);
    setEditingKey(null);
  };

  /* ---------------- LOADER ---------------- */
  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-cyan-300 border-t-cyan-700 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full px-6">
      <h1 className="text-2xl font-extrabold mb-6">About</h1>

      {/* ABOUT */}
      <EditableCard
        title="About EMR&RC"
        content={aboutText}
        isEditing={editingKey === "about"}
        tempText={tempText}
        saving={saving}
        onEdit={() => {
          setTempText(aboutText);
          setBackupText(aboutText);
          setTempText(decodeHtml(aboutText));
          setBackupText(decodeHtml(aboutText));
          setEditingKey("about");
        }}
        onTextChange={setTempText}
        onSave={saveAboutText}
        onCancel={cancelEdit}
      />

      <h2 className="text-xl font-bold text-center my-10">Activities</h2>

      {/* ACTIVITIES */}
      <div className="grid md:grid-cols-2 gap-6">
        {Object.entries(activities).map(([key, item]) => (
          <EditableCard
            key={key}
            title={item.title}
            content={item.bullet_points || []}
            isEditing={editingKey === key}
            isActivity
            tempTitle={tempTitle}
            tempText={tempText}
            saving={saving}
          onEdit={() => {
            setTempTitle(item.title || "");
            setTempText((item.bullet_points || []).join("\n"));
            setBackupTitle(item.title || "");
            setBackupText((item.bullet_points || []).join("\n"));

 setTempTitle(decodeHtml(item.title || ""));
 setTempText(
   (item.bullet_points || [])
     .map(pt => decodeHtml(pt))
     .join("\n")
 );
 setBackupTitle(decodeHtml(item.title || ""));
 setBackupText(
   (item.bullet_points || [])
     .map(pt => decodeHtml(pt))
     .join("\n")
);

 setEditingKey(key);
}}

            onTitleChange={setTempTitle}
            onTextChange={setTempText}
            onSave={() => saveActivity(key)}
            onCancel={cancelEdit}
          />
        ))}
      </div>
    </div>
  );
}
