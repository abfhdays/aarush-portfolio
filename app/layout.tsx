import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Fira_Code, Playfair_Display } from "next/font/google";

// Fira Code for body, Playfair Display for headings
const code = Fira_Code({ subsets: ["latin"], variable: "--font-code", weight: ["400", "500", "700"] });
const display = Playfair_Display({ subsets: ["latin"], variable: "--font-display", weight: ["700", "900"] });

const SIDEBAR_BG = "#d7f5e6"; // darker, more filled-in green for nav
const SIDEBAR_TEXT = "#1a2e1a";
const ACCENT = "#2e8b57";
const ACCENT_BG = "#eafaf1";
const LINK_HOVER = "#1a5c37";

export const metadata: Metadata = {
  title: "Aarush Ghosh",
  description: "Engineer, student, builder. Portfolio and projects.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${code.variable} ${display.variable} bg-white text-[${SIDEBAR_TEXT}] antialiased`}
        style={{
          fontFamily: "var(--font-code), ui-monospace, monospace",
        }}
      >
        <div className="flex flex-col md:flex-row min-h-screen">
          {/* Sidebar */}
          <aside
            className="md:w-1/4 w-full min-w-[220px] flex flex-col items-center py-10 px-2"
            style={{
              background: SIDEBAR_BG,
              color: SIDEBAR_TEXT,
              borderRight: "2px solid #222", // solid black line
              boxShadow: "none",
            }}
          >
            {/* Profile images row */}
            <div className="flex flex-row items-center justify-center mb-7 space-x-3">
              <Link href="/">
                <Image
                  src="/portfolioheader1.jpeg"
                  alt="Aarush Ghosh"
                  width={48}
                  height={48}
                  className="object-cover border-2 border-[#b7e2c6] shadow-md"
                  priority
                  style={{ background: ACCENT_BG }}
                />
              </Link>
              <Image
                src="/portfolioheader1.jpeg"
                alt="Portfolio image 2"
                width={48}
                height={48}
                className="object-cover border-2 border-[#b7e2c6] shadow-md"
                style={{ aspectRatio: "1 / 1", background: ACCENT_BG }}
              />
              <Image
                src="/portfolioheader1.jpeg"
                alt="Portfolio image 3"
                width={48}
                height={48}
                className="object-cover border-2 border-[#b7e2c6] shadow-md"
                style={{ aspectRatio: "1 / 1", background: ACCENT_BG }}
              />
            </div>
            {/* Social links */}
            <div
              className="mb-10 text-xs flex flex-row items-center space-x-4 tracking-wide"
              style={{ color: ACCENT }}
            >
              <a href="mailto:a66ghosh@uwaterloo.ca" className="hover:underline hover:text-[#1a5c37] transition-colors">email</a>
              <a href="https://github.com/aarush" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-[#1a5c37] transition-colors">github</a>
              <a href="https://www.linkedin.com/in/aarush" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-[#1a5c37] transition-colors">linkedin</a>
            </div>
            {/* Navigation links: horizontal on small screens, vertical on md+ */}
            <nav className="flex md:flex-col flex-row gap-6 items-center w-full justify-center font-semibold">
              <Link
                className="hover:underline underline-offset-4 text-base transition-colors"
                href="/home"
                style={{
                  color: SIDEBAR_TEXT,
                  fontFamily: "var(--font-display), serif",
                  letterSpacing: "0.01em",
                }}
              >
                About
              </Link>
              <Link
                className="hover:underline underline-offset-4 text-base transition-colors"
                href="/projects"
                style={{
                  color: SIDEBAR_TEXT,
                  fontFamily: "var(--font-display), serif",
                  letterSpacing: "0.01em",
                }}
              >
                Projects
              </Link>
              <Link
                className="hover:underline underline-offset-4 text-base transition-colors"
                href="/cool"
                style={{
                  color: SIDEBAR_TEXT,
                  fontFamily: "var(--font-display), serif",
                  letterSpacing: "0.01em",
                }}
              >
                Photos
              </Link>
            </nav>
          </aside>

          {/* Main content */}
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
