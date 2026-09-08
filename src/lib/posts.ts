import { posts } from "virtual:blog-posts";
import type { Post } from "@/lib/blogTypes";

export { posts };
export type { Post };

export function postBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.meta.slug === slug);
}

/** Tags across all built posts, most-used first. */
export function allTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const p of posts) {
    for (const t of p.meta.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/** Chronological neighbours, for the prev/next buffer switches. */
export function neighbours(slug: string): {
  older: Post | undefined;
  newer: Post | undefined;
} {
  const i = posts.findIndex((p) => p.meta.slug === slug);
  if (i < 0) return { older: undefined, newer: undefined };
  // `posts` is newest-first.
  return { older: posts[i + 1], newer: posts[i - 1] };
}
