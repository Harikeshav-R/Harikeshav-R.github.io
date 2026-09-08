import type { ReactNode } from "react";

type El = React.HTMLAttributes<HTMLHeadingElement>;

/** A prose heading, prefixed with its markdown hashes. */
export default function Heading({
  level,
  children,
  ...rest
}: { level: 2 | 3 | 4; children?: ReactNode } & El) {
  const Tag = `h${level}` as "h2" | "h3" | "h4";
  const size =
    level === 2
      ? "mt-10 mb-3 text-xl sm:text-2xl"
      : level === 3
        ? "mt-8 mb-2 text-lg"
        : "mt-6 mb-2 text-base";
  const hashes = "#".repeat(level);

  return (
    <Tag
      className={`scroll-mt-20 font-bold text-text [&_a]:text-inherit [&_a]:no-underline ${size}`}
      {...rest}
    >
      <span className="mr-2 select-none text-mauve">{hashes}</span>
      {children}
    </Tag>
  );
}
