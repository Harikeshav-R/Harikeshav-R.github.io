import { createContext, useContext } from "react";
import type { Route } from "@/lib/routes";

export interface RouterValue {
  route: Route;
  /** Current path + search, e.g. "/blog?tag=rust". */
  url: string;
  /** Query string including "?", or "" — empty until after hydration. */
  search: string;
  navigate: (to: string, opts?: { replace?: boolean }) => void;
}

export const RouterContext = createContext<RouterValue | null>(null);

export function useRouter(): RouterValue {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error("useRouter must be used inside <RouterProvider>");
  return ctx;
}

export function useRoute(): Route {
  return useRouter().route;
}
