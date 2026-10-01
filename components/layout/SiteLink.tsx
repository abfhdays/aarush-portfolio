import Link from "next/link";
import type { NavigationLink } from "@/types/content";

interface SiteLinkProps {
  link: NavigationLink;
  className: string;
}

export default function SiteLink({ link, className }: SiteLinkProps) {
  return link.external ? (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
      {link.label}
      <span aria-hidden="true"> ↗</span>
    </a>
  ) : (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  );
}
