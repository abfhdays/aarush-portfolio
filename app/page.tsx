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
      
      <Section title="work">
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

      <Section title="projects">
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