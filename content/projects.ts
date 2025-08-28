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
    title: "VLR Newsletter",
    summary:
      "Python scraper + summarizer for VLR.gg; collects last-7-day match results and news, exposes a GraphQL API for downstream apps.",
    tech: ["Python", "FastAPI", "Strawberry", "httpx", "selectolax", "asyncio", "SQLAlchemy", "PostgreSQL", "OpenAI", "LangChain"],
    github: "https://github.com/abfhdays/vlr-newsletter",
    year: 2025
  },
  {
    title: "Morning Tea (AI Stock Newsletter)",
    summary:
      "Portfolio-aware newsletter: pulls user tickers from Supabase, ingests headlines/analyst ratings via yfinance, ranks & summarizes with OpenAI, persists to Postgres, and schedules weekly delivery.",
    tech: ["Python", "FastAPI", "asyncio", "Supabase", "yfinance", "APScheduler", "SendGrid", "PostgreSQL", "OpenAI", "LangChain", "Jinja2"],
    github: "https://github.com/abfhdays", // private/internal; pointing to profile
    year: 2025
  },
  {
    title: "Personal Portfolio",
    summary:
      "This site: Next.js app with server components, TypeScript, and Tailwind; deployed on Vercel.",
    tech: ["Next.js 15", "TypeScript", "Tailwind", "Vercel"],
    github: "https://github.com/abfhdays/aarush-portfolio",
    demo: "https://aarush-portfolio.me",
    year: 2025
  },
  {
    title: "CxC: Infinite Investment Systems (Hackathon)",
    summary:
      "Built a PyTorch model for customer churn; placed 3rd with 98.1% F1. Includes data processing and modeling notebooks.",
    tech: ["PyTorch", "Pandas", "NumPy", "scikit-learn", "Jupyter"],
    github: "https://github.com/abfhdays/CxC-Hackathon-3Y1B-IIS",
    demo: "https://colab.research.google.com/drive/1il5_gwRKlfpLh1_uxssUP4y7DxH-obAM?usp=sharing",
    year: 2024
  },
  {
    title: "Cybersecurity Interactive Demos (WAT.ai)",
    summary:
      "Browser demos of K-means/DBSCAN for network activity clustering; built with TensorFlow.js and Chart.js.",
    tech: ["TensorFlow.js", "Chart.js", "JavaScript", "HTML", "CSS"],
    github: "https://github.com/abfhdays/cyber-security-interactive_web_demos",
    demo: "https://wat-ai.github.io/cyber-security-interactive_web_demos/index.html",
    year: 2024
  }
];
