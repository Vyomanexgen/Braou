import { FaEdit } from "react-icons/fa";

export default function SchedulePicker({ value, onChange }) {
  return (
    <div className="bg-cyan-100 p-4 rounded-xl w-80">
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        id="filePicker"
        onChange={(e) => {
          const file = e.target.files[0];
          if (!file) return;
          onChange({ name: file.name, url: URL.createObjectURL(file) });
        }}
      />

      <div className="flex items-center gap-3">
        {value ? (
          <a href={value.url} target="_blank" className="font-semibold">
            📄 {value.name}
          </a>
        ) : (
          <span>No file selected</span>
        )}

        <FaEdit
          className="cursor-pointer text-cyan-700"
          onClick={() => document.getElementById("filePicker").click()}
        />
      </div>
    </div>
  );
}
