import "./globals.css";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "Aarush Ghosh",
  description: "Engineer, student, builder. Portfolio and projects.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} bg-white text-zinc-900 antialiased`}>
        <header className="border-b">
          <nav className="mx-auto max-w-3xl px-6 py-4 flex items-center gap-6">
            <Link href="/" className="font-serif text-xl tracking-tight">Aarush Ghosh</Link>
            <div className="ml-auto flex gap-5 text-sm">
              <Link className="hover:underline" href="/">About</Link>
              <Link className="hover:underline" href="/projects">Projects</Link>
              <Link className="hover:underline" href="/photos">Photos</Link>
            </div>
          </nav>
        </header>

        <main className="mx-auto max-w-3xl px-6 py-12">{children}</main>

        <footer className="border-t mt-16">
          <div className="mx-auto max-w-3xl px-6 py-8 text-sm text-zinc-600 flex justify-between">
            <p>© {new Date().getFullYear()} Aarush Ghosh</p>
            <p className="space-x-4">
              <a className="hover:underline" href="mailto:aarush@example.com">email</a>
              <a className="hover:underline" href="https://github.com/aarush" target="https://github.com/abfhdays">github</a>
              <a className="hover:underline" href="https://www.linkedin.com/in/aarush" target="https://www.linkedin.com/in/aarush-ghosh-/">linkedin</a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
