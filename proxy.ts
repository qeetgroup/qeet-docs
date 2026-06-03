import { NextRequest, NextResponse } from "next/server";
import { isMarkdownPreferred, rewritePath } from "fumadocs-core/negotiation";
import { docsContentRoute } from "@/lib/shared";

/**
 * Docs are rooted at `/` and split by product (`/id`, `/people`, `/logs`).
 * Match those product prefixes (never the bare `/` hub) and rewrite to the
 * raw-markdown route so `.md` suffixes and `Accept: text/markdown` resolve.
 */
const PRODUCT_SEGMENTS = "id,people,logs";

const { rewrite: rewriteDocs } = rewritePath(
  `/:product{/*path}`,
  `${docsContentRoute}/:product{/*path}/content.md`,
);
const { rewrite: rewriteSuffix } = rewritePath(
  `/:product{/*path}.md`,
  `${docsContentRoute}/:product{/*path}/content.md`,
);

function isProduct(pathname: string): boolean {
  const product = pathname.split("/")[1];
  return product ? PRODUCT_SEGMENTS.split(",").includes(product) : false;
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!isProduct(pathname)) return NextResponse.next();

  const suffix = rewriteSuffix(pathname);
  if (suffix) {
    return NextResponse.rewrite(new URL(suffix, request.nextUrl));
  }

  if (isMarkdownPreferred(request)) {
    const result = rewriteDocs(pathname);
    if (result) {
      return NextResponse.rewrite(new URL(result, request.nextUrl));
    }
  }

  return NextResponse.next();
}
