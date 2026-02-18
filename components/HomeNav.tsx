import Link from "next/link";

export default function HomeNav() {
  return (
    <nav className="fade-up flex justify-center gap-8 text-xl font-semibold mb-8">
      <Link
        href="/projects"
        className="underline underline-offset-4 decoration-2 decoration-[var(--border)] hover:decoration-[var(--accent)] transition-colors"
      >
        projects
      </Link>
      <Link
        href="/writing"
        className="underline underline-offset-4 decoration-2 decoration-[var(--border)] hover:decoration-[var(--accent)] transition-colors"
      >
        writing
      </Link>
    </nav>
  );
}
