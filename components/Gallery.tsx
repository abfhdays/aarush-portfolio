import Image from "next/image";
import type { Photo } from "@/content/photos";

export default function Gallery({ items }: { items: Photo[] }) {
  return (
    <div className="grid gap-3 grid-cols-2 sm:grid-cols-3">
      {items.map((p, i) => (
        <div key={i} className="overflow-hidden rounded-xl border">
          <Image
            src={p.src}
            alt={p.alt}
            width={p.width}
            height={p.height}
            className="h-full w-full object-cover"
            sizes="(max-width: 640px) 50vw, 33vw"
            priority={i < 2}
          />
        </div>
      ))}
    </div>
  );
}
