import { useCallback, useSyncExternalStore } from "react";

export type Theme = "dark" | "light";

const KEY = "hk-theme";

const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function subscribe(fn: () => void): () => void {
  listeners.add(fn);
  window.addEventListener("storage", fn);
  return () => {
    listeners.delete(fn);
    window.removeEventListener("storage", fn);
  };
}

function snapshot(): Theme {
  return document.documentElement.classList.contains("light") ? "light" : "dark";
}

/** Matches index.html's <html class="dark"> so prerendered markup lines up. */
function serverSnapshot(): Theme {
  return "dark";
}

export function setTheme(next: Theme) {
  const root = document.documentElement;
  root.classList.toggle("light", next === "light");
  root.classList.toggle("dark", next === "dark");
  try {
    localStorage.setItem(KEY, next);
  } catch {
    /* ignore */
  }
  emit();
}

/**
 * Reads/writes the .light|.dark class on <html> and persists to localStorage.
 *
 * useSyncExternalStore rather than useState: the pre-paint script in index.html
 * may already have applied .light before hydration, so the server snapshot has
 * to be declared separately or the statusline's "mocha"/"latte" mismatches.
 */
export function useTheme(): { theme: Theme; toggle: () => void } {
  const theme = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const toggle = useCallback(() => {
    setTheme(snapshot() === "light" ? "dark" : "light");
  }, []);
  return { theme, toggle };
}
