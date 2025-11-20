import Header from "@/components/Header";
import Section from "@/components/Section";
import WorkItem from "@/components/WorkItem";
import ProjectItem from "@/components/ProjectItem";

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 min-h-screen">
      <Header />
      
      <Section title="work">
        <WorkItem 
          title="Position Title"
          company="Company Name"
          date="Month Year - Present"
          description="Brief description of what you did in this role."
        />
        <WorkItem 
          title="Another Position"
          company="Another Company"
          date="Month Year - Month Year"
          description="Another brief description of responsibilities and achievements."
        />
      </Section>

      <Section title="projects">
        <ProjectItem 
          title="Project Name"
          date="Month Year"
          description="Brief description of what this project does and why it matters."
          link="https://github.com/username/project"
        />
        <ProjectItem 
          title="Another Project"
          date="Month Year"
          description="Another brief description of an interesting project you built."
          link="https://github.com/username/project"
        />
      </Section>
    </div>
  );
}