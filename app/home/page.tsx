// app/home/page.tsx
import Link from "next/link";
import Section from "@/components/Section";
import { about } from "@/content/about";

// Helper: extract company from "Title - Company" or "Title, Company"
function extractCompany(role: string) {
  if (role.includes(" - ")) return role.split(" - ")[1]?.trim() ?? "";
  if (role.includes(", "))  return role.split(", ")[1]?.trim() ?? "";
  return "";
}
// Helper: extract title from "Title - Company" or "Title, Company"
function extractTitle(role: string) {
  if (role.includes(" - ")) return role.split(" - ")[0]?.trim() ?? role;
  if (role.includes(", "))  return role.split(", ")[0]?.trim() ?? role;
  return role;
}

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <header className="mb-2">
        <h1 className="font-display text-4xl md:text-5xl tracking-tight text-[var(--header)]">
          {about.title}
        </h1>
        <p className="mt-3 text-lg text-[var(--muted)] max-w-2xl">
          I’m Aarush. I build simple, resilient software and write about what I learn.
        </p>

        
      </header>

      {/* About */}
      <Section title="About Me">
        <div className="space-y-4">
          {about.intro.map((line, i) => (
            <p key={i} className="text-[var(--fg)]/85">{line}</p>
          ))}
        </div>
      </Section>

      {/* Passions */}
      <Section title="Passions">
        <div className="flex flex-wrap gap-2">
          {about.passions.map((p) => (
            <span
              key={p}
              className="text-xs rounded-full px-2.5 py-1 bg-[var(--accent-bg)] text-[var(--accent-ink)] ring-1 ring-[var(--border)]"
            >
              {p}
            </span>
          ))}
        </div>
      </Section>

      {/* Experience (vertical timeline) */}
      <Section title="Experience">
        <ol className="relative pl-6">
          {/* timeline rail */}
          <div className="absolute left-2 top-1 bottom-1 w-px bg-[var(--border)]" />
          {about.experiences.map((e) => {
            const company = extractCompany(e.role);
            const title = extractTitle(e.role);
            return (
              <li key={e.role} className="mb-8 last:mb-0">
                {/* node */}
                <span className="absolute -left-[7px] mt-1 h-3 w-3 rounded-full bg-[var(--accent)] ring-2 ring-[var(--accent-bg)]" />
                {/* header row */}
                <div className="flex flex-wrap items-center gap-3">
                  <p className="font-medium">{title}</p>
                  {company && (
                    <span className="text-xs rounded px-2 py-0.5 bg-[#f3e7d6] text-[var(--accent)] ring-1 ring-[var(--border)]">
                      {company}
                    </span>
                  )}
                  <span className="ml-auto text-sm text-[var(--muted)]">{e.time}</span>
                </div>
                {/* bullets */}
                <ul className="mt-2 list-disc pl-5 text-[var(--fg)]/85">
                  {e.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </Section>

      {/* Outside work / Hobbies */}
      <Section title="Outside of Work">
        <p className="text-[var(--fg)]/85">
          {about.hobbies.join(", ")}.
        </p>
      </Section>
    </div>
  );
}
