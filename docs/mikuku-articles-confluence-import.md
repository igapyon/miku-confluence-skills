# Importing mikuku-articles Markdown into Confluence

## Decision

The long-term solution is an upstream `miku-confluence` CLI feature: an
explicit, versioned Markdown-article import profile. Record and create an
upstream GitHub Issue after this test evidence is consolidated; do not leave
the Skill-side compatibility adapter as the permanent implementation.

Do not patch the currently bundled `miku-confluence` CLI artifact inside this
repository during the first `mikuku-articles` import experiment. The new
profile must be designed and released by the upstream CLI project, rather than
being an implicit, corpus-specific rewrite in an Agent Skill.

The CLI's `page.prepare-markdown-create` contract deliberately accepts a page
body whose first meaningful line is the page title as a level-one heading. It
receives the Confluence title separately. This keeps conversion deterministic:
the CLI does not need to guess whether a field such as `tags`, `author`,
`published_to`, or `url` becomes page text, a Confluence label, a content
property, or no Confluence data at all.

`mikuku-articles` uses a publishing-oriented front matter block before that
heading. Passing an original article directly to the current CLI is therefore
blocked with `TITLE_CHANGE_NOT_SUPPORTED`; it is not a live-write failure.

Until that feature exists, the first import uses a Skill-side, deterministic
input adapter for test evidence. It does not modify the original article and
does not reimplement Markdown to Storage conversion. It normalizes only the
declared unsupported constructs, verifies the title invariant, and records
every source-to-working transformation.

## Observed CLI behavior

On 2026-08-05, preparing a create plan for an original `mikuku-articles`
Markdown file failed locally with:

```text
TITLE_CHANGE_NOT_SUPPORTED
Working Markdown must begin with the unchanged page title as one level-one heading.
```

The target page, space, and Confluence content were not changed. This result is
useful input validation: it prevents front matter from silently becoming page
body text or causing a title/body mismatch.

## Adapter contract

For each selected article, the adapter creates only local, disposable working
artifacts beneath the selected `workplace/miku-confluence/` run.

1. Read the original Markdown at its user-owned path; never modify, move, or
   overwrite it.
2. Recognize front matter only when the file begins with a YAML `---` block.
3. Extract `title` as the required Confluence page title.
4. Remove that leading front matter block and its immediately following blank
   separator lines to create `working.md`.
5. Verify that the resulting body begins exactly with `# <title>`.
6. Record source path, source SHA-256, derived-file SHA-256, title, and every
   extracted front matter key in `source-manifest.json`.
7. Pass the derived `working.md`, the extracted title, target space ID, and
   target parent page ID to `page.prepare-markdown-create`.

The adapter does not infer Confluence labels, properties, or publication state.
The original front matter remains in the source and manifest evidence. In the
initial test, `tags`, `author`, `published_to`, `writer_agent`, `url`, and
`release_date` do not become Confluence metadata or visible page text.

## Images and relative links

The selected articles contain relative image links. The current test retains
those Markdown lines in the derived working file so that the create plan can
report exactly how the current Markdown-to-Storage profile handles them.

This is intentionally distinct from attachment migration. The bundled CLI does
not expose an attachment-upload workflow in this Skill. In the observed
profile, a Markdown image produces `UNSUPPORTED_MARKDOWN_NODE` with the message
"Images and attachment references are not writable in profile v1." Do not
create missing attachments, rewrite image targets, or apply a page plan that
has unresolved image diagnostics.

For this registration test, use a second, explicitly lossy **text-only**
adapter profile after retaining the blocked full-text plan as evidence. It
removes only standalone Markdown image lines, records every removed line's alt
text, source target, and line number in `omitted-images.json`, and leaves all
other body text unchanged. A page created through that profile is a Markdown
registration test page, not a faithful article migration.

The first text-only plan also established that profile v1 rejects code-fence
language and info strings. The next **compatibility** profile retains each code
block body and fence but removes only an opening fence's info string outside an
already-open code block (for example, ` ```js` becomes ` ``` `). It tracks
fence state so Markdown examples embedded inside a larger fenced code sample
remain literal text. It records every changed line and original info string.
This is likewise a test-only, lossy transformation; language recovery belongs
to the existing upstream code-block-language feature request.

Profile v1 also rejects Raw HTML and autolinks. The compatibility test profile
escapes only `&lt;...&gt;` constructs outside fenced code, recording the source
fragment and line number. This retains the syntax as visible text instead of
creating executable HTML or silently dropping it. HTML semantics remain outside
the current registration test scope.

Literal square brackets in a title are also parsed as link syntax by the
current create profile. After deriving the plain-text Confluence title, the
compatibility adapter keeps its literal brackets in the CLI title input but
escapes brackets in the corresponding first H1 only. The resulting create plan
must show the intended literal title before it can be applied.

Confluence page titles are also plain text, so a title code span is normalized
to its text content for the title and first H1 only (for example, `` `ABC` ``
becomes `ABC`). Inline code in the article body is unaffected. The manifest
records both the source title and the Confluence title.

## Batch selection and safety sequence

For this test, select about 20 published article files matching:

```text
2026/<month>/<yyyymmdd>/<yyyymmdd>-*.md
```

Exclude repository control files, `draft/`, and `images/src/` prompt or section
files. The selected set is recorded with exact paths and hashes in the run
manifest, so a later rerun does not silently import a changed source.

The execution order is:

1. read the target parent and its existing direct children
2. derive all selected working Markdown files locally
3. prepare one immutable create plan per article
4. inspect every title, plan digest, candidate preview, and diagnostic
5. apply one reviewed, eligible plan as a smoke test
6. re-read that created page and compare its exported Markdown/Storage result
7. review the remaining plans and obtain a separate explicit approval before
   creating them

An `Apply` instruction before an eligible immutable plan exists does not
authorize an unspecified page creation. The exact plan digest, title, parent,
and diagnostics must be reviewed first.

## Upstream CLI feature and Issue handoff

Create an upstream `miku-confluence` GitHub Issue to request a versioned,
opt-in article-import profile. The profile should extend the current
`page.prepare-markdown-create` / `page.apply-markdown-create` safety model; it
must not weaken immutable-plan review, digest confirmation, permissions, or
postcondition read-back.

The Issue must include the observed diagnostics, the source and derived
Markdown pair, normalization report, and create-plan artifacts from this test
run. It should request these capabilities as explicitly declared behavior:

1. YAML front matter parsing with a documented field-by-field mapping and
   preservation policy.
2. Local relative-image discovery and attachment creation, including MIME type,
   SHA-256, attachment name, parent-page binding, plan review, and read-back.
3. Code fence language / info-string preservation.
4. Native task-list creation with completion state.
5. Safe literal page-title handling for brackets and title inline syntax.
6. A documented Raw HTML / autolink policy that never enables unsafe markup by
   implication.

The Skill adapter is temporary test infrastructure. Remove or reduce it once a
released upstream profile can prepare equivalent plans directly from the
original Markdown and local assets.

The Issue should not be created until the profile scope is stable. It must
specify at least:

- the supported syntax and parser behavior
- the required `title` rule
- a field-by-field mapping for each supported key
- the disposition of unknown keys
- whether `tags` map to Confluence labels and how duplicates are handled
- compatibility with the existing body-only create/update contract

Until then, the adapter is the safer temporary boundary: it is corpus-specific,
transparent, and preserves the CLI's strict Markdown body contract.

Attachment support is a separate upstream feature, not an extension of the
text-only adapter. It needs an explicit input and safety contract for local
asset discovery, MIME type and digest capture, attachment naming, parent-page
binding, dry-run behavior, plan review, create/update ordering, and read-back
verification. Do not request or implement it as an implicit interpretation of
relative Markdown paths.

## 2026-08-05 test-run evidence

The first batch selected 20 published `mikuku-articles` files and prepared
them for the configured test parent page. The raw original Markdown was never
changed. The v6 compatibility profile produced an eligible immutable create
plan for all 20 articles with no remaining CLI diagnostics.

The profile made 256 recorded, intentional test-only transformations:

- 159 standalone relative image lines removed
- 81 outer code-fence info strings removed
- 3 task-list items converted to ordinary list text with an explicit state
- 4 Raw HTML/autolink fragments escaped as visible text
- 8 title H1s with literal square brackets escaped for Markdown parsing
- 1 title code span normalized to its plain-text title

Earlier blocked plans remain under the same `workplace` run as evidence for
the front matter, image, code-info-string, Raw HTML, and title parsing
boundaries. An eligible plan still requires a review of its exact title,
parent, digest, and intended lossy profile before a live `CREATE` operation.
