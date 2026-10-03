import type { ReactNode } from "react";
import type { NavigationLink } from "@/types/content";
import Navigation from "@/components/layout/Navigation";
import Section from "@/components/layout/Section";

interface PageLayoutProps {
  children: ReactNode;
  navigation?: NavigationLink[];
  animated?: boolean;
}

export default function PageLayout({ children, navigation, animated }: PageLayoutProps) {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 min-h-screen">
      {animated ? (
        <div className="fade-up"><Navigation links={navigation} /></div>
      ) : (
        <Navigation links={navigation} />
      )}
      {animated ? (
        <div className="fade-up fade-up-2"><Section>{children}</Section></div>
      ) : (
        <Section>{children}</Section>
      )}
    </div>
  );
}
