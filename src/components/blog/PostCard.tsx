import { Clock, FileText } from "lucide-react";
import { Link } from "@/lib/router";
import type { Post } from "@/lib/blogTypes";
import { cn } from "@/lib/cn";

/** One post row, shared by the homepage section and the /blog archive. */
export default function PostCard({ post }: { post: Post }) {
  const { meta } = post;
  return (
    <Link
      to={`/blog/${meta.slug}`}
      className={cn(
        "group flex flex-col gap-2 rounded-lg border border-surface0 bg-mantle/40 p-4",
        "transition-colors hover:border-mauve/50 hover:bg-mantle/70",
      )}
    >
      <div className="flex items-center gap-2 text-xs text-overlay1">
        <FileText className="h-3.5 w-3.5 shrink-0 text-sky" />
        <span className="truncate text-subtext0">{meta.file}</span>
        {meta.draft && (
          <span className="rounded border border-yellow/40 bg-yellow/10 px-1.5 py-0.5 text-[0.6rem] uppercase tracking-wide text-yellow">
            draft
          </span>
        )}
      </div>

      <h3 className="text-lg font-bold leading-snug text-text transition-colors group-hover:text-mauve">
        {meta.title}
      </h3>

      {meta.description && (
        <p className="text-sm leading-relaxed text-subtext0">
          {meta.description}
        </p>
      )}

      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-overlay1">
        <time dateTime={meta.iso}>{meta.display}</time>
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {meta.readingMinutes} min
        </span>
        {meta.tags.length > 0 && (
          <span className="flex flex-wrap gap-1.5">
            {meta.tags.map((t) => (
              <span key={t} className="text-teal">
                #{t}
              </span>
            ))}
          </span>
        )}
      </div>
    </Link>
  );
}
