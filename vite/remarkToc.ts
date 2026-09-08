import type { Root } from "mdast";
import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";
import GithubSlugger from "github-slugger";
import { valueToEstree } from "estree-util-value-to-estree";

interface TocEntry {
  depth: number;
  text: string;
  slug: string;
}

/**
 * Collects h2/h3 headings into an `export const toc` on the compiled module,
 * so the outline pane needs no second parse at runtime. Slugs are generated
 * with github-slugger, matching what rehype-slug puts on the headings.
 */
export function remarkToc() {
  return (tree: Root) => {
    const slugger = new GithubSlugger();
    const toc: TocEntry[] = [];

    visit(tree, "heading", (node) => {
      if (node.depth < 2 || node.depth > 3) return;
      const text = toString(node);
      if (!text) return;
      toc.push({ depth: node.depth, text, slug: slugger.slug(text) });
    });

    tree.children.unshift({
      type: "mdxjsEsm",
      value: "",
      data: {
        estree: {
          type: "Program",
          sourceType: "module",
          comments: [],
          body: [
            {
              type: "ExportNamedDeclaration",
              specifiers: [],
              source: null,
              attributes: [],
              declaration: {
                type: "VariableDeclaration",
                kind: "const",
                declarations: [
                  {
                    type: "VariableDeclarator",
                    id: { type: "Identifier", name: "toc" },
                    init: valueToEstree(toc),
                  },
                ],
              },
            },
          ],
        },
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
  };
}
