import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { SECTION_IDS, SECTIONS } from "@/lib/sections";
import { useScrollSpy } from "@/lib/useScrollSpy";
import { useTheme, setTheme } from "@/lib/useTheme";
import { useVimCursor } from "@/lib/useVimCursor";
import { usePagerKeys } from "@/lib/usePagerKeys";
import { scrollToSection } from "@/lib/scrollTo";
import { postBySlug } from "@/lib/posts";
import { RouterProvider } from "@/lib/router";
import { useDocumentMeta } from "@/lib/useDocumentMeta";
import { useRouter } from "@/lib/routerContext";
import Splash from "@/components/Splash";
import Sidebar from "@/components/Sidebar";
import BufferTabs from "@/components/BufferTabs";
import StatusLine from "@/components/StatusLine";
import CommandPalette from "@/components/CommandPalette";
import CommandLine from "@/components/CommandLine";
import WhichKey from "@/components/WhichKey";
import Content from "@/components/Content";
import CursorOverlay from "@/components/CursorOverlay";
import CursorHint from "@/components/CursorHint";
import BlogIndex from "@/components/blog/BlogIndex";
import PostBuffer from "@/components/blog/PostBuffer";
import NotFound from "@/components/blog/NotFound";

// Stable identity: useScrollSpy keys its effect on this array.
const NO_SECTIONS: string[] = [];

const SPLASH_SEEN_KEY = "hk-splash-seen";
const HINT_SEEN_KEY = "hk-hint-seen";

function Shell() {
  const scrollRef = useRef<HTMLElement>(null);
  const { route, navigate } = useRouter();
  const onHome = route.kind === "home";

  // Scroll-spy only means anything on the single-scroll homepage.
  const { activeId: spyId, progress } = useScrollSpy(
    scrollRef,
    onHome ? SECTION_IDS : NO_SECTIONS,
  );
  const activeId = onHome ? spyId : "blog";
  const { theme, toggle } = useTheme();

  const post = route.kind === "post" ? postBySlug(route.slug) : undefined;

  useDocumentMeta(route);

  const [paletteOpen, setPaletteOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile drawer
  const [topLine, setTopLine] = useState(1);

  // Splash is client-only: prerendered HTML must never ship an overlay over
  // the content. The pre-paint script in index.html holds a flat backdrop
  // (html.splash-pending) until this mounts, so there's no flash of the page.
  const [showSplash, setShowSplash] = useState(false);
  useEffect(() => {
    let seen = true;
    try {
      seen = sessionStorage.getItem(SPLASH_SEEN_KEY) === "1";
    } catch {
      seen = false;
    }
    if (!seen && onHome) setShowSplash(true);
    else document.documentElement.classList.remove("splash-pending");
    // Only ever evaluated on first mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dismissSplash = useCallback(() => {
    setShowSplash(false);
    document.documentElement.classList.remove("splash-pending");
    try {
      sessionStorage.setItem(SPLASH_SEEN_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  /** Jump to a homepage section, routing back to `/` first if needed. */
  const go = useCallback(
    (id: string) => {
      setSidebarOpen(false);
      setPaletteOpen(false);
      if (window.location.pathname !== "/") {
        navigate("/");
        // Let the homepage commit before measuring scroll targets.
        requestAnimationFrame(() => requestAnimationFrame(() => scrollToSection(id)));
        return;
      }
      scrollToSection(id);
    },
    [navigate],
  );

  const gotoSection = useCallback(
    (n: number) => {
      const s = SECTIONS[n - 1];
      if (s) go(s.id);
    },
    [go],
  );

  // The vim cursor owns j/k, gg/G, Ctrl-d/u, Enter and the g leader on the
  // homepage. In a post it yields to the pager: stepping a highlight through
  // prose fights the reading.
  const cursor = useVimCursor(scrollRef, {
    enabled: onHome && !showSplash && !paletteOpen && !cmdOpen,
    onGotoSection: gotoSection,
  });

  const quit = useCallback(() => navigate("/blog"), [navigate]);
  usePagerKeys(scrollRef, {
    enabled: route.kind === "post" && !paletteOpen && !cmdOpen,
    onQuit: quit,
  });

  const [hintSeen, setHintSeen] = useState(true);
  useEffect(() => {
    try {
      setHintSeen(sessionStorage.getItem(HINT_SEEN_KEY) === "1");
    } catch {
      setHintSeen(false);
    }
  }, []);
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

  // App-level keybinds: palette + command line + theme + escape.
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
      if (e.key === ":") {
        e.preventDefault();
        setCmdOpen(true);
        return;
      }
      if (e.key === "Escape") {
        setPaletteOpen(false);
        setSidebarOpen(false);
        setCmdOpen(false);
        return;
      }
      if (e.key === "t") {
        toggle();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);

  const main = (() => {
    if (route.kind === "blog") return <BlogIndex />;
    if (route.kind === "post" && post) {
      return <PostBuffer key={post.meta.slug} post={post} onTopLine={setTopLine} />;
    }
    if (route.kind === "notFound" || route.kind === "post") return <NotFound />;
    return (
      <div>
        <Content onGoto={go} />
      </div>
    );
  })();

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
        openBuffer={post ? { file: post.meta.file, onClose: quit } : null}
      />

      {/* Main region: sidebar + scrolling content */}
      <div className="flex min-h-0 flex-1">
        <Sidebar
          activeId={activeId}
          onSelect={go}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          openSlug={post?.meta.slug ?? null}
        />
        <main
          ref={scrollRef}
          className="relative min-w-0 flex-1 overflow-y-auto scroll-smooth"
          id="scroll-root"
        >
          {/* Content wrapper is the observed child; overlay is its sibling. */}
          {main}
          {onHome && <CursorOverlay rect={cursor.rect} />}
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
        buffer={
          post
            ? {
                file: post.meta.file,
                line: topLine,
                lineCount: post.meta.lineCount,
              }
            : null
        }
        commandLine={
          cmdOpen ? (
            <CommandLine
              ctx={{
                navigate,
                gotoSection: go,
                openPalette: () => setPaletteOpen(true),
                setTheme,
                quitTo: route.kind === "post" ? "/blog" : "/",
                close: () => setCmdOpen(false),
              }}
            />
          ) : null
        }
      />

      {/* Overlays */}
      {onHome && <WhichKey onGoto={go} />}
      <CursorHint
        show={onHome && !showSplash && !paletteOpen && cursor.index >= 0 && !hintSeen}
      />
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

export default function App({ url }: { url: string }) {
  return (
    <RouterProvider url={url}>
      <Shell />
    </RouterProvider>
  );
}
