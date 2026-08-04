import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import test from "node:test";

const root = process.cwd();
const packageJson = JSON.parse(
  fs.readFileSync(path.resolve(root, "package.json"), "utf8")
);
const skillRoot = path.resolve(root, "skills", "igapyon-miku-confluence");
const zipPath = path.resolve(
  root,
  `bundle/igapyon-miku-confluence-skills-${packageJson.version}.zip`
);

test("release zip contains the installable Skill and excludes development files", () => {
  const fixtures = [
    path.resolve(skillRoot, "tmp", "scratch.txt"),
    path.resolve(skillRoot, "references", "output", "generated.txt"),
    path.resolve(skillRoot, "references", "state", "state.json")
  ];

  try {
    for (const fixture of fixtures) {
      fs.mkdirSync(path.dirname(fixture), { recursive: true });
      fs.writeFileSync(fixture, "development-only fixture\n");
    }
    execFileSync("npm", ["run", "build:bundle:zip"], {
      cwd: root,
      encoding: "utf8"
    });
  } finally {
    fs.rmSync(path.resolve(skillRoot, "tmp"), { recursive: true, force: true });
    fs.rmSync(path.resolve(skillRoot, "references", "output"), {
      recursive: true,
      force: true
    });
    fs.rmSync(path.resolve(skillRoot, "references", "state"), {
      recursive: true,
      force: true
    });
  }

  assert.equal(fs.existsSync(zipPath), true);
  const entries = execFileSync("unzip", ["-Z1", zipPath], {
    cwd: root,
    encoding: "utf8"
  }).trim().split(/\n/).filter(Boolean);

  for (const requiredEntry of [
    "skills/igapyon-miku-confluence/SKILL.md",
    "skills/igapyon-miku-confluence/index.json",
    "skills/igapyon-miku-confluence/lib/cli-runner.mjs",
    "skills/igapyon-miku-confluence/lib/runtime-artifacts.mjs",
    "skills/igapyon-miku-confluence/references/INDEX.md",
    "skills/igapyon-miku-confluence/references/runtime/operations-map.md",
    "skills/igapyon-miku-confluence/references/runtime/runtime-source.md",
    "skills/igapyon-miku-confluence/references/workflow/confluence-workflow.md",
    "skills/igapyon-miku-confluence/runtime/miku-confluence-0.4.0.mjs"
  ]) {
    assert.equal(entries.includes(requiredEntry), true, `missing zip entry: ${requiredEntry}`);
  }

  assert.equal(entries.some((entry) => entry.includes(".DS_Store")), false);
  assert.equal(entries.some((entry) => entry.startsWith("tests/")), false);
  assert.equal(entries.some((entry) => entry.startsWith("docs/")), false);
  assert.equal(entries.some((entry) => entry.startsWith("workplace/")), false);
  assert.equal(entries.some((entry) => entry.includes("/tmp/")), false);
  assert.equal(entries.some((entry) => entry.includes("/output/")), false);
  assert.equal(entries.some((entry) => entry.includes("/state/")), false);
});
