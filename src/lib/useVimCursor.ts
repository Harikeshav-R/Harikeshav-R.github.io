import { useCallback, useEffect, useRef, useState } from "react";

/** Position of the cursor overlay, in the scroll container's scroll-space. */
export interface CursorRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface VimCursorState {
  /** Index of the active stop, or -1 when the cursor is hidden. */
  index: number;
  /** Total number of stops currently in the document. */
  count: number;
  /** Overlay rect (scroll-space) for the active stop, or null when hidden. */
  rect: CursorRect | null;
  /** Human label for the active stop (from data-vim-label), or null. */
  label: string | null;
}

interface Options {
  enabled: boolean;
  /** Jump to section N (1-based) — used by the `g{1-6}` leader sequence. */
  onGotoSection: (n: number) => void;
}

// Where the "cursor line" sits in the viewport (fraction from the top).
// Both the scrolloff target and the wheel-resync line use this, so keyboard
// navigation and mouse scrolling agree on which stop is "current".
const CURSOR_LINE = 0.28;
const SETTLE_MS = 140;

function isTyping(t: EventTarget | null): boolean {
  const el = t as HTMLElement | null;
  return (
    !!el &&
    (el.tagName === "INPUT" ||
      el.tagName === "TEXTAREA" ||
      el.isContentEditable)
  );
}

function prefersReduced(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * A Neovim-style cursor that steps through tagged content stops
 * (`[data-vim-stop]`) and scrolls the container to follow, à la scrolloff.
 * Additive: mouse wheel / trackpad / touch still scroll normally, and the
 * cursor re-syncs to the nearest stop afterward. Hidden until the first key.
 */
export function useVimCursor(
  containerRef: React.RefObject<HTMLElement | null>,
  { enabled, onGotoSection }: Options,
): VimCursorState {
  const [index, setIndex] = useState(-1);
  const [count, setCount] = useState(0);
  const [rect, setRect] = useState<CursorRect | null>(null);
  const [label, setLabel] = useState<string | null>(null);

  const stopsRef = useRef<HTMLElement[]>([]);
  const indexRef = useRef(-1);
  // When true, the cursor position is driven by the keyboard and is
  // authoritative: scroll events must NOT resync (which caused bounce-back).
  // Flipped to false only by a genuine wheel/touch gesture.
  const keyboardModeRef = useRef(false);

  const scan = useCallback((): HTMLElement[] => {
    const c = containerRef.current;
    if (!c) return [];
    const els = Array.from(
      c.querySelectorAll<HTMLElement>("[data-vim-stop]"),
    );
    stopsRef.current = els;
    setCount(els.length);
    return els;
  }, [containerRef]);

  const measure = useCallback(
    (el: HTMLElement | null) => {
      const c = containerRef.current;
      if (!c || !el) {
        setRect(null);
        return;
      }
      const cr = c.getBoundingClientRect();
      const er = el.getBoundingClientRect();
      setRect({
        top: er.top - cr.top + c.scrollTop,
        left: er.left - cr.left + c.scrollLeft,
        width: er.width,
        height: er.height,
      });
    },
    [containerRef],
  );

  const commit = useCallback(
    (i: number) => {
      const els = stopsRef.current;
      if (i < 0 || els.length === 0) {
        indexRef.current = -1;
        setIndex(-1);
        setRect(null);
        setLabel(null);
        return;
      }
      const clamped = Math.max(0, Math.min(i, els.length - 1));
      indexRef.current = clamped;
      setIndex(clamped);
      const el = els[clamped];
      measure(el);
      setLabel(el.getAttribute("data-vim-label"));
    },
    [measure],
  );

  // Last stop whose top is at or above the cursor line — the "current" stop.
  const indexAtLine = useCallback((): number => {
    const c = containerRef.current;
    const els = stopsRef.current;
    if (!c || els.length === 0) return -1;
    const line = c.getBoundingClientRect().top + c.clientHeight * CURSOR_LINE;
    let best = 0;
    for (let i = 0; i < els.length; i++) {
      if (els[i].getBoundingClientRect().top - 6 <= line) best = i;
    }
    return best;
  }, [containerRef]);

  // Keep the active stop within the scrolloff band. The follow-scroll is
  // INSTANT (like Neovim scrolling by lines) so the page can never fall behind
  // the cursor on rapid j/k — the highlight box's own spring provides the glide.
  const revealActive = useCallback(() => {
    const c = containerRef.current;
    const el = stopsRef.current[indexRef.current];
    if (!c || !el) return;
    const cr = c.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    const off = Math.min(c.clientHeight * CURSOR_LINE, 200);
    const relTop = er.top - cr.top;
    const relBottom = er.bottom - cr.top;

    let delta = 0;
    if (relTop < off) {
      // Above the band → scroll up to the cursor line.
      delta = relTop - off;
    } else if (relBottom > c.clientHeight - off) {
      // Below the band → scroll down just enough, but never push the top
      // above the cursor line (tall cards pin to their top).
      delta = Math.min(relBottom - (c.clientHeight - off), relTop - off);
    } else {
      return; // already in band
    }

    // Instant, absolute target from a live measurement — correct even
    // mid-animation, and the page can never lag behind the cursor.
    c.scrollTo({ top: c.scrollTop + delta, behavior: "auto" });
  }, [containerRef]);

  const resync = useCallback(() => {
    if (indexRef.current < 0) return;
    const best = indexAtLine();
    if (best !== indexRef.current) commit(best);
    else measure(stopsRef.current[best]);
  }, [indexAtLine, commit, measure]);

  const step = useCallback(
    (dir: number) => {
      // Re-scan so a just-expanded/collapsed section is reflected immediately.
      const els = scan();
      if (els.length === 0) return;
      keyboardModeRef.current = true;
      const i = indexRef.current < 0 ? indexAtLine() : indexRef.current + dir;
      commit(i);
      revealActive();
    },
    [scan, indexAtLine, commit, revealActive],
  );

  // Absolute jump (gg / G / Home / End). Keyboard-authoritative like `step`.
  const jumpTo = useCallback(
    (where: "first" | "last") => {
      const els = scan();
      if (els.length === 0) return;
      keyboardModeRef.current = true;
      commit(where === "first" ? 0 : els.length - 1);
      revealActive();
    },
    [scan, commit, revealActive],
  );

  const half = useCallback(
    (dir: number) => {
      const c = containerRef.current;
      if (!c) return;
      if (indexRef.current < 0) commit(indexAtLine());
      // Ctrl-d/u is a page gesture: let the cursor follow the viewport and
      // resync to the line afterward, so allow resync (not keyboard-authoritative).
      keyboardModeRef.current = false;
      c.scrollBy({
        top: dir * c.clientHeight * 0.5,
        behavior: prefersReduced() ? "auto" : "smooth",
      });
    },
    [containerRef, commit, indexAtLine],
  );

  const activate = useCallback(() => {
    const el = stopsRef.current[indexRef.current];
    if (!el) return;
    if (el instanceof HTMLAnchorElement || el instanceof HTMLButtonElement) {
      el.click();
      return;
    }
    const target = el.querySelector<HTMLElement>(
      "a[href], button:not([disabled])",
    );
    target?.click();
  }, []);

  // --- keyboard ---
  useEffect(() => {
    let leaderG = false;
    let leaderTimer: number | undefined;
    const clearLeader = () => {
      leaderG = false;
      window.clearTimeout(leaderTimer);
    };

    const onKey = (e: KeyboardEvent) => {
      if (!enabled || isTyping(e.target)) return;

      // g leader: gg → top, g{1-6} → section jump.
      if (leaderG) {
        if (e.key === "g") {
          clearLeader();
          e.preventDefault();
          jumpTo("first");
          return;
        }
        if (/^[1-6]$/.test(e.key)) {
          clearLeader();
          e.preventDefault();
          onGotoSection(Number(e.key));
          return;
        }
        clearLeader();
      }

      switch (e.key) {
        case "j":
        case "ArrowDown":
          e.preventDefault();
          step(1);
          break;
        case "k":
        case "ArrowUp":
          e.preventDefault();
          step(-1);
          break;
        case "G":
          e.preventDefault();
          jumpTo("last");
          break;
        case "Home":
          e.preventDefault();
          jumpTo("first");
          break;
        case "End":
          e.preventDefault();
          jumpTo("last");
          break;
        case "Enter":
          // Let native handle it if a real control is focused.
          if (
            document.activeElement instanceof HTMLAnchorElement ||
            document.activeElement instanceof HTMLButtonElement
          ) {
            return;
          }
          if (indexRef.current >= 0) {
            e.preventDefault();
            activate();
          }
          break;
        case "d":
          if (e.ctrlKey) {
            e.preventDefault();
            half(1);
          }
          break;
        case "u":
          if (e.ctrlKey) {
            e.preventDefault();
            half(-1);
          }
          break;
        case "g":
          leaderG = true;
          window.clearTimeout(leaderTimer);
          leaderTimer = window.setTimeout(clearLeader, 900);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(leaderTimer);
    };
  }, [enabled, onGotoSection, step, half, jumpTo, activate]);

  // --- scroll resync (only for genuine wheel/touch, never keyboard nav) ---
  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;
    let raf = 0;
    let endTimer: number | undefined;

    // A real user gesture hands control back to the scroll position: from now
    // on, scroll events may resync the cursor to whatever is at the line.
    const userGesture = () => {
      keyboardModeRef.current = false;
    };

    const onScroll = () => {
      // Keyboard nav is authoritative — the follow-scroll it triggers must
      // never feed back into a resync (that caused the bounce-back).
      if (keyboardModeRef.current || indexRef.current < 0) return;
      window.clearTimeout(endTimer);
      endTimer = window.setTimeout(resync, SETTLE_MS);
      if (!raf)
        raf = requestAnimationFrame(() => {
          raf = 0;
          resync();
        });
    };

    c.addEventListener("wheel", userGesture, { passive: true });
    c.addEventListener("touchmove", userGesture, { passive: true });
    c.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      c.removeEventListener("wheel", userGesture);
      c.removeEventListener("touchmove", userGesture);
      c.removeEventListener("scroll", onScroll);
      window.clearTimeout(endTimer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [containerRef, resync]);

  // --- rescan + re-measure on layout changes (expand, resize, fonts) ---
  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;
    scan();

    let raf = 0;
    const recompute = () => {
      raf = 0;
      scan();
      if (indexRef.current >= 0) commit(indexRef.current);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(recompute);
    };

    // Observe only the content wrapper, NOT the overlay (which is a sibling),
    // so the overlay's own style updates don't trigger an observer loop.
    const content = c.firstElementChild;
    const ro = new ResizeObserver(schedule);
    if (content) {
      ro.observe(content);
      const mo = new MutationObserver(schedule);
      mo.observe(content, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["class", "style"],
      });
      window.addEventListener("resize", schedule);
      const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
      fonts?.ready.then(schedule).catch(() => {});
      return () => {
        ro.disconnect();
        mo.disconnect();
        window.removeEventListener("resize", schedule);
        if (raf) cancelAnimationFrame(raf);
      };
    }
    return () => {
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [containerRef, scan, commit]);

  return { index, count, rect, label };
}
