'use client';

import { assetPath } from '@/lib/assets';
import { useState } from 'react';
import type { Project } from '@/types/content';
import ProjectMarkdown from '@/components/projects/ProjectMarkdown';
import { getTeaser } from '@/lib/markdown';

export default function ProjectItem({ title, date, description, link, tags, previewImage }: Project) {
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
            src={assetPath(previewImage)}
            alt=""
            className="project-preview-img absolute right-6 top-1/2 -translate-y-1/2 h-4/5 w-auto object-contain"
          />
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between mb-2">
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
        <span className="text-sm text-[var(--text-secondary)] whitespace-nowrap sm:ml-4">{date}</span>
      </div>

      {/* Content */}
      {expanded ? (
        <div className="text-[var(--text-secondary)] text-[0.95rem] leading-relaxed markdown-content mt-2">
          <ProjectMarkdown>
            {description}
          </ProjectMarkdown>
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
