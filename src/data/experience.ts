import type { Experience } from "./types";

export const experience: Experience[] = [
  {
    id: "ge-aerospace",
    company: "GE Aerospace",
    role: "Software Engineering Intern",
    team: "AI / FinFlow Team",
    location: "Bengaluru, India",
    dates: "Jun 2026 – Aug 2026",
    summary:
      "Shipped production LLM extraction pipelines and high-performance data systems on AWS Bedrock, ECS Fargate, and Amazon Neptune across GE Aerospace's financial platform.",
    stats: [
      { value: "74%", label: "LLM latency cut" },
      { value: "726K", label: "logs in 15s" },
    ],
    bullets: [
      "Engineered a streaming + rate-limiting architecture for an AWS Bedrock + Claude document extraction pipeline — cut per-document latency 74% (1,957s → 505s), 3.5× throughput, 350%+ measured speedups.",
      "Solved Claude's hard 100-page request limit for 448-page / $101M contracts with a lossless page-split-and-merge algorithm + content-hash caching, cutting API calls 55%.",
      "Root-caused and recovered 86 failing production purchase orders (100% pass rate) via a unified multi-format loader and shared ERP caches (RAM 14.2GB → 3.8GB).",
      "Implemented explicit Bedrock prompt caching, saving ~$12,500 in tokens per batch run (68% input-cost cut).",
      "Solely built a Polars + DuckDB adoption analytics pipeline — 726,433 logs × 100,169 employees in 15s (88% faster than Pandas); fixed a 975% join bug; results presented to the C-suite.",
      "Hardened an NL-to-Cypher graph assistant over Amazon Neptune: 93 → 0 mypy --strict errors, killed an exec() RCE, cut query latency 62%.",
    ],
    tech: [
      "AWS Bedrock",
      "Claude",
      "ECS Fargate",
      "Amazon Neptune",
      "FastAPI",
      "Polars",
      "DuckDB",
      "Python 3.12",
    ],
  },
  {
    id: "siage",
    company: "Siage Solutions",
    role: "Software Engineering Intern",
    team: "Applied AI & Platform Team",
    location: "Bangalore, India",
    dates: "Jun 2025 – Aug 2025",
    summary:
      "Built enterprise RAG, GPU LLM serving, and distributed data infrastructure for a 10+ client, $1.5M ARR platform.",
    stats: [
      { value: "91%", label: "RAG latency drop" },
      { value: "4.8×", label: "GPU throughput" },
    ],
    bullets: [
      "Architected an enterprise RAG system (LangChain, Qdrant, text-embedding-3) over 15M+ tokens — search latency 4.2s → 350ms (91%), precision@5 62% → 96%, saving 120+ eng hrs/month.",
      "Deployed a vLLM sentiment inference microservice on AWS EKS (A10G GPU): 4.8× token throughput, 54% less VRAM, streaming to 2,500+ DAUs.",
      "Built a distributed async scraping cluster (AsyncIO, Playwright, Celery, Redis) across 15 proxy nodes — 50K+ daily reviews at 1,200 req/min, IP ban rate 18.5% → 0.04%.",
      "Fine-tuned BERT ticket triage cutting duplicate tickets 42% and MTTR 3.5× ($45K/yr saved).",
      "Optimized PostgreSQL + pgvector (HNSW) — analytical query latency down 78%, vector distance search 2.1s → 45ms.",
    ],
    tech: [
      "LangChain",
      "Qdrant",
      "vLLM",
      "PyTorch",
      "AWS EKS",
      "PostgreSQL",
      "pgvector",
      "Celery",
    ],
  },
  {
    id: "iit-madras",
    company: "IIT Madras",
    role: "Research Intern",
    team: "Wireless Networks & Spatial ML Group",
    location: "Remote",
    dates: "Jun 2023 – Oct 2023",
    summary:
      "Researched physics-informed machine learning for indoor wireless signal propagation, replacing expensive manual site surveys with spatial ML.",
    stats: [
      { value: "R²=0.975", label: "prediction accuracy" },
      { value: "86%", label: "less survey labor" },
    ],
    bullets: [
      "Engineered a physics-informed spatial ML framework (Python, TensorFlow) modeling indoor RSSI propagation — R²=0.975, MAE cut 86.9% (8.4 → 1.1 dBm).",
      "Built a synthetic data pipeline fusing log-distance path-loss models with multipath ray-tracing image reflection — 100,000+ spatial data points.",
      "Benchmarked 6 model families (GPR, SVR, KNN, FNN, CNN, LSTM); GPR won with sub-5ms inference.",
      "Automated 2D coverage heatmaps that cut site-survey labor 86% (165 → 23 hrs/floorplan) and AP hardware costs 35%.",
    ],
    tech: [
      "TensorFlow",
      "Scikit-Learn",
      "Gaussian Process Regression",
      "NumPy",
      "Matplotlib",
      "Docker",
      "AWS SageMaker",
    ],
  },
];
