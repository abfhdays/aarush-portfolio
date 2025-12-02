import "./globals.css";
import type { Metadata } from "next";
import CustomCursor from "@/components/CustomCursor";

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
    <html lang="en">
      <body className="antialiased">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}