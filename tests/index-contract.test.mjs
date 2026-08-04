import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const indexPath = path.resolve(
  process.cwd(),
  "skills/igapyon-miku-confluence/index.json"
);

test("generated index contains the required bundled Skill files", () => {
  assert.equal(fs.existsSync(indexPath), true);
  const index = JSON.parse(fs.readFileSync(indexPath, "utf8"));
  assert.equal(index.generator, "miku-indexgen");

  const paths = new Set(index.files.map((file) => file.path));
  for (const requiredPath of [
    "SKILL.md",
    "lib/cli-runner.mjs",
    "lib/runtime-artifacts.mjs",
    "references/INDEX.md",
    "references/runtime/operations-map.md",
    "references/runtime/runtime-source.md",
    "references/workflow/confluence-workflow.md",
    "runtime/miku-confluence-0.4.0.mjs"
  ]) {
    assert.equal(paths.has(requiredPath), true, `missing index entry: ${requiredPath}`);
  }
});
