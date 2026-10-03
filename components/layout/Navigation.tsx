import SiteLink from "@/components/layout/SiteLink";
import SocialLinks from "@/components/layout/SocialLinks";
import { pageNavigation } from "@/content/navigation";
import type { NavigationLink } from "@/types/content";

interface NavigationProps {
  links?: NavigationLink[];
}

export default function Navigation({ links = pageNavigation }: NavigationProps) {
  return (
    <nav aria-label="Main navigation" className="mb-8 flex flex-wrap items-baseline gap-3 sm:gap-6 text-sm">
      {links.map((link) => (
        <SiteLink key={link.href} link={link} className="hover:underline" />
      ))}
      <SocialLinks />
    </nav>
  );
}
