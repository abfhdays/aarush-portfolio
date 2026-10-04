export interface ProfileLink {
  label: string;
  url: string;
}

export interface BioWorkItem {
  text: string;
  company?: string;
  url?: string;
  icon?: string;
}

export interface InterestItem {
  text: string;
  textBeforeLink?: string;
  inlineLink?: ProfileLink;
  icon?: string;
  linkLabel?: string;
  linkUrl?: string;
}

export interface Interests {
  intro: string;
  items: InterestItem[];
  outro?: string;
  outroLinkLabel?: string;
  outroLinkUrl?: string;
}

export interface Bio {
  intro: {
    textBeforeEmphasis: string;
    emphasis: string;
    text: string;
  };
  work: BioWorkItem[];
  interests: Interests;
  personal: string;
}

export interface PersonalInfo {
  name: string;
  bio: Bio;
  links: ProfileLink[];
}

export interface WorkExperience {
  title: string;
  company: string;
  companyUrl?: string;
  companyIcon?: string;
  date: string;
  description: string;
}

export interface WritingPost {
  title: string;
  date: string;
  excerpt: string;
  link?: string;
  status?: 'published' | 'coming-soon';
}

export interface WritingArticle extends WritingPost {
  body: string;
}

export interface Project {
  title: string;
  date: string;
  description: string;
  link?: string;
  tags?: string;
  previewImage?: string;
}

export interface NavigationLink {
  label: string;
  href: string;
  external?: boolean;
}
