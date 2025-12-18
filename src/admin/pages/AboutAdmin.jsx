import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";

const BASE_API = import.meta.env.VITE_BASE_API;

export default function AboutAdmin() {
  const [aboutText, setAboutText] = useState("");
  const [activities, setActivities] = useState({});
  const [editingKey, setEditingKey] = useState(null);
  const [tempText, setTempText] = useState("");
  const [tempTitle, setTempTitle] = useState("");

  // ---------------- API CALL (SINGLE SOURCE) ----------------
  const updateAboutAPI = async (payload) => {
    if (!BASE_API) {
      console.error("BASE_API is undefined");
      return;
    }

    const res = await fetch(`${BASE_API}/about`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("PUT /about failed:", errorText);
      throw new Error("API Error");
    }

    return res.json(); // ✅ important
  };

  // ---------------- FETCH ABOUT DATA ----------------
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await fetch(`${BASE_API}/about`);
        if (!res.ok) throw new Error("Failed to fetch");

        const result = await res.json();

        if (result?.data) {
          setAboutText(result.data.about_text || "");
          setActivities(result.data.activities || {});
        }
      } catch (err) {
        console.error("Failed to load about data", err);
      }
    };

    fetchAbout();
  }, [BASE_API]);

  // ---------------- SAVE ABOUT TEXT ----------------
  const saveAboutText = async () => {
    try {
      const payload = {
        about_text: tempText,
        activities,
      };

      const res = await updateAboutAPI(payload);

      // ✅ update from backend response
      setAboutText(res.data.about_text);
      setActivities(res.data.activities);

      setEditingKey(null);
    } catch (err) {
      console.error("Save about text failed", err);
    }
  };

  // ---------------- SAVE ACTIVITY ----------------
  const saveActivity = async (key) => {
    try {
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

      const payload = {
        about_text: aboutText,
        activities: updatedActivities,
      };

      const res = await updateAboutAPI(payload);

      // ✅ update from backend response
      setActivities(res.data.activities);
      setAboutText(res.data.about_text);

      setEditingKey(null);
    } catch (err) {
      console.error("Save activity failed", err);
    }
  };

  // ---------------- CARD COMPONENT ----------------
  const Card = ({ title, content, onEdit, onSave, isEditing, isActivity }) => (
    <div className="mb-6">
      {!isEditing ? (
        <h3 className="font-bold text-lg text-blue-900 mb-2">{title}</h3>
      ) : isActivity ? (
        <input
          className="w-full mb-2 p-2 rounded-lg font-bold text-lg border"
          value={tempTitle}
          onChange={(e) => setTempTitle(e.target.value)}
        />
      ) : (
        <h3 className="font-bold text-lg text-blue-900 mb-2">{title}</h3>
      )}

      <div className="relative bg-cyan-100 rounded-xl p-5">
        {!isEditing ? (
          <>
            {Array.isArray(content) ? (
              <ul className="list-disc pl-5 pr-10 space-y-1">
                {content.map((c, i) => (
                  <li key={i} className="font-semibold">
                    {c}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="font-semibold pr-10 whitespace-pre-wrap">
                {content}
              </p>
            )}

            <button
              onClick={onEdit}
              className="absolute top-4 right-4 text-cyan-700"
            >
              <FaEdit />
            </button>
          </>
        ) : (
          <>
            <textarea
              className="w-full rounded-lg p-3 min-h-[120px]"
              value={tempText}
              onChange={(e) => setTempText(e.target.value)}
            />

            <button
              onClick={onSave}
              className="mt-3 bg-cyan-700 text-white px-5 py-2 rounded-lg"
            >
              Save
            </button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-6">About</h1>

      <Card
        title="About EMR&RC"
        content={aboutText}
        isEditing={editingKey === "about"}
        onEdit={() => {
          setTempText(aboutText);
          setEditingKey("about");
        }}
        onSave={saveAboutText}
      />

      <h2 className="text-xl font-bold text-center my-10">Activities</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {Object.entries(activities).map(([key, item]) => (
          <Card
            key={key}
            title={item.title}
            content={item.bullet_points || []}
            isEditing={editingKey === key}
            isActivity
            onEdit={() => {
              setTempTitle(item.title || "");
              setTempText((item.bullet_points || []).join("\n"));
              setEditingKey(key);
            }}
            onSave={() => saveActivity(key)}
          />
        ))}
      </div>
    </div>
  );
}
