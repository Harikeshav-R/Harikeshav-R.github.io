import { useMemo } from "react";
import { useRouter } from "@/lib/routerContext";
import { posts, allTags } from "@/lib/posts";
import { SectionHeader } from "@/components/ui";
import PostCard from "@/components/blog/PostCard";
import { cn } from "@/lib/cn";

/**
 * The full archive. Tag filtering is client-side and reflected in `?tag=`.
 *
 * The tag comes from the router's `search`, which is empty for the server and
 * hydration renders — a static host serves the same query-less /blog HTML for
 * every `?tag=`, so reading it any earlier would mismatch.
 */
export default function BlogIndex() {
  const { navigate, search } = useRouter();
  const tag = useMemo(
    () => new URLSearchParams(search).get("tag"),
    [search],
  );

  const tags = useMemo(() => allTags(), []);
  const shown = useMemo(
    () => (tag ? posts.filter((p) => p.meta.tags.includes(tag)) : posts),
    [tag],
  );

  const select = (next: string | null) => {
    navigate(next ? `/blog?tag=${encodeURIComponent(next)}` : "/blog", {
      replace: true,
    });
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
      <SectionHeader
        file="blog/"
        title="Blog"
        hint={`ls -la · ${posts.length} ${posts.length === 1 ? "entry" : "entries"}`}
      />

      {tags.length > 0 && (
        <div className="mb-8 flex flex-wrap items-center gap-2">
          <span className="text-xs text-overlay0">filter:</span>
          <button
            onClick={() => select(null)}
            className={cn(
              "rounded-md border px-2 py-0.5 text-xs transition-colors",
              tag === null
                ? "border-mauve/60 bg-mauve/10 text-mauve"
                : "border-surface1/70 bg-surface0/40 text-subtext1 hover:border-mauve/40 hover:text-text",
            )}
          >
            all
          </button>
          {tags.map(({ tag: t, count }) => (
            <button
              key={t}
              onClick={() => select(t === tag ? null : t)}
              className={cn(
                "rounded-md border px-2 py-0.5 text-xs transition-colors",
                t === tag
                  ? "border-mauve/60 bg-mauve/10 text-mauve"
                  : "border-surface1/70 bg-surface0/40 text-subtext1 hover:border-mauve/40 hover:text-text",
              )}
            >
              #{t}
              <span className="ml-1 text-overlay0">{count}</span>
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-4">
        {shown.map((p) => (
          <PostCard key={p.meta.slug} post={p} />
        ))}
        {shown.length === 0 && (
          <p className="rounded-lg border border-dashed border-surface1 p-6 text-center text-sm text-overlay1">
            <span className="text-red">E486</span>: no posts tagged{" "}
            <span className="text-peach">#{tag}</span>
          </p>
        )}
      </div>
    </div>
  );
}
