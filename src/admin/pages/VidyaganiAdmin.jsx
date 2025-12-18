import EditableSection from "../components/EditableSection";

export default function VidyaganiAdmin() {
  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-6">Vidyagani</h1>
      <EditableSection title="Vidyagani Link" field="vidyaLink" />
    </div>
  );
}
