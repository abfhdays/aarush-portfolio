interface ProjectItemProps {
  title: string;
  date: string;
  description: string;
  link?: string;
}

export default function ProjectItem({ title, date, description, link }: ProjectItemProps) {
  return (
    <div className="group">
      <div className="flex items-baseline justify-between mb-1">
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
        <span className="text-sm text-[var(--text-secondary)] whitespace-nowrap ml-4">
          {date}
        </span>
      </div>
      <p className="text-[var(--text-secondary)] text-[0.95rem] leading-relaxed">
        {description}
      </p>
    </div>
  );
}