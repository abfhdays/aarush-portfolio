
import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Fira_Code, Inter, Playfair_Display } from "next/font/google";

// Modern, readable fonts
const code = Fira_Code({ subsets: ["latin"], variable: "--font-code", weight: ["400", "500", "700"] });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
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
      <body className={`${sans.variable} ${display.variable} ${code.variable} bg-[var(--bg)] text-[var(--fg)] antialiased`}>
        <div className="min-h-screen md:grid md:grid-cols-[260px_1fr]">
          {/* Sidebar */}
          <aside className="bg-[var(--nav-bg)] text-[var(--nav-text)] border-b md:border-b-0 md:border-r-2 border-[var(--border)] md:sticky md:top-0 md:h-screen px-5 py-8 flex flex-col items-center">
            <Link href="/home" className="block font-display text-3xl tracking-tight mb-8 text-[var(--header)] hover:opacity-90 transition-opacity">
              portfolio
            </Link>

            {/* Profile images */}
            <div className="flex items-center gap-3 mb-8">
              <Link href="/home" className="contents">
                <Image
                  src="/portfolioheader1.jpeg"
                  alt="Aarush Ghosh"
                  width={52}
                  height={52}
                  className="rounded-xl object-cover ring-2 ring-[var(--border)] bg-[var(--accent-bg)] shadow"
                  priority
                />
              </Link>
              <Image
                src="/portfolioheader1.jpeg"
                alt="Portfolio image 2"
                width={52}
                height={52}
                className="rounded-xl object-cover ring-2 ring-[var(--border)] bg-[var(--accent-bg)] shadow"
              />
              <Image
                src="/portfolioheader1.jpeg"
                alt="Portfolio image 3"
                width={52}
                height={52}
                className="rounded-xl object-cover ring-2 ring-[var(--border)] bg-[var(--accent-bg)] shadow"
              />
            </div>

            {/* Social */}
            <div className="mb-8 text-xs text-[var(--accent)] flex items-center gap-4 tracking-wide font-mono">
              <a href="mailto:a66ghosh@uwaterloo.ca" className="hover:underline hover:text-[var(--accent-ink)] transition-colors">email</a>
              <a href="https://github.com/abfhdays" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-[var(--accent-ink)] transition-colors">github</a>
              <a href="https://www.linkedin.com/in/aarush-ghosh-/" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-[var(--accent-ink)] transition-colors">linkedin</a>
            </div>

            {/* Nav */}
            <nav className="flex md:flex-col flex-row gap-2 md:gap-2 items-center md:items-stretch w-full">
              <Link href="/home" className="nav-link font-semibold text-base md:text-lg">About</Link>
              <Link href="/projects" className="nav-link font-semibold text-base md:text-lg">Projects</Link>
      
            </nav>
          </aside>

          {/* Main */}
          <div className="flex-1 flex flex-col bg-white">
            <main className="mx-auto max-w-3xl px-6 py-12 w-full">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
