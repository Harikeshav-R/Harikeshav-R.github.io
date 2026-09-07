import { Menu, Search, Sun, Moon, Github, Linkedin } from "lucide-react";
import { SECTIONS } from "@/lib/sections";
import type { Theme } from "@/lib/useTheme";
import { cn } from "@/lib/cn";

interface Props {
  activeId: string;
  onSelect: (id: string) => void;
  onToggleSidebar: () => void;
  onOpenPalette: () => void;
  theme: Theme;
  onToggleTheme: () => void;
}

export default function BufferTabs({
  activeId,
  onSelect,
  onToggleSidebar,
  onOpenPalette,
  theme,
  onToggleTheme,
}: Props) {
  return (
    <div className="flex h-10 shrink-0 items-stretch border-b border-surface0 bg-crust text-sm">
      {/* Mobile menu button */}
      <button
        onClick={onToggleSidebar}
        className="flex items-center border-r border-surface0 px-3 text-overlay1 hover:text-text md:hidden"
        aria-label="Toggle file tree"
      >
        <Menu className="h-4 w-4" />
      </button>

      {/* Buffer tabs (scroll horizontally on small screens) */}
      <div className="flex min-w-0 flex-1 items-stretch overflow-x-auto">
        {SECTIONS.map((s) => {
          const active = s.id === activeId;
          return (
            <button
              key={s.id}
              onClick={() => onSelect(s.id)}
              className={cn(
                "group relative flex shrink-0 items-center gap-2 border-r border-surface0 px-3.5 transition-colors",
                active
                  ? "bg-base text-text"
                  : "bg-crust text-overlay1 hover:bg-mantle hover:text-subtext1",
              )}
            >
              {active && (
                <span className="absolute inset-x-0 top-0 h-0.5 bg-mauve" />
              )}
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  active ? "bg-green" : "bg-surface2 group-hover:bg-overlay0",
                )}
              />
              <span className="whitespace-nowrap">{s.file}</span>
            </button>
          );
        })}
      </div>

      {/* Right-side controls */}
      <div className="flex shrink-0 items-stretch border-l border-surface0">
        <button
          onClick={onOpenPalette}
          className="flex items-center gap-2 px-3 text-overlay1 transition-colors hover:text-text"
          aria-label="Open command palette"
        >
          <Search className="h-4 w-4" />
          <kbd className="hidden text-[0.7rem] text-overlay0 sm:inline">^P</kbd>
        </button>
        <a
          href="https://github.com/Harikeshav-R"
          target="_blank"
          rel="noreferrer"
          className="flex items-center px-3 text-overlay1 transition-colors hover:text-text"
          aria-label="GitHub"
        >
          <Github className="h-4 w-4" />
        </a>
        <a
          href="https://linkedin.com/in/harikeshav-rameshkumar"
          target="_blank"
          rel="noreferrer"
          className="hidden items-center px-3 text-overlay1 transition-colors hover:text-text sm:flex"
          aria-label="LinkedIn"
        >
          <Linkedin className="h-4 w-4" />
        </a>
        <button
          onClick={onToggleTheme}
          className="flex items-center px-3 text-overlay1 transition-colors hover:text-text"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}
