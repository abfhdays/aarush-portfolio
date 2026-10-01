import { assetPath } from "@/lib/assets";
import Image from "next/image";

interface PageHeaderProps {
  title: string;
  icon: { src: string; alt: string; width: number; height: number };
  large?: boolean;
}

export default function PageHeader({ title, icon, large }: PageHeaderProps) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <h1 className={`m-0 font-medium underline underline-offset-4 decoration-[var(--accent)] ${large ? "text-4xl sm:text-5xl" : "text-2xl"}`}>
        {title}
      </h1>
      <Image
        src={assetPath(icon.src)}
        alt={icon.alt}
        width={icon.width}
        height={icon.height}
        className="rounded-sm object-contain h-auto max-w-[28vw] shrink-0 mix-blend-multiply sm:max-w-none"
      />
    </div>
  );
}
