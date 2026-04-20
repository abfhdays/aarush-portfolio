import Image from "next/image";
import { personalInfo } from "@/content/info";
import HomeNav from "@/components/HomeNav";
import PretextHero from "@/components/PretextHero";
import DragReflowBio from "@/components/DragReflowBio";

export default function ProfileBio() {
  return (
    <>
      <div className="fade-up fade-up-1 mb-2 flex flex-col items-center gap-3">
        <PretextHero />
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/aarush2.jpg`}
          alt="Aarush"
          width={180}
          height={180}
          className="rounded-full object-cover"
        />
      </div>

      <HomeNav />

      <div className="text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto space-y-4">
        <div className="fade-up fade-up-3">
          <DragReflowBio text={personalInfo.bio.intro} />
        </div>

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
                        <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${item.icon}`} alt={item.company} width={14} height={14} className="rounded-sm object-contain" />
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
          <div className="mb-2 flex items-center justify-center gap-3 font-medium text-[var(--text)]">
            <span>{personalInfo.bio.interests.intro}:</span>
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/piano.jpg`}
              alt=""
              width={88}
              height={24}
              className="object-contain opacity-80"
            />
          </div>
          <ul className="list-none space-y-1 text-sm mb-6">
            {personalInfo.bio.interests.items.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2">•</span>
                <span className="flex flex-col">
                  <span>{item.text}</span>
                  {item.linkLabel && item.linkUrl && (
                    <span className="ml-3 flex items-center gap-1">
                      <span className="opacity-50">◦</span>
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
            <p className="fade-up fade-up-6 italic text-center">
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
