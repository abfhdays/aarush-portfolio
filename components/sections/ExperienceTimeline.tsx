import { Experience } from '@/types';
import { extractCompany, extractTitle } from '@/lib/utils';
import Badge from '@/components/ui/Badge';

interface ExperienceTimelineProps {
  experiences: Experience[];
  logos?: Record<number, string>;
}

export default function ExperienceTimeline({ 
  experiences, 
  logos = {} 
}: ExperienceTimelineProps) {
  return (
    <div className="relative">
      <span 
        className="absolute left-2 top-1 bottom-1 w-px bg-[var(--border)]" 
        aria-hidden="true" 
      />
      <ol className="pl-6">
        {experiences.map((exp, idx) => {
          const company = extractCompany(exp.role);
          const title = extractTitle(exp.role);
          const logoSrc = logos[idx];

          return (
            <li 
              key={`${exp.role}-${idx}`} 
              className="mb-8 last:mb-0 relative pl-8"
            >
              <span className="absolute left-0 mt-1 h-3 w-3 rounded-full bg-[var(--accent)] ring-2 ring-[var(--accent-bg)]" />
              
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{title}</p>
                  {logoSrc && (
                    <img
                      src={logoSrc}
                      alt={`${company} logo`}
                      width={22}
                      height={22}
                      className="inline-block align-middle rounded"
                      style={{ objectFit: "contain" }}
                    />
                  )}
                </div>
                {company && <Badge variant="soft">{company}</Badge>}
                <span className="ml-auto text-sm text-[var(--muted)]">
                  {exp.time}
                </span>
              </div>

              <ul className="mt-2 list-disc pl-5 text-[var(--fg)]/85">
                {exp.bullets.map((bullet, bulletIdx) => (
                  <li key={bulletIdx}>{bullet}</li>
                ))}
              </ul>
            </li>
          );
        })}
      </ol>
    </div>
  );
}