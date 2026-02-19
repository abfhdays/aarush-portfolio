import Image from "next/image";

interface PageHeaderProps {
  title: string;
  icon: { src: string; alt: string; width: number; height: number };
  large?: boolean;
}

export default function PageHeader({ title, icon, large }: PageHeaderProps) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <h3 className={`m-0 font-medium underline underline-offset-4 decoration-[var(--accent)] ${large ? "text-5xl" : "text-2xl"}`}>
        {title}
      </h3>
      <Image
        src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${icon.src}`}
        alt={icon.alt}
        width={icon.width}
        height={icon.height}
        className="rounded-sm object-contain"
      />
    </div>
  );
}
