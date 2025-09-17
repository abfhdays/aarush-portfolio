import Link from "next/link";
import Image from "next/image";
import { about } from "@/content/about";
import { projects } from "@/content/projects";
import ProjectCard from "@/components/ProjectCard";
import Section from "@/components/Section";

function extractCompany(role: string) {
  if (role.includes(" - ")) return role.split(" - ")[1]?.trim() ?? "";
  if (role.includes(", "))  return role.split(", ")[1]?.trim() ?? "";
  return "";
}
function extractTitle(role: string) {
  if (role.includes(" - ")) return role.split(" - ")[0]?.trim() ?? role;
  if (role.includes(", "))  return role.split(", ")[0]?.trim() ?? role;
  return role;
}

export const metadata = { title: "Portfolio | Aarush Ghosh" };

export default function Home() {
  return (
    // space-y reduced so the gap where buttons used to be disappears
    <div className="space-y-10">
      {/* Hero (no buttons) */}
      <header className="text-center">
        <div className="eyebrow">portfolio</div>
        <h1 className="mt-1 font-display text-4xl md:text-5xl tracking-tight">
          Aarush Ghosh
        </h1>
        <p className="subtitle">Engineer</p>

        {/* small photo strip on mobile */}
        <div className="mt-5 flex items-center justify-center gap-3 md:hidden">
          {[1, 2, 3].map((i) => (
            <Image
              key={i}
              src="/portfolioheader1.jpeg"
              alt={`Portfolio image ${i}`}
              width={44}
              height={44}
              className="rounded-lg object-cover ring-1 ring-[var(--border)] bg-[var(--accent-bg)]"
              priority={i === 1}
            />
          ))}
        </div>
      </header>

      {/* About */}
      <Section title="about me">
        <div id="about" className="space-y-4">
          <p className="text-[var(--fg)]/85">
            I am a 3rd year Statistics major at the University of Waterloo pursuing minors in computing, combinatorics & optimization.
          </p>

          <div className="text-[var(--fg)]/85 space-y-3">
            <p>
              I am interested in building high performance products with GenAI and classical ML, tackling professional problems and delightfully trivial ones alike. I also work across the data engineering stack and app-side stack to deliver end-to-end results.
              In the past I have:
            </p>
            <ul className="pl-6 space-y-1">
              <li className="text-xs text-[var(--fg)]"><span className="chip">shipped department-scale text2sql RAG solution with CGI,</span></li>
              <li className="text-xs text-[var(--fg)]"><span className="chip">forecasted student tuition via markov chain with the Dean of Mathematics here at UW,</span></li>
              <li className="text-xs text-[var(--fg)]"><span className="chip">experimented with unsupervised ml models to detect malicious network activity with Wat.AI,</span></li>
              <li className="text-xs text-[var(--fg)]"><span className="chip">built a project portfolio which is a reflection of my personal interests and learning endeavours.</span></li>
            </ul>
            <p><span className="italic">(check my experience and projects)</span></p>
          </div>

          <p className="text-[var(--fg)]/85">
            In my own time I enjoy playing/watching/overly-analyizing sports (mainly baseball and american football). A great reflection of this is a transformer encoder model I trained to investigate defensive coverages for the 2025 NFL Big Data Bowl <a href="https://github.com/abfhdays" className="underline text-[var(--accent)]">(bdb25-blitz</a>). I also love playing and listening to music: hyperfixating on new soundscapes, lyrics every day.
          </p>
        </div>
      </Section>

      {/* Experience */}
      <Section title="experience">
        <div id="experience" className="relative">
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
                    {company && <span className="badge-soft">{company}</span>}
                    <span className="ml-auto text-sm text-[var(--muted)]">{e.time}</span>
                  </div>
                  <ul className="mt-2 list-disc pl-5 text-[var(--fg)]/85">
                    {e.bullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                </li>
              );
            })}
          </ol>
        </div>
      </Section>

      {/* Projects */}
      <Section title="projects">
        <div id="projects" className="space-y-5">
          {projects.map((p) => <ProjectCard key={p.title} p={p} />)}
        </div>
      </Section>

      {/* Skills */}
      <Section title="skills">
        <div id="skills" className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <div className="list-heading">Programming Languages</div>
            <ul className="flex flex-wrap gap-2">
              {["Python","JavaScript/TypeScript","C++","C","Java","Git","SQL","R"].map((s) => <li key={s} className="chip">{s}</li>)}
            </ul>
          </div>
          <div>
            <div className="list-heading">Full Stack</div>
            <ul className="flex flex-wrap gap-2">
              {["React.js","Node.js","PostgreSQL","Django","Flask","Firebase","MongoDB","FastAPI"].map((s) => <li key={s} className="chip">{s}</li>)}
            </ul>
          </div>
          <div>
            <div className="list-heading">AI / Data</div>
            <ul className="flex flex-wrap gap-2">
              {["Tensorflow","PyTorch","Keras","Apache","Databricks","Fabric","SQL","Pandas","Airflow","Azure OpenAI","Cohere"].map((s) => <li key={s} className="chip">{s}</li>)}
            </ul>
          </div>
          <div>
            <div className="list-heading">Developer Tools</div>
            <ul className="flex flex-wrap gap-2">
              {["AWS","Azure","Docker","Git","Linux","Redis","Jira","Pytest","Pydantic"].map((s) => <li key={s} className="chip">{s}</li>)}
            </ul>
          </div>
        </div>
      </Section>

      {/* Cool section completely removed */}
    </div>
  );
}
