import PageLayout from "@/components/layout/PageLayout";
import PageHeader from "@/components/layout/PageHeader";
import WorkItem from "@/components/work/WorkItem";
import { workExperience } from "@/content/work";

export default function Work() {
  return (
    <PageLayout>
      <PageHeader
        title="Work"
        icon={{ src: "/piano.jpg", alt: "piano", width: 120, height: 120 }}
      />
      {workExperience.map((work) => (
        <WorkItem key={`${work.company}-${work.date}`} {...work} />
      ))}
    </PageLayout>
  );
}
