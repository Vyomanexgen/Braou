import { useEffect, useState } from "react";
import {
  FaEdit,
  FaClock,
  FaFilePdf,
  FaEye,
  FaEyeSlash,
  FaLink,
} from "react-icons/fa";
import { adminFetch } from "../utils/adminFetch";

const SCROLLING_API = "/tsat/scrolling";
const NIPUNA_API = "/tsat/nipuna";
const VIDYA_API = "/tsat/vidya";
const TSAT_LINK_API = "/tsat/link";

const clone = (o) => JSON.parse(JSON.stringify(o));

/* ========================= MAIN ========================= */
export default function TSATAdmin() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      <h1 className="text-3xl font-extrabold text-blue-900">T-SAT Admin</h1>

      <Section title="Scrolling Text">
        <ScrollingAdmin />
      </Section>

      <Section title="TSAT Live Link">
        <TSATLinkAdmin />
      </Section>

      <Section title="Schedules">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MediaAdmin title="Nipuna" api={NIPUNA_API} />
          <MediaAdmin title="Vidya" api={VIDYA_API} />
        </div>
      </Section>
    </div>
  );
}

/* ========================= SECTION ========================= */
function Section({ title, children }) {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold text-blue-900 border-b pb-2">{title}</h2>
      {children}
    </div>
  );
}

/* ========================= EDITABLE CARD ========================= */
function EditableCard({ title, view, edit, onSave, onCancel }) {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await onSave();
    setSaving(false);
    setEditing(false);
  };

  return (
    <div className="relative bg-cyan-100 rounded-xl p-4 shadow-md">
      <h3 className="font-bold text-lg text-cyan-900 mb-3">{title}</h3>

      {!editing ? (
        <>
          {view}
          <button
            onClick={() => setEditing(true)}
            className="absolute top-3 right-3 text-cyan-700"
          >
            <FaEdit />
          </button>
        </>
      ) : (
        <>
          {edit}
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 bg-cyan-700 text-white py-2 rounded-lg"
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => {
                onCancel();
                setEditing(false);
              }}
              className="flex-1 border border-cyan-700 text-cyan-700 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* ========================= SCROLLING (BOOLEAN FIX) ========================= */
function ScrollingAdmin() {
  const [item, setItem] = useState(null);
  const [original, setOriginal] = useState(null);

  useEffect(() => {
    adminFetch(SCROLLING_API)
      .then((r) => r.json())
      .then((j) => {
        const list = j?.data?.data || [];
        const last = list[list.length - 1];
        if (!last) return;

        // ✅ normalize show as BOOLEAN
        const normalized = {
          ...clone(last),
          show: Boolean(last.show),
        };

        setItem(normalized);
        setOriginal(clone(normalized));
      });
  }, []);

  if (!item) return <Empty />;

  const save = async () => {
    await adminFetch(`${SCROLLING_API}/${item._id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: item.title,
        start_time: item.start_time,
        end_time: item.end_time,
        join_now_link: item.join_now_link,
        show: item.show, // ✅ BOOLEAN (true/false)
      }),
    });

    // keep state synced
    setOriginal(clone(item));
  };

  return (
    <EditableCard
      title="Scrolling Content"
      view={
        <div className="space-y-3 pr-10">
          <Info label="Title" value={item.title} />

          <IconRow
            icon={<FaClock />}
            label="Time"
            value={`${item.start_time} – ${item.end_time}`}
          />

          <StatusBox show={item.show} />

          {item.join_now_link && (
            <a
              href={item.join_now_link}
              target="_blank"
              className="flex items-center gap-2 text-cyan-700 underline break-all"
            >
              <FaLink /> Join Now
            </a>
          )}
        </div>
      }
      edit={
        <div className="space-y-3">
          <Input
            label="Title"
            value={item.title}
            onChange={(v) => setItem({ ...item, title: v })}
          />
          <Input
            label="Start Time"
            value={item.start_time}
            onChange={(v) => setItem({ ...item, start_time: v })}
          />
          <Input
            label="End Time"
            value={item.end_time}
            onChange={(v) => setItem({ ...item, end_time: v })}
          />
          <Input
            label="Join Now Link"
            value={item.join_now_link || ""}
            onChange={(v) => setItem({ ...item, join_now_link: v })}
          />

          {/* ✅ CORRECT CHECKBOX */}
          <Toggle
            label="Show scrolling"
            checked={item.show}
            onChange={(checked) => setItem({ ...item, show: checked })}
          />
        </div>
      }
      onSave={save}
      onCancel={() => setItem(clone(original))}
    />
  );
}

/* ========================= TSAT LINK ========================= */
function TSATLinkAdmin() {
  const [item, setItem] = useState(null);
  const [original, setOriginal] = useState(null);

  useEffect(() => {
    adminFetch(TSAT_LINK_API)
      .then((r) => r.json())
      .then((j) => {
        const last = j?.data?.slice(-1)[0];
        if (!last) return;
        setItem(clone(last));
        setOriginal(clone(last));
      });
  }, []);

  if (!item) return <Empty />;

  const save = async () => {
    await adminFetch(`${TSAT_LINK_API}/${item._id}`, {
      method: "PUT",
      body: JSON.stringify({
        tsat_link: item.tsat_link,
      }),
    });
    setOriginal(clone(item));
  };

  return (
    <EditableCard
      title="TSAT Live Link"
      view={
        <IconRow icon={<FaLink />} label="Live Link" value={item.tsat_link} />
      }
      edit={
        <Input
          label="TSAT Link"
          value={item.tsat_link}
          onChange={(v) => setItem({ ...item, tsat_link: v })}
        />
      }
      onSave={save}
      onCancel={() => setItem(clone(original))}
    />
  );
}

/* ========================= MEDIA ========================= */
function MediaAdmin({ api, title }) {
  const [item, setItem] = useState(null);
  const [original, setOriginal] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    adminFetch(api)
      .then((r) => r.json())
      .then((j) => {
        const list = j?.data || [];
        const last = list[list.length - 1];
        if (!last) return;
        setItem(clone(last));
        setOriginal(clone(last));
      });
  }, [api]);

  if (!item) return <Empty />;

  const save = async () => {
    const fd = new FormData();
    fd.append("timings", item.timings || "");
    fd.append("date", item.date || "");
    if (logoFile) fd.append("logo", logoFile);
    if (pdfFile) fd.append("schedule_pdf", pdfFile);

    await adminFetch(`${api}/${item._id}`, {
      method: "PUT",
      body: fd,
    });

    setOriginal(clone(item));
    setLogoFile(null);
    setPdfFile(null);
  };

  return (
    <EditableCard
      title={title}
      view={
        <div className="space-y-3 pr-10">
          <IconRow
            icon={<FaClock />}
            label="Timings"
            value={item.timings || "—"}
          />
          <IconRow icon="📅" label="Date" value={item.date || "—"} />

          {item.logo && (
            <img
              src={item.logo}
              alt="Logo"
              className="h-16 bg-white p-2 rounded object-contain"
            />
          )}

          {item.schedule_pdf && (
            <a
              href={item.schedule_pdf}
              target="_blank"
              className="flex items-center gap-2 text-red-600 font-semibold"
            >
              <FaFilePdf /> View Schedule PDF
            </a>
          )}
        </div>
      }
      edit={
        <div className="space-y-3">
          <Input
            label="Timings"
            value={item.timings || ""}
            onChange={(v) => setItem({ ...item, timings: v })}
          />
          <Input
            type="date"
            label="Date"
            value={item.date || ""}
            onChange={(v) => setItem({ ...item, date: v })}
          />
          <FileInput
            label="Upload Logo"
            accept="image/*"
            onChange={setLogoFile}
          />
          <FileInput
            label="Upload Schedule PDF"
            accept="application/pdf"
            onChange={setPdfFile}
          />
        </div>
      }
      onSave={save}
      onCancel={() => setItem(clone(original))}
    />
  );
}

/* ========================= UI HELPERS ========================= */
function Info({ label, value }) {
  return (
    <div className="bg-white p-3 rounded shadow-sm">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}

function IconRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 bg-white p-3 rounded shadow-sm">
      <div className="p-2 bg-cyan-100 text-cyan-700 rounded-full">{icon}</div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-semibold break-all">{value}</p>
      </div>
    </div>
  );
}

function StatusBox({ show }) {
  return (
    <IconRow
      icon={show ? <FaEye /> : <FaEyeSlash />}
      label="Status"
      value={show ? "Visible" : "Hidden"}
    />
  );
}

function Input({ label, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="text-sm font-semibold">{label}</label>
      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 p-2 border rounded"
      />
    </div>
  );
}

function FileInput({ label, accept, onChange }) {
  return (
    <div>
      <label className="text-sm font-semibold">{label}</label>
      <input
        type="file"
        accept={accept}
        onChange={(e) => onChange(e.target.files[0])}
        className="w-full mt-1 p-2 border rounded bg-white"
      />
    </div>
  );
}

/* ✅ BOOLEAN SAFE TOGGLE */
function Toggle({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 font-semibold">
      <input
        type="checkbox"
        checked={!!checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      {label}
    </label>
  );
}

function Empty() {
  return <div className="text-sm text-gray-500">No data available</div>;
}
