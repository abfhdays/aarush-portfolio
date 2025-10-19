import { projects } from "@/content/projects";
import ProjectCard from "@/components/sections/ProjectCard";

export const metadata = { title: "Projects — Aarush Ghosh" };

export default function ProjectsPage() {
  return (
    <div>
      <h1 className="text-3xl mb-6">Projects</h1>
      <div className="space-y-5">
        {projects.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </div>
    </div>
  );
}