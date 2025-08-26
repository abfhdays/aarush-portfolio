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

export const metadata = {
  title: "About | Aarush Ghosh",
};

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

      {/* About Me - single, custom font, no caps, light green */}
      <Section title="about me">
        <p className="text-[var(--fg)]/85">
          I am a 3rd year Statistics major at the University of Waterloo pursuing minors in computing, combinatorics & optimization.
        </p>
        <div className="text-[var(--fg)]/85 space-y-1">
          <p>
            I am interested in building high performance products with GenAI and classical ML, tackling professional problems and delightfully trivial ones alike. I also work across the data engineering stack and app-side stack to deliver end-to-end results.
            In the past I have:
          </p>
          <ul className="pl-6 space-y-1">
            <li className="text-xs text-[var(--fg)]">
              <span className="bg-[var(--accent-bg)] rounded px-1.5 py-0.5">
                shipped department-scale text2sql RAG solution with CGI,
              </span>
            </li>
            <li className="text-xs text-[var(--fg)]">
              <span className="bg-[var(--accent-bg)] rounded px-1.5 py-0.5">
                forecasted student tuition via markov chain with the Dean of Mathematics here at UW,
              </span>
            </li>
            <li className="text-xs text-[var(--fg)]">
              <span className="bg-[var(--accent-bg)] rounded px-1.5 py-0.5">
                experimented with unsupervised ml models to detect malicious network activity with Wat.AI,
              </span>
            </li>
            <li className="text-xs text-[var(--fg)]">
              <span className="bg-[var(--accent-bg)] rounded px-1.5 py-0.5">
                created a project portfolio which is a reflection of my personal interests and learning endeavours.
              </span>
            </li>
          </ul>
          <p>
            <span className="italic">(check my experience and projects)</span>
          </p>
        </div>
        <p className="text-[var(--fg)]/85">
          In my own time I enjoy playing sports (baseball, football, soccer) (and digging through niche statistics in websites like baseball reference <a href="/projects#sports" className="underline text-[var(--accent)]">here's a link to be sports project</a>), playing and listening to music (hyperfixating on new soundscapes, lyrics every day).
        </p>
      </Section>

      {/* Experience */}
      <Section title="experience">
        <div className="relative">
          {/* Timeline vertical line */}
          <span className="absolute left-2 top-1 bottom-1 w-px bg-[var(--border)]" aria-hidden="true" />
          <ol className="pl-6">
            {about.experiences.map((e) => {
              const company = extractCompany(e.role);
              const title = extractTitle(e.role);
              return (
                <li key={e.role} className="mb-8 last:mb-0 relative pl-8">
                  <span className="absolute left-0 mt-1 h-3 w-3 rounded-full bg-[var(--accent)] ring-2 ring-[var(--accent-bg)]" />
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="font-medium">{title}</p>
                    {company && (
                      <span className="text-xs rounded px-2 py-0.5 bg-[#f3e7d6] text-[var(--accent)] ring-1 ring-[var(--border)]">
                        {company}
                      </span>
                    )}
                    <span className="ml-auto text-sm text-[var(--muted)]">{e.time}</span>
                  </div>
                  <ul className="mt-2 list-disc pl-5 text-[var(--fg)]/85">
                    {e.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ol>
        </div>
      </Section>

      notfinished{/* Skills */}
      <Section title="skills">
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
    </div>
  );
}
