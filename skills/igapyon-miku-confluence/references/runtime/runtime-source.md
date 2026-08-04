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
- release: <https://github.com/igapyon/miku-confluence/releases/tag/v0.3.2>
- compatibility version: `0.3.2`
- upstream Node.js requirement: `>=22`

## Bundled artifact

- source asset: `miku-confluence-0.3.2.mjs`
- installed path: `runtime/miku-confluence-0.3.2.mjs`
- source size: `778872` bytes
- SHA-256:
  `b2151a83be946fe5f4cc34945d7c89165e0ca7cba97984640e6b72ded58cbd38`

Download URL:

```text
https://github.com/igapyon/miku-confluence/releases/download/v0.3.2/miku-confluence-0.3.2.mjs
```

This repository consumes the executable CLI asset. It does not rename or
bundle `miku-confluence-runtime-0.3.2.mjs` as the CLI runtime.

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
