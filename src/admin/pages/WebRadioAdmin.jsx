import EditableSection from "../components/EditableSection";

export default function WebRadioAdmin() {
  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-6">Web Radio</h1>
      <EditableSection title="Radio Link" field="radioLink" />
    </div>
  );
}
