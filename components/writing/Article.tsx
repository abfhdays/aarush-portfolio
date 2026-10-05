import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import type { WritingArticle } from "@/types/content";
import { assetPath } from "@/lib/assets";

const markdownComponents: Components = {
  p({ node, children }) {
    if (node?.children.length === 1 && node.children[0].type === "element" && node.children[0].tagName === "img") {
      return <>{children}</>;
    }

    return <p>{children}</p>;
  },
  img({ src, alt, title }) {
    const imageSrc = typeof src === "string" && !/^(https?:|data:|\/\/)/.test(src)
      ? assetPath(src.startsWith("/") ? src : `/${src}`)
      : src;

    return (
      <figure>
        <a href={typeof imageSrc === "string" ? imageSrc : undefined} target="_blank" rel="noopener noreferrer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageSrc} alt={alt} loading="lazy" />
        </a>
        {title && <figcaption>{title}</figcaption>}
      </figure>
    );
  },
};

export default function Article({ title, date, excerpt, body }: WritingArticle) {
  return (
    <article>
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">{title}</h1>
        <p className="text-base leading-relaxed text-[var(--text-secondary)] mb-3">{excerpt}</p>
        <p className="text-sm text-[var(--text-secondary)] mb-0">{date}</p>
      </header>
      <div className="article-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{body}</ReactMarkdown>
      </div>
    </article>
  );
}
