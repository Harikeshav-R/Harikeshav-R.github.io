import { posts, postBySlug } from "@/lib/posts";

export const SITE = "https://harikeshav.me";
export const AUTHOR = "Harikeshav Rameshkumar";

export type Route =
  | { kind: "home" }
  | { kind: "blog" }
  | { kind: "post"; slug: string }
  | { kind: "notFound" };

/**
 * Pure, and importable by the client, the SSR entry, and the prerender script
 * alike — so the route list, the rendered tree, and the <head> builder can
 * never drift apart.
 *
 * Note the query string is deliberately ignored: static hosts serve one file
 * per path, so `/blog?tag=rust` must resolve to the same route (and the same
 * prerendered HTML) as `/blog`. The tag is read after mount instead.
 */
export function matchRoute(url: string): Route {
  const path = (url.split("?")[0] || "/").replace(/\/+$/, "") || "/";

  if (path === "/") return { kind: "home" };
  if (path === "/blog") return { kind: "blog" };

  const m = /^\/blog\/([^/]+)$/.exec(path);
  if (m) {
    const slug = decodeURIComponent(m[1]);
    if (postBySlug(slug)) return { kind: "post", slug };
  }
  return { kind: "notFound" };
}

/** Every URL the prerenderer must emit. */
export const routeManifest: string[] = [
  "/",
  "/blog",
  ...posts.map((p) => `/blog/${p.meta.slug}`),
];

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export interface RouteMeta {
  title: string;
  description: string;
  url: string;
  type: string;
  /** BlogPosting structured data, for post routes only. */
  jsonLd?: Record<string, unknown>;
}

/**
 * The document metadata for a route. Shared by the prerender step (which
 * serialises it into <head>) and the client (which reapplies it on SPA
 * navigations), so the two can't drift.
 */
export function metaFor(route: Route): RouteMeta {
  const home = {
    title: `${AUTHOR} — Systems & AI Engineer`,
    description:
      "Harikeshav Rameshkumar — B.S. Computer Science @ The Ohio State University. Systems and AI/LLM engineer. GE Aerospace, Siage Solutions, IIT Madras. Builder of distributed inference engines, FHE ML runtimes, and agentic AI platforms.",
    url: SITE + "/",
    type: "website",
  };

  let m: RouteMeta = home;

  if (route.kind === "blog") {
    m = {
      title: `Blog — ${AUTHOR}`,
      description:
        "Writing on distributed systems, machine learning infrastructure, and the tools I build to work faster.",
      url: `${SITE}/blog`,
      type: "website",
    };
  } else if (route.kind === "post") {
    const post = postBySlug(route.slug);
    if (post) {
      const { meta } = post;
      m = {
        title: `${meta.title} — ${AUTHOR}`,
        description: meta.description,
        url: `${SITE}/blog/${meta.slug}`,
        type: "article",
      };
      m.jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: meta.title,
        description: meta.description,
        datePublished: meta.iso,
        keywords: meta.tags.join(", "),
        author: { "@type": "Person", name: AUTHOR, url: SITE },
        mainEntityOfPage: m.url,
      };
    }
  } else if (route.kind === "notFound") {
    m = {
      title: `Not found — ${AUTHOR}`,
      description: "E486: pattern not found.",
      url: SITE + "/",
      type: "website",
    };
  }

  return m;
}

/**
 * The per-route <head> block, swapped into the seo-start/seo-end fence in
 * index.html by the prerender script.
 */
export function headFor(route: Route): string {
  const m = metaFor(route);
  // Same id the client hook uses, so a soft nav replaces this block instead of
  // leaving the previous post's structured data behind alongside the new one.
  const jsonLd = m.jsonLd
    ? `\n<script type="application/ld+json" id="route-jsonld">${JSON.stringify(m.jsonLd)}</script>`
    : "";

  return [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    `<meta name="author" content="${esc(AUTHOR)}" />`,
    `<link rel="canonical" href="${esc(m.url)}" />`,
    `<meta property="og:type" content="${m.type}" />`,
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    `<meta property="og:url" content="${esc(m.url)}" />`,
    `<meta name="twitter:card" content="summary" />`,
    route.kind === "notFound" ? `<meta name="robots" content="noindex" />` : "",
  ]
    .filter(Boolean)
    .join("\n    ")
    .concat(jsonLd);
}
