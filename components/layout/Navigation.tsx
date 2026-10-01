import SiteLink from "@/components/layout/SiteLink";
import { pageNavigation } from "@/content/navigation";
import type { NavigationLink } from "@/types/content";

interface NavigationProps {
  links?: NavigationLink[];
}

export default function Navigation({ links = pageNavigation }: NavigationProps) {
  return (
    <nav className="mb-8 flex gap-6 text-sm">
      {links.map((link) => (
        <SiteLink key={link.href} link={link} className="hover:underline" />
      ))}
    </nav>
  );
}
