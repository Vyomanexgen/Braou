import { FaTrash } from "react-icons/fa";
import { useAdmin } from "../context/AdminContext";

export default function GalleryEditor() {
  const { content, updateField } = useAdmin();
  const gallery = content.braouGallery || Array(6).fill(null);

  const triggerInput = (index) => {
    document.getElementById(`gallery-input-${index}`).click();
  };

  const handleChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const updated = [...gallery];
    updated[index] = url;
    updateField("braouGallery", updated);
  };

  const deleteImage = (index) => {
    const updated = [...gallery];
    updated[index] = null;
    updateField("braouGallery", updated);
  };

  return (
    <div className="mb-10">
      <h2 className="text-lg font-bold text-blue-900 mb-4">Gallery</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 bg-cyan-100 p-6 rounded-2xl">
        {[...Array(6)].map((_, index) => {
          const img = gallery[index];

          return (
            <div
              key={index}
              className="relative h-36 rounded-xl overflow-hidden bg-white border-2 border-dashed border-cyan-500 cursor-pointer"
              onClick={() => !img && triggerInput(index)}
            >
              {img ? (
                <>
                  <img src={img} className="w-full h-full object-cover" />

                  <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center gap-4 transition">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerInput(index);
                      }}
                      className="px-4 py-1 bg-yellow-600 text-white rounded-md"
                    >
                      Replace
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteImage(index);
                      }}
                      className="text-white text-xl"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-cyan-700 font-bold">
                  + Add Image
                </div>
              )}

              <input
                type="file"
                id={`gallery-input-${index}`}
                accept="image/*"
                className="hidden"
                onChange={(e) => handleChange(e, index)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
