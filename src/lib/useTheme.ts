import { useCallback, useState } from "react";

export type Theme = "dark" | "light";

const KEY = "hk-theme";

function current(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("light") ? "light" : "dark";
}

/** Reads/writes the .light|.dark class on <html> and persists to localStorage. */
export function useTheme(): { theme: Theme; toggle: () => void } {
  const [theme, setTheme] = useState<Theme>(current);

  const apply = useCallback((next: Theme) => {
    const root = document.documentElement;
    root.classList.toggle("light", next === "light");
    root.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* ignore */
    }
    setTheme(next);
  }, []);

  const toggle = useCallback(() => {
    apply(current() === "light" ? "dark" : "light");
  }, [apply]);

  return { theme, toggle };
}
