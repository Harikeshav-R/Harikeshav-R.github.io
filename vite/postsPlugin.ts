import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { Plugin } from "vite";

const VID = "virtual:blog-posts";
const RESOLVED = "\0" + VID;

const MONTHS = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");

/**
 * Generates the post index as a virtual module of eager static imports.
 *
 * Frontmatter is read here, at build time, which buys two things a
 * `import.meta.glob` cannot: drafts and future-dated posts are never
 * *referenced*, so Rollup never emits their content into the production bundle
 * (a runtime filter would still ship the prose); and every consumer — section,
 * index, sidebar, palette, feed, sitemap — reads one already-filtered list.
 *
 * Imports are eager because `renderToString` cannot await during prerender.
 * That puts all post bodies in one chunk; revisit past ~40 posts.
 */
export function blogPosts({
  dir,
  includeDrafts,
}: {
  dir: string;
  includeDrafts: boolean;
}): Plugin {
  return {
    name: "hk:blog-posts",

    resolveId(id) {
      return id === VID ? RESOLVED : null;
    },

    async load(id) {
      if (id !== RESOLVED) return null;

      const files = (await readdir(dir))
        .filter((f) => f.endsWith(".mdx"))
        .sort();
      const now = Date.now();

      const imports: string[] = [];
      const entries: string[] = [];

      for (const file of files) {
        const abs = path.join(dir, file);
        this.addWatchFile(abs);

        const raw = await readFile(abs, "utf8");
        const { data } = matter(raw);

        if (!data.title) this.error(`${file}: frontmatter is missing "title"`);
        if (!data.date) this.error(`${file}: frontmatter is missing "date"`);
        const date = new Date(data.date);
        if (Number.isNaN(date.getTime())) {
          this.error(`${file}: frontmatter "date" is not a valid date`);
        }

        const draft = data.draft === true;
        const future = date.getTime() > now;
        if (!includeDrafts && (draft || future)) continue;

        const words = raw
          .replace(/^---[\s\S]*?\n---/, "")
          .trim()
          .split(/\s+/).length;

        const meta = {
          slug: (data.slug as string) ?? file.replace(/\.mdx$/, ""),
          title: data.title as string,
          description: (data.description as string) ?? "",
          iso: date.toISOString(),
          display: `${MONTHS[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`,
          tags: (data.tags as string[]) ?? [],
          draft: draft || future,
          file,
          lineCount: raw.split("\n").length,
          readingMinutes: Math.max(1, Math.round(words / 220)),
        };

        const ns = `_p${imports.length}`;
        imports.push(`import * as ${ns} from ${JSON.stringify(abs)};`);
        entries.push(
          `{ meta: ${JSON.stringify(meta)}, Component: ${ns}.default, toc: ${ns}.toc ?? [] }`,
        );
      }

      return (
        `${imports.join("\n")}\n\n` +
        `export const posts = [\n${entries.join(",\n")}\n]` +
        `.sort((a, b) => (a.meta.iso < b.meta.iso ? 1 : -1));\n`
      );
    },

    configureServer(server) {
      const bust = (file: string) => {
        if (!file.startsWith(dir) || !file.endsWith(".mdx")) return;
        const mod = server.moduleGraph.getModuleById(RESOLVED);
        if (mod) server.moduleGraph.invalidateModule(mod);
        server.hot.send({ type: "full-reload" });
      };
      server.watcher.on("add", bust).on("unlink", bust);
    },
  };
}
