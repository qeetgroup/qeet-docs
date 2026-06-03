import { Card as FumaCard, type CardProps, Cards } from "fumadocs-ui/components/card";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

import { APIEndpoint } from "./mdx/api-endpoint";
import { Callout } from "./mdx/callout";
import { pre } from "./mdx/code-block";
import { Sandbox } from "./sandbox";
import { resolveIcon } from "@/lib/icon";

/**
 * MDX authors write `<Card icon="KeyRound">` — a string. fumadocs-ui renders
 * the `icon` prop verbatim, so the string shows as text. Resolve it to a real
 * lucide element here (mirrors what `lucideIconsPlugin` does for the tree).
 */
function Card({ icon, ...props }: CardProps) {
  return <FumaCard icon={resolveIcon(icon)} {...props} />;
}

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    // Premium overrides — keep fumadocs highlighting/behavior, brand the chrome.
    pre,
    Callout,
    Card,
    Cards,
    Step,
    Steps,
    Tab,
    Tabs,
    Sandbox,
    APIEndpoint,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
