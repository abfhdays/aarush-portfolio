import Image from "next/image";
import { personalInfo } from "@/content/info";

export default function ProfileBio() {
  return (
    <>
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

      <div className="flex justify-center gap-6 text-sm mb-8">
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

      <div className="text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto space-y-4">
        <p className="italic">{personalInfo.bio.intro}</p>

        <div className="text-left max-w-xl mx-auto">
          <p className="mb-2 font-medium">My experience spans across:</p>
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

        <div className="text-left max-w-xl mx-auto">
          <p>{personalInfo.bio.interests}</p>
          {personalInfo.bio.personal && (
            <p className="italic text-center">{personalInfo.bio.personal}</p>
          )}
        </div>
      </div>
    </>
  );
}
