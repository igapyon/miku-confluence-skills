---
title: miku-confluence agent workflow
description: Safe execution sequence for metadata, offline, live read-only, and reviewed live-write operations.
topics:
  - miku-confluence
  - workflow
  - confluence-cloud
  - review
  - safety
---

# Confluence Workflow

## 1. Establish the operation

Resolve the user request to an exact upstream operation. When uncertain, use
`operations list` and `operations describe`; do not guess an operation name or
input schema.

Classify it as metadata, offline/local, live read-only, or live write. State the
classification before execution when credentials, network, or Confluence state
will be accessed.

## 2. Prepare explicit input

Use one UTF-8 JSON object. Prefer a caller-selected file when the input or
output is material. Keep page IDs, space IDs, paths, limits, permission, and
output directories explicit.

Do not place credentials in request JSON. The live runtime reads these
environment variables:

- `MIKU_CONFLUENCE_BASE_URL`
- `MIKU_CONFLUENCE_EMAIL`
- `MIKU_CONFLUENCE_API_TOKEN`

Do not print or summarize their values.

## 3. Metadata and offline work

Metadata commands require no credentials or network. Offline prepare,
inspection, and snapshot conversion workflows must remain local when the
runtime catalog declares them local-only.

Inspect the exit status, JSON envelope, artifacts, and diagnostics. A local
plan is review evidence; it does not authorize a later live apply.

## 4. Live read-only work

Require an explicit operation and target. Check that the operation requires
only `READ`. Keep request limits bounded for subtree export, pagination, and
attachments. Report output paths and warning counts without pasting sensitive
page bodies by default.

## 5. Prepare and review live writes

Prefer the paired prepare/apply workflow when one exists:

1. create an immutable plan offline
2. inspect candidate artifacts, target IDs, required permission, and plan digest
3. show the concise review result to the user
4. stop unless the user explicitly asks to apply that exact reviewed plan

For faithful `api.v2.createPage` or `api.v2.updatePage`, use `--dry-run` before
an actual request and review its sanitized result.

## 6. Apply an explicitly approved write

Reconfirm all of these from unchanged reviewed evidence:

- exact operation
- exact target page/space or immutable plan directory
- expected plan digest when applicable
- `CREATE` or `UPDATE` permission
- explicit user request to perform the live write

Only then pass the matching `--allow` value and `--confirm-destructive`. Execute
once. Inspect postcondition evidence. Do not retry automatically, switch target,
merge content, or repair a failed write by guessing.

## 7. Report the result

Return a concise summary containing:

- operation and classification
- runtime success/failure
- created artifacts or affected target identifiers
- diagnostics and warnings
- whether the write was applied, not applied, or remains pending review

Keep the upstream result JSON and filesystem artifacts available for inspection.
