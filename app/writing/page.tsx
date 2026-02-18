import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import WritingItem from "@/components/WritingItem";
import { writingPosts } from "@/content/writing";

export default function Writing() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 min-h-screen">
      <div className="fade-up"><Navigation /></div>
      <div className="fade-up fade-up-2"><Section>
        <PageHeader
          title="Writing"
          icon={{ src: "/fish.jpg", alt: "fish", width: 120, height: 120 }}
        />
        <p className="text-[var(--text-secondary)] text-sm italic mb-8 -mt-2">
          documenting my progress as an engineer and other stuff
        </p>
        {writingPosts.map((post, index) => (
          <WritingItem
            key={index}
            title={post.title}
            date={post.date}
            excerpt={post.excerpt}
            link={post.link}
            status={post.status}
          />
        ))}
      </Section></div>
    </div>
  );
}
