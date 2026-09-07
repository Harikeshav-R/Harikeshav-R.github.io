import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, FileCode2, Folder, FileText, Settings2, X } from "lucide-react";
import { SECTIONS, type SectionDef } from "@/lib/sections";
import { profile } from "@/data/profile";
import { cn } from "@/lib/cn";

function FileIcon({ ext }: { ext: SectionDef["ext"] }) {
  const cls = "h-3.5 w-3.5 shrink-0";
  if (ext === "dir") return <Folder className={cn(cls, "text-blue")} />;
  if (ext === "toml") return <Settings2 className={cn(cls, "text-peach")} />;
  if (ext === "lua") return <FileCode2 className={cn(cls, "text-blue")} />;
  return <FileText className={cn(cls, "text-sky")} />;
}

function Tree({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <nav className="flex flex-col gap-0.5 px-2 py-2 text-sm">
      <div className="flex items-center gap-1 px-1 py-1 text-xs font-semibold uppercase tracking-wider text-overlay0">
        <ChevronRight className="h-3 w-3" />
        <span className="truncate">~/{profile.handle.toLowerCase()}</span>
      </div>
      {SECTIONS.map((s) => {
        const active = s.id === activeId;
        return (
          <button
            key={s.id}
            onClick={() => onSelect(s.id)}
            aria-current={active ? "true" : undefined}
            className={cn(
              "group flex items-center gap-2 rounded-md px-2 py-1.5 text-left transition-colors",
              active
                ? "bg-surface0/80 text-text"
                : "text-subtext0 hover:bg-surface0/40 hover:text-text",
            )}
          >
            <span
              className={cn(
                "w-1 self-stretch rounded-full transition-colors",
                active ? "bg-mauve" : "bg-transparent",
              )}
            />
            <FileIcon ext={s.ext} />
            <span className="truncate">{s.file}</span>
            <span className="ml-auto text-[0.65rem] text-overlay0 opacity-0 transition-opacity group-hover:opacity-100">
              g{s.key}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

interface Props {
  activeId: string;
  onSelect: (id: string) => void;
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ activeId, onSelect, open, onClose }: Props) {
  return (
    <>
      {/* Desktop: persistent sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-surface0 bg-mantle md:flex">
        <div className="flex items-center gap-2 border-b border-surface0 px-3 py-2 text-xs text-overlay1">
          <span className="text-yellow">▸</span>
          <span className="font-semibold uppercase tracking-wider">neo-tree</span>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <Tree activeId={activeId} onSelect={onSelect} />
        </div>
        <div className="border-t border-surface0 px-3 py-2 text-[0.65rem] leading-relaxed text-overlay0">
          <div>
            <kbd className="text-mauve">/</kbd> find ·{" "}
            <kbd className="text-mauve">g1–6</kbd> jump
          </div>
          <div>
            <kbd className="text-mauve">t</kbd> theme
          </div>
        </div>
      </aside>

      {/* Mobile: drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-crust/70 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
            <motion.aside
              className="fixed left-0 top-0 z-50 flex h-full w-64 flex-col border-r border-surface0 bg-mantle md:hidden"
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
            >
              <div className="flex items-center justify-between border-b border-surface0 px-3 py-2 text-xs text-overlay1">
                <span className="font-semibold uppercase tracking-wider">neo-tree</span>
                <button onClick={onClose} aria-label="Close menu">
                  <X className="h-4 w-4 text-overlay1 hover:text-text" />
                </button>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto">
                <Tree activeId={activeId} onSelect={onSelect} />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
