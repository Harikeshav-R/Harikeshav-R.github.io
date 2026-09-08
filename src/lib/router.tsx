import {
  useCallback,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
  type MouseEvent,
} from "react";
import { matchRoute } from "@/lib/routes";
import { RouterContext, useRouter } from "@/lib/routerContext";

// The browser URL is external state, so it is read through a store rather than
// mirrored into React state. That also gives hydration the right seam: see
// getServerSnapshot below.
const listeners = new Set<() => void>();

function subscribe(fn: () => void): () => void {
  listeners.add(fn);
  window.addEventListener("popstate", fn);
  return () => {
    listeners.delete(fn);
    window.removeEventListener("popstate", fn);
  };
}

function getSnapshot(): string {
  return window.location.pathname + window.location.search;
}

/**
 * A small history router. The site has three route shapes and no data-loading
 * needs, so owning this keeps the prerender step trivial.
 */
export function RouterProvider({
  url: initialUrl,
  children,
}: {
  url: string;
  children: ReactNode;
}) {
  // Static hosts serve one file per path, so `/blog?tag=rust` is rendered from
  // the query-less `/blog` HTML. Hydration therefore has to start from the path
  // alone; React re-renders with the real URL immediately afterwards.
  const prerenderedUrl = useMemo(() => initialUrl.split("?")[0], [initialUrl]);
  const getServerSnapshot = useCallback(() => prerenderedUrl, [prerenderedUrl]);

  const url = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  }, []);

  const navigate = useCallback((to: string, opts?: { replace?: boolean }) => {
    if (to === getSnapshot()) return;
    if (opts?.replace) window.history.replaceState(null, "", to);
    else window.history.pushState(null, "", to);
    for (const l of listeners) l();
  }, []);

  const route = useMemo(() => matchRoute(url), [url]);

  // The app scrolls #scroll-root, not the window, so route changes have to
  // reset that element. Also keeps GA's SPA pageviews honest.
  const [path, query = ""] = url.split("?");
  const search = query ? `?${query}` : "";
  useEffect(() => {
    document.getElementById("scroll-root")?.scrollTo({ top: 0 });
    const g = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
    g?.("event", "page_view", { page_path: path + search });
  }, [path, search]);

  const value = useMemo(
    () => ({ route, url, search, navigate }),
    [route, url, search, navigate],
  );
  return (
    <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
  );
}

/**
 * An anchor that navigates in-app on a plain left-click and otherwise behaves
 * like a normal link, so ⌘-click and middle-click still open a new tab — and
 * so the prerendered HTML stays crawlable.
 */
export function Link({
  to,
  children,
  onNavigate,
  ...rest
}: { to: string; onNavigate?: () => void } & Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
>) {
  const { navigate } = useRouter();

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    rest.onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }
    if (rest.target && rest.target !== "_self") return;
    e.preventDefault();
    onNavigate?.();
    navigate(to);
  };

  return (
    <a href={to} {...rest} onClick={onClick}>
      {children}
    </a>
  );
}
