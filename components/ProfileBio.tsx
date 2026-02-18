import Image from "next/image";
import { personalInfo } from "@/content/info";
import HomeNav from "@/components/HomeNav";

export default function ProfileBio() {
  return (
    <>
      <h1 className="fade-up fade-up-1 m-0 mb-2 flex items-center justify-center gap-3 !text-5xl md:!text-6xl">
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

      <HomeNav />

      <div className="text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto space-y-4">
        <p className="fade-up fade-up-3 italic">{personalInfo.bio.intro}</p>

        <div className="fade-up fade-up-4 text-left max-w-xl mx-auto">
          <p className="mb-2 text-center font-medium text-[var(--text)] ">
            My work experience spans across:
          </p>
          <ul className="list-none space-y-1 text-sm mb-6">
            {personalInfo.bio.work.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  {item.company && item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[var(--text)] underline decoration-[var(--border)] hover:decoration-[var(--accent)] transition-colors inline-flex items-center gap-1 mr-1"
                    >
                      {item.company}
                      {item.icon && (
                        <Image src={item.icon} alt={item.company} width={14} height={14} className="rounded-sm object-contain" />
                      )}
                    </a>
                  )}
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="fade-up fade-up-5 text-left max-w-xl mx-auto">
          <p className="mb-2 text-center font-medium text-[var(--text)] ">
            {personalInfo.bio.interests.intro}:
          </p>
          <ul className="list-none space-y-1 text-sm mb-6">
            {personalInfo.bio.interests.items.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  {item.text}
                  {item.linkLabel && item.linkUrl && (
                    <>{" "}(<a
                        href={item.linkUrl}
                        target={item.linkUrl.startsWith("http") ? "_blank" : undefined}
                        rel={item.linkUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="underline decoration-[var(--border)] hover:decoration-[var(--accent)] transition-colors"
                      >
                        {item.linkLabel}
                      </a>)</>
                  )}
                </span>
              </li>
            ))}
          </ul>
          <p className="fade-up fade-up-6 italic text-center">
            {personalInfo.bio.interests.outro}
            {personalInfo.bio.interests.outroLinkLabel && personalInfo.bio.interests.outroLinkUrl && (
              <>{" "}(<a
                  href={personalInfo.bio.interests.outroLinkUrl}
                  target={personalInfo.bio.interests.outroLinkUrl.startsWith("http") ? "_blank" : undefined}
                  rel={personalInfo.bio.interests.outroLinkUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="underline decoration-[var(--border)] hover:decoration-[var(--accent)] transition-colors"
                >
                  {personalInfo.bio.interests.outroLinkLabel}
                </a>)</>
            )}
          </p>
        </div>
      </div>
    </>
  );
}
