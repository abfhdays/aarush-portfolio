import "./globals.css";
import type { Metadata } from "next";
import { Fira_Code, Inter, Playfair_Display } from "next/font/google";
import Navigation from "@/components/layout/Navigation";

const code = Fira_Code({ 
  subsets: ["latin"], 
  variable: "--font-code", 
  weight: ["400", "500", "700"] 
});
const sans = Inter({ 
  subsets: ["latin"], 
  variable: "--font-sans" 
});
const display = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-display", 
  weight: ["700", "900"] 
});

export const metadata: Metadata = {
  title: "Aarush Ghosh",
  description: "Engineer, student, builder. Portfolio and projects.",
};

const NAV_CONFIG = {
  logo: "/swordfish.jpeg",
  navLinks: [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" }
  ],
  contactLinks: [
    { href: "mailto:a66ghosh@uwaterloo.ca", label: "Email" },
    { href: "https://github.com/abfhdays", label: "GitHub" },
    { href: "https://www.linkedin.com/in/aarush-ghosh-/", label: "LinkedIn" }
  ]
};

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${display.variable} ${code.variable} bg-[#f7faf8] text-[var(--fg)] antialiased`}>
        <Navigation {...NAV_CONFIG} />
        <main className="mx-auto max-w-4xl px-4 md:px-8 py-10 w-full">
          {children}
        </main>
      </body>
    </html>
  );
}