import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Fira_Code, Inter, Playfair_Display } from "next/font/google";

const code = Fira_Code({ subsets: ["latin"], variable: "--font-code", weight: ["400","500","700"] });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const display = Playfair_Display({ subsets: ["latin"], variable: "--font-display", weight: ["700","900"] });

export const metadata: Metadata = {
  title: "Aarush Ghosh",
  description: "Engineer, student, builder. Portfolio and projects.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${display.variable} ${code.variable} bg-[#f7faf8] text-[var(--fg)] antialiased`}>
        {/* Top Navigation Bar */}
        <nav className="w-full bg-[#e6f7ec] border-b border-[#b7e2c6] flex flex-col md:flex-row items-center justify-between px-8 py-4 shadow-sm">
          {/* Left: Images */}
          <div className="flex items-center gap-3">
            <Image
              src="/portfolioheader1.jpeg"
              alt="Portfolio image 1"
              width={44}
              height={44}
              className="rounded-lg object-cover ring-2 ring-[#b7e2c6] bg-[#eafaf1] shadow-sm"
              priority
            />
            <Image
              src="/portfolioheader2.jpeg"
              alt="Portfolio image 2"
              width={44}
              height={44}
              className="rounded-lg object-cover ring-2 ring-[#b7e2c6] bg-[#eafaf1] shadow-sm"
            />
            <Image
              src="/portfolioheader3.jpeg"
              alt="Portfolio image 3"
              width={44}
              height={44}
              className="rounded-lg object-cover ring-2 ring-[#b7e2c6] bg-[#eafaf1] shadow-sm"
            />
          </div>

          {/* Cool removed here */}
          <div className="hidden md:flex items-center gap-6 font-display text-[17px]">
            <a href="#about" className="nav-link">About</a>
            <a href="#experience" className="nav-link">Experience</a>
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#skills" className="nav-link">Skills</a>
          </div>

          <div className="flex items-center gap-4 text-xs text-[var(--accent)] font-mono">
            <a href="mailto:a66ghosh@uwaterloo.ca" className="hover:underline hover:text-[var(--accent-ink)] transition-colors">email</a>
            <a href="https://github.com/abfhdays" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-[var(--accent-ink)] transition-colors">github</a>
            <a href="https://www.linkedin.com/in/aarush-ghosh-/" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-[var(--accent-ink)] transition-colors">linkedin</a>
          </div>
        </nav>

        {/* Slightly tighter top/bottom so content shifts up */}
        <main className="mx-auto max-w-4xl px-4 md:px-8 py-10 w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
