import PageLayout from "@/components/layout/PageLayout";
import PageHeader from "@/components/layout/PageHeader";
import WritingItem from "@/components/writing/WritingItem";
import { writingPosts } from "@/content/writing";
import { writingNavigation } from "@/content/navigation";

export default function Writing() {
  return (
    <PageLayout animated navigation={writingNavigation}>
      <PageHeader
        title="Blogs"
        icon={{ src: "/fish.jpg", alt: "fish", width: 185, height: 185 }}
        large
      />
      <p className="text-[var(--text-secondary)] text-base italic mb-8">
        documenting my growth as an engineer + my other interests
      </p>
      <ul aria-label="Blog posts" className="list-none space-y-4 m-0 p-0">
        {writingPosts.map((post) => (
          <WritingItem key={post.title} {...post} />
        ))}
      </ul>
    </PageLayout>
  );
}
