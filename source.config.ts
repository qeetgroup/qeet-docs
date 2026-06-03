import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import { metaSchema, pageSchema } from "fumadocs-core/source/schema";
import { rehypeCodeDefaultOptions } from "fumadocs-core/mdx-plugins";

// You can customize Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections
export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: pageSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    // Emit `language-*` on the <code> so our enhanced <pre> can show a
    // language badge while keeping fumadocs' Shiki highlighting intact.
    rehypeCodeOptions: {
      ...rehypeCodeDefaultOptions,
      addLanguageClass: true,
    },
  },
});
