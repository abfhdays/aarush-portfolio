export interface Link {
  label: string;
  url: string;
}

export interface WorkItem {
  text: string;
  company?: string;
  url?: string;
  icon?: string;
}

export interface InterestItem {
  text: string;
  linkLabel?: string;
  linkUrl?: string;
}

export interface Interests {
  intro: string;
  items: InterestItem[];
  outro: string;
  outroLinkLabel?: string;
  outroLinkUrl?: string;
}

export interface Bio {
  intro: string;
  work: WorkItem[];
  interests: Interests;
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
  companyUrl?: string;
  companyIcon?: string;
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