import { useCallback, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Wraps Shiki's <pre> so it can carry a copy button. Colors come from Shiki's
 * inline styles (Latte) and the `--shiki-dark` vars (Mocha), resolved in
 * index.css — so this only owns layout and the button.
 */
export default function CodeBlock({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLPreElement>) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const copy = useCallback(() => {
    const text = ref.current?.textContent ?? "";
    void navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    });
  }, []);

  return (
    <div className="group relative my-5">
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy code"}
        className={cn(
          "absolute right-2 top-2 z-10 flex items-center gap-1 rounded-md border px-2 py-1",
          "text-[0.65rem] transition-all",
          "opacity-0 focus-visible:opacity-100 group-hover:opacity-100",
          copied
            ? "border-green/50 bg-green/10 text-green"
            : "border-surface1 bg-surface0/80 text-subtext0 hover:border-mauve/60 hover:text-text",
        )}
      >
        {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
        {copied ? "copied" : "copy"}
      </button>
      <pre ref={ref} className={className} {...rest}>
        {children}
      </pre>
    </div>
  );
}
