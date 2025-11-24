interface WorkItemProps {
  title: string;
  company: string;
  date: string;
  description: string;
}

export default function WorkItem({ title, company, date, description }: WorkItemProps) {
  return (
    <div className="group pb-8 mb-8 border-b border-[var(--border)] last:border-b-0 last:mb-0 last:pb-0">
      <div className="flex items-baseline justify-between mb-1">
        <h3 className="font-medium text-[var(--text)]">
          {title} <span className="text-[var(--text-secondary)]">@ {company}</span>
        </h3>
        <span className="text-sm text-[var(--text-secondary)] whitespace-nowrap ml-4">
          {date}
        </span>
      </div>
      <p className="text-[var(--text-secondary)] text-[0.95rem] leading-relaxed mb-3">
        {description}
      </p>
    </div>
  );
}