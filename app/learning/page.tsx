import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import { learning } from "@/content/learning";

export default function Learning() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 min-h-screen">
      <Navigation />
      <Section>
        <PageHeader
          title="Learning"
          icon={{ src: "/fish.jpg", alt: "fish", width: 120, height: 120 }}
        />
        <ul className="!list-disc list-inside space-y-2 text-[var(--text-secondary)] text-[0.95rem]">
          {learning.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
