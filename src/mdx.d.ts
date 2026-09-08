declare module "*.mdx" {
  import type { ComponentType } from "react";
  import type { PostMeta, TocEntry } from "@/lib/blogTypes";

  /** Frontmatter, surfaced by remark-mdx-frontmatter. */
  export const meta: Partial<PostMeta> & { title: string; date: string };
  /** Heading outline, injected by vite/remarkToc.ts. */
  export const toc: TocEntry[];

  const MDXContent: ComponentType<{ components?: Record<string, unknown> }>;
  export default MDXContent;
}
