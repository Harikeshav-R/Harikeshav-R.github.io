import { useRef } from "react";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { Link } from "@/lib/router";
import { neighbours } from "@/lib/posts";
import type { Post } from "@/lib/blogTypes";
import { mdxComponents } from "@/components/blog/mdxComponents";
import Gutter from "@/components/blog/Gutter";
import Toc from "@/components/blog/Toc";

/**
 * A post rendered as an open buffer: frontmatter-style preamble, line-number
 * gutter beside the prose, symbols pane on wide screens, and prev/next as
 * buffer switches.
 */
export default function PostBuffer({
  post,
  onTopLine,
}: {
  post: Post;
  onTopLine?: (ln: number) => void;
}) {
  const proseRef = useRef<HTMLDivElement>(null);
  const { meta, Component } = post;
  const { older, newer } = neighbours(meta.slug);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-8 sm:py-12">
      <Link
        to="/blog"
        className="mb-6 inline-flex items-center gap-1.5 text-xs text-overlay1 transition-colors hover:text-mauve"
      >
        <ArrowLeft className="h-3 w-3" />
        blog/
      </Link>

      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_13rem] lg:gap-8">
        <article className="min-w-0">
          {/* Frontmatter preamble, styled like the block it came from. */}
          <header className="mb-8 border-b border-surface0 pb-6">
            <div className="mb-3 font-mono text-xs leading-relaxed text-overlay0">
              <div className="text-surface2">---</div>
              <div>
                <span className="text-teal">date</span>
                <span className="text-surface2">: </span>
                <time dateTime={meta.iso} className="text-subtext0">
                  {meta.display}
                </time>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-teal">read</span>
                <span className="text-surface2">: </span>
                <Clock className="h-3 w-3" />
                <span className="text-subtext0">
                  {meta.readingMinutes} min
                </span>
              </div>
              {meta.tags.length > 0 && (
                <div className="flex flex-wrap items-baseline gap-x-1.5">
                  <span className="text-teal">tags</span>
                  <span className="text-surface2">:</span>
                  {meta.tags.map((t) => (
                    <Link
                      key={t}
                      to={`/blog?tag=${encodeURIComponent(t)}`}
                      className="text-peach transition-colors hover:text-mauve"
                    >
                      #{t}
                    </Link>
                  ))}
                </div>
              )}
              <div className="text-surface2">---</div>
            </div>

            <h1 className="text-2xl font-bold leading-tight text-text sm:text-3xl">
              <span className="text-mauve">{"# "}</span>
              {meta.title}
            </h1>
            {meta.description && (
              <p className="mt-2 text-sm text-subtext0">{meta.description}</p>
            )}
          </header>

          <div className="flex gap-3 sm:gap-4">
            <Gutter proseRef={proseRef} onTopLine={onTopLine} />
            <div ref={proseRef} className="post-prose min-w-0 flex-1">
              <Component components={mdxComponents} />
            </div>
          </div>

          {(older || newer) && (
            <nav className="mt-12 grid gap-3 border-t border-surface0 pt-6 sm:grid-cols-2">
              {newer ? (
                <Link
                  to={`/blog/${newer.meta.slug}`}
                  className="group flex flex-col gap-1 rounded-lg border border-surface0 bg-mantle/40 p-3 transition-colors hover:border-mauve/50"
                >
                  <span className="flex items-center gap-1 text-[0.65rem] uppercase tracking-wider text-overlay0">
                    <ArrowLeft className="h-3 w-3" /> newer buffer
                  </span>
                  <span className="text-sm text-subtext1 group-hover:text-text">
                    {newer.meta.title}
                  </span>
                </Link>
              ) : (
                <span />
              )}
              {older && (
                <Link
                  to={`/blog/${older.meta.slug}`}
                  className="group flex flex-col gap-1 rounded-lg border border-surface0 bg-mantle/40 p-3 text-right transition-colors hover:border-mauve/50 sm:items-end"
                >
                  <span className="flex items-center gap-1 text-[0.65rem] uppercase tracking-wider text-overlay0">
                    older buffer <ArrowRight className="h-3 w-3" />
                  </span>
                  <span className="text-sm text-subtext1 group-hover:text-text">
                    {older.meta.title}
                  </span>
                </Link>
              )}
            </nav>
          )}
        </article>

        <aside className="mt-10 lg:mt-0">
          <Toc entries={post.toc} />
        </aside>
      </div>
    </div>
  );
}
