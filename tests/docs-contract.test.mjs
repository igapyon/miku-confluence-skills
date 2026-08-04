import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const skill = fs.readFileSync(
  path.resolve(root, "skills/igapyon-miku-confluence/SKILL.md"),
  "utf8"
);
const packageJson = JSON.parse(
  fs.readFileSync(path.resolve(root, "package.json"), "utf8")
);

test("activation remains explicitly miku-confluence-specific", () => {
  assert.match(skill, /user explicitly names `miku-confluence`/);
  assert.match(skill, /Do not activate from the word `Confluence` alone/);
  assert.match(skill, /recent conversation is already inside an explicitly activated/);
});

test("live write boundaries remain explicit", () => {
  assert.match(skill, /Do not infer permission for live create or update/);
  assert.match(skill, /--allow CREATE/);
  assert.match(skill, /--allow UPDATE/);
  assert.match(skill, /--confirm-destructive/);
  assert.match(skill, /Never retry a live write automatically/);
});

test("package and upstream runtime versions stay aligned", () => {
  assert.equal(packageJson.version, "0.3.2");
  assert.equal(packageJson.engines.node, ">=22");
  assert.match(skill, /runtime\/miku-confluence-0\.3\.2\.mjs/);
});
