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
  title: "bdb25-blitz1",
  summary:
    "Pre-/post-snap blitz prediction from NFL Next Gen Stats tracking data. PyTorch Transformer Encoder produces frame-level probabilities that aggregate to play-level decisions.",
  tech: [
    "PyTorch (TransformerEncoder, AdamW, BCEWithLogitsLoss)",
    "Jupyter Notebooks",
    "pandas",
    "NumPy"
  ],
  github: "https://github.com/abfhdays/bdb25-blitz1",
  demo: "https://github.com/abfhdays/bdb25-blitz1/blob/main/blitz-report.ipynb",
  year: 2025
  },
  {
    title: "Morning Tea (AI Stock Newsletter)",
    summary:
      "Personalized/Curated Finance newsletter and delivery application that ingests ingests headlines/analyst ratings via yfinance, ranks & summarizes with openai promp engineering logic and schedules weekly delivery.",
    tech: ["FastAPI", "asyncio", "Supabase", "yfinance", "APScheduler", "PostgreSQL", "OpenAI", "LangChain", "Jinja2"],
    github: "https://github.com/abfhdays", 
    year: 2025
  },
  {
    title: "Personal Portfolio",
    summary:
      "My very own personal portfolio website",
    tech: ["Next.js 15", "TypeScript", "Tailwind", "Vercel"],
    github: "https://github.com/abfhdays/aarush-portfolio",
    demo: "https://aarush-portfolio.me",
    year: 2025
  },
  {
    title: "CxC: Infinite Investment Systems (Hackathon)",
    summary:
      "Built a PyTorch model for customer churn ; placed 3rd with 98.1% F1. Includes data processing, modeling notebooks and insights report (feature engineering)",
    tech: ["PyTorch", "Pandas", "scikit-learn", "Jupyter"],
    github: "https://github.com/abfhdays/CxC-Hackathon-3Y1B-IIS",
    demo: "https://colab.research.google.com/drive/1il5_gwRKlfpLh1_uxssUP4y7DxH-obAM?usp=sharing",
    year: 2024
  },
  {
    title: "Cybersecurity Interactive Demos (WAT.ai)",
    summary:
      "Browser demos of K-means/DBSCAN unsupervised learning algorithms for network activity clustering to detect hacker network activity; built with TensorFlow.js and Chart.js.",
    tech: ["TensorFlow.js", "Chart.js", "JavaScript", "HTML", "CSS"],
    github: "https://github.com/abfhdays/cyber-security-interactive_web_demos",
    demo: "https://wat-ai.github.io/cyber-security-interactive_web_demos/index.html",
    year: 2024
  }
];
