import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Source_Sans_3, Newsreader } from "next/font/google";

const sans = Source_Sans_3({ subsets: ["latin"], variable: "--font-sans" });
const display = Newsreader({ subsets: ["latin"], variable: "--font-display" });

const SIDEBAR_TEXT_COLOR = "#5a3c1a"; // darker earthy brown

export const metadata: Metadata = {
  title: "Aarush Ghosh",
  description: "Engineer, student, builder. Portfolio and projects.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${display.variable} bg-[var(--bg)] text-[var(--fg)] antialiased`}>
        <div className="flex min-h-screen">
          {/* Sidebar navigation */}
          <aside
            className="w-1/4 min-w-[220px] border-r border-[var(--border)]/70 bg-white/70 backdrop-blur flex flex-col items-center py-10"
            style={{ color: SIDEBAR_TEXT_COLOR }}
          >
            {/* Profile images row */}
            <div className="flex flex-row items-center justify-center mb-6 space-x-3">
              <Link href="/">
                <Image
                  src="/portfolioheader1.jpeg"
                  alt="Aarush Ghosh"
                  width={48}
                  height={48}
                  className="object-cover"
                  priority
                />
              </Link>
              <Image
                src="/portfolioheader1.jpeg"
                alt="Portfolio image 2"
                width={48}
                height={48}
                className="object-cover"
                style={{ aspectRatio: "1 / 1" }}
              />
              <Image
                src="/portfolioheader1.jpeg"
                alt="Portfolio image 3"
                width={48}
                height={48}
                className="object-cover"
                style={{ aspectRatio: "1 / 1" }}
              />
            </div>
            {/* Social links in a row, smaller font */}
            <div className="mb-10 text-xs text-[var(--muted)] flex flex-row items-center space-x-4" style={{ color: SIDEBAR_TEXT_COLOR }}>
              <a href="mailto:aarush@example.com" className="hover:underline">email</a>
              <a href="https://github.com/aarush" target="_blank" rel="noopener noreferrer" className="hover:underline">github</a>
              <a href="https://www.linkedin.com/in/aarush" target="_blank" rel="noopener noreferrer" className="hover:underline">linkedin</a>
            </div>
            {/* Navigation links */}
            <nav className="flex flex-col gap-6 items-center w-full">
              <Link
                className="hover:underline underline-offset-4 text-base"
                href="/home"
                style={{ color: SIDEBAR_TEXT_COLOR }}
              >
                About
              </Link>
              <Link
                className="hover:underline underline-offset-4 text-base"
                href="/projects"
                style={{ color: SIDEBAR_TEXT_COLOR }}
              >
                Projects
              </Link>
              <Link
                className="hover:underline underline-offset-4 text-base"
                href="/cool"
                style={{ color: SIDEBAR_TEXT_COLOR }}
              >
                Photos
              </Link>
            </nav>
          </aside>

          {/* Main content */}
          <div className="flex-1 flex flex-col">
            <main className="mx-auto max-w-3xl px-6 py-12 w-full">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
