// The site is modeled as a set of "buffers" (files) in a Neovim-like editor.
// Every chrome element (sidebar tree, buffer tabs, statusline, command palette,
// scroll-spy) derives from this single source of truth.

export interface SectionDef {
  /** Stable id, also used as the DOM anchor id and scroll target. */
  id: string;
  /** Filename shown in the tree / tabs / statusline. */
  file: string;
  /** File type extension for icon + syntax coloring. */
  ext: "md" | "dir" | "toml" | "lua";
  /** Short label for the command palette. */
  label: string;
  /** Leader-key hint, e.g. "1" → pressing g then 1, shown in which-key. */
  key: string;
}

export const SECTIONS: SectionDef[] = [
  { id: "about", file: "about.md", ext: "md", label: "About", key: "1" },
  {
    id: "experience",
    file: "experience/",
    ext: "dir",
    label: "Experience",
    key: "2",
  },
  { id: "projects", file: "projects/", ext: "dir", label: "Projects", key: "3" },
  { id: "skills", file: "skills.toml", ext: "toml", label: "Skills", key: "4" },
  { id: "awards", file: "awards.md", ext: "md", label: "Awards", key: "5" },
  { id: "contact", file: "contact.md", ext: "md", label: "Contact", key: "6" },
];

export const SECTION_IDS = SECTIONS.map((s) => s.id);

export function sectionById(id: string): SectionDef | undefined {
  return SECTIONS.find((s) => s.id === id);
}
