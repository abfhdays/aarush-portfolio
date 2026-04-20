import Link from "next/link";
import Image from "next/image";

export default function HomeNav() {
  return (
    <nav className="fade-up flex justify-center gap-8 text-xl font-semibold my-5 items-center">
      <Link
        href="/writing"
        className="underline underline-offset-4 decoration-2 decoration-[var(--border)] hover:decoration-[var(--accent)] transition-colors"
      >
        writing
      </Link>
      <a
        href="https://github.com/abfhdays"
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-4 decoration-2 decoration-[var(--border)] hover:decoration-[var(--accent)] transition-colors"
      >
        github
      </a>
      <a
        href="https://www.linkedin.com/in/aarush-ghosh-/"
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-4 decoration-2 decoration-[var(--border)] hover:decoration-[var(--accent)] transition-colors"
      >
        linkedin
      </a>
      <Image
        src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/baseball.jpg`}
        alt=""
        width={52}
        height={52}
        className="object-contain opacity-90"
      />
    </nav>
  );
}
