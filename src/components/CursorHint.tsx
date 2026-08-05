import { motion, AnimatePresence } from "framer-motion";

interface Props {
  /** Show the hint (cursor active + not yet dismissed). */
  show: boolean;
}

function Key({ children }: { children: string }) {
  return (
    <kbd className="rounded bg-surface0 px-1 text-mauve">{children}</kbd>
  );
}

/**
 * A slim vim-style hint strip that appears the first time the cursor is used,
 * explaining the movement keys. Sits just above the statusline.
 */
export default function CursorHint({ show }: Props) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.18 }}
          className="pointer-events-none fixed bottom-9 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-md border border-surface1 bg-mantle/95 px-3 py-1.5 text-[0.7rem] text-overlay1 shadow-lg backdrop-blur"
        >
          <span className="mr-1 text-overlay0">--</span>
          <Key>j</Key> <Key>k</Key> move
          <span className="mx-1.5 text-surface2">·</span>
          <Key>⏎</Key> open
          <span className="mx-1.5 text-surface2">·</span>
          <Key>gg</Key> <Key>G</Key> top/bottom
          <span className="mx-1.5 text-surface2">·</span>
          <Key>^d</Key> <Key>^u</Key> page
          <span className="ml-1 text-overlay0">--</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
