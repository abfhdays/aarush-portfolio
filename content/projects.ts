import { irouterDemo } from './irouter-demo';

export const projects = [
  {
    title: "reLive: your concert memories, made intentional",
    date: "Jan 2026 - Present",
    tags: "Go | Concurrency | Backend | UX | Product Growth ",
    description: "A social platform for concert lovers to log shows and relive them from the crowd’s point of view. I built reLive's core infrastructure from the ground-up which involved making architecture-level and code-level design decision. Designed an elegant, go-idiomatic, worker-pool concurrency model backed by PostgreSQL as a job queue implemented with goroutines and channels to parallelize video processing and external API rate-limiting. Another major optimization directed was uploading video bytes directly to our S3 object storage via presigned URLs from the client side, minimizing server bottleneck. Seperating http handling from core service logic, having concurrency infra domain agnostic and wiring auth, error handling and logging as first-class middleware are intentional design patterns that position the app for long-term scale. These are feats I'm genuinely proud of. \n\n<img src=\"relive_portfolio_icon.png\" alt=\"DAG Visualization\" width=\"60%\" />",
    link: "https://github.com/abfhdays/distributed-task-scheduler"
  },

  {
    title: "iRouter: Intelligent SQL Query Router",
    date: "Nov 2025",
    tags: "Python | Query Engine Optimization | AST Parsing | Caching | CLI Development",
    description: `Inspired and built with [SQLGlot](https://github.com/tobymao/sqlglot). I wanted to grow a deeper, intuitive understanding of how query engines work end-to-end, from query to execution. iRouter uses SQLGlot's core modules to replicate the SQL engine process and attempts to optimize it further by intelligently parsing, partitioning, and executing, given the semantics and specific dialect of the query, as well as the scale of the DB executed against. iRouter achieves up to ~3x speedup from SQLGlot.

  ${irouterDemo}`,
    link: "https://github.com/abfhdays/intelligent-query-router"
  },
  
  {
    title: "NFL Big Data Bowl '25: Blitz Prediction Model",
    date: "2024-2025",
    tags: "Python | Deep Learning | PyTorch | Transformers  | MLOps",
    description: "Inspired by [SumerSports/SportsTrackingTransformer](https://github.com/SumerSports/SportsTrackingTransformer), which uses a transformer encoder-decoder to embed player and ball tracking into a shared spatial representation, this project adapts that philosophy toward a specific defensive problem: can we detect a blitz before the snap? \n\n<img src=\"safetyblitz.gif\" alt=\"Safety Blitz Visualization\" width=\"60%\" />",
    link: "https://github.com/abfhdays/bdb25-blitz1"
  },
  {
    title: "WAT.ai: Network Traffic Anomaly Detection",
    date: "2023-2024",
    tags: "TensorFlow | JavaScript | Unsupervised Learning | Data Visualization",
    description: "I built this interactive demo at WAT.ai to help people visualize how unsupervised learning detects cyber attacks on IoT devices. The cool part was making it run entirely in the browser with TensorFlow.js—no Python setup needed. I implemented K-means and DBSCAN to cluster network traffic patterns across 7 attack types, and watching them work in real-time made me understand why DBSCAN handles irregular cluster shapes better than K-means. The dataset had 105 IoT devices, and I learned that different devices exhibit completely different 'normal' behavior, which makes anomaly detection tricky. Building the visualization layer taught me a lot about making ML interpretable.\n\n[![WAT.ai Demo](watai-thumbnail.png)](https://wat-ai.github.io/cyber-security-interactive_web_demos/index.html)",
    link: "https://github.com/WAT-ai/cyber-security-interactive_web_demos"
  }
];