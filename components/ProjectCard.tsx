import { Project } from "@/content/projects";

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <article className="border-b border-[var(--border)] pb-6 mb-6 last:mb-0 last:border-none">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
        <h3 className="font-display text-[1.15rem] font-semibold text-[var(--header)] m-0">{p.title}</h3>
        <div className="flex gap-2">
          {p.github && (
            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-2 py-1 rounded bg-[var(--accent-bg)] text-[var(--accent-ink)] hover:bg-[var(--border)] transition"
            >
              GitHub
            </a>
          )}
          {p.demo && (
            <a
              href={p.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-2 py-1 rounded bg-[var(--accent-bg)] text-[var(--accent-ink)] hover:bg-[var(--border)] transition"
            >
              Demo
            </a>
          )}
          {p.year && (
            <span className="text-xs px-2 py-1 rounded bg-[var(--border)] text-[var(--muted)]">{p.year}</span>
          )}
        </div>
      </div>
      <p className="text-[var(--fg)] text-[0.98rem] leading-relaxed mb-2">{p.summary}</p>
      <div className="flex flex-wrap gap-2">
        {p.tech.map((tech) => (
          <span
            key={tech}
            className="text-xs px-2 py-0.5 rounded bg-[var(--accent-bg)] text-[var(--accent-ink)]"
          >
            {tech}
          </span>
        ))}
      </div>
    </article>
  );
}
