---
title: miku-confluence runtime source
description: Provenance and integrity contract for the bundled miku-confluence Node CLI.
topics:
  - miku-confluence
  - runtime
  - provenance
  - sha256
  - github-release
---

# Runtime Source

## Compatibility source

- upstream repository: <https://github.com/igapyon/miku-confluence>
- release: <https://github.com/igapyon/miku-confluence/releases/tag/v0.4.0>
- compatibility version: `0.4.0`
- upstream Node.js requirement: `>=22`

## Bundled artifact

- source asset: `miku-confluence-0.4.0.mjs`
- installed path: `runtime/miku-confluence-0.4.0.mjs`
- source size: `782894` bytes
- SHA-256:
  `fe022508dcf0d6aa82d8865dacf218a2cb470f3f6d2f6f8a79660f21a544ae75`

Download URL:

```text
https://github.com/igapyon/miku-confluence/releases/download/v0.4.0/miku-confluence-0.4.0.mjs
```

This repository consumes the executable CLI asset. It does not rename or
bundle `miku-confluence-runtime-0.4.0.mjs` as the CLI runtime.

## Update rule

For a future runtime update:

1. require a published upstream GitHub Release
2. download the executable CLI asset from that Release
3. verify the GitHub-published digest and `--version`
4. inspect `--help` and `operations list`
5. update the runtime file, package version, operation map, tests, README,
   TODO, and this provenance record together
6. regenerate `index.json`
7. run the complete test and bundle verification

Do not replace the artifact with a local development build without recording a
separate compatibility and provenance decision.
