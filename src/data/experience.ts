import type { Experience } from "./types";

export const experience: Experience[] = [
  {
    id: "ge-aerospace",
    company: "GE Aerospace",
    role: "Digital Technology Intern",
    team: "AI / FinFlow Team",
    location: "Bengaluru, India",
    dates: "Jun 2026 – Aug 2026",
    summary:
      "Shipped production LLM contract-extraction pipelines on AWS Bedrock + Claude, financial-lineage AI systems on Neptune, and adoption analytics in Polars/DuckDB across GE Aerospace's financial platform.",
    stats: [
      { value: "74%", label: "processing time cut" },
      { value: "726K+", label: "logs in 15s" },
    ],
    bullets: [
      "Cut per-document processing time 74% (1,957s to 505s) on FinFlow, a production contract-extraction platform (pricing, milestones, business rules), by building its pipeline on AWS Bedrock + Claude with streaming, rate-limiting, and content-hash-cached page splitting that also handles 448-page ($101M) contracts, past Claude's 100-page limit, with 55% fewer API calls and 37% less runtime.",
      "Made financial-lineage data queryable in plain English and production-ready (mypy --strict errors 93 to 0 across 31 modules; tests 29 to 78) by building an AI assistant (FastAPI, Amazon Neptune) and closing a code-execution flaw.",
      "Delivered accurate adoption analytics for 100K+ employees (726K+ logs in 15s) by building a pipeline (Python, Polars, DuckDB) and tracing a defect that had inflated the headline number, correcting the figure leadership presented.",
    ],
    tech: [
      "AWS Bedrock",
      "Claude",
      "Amazon Neptune",
      "FastAPI",
      "Polars",
      "DuckDB",
      "Python 3.12",
    ],
  },
  {
    id: "wayfair",
    company: "Wayfair",
    role: "AI Automation Apprenticeship",
    location: "Remote",
    dates: "Dec 2025 – Feb 2026",
    summary:
      "Built automated AI research and competitive intelligence agents in n8n and delivered a Market Intelligence Dashboard with automated pipelines for the Rugs team.",
    stats: [
      { value: "70%", label: "research time cut" },
      { value: "50+", label: "products tracked" },
    ],
    bullets: [
      "Reduced trend research time by 70% by building AI agents in n8n that scan Amazon and design blogs to identify emerging product trends before mainstream adoption.",
      "Delivered competitive intelligence across 50+ products by developing agents tracking price movements, launches, and reviews to surface whitespace opportunities.",
      "Enabled real-time decisions for the Rugs team by unifying agents into a Market Intelligence Dashboard with automated pipelines.",
    ],
    tech: [
      "n8n",
      "AI Agents",
      "Automated Pipelines",
      "Market Intelligence",
      "Python",
    ],
  },
  {
    id: "palantir",
    company: "Palantir Technologies",
    role: "Technical Fellow",
    location: "Remote",
    dates: "Nov 2025 – Jan 2026",
    summary:
      "Built end-to-end data workflows and interactive data applications in Palantir Foundry, creating ingestion pipelines, Ontology objects, and visualizations.",
    stats: [
      { value: "50%", label: "faster data discovery" },
      { value: "10K+", label: "records processed" },
    ],
    bullets: [
      "Built end-to-end data workflows processing 10K+ records by creating ingestion pipelines, transformations, and Ontology objects in Foundry.",
      "Reduced data discovery time by 50% by designing interactive apps with Object Tables, filters, and visualizations on real-world data.",
    ],
    tech: [
      "Palantir Foundry",
      "Ontology",
      "Data Pipelines",
      "Object Tables",
      "Data Visualization",
    ],
  },
  {
    id: "siage",
    company: "Siage Solutions",
    role: "Software Engineering Intern",
    location: "Bengaluru, India",
    dates: "Jun 2025 – Aug 2025",
    summary:
      "Built enterprise RAG assistants, fine-tuned BERT triage engines, and high-throughput vLLM microservices on AWS EKS.",
    stats: [
      { value: "92%", label: "search latency cut" },
      { value: "4.8×", label: "vLLM throughput" },
    ],
    bullets: [
      "Cut search time 92% (4.2s to 350ms) across 100+ manuals (15M+ tokens) by building a plain-English Q&A assistant to replace PDF search (RAG: LangChain, Qdrant, OpenAI embeddings); now the team's daily tool.",
      "Cut duplicate tickets 42% and resolution time from 14.2 to 4.0 hrs by building a ticket-triage engine (fine-tuned BERT, vector index).",
      "Boosted token throughput 4.8x for a real-time sentiment service (2,500+ users) by deploying a vLLM microservice on AWS EKS.",
    ],
    tech: [
      "LangChain",
      "Qdrant",
      "OpenAI",
      "vLLM",
      "AWS EKS",
      "BERT",
      "Python",
    ],
  },
  {
    id: "iit-madras",
    company: "Indian Institute of Technology, Madras",
    role: "Research Intern",
    team: "Wireless Networks & Spatial AI Group",
    location: "Remote",
    dates: "Jun 2023 – Oct 2023",
    summary:
      "Researched physics-informed machine learning for indoor wireless signal propagation, predicting indoor Wi-Fi signal strength to replace manual site surveys.",
    stats: [
      { value: "R²=0.975", label: "prediction accuracy" },
      { value: "86%", label: "less survey effort" },
    ],
    bullets: [
      "Cut manual site-survey effort 86% by predicting indoor Wi-Fi signal strength anywhere in a building (R^2 = 0.975, 100,000+ synthetic points), benchmarking 6 ML models (incl. GPR, SVR, CNN, LSTM) in Python/TensorFlow.",
    ],
    tech: [
      "Python",
      "TensorFlow",
      "Scikit-Learn",
      "Gaussian Process Regression",
      "CNN",
      "LSTM",
    ],
  },
];
