import type { Metadata } from "next";
import { RootProvider } from "fumadocs-ui/provider/next";
import { Fira_Code } from "next/font/google";
import "./global.css";

/**
 * Theme-aware favicons: the browser picks the SVG that matches its UI scheme.
 * `icon-light.svg` is the dark-artwork mark (for light tabs); `icon-dark.svg`
 * is the light/white-artwork mark (for dark tabs). The last entry (no media)
 * is the fallback for browsers that ignore favicon media queries.
 */
export const metadata: Metadata = {
  title: {
    default: "Qeet Docs — documentation for the entire Qeet platform",
    template: "%s — Qeet Docs",
  },
  description:
    "Guides, API reference, SDKs, and operational playbooks for every Qeet product — identity, design system, people, logs, notifications, and payments.",
  icons: {
    icon: [
      {
        url: "/icon-light.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: dark)",
      },
      { url: "/icon-light.svg", type: "image/svg+xml" },
    ],
    apple: { url: "/icon-light.svg", type: "image/svg+xml" },
  },
};

/**
 * Fira Code is loaded from Google because @qeetrix/ui mis-defines `--font-mono`
 * as 'Cal Sans Text' (not a real monospace). This variable wins over the package
 * default in global.css.
 */
const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
});

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={firaCode.variable} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
