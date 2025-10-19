import { SkillCategory } from '@/types';

interface SkillsGridProps {
  categories: SkillCategory[];
}

export default function SkillsGrid({ categories }: SkillsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {categories.map((category) => (
        <div key={category.title}>
          <div className="text-xs font-semibold mb-2 text-black bg-[var(--accent-bg)] px-2 py-1 rounded inline-block">
            {category.title}
          </div>
          <ul className="flex flex-wrap gap-2">
            {category.skills.map((skill) => (
              <li key={skill} className="chip">
                {skill}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}