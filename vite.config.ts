import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeShiki from "@shikijs/rehype";
import { remarkToc } from "./vite/remarkToc";
import { rehypeSourceLines } from "./vite/rehypeSourceLines";
import { blogPosts } from "./vite/postsPlugin";

const POSTS_DIR = fileURLToPath(new URL("./src/content/blog", import.meta.url));

// Custom domain (harikeshav.me) served from repo root, so base is "/".
export default defineConfig(({ command, isSsrBuild }) => ({
  plugins: [
    // MDX must run before react() so the JSX it emits gets transformed
    // (and picked up by Fast Refresh while editing a post).
    {
      enforce: "pre" as const,
      ...mdx({
        remarkPlugins: [
          remarkFrontmatter,
          [remarkMdxFrontmatter, { name: "meta" }],
          remarkGfm,
          remarkToc,
        ],
        rehypePlugins: [
          // Must come first: Shiki rebuilds <pre> and drops node positions.
          rehypeSourceLines,
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
          [
            rehypeShiki,
            {
              themes: { light: "catppuccin-latte", dark: "catppuccin-mocha" },
              // Latte inline, Mocha via CSS vars. The site is dark by default,
              // but the inline colors are what RSS readers fall back to when
              // they strip our stylesheet — and those readers are light.
              defaultColor: "light",
            },
          ],
        ],
      }),
    },
    // Drafts are excluded from the module graph in production, so their prose
    // never reaches the shipped bundle.
    blogPosts({ dir: POSTS_DIR, includeDrafts: command === "serve" }),
    react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
    // The SSR entry never imports CSS, so Tailwind is client-build only.
    ...(isSsrBuild ? [] : [tailwindcss()]),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    outDir: "dist",
    target: "es2022",
  },
}));
