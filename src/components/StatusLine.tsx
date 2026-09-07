import { useEffect, useState } from "react";
import { GitBranch } from "lucide-react";
import { sectionById } from "@/lib/sections";
import type { Theme } from "@/lib/useTheme";

interface Props {
  activeId: string;
  progress: number;
  theme: Theme;
  paletteOpen: boolean;
  /** Active vim-cursor stop index (-1 = inactive). */
  cursorIndex: number;
  /** Total number of vim-cursor stops. */
  cursorCount: number;
}

export default function StatusLine({
  activeId,
  progress,
  theme,
  paletteOpen,
  cursorIndex,
  cursorCount,
}: Props) {
  const [clock, setClock] = useState("");
  const section = sectionById(activeId);
  const mode = paletteOpen ? "SEARCH" : "NORMAL";

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = String(d.getHours()).padStart(2, "0");
      const mm = String(d.getMinutes()).padStart(2, "0");
      setClock(`${hh}:${mm}`);
    };
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);

  const modeColor =
    mode === "SEARCH" ? "bg-peach text-crust" : "bg-green text-crust";

  return (
    <footer className="flex h-7 shrink-0 items-stretch border-t border-surface0 bg-mantle text-xs">
      {/* Mode block */}
      <div className={`flex items-center px-3 font-bold ${modeColor}`}>
        {mode}
      </div>
      {/* Branch */}
      <div className="flex items-center gap-1.5 bg-surface0 px-3 text-subtext1">
        <GitBranch className="h-3 w-3" />
        <span>main</span>
      </div>
      {/* Filename */}
      <div className="flex min-w-0 items-center gap-2 px-3 text-overlay1">
        <span className="truncate text-subtext0">
          {section?.file ?? "about.md"}
        </span>
      </div>

      <div className="flex-1" />

      {/* Right cluster: theme, filetype, cursor line, progress, clock */}
      <div className="hidden items-center px-3 text-overlay1 sm:flex">
        {theme === "dark" ? "mocha" : "latte"}
      </div>
      <div className="hidden items-center bg-surface0 px-3 text-subtext1 sm:flex">
        utf-8
      </div>
      {cursorIndex >= 0 && (
        <div className="hidden items-center px-3 text-overlay1 sm:flex">
          ln {cursorIndex + 1}/{cursorCount}
        </div>
      )}
      <div className="flex items-center px-3 text-overlay1">{progress}%</div>
      <div className="flex items-center bg-mauve px-3 font-bold text-crust">
        {clock}
      </div>
    </footer>
  );
}
