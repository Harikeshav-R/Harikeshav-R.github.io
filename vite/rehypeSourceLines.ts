import type { Root, RootContent, Element, ElementContent } from "hast";

const PASSTHROUGH = new Set(["mdxjsEsm", "doctype", "comment"]);

/**
 * Wraps every top-level block in a div carrying the source line range it spans
 * in the .mdx file, so the post buffer's gutter shows the file's own line
 * numbers rather than a decorative counter.
 *
 * This wraps rather than stamping the block itself because Shiki rebuilds each
 * <pre> from scratch and drops both the original properties and the node's
 * `position`. The wrapper is untouched by later transforms, and doubles as the
 * gutter's measurement target.
 *
 * Must run before every other rehype plugin. Property keys are camelCase
 * because hast-util-to-estree maps them through property-information on the way
 * to JSX — `dataLn` becomes `data-ln`, a literal "data-ln" key does not
 * round-trip reliably.
 *
 * remark-frontmatter consumes the YAML block without shifting positions, so
 * these are true 1-based lines in the file, frontmatter included.
 */
export function rehypeSourceLines() {
  return (tree: Root) => {
    tree.children = tree.children.map((child: RootContent): RootContent => {
      if (child.type === "text" && !child.value.trim()) return child;
      if (PASSTHROUGH.has(child.type)) return child;

      const pos = child.position;
      if (!pos) return child;

      const wrapper: Element = {
        type: "element",
        tagName: "div",
        properties: {
          className: ["mdx-block"],
          dataLn: String(pos.start.line),
          dataLnEnd: String(pos.end.line),
        },
        // Guarded above: passthrough/positionless nodes never reach here.
        children: [child as ElementContent],
      };
      return wrapper;
    });
  };
}
