#!/bin/bash
# Double-click in Finder to run the docs.qeet.in docs-pm competitive sweep.
clear
echo "════════════════════════════════════════════════"
echo "   docs.qeet.in — Docs PM competitive sweep"
echo "════════════════════════════════════════════════"
echo
echo "What should it research?"
echo "   1) Everything  (all areas)             [default]"
echo "   2) Coverage / information architecture"
echo "   3) Getting-started / DX / examples"
echo "   4) API reference / search & AI"
echo
read -r -p "Type 1-4 then Enter (or just press Enter for 1): " choice
case "$choice" in
  2) FOCUS=coverage ;;
  3) FOCUS=dx ;;
  4) FOCUS=apiref ;;
  *) FOCUS=all ;;
esac
echo
bash "/Users/a3097640/Desktop/QG/qeet-docs/.claude/scripts/run-docs-pm.sh" "$FOCUS"
echo
read -r -p "All done — press Enter to close this window."
