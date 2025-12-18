import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useAdmin } from "../context/AdminContext";

export default function TSATSection({
  title,
  logoField,
  timingField,
  dateField,
  scheduleField,
}) {
  const { content, updateField } = useAdmin();

  const logo = content[logoField];
  const timings = content[timingField];
  const date = content[dateField];
  const schedule = content[scheduleField];

  const [editing, setEditing] = useState({
    timings: false,
    date: false,
    schedule: false,
  });

  /* ---------- LOGO ---------- */
  const triggerLogoInput = () => {
    document.getElementById(`${logoField}-input`).click();
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    updateField(logoField, url);
  };

  /* ---------- SAVE SIMPLE FIELD ---------- */
  const saveField = (field, value) => {
    updateField(field, value);
    setEditing((prev) => ({ ...prev, [field]: false }));
  };

  return (
    <div className="bg-cyan-100 p-6 rounded-2xl">
      <h2 className="text-xl font-bold text-blue-900 mb-4">{title}</h2>

      {/* ---------- LOGO ---------- */}
      {logo ? (
        <div className="relative h-60 rounded-xl overflow-hidden cursor-pointer mb-4">
          <img
            src={logo}
            className="w-full h-full object-cover"
            alt="TSAT Logo"
          />

          <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center gap-4 transition">
            <button
              onClick={triggerLogoInput}
              className="px-4 py-1 bg-yellow-600 text-white rounded-md font-semibold"
            >
              Replace
            </button>

            <button
              onClick={() => updateField(logoField, null)}
              className="text-white text-xl"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={triggerLogoInput}
          className="h-60 mb-4 border-2 border-dashed border-cyan-600 rounded-xl flex items-center justify-center cursor-pointer text-cyan-700 font-bold"
        >
          + Add Image
        </div>
      )}

      <input
        id={`${logoField}-input`}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleLogoChange}
      />

      {/* ---------- TIMINGS ---------- */}
      <div className="flex items-center gap-3 mb-3">
        <label className="w-24 font-semibold">Timings</label>

        {!editing.timings ? (
          <>
            <input
              value={timings}
              disabled
              className="flex-1 p-2 rounded border bg-white"
            />
            <FaEdit
              className="cursor-pointer text-cyan-700"
              onClick={() => setEditing((p) => ({ ...p, timings: true }))}
            />
          </>
        ) : (
          <>
            <input
              autoFocus
              defaultValue={timings}
              className="flex-1 p-2 rounded border"
              onBlur={(e) => saveField(timingField, e.target.value)}
            />
            <button
              onClick={() =>
                saveField(timingField, document.activeElement.value)
              }
              className="px-3 py-1 bg-cyan-700 text-white rounded"
            >
              Save
            </button>
          </>
        )}
      </div>

      {/* ---------- DATE ---------- */}
      <div className="flex items-center gap-3 mb-3">
        <label className="w-24 font-semibold">Date</label>

        {!editing.date ? (
          <>
            <input
              value={date}
              disabled
              className="flex-1 p-2 rounded border bg-white"
            />
            <FaEdit
              className="cursor-pointer text-cyan-700"
              onClick={() => setEditing((p) => ({ ...p, date: true }))}
            />
          </>
        ) : (
          <>
            <input
              autoFocus
              defaultValue={date}
              className="flex-1 p-2 rounded border"
              onBlur={(e) => saveField(dateField, e.target.value)}
            />
            <button
              onClick={() => saveField(dateField, document.activeElement.value)}
              className="px-3 py-1 bg-cyan-700 text-white rounded"
            >
              Save
            </button>
          </>
        )}
      </div>

      {/* ---------- SCHEDULE ---------- */}
      <div className="flex items-center gap-3">
        <label className="w-24 font-semibold">Schedule</label>

        {!editing.schedule ? (
          <>
            <a
              href={schedule?.url || "#"}
              target="_blank"
              rel="noreferrer"
              className="flex-1 p-2 rounded border bg-white text-cyan-700 font-semibold"
            >
              {schedule?.name || "No file uploaded"}
            </a>

            <FaEdit
              className="cursor-pointer text-cyan-700"
              onClick={() => {
                setEditing((p) => ({ ...p, schedule: true }));
                setTimeout(
                  () =>
                    document.getElementById(`${scheduleField}-picker`)?.click(),
                  100
                );
              }}
            />
          </>
        ) : (
          <>
            <input
              type="file"
              id={`${scheduleField}-picker`}
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;

                updateField(scheduleField, {
                  name: file.name,
                  url: URL.createObjectURL(file),
                });
              }}
            />

            <input
              value={schedule?.name || ""}
              disabled
              className="flex-1 p-2 rounded border bg-white"
            />

            <button
              onClick={() => setEditing((p) => ({ ...p, schedule: false }))}
              className="px-3 py-1 bg-cyan-700 text-white rounded"
            >
              Save
            </button>
          </>
        )}
      </div>
    </div>
  );
}
