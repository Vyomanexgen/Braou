import EditableSection from "../components/EditableSection";
import TSATSection from "../components/TSATSection";

export default function TSATAdmin() {
  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-6">T-SAT (Vidya / Nipuna)</h1>

      <EditableSection title="Scrolling" field="tsatScrolling" />
      <EditableSection title="Link" field="tsatLink" />

      <div className="grid md:grid-cols-2 gap-6">
        <TSATSection
          title="T-SAT Vidya"
          logoField="vidyaLogo"
          timingField="vidyaTimings"
          dateField="vidyaDate"
          scheduleField="vidyaSchedule"
        />

        <TSATSection
          title="T-SAT Nipuna"
          logoField="nipunaLogo"
          timingField="nipunaTimings"
          dateField="nipunaDate"
          scheduleField="nipunaSchedule"
        />
      </div>
    </div>
  );
}
