import { useEffect, useMemo, useRef, useState } from "react";
import { posts } from "@/lib/posts";
import { SECTIONS } from "@/lib/sections";

export interface CommandContext {
  navigate: (to: string) => void;
  gotoSection: (id: string) => void;
  openPalette: () => void;
  setTheme: (t: "dark" | "light") => void;
  /** Where `:q` lands from the current route. */
  quitTo: string;
  close: () => void;
}

const HELP =
  ":q close · :e <slug> open post · :blog · :Telescope · :set background=light|dark";

/**
 * A minimal `:` command line, rendered in place of the statusline's left half.
 * Deliberately small: enough to close and switch buffers without becoming a
 * second navigation system alongside Telescope.
 */
export default function CommandLine({ ctx }: { ctx: CommandContext }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const slugs = useMemo(() => posts.map((p) => p.meta.slug), []);

  const run = (raw: string) => {
    const input = raw.trim();
    const [cmd, ...args] = input.split(/\s+/);
    const arg = args.join(" ");

    switch (cmd) {
      case "q":
      case "q!":
      case "quit":
        ctx.navigate(ctx.quitTo);
        return ctx.close();

      case "blog":
        ctx.navigate("/blog");
        return ctx.close();

      case "e":
      case "edit": {
        if (!arg) {
          setError("E32: No file name");
          return;
        }
        const hit =
          slugs.find((s) => s === arg) ??
          slugs.find((s) => s.startsWith(arg)) ??
          slugs.find((s) => s.includes(arg));
        if (!hit) {
          setError(`E484: Can't open file ${arg}`);
          return;
        }
        ctx.navigate(`/blog/${hit}`);
        return ctx.close();
      }

      case "Telescope":
      case "tel":
        ctx.close();
        return ctx.openPalette();

      case "set": {
        const m = /^background=(light|dark)$/.exec(arg);
        if (!m) {
          setError(`E518: Unknown option: ${arg || "(none)"}`);
          return;
        }
        ctx.setTheme(m[1] as "dark" | "light");
        return ctx.close();
      }

      case "help":
      case "h":
        setError(HELP);
        return;

      default: {
        const section = SECTIONS.find((s) => s.id === cmd);
        if (section) {
          ctx.gotoSection(section.id);
          return ctx.close();
        }
        setError(`E492: Not an editor command: ${input}`);
      }
    }
  };

  const complete = () => {
    const m = /^(e|edit)\s+(\S*)$/.exec(value.trim());
    if (!m) return;
    const hit = slugs.find((s) => s.startsWith(m[2]));
    if (hit) setValue(`${m[1]} ${hit}`);
  };

  return (
    <div className="flex min-w-0 flex-1 items-center gap-1 px-2 font-mono text-xs">
      {error ? (
        <span className="truncate text-red" role="status">
          {error}
        </span>
      ) : null}
      <span className="text-mauve">:</span>
      <input
        ref={inputRef}
        value={value}
        aria-label="Command line"
        spellCheck={false}
        autoComplete="off"
        className="min-w-0 flex-1 bg-transparent text-text outline-none placeholder:text-overlay0"
        placeholder="q"
        onChange={(e) => {
          setValue(e.target.value);
          setError(null);
        }}
        onBlur={ctx.close}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            run(value);
          } else if (e.key === "Escape") {
            e.preventDefault();
            ctx.close();
          } else if (e.key === "Tab") {
            e.preventDefault();
            complete();
          }
        }}
      />
    </div>
  );
}
