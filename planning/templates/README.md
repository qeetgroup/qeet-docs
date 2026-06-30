# Page templates

Starting points for new docs pages. Copy a template into the right
`content/docs/<product>/` folder, rename it, and fill in the `{{TOKENS}}`.

These are authoring aids in `planning/` — they are **not** published (only
`content/docs/**` builds into the site).

| Template | Use for | Diátaxis type |
| --- | --- | --- |
| `quickstart.template.mdx` | Zero-to-working in numbered steps | Tutorial |
| `guide.template.mdx` | One specific task | How-to |
| `concept.template.mdx` | Explaining a model / primitive | Explanation |
| `api-page.template.mdx` | Hand-curated endpoint group | Reference |
| `component-block.template.mdx` | The repeated per-component block in qeetrix category pages | Reference |
| `overview-coming-soon.template.mdx` | A product that isn't fully shipped yet | Overview |

## How they fit the pipeline

1. `docs-architect` references these templates when writing an IA spec in `planning/specs/<slug>.md`.
2. `technical-writer` / `component-catalog-sync` instantiate them into `content/docs/**`.
3. `product-accuracy-reviewer` checks the result against `../STYLE-GUIDE.md`.

Always read `../STYLE-GUIDE.md` before authoring — especially the **Honesty ladder**.
