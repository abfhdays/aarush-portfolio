import PageLayout from "@/components/layout/PageLayout";
import PageHeader from "@/components/layout/PageHeader";
import ProjectItem from "@/components/projects/ProjectItem";
import { projects } from "@/content/projects";

export default function Projects() {
  return (
    <PageLayout animated>
      <PageHeader
        title="Projects"
        icon={{ src: "/baseball.jpg", alt: "baseball", width: 80, height: 80 }}
      />
      {projects.map((project) => (
        <ProjectItem key={project.title} {...project} />
      ))}
    </PageLayout>
  );
}
