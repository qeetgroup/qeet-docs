import { createElement, type ReactNode } from "react";
import { icons } from "lucide-react";

/**
 * Resolve a string icon name (as used in `meta.json`, page frontmatter, and
 * `<Card icon="…">`) to a rendered lucide React element.
 *
 * fumadocs' `lucideIconsPlugin` only transforms the page tree (sidebar/nav),
 * so anything that receives an `icon` string outside that pipeline — most
 * notably MDX `<Card icon="KeyRound">` — needs to resolve it here, otherwise
 * the raw string renders as text.
 *
 * Icon names must match a key of lucide-react's `icons` export (PascalCase,
 * no `Icon` suffix), e.g. `KeyRound`, `ScrollText`, `FingerprintPattern`.
 */
export function resolveIcon(icon: ReactNode): ReactNode {
  if (typeof icon !== "string") return icon;
  const Icon = icons[icon as keyof typeof icons];
  if (!Icon) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[qeet-docs] Unknown lucide icon: "${icon}"`);
    }
    return null;
  }
  return createElement(Icon);
}
