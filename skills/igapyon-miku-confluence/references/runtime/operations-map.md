---
title: miku-confluence v0.4.0 operations map
description: Agent-facing mapping of miku-confluence CLI operations, permissions, confirmations, and artifacts.
topics:
  - miku-confluence
  - operations
  - permissions
  - cli
  - diagnostics
---

# Operations Map

The bundled runtime is the source of truth. Use `operations list` for the full
machine-readable catalog and `operations describe <operation>` for the exact
input schema.

## Metadata commands

| Purpose | CLI | Credentials/network |
| --- | --- | --- |
| Version | `--version` | none |
| Help | `--help` | none |
| Catalog | `operations list` | none |
| Schema and policy | `operations describe <operation>` | none |

## Workflow operations

| Operation | Role | Permission | Live write |
| --- | --- | --- | --- |
| `page.export-subtree` | Confluence subtree to filesystem snapshot | `READ` | no |
| `snapshot.export-markdown` | finalized snapshot to offline Markdown view | `READ` | no |
| `page.inspect-markdown-preservation` | local preservation and block mapping report | `READ` | no |
| `page.prepare-markdown-update` | local immutable update plan | `READ` | no |
| `page.apply-markdown-update` | apply reviewed update plan | `UPDATE` | yes |
| `page.prepare-markdown-create` | local immutable child-page create plan | `READ` | no |
| `page.apply-markdown-create` | apply reviewed child-page create plan | `CREATE` | yes |
| `snapshot.prepare-import` | local immutable subtree import plan | `READ` | no |
| `snapshot.apply-import` | create reviewed snapshot subtree | `CREATE` | yes |

Every live-write workflow requires both the matching `--allow` value and
`--confirm-destructive`. Apply workflows also require the exact plan digest in
their JSON input. Never infer or reconstruct that digest.

## Faithful REST API v2 operations

Implemented live read operations in `v0.4.0`:

- `api.v2.getAttachmentById`
- `api.v2.getAttachmentLabels`
- `api.v2.getBlogPostById`
- `api.v2.getBlogPostLabels`
- `api.v2.getBlogPosts`
- `api.v2.getCustomContentById`
- `api.v2.getCustomContentByType`
- `api.v2.getLabelAttachments`
- `api.v2.getLabelBlogPosts`
- `api.v2.getLabelPages`
- `api.v2.getLabels`
- `api.v2.getPageAttachments`
- `api.v2.getPageById`
- `api.v2.getPageDirectChildren`
- `api.v2.getPageLabels`
- `api.v2.getPages`
- `api.v2.getPagesInSpace`
- `api.v2.getSpaceById`
- `api.v2.getSpaceLabels`
- `api.v2.getSpaces`

Implemented faithful writes:

- `api.v2.createPage`: `CREATE`, dry-run supported, confirmation required
- `api.v2.updatePage`: `UPDATE`, dry-run supported, confirmation required

Known but excluded:

- `api.v2.getChildPages`

Do not call planned or excluded operations. Inspect their catalog records only.

## CLI shape

```text
node runtime/miku-confluence-0.4.0.mjs call <operation> \
  --input <request.json|-> [--allow <permissions>] [--dry-run] \
  [--confirm-destructive] [--verbose]
```

Use one UTF-8 JSON object as input. `--version` prints the semantic version as
plain text; other normal results are one JSON document on stdout. Treat stderr
as diagnostics or failure information; do not merge it into stdout JSON.

## Artifact roles

- `operation_request_json`: caller-selected API/workflow input
- `operation_result_json`: upstream CLI result envelope
- `confluence_snapshot`: immutable filesystem snapshot from a live read
- `markdown_view`: offline human/agent-readable snapshot projection
- `update_plan` / `create_plan` / `import_plan`: immutable reviewed plan
- `apply_attempt`: write attempt and postcondition evidence
- `preservation_report`: local block-mapping and preservation diagnostics
- `diagnostics_log`: warnings and failures that must remain visible

Do not collapse plans, apply attempts, snapshots, and result envelopes into one
generic JSON artifact role.
