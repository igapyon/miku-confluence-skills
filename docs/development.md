# Development

## miku-soft reference

- checked date: 2026-08-05
- source repository: `igapyon-agent-skills`
- source commit: `46d9673fbcb47d168f7d074b54e3c3d8823abf13`
- installed/source `SKILL.md` SHA-256 match:
  `1fb13d79d796a072bf4d14d1d7ba618333b72ead9ca476cb811c2b2fa608cbae`
- primary workflow: `references/40-agent-skills-workflow.md`
- basic design: `references/miku-soft-basic/miku-soft-40-agentskills-design.md`

## Upstream compatibility source

- repository: <https://github.com/igapyon/miku-confluence>
- release/tag: `v0.4.0`
- Node.js requirement: `>=22`
- CLI asset: `miku-confluence-0.4.0.mjs`
- asset SHA-256:
  `fe022508dcf0d6aa82d8865dacf218a2cb470f3f6d2f6f8a79660f21a544ae75`

The local upstream checkout was inspected for product shape, but the bundled
runtime was downloaded from the GitHub Release rather than copied from a local
build.

## Sister references

No same-layer sister checkout existed under this repository's `workplace/` at
scaffold time. The following adjacent local checkouts were used as explicit
shape references:

- `../miku-indexgen-skills`
- `../miku-readfile-skills`

Adopted decisions:

- newer repository/installable-skill naming split from `miku-indexgen-skills`
- installed Skill name `igapyon-miku-confluence`
- compact CLI-backed shape and thin runtime helpers
- versioned runtime under the installed Skill directory
- generated `index.json`, installable bundle tree, release ZIP, isolated smoke
- explicit opt-in activation and visible upstream diagnostics
- Node.js 22/24 CI because upstream `v0.4.0` requires Node.js 22 or newer

Rejected decisions:

- Java-first selection, because no Java CLI artifact is part of this release
- MCP fallback, because no aligned MCP contract is bundled
- runtime import bundle, because the initial Skill executes the public CLI
- copied upstream source or product logic in the Skill layer

## DOCX review bridge incubation

The proposed Confluence Storage–DOCX review bridge is documented in
[`docx/confluence-storage-review-bridge.md`](../docx/confluence-storage-review-bridge.md).
It is not implemented or exposed by the current Skill contract.

For the first implementation, this repository may temporarily bundle a
versioned, local-only experimental runtime under
`skills/igapyon-miku-confluence/experimental/docx-review/`. That runtime must
vendor and directly import the versioned `miku-ms-office-core-<version>.mjs`
library published as a GitHub Release asset. This Release `.mjs` is the
consumer-facing ESM library, not a CLI artifact and not merely source material
to be copied from a local checkout. Combining it into one generated runtime is
optional; the initial Skill bundle keeps it as a separately identifiable,
version-pinned library file.

Record the selected core Release tag, asset URL, filename, and SHA-256. Include
the matching `.mjs.map` only when local diagnostics need it. Do not import the
core repository's `dist/*`, use a sibling `file:` dependency, or assume npm
publication. The experimental runtime owns OOXML rendering and parsing, bridge
manifests, DOCX review inspection, three-way conflict analysis, and Storage
candidate preparation. It must not read credentials, call Confluence, or apply
a live update.

The released `miku-confluence` runtime remains the sole owner of Confluence
reads and writes, page-version checks, permissions, dry-run, reviewed apply,
and postcondition capture. During incubation, a DOCX-derived candidate enters
that existing update boundary only after immutable-plan review and explicit
approval.

The build already copies `skills/igapyon-miku-confluence/` recursively. Once an
experimental runtime exists, build verification must additionally require its
versioned artifact and the pinned `miku-ms-office-core` Release library, verify
the library digest and ESM import, regenerate the Skill index, and run an
isolated offline smoke test. Repository-level DOCX fixtures remain under
`tests/fixtures/` and must not be included in the installable bundle.

When the schemas, diagnostics, package-safety limits, mapping profile, and
three-way merge behavior stabilize, move the semantic implementation into the
upstream `miku-confluence` product. Remove the experimental copy and bundle the
released upstream artifact instead of maintaining two implementations.

## Verification

Run:

```text
npm test
npm run build
```

After changing bundled Skill files, regenerate
`skills/igapyon-miku-confluence/index.json` with `miku-indexgen` before running
the full verification.
