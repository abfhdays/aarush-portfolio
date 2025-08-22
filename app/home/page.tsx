import Section from "@/components/Section";
import { about } from "@/content/about";

// Helper to extract company from role string
function extractCompany(role: string) {
  // Looks for " - " or ", " as separator
  if (role.includes(" - ")) {
    const parts = role.split(" - ");
    return parts.length > 1 ? parts[1] : "";
  }
  if (role.includes(", ")) {
    const parts = role.split(", ");
    return parts.length > 1 ? parts[1] : "";
  }
  return "";
}

// Helper to extract job title from role string
function extractTitle(role: string) {
  if (role.includes(" - ")) {
    return role.split(" - ")[0];
  }
  if (role.includes(", ")) {
    return role.split(", ")[0];
  }
  return role;
}

export default function Home() {
  return (
    <div>
      {/* Header with name only */}
      <header className="mb-8">
        <h1 className="text-5xl font-bold">{about.title}</h1>
      </header>

      {/* About Me section */}
      <h2 className="text-2xl font-semibold mb-4">About Me</h2>
      <Section title="Introduction">
        <div className="space-y-4">
          {about.intro.map((line, i) => (
            <p key={i} className="text-lg text-zinc-700">{line}</p>
          ))}
        </div>
      </Section>

      {/* Experience heading and timeline */}
      <h2 className="text-2xl font-semibold mb-4 mt-10">Experience</h2>
      <Section title="Timeline">
        <ul className="space-y-6">
          {about.experiences.map((e) => {
            const company = extractCompany(e.role);
            const title = extractTitle(e.role);
            return (
              <li key={e.role}>
                <div className="flex items-center gap-3">
                  <p className="font-medium">{title}</p>
                  {company && (
                    <span className="flex items-center text-sm text-[var(--muted)]">
                      <span className="mx-2 text-[10px] text-[var(--accent)]">●</span>
                      <span className="bg-[#f3e7d6] px-2 py-0.5 rounded text-[var(--accent)]">{company}</span>
                    </span>
                  )}
                  <span className="text-zinc-500 ml-auto text-sm">{e.time}</span>
                </div>
                <ul className="mt-2 list-disc pl-5">
                  {e.bullets.map(b => <li key={b}>{b}</li>)}
                </ul>
              </li>
            );
          })}
        </ul>
      </Section>

      <h2 className="text-2xl font-semibold mb-4">Cool</h2>
      <Section title="Photos">
        <p>{about.hobbies.join(", ")}.</p>
      </Section>
    </div>
  );
}
