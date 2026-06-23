# docs.qeet.in — docs delivery pipeline

How a docs gap becomes an accurate, building, searchable doc. The **docs-pm** finds gaps; this pipeline
builds them — grounded in the **real products** (the docs depend on them).

## The agents
| Stage | Agent | Output | Model |
|---|---|---|---|
| 0. Research | `docs-pm` | `planning/DOCS-PROPOSALS.md` | sonnet |
| 1. Plan (IA) | `docs-architect` | `planning/specs/<slug>.md` (`meta.json` nav + page list + Diátaxis) | opus |
| 2. Write | `technical-writer` | Fumadocs MDX in `content/docs/<product>/**` | sonnet |
| 2b. API ref | `api-reference-engineer` | `content/docs/id/api/*` synced to `../qeet-id/api/openapi.yaml` | sonnet |
| 2c. AI/search | `ai-search-engineer` | `/api/chat` + retrieval tuning | sonnet |
| 3. Accuracy ⭐ | `product-accuracy-reviewer` | docs vs real products + build/link check (read-only) | opus |

**Reuse (don't duplicate):** `/code-review` (route/TS code), `/verify` (run `next dev`/build), `/simplify`, `code-architect`. The specialized high-stakes review here is **product accuracy** — do the docs match what the products actually do?

## Flow
```
planning/DOCS-PROPOSALS.md
        │  pick one
        ▼
docs-architect ──► planning/specs/<slug>.md   (meta.json nav + page list)
        ▼
technical-writer  (+ api-reference-engineer for API pages, + ai-search-engineer if retrieval needs work)
        │   grounded in ../qeet-id, ../qeetrix, ../qeet-id/api/openapi.yaml
        ▼
product-accuracy-reviewer   (docs vs real products; pnpm check + typecheck + build)
        ▼
/code-review + /verify
        ▼
YOU: review the diff and commit
```

## How to run it
Open a session in `qeet-docs/`:
> "Flesh out the **Qeet ID webhooks** docs. Use **docs-architect** to plan the IA, then **technical-writer** to write them (grounded in ../qeet-id), then **api-reference-engineer** to sync any API pages, then **product-accuracy-reviewer** to verify. Stop before committing."

## Definition of done
- `pnpm check && pnpm typecheck && pnpm build` green (regenerates `.source/` via `fumadocs-mdx`)
- API reference matches `../qeet-id/api/openapi.yaml`; nav (`meta.json`) references real pages; no broken links
- **product-accuracy-reviewer**: no Critical/High inaccuracies
- **You** reviewed the diff — then commit (agents never commit/deploy)
