import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SECTIONS } from "@/lib/sections";
import { profile } from "@/data/profile";

// Big ASCII wordmark. Kept compact so it fits on phones at small font sizes.
const ASCII_NAME = String.raw`
 _  _   _   ___ ___ _  _____ ___ _  _   _ __   __
| || | /_\ | _ \_ _| |/ / __/ __| || | /_\\ \ / /
| __ |/ _ \|   /| || ' <| _|\__ \ __ |/ _ \\ V /
|_||_/_/ \_\_|_\___|_|\_\___|___/_||_/_/ \_\\_/
`;

const PLUGINS = [
  "lazy.nvim",
  "telescope.nvim",
  "catppuccin",
  "neo-tree",
  "lualine",
  "treesitter",
];

interface Props {
  onEnter: () => void;
  onGoto: (id: string) => void;
}

const reduceMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Splash({ onEnter, onGoto }: Props) {
  // When reduced-motion is on, start fully "loaded" so no animation is needed.
  const [loaded, setLoaded] = useState(() =>
    reduceMotion() ? PLUGINS.length : 0,
  );

  useEffect(() => {
    if (reduceMotion()) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setLoaded(i);
      if (i >= PLUGINS.length) window.clearInterval(id);
    }, 120);
    return () => window.clearInterval(id);
  }, []);

  // Enter on any key / click once plugins are "loaded".
  useEffect(() => {
    const done = loaded >= PLUGINS.length;
    if (!done) return;
    const enter = () => onEnter();
    window.addEventListener("keydown", enter, { once: true });
    return () => window.removeEventListener("keydown", enter);
  }, [loaded, onEnter]);

  const menu = [
    { key: "ff", label: "Find file", id: "projects" },
    { key: "fr", label: "About me", id: "about" },
    { key: "fp", label: "Projects", id: "projects" },
    { key: "fa", label: "Awards", id: "awards" },
    { key: "fc", label: "Contact", id: "contact" },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-base px-4"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <motion.pre
        className="mb-6 select-none text-center text-[0.5rem] leading-tight text-mauve sm:text-xs md:text-sm"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {ASCII_NAME}
      </motion.pre>

      <motion.p
        className="mb-8 text-center text-sm text-subtext0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <span className="text-green">{profile.title.toLowerCase()}</span>
        <span className="mx-2 text-surface2">·</span>
        <span className="text-overlay1">OSU CS · 3.9 GPA</span>
      </motion.p>

      {/* Plugin loader */}
      <div className="mb-8 w-full max-w-xs text-xs">
        {PLUGINS.map((p, i) => (
          <div
            key={p}
            className="flex items-center justify-between py-0.5 text-overlay1"
          >
            <span className={i < loaded ? "text-subtext1" : "text-surface2"}>
              ▸ {p}
            </span>
            <span className={i < loaded ? "text-green" : "text-surface2"}>
              {i < loaded ? "[OK]" : "..."}
            </span>
          </div>
        ))}
      </div>

      {/* Quick menu */}
      <motion.div
        className="mb-8 w-full max-w-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded >= PLUGINS.length ? 1 : 0.4 }}
      >
        {menu.map((m) => (
          <button
            key={m.key + m.label}
            onClick={() => {
              onGoto(m.id);
              onEnter();
            }}
            className="group flex w-full items-center gap-3 rounded px-2 py-1.5 text-sm text-subtext0 transition-colors hover:bg-surface0/50 hover:text-text"
          >
            <span className="text-blue">▸</span>
            <span className="flex-1 text-left">{m.label}</span>
            <kbd className="text-xs text-overlay0 group-hover:text-mauve">
              &lt;leader&gt;{m.key}
            </kbd>
          </button>
        ))}
      </motion.div>

      <motion.button
        onClick={onEnter}
        className="text-xs text-overlay0 hover:text-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded >= PLUGINS.length ? 1 : 0 }}
      >
        press <kbd className="text-mauve">any key</kbd> to enter
        <span className="cursor-block ml-1 align-middle" />
      </motion.button>

      {/* Fake statusline at the very bottom for flavor */}
      <div className="absolute bottom-0 left-0 right-0 flex h-7 items-center border-t border-surface0 bg-mantle px-3 text-xs text-overlay1">
        <span className="bg-green px-2 font-bold text-crust">NORMAL</span>
        <span className="ml-3 text-subtext0">startup.lua</span>
        <span className="ml-auto text-overlay0">
          {SECTIONS.length} buffers · main
        </span>
      </div>
    </motion.div>
  );
}
