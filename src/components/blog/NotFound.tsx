import { Link } from "@/lib/router";

/** The miss buffer, reached only when no prerendered file matched the URL. */
export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 px-5 py-24 sm:px-8">
      <div className="text-xs text-overlay1">
        <span className="text-green">{"// "}</span>
        no such buffer
      </div>
      <h1 className="text-2xl font-bold text-text sm:text-3xl">
        <span className="text-mauve">{"# "}</span>404
      </h1>
      <p className="text-sm text-subtext0">
        <span className="text-red">E486</span>: pattern not found
      </p>
      <div className="mt-4 flex gap-4 text-sm">
        <Link to="/" className="text-mauve transition-colors hover:text-lavender">
          :e about.md
        </Link>
        <Link
          to="/blog"
          className="text-mauve transition-colors hover:text-lavender"
        >
          :e blog/
        </Link>
      </div>
    </div>
  );
}
