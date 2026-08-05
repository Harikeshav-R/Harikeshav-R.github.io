import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { Stat } from "@/data/types";

/** A small monospace tech tag chip. */
export function TechChip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-surface1/70 bg-surface0/40 px-2 py-0.5 text-xs text-subtext1 transition-colors hover:border-mauve/60 hover:text-text">
      {children}
    </span>
  );
}

/** A headline stat: big colored value + small label. */
export function StatBadge({ stat }: { stat: Stat }) {
  return (
    <div className="flex flex-col rounded-lg border border-surface0 bg-mantle/60 px-3 py-2">
      <span className="text-lg font-bold leading-none text-mauve">{stat.value}</span>
      <span className="mt-1 text-[0.7rem] uppercase tracking-wide text-overlay1">
        {stat.label}
      </span>
    </div>
  );
}

/**
 * The standard section header, styled like a file being opened in the editor.
 * `n` is the section index used for the little "buffer" number.
 */
export function SectionHeader({
  file,
  title,
  hint,
}: {
  file: string;
  title: string;
  hint?: string;
}) {
  return (
    <header className="mb-8" data-vim-stop data-vim-label={file}>
      <div className="mb-2 flex items-center gap-2 text-xs text-overlay1">
        <span className="text-green">{"//"}</span>
        <span className="text-subtext0">{file}</span>
        {hint && (
          <>
            <span className="text-surface2">·</span>
            <span className="text-overlay0">{hint}</span>
          </>
        )}
      </div>
      <h2 className="text-2xl font-bold text-text sm:text-3xl">
        <span className="text-mauve">{"# "}</span>
        {title}
      </h2>
    </header>
  );
}

/** A comment-style prompt line, e.g. "> some note". */
export function Prompt({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-subtext0", className)}>
      <span className="mr-2 text-teal">{">"}</span>
      {children}
    </p>
  );
}
