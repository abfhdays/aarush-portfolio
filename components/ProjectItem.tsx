'use client';

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import type { Components } from 'react-markdown';
import { highlightSyntax } from '@/lib/highlightSyntax';
import EditorialFlow from '@/components/EditorialFlow';

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

function getFirstParagraphPlain(description: string): string {
  const first = description.trim().split('\n\n')[0];
  return first
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`#]/g, '')
    .replace(/<[^>]+>/g, '');
}

function getRestOfDescription(description: string): string {
  const paragraphs = description.trim().split('\n\n');
  if (paragraphs.length <= 1) return '';
  return paragraphs.slice(1).join('\n\n');
}

export default function ProjectItem({ title, date, description, link, tags, previewImage }: ProjectItemProps) {
  const [expanded, setExpanded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const teaser = getTeaser(description);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const firstParagraph = getFirstParagraphPlain(description);
  const restDescription = getRestOfDescription(description);
  const useEditorial = expanded && isDesktop && previewImage;

  return (
    <div className="relative pb-8 mb-8 border-b border-[var(--border)] last:border-b-0 last:mb-0 last:pb-0 overflow-hidden">

      {previewImage && !useEditorial && (
        <div
          className={`absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none select-none transition-opacity duration-300 ${expanded ? 'opacity-0' : 'opacity-100'}`}
          aria-hidden="true"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${previewImage}`}
            alt=""
            className="project-preview-img absolute right-6 top-1/2 -translate-y-1/2 h-4/5 w-auto object-contain"
          />
        </div>
      )}

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

      {expanded ? (
        <div className="mt-2">
          {useEditorial ? (
            <>
              <EditorialFlow
                text={firstParagraph}
                imageUrl={previewImage}
                imageWidth={140}
                imageHeight={120}
              />
              {restDescription && (
                <div className="text-[var(--text-secondary)] text-[0.95rem] leading-relaxed markdown-content mt-3">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={markdownComponents}>
                    {restDescription}
                  </ReactMarkdown>
                </div>
              )}
            </>
          ) : (
            <div className="text-[var(--text-secondary)] text-[0.95rem] leading-relaxed markdown-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={markdownComponents}>
                {description}
              </ReactMarkdown>
            </div>
          )}
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
