#!/usr/bin/env bash
# Manual runner for the docs.qeet.in docs-pm competitive-intelligence agent.
# Benchmarks our docs vs best-in-class and writes proposals into planning/.
# Run whenever you want (no schedule); or double-click "Run qeet-docs PM.command".
set -euo pipefail

QD="/Users/a3097640/Desktop/QG/qeet-docs"
CLAUDE_BIN="${CLAUDE_BIN:-/Users/a3097640/.local/bin/claude}"
MODEL="${PM_MODEL:-sonnet}"            # override with PM_MODEL=opus for a deeper run

# Optional focus arg: coverage | dx | apiref | all (default: all).
case "$(printf '%s' "${1:-}" | tr '[:upper:]' '[:lower:]')" in
  coverage|ia)            FOCUS="Coverage & information architecture (gaps vs peers, nav/Diátaxis)";;
  dx|getting-started|examples) FOCUS="Getting-started/DX & examples (quickstarts, snippets, guides)";;
  apiref|api|search|ai)  FOCUS="API-reference quality & search/AI assistant";;
  ""|all)                FOCUS="ALL areas in one light pass: coverage/IA, getting-started/DX, API-reference + search/AI";;
  *)                     FOCUS="${1}";;
esac

LOGDIR="$QD/.claude/logs"; mkdir -p "$LOGDIR"
LOG="$LOGDIR/run-$(date +%Y%m%d-%H%M%S).log"

PROMPT="Use the docs-pm subagent to run a competitive-intelligence sweep for docs.qeet.in. Focus: ${FOCUS}.
First read content/docs/ and the meta.json nav files to dedupe against pages that already exist, then research best-in-class docs for that focus and update planning/COMPETITIVE-INTEL.md and planning/DOCS-PROPOSALS.md exactly per your output contract. Cite primary sources. Only propose documenting capabilities that the products plausibly have (flag for verification). If nothing material changed, say so and add nothing."

cd "$QD"                                # cwd = repo so the docs-pm agent is discovered
echo "=== docs-pm run $(date '+%Y-%m-%d %H:%M:%S %Z') (focus=${FOCUS%% (*}, model=$MODEL) ===" >> "$LOG"

TOOLS="WebSearch,WebFetch,Read,Grep,Glob,Write,Edit,Bash"
if [ -t 1 ]; then
  echo "Researching '${FOCUS%% (*}' — this takes a few minutes. Leave this window open…"; echo
  "$CLAUDE_BIN" -p "$PROMPT" --model "$MODEL" --permission-mode acceptEdits --verbose \
    --allowedTools "$TOOLS" 2>&1 | tee -a "$LOG"
  echo
  echo "✅ Done. Proposals written to: $QD/planning/DOCS-PROPOSALS.md"
else
  exec "$CLAUDE_BIN" -p "$PROMPT" --model "$MODEL" --permission-mode acceptEdits \
    --allowedTools "$TOOLS" >> "$LOG" 2>&1
fi
