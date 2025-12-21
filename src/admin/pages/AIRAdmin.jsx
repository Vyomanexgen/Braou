import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { adminFetch } from "../utils/adminFetch";

/* =========================
   EDITABLE CARD (OUTSIDE)
   ========================= */
function EditableCard({
  title,
  type,
  scrollingText,
  pdfUrl,
  isEditing,
  tempText,
  tempPdf,
  saving,
  onEdit,
  onTextChange,
  onPdfChange,
  onSaveScrolling,
  onSavePdf,
  onCancel,
}) {
  return (
    <div className="mb-6">
      <h3 className="font-bold text-lg text-blue-900 mb-2">{title}</h3>

      <div className="relative bg-cyan-100 rounded-xl p-5 w-full">
        {!isEditing ? (
          <>
            {type === "scrolling_text" && (
              <p className="font-semibold pr-10 break-all">
                {scrollingText || "—"}
              </p>
            )}

            {type === "pdf" &&
              (pdfUrl ? (
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-700 underline"
                >
                  View PDF
                </a>
              ) : (
                "—"
              ))}

            <button
              type="button"
              disabled={saving}
              onClick={onEdit}
              className="absolute top-4 right-4 text-cyan-700
              hover:scale-110 transition disabled:opacity-50"
            >
              <FaEdit />
            </button>
          </>
        ) : (
          <div className="flex flex-col gap-3">
            {type === "scrolling_text" && (
              <textarea
                autoFocus
                className="w-full rounded-lg p-3 min-h-[100px] border
                focus:outline-none focus:ring-2 focus:ring-cyan-600"
                value={tempText}
                onChange={(e) => onTextChange(e.target.value)}
                disabled={saving}
              />
            )}

            {type === "pdf" && (
              <>
                <label className="inline-block bg-cyan-700 text-white px-4 py-2 rounded-lg cursor-pointer w-fit">
                  Choose PDF
                  <input
                    type="file"
                    accept="application/pdf"
                    hidden
                    disabled={saving}
                    onChange={(e) => onPdfChange(e.target.files?.[0] || null)}
                  />
                </label>

                {tempPdf && (
                  <p className="text-sm text-gray-700">
                    Selected: <strong>{tempPdf.name}</strong>
                  </p>
                )}
              </>
            )}

            <div className="flex gap-3 mt-2">
              {type === "scrolling_text" && (
                <button
                  type="button"
                  onClick={onSaveScrolling}
                  disabled={saving}
                  className="flex-1 bg-cyan-700 text-white py-2 rounded-lg
                  hover:bg-cyan-800 transition disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              )}

              {type === "pdf" && (
                <button
                  type="button"
                  onClick={onSavePdf}
                  disabled={saving || !tempPdf}
                  className="flex-1 bg-cyan-700 text-white py-2 rounded-lg
                  hover:bg-cyan-800 transition disabled:opacity-50"
                >
                  {saving ? "Uploading..." : "Upload PDF"}
                </button>
              )}

              <button
                type="button"
                onClick={onCancel}
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
  );
}

/* =========================
   MAIN COMPONENT
   ========================= */
export default function AIRAdmin() {
  const [airId, setAirId] = useState(null);
  const [scrollingText, setScrollingText] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");

  const [editKey, setEditKey] = useState(null);
  const [tempText, setTempText] = useState("");
  const [tempPdf, setTempPdf] = useState(null);
  const [backupText, setBackupText] = useState("");

  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);

  /* ---------------- FETCH ---------------- */
  useEffect(() => {
    fetchAir();
  }, []);

  const fetchAir = async () => {
    try {
      setFetching(true);
      const res = await adminFetch("/air", { cache: "no-store" });
      const result = await res.json();
      const list = result?.data || [];

      if (list.length) {
        const last = list[list.length - 1];
        setAirId(last._id);
        setScrollingText(last.scrolling_text || "");
        setPdfUrl(last.pdf_url || "");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  /* ---------------- SAVE SCROLLING ---------------- */
  const saveScrolling = async () => {
    if (!airId || saving) return;

    try {
      setSaving(true);
      await adminFetch(`/air/${airId}`, {
        method: "PUT",
        body: JSON.stringify({ scrolling_text: tempText }),
      });

      setScrollingText(tempText);
      setEditKey(null);
    } finally {
      setSaving(false);
    }
  };

  /* ---------------- SAVE PDF ---------------- */
  const savePdf = async () => {
    if (!airId || !tempPdf || saving) return;

    if (tempPdf.type !== "application/pdf") {
      alert("Only PDF allowed");
      return;
    }

    try {
      setSaving(true);
      const formData = new FormData();
      formData.append("pdf", tempPdf);
      formData.append("scrolling_text", scrollingText);

      await adminFetch(`/air/${airId}`, {
        method: "PUT",
        body: formData,
      });

      setTempPdf(null);
      setEditKey(null);
      fetchAir();
    } finally {
      setSaving(false);
    }
  };

  /* ---------------- CANCEL ---------------- */
  const cancelEdit = () => {
    if (saving) return;
    setTempText(backupText);
    setTempPdf(null);
    setEditKey(null);
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
      <h1 className="text-2xl font-extrabold mb-6">AIR</h1>

      <EditableCard
        title="Scrolling Text"
        type="scrolling_text"
        scrollingText={scrollingText}
        isEditing={editKey === "scrolling_text"}
        tempText={tempText}
        saving={saving}
        onEdit={() => {
          setEditKey("scrolling_text");
          setTempText(scrollingText);
          setBackupText(scrollingText);
        }}
        onTextChange={setTempText}
        onSaveScrolling={saveScrolling}
        onCancel={cancelEdit}
      />

      <EditableCard
        title="PDF"
        type="pdf"
        pdfUrl={pdfUrl}
        isEditing={editKey === "pdf"}
        tempPdf={tempPdf}
        saving={saving}
        onEdit={() => setEditKey("pdf")}
        onPdfChange={setTempPdf}
        onSavePdf={savePdf}
        onCancel={cancelEdit}
      />
    </div>
  );
}
