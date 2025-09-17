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

        
      </header>

      {/* About */}
      <Section title="about me">
        <div id="about" className="space-y-4">
          <p className="text-[var(--fg)]/85">
            I am a 3rd year Statistics major at the University of Waterloo pursuing minors in computing, combinatorics & optimization.
          </p>

          <div className="text-[var(--fg)]/85 space-y-3">
            <p>
              I am interested in creating insightful, high performance, and creative solutions with Gen AI and Classical ML, from tackling professional challenges to weekend side quests. I also work closely across the data engineering stack and app-side stack to deliver end-to-end results (see <a href="#skills" className="underline text-[var(--accent)]">skills</a> for more specifics).
              In the past I have:
            </p>
            <ul className="pl-6 space-y-1">
              <li className="text-xs text-[var(--fg)]"><span className="chip">shipped a department-scale text2sql RAG solution with CGI,</span></li>
              <li className="text-xs text-[var(--fg)]"><span className="chip">forecasted student tuition via markov chains with the Dean of Mathematics here at UW,</span></li>
              <li className="text-xs text-[var(--fg)]"><span className="chip">experimented with unsupervised ml models to detect malicious network activity with Wat.AI,</span></li>
              <li className="text-xs text-[var(--fg)]"><span className="chip">built a project portfolio which is a reflection of my personal interests and learning endeavours.</span></li>
            </ul>
            <p><span className="italic">check <a href="#experience" className="underline text-[var(--accent)]">experience</a> and <a href="#projects" className="underline text-[var(--accent)]">projects</a> for more</span></p>
          </div>

          <p className="text-[var(--fg)]/85">
            In my own time I enjoy playing/watching/over-analyizing sports (mainly baseball and american football). A great reflection of this is a transformer encoder model I trained to investigate defensive coverages for the 2025 NFL Big Data Bowl <a href="https://github.com/abfhdays/bdb25-blitz1" className="underline text-[var(--accent)]">(bdb25-blitz</a>). I also love playing and listening to music—challenging myself with new soundscapes and lyrics every day.
          </p>
          <div className="flex gap-4 mt-6">
            <img
              src="/aboutme1.jpg"
              alt="About Me 1"
              width={180}
              height={180}
              className="rounded-lg object-cover"
            />
            <img
              src="/aboutme2.jpg"
              alt="About Me 2"
              width={180}
              height={180}
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      </Section>

      {/* Experience */}
      <Section title="experience">
        <div id="experience">
          <div className="relative">
            <span className="absolute left-2 top-1 bottom-1 w-px bg-[var(--border)]" aria-hidden="true" />
            <ol className="pl-6">
              {about.experiences.map((e, idx) => {
                const company = extractCompany(e.role);
                const title = extractTitle(e.role);
                // Choose logo for each experience
                const logoSrc = idx === 0 ? "/logo1.jpeg" : idx === 1 ? "/logo2.jpeg" : null;
                return (
                  <li key={e.role} className="mb-8 last:mb-0 relative pl-8">
                    <span className="absolute left-0 mt-1 h-3 w-3 rounded-full bg-[var(--accent)] ring-2 ring-[var(--accent-bg)]" />
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{title}</p>
                        {logoSrc && (
                          <img
                            src={logoSrc}
                            alt="logo"
                            width={22}
                            height={22}
                            className="inline-block align-middle rounded"
                            style={{ objectFit: "contain" }}
                          />
                        )}
                      </div>
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
        <div id="skills" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="text-xs font-semibold mb-2 text-black bg-[var(--accent-bg)] px-2 py-1 rounded inline-block">Programming Languages</div>
            <ul className="flex flex-wrap gap-2">
              {["Python","JavaScript/TypeScript","C++","C","SQL","R"].map((s) => <li key={s} className="chip">{s}</li>)}
            </ul>
          </div>
          <div>
            <div className="text-xs font-semibold mb-2 text-black bg-[var(--accent-bg)] px-2 py-1 rounded inline-block">Full Stack</div>
            <ul className="flex flex-wrap gap-2">
              {["React.js","Node.js","PostgreSQL","Django","Flask","Firebase","MongoDB","FastAPI"].map((s) => <li key={s} className="chip">{s}</li>)}
            </ul>
          </div>
          <div>
            <div className="text-xs font-semibold mb-2 text-black bg-[var(--accent-bg)] px-2 py-1 rounded inline-block">AI / Data</div>
            <ul className="flex flex-wrap gap-2">
              {["Tensorflow","PyTorch","Keras","Apache","Databricks","Fabric","SQL","Pandas","Airflow"].map((s) => <li key={s} className="chip">{s}</li>)}
            </ul>
          </div>
          <div>
            <div className="text-xs font-semibold mb-2 text-black bg-[var(--accent-bg)] px-2 py-1 rounded inline-block">Developer Tools</div>
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
