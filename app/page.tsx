import Image from "next/image";
import Header from "@/components/Header";
import Section from "@/components/Section";
import WorkItem from "@/components/WorkItem";
import ProjectItem from "@/components/ProjectItem";
import { workExperience } from "@/content/work";
import { projects } from "@/content/projects";

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 min-h-screen">
      <Header />

      {/* WORK: title with piano icon directly to the right */}
      <Section>
        <div className="flex items-center gap-3 mb-4">
          <h3 className="m-0 text-lg font-medium underline underline-offset-4 decoration-[var(--accent)]">Work</h3>
          <Image
            src="/piano.jpg"
            alt="piano"
            width={100}
            height={100}
            className="rounded-sm object-contain"
          />
        </div>

        {workExperience.map((work, index) => (
          <WorkItem
            key={index}
            title={work.title}
            company={work.company}
            date={work.date}
            description={work.description}
          />
        ))}
      </Section>

      {/* PROJECTS: title with baseball icon directly to the right */}
      <Section>
        <div className="flex items-center gap-3 mb-4">
          <h3 className="m-0 text-lg font-medium underline underline-offset-4 decoration-[var(--accent)]">Projects</h3>
          <Image
            src="/baseball.jpg"
            alt="baseball"
            width={60}
            height={60}
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
          />
        ))}
      </Section>
    </div>
  );
}