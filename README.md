# harikeshav.me

My personal site — a Neovim-themed portfolio. Built from scratch with React + Vite +
Tailwind, styled after [Neovim](https://neovim.io/) and the
[Catppuccin](https://github.com/catppuccin/catppuccin) colorscheme.

## Features

- **Neovim chrome** — neo-tree file sidebar, buffer tabs, a Lualine-style statusline,
  and which-key hints.
- **Telescope command palette** — fuzzy-find any section, project, or link
  (`Ctrl/Cmd+P` or `/`).
- **Vim-ish keybinds** — `g1`–`g6` to jump between sections, `t` to toggle theme.
- **Catppuccin Mocha (dark) ⇄ Latte (light)** with a live theme swap.
- **Live ASCII headshot** — the portrait is rendered to ASCII art client-side on a
  canvas.
- **alpha-nvim splash** on first load, `prefers-reduced-motion` respected throughout.

## Stack

React 19 · TypeScript · Vite 7 · Tailwind CSS v4 · Framer Motion · lucide-react ·
JetBrains Mono

## Develop

```bash
pnpm install
pnpm dev        # dev server
pnpm build      # typecheck + production build → dist/
pnpm preview    # serve the production build
pnpm lint       # eslint
```

## Structure

```
src/
  components/           # nvim chrome (Sidebar, BufferTabs, StatusLine, CommandPalette, …)
    sections/           # About, Experience, Projects, Skills, Awards, Contact
  data/                 # content: profile, experience, projects, awards (+ types)
  lib/                  # sections model, theme + scroll-spy hooks, helpers
```

All site content lives in `src/data/` — editing those files updates the sidebar tree,
command palette, and statusline automatically.

## Deploy

Deployed to [harikeshav.me](https://harikeshav.me) via GitHub Pages
(`public/CNAME`).

```bash
pnpm deploy      # builds and pushes dist/ to gh-pages
```
