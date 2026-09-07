import type { Education, SkillGroup, SocialLink } from "./types";

export const profile = {
  name: "Harikeshav Rameshkumar",
  handle: "Harikeshav-R",
  title: "Systems & AI/LLM Engineer",
  tagline: "I build fast, low-level systems and production AI.",
  location: "Columbus, OH",
  email: "r.harikeshav@icloud.com",
  website: "harikeshav.me",
  // Short intro shown in the ASCII splash / hero.
  blurb:
    "B.S. Computer Science @ The Ohio State University (3.9 GPA, May 2027). " +
    "I work across the stack — from hand-written SIMD kernels and FHE runtimes " +
    "to production LLM pipelines on AWS. Currently interning at GE Aerospace.",
  // Longer about-section prose.
  about: [
    "I'm a computer science student at The Ohio State University who likes the hard parts of software: distributed systems, compilers, cryptography, and shipping AI that actually holds up in production.",
    "This past year I've cut LLM extraction latency by 74% on GE Aerospace's financial pipelines, hand-written AVX2/NEON kernels for a distributed inference engine that runs Llama 70B across consumer hardware, and built a fully-homomorphic-encryption ML runtime in Rust that keeps inputs encrypted end-to-end.",
    "When I'm not shipping production code I'm usually at a hackathon — I've placed at RevolutionUC, TartanHacks, NextHacks, and HackOHI/O with teammates I trust, building everything from clinical-trial safety platforms to gamified finance twins.",
  ],
} as const;

export const education: Education = {
  school: "The Ohio State University",
  degree: "B.S. Computer Science",
  location: "Columbus, OH",
  graduation: "May 2027",
  gpa: "3.9 / 4.0",
  honors: ["Dean's List (all 4 semesters)", "University Honors (all 4 semesters)"],
  coursework: [
    "Deep Learning & AI",
    "Systems Programming",
    "Operating Systems",
    "Computer Networking",
    "Data Structures & Algorithms",
    "Full Stack Web Dev",
    "Database Systems",
    "Principles of Programming Languages",
    "Computer Organization",
    "Discrete Structures",
    "Linear Algebra & Diff. Eq.",
    "Digital Logic",
  ],
};

export const socials: SocialLink[] = [
  {
    label: "GitHub",
    value: "github.com/Harikeshav-R",
    href: "https://github.com/Harikeshav-R",
    icon: "github",
  },
  {
    label: "LinkedIn",
    value: "in/harikeshav-rameshkumar",
    href: "https://linkedin.com/in/harikeshav-rameshkumar",
    icon: "linkedin",
  },
  {
    label: "Email",
    value: "r.harikeshav@icloud.com",
    href: "mailto:r.harikeshav@icloud.com",
    icon: "mail",
  },
  {
    label: "Resume",
    value: "Resume.pdf",
    href: "/Resume.pdf",
    icon: "file",
  },
];

export const skills: SkillGroup[] = [
  {
    category: "Languages",
    items: ["Python", "C++20", "Rust", "TypeScript", "C", "C#", "Kotlin", "SQL"],
  },
  {
    category: "AI / LLM",
    items: [
      "AWS Bedrock",
      "Anthropic Claude",
      "LangChain / LangGraph",
      "PyTorch",
      "RAG",
      "vLLM",
      "Hugging Face",
      "pgvector / Qdrant",
    ],
  },
  {
    category: "Systems",
    items: [
      "SIMD (AVX2/NEON)",
      "Linux kernel modules",
      "FHE (tfhe-rs)",
      "OpenMP",
      "Distributed systems",
      "POSIX sockets",
    ],
  },
  {
    category: "Cloud & Infra",
    items: [
      "AWS (ECS/Lambda/Neptune)",
      "Docker",
      "Kubernetes",
      "PostgreSQL",
      "Redis",
      "GitHub Actions",
    ],
  },
  {
    category: "Backend & Data",
    items: ["FastAPI", "Polars", "DuckDB", "SQLAlchemy", "Celery", "Playwright"],
  },
];
