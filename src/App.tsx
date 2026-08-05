import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { SECTION_IDS, SECTIONS } from "@/lib/sections";
import { useScrollSpy } from "@/lib/useScrollSpy";
import { useTheme } from "@/lib/useTheme";
import { useVimCursor } from "@/lib/useVimCursor";
import { scrollToSection } from "@/lib/scrollTo";
import Splash from "@/components/Splash";
import Sidebar from "@/components/Sidebar";
import BufferTabs from "@/components/BufferTabs";
import StatusLine from "@/components/StatusLine";
import CommandPalette from "@/components/CommandPalette";
import WhichKey from "@/components/WhichKey";
import Content from "@/components/Content";
import CursorOverlay from "@/components/CursorOverlay";
import CursorHint from "@/components/CursorHint";

const SPLASH_SEEN_KEY = "hk-splash-seen";
const HINT_SEEN_KEY = "hk-hint-seen";

export default function App() {
  const scrollRef = useRef<HTMLElement>(null);
  const { activeId, progress } = useScrollSpy(scrollRef, SECTION_IDS);
  const { theme, toggle } = useTheme();

  // Splash shows on first load of a session (not on every soft nav).
  const [showSplash, setShowSplash] = useState(() => {
    try {
      return sessionStorage.getItem(SPLASH_SEEN_KEY) !== "1";
    } catch {
      return true;
    }
  });
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile drawer

  const dismissSplash = useCallback(() => {
    setShowSplash(false);
    try {
      sessionStorage.setItem(SPLASH_SEEN_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  const go = useCallback((id: string) => {
    scrollToSection(id);
    setSidebarOpen(false);
    setPaletteOpen(false);
  }, []);

  const gotoSection = useCallback(
    (n: number) => {
      const s = SECTIONS[n - 1];
      if (s) go(s.id);
    },
    [go],
  );

  // The vim cursor owns j/k, arrows, gg/G, Ctrl-d/u, Enter, and g{1-6}.
  const cursor = useVimCursor(scrollRef, {
    enabled: !showSplash && !paletteOpen,
    onGotoSection: gotoSection,
  });

  // First-time hint: shows once the cursor is used, then self-dismisses.
  const [hintSeen, setHintSeen] = useState(() => {
    try {
      return sessionStorage.getItem(HINT_SEEN_KEY) === "1";
    } catch {
      return false;
    }
  });
  useEffect(() => {
    if (cursor.index < 0 || hintSeen) return;
    const t = window.setTimeout(() => {
      setHintSeen(true);
      try {
        sessionStorage.setItem(HINT_SEEN_KEY, "1");
      } catch {
        /* ignore */
      }
    }, 6000);
    return () => window.clearTimeout(t);
  }, [cursor.index, hintSeen]);

  // App-level keybinds: palette + theme + escape. (Navigation lives in the hook.)
  useEffect(() => {
    const isTyping = (t: EventTarget | null) => {
      const el = t as HTMLElement | null;
      return (
        !!el &&
        (el.tagName === "INPUT" ||
          el.tagName === "TEXTAREA" ||
          el.isContentEditable)
      );
    };

    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "p") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
        return;
      }
      if (isTyping(e.target)) return;

      if (e.key === "/") {
        e.preventDefault();
        setPaletteOpen(true);
        return;
      }
      if (e.key === "Escape") {
        setPaletteOpen(false);
        setSidebarOpen(false);
        return;
      }
      if (e.key === "t") {
        toggle();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);

  return (
    <div className="selection-mauve flex h-[100dvh] w-full flex-col overflow-hidden bg-base text-text">
      <AnimatePresence>
        {showSplash && <Splash key="splash" onEnter={dismissSplash} onGoto={go} />}
      </AnimatePresence>

      {/* Buffer tabs across the top */}
      <BufferTabs
        activeId={activeId}
        onSelect={go}
        onToggleSidebar={() => setSidebarOpen((o) => !o)}
        onOpenPalette={() => setPaletteOpen(true)}
        theme={theme}
        onToggleTheme={toggle}
      />

      {/* Main region: sidebar + scrolling content */}
      <div className="flex min-h-0 flex-1">
        <Sidebar
          activeId={activeId}
          onSelect={go}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main
          ref={scrollRef}
          className="relative min-w-0 flex-1 overflow-y-auto scroll-smooth"
          id="scroll-root"
        >
          {/* Content wrapper is the observed child; overlay is its sibling. */}
          <div>
            <Content onGoto={go} />
          </div>
          <CursorOverlay rect={cursor.rect} />
        </main>
      </div>

      {/* Lualine footer */}
      <StatusLine
        activeId={activeId}
        progress={progress}
        theme={theme}
        paletteOpen={paletteOpen}
        cursorIndex={cursor.index}
        cursorCount={cursor.count}
      />

      {/* Overlays */}
      <WhichKey onGoto={go} />
      <CursorHint show={!showSplash && !paletteOpen && cursor.index >= 0 && !hintSeen} />
      <AnimatePresence>
        {paletteOpen && (
          <CommandPalette
            onClose={() => setPaletteOpen(false)}
            onGoto={go}
            theme={theme}
            onToggleTheme={toggle}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
