import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const BASE = import.meta.env.VITE_BASE_API;
const CAROUSEL_API = `${BASE}/carousel`;
const HOME_API = `${BASE}/home`;

/* =====================================================
   HOME ADMIN
===================================================== */
export default function HomeAdmin() {
  const [home, setHome] = useState(null);
  const [carouselSlots, setCarouselSlots] = useState(Array(6).fill(null));
  const [loading, setLoading] = useState(true);

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

  const fetchHome = async () => {
    const res = await fetch(HOME_API);
    const json = await res.json();
    setHome(json.data);
  };

  const fetchCarousel = async () => {
    const res = await fetch(CAROUSEL_API);
    const json = await res.json();

    const slots = Array(6).fill(null);
    json.data.forEach((item) => {
      if (item.priority >= 1 && item.priority <= 6) {
        slots[item.priority - 1] = item;
      }
    });

    setCarouselSlots(slots);
  };

  const updateHomeField = async (field, value) => {
    const updated = { ...home, [field]: value };
    setHome(updated);

    await fetch(HOME_API, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
  };

  if (loading || !home) {
    return <p className="p-6">Loading Home Admin…</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-extrabold text-blue-900 mb-6">Home</h1>

      <PhotoGrid slots={carouselSlots} refresh={fetchCarousel} />

      <EditableSection
        title="Heading"
        value={home.heading}
        onSave={(v) => updateHomeField("heading", v)}
      />

      {/* ✅ UPDATED SCROLLING */}
      <ScrollingEditor
        items={home.heading_description || []}
        onSave={(v) => updateHomeField("heading_description", v)}
      />

      <div className="grid md:grid-cols-2 gap-6">
        <EditableSection
          title="Live"
          value={home.heading_cat_live}
          onSave={(v) => updateHomeField("heading_cat_live", v)}
        />
        <EditableSection
          title="Youtube"
          value={home.heading_cat_youtube}
          onSave={(v) => updateHomeField("heading_cat_youtube", v)}
        />
        <EditableSection
          title="T-SAT"
          value={home.heading_cat_tsat}
          onSave={(v) => updateHomeField("heading_cat_tsat", v)}
        />
        <EditableSection
          title="AIR"
          value={home.heading_cat_air}
          onSave={(v) => updateHomeField("heading_cat_air", v)}
        />
        <EditableSection
          title="Vidyagani"
          value={home.heading_cat_vidyagani}
          onSave={(v) => updateHomeField("heading_cat_vidyagani", v)}
        />
        <EditableSection
          title="Web Radio"
          value={home.heading_cat_web_radio}
          onSave={(v) => updateHomeField("heading_cat_web_radio", v)}
        />
      </div>
    </div>
  );
}

/* =====================================================
   EDITABLE SECTION
===================================================== */
function EditableSection({ title, value, onSave }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    setText(value || "");
  }, [value]);

  return (
    <div className="mb-6">
      <h3 className="font-bold text-lg text-blue-900 mb-2">{title}</h3>

      <div className="relative bg-cyan-100 rounded-xl p-5">
        {!editing ? (
          <>
            <p className="font-semibold pr-10 whitespace-pre-wrap">{value}</p>
            <button
              onClick={() => setEditing(true)}
              className="absolute top-4 right-4 text-cyan-700"
            >
              <FaEdit />
            </button>
          </>
        ) : (
          <>
            <textarea
              className="w-full rounded-lg p-3"
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              onClick={() => {
                onSave(text);
                setEditing(false);
              }}
              className="mt-2 bg-cyan-700 text-white px-4 py-1 rounded-lg"
            >
              Save
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* =====================================================
   SCROLLING EDITOR (DIRTY STATE + ICON DELETE)
===================================================== */
function ScrollingEditor({ items, onSave }) {
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

  const updateItem = (i, value) => {
    const updated = [...list];
    updated[i] = value;
    markDirty(updated);
  };

  const addItem = () => markDirty([...list, ""]);

  const removeItem = (i) => markDirty(list.filter((_, idx) => idx !== i));

  const save = async () => {
    const clean = list.filter(Boolean);
    await onSave(clean);
    setOriginal(clean);
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
              onChange={(e) => updateItem(i, e.target.value)}
              placeholder={`Point ${i + 1}`}
              className="flex-1 rounded-lg p-2 font-semibold"
            />

            <button
              onClick={() => removeItem(i)}
              className="text-red-600"
              title="Delete"
            >
              <FaTrash />
            </button>
          </div>
        ))}

        <div className="flex justify-between pt-2 items-center">
          <button onClick={addItem} className="text-cyan-800 font-bold">
            + Add Point
          </button>

          {dirty && (
            <button
              onClick={save}
              className="bg-cyan-700 text-white px-4 py-1 rounded-lg"
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   PHOTO GRID (UNCHANGED)
===================================================== */
function PhotoGrid({ slots, refresh }) {
  const upload = async (slide, file) => {
    if (!file) return;

    const form = new FormData();
    form.append("image", file);
    form.append("priority", slide.priority);

    await fetch(`${CAROUSEL_API}/${slide._id}`, {
      method: "PUT",
      body: form,
    });

    refresh();
  };

  const remove = async (slide) => {
    await fetch(`${CAROUSEL_API}/${slide._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
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

            {slide && slide.url ? (
              <>
                <img
                  src={slide.url}
                  className="w-full h-full object-cover"
                  alt="carousel"
                />
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
                  <button
                    onClick={() => remove(slide)}
                    className="text-white text-xl"
                  >
                    <FaTrash />
                  </button>
                </div>
              </>
            ) : (
              <label className="flex items-center justify-center h-full text-cyan-700 font-bold text-lg cursor-pointer">
                + Add Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) =>
                    upload({ ...slide, priority: i + 1 }, e.target.files[0])
                  }
                />
              </label>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
