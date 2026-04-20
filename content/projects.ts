import { irouterDemo } from './irouter-demo';

export const projects = [
  {
    title: "reLive: A social platform for concert lovers to log shows and relive them from the crowd's point of view.",
    date: "Jan 2026 - Present",
    tags: "Go | Gin | PostgreSQL | Concurrency | Docker | AWS S3",
    previewImage: "/relive_portfolio_icon.png",
    description: "I led backend development in Go/Gin to evolve reLive from a hackathon win into a deployed app handling 1,000+ concurrent requests while sustaining sub-200ms latency. I designed a PostgreSQL-backed worker-pool concurrency model with goroutines/channels and moved large uploads to direct S3 presigned URLs to keep file transfer load off app servers. Separating HTTP handlers from service logic and keeping auth/logging/error handling as middleware were deliberate architecture choices for long-term scale. \n\n<img src=\"relive_portfolio_icon.png\" alt=\"reLive visualization\" width=\"60%\" />",
    link: "https://github.com/areeeeeeeb/reLive/"
  },

  {
    title: "iRouter: Intelligent SQL Query Router",
    date: "Nov 2025",
    tags: "Python | Query Engine Optimization | AST Parsing | Caching | CLI Development",
    previewImage: "/irouter_icon.png",
    description: `Inspired and built with [SQLGlot](https://github.com/tobymao/sqlglot). I wanted to grow a deeper, intuitive understanding of how query engines work end-to-end, from query to execution. iRouter uses SQLGlot's core modules to replicate the SQL engine process and attempts to optimize it further by intelligently parsing, partitioning, and executing, given the semantics and specific dialect of the query, as well as the scale of the DB executed against. iRouter achieves up to ~3x speedup from SQLGlot.

  ${irouterDemo}`,
    link: "https://github.com/abfhdays/intelligent-query-router"
  },

  {
    title: "NFL Big Data Bowl '25: Anticipating the Blitz",
    date: "2024-2025",
    tags: "Python | Deep Learning | PyTorch | Transformers  | MLOps",
    previewImage: "/safetyblitz.gif",
    description: "Inspired by [SumerSports/SportsTrackingTransformer](https://github.com/SumerSports/SportsTrackingTransformer), which uses a transformer encoder-decoder to embed player and ball tracking into a shared spatial representation, this project adapts that philosophy toward a specific defensive problem: can we detect a blitz before the snap? \n\n<img src=\"safetyblitz.gif\" alt=\"Safety Blitz Visualization\" width=\"60%\" />",
    link: "https://github.com/abfhdays/bdb25-blitz1"
  },
  {
    title: "WAT.ai: Network Traffic Anomaly Detection",
    date: "2023-2024",
    tags: "TensorFlow | JavaScript | Unsupervised Learning | Cybersecurity",
    previewImage: "/watai-thumbnail.png",
    description: "Interactive Demo built with WAT.ai to demonstrate how unsupervised learning detects cyber attacks on IoT devices. Showcased k-means clustering, DBSCAN, and negative selection across 7 attack types and against 105 IoT devices. \n\n[![WAT.ai Demo](watai-thumbnail.png)](https://wat-ai.github.io/cyber-security-interactive_web_demos/index.html)",
    link: "https://github.com/WAT-ai/cyber-security-interactive_web_demos"
  }
];