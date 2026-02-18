import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import WorkItem from "@/components/WorkItem";
import { workExperience } from "@/content/work";

export default function Work() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 min-h-screen">
      <Navigation />
      <Section>
        <PageHeader
          title="Work"
          icon={{ src: "/piano.jpg", alt: "piano", width: 120, height: 120 }}
        />
        {workExperience.map((work, index) => (
          <WorkItem
            key={index}
            title={work.title}
            company={work.company}
            companyUrl={work.companyUrl}
            companyIcon={work.companyIcon}
            date={work.date}
            description={work.description}
          />
        ))}
      </Section>
    </div>
  );
}
