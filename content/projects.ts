export type Project = {
  title: string;
  summary: string;
  tech: string[];
  github: string;
  demo?: string;
  year?: number;
};

export const projects: Project[] = [
  {
    title: "Job Aggregator + Co-op Assistant",
    summary: "Consolidates postings from multiple boards and answers student questions with RAG on GA4 metrics.",
    tech: ["Python", "FastAPI", "LangChain", "Cohere", "Next.js", "Azure"],
    github: "https://github.com/yourname/job-aggregator",
    year: 2025
  },
  {
    title: "VLR Esports Weekly",
    summary: "Scraper + summarizer that collects articles and matches from the last 7 days and writes a digest.",
    tech: ["Python", "Playwright", "Trafilatura", "OpenAI", "Next.js"],
    github: "https://github.com/yourname/vlr-weekly",
    year: 2025
  },
  {
    title: "Minimal Portfolio",
    summary: "This site. Server components, static content, zero client state.",
    tech: ["Next.js 15", "TypeScript", "Tailwind"],
    github: "https://github.com/yourname/portfolio",
    year: 2025
  }
];
