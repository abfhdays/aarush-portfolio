import Badge from "./Badge";
import type { Project } from "@/content/projects";

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <article className="rounded-2xl border p-5 hover:shadow-sm transition">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{p.title}</h3>
        {p.year && <span className="text-xs text-zinc-500">{p.year}</span>}
      </div>
      <p className="mt-2 text-zinc-700">{p.summary}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {p.tech.map(t => <Badge key={t}>{t}</Badge>)}
      </div>
      <div className="mt-4 text-sm">
        <a className="underline" href={p.github} target="_blank" rel="noreferrer">GitHub</a>
        {p.demo && <> · <a className="underline" href={p.demo} target="_blank" rel="noreferrer">Live</a></>}
      </div>
    </article>
  );
}
