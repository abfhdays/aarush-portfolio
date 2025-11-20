import { personalInfo } from "@/content/info";

export default function Header() {
  return (
    <header className="mb-12">
      <h1 className="mb-2">Hi, I'm {personalInfo.name.split(' ')[0]}.</h1>
      <p className="text-[var(--text-secondary)] leading-relaxed">
        {personalInfo.bio}
      </p>
      <div className="flex gap-4 mt-4 text-sm">
        {personalInfo.links.map((link) => (
          <a 
            key={link.label}
            href={link.url} 
            target={link.url.startsWith('http') ? '_blank' : undefined}
            rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {link.label}
          </a>
        ))}
      </div>
    </header>
  );
}