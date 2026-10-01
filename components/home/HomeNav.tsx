import { assetPath } from "@/lib/assets";
import Image from "next/image";
import SiteLink from "@/components/layout/SiteLink";
import { homeNavigation } from "@/content/navigation";

export default function HomeNav() {
  return (
    <nav className="fade-up flex justify-center gap-8 text-xl font-semibold my-5 items-center">
      {homeNavigation.map((link) => (
        <SiteLink
          key={link.href}
          link={link}
          className="underline underline-offset-4 decoration-2 decoration-[var(--border)] hover:decoration-[var(--accent)] transition-colors"
        />
      ))}
      <Image
        src={assetPath("/baseball.jpg")}
        alt=""
        width={52}
        height={52}
        className="object-contain opacity-90"
      />
    </nav>
  );
}
