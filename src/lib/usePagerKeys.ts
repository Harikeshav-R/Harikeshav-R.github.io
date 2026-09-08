import { useEffect } from "react";

const STEP = 64;

function isTyping(t: EventTarget | null): boolean {
  const el = t as HTMLElement | null;
  return (
    !!el &&
    (el.tagName === "INPUT" ||
      el.tagName === "TEXTAREA" ||
      el.isContentEditable)
  );
}

/**
 * Pager motions for reading a post buffer: j/k scroll, Ctrl-d/u half-page,
 * gg/G jump. The vim cursor is disabled on post routes — stepping a highlight
 * through prose fights the reading, so the keys just move the viewport.
 */
export function usePagerKeys(
  scrollRef: React.RefObject<HTMLElement | null>,
  { enabled, onQuit }: { enabled: boolean; onQuit: () => void },
) {
  useEffect(() => {
    if (!enabled) return;

    let leaderG = false;
    let leaderTimer: number | undefined;
    const clearLeader = () => {
      leaderG = false;
      window.clearTimeout(leaderTimer);
    };

    const by = (dy: number) =>
      scrollRef.current?.scrollBy({ top: dy, behavior: "smooth" });

    const onKey = (e: KeyboardEvent) => {
      if (isTyping(e.target) || e.metaKey || e.altKey) return;
      const el = scrollRef.current;
      if (!el) return;

      if (leaderG) {
        clearLeader();
        if (e.key === "g") {
          e.preventDefault();
          el.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
      }

      switch (e.key) {
        case "j":
        case "ArrowDown":
          e.preventDefault();
          by(STEP);
          break;
        case "k":
        case "ArrowUp":
          e.preventDefault();
          by(-STEP);
          break;
        case "g":
          leaderG = true;
          leaderTimer = window.setTimeout(clearLeader, 900);
          break;
        case "G":
          e.preventDefault();
          el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
          break;
        case "d":
          if (e.ctrlKey) {
            e.preventDefault();
            by(el.clientHeight / 2);
          }
          break;
        case "u":
          if (e.ctrlKey) {
            e.preventDefault();
            by(-el.clientHeight / 2);
          }
          break;
        case "Escape":
          onQuit();
          break;
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearLeader();
    };
  }, [enabled, scrollRef, onQuit]);
}
