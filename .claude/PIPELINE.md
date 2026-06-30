# docs.qeet.in — docs delivery pipeline

How a docs gap becomes an accurate, building, searchable doc. The **docs-pm** finds gaps; this pipeline
builds them — grounded in the **real products** (the docs depend on them).

## The agents
| Stage | Agent | Output | Model |
|---|---|---|---|
| -1. Drift detect | `docs-sync-coordinator` *(QG root)* | drift report + build-ready IA delta for one product (read-only) | opus |
| 0. Research | `docs-pm` | `planning/DOCS-PROPOSALS.md` | sonnet |
| 1. Plan (IA) | `docs-architect` | `planning/specs/<slug>.md` (`meta.json` nav + page list + Diátaxis) | opus |
| 2. Write | `technical-writer` | Fumadocs MDX in `content/docs/<product>/**` | sonnet |
| 2b. API ref | `api-reference-engineer` | `content/docs/id/api/*` synced to `../qeet-id/api/openapi/*.yaml` | sonnet |
| 2d. Components | `component-catalog-sync` | `content/docs/qeetrix/components/**` synced to `../qeetrix` exports | opus |
| 2c. AI/search | `ai-search-engineer` | `/api/chat` + retrieval tuning | sonnet |
| 3. Accuracy ⭐ | `product-accuracy-reviewer` | docs vs real products + build/link check (read-only) | opus |

## Stage -1: cross-repo drift detection (manual)
`docs-sync-coordinator` lives at the **QG root** (not here) and is the **pull/detection layer**: invoke it by hand with a product name when another product ships something. It reads that product's source of truth, diffs against `content/docs/<product>/`, and emits a drift report + an IA delta that feeds Stage 1 — it writes no docs itself. It defers qeet-id OpenAPI drift to `release-coordinator`/`api-reference-engineer` and qeetrix component drift to `component-catalog-sync`. Complements `docs-pm` (which finds *competitive* gaps) and `qeet-id/docs-writer` (the *push* path from qeet-id).

**Reuse (don't duplicate):** `/code-review` (route/TS code), `/verify` (run `next dev`/build), `/simplify`, `code-architect`. The specialized high-stakes review here is **product accuracy** — do the docs match what the products actually do?

## Flow
```
docs-sync-coordinator <product>   (from QG root — "what did this product ship that docs missed?")
        │  drift report + IA delta
        ▼                          ┌─ OR ─ planning/DOCS-PROPOSALS.md (competitive gaps) ─┐
        │                          │  pick one                                            │
        ▼                          ▼                                                      │
docs-architect ──► planning/specs/<slug>.md   (meta.json nav + page list)  ◄──────────────┘
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
**Detect drift first (optional, from the QG root):**
> "Use **docs-sync-coordinator** to sync the **notify** docs — read qeet-notify's code + OpenAPI + PRD, diff against qeet-docs/content/docs/notify, and give me the drift report + IA delta. Don't write anything."

**Then build, in a session in `qeet-docs/`:**
> "Flesh out the **Qeet ID webhooks** docs. Use **docs-architect** to plan the IA, then **technical-writer** to write them (grounded in ../qeet-id), then **api-reference-engineer** to sync any API pages, then **product-accuracy-reviewer** to verify. Stop before committing."

**Sync the qeetrix component catalog:**
> "Use **component-catalog-sync** to reconcile the qeetrix catalog against @qeetrix/ui and update the category pages. Run typecheck + build. Don't commit."

## Definition of done
- `pnpm check && pnpm typecheck && pnpm build` green (regenerates `.source/` via `fumadocs-mdx`)
- API reference matches `../qeet-id/api/openapi.yaml`; nav (`meta.json`) references real pages; no broken links
- **product-accuracy-reviewer**: no Critical/High inaccuracies
- **You** reviewed the diff — then commit (agents never commit/deploy)
