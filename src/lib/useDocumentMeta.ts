import { useEffect } from "react";
import { metaFor, AUTHOR, type Route } from "@/lib/routes";

function setMeta(selector: string, attr: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    const [, name, key] = /\[(name|property)="([^"]+)"\]/.exec(selector) ?? [];
    if (name && key) el.setAttribute(name, key);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

/**
 * Reapplies the route's <head> on client-side navigations.
 *
 * Prerendered pages already ship the right tags, so this only matters after a
 * soft nav — without it the tab title and canonical would keep describing
 * whichever page was loaded first.
 */
export function useDocumentMeta(route: Route) {
  useEffect(() => {
    const m = metaFor(route);

    document.title = m.title;
    setMeta('meta[name="description"]', "content", m.description);
    setMeta('meta[name="author"]', "content", AUTHOR);
    setMeta('meta[property="og:title"]', "content", m.title);
    setMeta('meta[property="og:description"]', "content", m.description);
    setMeta('meta[property="og:url"]', "content", m.url);
    setMeta('meta[property="og:type"]', "content", m.type);

    let link = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = m.url;

    // Structured data is per-post, so it is replaced wholesale rather than
    // accumulating a script tag per visited route.
    const ID = "route-jsonld";
    document.getElementById(ID)?.remove();
    if (m.jsonLd) {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.id = ID;
      s.textContent = JSON.stringify(m.jsonLd);
      document.head.appendChild(s);
    }
  }, [route]);
}
