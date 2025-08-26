import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Source_Sans_3, Playfair_Display } from "next/font/google";

// Body & headings
const sans = Source_Sans_3({ subsets: ["latin"], variable: "--font-sans" });
const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["700", "900"],
});

export const metadata: Metadata = {
  title: "Aarush Ghosh",
  description: "Engineer, student, builder. Portfolio and projects.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${display.variable} font-sans bg-[var(--bg)] text-[var(--fg)] antialiased`}>
        <div className="min-h-screen md:grid md:grid-cols-[280px_1fr]">
          {/* Sidebar */}
          <aside className="bg-[var(--nav-bg)] text-[var(--nav-text)] border-b md:border-b-0 md:border-r border-[var(--border)] md:sticky md:top-0 md:h-screen px-6 py-8">
            <Link href="/home" className="block font-display text-2xl tracking-tight mb-6 hover:opacity-90">
              portfolio
            </Link>

            {/* Profile images */}
            <div className="flex items-center gap-3 mb-6">
              <Link href="/home" className="contents">
                <Image
                  src="/portfolioheader1.jpeg"
                  alt="Aarush Ghosh"
                  width={56}
                  height={56}
                  className="rounded-lg object-cover ring-1 ring-[var(--border)] bg-[var(--accent-bg)]"
                  priority
                />
              </Link>
              <Image
                src="/portfolioheader1.jpeg"
                alt="Portfolio image 2"
                width={56}
                height={56}
                className="rounded-lg object-cover ring-1 ring-[var(--border)] bg-[var(--accent-bg)]"
              />
              <Image
                src="/portfolioheader1.jpeg"
                alt="Portfolio image 3"
                width={56}
                height={56}
                className="rounded-lg object-cover ring-1 ring-[var(--border)] bg-[var(--accent-bg)]"
              />
            </div>

            {/* Social */}
            <div className="mb-6 text-xs text-[var(--accent)] flex items-center gap-4 tracking-wide">
              <a href="mailto:a66ghosh@uwaterloo.ca" className="hover:underline hover:text-[var(--accent-ink)]">email</a>
              <a href="https://github.com/aarush" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-[var(--accent-ink)]">github</a>
              <a href="https://www.linkedin.com/in/aarush" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-[var(--accent-ink)]">linkedin</a>
            </div>

            {/* Nav */}
            <nav className="flex md:flex-col flex-row gap-2 md:gap-2 items-center md:items-stretch">
              <Link href="/home" className="nav-link">About</Link>
              <Link href="/projects" className="nav-link">Projects</Link>
              <Link href="/cool" className="nav-link">Photos</Link>
            </nav>
          </aside>

          {/* Main */}
          <div className="flex-1 flex flex-col">
            <main className="mx-auto max-w-3xl px-6 py-12 w-full">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
