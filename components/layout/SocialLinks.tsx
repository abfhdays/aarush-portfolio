import SiteLink from "@/components/layout/SiteLink";
import { socialNavigation } from "@/content/navigation";

interface SocialLinksProps {
  className?: string;
}

export default function SocialLinks({ className = "mt-8 pt-5" }: SocialLinksProps) {
  return (
    <footer className={`border-t border-[var(--border)] ${className}`}>
      <nav aria-label="External profiles" className="flex justify-center gap-6 text-sm text-[var(--text-secondary)]">
        {socialNavigation.map((link) => (
          <SiteLink key={link.href} link={link} className="text-[var(--text-secondary)] underline underline-offset-4 hover:decoration-[var(--accent)]" />
        ))}
      </nav>
    </footer>
  );
}
