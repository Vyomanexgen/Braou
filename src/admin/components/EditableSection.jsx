import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useAdmin } from "../context/AdminContext";

export default function EditableSection({ title, field }) {
  const { content, updateField } = useAdmin();
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(content[field]);

  return (
    <div className="mb-6">
      <h3 className="font-bold text-lg text-blue-900 mb-2">{title}</h3>

      <div className="relative bg-cyan-100 rounded-xl p-5">
        {!editing ? (
          <>
            <p className="font-semibold pr-10">{content[field]}</p>
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
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              onClick={() => {
                updateField(field, text);
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
