import { assetPath } from "@/lib/assets";
import Image from "next/image";
import SiteLink from "@/components/layout/SiteLink";
import SocialLinks from "@/components/layout/SocialLinks";
import { homeNavigation } from "@/content/navigation";

export default function HomeNav() {
  return (
    <nav aria-label="Main navigation" className="fade-up flex justify-center gap-2 sm:gap-6 text-sm sm:text-xl font-semibold mt-2 mb-3 items-center">
      <span aria-current="page" className="underline underline-offset-4 decoration-2 decoration-[var(--accent)]">
        about
      </span>
      {homeNavigation.map((link) => (
        <SiteLink
          key={link.href}
          link={link}
          className="underline underline-offset-4 decoration-2 decoration-[var(--border)] hover:decoration-[var(--accent)] transition-colors"
        />
      ))}
      <SocialLinks className="text-xs sm:text-sm" />
      <Image
        src={assetPath("/baseball.jpg")}
        alt=""
        width={40}
        height={40}
        className="object-contain opacity-90 shrink-0 mix-blend-multiply w-6 sm:w-10"
      />
    </nav>
  );
}
