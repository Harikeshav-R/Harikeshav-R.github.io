import type { ComponentType } from "react";

export interface TocEntry {
  depth: number;
  text: string;
  slug: string;
}

/** Frontmatter plus everything the build computed from the source file. */
export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  /** ISO date string, for <time>, the feed, and sorting. */
  iso: string;
  /** Human date, e.g. "Aug 14, 2026". */
  display: string;
  tags: string[];
  /** True for drafts *and* future-dated posts (dev only — never built). */
  draft: boolean;
  /** Filename shown in the tree, tabs, and statusline. */
  file: string;
  /** Total lines in the .mdx source — the denominator for `ln N/M`. */
  lineCount: number;
  readingMinutes: number;
}

export interface Post {
  meta: PostMeta;
  toc: TocEntry[];
  Component: ComponentType<{ components?: Record<string, unknown> }>;
}
