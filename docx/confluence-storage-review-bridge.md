# Confluence Storage–DOCX review bridge specification

## 1. Purpose

This specification defines a direct bridge between Confluence Cloud Storage
and DOCX for offline review. DOCX acts as a review client; Confluence Storage
remains the authoritative page-body representation.

The bridge must preserve information needed for a safe round trip without
using Markdown as an intermediate representation. It extracts Word revision
markup and a structural DOCX diff, maps the resulting changes to a reviewed
Storage candidate, and applies that candidate only through the existing
Confluence update safety gate.

## 2. Scope

The initial profile covers one Confluence page and one DOCX file.

- Storage to review DOCX generation
- Word tracked-change and comment inspection
- structural comparison between the baseline and reviewed DOCX files
- block-level mapping between WordprocessingML and Storage
- three-way conflict detection against the latest live Storage
- immutable update-plan generation, explicit approval, one-time application,
  and Cloud read-back

The following are outside the initial profile.

- a Markdown-mediated round trip
- arbitrary DOCX to arbitrary Confluence page conversion
- multi-page subtree editing in one DOCX
- simultaneous two-way synchronization
- automatic conflict resolution
- headers, footers, footnotes, endnotes, fields, floating shapes, charts, and
  embedded Office objects
- synthesis or editing of unknown and third-party Confluence macros

## 3. Design principles

1. **Storage is authoritative.** The latest retrieved `body.storage.xml`, not
   the DOCX and not model memory, defines the page structure.
2. **DOCX is a review surface.** It is optimized for human editing, comments,
   and revision review; it is not a new canonical source.
3. **No Markdown bridge.** DOCX and Storage are parsed and rendered directly.
4. **Tracked changes are evidence, not the only evidence.** The bridge must
   combine Word revision markup with a semantic comparison of baseline and
   reviewed DOCX structures.
5. **Unmapped content is preserved.** Unsupported Storage constructs remain
   unchanged unless an explicitly supported mapping authorizes their edit.
6. **Updates are surgical.** Only reviewed and conflict-free mapped blocks may
   change in the candidate Storage.
7. **Every write is planned.** A DOCX review never authorizes a live update by
   itself.

## 4. State model

The workflow uses five named states.

| Symbol | Meaning |
| --- | --- |
| `S0` | immutable Storage snapshot used to generate the review document |
| `D0` | baseline DOCX generated from `S0` |
| `D1` | DOCX returned after human review |
| `S1` | latest live Storage retrieved immediately before candidate preparation or application |
| `S2` | proposed Storage produced by applying the reviewed DOCX change set to `S1` |

```text
S0 ──render──> D0 ──human review──> D1
 │                                  │
 │                            revision + semantic diff
 │                                  │
 └────────────── mapping ───────────┘
                    │
S1 ──three-way conflict check───────┤
                    │
                    └──────────────> S2
```

`S2` may be produced only when each changed mapped block is unchanged between
`S0` and `S1`. A conflicting block must stop automatic candidate generation
for that block and produce an explicit conflict diagnostic.

## 5. Artifact layout

Artifacts belong to one page edit run under `workplace/miku-confluence/`.

```text
pages/page-<page-id>/runs/<run-id>/
├─ session.json
└─ artifacts/
   ├─ snapshot/
   │  └─ pages/<page-id>/body.storage.xml       # S0
   ├─ docx-review/
   │  ├─ baseline.docx                          # D0
   │  ├─ bridge-manifest.json
   │  ├─ reviewed.docx                          # D1
   │  └─ reports/
   │     ├─ revisions.json
   │     ├─ semantic-diff.json
   │     └─ conflicts.json
   ├─ plans/
   │  └─ docx-update-001/
   │     ├─ candidate.storage.xml               # S2
   │     ├─ change-set.json
   │     └─ review.md
   └─ attempts/
      └─ docx-update-001/
         └─ attempt-001.json
```

`S0`, `D0`, the manifest, an accepted plan, and every attempt are immutable.
Submitting a different `D1` creates a new report and plan identifier.

## 6. Bridge manifest

`bridge-manifest.json` binds the baseline DOCX to the exact page snapshot.
It must contain no credentials or tenant secrets.

```json
{
  "schemaVersion": "miku-confluence-docx-bridge/v1",
  "page": {
    "id": "1671169",
    "version": 3,
    "title": "Example",
    "storageSha256": "..."
  },
  "docx": {
    "baselineSha256": "...",
    "trackRevisionsRequested": true
  },
  "blocks": [
    {
      "blockId": "b-0001",
      "storageLocator": "$.children[12]",
      "storageDigest": "...",
      "wordAnchor": "miku-b-0001",
      "mappingProfile": "paragraph-text/v1",
      "editable": true
    }
  ]
}
```

The implementation may use Word bookmarks or content controls as
`wordAnchor`. Mapping must be resolved by a stable anchor plus manifest entry;
visible paragraph text and document order alone are insufficient.

Storage locators are snapshot-local. A locator must always be paired with the
block digest and page version. A matching path with a different digest is a
conflict, not a valid target.

## 7. Storage to DOCX generation

The generator must parse Storage directly and emit WordprocessingML directly.

For every supported block it must:

1. allocate a stable bridge block ID
2. record the Storage locator and canonical block digest
3. create a bookmark or content control carrying the bridge anchor
4. render the supported content using a documented DOCX style mapping
5. keep the original Storage fragment available through the manifest or
   snapshot, not as visible encoded text

The generated DOCX should request Word revision tracking. The importer must
not assume that the setting remained enabled.

Unsupported Storage blocks must be represented as visibly labeled,
non-editable review blocks where practical. Their exact Storage remains in
`S0`; DOCX is never used to reconstruct them.

## 8. Initial mapping profile

### Editable blocks

- paragraph text
- headings `h1` through `h6`
- bold, italic, underline, strikethrough, and inline code
- ordered and unordered list item text
- table cell text when the table grid is unchanged
- multi-paragraph block-quote text

### Review-only blocks

- `status` and panel macros
- task-list identifiers and task structure
- internal resource identifiers
- table merge structure
- presentation attributes without a defined DOCX style mapping
- unknown or third-party macros

A review-only block may receive a Word comment, but a comment does not mutate
Storage automatically. It becomes a review note requiring a separately
prepared, explicitly scoped change.

### Unsupported DOCX edits in the initial profile

- adding, deleting, merging, or splitting table cells
- moving content across bridge block boundaries
- editing or deleting bridge anchors
- inserting floating shapes, charts, equations, fields, or embedded objects
- accepting a visual representation as a replacement for an opaque macro

Unsupported edits produce diagnostics and do not silently disappear.

## 9. Review extraction

The importer must validate the DOCX package before interpreting it.

- enforce bounded uncompressed size and part count
- reject unsafe relationship targets and path traversal
- verify the baseline identity recorded by the manifest
- verify that required bridge anchors are present and unique
- preserve the reviewed DOCX unchanged as evidence

The change extractor then produces two independent inputs.

1. **Revision evidence:** insertions, deletions, moves, formatting revisions,
   and comments represented by WordprocessingML.
2. **Semantic diff:** normalized block content from `D0` compared with `D1`,
   independent of whether revisions are still present.

Revision evidence improves attribution and reviewability. The semantic diff
detects changes made with tracking disabled or changes whose revisions were
already accepted. A discrepancy between them must be reported; it must not be
discarded merely because no tracked revision remains.

DOCX run boundaries are not stable semantic boundaries. Comparison must
normalize adjacent compatible runs and operate primarily at anchored block,
paragraph, list-item, and table-cell level.

## 10. Change-set contract

`change-set.json` records proposed logical operations, not raw XML patches.

Supported initial operations are:

- `replace_block_text`
- `insert_inline_text`
- `delete_inline_text`
- `replace_inline_format`
- `replace_list_item_text`
- `replace_table_cell_text`
- `add_review_note`

Every mutating operation must include:

- bridge block ID
- baseline Storage digest
- baseline DOCX value
- reviewed DOCX value
- revision author and timestamp when available
- mapping profile and confidence
- diagnostics affecting the operation

Low-confidence operations and edits outside the mapping profile must not be
converted into Storage mutations.

## 11. Three-way conflict detection

Before producing `S2`, retrieve or provide the latest live Storage `S1` and
compare each changed block with its baseline in `S0`.

| `S0 → S1` | `D0 → D1` | Result |
| --- | --- | --- |
| unchanged | changed | eligible for `S2` |
| changed | unchanged | preserve `S1` |
| changed | changed identically | preserve the common result and report it |
| changed | changed differently | conflict; do not auto-merge |
| mapping missing or ambiguous | any change | blocked |

Unchanged, unmapped Storage outside the reviewed scope must be copied from
`S1`, not reconstructed from DOCX.

## 12. Update-plan and live-write safety

The bridge must reuse the miku-confluence reviewed-write contract.

1. produce immutable `S2`, `change-set.json`, diagnostics, and `review.md`
2. record page ID, current and proposed version, title, scope, exclusions, and
   candidate SHA-256
3. run the update operation in dry-run mode
4. stop until the user explicitly approves the exact plan
5. immediately before applying, revalidate the plan digest and live page
   version
6. apply once with the exact `UPDATE` permission and destructive confirmation
7. never retry automatically
8. read the page back and retain Cloud-normalized Storage as postcondition
   evidence

A changed page version, changed candidate digest, changed DOCX, or changed
manifest invalidates the approval.

## 13. Diagnostics

The implementation should expose stable diagnostics including:

| Code | Meaning |
| --- | --- |
| `DOCX_BASELINE_MISMATCH` | reviewed DOCX does not match the selected baseline manifest |
| `DOCX_ANCHOR_MISSING` | required bridge anchor was removed |
| `DOCX_ANCHOR_DUPLICATED` | one bridge anchor appears more than once |
| `DOCX_UNTRACKED_CHANGE` | semantic diff found a change without revision evidence |
| `DOCX_REVISION_DIFF_MISMATCH` | revision evidence and semantic diff disagree |
| `DOCX_UNSUPPORTED_EDIT` | reviewed change is outside the active mapping profile |
| `STORAGE_BLOCK_CONFLICT` | the corresponding live Storage block changed after export |
| `STORAGE_MAPPING_AMBIGUOUS` | the current Storage target cannot be resolved uniquely |
| `REVIEW_NOTE_REQUIRES_PLAN` | a Word comment requests a non-automatic change |

Errors block candidate generation or application. Warnings remain visible in
the review and attempt artifacts.

## 14. Proposed CLI operations

These names are design candidates and are not implemented in the current
runtime.

| Operation | Class | Permission | Result |
| --- | --- | --- | --- |
| `page.prepare-docx-review` | offline from snapshot | `READ` | `D0` and manifest |
| `page.inspect-docx-review` | offline | `READ` | revisions, semantic diff, diagnostics |
| `page.prepare-docx-update` | offline plus explicit `S1` input | `READ` | immutable `S2` update plan |
| `page.apply-docx-update` | live write | `UPDATE` | attempt and postcondition evidence |

The CLI owns deterministic OOXML and Storage processing. The Agent Skill
selects the workflow, presents the review, and enforces the approval boundary;
it must not reimplement the conversion or merge algorithms.

During incubation, the experimental DOCX runtime implements only
`page.prepare-docx-review`, `page.inspect-docx-review`, and
`page.prepare-docx-update`. It must not perform network requests or live
writes. Application continues through the existing reviewed
`api.v2.updatePage` path. `page.apply-docx-update` is a future integrated
operation candidate after the contract is promoted upstream.

## 15. Incubation in miku-confluence-skills

The first implementation may be bundled in this repository while the mapping,
manifest, change-set, diagnostics, and fixture contracts stabilize. It remains
an experimental runtime component of the existing installed Skill, not a
second public Skill and not a pair of stateless format converters.

DOCX package input and output must use `miku-ms-office-core` as a library. The
distribution source is its GitHub Release, whose standard consumer artifact is
the versioned single-file ESM library:

```text
miku-ms-office-core-<version>.mjs
miku-ms-office-core-<version>.mjs.map  # optional source map
```

The experimental runtime vendors the selected Release asset and imports its
public API directly. The `.mjs` file is a library artifact, not a CLI runtime.
It must remain identifiable as the upstream Release asset; absorbing it into a
single generated runtime bundle is an optional later packaging decision, not a
prerequisite for using the library.

The vendored library record must pin the GitHub Release tag, asset URL,
filename, version, and SHA-256. Consumers must not import `dist/*` from a local
`miku-ms-office-core` checkout or depend on an unpublished npm package. When a
source map is included, its versioned filename and the library's
`sourceMappingURL` must remain aligned with the Release assets.

The intended dependency direction is:

```text
miku-confluence-docx-review-<version>.mjs
  └─ import → vendor/miku-ms-office-core-<version>.mjs
```

`miku-ms-office-core` owns shared Office package, ZIP/OPC, and XML primitives.
The DOCX review runtime continues to own Word revision/comment interpretation,
bridge anchors, Confluence mapping, semantic comparison, and conflict logic.

```text
skills/igapyon-miku-confluence/
├─ SKILL.md
├─ runtime/
│  └─ miku-confluence-0.4.0.mjs
├─ references/
│  └─ workflow/
│     └─ docx-review-workflow.md
└─ experimental/
   └─ docx-review/
      ├─ README.md
      ├─ miku-confluence-docx-review-0.1.0.mjs
      ├─ vendor/
      │  ├─ miku-ms-office-core-<version>.mjs
      │  └─ miku-ms-office-core-<version>.mjs.map
      └─ contracts/
         ├─ bridge-manifest.schema.json
         └─ change-set.schema.json
```

The runtime responsibilities remain separate.

- `miku-confluence-0.4.0.mjs` owns Confluence reads, version checks,
  permissions, dry-run, reviewed apply, and Cloud postconditions.
- `miku-confluence-docx-review-0.1.0.mjs` owns deterministic local OOXML
  processing, bridge manifests, review extraction, semantic comparison,
  three-way conflict analysis, and candidate preparation.
- `miku-ms-office-core-<version>.mjs` is the GitHub Release library imported by
  the DOCX review runtime for shared Microsoft Office package processing.
- The Agent Skill selects and sequences operations but does not implement
  either semantic engine.

The experimental runtime must obey these boundaries.

- no Confluence credentials, HTTP calls, or live writes
- no direct `DOCX → Storage` command that omits `S0`, `S1`, and the manifest
- no activation through the current public operation map until its runtime,
  schemas, diagnostics, and tests are present
- explicit experimental status in metadata and user-facing diagnostics
- versioned runtime artifact, pinned `miku-ms-office-core` Release library, and
  versioned manifest/change-set schemas
- fixtures and tests kept at repository level rather than copied into the
  installable Skill bundle

The current bundle builder recursively copies
`skills/igapyon-miku-confluence/`, so the runtime, workflow reference, and
contracts, together with the separately identifiable vendored core library,
can be packaged without introducing another top-level Skill. Build verification
must verify the pinned library SHA-256, resolve the runtime's ESM import, and
smoke-test the experimental runtime before the feature is advertised as bundled
and executable.

Promotion to upstream `miku-confluence` should occur when:

1. the manifest and change-set schemas have stable versioning rules
2. the initial mapping profile and diagnostic codes pass the fixture suite
3. DOCX package safety limits and three-way conflict behavior are fixed
4. the offline runtime has no dependency on Agent-only behavior
5. the reviewed application path can be expressed as a normal upstream
   operation contract

After promotion, this Skill must replace the experimental implementation with
the released upstream runtime and return to a thin adapter model.

## 16. Fixture and verification contract

Each round-trip fixture should include:

```text
baseline.storage.xml
baseline.docx
reviewed.docx
bridge-manifest.json
expected-change-set.json
expected-candidate.storage.xml
cloud-normalized.storage.xml        # when a controlled Cloud apply exists
```

Minimum scenarios are:

- tracked text insertion and deletion
- accepted or absent revision markup with a detectable semantic change
- inline-format change
- list-item text change
- table-cell text change without grid change
- comment on a review-only macro
- removed or duplicated anchor
- concurrent Confluence edit without DOCX overlap
- conflicting edit to the same block
- unsupported structural DOCX edit

DOCX packages must not be compared byte-for-byte because ZIP metadata and XML
serialization may differ. Tests should compare canonicalized relevant parts,
relationships, bridge anchors, semantic content, and expected diagnostics.

## 17. MVP acceptance criteria

The first implementation is acceptable when it can:

1. generate a readable, revision-enabled DOCX from a controlled Storage page
2. round-trip supported text edits without changing unrelated Storage
3. detect edits made without retained revision markup
4. preserve macros and other review-only blocks exactly
5. stop on a same-block concurrent edit
6. produce an immutable digest-bound update plan
7. apply only after explicit approval and verify the Cloud read-back

## 18. References

- [Confluence Storage coverage workflow](../docs/confluence-storage-coverage-workflow.md)
- [Confluence Cloud REST API v2: Page](https://developer.atlassian.com/cloud/confluence/rest/v2/api-group-page/)
- [Structure of a WordprocessingML document](https://learn.microsoft.com/en-us/office/open-xml/word/structure-of-a-wordprocessingml-document)
- [Open XML revision view](https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.wordprocessing.revisionview)
