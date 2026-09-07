import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronDown, GitCommit, MapPin } from "lucide-react";
import { SectionHeader, StatBadge, TechChip } from "@/components/ui";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/cn";
import { experience } from "@/data/experience";
import type { Experience } from "@/data/types";

/**
 * A single role rendered as one node in a `git log --graph` timeline: a commit
 * node in the left gutter, a connecting line down to the next role, and a card
 * with the summary + headline stats always visible and detail bullets tucked
 * behind an expand toggle.
 */
function LogEntry({
  exp,
  index,
  isLast,
  open,
  onToggle,
}: {
  exp: Experience;
  index: number;
  isLast: boolean;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <li className={cn("relative flex gap-4 sm:gap-5", !isLast && "pb-8")}>
      {/* git-graph gutter: commit node + connecting line */}
      <div className="flex flex-col items-center" aria-hidden>
        <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-surface1 bg-mantle text-mauve">
          <GitCommit className="h-4 w-4" />
        </span>
        {!isLast && (
          <span className="mt-2 w-px flex-1 bg-gradient-to-b from-mauve/50 to-surface1" />
        )}
      </div>

      <Reveal delay={index * 0.08} className="min-w-0 flex-1">
        <div
          data-vim-stop
          data-vim-label={`${exp.company} — ${exp.role}`}
          className="rounded-lg border border-surface0 bg-mantle/40 p-5 transition-colors hover:border-mauve/50"
        >
          {/* header: company / role · team + dates / location */}
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
            <div className="min-w-0">
              <h3 className="text-base font-bold text-mauve sm:text-lg">
                {exp.company}
              </h3>
              <p className="text-sm text-subtext0">
                {exp.role}
                {exp.team && (
                  <span className="text-overlay1"> · {exp.team}</span>
                )}
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-1 text-xs text-overlay1 sm:items-end">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" aria-hidden />
                {exp.dates}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" aria-hidden />
                {exp.location}
              </span>
            </div>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-subtext1">
            {exp.summary}
          </p>

          {exp.stats.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-3">
              {exp.stats.map((stat) => (
                <StatBadge key={stat.label} stat={stat} />
              ))}
            </div>
          )}

          {exp.bullets.length > 0 && (
            <>
              <button
                type="button"
                onClick={onToggle}
                aria-expanded={open}
                className="mt-4 inline-flex items-center gap-1.5 rounded-md text-xs text-overlay1 transition-colors hover:text-mauve"
              >
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform",
                    open && "rotate-180",
                  )}
                  aria-hidden
                />
                {open
                  ? "collapse details"
                  : `git show · ${exp.bullets.length} more`}
              </button>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    key="details"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <ul className="mt-3 space-y-2">
                      {exp.bullets.map((bullet, bi) => (
                        <li
                          key={bi}
                          className="flex gap-2 text-sm leading-relaxed text-subtext1"
                        >
                          <span className="mt-0.5 shrink-0 text-green" aria-hidden>
                            {"▸"}
                          </span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}

          {exp.tech.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {exp.tech.map((t) => (
                <TechChip key={t}>{t}</TechChip>
              ))}
            </div>
          )}
        </div>
      </Reveal>
    </li>
  );
}

export default function ExperienceSection() {
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set());

  const toggle = (id: string) =>
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <section id="experience" className="scroll-mt-6">
      <SectionHeader
        file="experience/"
        title="Experience"
        hint="git log --author"
      />
      <ol className="relative">
        {experience.map((exp, i) => (
          <LogEntry
            key={exp.id}
            exp={exp}
            index={i}
            isLast={i === experience.length - 1}
            open={openIds.has(exp.id)}
            onToggle={() => toggle(exp.id)}
          />
        ))}
      </ol>
    </section>
  );
}
