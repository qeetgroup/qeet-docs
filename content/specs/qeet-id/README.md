# Vendored Qeet ID OpenAPI specs

These are **byte-faithful copies** of the five split OpenAPI 3.1 specs from the
`qeet-id` repo (`../qeet-id/api/openapi/*.yaml`), vendored here so the docs build is
**hermetic** — qeet-docs and qeet-id are separate git repos, so the docs build (CI / Vercel)
cannot reach a sibling repo path.

| File | Bounded context |
| --- | --- |
| `auth.yaml` | Access / authentication |
| `management.yaml` | Identity management |
| `federation.yaml` | Enterprise federation (SAML/SCIM/OIDC) |
| `developer.yaml` | Developer platform |
| `operations.yaml` | Operations |

## Refreshing

When the qeet-id API changes, re-copy and regenerate:

```bash
cp ../qeet-id/api/openapi/{auth,management,federation,developer,operations}.yaml content/specs/qeet-id/
pnpm generate:openapi   # see scripts/generate-openapi.mjs
```

The drift between these copies and qeet-id is exactly what the workspace
`release-coordinator` + `api-reference-engineer` agents watch.

> ⚠️ The source specs list only `localhost` servers. The generation step overrides the
> server to `https://api.id.qeet.in` so the interactive "Try it" console targets production.
> See `planning/specs/openapi-reference.md`.
