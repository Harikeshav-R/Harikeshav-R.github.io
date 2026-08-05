import { motion, useReducedMotion } from "framer-motion";
import type { CursorRect } from "@/lib/useVimCursor";

/**
 * The Neovim "cursorline" — a highlighted box that tracks the active stop.
 * Rendered as an absolute child of the scroll container in scroll-space, so it
 * glides with the content on scroll. Purely decorative (pointer-events-none).
 */
export default function CursorOverlay({ rect }: { rect: CursorRect | null }) {
  const reduce = useReducedMotion();
  if (!rect) return null;

  const pad = 8;
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute z-10 rounded-lg border-2 border-mauve/70 bg-mauve/[0.09] shadow-[0_0_0_1px_rgba(203,166,247,0.15),0_0_22px_-4px_rgba(203,166,247,0.5)]"
      initial={false}
      animate={{
        top: rect.top - pad,
        left: rect.left - pad,
        width: rect.width + pad * 2,
        height: rect.height + pad * 2,
      }}
      transition={
        reduce
          ? { duration: 0 }
          : { type: "spring", stiffness: 550, damping: 40, mass: 0.6 }
      }
    >
      {/* left cursor bar, like a focused gutter */}
      <span className="absolute -left-[3px] top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-full bg-mauve" />
    </motion.div>
  );
}
