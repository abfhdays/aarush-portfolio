'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import type { Components } from 'react-markdown';
import { highlightSyntax } from '@/lib/highlightSyntax';

interface ProjectItemProps {
  title: string;
  date: string;
  description: string;
  link?: string;
  tags?: string;
}

const markdownComponents: Components = {
  code({ children, className, ...props }) {
    if (!className) return <code {...props}>{children}</code>;

    const codeString = String(children).replace(/\n$/, '');
    return (
      <code {...props} className={className}>
        {highlightSyntax(codeString)}
      </code>
    );
  },
};

export default function ProjectItem({ title, date, description, link, tags }: ProjectItemProps) {
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
            <div className="text-xs text-[var(--text-secondary)] mt-0.5 opacity-70">{tags}</div>
          )}
        </div>
        <span className="text-sm text-[var(--text-secondary)] whitespace-nowrap ml-4">{date}</span>
      </div>
      <div className="text-[var(--text-secondary)] text-[0.95rem] leading-relaxed markdown-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={markdownComponents}>
          {description}
        </ReactMarkdown>
      </div>
    </div>
  );
}
