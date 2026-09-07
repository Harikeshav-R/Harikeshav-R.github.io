import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Award, ChevronRight, FileCode2, Folder, Star } from "lucide-react";
import { SectionHeader, StatBadge, TechChip } from "@/components/ui";
import Reveal from "@/components/Reveal";
import { featuredProjects, otherProjects } from "@/data/projects";
import type { Project } from "@/data/types";
import { cn } from "@/lib/cn";

/** Language-flavored accent color for a file extension. */
const EXT_COLOR: Record<string, string> = {
  rs: "text-peach",
  cpp: "text-blue",
  py: "text-yellow",
  ts: "text-blue",
  cs: "text-mauve",
  kt: "text-peach",
};

function extColor(ext: string): string {
  return EXT_COLOR[ext] ?? "text-subtext1";
}

/** A rich card for one of the featured projects. */
function FeaturedCard({ project }: { project: Project }) {
  return (
    <div
      data-vim-stop
      data-vim-label={`${project.slug}.${project.ext}`}
      className="group flex h-full flex-col gap-3 rounded-lg border border-surface0 bg-mantle/40 p-5 transition-colors hover:border-mauve/50"
    >
      {/* title row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <FileCode2
            className={cn("h-5 w-5 shrink-0", extColor(project.ext))}
            aria-hidden
          />
          <div className="min-w-0">
            <h3 className="truncate font-bold text-text">{project.name}</h3>
            <span className="font-mono text-xs text-overlay0">
              {project.slug}.
              <span className={extColor(project.ext)}>{project.ext}</span>
            </span>
          </div>
        </div>
        <Star
          className="h-4 w-4 shrink-0 text-yellow transition-colors group-hover:text-mauve"
          aria-hidden
        />
      </div>

      <p className="text-sm text-subtext0">{project.tagline}</p>

      {project.award && (
        <div className="inline-flex items-start gap-1.5 rounded-md border border-yellow/40 bg-yellow/10 px-2 py-1 text-xs text-yellow">
          <Award className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <span>{project.award}</span>
        </div>
      )}

      <p className="line-clamp-3 text-sm text-subtext1">{project.description}</p>

      {/* bottom-aligned meta */}
      <div className="mt-auto flex flex-col gap-3 pt-1">
        {project.stats.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.stats.map((s) => (
              <StatBadge key={s.label} stat={s} />
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <TechChip key={t}>{t}</TechChip>
          ))}
        </div>

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-0.5 self-start text-xs text-teal transition-colors hover:text-sky"
          >
            <ChevronRight className="h-4 w-4" aria-hidden />
            repo
          </a>
        )}
      </div>
    </div>
  );
}

/** A compact `ls`-style row for a non-featured project. */
function MoreRow({ project }: { project: Project }) {
  const rowClass =
    "flex items-center gap-3 px-3 py-2 transition-colors hover:bg-surface0/40";

  const inner = (
    <>
      <FileCode2
        className={cn("h-4 w-4 shrink-0", extColor(project.ext))}
        aria-hidden
      />
      <span className="shrink-0">
        <span className="text-subtext1">{project.slug}.</span>
        <span className={extColor(project.ext)}>{project.ext}</span>
      </span>
      <span className="min-w-0 flex-1 truncate text-overlay1">
        {project.tagline}
      </span>
      {project.award && (
        <Award className="h-4 w-4 shrink-0 text-yellow" aria-hidden />
      )}
    </>
  );

  return project.link ? (
    <a
      href={project.link}
      target="_blank"
      rel="noreferrer"
      data-vim-stop
      data-vim-label={`${project.slug}.${project.ext}`}
      className={cn(rowClass, "cursor-pointer")}
    >
      {inner}
    </a>
  ) : (
    <div
      data-vim-stop
      data-vim-label={`${project.slug}.${project.ext}`}
      className={rowClass}
    >
      {inner}
    </div>
  );
}

export default function ProjectsSection() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <section id="projects" className="scroll-mt-6">
      <SectionHeader file="projects/" title="Projects" hint="ls -la" />

      <p className="mb-4 font-mono text-xs text-overlay1">
        <span className="text-green">{"// "}</span>
        featured — {featuredProjects.length} pinned
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {featuredProjects.map((project, i) => (
          <Reveal key={project.id} delay={i * 0.06} className="h-full">
            <FeaturedCard project={project} />
          </Reveal>
        ))}
      </div>

      {/* the rest of the tree, collapsed */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="projects-more"
        data-vim-stop
        data-vim-label="more/"
        className="group mt-6 flex w-full items-center gap-2 rounded-md border border-surface0 bg-mantle/40 px-3 py-2 text-left text-sm transition-colors hover:border-mauve/50"
      >
        <ChevronRight
          className={cn(
            "h-4 w-4 text-mauve transition-transform",
            open && "rotate-90",
          )}
          aria-hidden
        />
        <Folder className="h-4 w-4 shrink-0 text-blue" aria-hidden />
        <span className="font-mono text-subtext1">more/</span>
        <span className="font-mono text-overlay0">
          ({otherProjects.length})
        </span>
        <span className="ml-auto text-xs text-overlay0">
          {open ? "collapse" : "expand"}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="projects-more"
            key="projects-more"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <ul className="mt-2 divide-y divide-surface0/60 overflow-hidden rounded-md border border-surface0 bg-crust/40 font-mono text-sm">
              {otherProjects.map((project) => (
                <li key={project.id}>
                  <MoreRow project={project} />
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
