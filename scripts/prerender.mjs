import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = join(root, "dist");
const ssrDir = join(root, "dist-ssr");
const SITE = "https://harikeshav.me";
const TITLE = "Harikeshav Rameshkumar — blog";
const DESC =
  "Writing on distributed systems, machine learning infrastructure, and the tools I build to work faster.";

const server = await import(join(ssrDir, "entry-server.js"));
const template = await readFile(join(dist, "index.html"), "utf8");

async function emit(file, body) {
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, body, "utf8");
}

function page({ html, head }) {
  const withHead = template.replace(
    /<!--seo-start-->[\s\S]*?<!--seo-end-->/,
    () => head,
  );
  return withHead.replace(
    '<div id="root"></div>',
    () => `<div id="root">${html}</div>`,
  );
}

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// ---- pages -----------------------------------------------------------------

for (const route of server.routeManifest) {
  const body = page(server.render(route));
  if (route === "/") {
    await emit(join(dist, "index.html"), body);
    continue;
  }
  const rel = route.replace(/^\//, "");
  // Both spellings, so GitHub Pages serves /blog/x and /blog/x/ without a
  // redirect. The no-trailing-slash form is canonical everywhere.
  await emit(join(dist, `${rel}.html`), body);
  await emit(join(dist, rel, "index.html"), body);
}

// Reached only on a genuine miss: every real route has a file above.
await emit(join(dist, "404.html"), page(server.render("/__not_found__")));

// ---- feed ------------------------------------------------------------------

const absolutise = (html) =>
  html.replace(/(href|src)="\/(?!\/)/g, `$1="${SITE}/`);
const cdata = (s) => s.replaceAll("]]>", "]]]]><![CDATA[>");

const items = server.posts
  .map((p) => {
    const url = `${SITE}/blog/${p.meta.slug}`;
    const body = absolutise(server.renderPostBody(p.meta.slug));
    return `    <item>
      <title>${esc(p.meta.title)}</title>
      <link>${esc(url)}</link>
      <guid isPermaLink="true">${esc(url)}</guid>
      <pubDate>${new Date(p.meta.iso).toUTCString()}</pubDate>
      <description>${esc(p.meta.description)}</description>
${p.meta.tags.map((t) => `      <category>${esc(t)}</category>`).join("\n")}
      <content:encoded><![CDATA[${cdata(body)}]]></content:encoded>
    </item>`;
  })
  .join("\n");

await emit(
  join(dist, "rss.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(TITLE)}</title>
    <link>${SITE}/blog</link>
    <description>${esc(DESC)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`,
);

// ---- sitemap ---------------------------------------------------------------

const urls = [
  { loc: `${SITE}/`, lastmod: null },
  { loc: `${SITE}/blog`, lastmod: server.posts[0]?.meta.iso ?? null },
  ...server.posts.map((p) => ({
    loc: `${SITE}/blog/${p.meta.slug}`,
    lastmod: p.meta.iso,
  })),
];

await emit(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url><loc>${esc(u.loc)}</loc>${
        u.lastmod ? `<lastmod>${u.lastmod.slice(0, 10)}</lastmod>` : ""
      }</url>`,
  )
  .join("\n")}
</urlset>
`,
);

await rm(ssrDir, { recursive: true, force: true });

console.log(
  `prerendered ${server.routeManifest.length} routes + 404, rss.xml, sitemap.xml`,
);
