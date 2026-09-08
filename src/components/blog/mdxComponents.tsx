import { Link } from "@/lib/router";
import CodeBlock from "@/components/blog/CodeBlock";
import Heading from "@/components/blog/Heading";

type El<T extends HTMLElement> = React.HTMLAttributes<T>;

/**
 * Palette-styled replacements for the raw HTML elements MDX emits. Anchors
 * route in-app when they point at this site and open in a new tab otherwise.
 */
export const mdxComponents = {
  h1: (p: El<HTMLHeadingElement>) => <Heading level={2} {...p} />,
  h2: (p: El<HTMLHeadingElement>) => <Heading level={2} {...p} />,
  h3: (p: El<HTMLHeadingElement>) => <Heading level={3} {...p} />,
  h4: (p: El<HTMLHeadingElement>) => <Heading level={4} {...p} />,

  p: (p: El<HTMLParagraphElement>) => (
    <p className="my-4 leading-7 text-subtext1" {...p} />
  ),

  a: ({ href = "", ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const internal = href.startsWith("/");
    const cls =
      "text-blue underline decoration-blue/40 underline-offset-2 transition-colors hover:text-mauve hover:decoration-mauve/60";
    if (internal) return <Link to={href} className={cls} {...rest} />;
    return (
      <a
        href={href}
        className={cls}
        target="_blank"
        rel="noreferrer noopener"
        {...rest}
      />
    );
  },

  ul: (p: El<HTMLUListElement>) => (
    <ul
      className="my-4 list-disc space-y-2 pl-6 text-subtext1 marker:text-mauve"
      {...p}
    />
  ),
  ol: (p: El<HTMLOListElement>) => (
    <ol
      className="my-4 list-decimal space-y-2 pl-6 text-subtext1 marker:text-mauve"
      {...p}
    />
  ),
  li: (p: El<HTMLLIElement>) => <li className="leading-7 pl-1" {...p} />,

  blockquote: (p: El<HTMLQuoteElement>) => (
    <blockquote
      className="my-5 border-l-2 border-mauve/60 bg-mantle/40 py-2 pl-4 pr-3 italic text-subtext0"
      {...p}
    />
  ),

  hr: () => <hr className="my-8 border-surface0" />,

  strong: (p: El<HTMLElement>) => (
    <strong className="font-bold text-text" {...p} />
  ),
  em: (p: El<HTMLElement>) => <em className="text-subtext0" {...p} />,

  // `code` is deliberately not overridden: Shiki's fenced-block <code> and
  // inline code are indistinguishable as props here, so inline code is styled
  // by the `:not(pre) > code` rule in index.css instead.
  pre: CodeBlock,

  table: (p: El<HTMLTableElement>) => (
    <div className="my-5 overflow-x-auto rounded-lg border border-surface0">
      <table className="w-full border-collapse text-sm" {...p} />
    </div>
  ),
  thead: (p: El<HTMLTableSectionElement>) => (
    <thead className="bg-surface0/50 text-left text-subtext0" {...p} />
  ),
  th: (p: El<HTMLTableCellElement>) => (
    <th className="border-b border-surface0 px-3 py-2 font-semibold" {...p} />
  ),
  td: (p: El<HTMLTableCellElement>) => (
    <td className="border-b border-surface0/60 px-3 py-2 text-subtext1" {...p} />
  ),
};
