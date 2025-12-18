import { FaTrash } from "react-icons/fa";
import { useAdmin } from "../context/AdminContext";

export default function EventsEditor() {
  const { content, updateField } = useAdmin();
  const events = content.braouEvents || [];

  const updateEvent = (index, key, value) => {
    const updated = [...events];
    updated[index][key] = value;
    updateField("braouEvents", updated);
  };

  const addEvent = () => {
    updateField("braouEvents", [
      ...events,
      { img: "", date: "", name: "", content: "" },
    ]);
  };

  const deleteEvent = (index) => {
    updateField(
      "braouEvents",
      events.filter((_, i) => i !== index)
    );
  };

  const handleImage = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    updateEvent(index, "img", url);
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-blue-900 mb-4">Events</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-cyan-100 p-6 rounded-2xl">
        {events.map((event, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-xl shadow flex flex-col gap-3"
          >
            {/* Image */}
            <label className="h-28 bg-cyan-50 rounded-lg cursor-pointer flex items-center justify-center overflow-hidden">
              {event.img ? (
                <img src={event.img} className="w-full h-full object-cover" />
              ) : (
                <span className="text-cyan-700 font-bold">+ Add Image</span>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImage(e, index)}
              />
            </label>

            {/* Date */}
            <input
              placeholder="Date"
              value={event.date}
              onChange={(e) => updateEvent(index, "date", e.target.value)}
              className="border p-2 rounded"
            />

            {/* Name */}
            <input
              placeholder="Event Name"
              value={event.name}
              onChange={(e) => updateEvent(index, "name", e.target.value)}
              className="border p-2 rounded"
            />

            {/* Content */}
            <textarea
              placeholder="Event Content"
              value={event.content}
              onChange={(e) => updateEvent(index, "content", e.target.value)}
              className="border p-2 rounded resize-none"
              rows={3}
            />

            {/* Delete */}
            <button
              onClick={() => deleteEvent(index)}
              className="text-red-600 flex items-center gap-2 justify-center font-semibold"
            >
              <FaTrash /> Delete
            </button>
          </div>
        ))}

        <button
          onClick={addEvent}
          className="col-span-full py-3 bg-cyan-700 text-white rounded-xl font-bold"
        >
          + Add Event
        </button>
      </div>
    </div>
  );
}
