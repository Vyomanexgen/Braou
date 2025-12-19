import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { adminFetch } from "../utils/adminFetch";

const BASE = import.meta.env.VITE_BASE_API;
const CAROUSEL_API = "/carousel";
const HOME_API = "/home";

/* =====================================================
   HOME ADMIN (SECURED)
===================================================== */
export default function HomeAdmin() {
  const [home, setHome] = useState(null);
  const [carouselSlots, setCarouselSlots] = useState(Array(6).fill(null));
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    try {
      await Promise.all([fetchHome(), fetchCarousel()]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= FETCH HOME ================= */
  const fetchHome = async () => {
    const res = await adminFetch(HOME_API);
    const json = await res.json();
    setHome(json.data);
  };

  /* ================= FETCH CAROUSEL ================= */
  const fetchCarousel = async () => {
    const res = await adminFetch(CAROUSEL_API);
    const json = await res.json();

    const slots = Array(6).fill(null);
    json.data.forEach((item) => {
      if (item.priority >= 1 && item.priority <= 6) {
        slots[item.priority - 1] = item;
      }
    });

    setCarouselSlots(slots);
  };

  /* ================= UPDATE HOME FIELD ================= */
  const updateHomeField = async (field, value) => {
    if (saving) return;

    try {
      setSaving(true);

      const updated = { ...home, [field]: value };
      setHome(updated);

      await adminFetch(HOME_API, {
        method: "PUT",
        body: JSON.stringify(updated),
      });
    } catch (err) {
      console.error("Update home failed", err);
      alert("Failed to update home content");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !home) {
    return <p className="p-6">Loading Home Admin…</p>;
  }

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-extrabold text-blue-900 mb-6">Home</h1>

      <PhotoGrid
        slots={carouselSlots}
        refresh={fetchCarousel}
        disabled={saving}
      />

      <EditableSection
        title="Heading"
        value={home.heading}
        disabled={saving}
        onSave={(v) => updateHomeField("heading", v)}
      />

      <ScrollingEditor
        items={home.heading_description || []}
        disabled={saving}
        onSave={(v) => updateHomeField("heading_description", v)}
      />

      <div className="grid md:grid-cols-2 gap-6">
        {[
          ["Live", "heading_cat_live"],
          ["Youtube", "heading_cat_youtube"],
          ["T-SAT", "heading_cat_tsat"],
          ["AIR", "heading_cat_air"],
          ["Vidyagani", "heading_cat_vidyagani"],
          ["Web Radio", "heading_cat_web_radio"],
        ].map(([label, key]) => (
          <EditableSection
            key={key}
            title={label}
            value={home[key]}
            disabled={saving}
            onSave={(v) => updateHomeField(key, v)}
          />
        ))}
      </div>
    </div>
  );
}

/* =====================================================
   EDITABLE SECTION
===================================================== */
function EditableSection({ title, value, onSave, disabled }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState("");
  const [backup, setBackup] = useState("");

  useEffect(() => {
    setText(value || "");
  }, [value]);

  const cancelEdit = () => {
    setText(backup);
    setEditing(false);
  };

  return (
    <div className="mb-6">
      <h3 className="font-bold text-lg text-blue-900 mb-2">{title}</h3>

      <div className="relative bg-cyan-100 rounded-xl p-5">
        {!editing ? (
          <>
            <p className="font-semibold pr-10 whitespace-pre-wrap">{value}</p>
            <button
              disabled={disabled}
              onClick={() => {
                setBackup(text);
                setEditing(true);
              }}
              className="absolute top-4 right-4 text-cyan-700 disabled:opacity-50"
            >
              <FaEdit />
            </button>
          </>
        ) : (
          <div className="flex flex-col gap-3">
            <textarea
              className="w-full rounded-lg p-3"
              rows={4}
              value={text}
              disabled={disabled}
              onChange={(e) => setText(e.target.value)}
            />

            <div className="flex gap-3">
              <button
                disabled={disabled}
                onClick={() => {
                  onSave(text);
                  setEditing(false);
                }}
                className="flex-1 bg-cyan-700 text-white py-2 rounded-lg disabled:opacity-60"
              >
                Save
              </button>

              <button
                onClick={cancelEdit}
                disabled={disabled}
                className="flex-1 border border-cyan-700 text-cyan-700 py-2 rounded-lg hover:bg-cyan-200 disabled:opacity-60"
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

/* =====================================================
   SCROLLING EDITOR
===================================================== */
function ScrollingEditor({ items, onSave, disabled }) {
  const [list, setList] = useState([]);
  const [original, setOriginal] = useState([]);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setList(items);
    setOriginal(items);
    setDirty(false);
  }, [items]);

  const markDirty = (updated) => {
    setList(updated);
    setDirty(JSON.stringify(updated) !== JSON.stringify(original));
  };

  const save = async () => {
    const clean = list.filter(Boolean);
    await onSave(clean);
    setOriginal(clean);
    setDirty(false);
  };

  const cancel = () => {
    setList(original);
    setDirty(false);
  };

  return (
    <div className="mb-6">
      <h3 className="font-bold text-lg text-blue-900 mb-2">Scrolling News</h3>

      <div className="bg-cyan-100 rounded-xl p-5 space-y-3">
        {list.map((item, i) => (
          <div key={i} className="flex gap-2 items-center">
            <input
              value={item}
              disabled={disabled}
              onChange={(e) =>
                markDirty(
                  list.map((v, idx) => (idx === i ? e.target.value : v))
                )
              }
              className="flex-1 rounded-lg p-2 font-semibold"
            />
            <button
              disabled={disabled}
              onClick={() => markDirty(list.filter((_, idx) => idx !== i))}
              className="text-red-600 disabled:opacity-50"
            >
              <FaTrash />
            </button>
          </div>
        ))}

        <div className="flex justify-between pt-2 items-center">
          <button
            disabled={disabled}
            onClick={() => markDirty([...list, ""])}
            className="text-cyan-800 font-bold disabled:opacity-50"
          >
            + Add Point
          </button>

          {dirty && (
            <div className="flex gap-3">
              <button
                disabled={disabled}
                onClick={save}
                className="bg-cyan-700 text-white px-4 py-1 rounded-lg disabled:opacity-60"
              >
                Save
              </button>

              <button
                disabled={disabled}
                onClick={cancel}
                className="border border-cyan-700 text-cyan-700 px-4 py-1 rounded-lg hover:bg-cyan-200 disabled:opacity-60"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   PHOTO GRID (SECURED)
===================================================== */
function PhotoGrid({ slots, refresh, disabled }) {
  const upload = async (slide, file) => {
    if (!file || !slide?.priority || disabled) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image files allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be under 5MB");
      return;
    }

    const form = new FormData();
    form.append("image", file);
    form.append("priority", slide.priority);

    await adminFetch(`${CAROUSEL_API}?id=${slide._id || ""}`, {
      method: "PUT",
      body: form,
    });

    refresh();
  };

  const remove = async (slide) => {
    if (disabled) return;

    await adminFetch(`${CAROUSEL_API}?id=${slide._id}`, {
      method: "PUT",
      body: JSON.stringify({ url: "" }),
    });

    refresh();
  };

  return (
    <div className="bg-white/40 p-6 rounded-2xl mb-10">
      <h2 className="text-lg font-bold text-blue-900 mb-4">Carousel Images</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {slots.map((slide, i) => (
          <div
            key={i}
            className="relative h-40 rounded-xl bg-white/60 overflow-hidden border-2 border-dashed border-cyan-600"
          >
            <div className="absolute top-2 left-2 bg-black text-white px-2 py-1 rounded text-sm font-bold">
              #{i + 1}
            </div>

            {slide?.url ? (
              <>
                <img src={slide.url} className="w-full h-full object-cover" />
                {!disabled && (
                  <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center gap-4 transition">
                    <label className="px-4 py-1 bg-yellow-600 text-white rounded-md font-semibold cursor-pointer">
                      Replace
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) => upload(slide, e.target.files[0])}
                      />
                    </label>
                    {/* <button
                      onClick={() => remove(slide)}
                      className="text-white text-xl"
                    >
                      <FaTrash />
                    </button> */}
                  </div>
                )}
              </>
            ) : (
              !disabled && (
                <label className="flex items-center justify-center h-full text-cyan-700 font-bold text-lg cursor-pointer">
                  + Add Image
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) =>
                      upload(
                        { _id: slide?._id, priority: i + 1 },
                        e.target.files[0]
                      )
                    }
                  />
                </label>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
