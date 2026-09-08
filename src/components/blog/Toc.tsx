import { useEffect, useState } from "react";
import { List } from "lucide-react";
import type { TocEntry } from "@/lib/blogTypes";
import { cn } from "@/lib/cn";

/**
 * The heading outline, styled after an aerial/symbols pane. Entries come from
 * the MDX module's `toc` export, so there is no second parse at runtime.
 */
export default function Toc({ entries }: { entries: TocEntry[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!entries.length) return;
    const headings = entries
      .map((e) => document.getElementById(e.slug))
      .filter((el): el is HTMLElement => !!el);
    if (!headings.length) return;

    const io = new IntersectionObserver(
      (records) => {
        const visible = records
          .filter((r) => r.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-10% 0px -75% 0px", threshold: 0 },
    );
    headings.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, [entries]);

  if (entries.length < 2) return null;

  return (
    <nav className="rounded-lg border border-surface0 bg-mantle/40 p-3 lg:sticky lg:top-6">
      <div className="mb-2 flex items-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-wider text-overlay0">
        <List className="h-3 w-3" />
        symbols
      </div>
      <ul className="space-y-0.5 text-xs">
        {entries.map((e) => (
          <li key={e.slug}>
            <a
              href={`#${e.slug}`}
              className={cn(
                "block truncate rounded px-2 py-1 transition-colors",
                e.depth === 3 && "pl-5",
                active === e.slug
                  ? "bg-surface0/70 text-text"
                  : "text-subtext0 hover:bg-surface0/40 hover:text-text",
              )}
            >
              <span className="mr-1.5 text-overlay0">
                {e.depth === 2 ? "▪" : "◦"}
              </span>
              {e.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
