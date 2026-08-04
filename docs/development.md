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

## Verification

Run:

```text
npm test
npm run build
```

After changing bundled Skill files, regenerate
`skills/igapyon-miku-confluence/index.json` with `miku-indexgen` before running
the full verification.
