import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import Article from "@/components/writing/Article";
import { workInProgress } from "@/content/writing/work-in-progress";
import { articleNavigation } from "@/content/navigation";

export const metadata: Metadata = {
  title: `${workInProgress.title} | Aarush Ghosh`,
  description: workInProgress.excerpt,
};

export default function WorkInProgress() {
  return (
    <PageLayout animated navigation={articleNavigation}>
      <Article {...workInProgress} />
    </PageLayout>
  );
}
