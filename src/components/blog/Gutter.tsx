import { useCallback, useEffect, useState, type RefObject } from "react";

interface Mark {
  ln: number;
  top: number;
}

/**
 * The buffer's line-number column. Each top-level block carries the source line
 * range it spans (stamped by vite/rehypeSourceLines.ts), and every line in that
 * range gets a number, distributed over the block's measured height — so the
 * gutter reads as a dense 1..M column like a real buffer rather than a sparse
 * list of block starts.
 *
 * Measured from bounding rects, not offsetTop, so wrappers like CodeBlock don't
 * shift the numbers. Recomputed after fonts load and on resize, the same way
 * useVimCursor keeps its overlay aligned.
 */
export default function Gutter({
  proseRef,
  onTopLine,
}: {
  proseRef: RefObject<HTMLElement | null>;
  /** Reports the topmost visible source line, for the statusline. */
  onTopLine?: (ln: number) => void;
}) {
  const [marks, setMarks] = useState<Mark[]>([]);

  const measure = useCallback(() => {
    const el = proseRef.current;
    if (!el) return;
    const base = el.getBoundingClientRect().top;
    const next: Mark[] = [];

    for (const node of el.querySelectorAll<HTMLElement>("[data-ln]")) {
      const start = Number(node.dataset.ln);
      const end = Number(node.dataset.lnEnd ?? node.dataset.ln);
      if (!start) continue;

      // Code blocks map one source line to one rendered line, and Shiki marks
      // each with a .line span — so measure those directly. Spreading numbers
      // over the block's height instead would drift by a whole line before the
      // end of a long listing, since the <pre>'s padding and margins are not
      // part of any line.
      const codeLines = node.querySelectorAll<HTMLElement>(".shiki .line");
      if (codeLines.length) {
        // The fence lines themselves aren't rendered: content starts at
        // `start + 1`.
        codeLines.forEach((line, i) => {
          const ln = start + 1 + i;
          if (ln > end) return;
          next.push({ ln, top: line.getBoundingClientRect().top - base });
        });
        continue;
      }

      // Prose soft-wraps, so source lines have no fixed visual position.
      // Spreading them over the block keeps the column dense and monotonic.
      const rect = node.getBoundingClientRect();
      const top = rect.top - base;
      const count = Math.max(1, end - start + 1);
      const step = rect.height / count;

      for (let i = 0; i < count; i++) {
        next.push({ ln: start + i, top: top + i * step });
      }
    }
    setMarks(next);
  }, [proseRef]);

  useEffect(() => {
    const el = proseRef.current;
    if (!el) return;

    // observe() fires the callback with the initial size, which covers the
    // first measurement without a synchronous setState in the effect body.
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    void document.fonts?.ready.then(measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [proseRef, measure]);

  // Track the topmost line currently scrolled into view.
  useEffect(() => {
    if (!onTopLine || !marks.length) return;
    const scroller = document.getElementById("scroll-root");
    const el = proseRef.current;
    if (!scroller || !el) return;

    const onScroll = () => {
      const offset = el.getBoundingClientRect().top - scroller.getBoundingClientRect().top;
      const y = -offset;
      let ln = marks[0].ln;
      for (const m of marks) {
        if (m.top > y) break;
        ln = m.ln;
      }
      onTopLine(ln);
    };

    onScroll();
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", onScroll);
  }, [marks, onTopLine, proseRef]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative hidden w-11 shrink-0 select-none border-r border-surface0/60 text-right sm:block"
    >
      {marks.map((m) => (
        <span
          key={m.ln}
          className="absolute right-3 text-[0.7rem] leading-none text-surface2 tabular-nums"
          style={{ top: m.top }}
        >
          {m.ln}
        </span>
      ))}
    </div>
  );
}
