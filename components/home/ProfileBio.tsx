import { assetPath } from "@/lib/assets";
import Image from "next/image";
import { personalInfo } from "@/content/info";
import HomeNav from "@/components/home/HomeNav";

export default function ProfileBio() {
  return (
    <>
      <h1 className="fade-up fade-up-1 m-0 mb-2 flex items-center justify-center gap-3 !text-[2rem] sm:!text-[3.25rem]">
        <span className="whitespace-nowrap">Hi, I&apos;m</span>
        <span className="inline-block align-middle shrink-0">
          <Image
            src={assetPath("/aarush2.jpg")}
            alt="Aarush"
            width={280}
            height={280}
            className="rounded-full object-contain inline-block h-auto w-[min(46vw,216px)] mix-blend-multiply"
          />
        </span>
      </h1>

      <HomeNav />

      <div className="text-[var(--text-secondary)] leading-normal mx-auto flex flex-col gap-3.5">
        <p className="fade-up fade-up-3 text-[0.95rem] italic mb-0">
          {personalInfo.bio.intro.textBeforeEmphasis}
          <strong className="font-semibold">{personalInfo.bio.intro.emphasis}</strong>
          {personalInfo.bio.intro.text}
        </p>

        <div className="fade-up fade-up-4 text-left w-full">
          <p className="mb-2 text-center font-medium text-[var(--text)]">
            My work so far:
          </p>
          <ul className="list-none space-y-1.5 text-sm leading-[1.45] m-0">
            {personalInfo.bio.work.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2 shrink-0">•</span>
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
                        <Image src={assetPath(item.icon)} alt={item.company} width={14} height={14} className="rounded-sm object-contain shrink-0 mix-blend-multiply" />
                      )}
                    </a>
                  )}
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="fade-up fade-up-5 text-left w-full">
          <div className="mb-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center font-medium text-[var(--text)]">
            <span>{personalInfo.bio.interests.intro}:</span>
            <Image
              src={assetPath("/piano.jpg")}
              alt=""
              width={64}
              height={24}
              className="object-contain opacity-80 shrink-0 mix-blend-multiply"
            />
          </div>
          <ul className="list-none space-y-1.5 text-sm leading-[1.45] m-0">
            {personalInfo.bio.interests.items.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2 shrink-0">•</span>
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span>
                    {item.textBeforeLink}
                    {item.inlineLink && (
                      <a
                        href={item.inlineLink.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[var(--text)] underline decoration-[var(--border)] hover:decoration-[var(--accent)] transition-colors inline-flex items-center gap-1"
                      >
                        {item.inlineLink.label}
                        {item.icon && (
                          <Image src={assetPath(item.icon)} alt="" width={14} height={14} className="rounded-sm object-contain shrink-0 mix-blend-multiply" />
                        )}
                      </a>
                    )}
                    {item.text}
                  </span>
                  {item.linkLabel && item.linkUrl && (
                    <span className="ml-3 flex items-start gap-1">
                      <span className="opacity-50 shrink-0">◦</span>
                      <a
                        href={item.linkUrl}
                        target={item.linkUrl.startsWith("http") ? "_blank" : undefined}
                        rel={item.linkUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="underline decoration-[var(--border)] hover:decoration-[var(--accent)] transition-colors"
                      >
                        {item.linkLabel}
                      </a>
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
          {personalInfo.bio.interests.outroLinkLabel && personalInfo.bio.interests.outroLinkUrl && (
            <p className="fade-up fade-up-6 italic text-center mt-4 mb-0">
              (<a
                href={personalInfo.bio.interests.outroLinkUrl}
                target={personalInfo.bio.interests.outroLinkUrl.startsWith("http") ? "_blank" : undefined}
                rel={personalInfo.bio.interests.outroLinkUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                className="underline decoration-[var(--border)] hover:decoration-[var(--accent)] transition-colors"
              >
                {personalInfo.bio.interests.outroLinkLabel}
              </a>)
            </p>
          )}
        </div>
      </div>
    </>
  );
}
