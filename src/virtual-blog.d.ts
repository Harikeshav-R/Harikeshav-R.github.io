declare module "virtual:blog-posts" {
  import type { Post } from "@/lib/blogTypes";
  /** Newest first. Built by vite/postsPlugin.ts. */
  export const posts: Post[];
}
