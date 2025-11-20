export const projects = [
  
  {
    title: "Intelligent SQL Query Router",
    date: "Nov 2025",
    description: "Built intelligent SQL query router that auto-selects optimal backend (DuckDB, Polars, Spark) by data size and query complexity achieving 50x performance gains. Implemented partition pruning with AST-based predicate extraction, reducing data scanned by 70-90% on date-filtered queries with LRU query cache achieving 90%+ hit rates.",
    link: "https://github.com/abfhdays/intelligent-query-router"
  },
  {
    title: "Distributed Task Scheduler",
    date: "Sep 2025",
    description: "Built distributed DAG scheduler in Go with Raft consensus via etcd for coordinator HA, achieving sub-second leader failover and exactly-once task execution, processing 8,500+ tasks/sec across 50 worker nodes. Designed gRPC-based task dispatch with Protocol Buffer serialization reducing dispatch latency by 95% (250ms → 12ms).",
    link: "https://github.com/abfhdays/distributed-task-scheduler"
  },
  {
    title: "NFL Big Data Bowl: Blitz Prediction Model",
    date: "2024-2025",
    description: "Built Transformer-based model using PyTorch to predict pre-snap and post-snap blitz probabilities from NFL Next Gen Stats tracking data. Implemented frame-level probability aggregation for play-level decisions, processing defensive formation patterns across thousands of plays.",
    link: "https://github.com/abfhdays/bdb25-blitz1"
  },
  {
    title: "WAT.ai: Cybersecurity Anomaly Detection on IoT Devices",
    date: "2023-2024",
    description: "Conducted unsupervised anomaly detection research at WAT.ai implementing K-means and DBSCAN clustering algorithms on multi-class dataset of 7 cyber-attack types across 105 IoT devices. Deployed interactive research platform using TensorFlow.js and Charts.js for real-time browser-based visualization of clustering performance.",
    link: "https://github.com/abfhdays/cyber-security-interactive_web_demos"
  }
];