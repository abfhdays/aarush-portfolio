import Image from "next/image";
import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import ProjectItem from "@/components/ProjectItem";
import { projects } from "@/content/projects";

export default function Projects() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 min-h-screen">
      <Navigation />
      {/* PROJECTS: title with baseball icon directly to the right */}
      <Section>
        <div className="flex items-center gap-3 mb-4">
          <h3 className="m-0 text-2xl font-medium underline underline-offset-4 decoration-[var(--accent)]">Projects</h3>
          <Image
            src="/baseball.jpg"
            alt="baseball"
            width={80}
            height={80}
            className="rounded-sm object-contain"
          />
        </div>

        {projects.map((project, index) => (
          <ProjectItem
            key={index}
            title={project.title}
            date={project.date}
            description={project.description}
            link={project.link}
            tags={project.tags}
          />
        ))}
      </Section>
    </div>
  );
}
