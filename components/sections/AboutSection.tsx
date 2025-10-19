import Chip from '@/components/ui/Chip';

interface AboutSectionProps {
  description: string;
  highlights: Array<{ text: string }>;
  additionalInfo: string;
  images?: string[];
}

export default function AboutSection({ 
  description, 
  highlights, 
  additionalInfo,
  images = []
}: AboutSectionProps) {
  return (
    <div className="space-y-4">
      <p className="text-[var(--fg)]/85">{description}</p>

      <div className="text-[var(--fg)]/85 space-y-3">
        <p>
          I am interested in creating insightful, high performance, and creative solutions with Gen AI and Classical ML, from tackling professional challenges to weekend side quests. I also work closely across the data engineering stack and app-side stack to deliver end-to-end results (see{' '}
          <a href="#skills" className="underline text-[var(--accent)]">skills</a> for more specifics).
          In the past I have:
        </p>
        <ul className="pl-6 space-y-1">
          {highlights.map((item, idx) => (
            <li key={idx} className="text-xs text-[var(--fg)]">
              <Chip>{item.text}</Chip>
            </li>
          ))}
        </ul>
        <p>
          <span className="italic">
            check <a href="#experience" className="underline text-[var(--accent)]">experience</a> and{' '}
            <a href="#projects" className="underline text-[var(--accent)]">projects</a> for more
          </span>
        </p>
      </div>

      <p className="text-[var(--fg)]/85">{additionalInfo}</p>

      {images.length > 0 && (
        <div className="flex gap-4 mt-6">
          {images.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`About Me ${idx + 1}`}
              width={180}
              height={180}
              className="rounded-lg object-cover"
            />
          ))}
        </div>
      )}
    </div>
  );
}