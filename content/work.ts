import type { WorkExperience } from "@/types/content";

export const workExperience: WorkExperience[] = [
  {
    title: "Software Engineer Intern",
    company: "Versa Networks",
    companyUrl: "https://versa-networks.com",
    companyIcon: "/versa_networks_logo.jpeg",
    date: "May 2026 - Present",
    description: "Architected an end-to-end UEBA MLOps pipeline for Kubernetes-native training and zero-downtime delivery of 200+ models across 50+ global clusters. Productionized training with Argo Workflows and MLflow, and built a Go delivery service using Helm, CronJob reconciliation, and sidecars to verify and roll out model releases. Built Redis-backed tenant provisioning for customer onboarding and offboarding."
  },
  {
    title: "Machine Learning Engineer Intern",
    company: "Qorsa",
    companyUrl: "https://qorsa.com",
    companyIcon: "/qorsalogo.jpeg",
    date: "Jan 2026 - Apr 2026",
    description: "Architected a distributed Dgraph storage backend for a GraphRAG engine serving government intelligence contracts, implementing MVCC-aware writes, batch reads, and graph traversal for 100,000+ entities. Owned production deployment with GPU-optimized vLLM inference, automated CI/CD, and IAM-based authentication. Built document ingestion for 7+ formats with VLM-based extraction, reducing LLM hallucination by 68%."
  },
  {
    title: "AI Developer Intern",
    company: "CGI",
    companyUrl: "https://www.cgi.com",
    companyIcon: "/cgi_portfolio_icon.jpg",
    date: "May 2024 - Aug 2024",
    description: "Deployed production RAG chatbot on Azure Databricks processing Google Analytics 4 data through medallion architecture, enabling natural language queries over web traffic patterns for insurance client marketing team. Improved text-to-SQL agent accuracy by 23% through metadata enrichment and achieved 89% table cell F1-score on complex multi-table marketing analytics queries using LlamaIndex."
  }
];