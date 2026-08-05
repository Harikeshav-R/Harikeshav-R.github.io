// Shared content types for the whole site. Section components consume these.

export interface Stat {
  /** The punchy value, e.g. "74%", "$101M", "R²=0.975". */
  value: string;
  /** Short label under the value, e.g. "latency cut". */
  label: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  team?: string;
  location: string;
  dates: string;
  /** 1-2 sentence summary of the role. */
  summary: string;
  /** 1-2 headline stats surfaced by default. */
  stats: Stat[];
  /** Detail bullets revealed on expand. */
  bullets: string[];
  /** Primary tech chips. */
  tech: string[];
}

export interface Project {
  id: string;
  /** kebab-case name used as the "filename" in the tree. */
  slug: string;
  name: string;
  /** Short tagline shown in tree/cards. */
  tagline: string;
  /** 2-3 sentence description. */
  description: string;
  /** Optional award/recognition line. */
  award?: string;
  /** 1-2 headline stats (may be empty). */
  stats: Stat[];
  /** Core tech chips. */
  tech: string[];
  /** Whether this is one of the featured 6. */
  featured: boolean;
  /** Optional external repo/demo link. */
  link?: string;
  /** File extension for the tree ("rs", "cpp", "py", "ts", etc.). */
  ext: string;
}

export interface Award {
  id: string;
  title: string;
  place: string;
  event: string;
  host: string;
  sponsor?: string;
  year: string;
  project?: string;
  scale: string;
  blurb: string;
}

export interface Education {
  school: string;
  degree: string;
  location: string;
  graduation: string;
  gpa: string;
  honors: string[];
  coursework: string[];
}

export interface SocialLink {
  label: string;
  value: string;
  href: string;
  /** lucide-react icon name key handled by the component. */
  icon: "github" | "linkedin" | "mail" | "file" | "globe";
}

export interface SkillGroup {
  category: string;
  items: string[];
}
