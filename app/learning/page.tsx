import Image from "next/image";
import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import { learning } from "@/content/learning";

export default function Learning() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 min-h-screen">
      <Navigation />
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
