# Spec: Interactive API reference (Qeet ID) — completion runbook

**Status:** _Staged, not wired._ The vendored specs and this runbook are in place; the
remaining step is one dependency install + the wiring below. It was **not executed in the
authoring environment** because that environment's `node_modules` was linked from a
`v11`-layout pnpm store while the available pnpm binaries use a `v10`-layout store, so adding
packages requires a full `pnpm install` reinstall (which would refetch everything). Run the
steps below in an environment where `pnpm install` resolves cleanly.

## Goal

Replace the hand-curated Qeet ID endpoint pages (`content/docs/id/api/{users,tenants,roles,sessions}.mdx`)
with a generated, interactive **`fumadocs-openapi`** reference driven by the five vendored
specs in `content/specs/qeet-id/`, while **keeping** the narrative pages (`errors.mdx`,
`pagination.mdx`, and the conventions in `api/index.mdx`).

## Already staged (done)

- `content/specs/qeet-id/{auth,management,federation,developer,operations}.yaml` — vendored copies (+ `README.md`).
- `.prettierignore` excludes `content/specs/` and the generated `content/docs/id/api-reference/`.

## Step 1 — Install (mandatory fumadocs minor bump)

`fumadocs-openapi@11` requires `fumadocs-core`/`fumadocs-ui` `^16.10.0`; the repo is pinned at
`16.9.3`, so bump them together:

```bash
nvm use v22.20.0
pnpm add fumadocs-openapi@^11 fumadocs-ui@^16.10.7 fumadocs-core@^16.10.7
pnpm install            # if store relink is needed
pnpm typecheck          # confirm the 16.9.3 → 16.10.7 minor bump is clean BEFORE wiring
```

If pnpm reports `ERR_PNPM_UNEXPECTED_STORE`, reinstall once with the repo's pinned pnpm via
Corepack: `corepack pnpm install`, then retry the `add`.

## Step 2 — OpenAPI source object

Create `src/lib/openapi.ts`. **Verify the exact `createOpenAPI` options against the installed
`node_modules/fumadocs-openapi/dist/*.d.ts`** — the API has shifted across majors.

```ts
import { createOpenAPI } from "fumadocs-openapi/server";

export const openapi = createOpenAPI({
  // Override the localhost-only servers in the specs so the "Try it" console
  // targets production.
  // (Option name/shape per the installed fumadocs-openapi version.)
  proxyUrl: undefined,
});
```

## Step 3 — Generate script

Create `scripts/generate-openapi.mjs` (confirm `generateFiles` signature against the installed
types). Emit one sub-section per spec so the bounded-context split is preserved:

```js
import { generateFiles } from "fumadocs-openapi";

const specs = ["auth", "management", "federation", "developer", "operations"];

for (const name of specs) {
  await generateFiles({
    input: [`content/specs/qeet-id/${name}.yaml`],
    output: `content/docs/id/api-reference/${name}`,
    per: "tag",            // "tag" keeps page count sane (246 operations total)
    // groupBy / includeDescription / etc. per installed version
  });
}
```

Add to `package.json` scripts and chain it before `fumadocs-mdx`:

```jsonc
"generate:openapi": "node scripts/generate-openapi.mjs",
"predev": "pnpm generate:openapi",
"prebuild": "pnpm generate:openapi"
```

Run it: `pnpm generate:openapi` and inspect the generated MDX + `meta.json`.

## Step 4 — Register `APIPage` + CSS

In `src/components/mdx.tsx`, import and add `APIPage` to `getMDXComponents` (next to the
existing `APIEndpoint`):

```tsx
import { APIPage } from "fumadocs-openapi/ui";
// …in the returned object:
APIPage: (props) => <APIPage {...openapi.getAPIPageProps(props)} />,
```

In `src/app/global.css`, add the preset (Tailwind v4 layer):

```css
@import "fumadocs-openapi/css/preset.css";
```

## Step 5 — Nav + retire superseded pages

- In `content/docs/id/meta.json`, replace `"api"` in `pages` with `"api-reference"` (keep an
  overview/conventions link).
- Delete `content/docs/id/api/{users,tenants,roles,sessions}.mdx` (now generated). **Keep**
  `errors.mdx`, `pagination.mdx`, `index.mdx` — move them under `api-reference/` or cross-link.
- Keep `src/components/mdx/api-endpoint.tsx` — the retained narrative pages still use `<APIEndpoint>`.

## Step 6 — Verify

```bash
pnpm typecheck && pnpm check && pnpm build
pnpm dev   # visit /id/api-reference/... — schema tables + working "Try it" console
```

## Risks / gotchas

- The `16.9.3 → 16.10.7` bump is the riskiest step — isolate it and run the full gate first.
- 246 operations → use `per: "tag"` (not `"operation"`) to keep `generateStaticParams` and
  build time reasonable.
- Server URL: override to `https://api.id.qeet.in` (specs list only localhost).
- Re-run `pnpm generate:openapi` before `fumadocs-mdx` whenever specs change; never edit `.source/`.
- After this lands, fold the now-stale singular `../qeet-id/api/openapi.yaml` reference in
  `api-reference-engineer.md` / `release-coordinator.md` to the split `api/openapi/*.yaml` paths.
