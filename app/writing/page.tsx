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
      <p className="text-[var(--text-secondary)] text-base italic mb-8 -mt-2">
        documenting my growth as an engineer + my other interests
      </p>
      {writingPosts.map((post) => (
        <WritingItem key={post.title} {...post} />
      ))}
    </PageLayout>
  );
}
