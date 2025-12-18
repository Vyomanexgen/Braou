import SchedulePicker from "../components/SchedulePicker";
import { useAdmin } from "../context/AdminContext";

export default function BannerAdmin() {
  const { content, updateField } = useAdmin();

  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-6">Banner</h1>

      <SchedulePicker
        value={content.bannerFile}
        onChange={(v) => updateField("bannerFile", v)}
      />
    </div>
  );
}
