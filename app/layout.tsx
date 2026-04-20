import "./globals.css";
import type { Metadata } from "next";
import SeaOfWords from "@/components/SeaOfWords";

export const metadata: Metadata = {
  title: "Aarush Ghosh",
  description: "Statistics & CS @ UWaterloo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <SeaOfWords />
        <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
      </body>
    </html>
  );
}