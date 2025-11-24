import { irouterDemo } from './irouter-demo';

export const projects = [

  {
    title: "iRouter: Intelligent SQL Query Router",
    date: "Nov 2025",
    tags: "Python | Query Engine Optimization | AST Parsing | Caching | CLI Development",
    description: `I built this to solve a real frustration: watching identical queries take wildly different times depending on which engine I used. I implemented cost-based routing that analyzes query complexity and data size to automatically pick the best backend—DuckDB for quick scans, Polars for medium data, Spark for huge datasets. The most satisfying part was adding partition pruning; seeing queries that once scanned gigabytes now skip 70-90% of files taught me how critical predicate pushdown is. I also added LRU caching because I kept rerunning the same analysis queries—now they return in under a millisecond.

  ${irouterDemo}`,
    link: "https://github.com/abfhdays/intelligent-query-router"
  },
  {
    title: "Distributed Task Scheduler",
    date: "Sep 2025",
    tags: "Go | Distributed Systems | Concurrency | etcd | gRPC",
    description: "I wanted to deeply understand distributed systems, so I built a DAG scheduler from scratch in Go. The biggest challenge was handling coordinator failures—I implemented Raft consensus through etcd so when a coordinator dies, another takes over in under a second without losing tasks. I learned that task ordering matters: using Kahn's algorithm for topological sorting ensured dependencies always execute in the right sequence. Switching from channels to gRPC with Protocol Buffers cut dispatch latency from 250ms to 12ms, which taught me how serialization overhead compounds at scale. I'm planning to add Prometheus metrics and Kubernetes autoscaling to make it production-ready.",
    link: "https://github.com/abfhdays/distributed-task-scheduler"
  },
  {
    title: "NFL Big Data Bowl: Blitz Prediction Model",
    date: "2024-2025",
    tags: "Python | Deep Learning | PyTorch | Transformers  | MLOps",
    description: "As a football fan, I wanted to predict blitzes before they happen by analyzing how defenders move pre-snap. I used Transformers with self-attention because blitzes aren't about individual players—it's the collective movement that matters. The model watches the 0.8 seconds before the snap, tracking subtle cues like linebackers creeping forward or cornerbacks rotating. I learned that defenses disguise blitzes incredibly well; my model hit 0.92 AUROC but still struggled with 'mug-and-bail' tactics where defenders fake aggression. Processing 10Hz tracking data across thousands of plays taught me how to handle massive datasets—I had to implement chunked streaming to avoid memory crashes.",
    link: "https://github.com/abfhdays/bdb25-blitz1"
  },
  {
    title: "Network Traffic Anomaly Detection",
    date: "2023-2024",
    tags: "TensorFlow | JavaScript | Unsupervised Learning | Data Visualization",
    description: "I built this interactive demo at WAT.ai to help people visualize how unsupervised learning detects cyber attacks on IoT devices. The cool part was making it run entirely in the browser with TensorFlow.js—no Python setup needed. I implemented K-means and DBSCAN to cluster network traffic patterns across 7 attack types, and watching them work in real-time made me understand why DBSCAN handles irregular cluster shapes better than K-means. The dataset had 105 IoT devices, and I learned that different devices exhibit completely different 'normal' behavior, which makes anomaly detection tricky. Building the visualization layer taught me a lot about making ML interpretable.",
    link: "https://github.com/WAT-ai/cyber-security-interactive_web_demos"
  }
];