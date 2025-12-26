import { useEffect, useState } from "react";
import { FaSave, FaEdit, FaTimes } from "react-icons/fa";
import { adminFetch } from "../utils/adminFetch";

export default function EventsAdmin() {
  const [events, setEvents] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ SAFE UI STATE (INDEX BASED)
  const [editingIndex, setEditingIndex] = useState(null);
  const [savingIndex, setSavingIndex] = useState(null);
  const [backupEvent, setBackupEvent] = useState(null);

  /* ================= FETCH EVENTS ================= */
  useEffect(() => {
    fetchEvents();
    fetchGallery();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await adminFetch("/braou/events");
      const json = await res.json();

      const formatted = (json.data || []).map((e) => ({
        _id: e._id,
        name: e.event_name ?? "",
        content: e.content ?? "",
        date: e.date ? e.date.split("T")[0] : "",
        img: e.image_url ?? "",
        event_link: e.event_link ?? "",
        imageFile: null,
      }));

      setEvents(formatted);
    } catch (err) {
      console.error(err);
      alert("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  /* ================= FETCH GALLERY ================= */
  const fetchGallery = async () => {
    try {
      const res = await adminFetch("/braou/gallery");
      const json = await res.json();
      setGallery(json.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load gallery");
    }
  };
const isDuplicateImage = (file) => {
  return gallery.some((img) => {
    const url = img.image_url || "";
    return (
      url.includes(file.name) ||
      img.size === file.size
    );
  });
};

  /* ================= REPLACE GALLERY IMAGE ================= */
  // const replaceGalleryImage = async (galleryId, file) => {
  //   if (!file) return;

  //   if (!file.type.startsWith("image/")) {
  //     alert("Only image files allowed");
  //     return;
  //   }

  //   if (file.size > 5 * 1024 * 1024) {
  //     alert("Image must be less than 5MB");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("image", file);

  //   const res = await adminFetch(`/braou/gallery/${galleryId}`, {
  //     method: "PUT",
  //     body: formData,
  //   });

  //   if (!res.ok) {
  //     alert("Failed to replace image");
  //     return;
  //   }

  //   fetchGallery();
  // };
const replaceGalleryImage = async (galleryId, file) => {
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("Only image files allowed");
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    alert("Image must be less than 5MB");
    return;
  }

  if (isDuplicateImage(file)) {
    alert("This image already exists in the gallery");
    return;
  }

  const formData = new FormData();
  formData.append("image", file);

  const res = await adminFetch(`/braou/gallery/${galleryId}`, {
    method: "PUT",
    body: formData,
  });

  if (!res.ok) {
    alert("Failed to replace image");
    return;
  }

  fetchGallery();
};

  /* ================= LOCAL UPDATE ================= */
  const updateEvent = (index, key, value) => {
    setEvents((prev) =>
      prev.map((ev, i) => (i === index ? { ...ev, [key]: value } : ev))
    );
  };

  /* ================= IMAGE HANDLER ================= */
  const handleImage = (e, index) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image files allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be less than 5MB");
      return;
    }

    updateEvent(index, "imageFile", file);
    updateEvent(index, "img", URL.createObjectURL(file));
  };

  /* ================= EDIT ================= */
  const startEditing = (index) => {
    if (savingIndex !== null) return;
    setBackupEvent({ ...events[index] });
    setEditingIndex(index);
  };

  const cancelEditing = () => {
    if (editingIndex === null || savingIndex !== null) return;

    setEvents((prev) =>
      prev.map((ev, i) => (i === editingIndex ? backupEvent : ev))
    );

    setEditingIndex(null);
    setBackupEvent(null);
  };

  /* ================= VALIDATION ================= */
  const validateEvent = (event) => {
    if (!event.name.trim()) return alert("Event name is required"), false;
    if (!event.date) return alert("Event date is required"), false;
    if (!event.content.trim())
      return alert("Event description is required"), false;
    return true;
  };

  /* ================= SAVE ================= */
  const saveEvent = async (index) => {
    const event = events[index];
    if (!event || savingIndex !== null) return;
    if (!validateEvent(event)) return;

    try {
      setSavingIndex(index);

      const formData = new FormData();
      formData.append("event_name", event.name);
      formData.append("content", event.content);
      formData.append("date", event.date);
      formData.append("event_link", event.event_link || "");

      if (event.imageFile) {
        formData.append("image", event.imageFile);
      }

      const res = await adminFetch(`/braou/events/${event._id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.message || "Update failed");
        return;
      }

      const json = await res.json();

      setEvents((prev) =>
        prev.map((ev, i) =>
          i === index
            ? {
                _id: json.data._id,
                name: json.data.event_name,
                content: json.data.content,
                date: json.data.date.split("T")[0],
                img: json.data.image_url,
                event_link: json.data.event_link ?? "",
                imageFile: null,
              }
            : ev
        )
      );

      setEditingIndex(null);
      setBackupEvent(null);
    } catch (err) {
      console.error(err);
      alert("Failed to update event");
    } finally {
      setSavingIndex(null);
    }
  };

  /* ================= UI ================= */
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px] font-semibold">
        Loading Events...
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg p-3 border bg-white focus:outline-none focus:ring-2 focus:ring-cyan-600 disabled:bg-gray-100";

  return (
    <div>
      <h1 className="text-3xl font-extrabold mb-8">BRAOU Events</h1>

      <h2 className="text-lg font-bold text-blue-900 mb-4 ml-4">
        Gallery Images
      </h2>

      {/* ================= GALLERY GRID (3 PER ROW) ================= */}
      <div className="bg-white/40 p-6 rounded-2xl mb-10">
        {gallery.length >= 6 && (
    <p className="text-red-600 font-semibold text-sm mb-4">
      Maximum 6 gallery images allowed
    </p>
  )}

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {gallery.slice(0, 6).map((item) => (
            <div
              key={item._id}
              className="relative h-40 rounded-xl bg-white/60 overflow-hidden border-2 border-dashed border-cyan-600"
            >
              <img
                src={item.image_url}
                alt="gallery"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center transition">
                <label className="px-4 py-1 bg-yellow-600 text-white rounded-md font-semibold cursor-pointer">
                  Replace
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) =>
                      replaceGalleryImage(item._id, e.target.files[0])
                    }
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= EVENTS ================= */}
      <h2 className="text-lg font-bold text-blue-900 mb-4 ml-4">Events</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8 rounded-3xl">
        {events.map((event, index) => {
          if (!event) return null;

          const isEditing = editingIndex === index;
          const isSaving = savingIndex === index;

          return (
            <div
              key={event._id ?? `event-${index}`}
              className="bg-cyan-100 rounded-2xl shadow-md flex flex-col overflow-hidden"
            >
              <label
                className={`relative h-44 bg-cyan-200 flex items-center justify-center ${
                  isEditing && !isSaving
                    ? "cursor-pointer"
                    : "pointer-events-none"
                }`}
              >
                {event.img ? (
                  <img
                    src={event.img}
                    alt="event"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-cyan-700 font-semibold">
                    + Upload Image
                  </span>
                )}

                {isEditing && !isSaving && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-sm font-semibold">
                    Change Image
                  </div>
                )}

                <input
                  type="file"
                  hidden
                  accept="image/*"
                  disabled={!isEditing || isSaving}
                  onChange={(e) => handleImage(e, index)}
                />
              </label>

              <div className="p-5 flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg text-cyan-900 line-clamp-1">
                    {event.name || "Untitled Event"}
                  </h3>

                  {!isEditing && (
                    <button
                      onClick={() => startEditing(index)}
                      className="text-cyan-700 hover:scale-110 transition"
                    >
                      <FaEdit />
                    </button>
                  )}
                </div>

                <div>
                  <label className="text-sm font-semibold">Event Date</label>
                  <input
                    type="date"
                    disabled={!isEditing || isSaving}
                    value={event.date}
                    onChange={(e) => updateEvent(index, "date", e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold">Event Name</label>
                  <input
                    disabled={!isEditing || isSaving}
                    value={event.name}
                    onChange={(e) => updateEvent(index, "name", e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold">Description</label>
                  <textarea
                    rows={3}
                    disabled={!isEditing || isSaving}
                    value={event.content}
                    onChange={(e) =>
                      updateEvent(index, "content", e.target.value)
                    }
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold">Event Link</label>
                  <input
                    disabled={!isEditing || isSaving}
                    value={event.event_link}
                    onChange={(e) =>
                      updateEvent(index, "event_link", e.target.value)
                    }
                    className={inputClass}
                  />
                </div>
              </div>

              {isEditing && (
                <div className="px-5 py-4 bg-cyan-100 border-t border-cyan-200 flex justify-between">
                  <button
                    onClick={() => saveEvent(index)}
                    disabled={isSaving}
                    className="flex items-center gap-2 bg-cyan-700 text-white px-4 py-2 rounded-lg hover:bg-cyan-800 transition disabled:opacity-50"
                  >
                    <FaSave />
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>

                  <button
                    onClick={cancelEditing}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-cyan-600 text-cyan-700 hover:bg-cyan-200 transition disabled:opacity-50"
                  >
                    <FaTimes />
                    Cancel
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
