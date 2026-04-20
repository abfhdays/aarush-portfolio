import Image from "next/image";

interface WorkItemProps {
  title: string;
  company: string;
  companyUrl?: string;
  companyIcon?: string;
  date: string;
  description: string;
}

export default function WorkItem({ title, company, companyUrl, companyIcon, date, description }: WorkItemProps) {
  return (
    <div className="group pb-8 mb-8 border-b border-[var(--border)] last:border-b-0 last:mb-0 last:pb-0">
      <div className="flex items-baseline justify-between mb-1">
        <h3 className="font-medium text-[var(--text)] flex items-center gap-2">
          {companyIcon && (
            <span className="inline-flex items-center self-center">
              <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${companyIcon}`} alt={company} width={18} height={18} className="rounded-sm object-contain" />
            </span>
          )}
          {title}{" "}
          {companyUrl ? (
            <a
              href={companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-secondary)] font-normal underline decoration-[var(--border)] hover:decoration-[var(--accent)] transition-colors"
            >
              @ {company}
            </a>
          ) : (
            <span className="text-[var(--text-secondary)] font-normal">@ {company}</span>
          )}
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
