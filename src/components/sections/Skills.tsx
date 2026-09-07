import { Brain, Cloud, Code2, Cpu, Database } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHeader, TechChip } from "@/components/ui";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/cn";
import { skills } from "@/data/profile";
import type { SkillGroup } from "@/data/types";

/** Per-group presentation: TOML table name, icon, and (restrained) accent. */
interface GroupMeta {
  /** Bracketed table name, e.g. "ai.llm" → [ai.llm]. */
  table: string;
  Icon: LucideIcon;
  /** Accent text class for the header + icon. */
  accent: string;
  /** Accent border class applied on card hover. */
  hoverBorder: string;
}

const META: Record<string, GroupMeta> = {
  Languages: {
    table: "languages",
    Icon: Code2,
    accent: "text-blue",
    hoverBorder: "hover:border-blue/50",
  },
  "AI / LLM": {
    table: "ai.llm",
    Icon: Brain,
    accent: "text-mauve",
    hoverBorder: "hover:border-mauve/50",
  },
  Systems: {
    table: "systems",
    Icon: Cpu,
    accent: "text-peach",
    hoverBorder: "hover:border-peach/50",
  },
  "Cloud & Infra": {
    table: "cloud.infra",
    Icon: Cloud,
    accent: "text-sky",
    hoverBorder: "hover:border-sky/50",
  },
  "Backend & Data": {
    table: "backend.data",
    Icon: Database,
    accent: "text-green",
    hoverBorder: "hover:border-green/50",
  },
};

/** Fallback for any category not in META — keeps the section robust to data edits. */
function fallbackMeta(category: string): GroupMeta {
  const table = category
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ".")
    .replace(/^\.+|\.+$/g, "");
  return { table, Icon: Code2, accent: "text-lavender", hoverBorder: "hover:border-lavender/50" };
}

export default function Skills() {
  const total = skills.reduce((n, g) => n + g.items.length, 0);

  return (
    <section id="skills" className="scroll-mt-6">
      <SectionHeader file="skills.toml" title="Skills" hint="dependencies" />

      {/* TOML-style top comment to keep the config-file theme. */}
      <p className="mb-4 font-mono text-xs text-overlay0">
        <span className="text-green">{"# "}</span>
        skills.toml &middot; {skills.length} tables &middot; {total} entries
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {skills.map((group: SkillGroup, i) => {
          const meta = META[group.category] ?? fallbackMeta(group.category);
          const { Icon } = meta;
          return (
            <Reveal key={group.category} delay={i * 0.06}>
              <div
                data-vim-stop
                data-vim-label={`[${meta.table}]`}
                className={cn(
                  "h-full rounded-lg border border-surface0 bg-mantle/40 p-4 transition-colors hover:bg-mantle/60",
                  meta.hoverBorder,
                )}
              >
                <h3 className="mb-3 flex items-center gap-2 font-mono text-sm">
                  <Icon className={cn("h-4 w-4 shrink-0", meta.accent)} aria-hidden="true" />
                  <span className="text-overlay1">[</span>
                  <span className={cn("font-semibold", meta.accent)}>{meta.table}</span>
                  <span className="text-overlay1">]</span>
                  <span className="ml-auto text-xs text-overlay0">{group.items.length}</span>
                </h3>
                <ul className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li key={item}>
                      <TechChip>{item}</TechChip>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
