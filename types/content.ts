export interface Link {
  label: string;
  url: string;
}

export interface PersonalInfo {
  name: string;
  bio: string;
  links: Link[];
}

export interface WorkExperience {
  title: string;
  company: string;
  date: string;
  description: string;
}

export interface Project {
  title: string;
  date: string;
  description: string;
  link?: string;
}