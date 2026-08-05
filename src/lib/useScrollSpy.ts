import { useEffect, useState } from "react";

/**
 * Tracks which section is currently active in the scroll container and the
 * overall scroll progress (0-100). Uses scroll position against each section's
 * offsetTop so the "active buffer" flips at a stable point near the top.
 */
export function useScrollSpy(
  containerRef: React.RefObject<HTMLElement | null>,
  sectionIds: string[],
): { activeId: string; progress: number } {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let raf = 0;
    const compute = () => {
      raf = 0;
      const scrollTop = container.scrollTop;
      const max = container.scrollHeight - container.clientHeight;
      setProgress(max > 0 ? Math.min(100, Math.round((scrollTop / max) * 100)) : 100);

      // Activation line sits ~30% down the viewport.
      const line = scrollTop + container.clientHeight * 0.3;
      let current = sectionIds[0] ?? "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= line) current = id;
      }
      setActiveId(current);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };

    compute();
    container.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      container.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [containerRef, sectionIds]);

  return { activeId, progress };
}
