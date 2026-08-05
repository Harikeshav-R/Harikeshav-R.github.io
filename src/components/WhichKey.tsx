import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SECTIONS } from "@/lib/sections";

/**
 * which-key style popup: after pressing `g`, show the available jump targets
 * (g1..g6) until a key is pressed or the window times out.
 */
export default function WhichKey({ onGoto }: { onGoto: (id: string) => void }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let timer: number | undefined;
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      const typing =
        !!el &&
        (el.tagName === "INPUT" ||
          el.tagName === "TEXTAREA" ||
          el.isContentEditable);
      if (typing) return;

      if (e.key === "g") {
        setOpen(true);
        window.clearTimeout(timer);
        timer = window.setTimeout(() => setOpen(false), 900);
      } else {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.12 }}
          className="fixed bottom-10 left-1/2 z-[60] -translate-x-1/2 rounded-lg border border-surface1 bg-mantle/95 px-3 py-2 shadow-xl backdrop-blur"
        >
          <div className="mb-1.5 text-[0.65rem] uppercase tracking-wider text-overlay0">
            g → go to
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  onGoto(s.id);
                  setOpen(false);
                }}
                className="flex items-center gap-1.5 text-subtext0 hover:text-text"
              >
                <kbd className="rounded bg-surface0 px-1 text-mauve">{s.key}</kbd>
                <span>{s.label}</span>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
