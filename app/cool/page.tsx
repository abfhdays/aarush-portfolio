import { photos } from "@/content/photos";
import Gallery from "@/components/Gallery";

export const metadata = { title: "Photos — Aarush Ghosh" };

export default function Photos() {
  return (
    <div>
      <h1 className="text-3xl mb-6">Photos</h1>
      <Gallery items={photos} />
      <p className="mt-4 text-sm text-zinc-600">A few favorites from hikes, studio time, and city walks.</p>
    </div>
  );
}
