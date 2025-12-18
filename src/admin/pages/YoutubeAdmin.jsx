import EditableSection from "../components/EditableSection";

export default function YoutubeAdmin() {
  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-6">Youtube</h1>
      <EditableSection title="Youtube Link" field="ytLink" />
    </div>
  );
}
