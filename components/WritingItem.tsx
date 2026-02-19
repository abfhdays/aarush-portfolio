interface WritingItemProps {
  title: string;
  date: string;
  excerpt: string;
  link?: string;
  status?: 'published' | 'coming-soon';
}

export default function WritingItem({ title, date, excerpt, link, status }: WritingItemProps) {
  return (
    <div className="pb-8 mb-8 border-b border-[var(--border)] last:border-b-0 last:mb-0 last:pb-0">
      <div className="mb-1">
        <h3 className="font-semibold text-[var(--text)] text-xl leading-snug mb-1">{title}</h3>
        {date && (
          <span className="text-sm text-[var(--text-secondary)] opacity-70">{date}</span>
        )}
      </div>
      <p className="text-[var(--text-secondary)] text-base leading-relaxed mt-2 mb-3">
        {excerpt}
      </p>
      {status === 'published' && link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-base text-[var(--text)] underline underline-offset-2 decoration-[var(--border)] hover:decoration-[var(--accent)] transition-colors"
        >
          Read more →
        </a>
      ) : (
        <span className="text-base text-[var(--text-secondary)] opacity-50 italic">coming soon</span>
      )}
    </div>
  );
}
