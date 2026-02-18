import ProfileBio from "@/components/ProfileBio";
import { personalInfo } from "@/content/info";

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 min-h-screen flex items-center justify-center">
      <header className="w-full text-center">
        <ProfileBio />
        <div className="fade-up flex justify-center gap-6 text-sm mt-8">
          {personalInfo.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target={link.url.startsWith("http") ? "_blank" : undefined}
              rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
              className="underline underline-offset-2 decoration-[var(--border)] hover:decoration-[var(--text)] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </header>
    </div>
  );
}
