import About from "@/components/sections/About";
import ExperienceSection from "@/components/sections/Experience";
import ProjectsSection from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Awards from "@/components/sections/Awards";
import Contact from "@/components/sections/Contact";

/**
 * The scrolling document. Each section is an <section id> that the scroll-spy,
 * sidebar, tabs, and command palette target. `onGoto` lets sections trigger
 * cross-section navigation (e.g. "view all projects").
 */
export default function Content({ onGoto }: { onGoto: (id: string) => void }) {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-24 px-5 py-12 sm:px-8 sm:py-16">
      <About onGoto={onGoto} />
      <ExperienceSection />
      <ProjectsSection />
      <Skills />
      <Awards />
      <Contact />

      <footer className="border-t border-surface0 pt-6 pb-4 text-center text-xs text-overlay0">
        <p>
          <span className="text-green">{"// "}</span>
          built from scratch with react + vite + tailwind, styled after neovim +
          catppuccin
        </p>
        <p className="mt-1">
          <span className="text-surface2">$</span> git commit -m "shipped" ·{" "}
          <span className="text-mauve">harikeshav.me</span>
        </p>
      </footer>
    </div>
  );
}
