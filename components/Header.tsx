import Image from "next/image";
import { personalInfo } from "@/content/info";

export default function Header() {
  return (
    <header className="mb-8">
      <h1 className="mb-2 flex items-center gap-3 !text-4xl md:!text-5xl">
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
      {/* intro info now italic */}
      <div className="text-[var(--text-secondary)] leading-relaxed space-y-3">
        <p className="italic">{personalInfo.bio.intro}</p>

        <div className="text-left">
          <p className="mb-2 font-medium text-sm">My work spans across:</p>
          <ul className="list-none space-y-1 text-sm">
            {personalInfo.bio.work.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  {item.text}
                  {item.company && item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-[var(--border)] hover:decoration-[var(--accent)] transition-colors"
                    >
                      {item.company}
                    </a>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm">
            <span className="font-normal">In my own time,</span>
            <span className="italic">{personalInfo.bio.interests.replace("In my own time,", "")}</span>
          </p>
          {personalInfo.bio.personal && <p className="italic text-sm text-center">{personalInfo.bio.personal}</p>}
        </div>
      </div>
      <div className="flex items-center gap-8 mt-4">
        <div className="flex gap-8 text-sm">
          {personalInfo.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target={link.url.startsWith("http") ? "_blank" : undefined}
              rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
              className="hover:underline"
            >
              {link.label}
            </a>
          ))}
        </div>
        
      </div>
    </header>
  );
}