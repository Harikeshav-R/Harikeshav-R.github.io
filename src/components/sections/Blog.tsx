import { ArrowRight } from "lucide-react";
import { Link } from "@/lib/router";
import { posts } from "@/lib/posts";
import { SectionHeader } from "@/components/ui";
import Reveal from "@/components/Reveal";
import PostCard from "@/components/blog/PostCard";

const RECENT = 3;

/** The homepage's blog section: a few recent posts plus a link to the archive. */
export default function Blog() {
  const recent = posts.slice(0, RECENT);

  return (
    <section id="blog" className="scroll-mt-6">
      <SectionHeader file="blog/" title="Blog" hint="ls -t | head -3" />

      {recent.length === 0 ? (
        <p className="text-sm text-overlay1">
          <span className="text-surface2">{"// "}</span>no posts yet
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {recent.map((p, i) => (
            <Reveal key={p.meta.slug} delay={i * 0.06}>
              <div data-vim-stop data-vim-label={p.meta.file}>
                <PostCard post={p} />
              </div>
            </Reveal>
          ))}
        </div>
      )}

      {posts.length > RECENT && (
        <Reveal delay={RECENT * 0.06}>
          <Link
            to="/blog"
            data-vim-stop
            data-vim-label="blog/ — view all"
            className="mt-5 inline-flex items-center gap-1.5 text-sm text-mauve transition-colors hover:text-lavender"
          >
            view all {posts.length} posts
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Reveal>
      )}
    </section>
  );
}
