import Image from "next/image";
import Link from "next/link";
import { personalInfo } from "@/content/info";

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto px-6 min-h-screen flex items-center justify-center">
      <header className="w-full -mt-12 text-center">
        {/* Name */}
        <h1 className="m-0 mb-2 flex items-center justify-center gap-3 !text-5xl md:!text-6xl">
          Hi, I&apos;m{" "}
          <span className="inline-block align-middle">
            <Image
              src="/aarush2.jpg"
              alt="Aarush"
              width={280}
              height={280}
              className="rounded-full object-cover inline-block"
            />
          </span>
        </h1>

        {/* Social links */}
        <div className="flex justify-center gap-6 text-sm mb-6">
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

        {/* Bio */}
        <p className="text-[var(--text-secondary)] leading-relaxed italic mb-12 max-w-xl mx-auto">
          {personalInfo.bio}
        </p>

        {/* Main navigation - centered and prominent */}
        <nav className="flex justify-center gap-8 text-xl font-semibold">
          <Link
            href="/projects"
            className="underline underline-offset-4 decoration-2 decoration-[var(--border)] hover:decoration-[var(--accent)] transition-colors"
          >
            projects
          </Link>
          <Link
            href="/work"
            className="underline underline-offset-4 decoration-2 decoration-[var(--border)] hover:decoration-[var(--accent)] transition-colors"
          >
            work
          </Link>
          <Link
            href="/learning"
            className="underline underline-offset-4 decoration-2 decoration-[var(--border)] hover:decoration-[var(--accent)] transition-colors"
          >
            learning
          </Link>
        </nav>
      </header>
    </div>
  );
}