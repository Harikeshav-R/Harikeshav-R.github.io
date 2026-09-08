import { StrictMode } from "react";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import App from "@/App";
import { mdxComponents } from "@/components/blog/mdxComponents";
import { headFor, matchRoute, routeManifest } from "@/lib/routes";
import { posts, postBySlug } from "@/lib/posts";

export { routeManifest, posts };

/** Full page markup plus the per-route <head> block. */
export function render(url: string): { html: string; head: string } {
  return {
    // renderToString, not renderToStaticMarkup: hydrateRoot needs the markers.
    html: renderToString(
      <StrictMode>
        <App url={url} />
      </StrictMode>,
    ),
    head: headFor(matchRoute(url)),
  };
}

/** Article-only HTML for <content:encoded> in the feed. */
export function renderPostBody(slug: string): string {
  const post = postBySlug(slug);
  if (!post) return "";
  return renderToStaticMarkup(<post.Component components={mdxComponents} />);
}
