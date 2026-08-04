import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import test from "node:test";

const root = process.cwd();
const repositoryName = "miku-confluence-skills";
const skillName = "igapyon-miku-confluence";

test("generated bundle runs from an isolated install shape", async () => {
  execFileSync("npm", ["run", "build:bundle"], {
    cwd: root,
    encoding: "utf8"
  });

  const sourceBundle = path.resolve(root, "bundle", repositoryName);
  const isolatedRoot = fs.mkdtempSync(
    path.join(os.tmpdir(), `${repositoryName}-bundle-`)
  );

  try {
    fs.cpSync(sourceBundle, isolatedRoot, { recursive: true });
    const installedSkillRoot = path.resolve(isolatedRoot, "skills", skillName);
    const runnerUrl = pathToFileURL(
      path.resolve(installedSkillRoot, "lib", "cli-runner.mjs")
    );
    const { runCli } = await import(runnerUrl.href);

    assert.equal(fs.existsSync(path.resolve(installedSkillRoot, "SKILL.md")), true);
    assert.equal(fs.existsSync(path.resolve(installedSkillRoot, "index.json")), true);

    const version = runCli({ args: ["--version"], cwd: isolatedRoot });
    assert.equal(version.status, 0);
    assert.equal(version.stdout, "0.4.0\n");

    const catalog = runCli({ args: ["operations", "list"], cwd: isolatedRoot });
    assert.equal(catalog.status, 0);
    assert.equal(Array.isArray(JSON.parse(catalog.stdout).operations), true);
  } finally {
    fs.rmSync(isolatedRoot, { recursive: true, force: true });
  }
});
