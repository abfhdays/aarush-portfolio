export interface Experience {
  role: string;
  time: string;
  bullets: string[];
}

export interface Project {
  title: string;
  summary: string;
  tech: string[];
  github: string;
  demo?: string;
  year?: number;
}

export interface AboutData {
  title: string;
  intro: string[];
  passions: string[];
  hobbies: string[];
  experiences: Experience[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
}
