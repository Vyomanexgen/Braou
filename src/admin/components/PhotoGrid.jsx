import { useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function PhotoGrid() {
  const [photos, setPhotos] = useState([null, null, null, null, null, null]);

  const triggerFileInput = (index) => {
    document.getElementById(`photo-input-${index}`).click();
  };

  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    setPhotos((prev) => {
      const updated = [...prev];
      updated[index] = url;
      return updated;
    });
  };

  const deletePhoto = (index) => {
    setPhotos((prev) => {
      const updated = [...prev];
      updated[index] = null;
      return updated;
    });
  };

  return (
    <div className="bg-white/40 p-6 rounded-2xl mb-10">
      <h2 className="text-lg font-bold text-blue-900 mb-4">Photos</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {photos.map((src, index) => (
          <div
            key={index}
            className="relative h-40 rounded-xl bg-white/60 overflow-hidden border-2 border-dashed border-cyan-600 cursor-pointer"
            onClick={() => !src && triggerFileInput(index)}
          >
            {src ? (
              <>
                <img
                  src={src}
                  alt="Uploaded"
                  className="w-full h-full object-cover"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center gap-4 transition">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      triggerFileInput(index);
                    }}
                    className="px-4 py-1 bg-yellow-600 text-white rounded-md font-semibold"
                  >
                    Replace
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePhoto(index);
                    }}
                    className="text-white text-xl"
                  >
                    <FaTrash />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-cyan-700 font-bold text-lg">
                + Add Image
              </div>
            )}

            <input
              id={`photo-input-${index}`}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileChange(index, e)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
