export interface Link {
  label: string;
  url: string;
}

export interface WorkItem {
  text: string;
  company?: string;
  url?: string;
}

export interface Bio {
  intro: string;
  work: WorkItem[];
  interests: string;
  personal: string;
}

export interface PersonalInfo {
  name: string;
  bio: Bio;
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
  tags?: string;
}