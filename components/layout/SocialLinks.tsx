import SiteLink from "@/components/layout/SiteLink";
import { socialNavigation } from "@/content/navigation";

interface SocialLinksProps {
  className?: string;
}

export default function SocialLinks({ className = "" }: SocialLinksProps) {
  return (
    <span role="group" aria-label="External profiles" className={`flex gap-2 sm:gap-6 font-normal text-[var(--text-secondary)] ${className}`}>
      {socialNavigation.map((link) => (
        <SiteLink key={link.href} link={link} className="text-[var(--text-secondary)] no-underline hover:underline underline-offset-4 whitespace-nowrap" />
      ))}
    </span>
  );
}
