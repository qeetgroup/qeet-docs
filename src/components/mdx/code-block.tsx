"use client";

import { isValidElement, type ComponentProps, type ReactElement } from "react";
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";
import { cn } from "@/lib/cn";

const LANGUAGE_LABEL: Record<string, string> = {
  ts: "TypeScript",
  tsx: "TSX",
  typescript: "TypeScript",
  js: "JavaScript",
  jsx: "JSX",
  javascript: "JavaScript",
  json: "JSON",
  jsonc: "JSON",
  go: "Go",
  py: "Python",
  python: "Python",
  rs: "Rust",
  rust: "Rust",
  sh: "Shell",
  bash: "Bash",
  shell: "Shell",
  zsh: "Shell",
  yaml: "YAML",
  yml: "YAML",
  toml: "TOML",
  http: "HTTP",
  sql: "SQL",
  graphql: "GraphQL",
  html: "HTML",
  css: "CSS",
  mdx: "MDX",
  md: "Markdown",
  text: "Text",
};

/** Pull the Shiki/rehype language off the inner <code class="language-…">. */
function getLanguage(props: ComponentProps<"pre">): string | undefined {
  const child = props.children;
  if (!isValidElement(child)) return undefined;
  const childProps = (child as ReactElement<{ className?: string }>).props;
  const match = childProps.className?.match(/language-([\w-]+)/);
  return match?.[1];
}

/**
 * Enhanced code block — keeps fumadocs' Shiki highlighting + filename pill +
 * copy button, and adds a brand-toned language badge in the header bar.
 * Server-rendered (no client island).
 */
export function pre(props: ComponentProps<"pre">) {
  const lang = getLanguage(props);
  const label = lang ? (LANGUAGE_LABEL[lang] ?? lang.toUpperCase()) : undefined;

  return (
    <CodeBlock
      {...props}
      data-language={lang}
      Actions={({ className, children }) => (
        <div className={cn("flex items-center gap-2", className)}>
          {label ? (
            <span className="rounded-md border border-fd-border bg-fd-muted/60 px-1.5 py-0.5 font-medium font-mono text-[10px] text-fd-muted-foreground uppercase tracking-wide">
              {label}
            </span>
          ) : null}
          {children}
        </div>
      )}
    >
      <Pre>{props.children}</Pre>
    </CodeBlock>
  );
}
