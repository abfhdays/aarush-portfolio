import Image from "next/image";
import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import WorkItem from "@/components/WorkItem";
import { workExperience } from "@/content/work";

export default function Work() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 min-h-screen">
      <Navigation />
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
    </div>
  );
}
