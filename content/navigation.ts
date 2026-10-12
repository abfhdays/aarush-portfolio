import type { NavigationLink } from "@/types/content";

export const socialLinks = {
  github: "https://github.com/abfhdays",
  linkedin: "https://www.linkedin.com/in/aarush-ghosh-/",
  resume: "https://drive.google.com/file/d/1_BuOWW0vcozEt7Qk4KfmsI7cemYIY9pC/view?usp=sharing",
};

export const socialNavigation: NavigationLink[] = [
  { label: "github", href: socialLinks.github, external: true },
  { label: "linkedin", href: socialLinks.linkedin, external: true },
  { label: "resume", href: socialLinks.resume, external: true },
];

export const homeNavigation: NavigationLink[] = [
  { label: "writing", href: "/writing" },
];

export const pageNavigation: NavigationLink[] = [
  { label: "home", href: "/" },
  { label: "projects", href: "/projects" },
  { label: "writing", href: "/writing" },
];

export const writingNavigation: NavigationLink[] = [
  { label: "home", href: "/" },
];

export const articleNavigation: NavigationLink[] = [
  { label: "home", href: "/" },
  { label: "writing", href: "/writing" },
];
