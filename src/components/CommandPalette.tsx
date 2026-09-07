import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  CornerDownLeft,
  FileText,
  FolderGit2,
  Palette,
  ExternalLink,
} from "lucide-react";
import { SECTIONS } from "@/lib/sections";
import { projects } from "@/data/projects";
import { socials } from "@/data/profile";
import type { Theme } from "@/lib/useTheme";
import { cn } from "@/lib/cn";

type Kind = "section" | "project" | "action" | "link";

interface Item {
  id: string;
  label: string;
  hint: string;
  kind: Kind;
  run: () => void;
}

interface Props {
  onClose: () => void;
  onGoto: (id: string) => void;
  theme: Theme;
  onToggleTheme: () => void;
}

/** Simple subsequence fuzzy match with a light scoring bias for prefixes. */
function fuzzyScore(query: string, target: string): number {
  if (!query) return 1;
  const q = query.toLowerCase();
  const t = target.toLowerCase();
  if (t.includes(q)) return 100 - t.indexOf(q); // contiguous match ranks high
  let qi = 0;
  let score = 0;
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) {
      score += 1;
      qi++;
    }
  }
  return qi === q.length ? score : -1;
}

function Icon({ kind }: { kind: Kind }) {
  const cls = "h-4 w-4 shrink-0";
  if (kind === "project") return <FolderGit2 className={cn(cls, "text-blue")} />;
  if (kind === "action") return <Palette className={cn(cls, "text-peach")} />;
  if (kind === "link") return <ExternalLink className={cn(cls, "text-teal")} />;
  return <FileText className={cn(cls, "text-sky")} />;
}

export default function CommandPalette({
  onClose,
  onGoto,
  theme,
  onToggleTheme,
}: Props) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const items: Item[] = useMemo(() => {
    const sections: Item[] = SECTIONS.map((s) => ({
      id: `sec:${s.id}`,
      label: s.label,
      hint: s.file,
      kind: "section",
      run: () => onGoto(s.id),
    }));
    const projs: Item[] = projects.map((p) => ({
      id: `proj:${p.id}`,
      label: p.name,
      hint: p.tagline,
      kind: "project",
      run: () => onGoto("projects"),
    }));
    const links: Item[] = socials.map((s) => ({
      id: `link:${s.label}`,
      label: s.label,
      hint: s.value,
      kind: "link",
      run: () => window.open(s.href, s.href.startsWith("http") ? "_blank" : "_self"),
    }));
    const actions: Item[] = [
      {
        id: "act:theme",
        label: `Toggle theme → ${theme === "dark" ? "Latte (light)" : "Mocha (dark)"}`,
        hint: "colorscheme",
        kind: "action",
        run: onToggleTheme,
      },
    ];
    return [...sections, ...projs, ...actions, ...links];
  }, [onGoto, onToggleTheme, theme]);

  const filtered = useMemo(() => {
    return items
      .map((it) => ({
        it,
        score: Math.max(
          fuzzyScore(query, it.label),
          fuzzyScore(query, it.hint) - 5,
        ),
      }))
      .filter((r) => r.score >= 0)
      .sort((a, b) => b.score - a.score)
      .map((r) => r.it);
  }, [items, query]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Keep the active row scrolled into view.
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(
      `[data-idx="${active}"]`,
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || (e.ctrlKey && e.key === "n")) {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp" || (e.ctrlKey && e.key === "p")) {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[active]?.run();
      onClose();
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[12vh]">
      <motion.div
        className="absolute inset-0 bg-crust/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="relative w-full max-w-xl overflow-hidden rounded-xl border border-surface1 bg-base shadow-2xl"
        initial={{ opacity: 0, y: -12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
      >
        {/* Prompt title bar */}
        <div className="flex items-center gap-2 border-b border-surface0 px-3 py-2 text-xs text-overlay1">
          <span className="text-peach">Telescope</span>
          <span className="text-surface2">find_anything</span>
        </div>
        {/* Input */}
        <div className="flex items-center gap-2 border-b border-surface0 px-4 py-3">
          <Search className="h-4 w-4 text-mauve" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="Jump to a section, project, or link…"
            className="w-full bg-transparent text-sm text-text placeholder:text-overlay0 focus:outline-none"
          />
          <span className="cursor-block" />
        </div>
        {/* Results */}
        <div ref={listRef} className="max-h-[45vh] overflow-y-auto py-1">
          {filtered.length === 0 && (
            <div className="px-4 py-6 text-center text-sm text-overlay0">
              No results for "{query}"
            </div>
          )}
          {filtered.map((it, i) => {
            const isActive = i === active;
            return (
              <button
                key={it.id}
                data-idx={i}
                onMouseEnter={() => setActive(i)}
                onClick={() => {
                  it.run();
                  onClose();
                }}
                className={cn(
                  "flex w-full items-center gap-3 px-4 py-2 text-left text-sm transition-colors",
                  isActive ? "bg-surface0/80" : "hover:bg-surface0/40",
                )}
              >
                {isActive && (
                  <span className="absolute left-0 h-6 w-0.5 rounded-full bg-mauve" />
                )}
                <Icon kind={it.kind} />
                <span className="truncate text-text">{it.label}</span>
                <span className="ml-auto truncate text-xs text-overlay0">
                  {it.hint}
                </span>
                {isActive && (
                  <CornerDownLeft className="h-3.5 w-3.5 shrink-0 text-overlay1" />
                )}
              </button>
            );
          })}
        </div>
        {/* Footer hints */}
        <div className="flex items-center gap-4 border-t border-surface0 px-4 py-2 text-[0.7rem] text-overlay0">
          <span>
            <kbd className="text-subtext1">↑↓</kbd> navigate
          </span>
          <span>
            <kbd className="text-subtext1">↵</kbd> select
          </span>
          <span>
            <kbd className="text-subtext1">esc</kbd> close
          </span>
        </div>
      </motion.div>
    </div>
  );
}
