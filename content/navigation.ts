import type { NavigationLink } from "@/types/content";

export const socialLinks = {
  github: "https://github.com/abfhdays",
  linkedin: "https://www.linkedin.com/in/aarush-ghosh-/",
};

export const socialNavigation: NavigationLink[] = [
  { label: "github", href: socialLinks.github, external: true },
  { label: "linkedin", href: socialLinks.linkedin, external: true },
];

export const homeNavigation: NavigationLink[] = [
  { label: "writing", href: "/writing" },
  ...socialNavigation,
];

export const pageNavigation: NavigationLink[] = [
  { label: "home", href: "/" },
  { label: "projects", href: "/projects" },
  { label: "writing", href: "/writing" },
];

export const writingNavigation: NavigationLink[] = [
  { label: "home", href: "/" },
  ...socialNavigation,
];
