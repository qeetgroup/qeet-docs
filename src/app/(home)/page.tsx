import {
  ArrowRightIcon,
  BellRingIcon,
  BlocksIcon,
  BookOpenIcon,
  CommandIcon,
  ComponentIcon,
  CreditCardIcon,
  FingerprintIcon,
  KeyRoundIcon,
  type LucideIcon,
  PaletteIcon,
  ScrollTextIcon,
  SearchIcon,
  ShieldCheckIcon,
  SparklesIcon,
  TerminalIcon,
  UsersIcon,
  WebhookIcon,
  ZapIcon,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { BorderBeam } from "@/components/effects/border-beam";
import { CyclingText } from "@/components/effects/cycling-text";
import { HeroLightfall } from "@/components/effects/hero-lightfall";
import { NumberTicker } from "@/components/effects/number-ticker";
import { Ripple } from "@/components/effects/ripple";
import { WordReveal } from "@/components/effects/word-reveal";
import { cn } from "@/lib/cn";
import { dashboardUrl, productUrl } from "@/lib/shared";

export default function HomePage() {
  return (
    <main className="relative isolate">
      <Hero />
      <Products />
      <StartHere />
      <Build />
      <ClosingCTA />
    </main>
  );
}

/* ===== Hero ===== */

const SEARCH_QUERIES = [
  "How do I add MFA?",
  "Configure SAML SSO",
  "WebAuthn passkeys",
  "Install @qeetrix/ui",
  "Query logs by tenant",
  "Provision a new hire",
  "Webhook signatures",
];

const HERO_METRICS = [
  { label: "products", value: 6, suffix: "" },
  { label: "SDKs", value: 8, suffix: "" },
  { label: "regions", value: 32, suffix: "" },
];

function Hero() {
  return (
    <section className="relative isolate grid min-h-[calc(100svh-3.5rem)] place-items-center overflow-hidden border-fd-border border-b bg-fd-background">
      <HeroBackground />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-6 py-20 text-center">
        <Link
          href="/qeetrix"
          className="group inline-flex max-w-full items-center gap-2 rounded-full border border-fd-border bg-fd-background/80 py-1 pr-3 pl-1 font-medium text-fd-muted-foreground text-xs shadow-sm backdrop-blur transition-colors hover:border-brand-500/40 hover:text-fd-foreground"
        >
          <span className="inline-flex items-center gap-1 rounded-full bg-brand-500 px-2 py-0.5 font-semibold text-[10px] text-brand-foreground uppercase">
            <SparklesIcon className="size-2.5" /> new
          </span>
          <span className="truncate">Qeetrix design system docs are live</span>
          <ArrowRightIcon className="size-3 transition-transform group-hover:translate-x-0.5" />
        </Link>

        <h1 className="mt-7 max-w-4xl text-balance font-semibold text-4xl leading-[1.02] tracking-tight sm:text-6xl sm:leading-[0.98] lg:text-7xl">
          <WordReveal
            lines={[
              [{ text: "Documentation" }],
              [{ text: "for the" }, { text: "entire", gradient: true }],
              [{ text: "Qeet platform." }],
            ]}
          />
        </h1>

        <p className="mt-6 max-w-2xl text-balance text-base text-fd-muted-foreground leading-8 sm:text-lg">
          Identity, design, people, logs, notifications, and payments — one home
          for every product. Guides, API reference, SDKs, and operational
          playbooks, all searchable in one place.
        </p>

        <div className="mt-9 grid w-full max-w-2xl gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
          <Link
            href="/id"
            className="group relative flex min-h-14 items-center gap-3 overflow-hidden rounded-lg border border-fd-border bg-fd-card/95 px-4 text-left backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-brand-500/40"
          >
            <SearchIcon className="size-5 shrink-0 text-fd-muted-foreground transition-colors group-hover:text-brand-text" />
            <span className="flex min-w-0 flex-1 items-baseline gap-2">
              <span className="text-fd-muted-foreground text-sm">Search</span>
              <span className="truncate font-medium text-fd-foreground text-sm sm:text-base">
                <CyclingText items={SEARCH_QUERIES} />
              </span>
            </span>
            <kbd className="inline-flex shrink-0 items-center gap-1 rounded-md border border-fd-border bg-fd-muted px-2 py-1 font-medium font-mono text-[11px] text-fd-muted-foreground">
              <CommandIcon className="size-3" /> K
            </kbd>
          </Link>

          <Link
            href="/id/quickstart"
            className="inline-flex min-h-14 items-center justify-center gap-2 rounded-lg bg-brand-500 px-5 font-medium text-brand-foreground text-sm shadow-brand-500/25 shadow-lg transition-all hover:-translate-y-0.5 hover:bg-brand-600"
          >
            Start building <ArrowRightIcon className="size-4" />
          </Link>
        </div>

        <div className="mt-10 grid w-full max-w-md grid-cols-3 gap-2">
          {HERO_METRICS.map((metric) => (
            <div
              key={metric.label}
              className="rounded-lg border border-fd-border bg-fd-background/65 px-4 py-3 backdrop-blur"
            >
              <p className="font-semibold text-fd-foreground text-lg">
                <NumberTicker value={metric.value} suffix={metric.suffix} />
              </p>
              <p className="mt-0.5 font-mono text-[11px] text-fd-muted-foreground">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HeroBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-fd-background)_0%,color-mix(in_oklab,var(--brand-500)_8%,var(--color-fd-background))_50%,var(--color-fd-background)_100%)]" />
      <div className="absolute inset-0 animate-hero-grid opacity-[0.22] [background-image:linear-gradient(to_right,color-mix(in_oklab,var(--color-fd-border)_70%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--color-fd-border)_70%,transparent)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_0%,transparent_72%)]" />
      <div className="absolute top-1/3 left-1/2 size-[36rem] -translate-x-1/2 animate-aurora-slow rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--brand-500)_18%,transparent),transparent_62%)] blur-3xl dark:opacity-0" />
      {/* Ripple — light mode only (Lightfall takes over in dark mode). */}
      <Ripple
        className="opacity-90 dark:hidden [mask-image:radial-gradient(ellipse_at_center,black_24%,transparent_72%)]"
        mainCircleOpacity={0.3}
        mainCircleSize={320}
        numCircles={9}
      />
      <HeroLightfall />
    </div>
  );
}

/* ===== Product hub ===== */

type Product = {
  name: string;
  tag: ReactNode;
  href: string;
  icon: LucideIcon;
  body: string;
  live: boolean;
  links?: { label: string; href: string }[];
};

const products: Product[] = [
  {
    name: "Qeet ID",
    tag: <span className="text-emerald-600 dark:text-emerald-400">Live</span>,
    href: "/id",
    icon: FingerprintIcon,
    body: "Sign-in, sessions, passkeys, SSO, RBAC, and audit — the identity layer for everything else.",
    live: true,
    links: [
      { label: "Quickstart", href: "/id/quickstart" },
      { label: "API reference", href: "/id/api" },
      { label: "SDKs", href: "/id/sdks" },
    ],
  },
  {
    name: "Qeetrix",
    tag: <span className="text-emerald-600 dark:text-emerald-400">Live</span>,
    href: "/qeetrix",
    icon: ComponentIcon,
    body: "The shared design system — tokens, a React component library, and brand assets, on Tailwind v4.",
    live: true,
    links: [
      { label: "Installation", href: "/qeetrix/installation" },
      { label: "Components", href: "/qeetrix/components" },
      { label: "Theming", href: "/qeetrix/theming" },
    ],
  },
  {
    name: "Qeet People",
    tag: "Coming soon",
    href: "/people",
    icon: UsersIcon,
    body: "Human capital management — directory, org structure, and lifecycle, sharing one identity graph with Qeet ID.",
    live: false,
  },
  {
    name: "Qeet Logs",
    tag: "Coming soon",
    href: "/logs",
    icon: ScrollTextIcon,
    body: "Privacy-first, multi-tenant log management — query at scale with every line attributable through Qeet ID.",
    live: false,
  },
  {
    name: "Qeet Notify",
    tag: "Coming soon",
    href: "/notify",
    icon: BellRingIcon,
    body: "Multi-channel notifications — email, SMS, WhatsApp, push, and in-app from one multi-tenant API.",
    live: false,
  },
  {
    name: "Qeet Pay",
    tag: "Coming soon",
    href: "/pay",
    icon: CreditCardIcon,
    body: "Unified payments, billing, payouts, and GST-compliant invoicing — built India-first for SaaS.",
    live: false,
  },
];

function Products() {
  return (
    <section
      aria-labelledby="products-heading"
      className="border-fd-border border-b bg-fd-muted/30"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-semibold text-brand-text text-xs uppercase tracking-widest">
            One platform
          </p>
          <h2
            id="products-heading"
            className="mt-2 text-balance font-semibold text-3xl tracking-tight sm:text-4xl"
          >
            Pick a product to dive in
          </h2>
          <p className="mt-4 text-balance text-fd-muted-foreground">
            Two products are live today; the rest are in design. Each shares one
            identity graph, one design system, and one set of docs.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              aria-label={`${p.name} docs`}
              className={cn(
                "group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-fd-border bg-fd-card p-7 transition-all hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-brand-500/10 hover:shadow-xl",
                !p.live && "opacity-95",
              )}
            >
              {p.live && <BorderBeam size={220} duration={8} />}
              <span
                aria-hidden
                className="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-gradient-to-br from-brand-500/30 to-transparent opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-90"
              />
              <div className="relative flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-xl bg-brand-500/10 text-brand-text">
                  <p.icon className="size-6" />
                </span>
                <span
                  className={cn(
                    "rounded-full border border-fd-border bg-fd-background/70 px-2.5 py-1 font-medium font-mono text-[11px]",
                    p.live ? "" : "text-fd-muted-foreground",
                  )}
                >
                  {p.tag}
                </span>
              </div>
              <div className="relative">
                <h3 className="font-semibold text-xl tracking-tight">
                  {p.name}
                </h3>
                <p className="mt-2 text-fd-muted-foreground text-sm leading-relaxed">
                  {p.body}
                </p>
              </div>
              {p.links ? (
                <div className="relative mt-auto flex flex-wrap gap-2">
                  {p.links.map((l) => (
                    <span
                      key={l.href}
                      className="rounded-md border border-fd-border/70 bg-fd-background/70 px-2.5 py-1 font-medium font-mono text-[11px] text-fd-foreground/80 transition-colors group-hover:border-brand-500/30"
                    >
                      {l.label}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="relative mt-auto inline-flex items-center gap-1 font-medium text-brand-text text-xs">
                  Preview the docs
                  <ArrowRightIcon className="size-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Start here / popular guides ===== */

type Guide = { title: string; body: string; href: string; kbd: string };

const popularGuides: Guide[] = [
  {
    title: "Quickstart",
    body: "Ship a working sign-in flow in under 15 minutes.",
    href: "/id/quickstart",
    kbd: "01",
  },
  {
    title: "Authentication",
    body: "Sign-in, sign-up, passkeys, magic links, and social providers.",
    href: "/id/authentication",
    kbd: "02",
  },
  {
    title: "SDKs",
    body: "Type-safe clients for TypeScript, React, Go, and Python.",
    href: "/id/sdks",
    kbd: "03",
  },
  {
    title: "Install Qeetrix",
    body: "Add @qeetrix/ui and wire up Tailwind CSS v4.",
    href: "/qeetrix/installation",
    kbd: "04",
  },
];

function StartHere() {
  return (
    <section
      aria-labelledby="start-heading"
      className="border-fd-border border-b bg-fd-background"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="font-semibold text-brand-text text-xs uppercase tracking-widest">
              Start here
            </p>
            <h2
              id="start-heading"
              className="mt-2 text-balance font-semibold text-3xl tracking-tight sm:text-4xl"
            >
              Popular guides
            </h2>
          </div>
          <Link
            href="/id"
            className="inline-flex w-fit items-center gap-1 font-medium text-brand-text text-sm transition-colors hover:text-brand-600"
          >
            Browse all Qeet ID docs
            <ArrowRightIcon className="size-3.5" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {popularGuides.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="group flex h-full flex-col gap-3 rounded-2xl border border-fd-border bg-fd-card p-6 transition-all hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-brand-500/10 hover:shadow-lg"
            >
              <span
                aria-hidden
                className="font-mono text-brand-text/70 text-sm tracking-widest"
              >
                {g.kbd}
              </span>
              <span className="flex items-center gap-1 font-semibold text-base">
                {g.title}
                <ArrowRightIcon className="size-3.5 text-fd-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </span>
              <span className="text-fd-muted-foreground text-sm leading-relaxed">
                {g.body}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== What you can build ===== */

type Capability = {
  icon: LucideIcon;
  title: string;
  body: string;
  href: string;
};

const capabilities: Capability[] = [
  {
    icon: KeyRoundIcon,
    title: "Passwordless sign-in",
    body: "Passkeys and magic links with WebAuthn, no passwords to store or leak.",
    href: "/id/authentication/passkeys",
  },
  {
    icon: ShieldCheckIcon,
    title: "Step-up MFA",
    body: "TOTP, recovery codes, and risk-based challenges on sensitive actions.",
    href: "/id/mfa",
  },
  {
    icon: UsersIcon,
    title: "Multi-tenant RBAC",
    body: "Model tenants, roles, and permissions that scale with your org.",
    href: "/id/rbac",
  },
  {
    icon: WebhookIcon,
    title: "Event-driven flows",
    body: "Signed webhooks for every identity event, verified end to end.",
    href: "/id/webhooks",
  },
  {
    icon: BlocksIcon,
    title: "On-brand UI",
    body: "Drop in accessible Qeetrix components themed to your product.",
    href: "/qeetrix/components",
  },
  {
    icon: PaletteIcon,
    title: "A shared design language",
    body: "Tokens, dark mode, and brand consistent across every surface.",
    href: "/qeetrix/theming",
  },
];

function Build() {
  return (
    <section
      aria-labelledby="build-heading"
      className="border-fd-border border-b bg-fd-muted/30"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-semibold text-brand-text text-xs uppercase tracking-widest">
            What you can build
          </p>
          <h2
            id="build-heading"
            className="mt-2 text-balance font-semibold text-3xl tracking-tight sm:text-4xl"
          >
            From auth to UI, by topic
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group flex h-full items-start gap-4 rounded-2xl border border-fd-border bg-fd-card p-6 transition-all hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-brand-500/10 hover:shadow-lg"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-500/10 text-brand-text">
                <c.icon className="size-5" />
              </span>
              <span className="flex flex-col gap-1">
                <span className="flex items-center gap-1 font-semibold text-base">
                  {c.title}
                  <ArrowRightIcon className="size-3.5 text-fd-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </span>
                <span className="text-fd-muted-foreground text-sm leading-relaxed">
                  {c.body}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Closing CTA ===== */

type Resource = { icon: LucideIcon; title: string; body: string; href: string };

const resources: Resource[] = [
  {
    icon: ZapIcon,
    title: "Quickstart",
    body: "Ship a working sign-in flow in under 15 minutes.",
    href: "/id/quickstart",
  },
  {
    icon: TerminalIcon,
    title: "API reference",
    body: "Every endpoint, with copy-paste examples.",
    href: "/id/api",
  },
  {
    icon: BookOpenIcon,
    title: "Concepts",
    body: "The mental model behind the platform.",
    href: "/id/concepts",
  },
];

function ClosingCTA() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="relative isolate overflow-hidden bg-fd-background"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-px bg-gradient-to-r from-transparent via-brand-500/40 to-transparent"
      />
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1fr_2fr] lg:py-24">
        <div className="flex flex-col gap-3">
          <p className="font-semibold text-brand-text text-xs uppercase tracking-widest">
            Get started
          </p>
          <h2
            id="cta-heading"
            className="font-semibold text-3xl tracking-tight"
          >
            From zero to shipped
          </h2>
          <p className="text-fd-muted-foreground">
            Qeet ID and Qeetrix are live today. Start here, then bring People,
            Logs, Notify, and Pay online as they ship.
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            <Link
              href="/id/quickstart"
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-brand-500 px-5 py-2.5 font-medium text-brand-foreground text-sm shadow-brand-500/25 shadow-lg transition-all hover:-translate-y-0.5 hover:bg-brand-600"
            >
              Open the quickstart <ArrowRightIcon className="size-4" />
            </Link>
            <a
              href={dashboardUrl}
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-fd-border bg-fd-card px-5 py-2.5 font-medium text-fd-foreground text-sm transition-all hover:-translate-y-0.5 hover:border-brand-500/40"
            >
              Go to dashboard
            </a>
          </div>
          <a
            href={productUrl}
            className="mt-1 inline-flex w-fit items-center gap-1 text-fd-muted-foreground text-sm transition-colors hover:text-brand-text"
          >
            Visit qeet.in
            <ArrowRightIcon className="size-3.5" />
          </a>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {resources.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="group flex flex-col gap-3 rounded-2xl border border-fd-border bg-fd-card p-5 transition-all hover:-translate-y-0.5 hover:border-brand-500/40"
            >
              <span className="grid size-10 place-items-center rounded-lg bg-brand-500/10 text-brand-text">
                <r.icon className="size-5" />
              </span>
              <span className="flex items-center gap-1 font-medium text-sm">
                {r.title}
                <ArrowRightIcon className="size-3 text-fd-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </span>
              <span className="text-fd-muted-foreground text-xs leading-relaxed">
                {r.body}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
