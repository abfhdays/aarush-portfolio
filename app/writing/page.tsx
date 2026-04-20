import Link from "next/link";
import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import WritingItem from "@/components/WritingItem";
import { writingPosts } from "@/content/writing";

export default function Writing() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 min-h-screen">
      <div className="fade-up">
        <nav className="mb-8 flex gap-6 text-sm">
          <Link href="/" className="hover:underline">home</Link>
          <a href="https://github.com/abfhdays" target="_blank" rel="noopener noreferrer" className="hover:underline">github</a>
          <a href="https://www.linkedin.com/in/aarush-ghosh-/" target="_blank" rel="noopener noreferrer" className="hover:underline">linkedin</a>
        </nav>
      </div>
      <div className="fade-up fade-up-2"><Section>
        <PageHeader
          title="Blogs"
          icon={{ src: "/fish.jpg", alt: "fish", width: 185, height: 185 }}
          large
        />
        <p className="text-[var(--text-secondary)] text-base italic mb-8 -mt-2">
          documenting my growth as an engineer + my other interests
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
