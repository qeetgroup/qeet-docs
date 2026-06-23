# qeet-docs `.claude/` — automation

> **👉 New here? Read [HOW-TO-RUN.md](HOW-TO-RUN.md).**

Two parts: a **docs-pm** that finds docs/IA gaps, and a **docs pipeline** that builds them — tailored to this repo (Next 16 + **Fumadocs 16** + Tailwind v4 + a **Vercel AI SDK** chat). The standout review is **product accuracy** (do the docs match the real products?), plus a dedicated **OpenAPI-sync** agent for the API reference.

## Pipeline (agents/)
Turns a `planning/DOCS-PROPOSALS.md` row into accurate, building docs. Full flow in **[PIPELINE.md](PIPELINE.md)**.

| Agent | Role |
|---|---|
| [`agents/docs-architect.md`](agents/docs-architect.md) | proposal → `planning/specs/<slug>.md` (`meta.json` nav + page list + Diátaxis). No writing. |
| [`agents/technical-writer.md`](agents/technical-writer.md) | author Fumadocs MDX, grounded in `../qeet-id`/`../qeetrix`; typecheck + build. |
| [`agents/api-reference-engineer.md`](agents/api-reference-engineer.md) ⭐ | sync `content/docs/id/api/*` to `../qeet-id/api/openapi.yaml`. |
| [`agents/ai-search-engineer.md`](agents/ai-search-engineer.md) | maintain `/api/chat` (Vercel AI SDK + OpenRouter + flexsearch). |
| [`agents/product-accuracy-reviewer.md`](agents/product-accuracy-reviewer.md) ⭐ | docs vs real products + build/link check. **Read-only.** |

## Find gaps (docs-pm)
| File | Role |
|---|---|
| [`agents/docs-pm.md`](agents/docs-pm.md) | docs-quality/IA research vs Stripe/Auth0/Clerk/Vercel docs → proposals |
| [`scripts/run-docs-pm.sh`](scripts/run-docs-pm.sh) | manual headless runner |
| [`scripts/Run qeet-docs PM.command`](scripts/) | double-click launcher |

**Outputs (in-repo, separate from published `content/docs`):** `planning/COMPETITIVE-INTEL.md` + `planning/DOCS-PROPOSALS.md`; architect specs in `planning/specs/`.

Reuse `/code-review`, `/verify`, `/simplify`, `code-architect`. Agents implement + run checks, but **don't commit/deploy** — you review & commit. (`.source/` is generated — never edited.)
