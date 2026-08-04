---
name: igapyon-miku-confluence
description: Use only when the user explicitly names `miku-confluence`, `miku-confluence-skills`, or `igapyon-miku-confluence`, or explicitly asks to apply this Skill for miku-confluence-specific Confluence Cloud REST API v2 workflows. Do not activate for generic Confluence questions, generic Atlassian API work, ordinary Markdown editing, or unrelated content management.
---

# miku-confluence

Use this Skill as a thin agent workflow adapter over the bundled
`miku-confluence` Node CLI runtime. Preserve the upstream operation, permission,
diagnostic, artifact, and safety contracts.

## Activation

Activate only when at least one of these triggers is present:

- the user names `miku-confluence`
- the user names `miku-confluence-skills`
- the user names `igapyon-miku-confluence`
- the user explicitly asks to apply this Skill
- the recent conversation is already inside an explicitly activated
  `miku-confluence` workflow

Do not activate from the word `Confluence` alone. Do not take over generic
Confluence advice, Atlassian API questions, Markdown editing, documentation
writing, or repository work.

## Required First Checks

1. Read [index.json](index.json) first as the generated discovery index.
2. Open only the reference needed for the requested workflow.
3. Resolve the declared Node CLI under `runtime/` before broad file search.
4. Run `--version` when runtime compatibility has not been established in the
   current workflow.

## Runtime Contract

- execution policy: `cli-only`
- bundled artifact: `runtime/miku-confluence-0.4.0.mjs`
- required Node.js: 22 or newer
- upstream source: `miku-confluence` GitHub Release `v0.4.0`
- `--version`: semantic version as plain text on stdout
- other normal CLI output: one JSON document on stdout
- diagnostics and unexpected failures: stderr

Use `lib/runtime-artifacts.mjs` for artifact resolution and
`lib/cli-runner.mjs` as the thin invocation adapter when helper execution is
useful. The helpers must not implement Confluence operations themselves.

## Workflow Selection

Classify the request before execution:

- metadata: `--version`, `--help`, `operations list`, or
  `operations describe`; no credentials or network
- offline/local: snapshot-to-Markdown, prepare, inspect, and import-plan
  workflows that the runtime declares local-only
- live read-only: API reads and `page.export-subtree`; requires explicit target
  input and Confluence credentials
- live create/update: exact reviewed operation only; requires the matching
  permission and explicit destructive confirmation

For the operation catalog and artifact roles, read
[references/runtime/operations-map.md](references/runtime/operations-map.md).
For the end-to-end safety sequence, read
[references/workflow/confluence-workflow.md](references/workflow/confluence-workflow.md).

## Safety Rules

- Treat the upstream CLI as the semantic center. Do not reimplement REST
  requests, pagination, Markdown conversion, snapshot logic, plan digests, or
  postcondition checks in this Skill.
- Default to metadata, offline, or live read-only work when that satisfies the
  request.
- Do not infer permission for live create or update from Skill activation,
  credentials, an existing plan, or a prior read-only request.
- Before a live write, require the user to identify the exact target and exact
  operation, review the immutable plan or dry-run result, and explicitly ask to
  apply it.
- Pass `--allow CREATE` or `--allow UPDATE` and
  `--confirm-destructive` only for that reviewed live-write request.
- Never pass `DELETE`; `v0.4.0` exposes no implemented delete workflow.
- Never retry a live write automatically.
- Keep `MIKU_CONFLUENCE_API_TOKEN`, email, Authorization headers, cookies, and
  `.env` contents out of prompts, command output summaries, logs, and artifacts.
- Do not run `config init` unless the user explicitly asks to initialize local
  configuration. It uses create-exclusive behavior and must not overwrite an
  existing `.env`.
- Preserve upstream hard errors and warnings. Do not report success when the
  CLI result envelope reports failure.

## Result Handling

Inspect command status, stdout JSON, and stderr before responding. Report:

- operation and whether it was metadata, offline, live read-only, or live write
- success/failure from the runtime envelope
- artifact paths created by the runtime
- important diagnostics and warnings
- whether a reviewed write remains pending

Do not paste large JSON bodies or page contents unless the user asks for them.
Keep generated snapshots, plans, attempts, and Markdown outputs in explicit
caller-selected directories, normally under a workspace-local work area.

## Boundaries

- This Skill is not a general Confluence assistant.
- This Skill does not expose or call an MCP backend.
- This Skill does not use the runtime import bundle.
- This Skill does not create credentials, Atlassian API tokens, spaces, or
  root-level pages outside the upstream supported contract.
- This Skill does not publish GitHub releases or update its bundled runtime.

## References

Read only as needed:

- [index.json](index.json): generated bundled-file discovery
- [references/INDEX.md](references/INDEX.md): reference navigation
- [references/runtime/operations-map.md](references/runtime/operations-map.md):
  operation categories, permissions, CLI mapping, and artifact roles
- [references/runtime/runtime-source.md](references/runtime/runtime-source.md):
  runtime provenance and integrity data
- [references/workflow/confluence-workflow.md](references/workflow/confluence-workflow.md):
  metadata, offline, live read-only, and reviewed live-write sequence
