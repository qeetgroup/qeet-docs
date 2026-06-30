# qeet-docs — CLAUDE.md

**qeet-docs** — the Qeet Group documentation platform served at `docs.qeet.in`. One site documents every product: `/id`, `/logs`, `/notify`, `/pay`, `/people`, `/qeetrix` (all six sections have live content under `content/docs/`). Next.js 16.2.6 App Router + [Fumadocs](https://fumadocs.dev) 16 (core 16.9.3 / mdx 15.0.10 / ui 16.9.3), React 19.2.6, Tailwind 4.3.0, with an AI doc-chat via the Vercel AI SDK + OpenRouter. Consumes the shared `@qeetrix/ui` + `@qeetrix/brand` design system.

## Commands (`cd qeet-docs`)

Node ≥20.9 — run `nvm use v22.20.0` first (default shell node is v18). pnpm.

```bash
pnpm install
pnpm dev          # next dev (App Router)
pnpm build && pnpm start
pnpm typecheck    # fumadocs-mdx && next typegen && tsc --noEmit
pnpm lint
pnpm format       # prettier --write
pnpm check        # eslint + prettier --check (CI gate)
```

`postinstall` runs `fumadocs-mdx` to generate the content source — re-run `pnpm install` (or `pnpm exec fumadocs-mdx`) after adding/renaming MDX so `.source/` regenerates.

## Architecture

Fumadocs site. Documentation is **MDX under [content/docs/](content/docs/)**, one folder per product (`id/`, `logs/`, `notify/`, `pay/`, `people/`, `qeetrix/`); [source.config.ts](source.config.ts) defines the frontmatter schema and Fumadocs MDX options, and the generated content source lives in `.source/`. App Router code is in [src/app/](src/app/) (landing/home group, the `docs` layout, and `app/api/search` for client search via `flexsearch`), with shared UI in [src/components/](src/components/) and helpers in [src/lib/](src/lib/). [proxy.ts](proxy.ts) handles request proxying. Adding docs = adding an MDX file under the right `content/docs/<product>/` folder with the frontmatter shape Fumadocs expects. AI doc-chat uses `@ai-sdk/react` + `@openrouter/ai-sdk-provider`; motion via `motion` + `lenis`, plus an `ogl` WebGL accent.

## Gotchas

- **Secrets on disk — never read, print, or commit:** `.env.local` (gitignored) and a live private key `qeet-id_backend_api_key.pem` at the repo root (gitignored via `*.pem`). Copy `.env.example` for new keys.
- **Next.js 16 / Fumadocs 16 are newer than training data** — verify App Router + Fumadocs APIs against installed `node_modules` before writing code, don't assume older patterns.
- **Design-system deps are pre-consolidation:** still on `@qeetrix/ui@^0.1.0` + separate `@qeetrix/brand@^0.0.1` (plus `@qeetrix/eslint-config`, `@qeetrix/tsconfig`). Both old npm packages stay installable, so this is **not** broken today. When Qeetrix publishes `@qeetrix/ui@0.4.0` (brand folded into `@qeetrix/ui/brand`), bump `@qeetrix/ui` and drop the standalone `@qeetrix/brand` — best run via the **release-coordinator** agent.
