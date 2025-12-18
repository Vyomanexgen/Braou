import GalleryEditor from "../components/GalleryEditor";
import EventsEditor from "../components/EventsEditor";

export default function EventsAdmin() {
  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-6">BRAOU Events</h1>

      <GalleryEditor />
      <EventsEditor />
    </div>
  );
}
