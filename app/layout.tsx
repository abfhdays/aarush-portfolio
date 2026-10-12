import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import GridPattern from "@/components/layout/GridPattern";
import { assetPath } from "@/lib/assets";
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
  icons: {
    icon: { url: assetPath("/fish.jpg"), type: "image/jpeg" },
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} antialiased`}>
        <GridPattern />
        {children}
      </body>
    </html>
  );
}
