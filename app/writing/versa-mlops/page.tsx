import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import Article from "@/components/writing/Article";
import { versaMlops } from "@/content/writing/versa-mlops";
import { articleNavigation } from "@/content/navigation";

export const metadata: Metadata = {
  title: `${versaMlops.title} | Aarush Ghosh`,
  description: versaMlops.excerpt,
};

export default function VersaMlops() {
  return (
    <PageLayout animated navigation={articleNavigation}>
      <Article {...versaMlops} />
    </PageLayout>
  );
}
