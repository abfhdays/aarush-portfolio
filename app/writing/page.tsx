import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import { writing } from "@/content/writing";

export default function Writing() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 min-h-screen">
      <div className="fade-up"><Navigation /></div>
      <div className="fade-up fade-up-2"><Section>
        <PageHeader
          title="Writing"
          icon={{ src: "/fish.jpg", alt: "fish", width: 120, height: 120 }}
        />
        <ul className="!list-disc list-inside space-y-2 text-[var(--text-secondary)] text-[0.95rem]">
          {writing.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </Section></div>
    </div>
  );
}
