# How to use the docs.qeet.in agents

Two stages:
1. **Find gaps** — the **docs-pm** agent benchmarks our docs vs the best (Stripe, Auth0, Clerk, Vercel…) and writes proposals. → **Part 1**.
2. **Build docs** — a pipeline writes accurate, building docs grounded in the real products. → **Part 2** (you chat with Claude).

Outputs (in-repo, separate from published `content/docs`):
- `planning/COMPETITIVE-INTEL.md` — research log
- `planning/DOCS-PROPOSALS.md` — prioritized backlog
- `planning/specs/<slug>.md` — IA/doc plans

═══════════════════════════════════════════════════════════════

# Part 1 — Find gaps (docs-pm)

## ⭐ Double-click (no typing)
1. Finder → `Desktop → QG → qeet-docs → .claude → scripts` (press **⌘ + Shift + .** to show hidden folders).
2. Double-click **`Run qeet-docs PM.command`** → pick a focus (or Enter) → wait a few minutes.
3. First time: macOS may ask → **right-click → Open → Open** (once).

## Or one line in Terminal
```bash
bash ~/Desktop/QG/qeet-docs/.claude/scripts/run-docs-pm.sh
# focus: coverage | dx | apiref   ·   deeper: PM_MODEL=opus bash …/run-docs-pm.sh
open ~/Desktop/QG/qeet-docs/planning/DOCS-PROPOSALS.md
```

═══════════════════════════════════════════════════════════════

# Part 2 — Build docs (the pipeline)

You **chat with Claude** (no script). Full flow: [PIPELINE.md](PIPELINE.md).

```bash
cd ~/Desktop/QG/qeet-docs
claude
```
Then, e.g.:
> Flesh out the **Qeet ID webhooks** docs. Use **docs-architect** to plan the IA, then
> **technical-writer** to write them grounded in ../qeet-id, then **api-reference-engineer** to sync
> any API pages against the OpenAPI spec, then **product-accuracy-reviewer** to verify. Stop before
> committing so I can review.

| Agent | Does |
|---|---|
| **docs-architect** | the IA plan → `planning/specs/<slug>.md` (no writing) |
| **technical-writer** | writes the MDX docs (grounded in the real products) |
| **api-reference-engineer** | keeps the API reference matching qeet-id's OpenAPI spec |
| **ai-search-engineer** | the docs AI chat / search |
| **product-accuracy-reviewer** | checks the docs are true to the products + builds clean |

**Important:** agents **don't commit or deploy** — they leave changes for your review. `.source/` is auto-generated — never edit it. You don't need to memorize names: *"flesh out the webhooks docs end to end and stop before committing"* works.

## If the Part 1 script fails
- **`Operation not permitted`** → grant macOS **Full Disk Access** to `/bin/bash` + `/Users/a3097640/.local/bin/claude` (System Settings → Privacy & Security).
- **Log:** `ls -t ~/Desktop/QG/qeet-docs/.claude/logs/run-*.log | head -1 | xargs cat`
