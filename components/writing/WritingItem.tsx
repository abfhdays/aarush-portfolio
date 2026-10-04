import Link from "next/link";
import type { WritingPost } from "@/types/content";

export default function WritingItem({ title, date, excerpt, link, status }: WritingPost) {
  return (
    <li className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
      <div className="min-w-0">
        {status === 'published' && link ? (
          link.startsWith('/') ? (
            <Link href={link} className="font-medium underline underline-offset-4 decoration-[var(--border)] hover:decoration-[var(--accent)]">
              {title}
            </Link>
          ) : (
            <a href={link} target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-4 decoration-[var(--border)] hover:decoration-[var(--accent)]">
              {title} ↗
            </a>
          )
        ) : (
          <span className="font-medium">{title} <span className="text-sm text-[var(--text-secondary)] italic">(coming soon)</span></span>
        )}
        <p className="mt-1 mb-0 text-sm leading-relaxed text-[var(--text-secondary)]">{excerpt}</p>
      </div>
      {date && <span className="shrink-0 text-sm text-[var(--text-secondary)]">{date}</span>}
    </li>
  );
}
