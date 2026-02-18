'use client';

import { useState } from 'react';
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
  previewImage?: string;
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

function getTeaser(description: string): string {
  const first = description.trim().split('\n\n')[0];
  return first
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`#]/g, '');
}

export default function ProjectItem({ title, date, description, link, tags, previewImage }: ProjectItemProps) {
  const [expanded, setExpanded] = useState(false);
  const teaser = getTeaser(description);

  return (
    <div className="relative pb-8 mb-8 border-b border-[var(--border)] last:border-b-0 last:mb-0 last:pb-0 overflow-hidden">

      {/* Faded background image */}
      {previewImage && (
        <div
          className={`absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none select-none transition-opacity duration-300 ${expanded ? 'opacity-0' : 'opacity-100'}`}
          aria-hidden="true"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewImage}
            alt=""
            className="project-preview-img absolute right-6 top-1/2 -translate-y-1/2 h-4/5 w-auto object-contain"
          />
        </div>
      )}

      {/* Header */}
      <div className="flex items-baseline justify-between mb-1">
        <div className="flex-1">
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[var(--text)] underline decoration-[var(--border)] hover:decoration-[var(--accent)] transition-colors"
            >
              {title} ↗
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

      {/* Content */}
      {expanded ? (
        <div className="text-[var(--text-secondary)] text-[0.95rem] leading-relaxed markdown-content mt-2">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={markdownComponents}>
            {description}
          </ReactMarkdown>
        </div>
      ) : (
        <p className="text-[var(--text-secondary)] text-[0.95rem] leading-relaxed mt-2 line-clamp-2">
          {teaser}
        </p>
      )}

      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="mt-2 text-xs text-[var(--text-secondary)] underline underline-offset-2 decoration-[var(--border)] hover:decoration-[var(--text)] transition-colors cursor-pointer"
      >
        {expanded ? 'collapse ↑' : 'read more ↓'}
      </button>
    </div>
  );
}
