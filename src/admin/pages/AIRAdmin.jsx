import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";

const BASE_API = import.meta.env.VITE_BASE_API;

export default function AIRAdmin() {
  const [scrollingText, setScrollingText] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");

  const [editKey, setEditKey] = useState(null); // scrolling | pdf
  const [tempValue, setTempValue] = useState("");

  // ---------------- FETCH AIR DATA ----------------
  useEffect(() => {
    const fetchAir = async () => {
      try {
        const res = await fetch(`${BASE_API}/air`, { cache: "no-store" });
        const result = await res.json();
        const list = result?.data || [];

        if (Array.isArray(list) && list.length > 0) {
          const latest = list.reduce((a, b) =>
            new Date(a.updatedAt) > new Date(b.updatedAt) ? a : b
          );

          setScrollingText(latest.scrolling_text || "");
          setPdfUrl(latest.pdf_url || "");
        }
      } catch (err) {
        console.error("Failed to load AIR data", err);
      }
    };

    fetchAir();
  }, []);

  // ---------------- SAVE FIELD ----------------
  const saveField = async (field, value) => {
    await fetch(`${BASE_API}/air`, {
      method: "POST", // or PUT depending on backend
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        [field]: value,
      }),
    });

    if (field === "scrolling_text") setScrollingText(value);
    if (field === "pdf_url") setPdfUrl(value);

    setEditKey(null);
  };

  // ---------------- CARD UI (EditableSection STYLE) ----------------
  const Card = ({ title, value, field }) => (
    <div className="mb-6">
      <h3 className="font-bold text-lg text-blue-900 mb-2">{title}</h3>

      <div className="relative bg-cyan-100 rounded-xl p-5">
        {editKey !== field ? (
          <>
            <p className="font-semibold pr-10 break-all">{value || "—"}</p>

            <button
              onClick={() => {
                setTempValue(value);
                setEditKey(field);
              }}
              className="absolute top-4 right-4 text-cyan-700"
            >
              <FaEdit />
            </button>
          </>
        ) : (
          <>
            <textarea
              className="w-full rounded-lg p-3 min-h-[80px]"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
            />
            <button
              onClick={() => saveField(field, tempValue)}
              className="mt-2 bg-cyan-700 text-white px-4 py-1 rounded-lg"
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
      <h1 className="text-2xl font-extrabold mb-6">AIR</h1>

      <Card
        title="Scrolling Text"
        value={scrollingText}
        field="scrolling_text"
      />

      <Card title="PDF URL" value={pdfUrl} field="pdf_url" />
    </div>
  );
}
