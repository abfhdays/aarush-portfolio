import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import FlickeringGrid from "@/components/layout/FlickeringGrid";
import localFont from "next/font/local";

const manrope = localFont({
  src: "../public/fonts/Manrope-Variable.ttf",
  variable: "--font-manrope",
  weight: "200 800",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aarush Ghosh",
  description: "Software developer studying Statistics & Computational Math with a CS minor @ UWaterloo",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} antialiased`}>
        <FlickeringGrid />
        {children}
      </body>
    </html>
  );
}
