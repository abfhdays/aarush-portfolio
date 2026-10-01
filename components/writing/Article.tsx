import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { WritingArticle } from "@/types/content";

export default function Article({ title, date, body }: WritingArticle) {
  return (
    <article>
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">{title}</h1>
        <p className="text-sm text-[var(--text-secondary)] mb-0">{date}</p>
      </header>
      <div className="article-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
      </div>
    </article>
  );
}
