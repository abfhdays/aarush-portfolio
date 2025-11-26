'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import type { Components } from 'react-markdown';

interface ProjectItemProps {
  title: string;
  date: string;
  description: string;
  link?: string;
  tags?: string;
}

export default function ProjectItem({ title, date, description, link, tags }: ProjectItemProps) {
  const components: Components = {
    code({ children, className, ...props }) {
      const isInline = !className;

      if (isInline) {
        return <code {...props}>{children}</code>;
      }

      // Enhanced syntax highlighting
      const highlightSyntax = (text: string) => {
        const result: React.ReactNode[] = [];
        let currentIndex = 0;
        let key = 0;

        // Create a combined regex to match any of the patterns (excluding emojis for hydration safety)
        const combinedRegex = /"[^"]*"|\b(SELECT|FROM|WHERE|LIMIT|GROUP BY|COUNT|SUM)\b|\b\d+(\.\d+)?[xms]?\b|\b(DUCKDB|POLARS|duckdb|polars|spark)\b/g;

        // Use matchAll instead of exec to avoid stateful regex issues
        const matches = Array.from(text.matchAll(combinedRegex));

        for (const match of matches) {
          const matchText = match[0];
          const matchStart = match.index!;
          const matchEnd = matchStart + matchText.length;

          // Add text before this match
          if (matchStart > currentIndex) {
            result.push(<span key={key++}>{text.slice(currentIndex, matchStart)}</span>);
          }

          // Determine the class for this match based on what it is
          let className = '';
          if (matchText.startsWith('"') && matchText.endsWith('"')) {
            className = 'syntax-string';
          } else if (/^(SELECT|FROM|WHERE|LIMIT|GROUP BY|COUNT|SUM)$/.test(matchText)) {
            className = 'syntax-keyword';
          } else if (/^(DUCKDB|POLARS|duckdb|polars|spark)$/.test(matchText)) {
            className = 'syntax-backend';
          } else if (/^\d+(\.\d+)?[xms]?$/.test(matchText)) {
            className = 'syntax-number';
          }

          result.push(<span key={key++} className={className}>{matchText}</span>);
          currentIndex = matchEnd;
        }

        // Add remaining text
        if (currentIndex < text.length) {
          result.push(<span key={key++}>{text.slice(currentIndex)}</span>);
        }

        return result;
      };

      const codeString = String(children).replace(/\n$/, '');

      return (
        <code {...props} className={className}>
          {highlightSyntax(codeString)}
        </code>
      );
    },
  };

  return (
    <div className="group">
      <div className="flex items-baseline justify-between mb-1">
        <div className="flex-1">
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[var(--text)] hover:text-[var(--text)]"
            >
              {title}
            </a>
          ) : (
            <h3 className="font-medium text-[var(--text)]">{title}</h3>
          )}
          {tags && (
            <div className="text-xs text-[var(--text-secondary)] mt-0.5 opacity-70">
              {tags}
            </div>
          )}
        </div>
        <span className="text-sm text-[var(--text-secondary)] whitespace-nowrap ml-4">
          {date}
        </span>
      </div>
      <div className="text-[var(--text-secondary)] text-[0.95rem] leading-relaxed markdown-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={components}>{description}</ReactMarkdown>
      </div>
    </div>
  );
}