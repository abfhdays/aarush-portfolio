import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import type { Components } from 'react-markdown';
import { highlightSyntax } from '@/lib/highlightSyntax';
import { assetPath } from '@/lib/assets';

interface ProjectMarkdownProps {
  children: string;
}

const markdownComponents: Components = {
  img({ src, alt, ...props }) {
    const imageSrc = typeof src === 'string' && !/^(https?:|data:|\/\/)/.test(src)
      ? assetPath(src.startsWith('/') ? src : `/${src}`)
      : src;

    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} src={imageSrc} alt={alt} />;
  },
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

export default function ProjectMarkdown({ children }: ProjectMarkdownProps) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={markdownComponents}>
      {children}
    </ReactMarkdown>
  );
}
