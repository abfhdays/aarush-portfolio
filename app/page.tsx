import Image from "next/image";
import Header from "@/components/Header";
import Section from "@/components/Section";
import WorkItem from "@/components/WorkItem";
import ProjectItem from "@/components/ProjectItem";
import { workExperience } from "@/content/work";
import { projects } from "@/content/projects";
import { learning } from "@/content/learning";

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 min-h-screen">
      <Header />

      {/* WORK: title with piano icon directly to the right */}
      <Section>
        <div className="flex items-center gap-3 mb-4">
          <h3 className="m-0 text-2xl font-medium underline underline-offset-4 decoration-[var(--accent)]">Work</h3>
          <Image
            src="/piano.jpg"
            alt="piano"
            width={120}
            height={120}
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

      {/* LEARNING: title with fish icon directly to the right */}
      <Section>
        <div className="flex items-center gap-3 mb-4">
          <h3 className="m-0 text-2xl font-medium underline underline-offset-4 decoration-[var(--accent)]">Learning</h3>
          <Image
            src="/fish.jpg"
            alt="fish"
            width={120}
            height={120}
            className="rounded-sm object-contain"
          />
        </div>

        <ul className="!list-disc list-inside space-y-2 text-[var(--text-secondary)] text-[0.95rem]">
          {learning.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </Section>
    </div>
  );
}