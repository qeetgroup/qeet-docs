import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS";

const METHOD_STYLES: Record<Method, string> = {
  GET: "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300 border-emerald-500/25",
  POST: "bg-brand-500/14 text-brand-text border-brand-500/30",
  PUT: "bg-amber-500/12 text-amber-700 dark:text-amber-300 border-amber-500/25",
  PATCH:
    "bg-violet-500/12 text-violet-700 dark:text-violet-300 border-violet-500/25",
  DELETE: "bg-rose-500/12 text-rose-700 dark:text-rose-300 border-rose-500/25",
  HEAD: "bg-cyan-500/12 text-cyan-700 dark:text-cyan-300 border-cyan-500/25",
  OPTIONS: "bg-fd-muted text-fd-muted-foreground border-fd-border",
};

interface APIEndpointProps {
  method: Method | Lowercase<Method>;
  path: string;
  /** Optional human label, e.g. "Create a user". */
  title?: ReactNode;
}

/**
 * HTTP method badge + monospace path, for `content/docs/id/api/*`.
 * Renders a labelled `group` region for screen readers.
 */
export function APIEndpoint({ method, path, title }: APIEndpointProps) {
  const m = method.toUpperCase() as Method;

  return (
    <div
      role="group"
      aria-label={`${m} ${path}`}
      className="not-prose my-4 flex flex-wrap items-center gap-3 rounded-xl border border-fd-border bg-fd-card px-4 py-3 shadow-sm"
    >
      <span
        className={cn(
          "inline-flex shrink-0 items-center rounded-md border px-2 py-1 font-mono font-semibold text-[11px] tracking-wide",
          METHOD_STYLES[m] ?? METHOD_STYLES.OPTIONS,
        )}
      >
        {m}
      </span>
      <code className="min-w-0 flex-1 break-all font-mono text-fd-foreground text-sm">
        {path}
      </code>
      {title ? (
        <span className="text-fd-muted-foreground text-sm">{title}</span>
      ) : null}
    </div>
  );
}
