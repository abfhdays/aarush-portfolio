import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="mb-8 flex gap-6 text-sm">
      <Link href="/" className="hover:underline">
        home
      </Link>
      <Link href="/projects" className="hover:underline">
        projects
      </Link>
      <Link href="/writing" className="hover:underline">
        writing
      </Link>
    </nav>
  );
}
