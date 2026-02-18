import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import ProjectItem from "@/components/ProjectItem";
import { projects } from "@/content/projects";

export default function Projects() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 min-h-screen">
      <div className="fade-up"><Navigation /></div>
      <div className="fade-up fade-up-2"><Section>
        <PageHeader
          title="Projects"
          icon={{ src: "/baseball.jpg", alt: "baseball", width: 80, height: 80 }}
        />
        {projects.map((project, index) => (
          <ProjectItem
            key={index}
            title={project.title}
            date={project.date}
            description={project.description}
            link={project.link}
            tags={project.tags}
            previewImage={project.previewImage}
          />
        ))}
      </Section></div>
    </div>
  );
}
