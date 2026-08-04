#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDirectory, "..");
const repositoryName = "miku-confluence-skills";
const skillName = "igapyon-miku-confluence";
const bundleRoot = path.resolve(repositoryRoot, "bundle", repositoryName);
const sourceSkillRoot = path.resolve(repositoryRoot, "skills", skillName);
const bundleSkillRoot = path.resolve(bundleRoot, "skills", skillName);

main();

function main() {
  requireFile(path.resolve(sourceSkillRoot, "SKILL.md"));
  requireFile(path.resolve(sourceSkillRoot, "index.json"));
  requireFile(
    path.resolve(sourceSkillRoot, "runtime", "miku-confluence-0.3.2.mjs")
  );

  fs.rmSync(bundleRoot, {
    recursive: true,
    force: true,
    maxRetries: 3,
    retryDelay: 100
  });
  fs.mkdirSync(path.dirname(bundleSkillRoot), { recursive: true });
  fs.cpSync(sourceSkillRoot, bundleSkillRoot, {
    recursive: true,
    filter: shouldCopyBundleEntry
  });

  process.stdout.write(
    `[build:bundle] generated bundle/${repositoryName}/skills/${skillName}\n`
  );
}

function requireFile(filePath) {
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    throw new Error(`missing required file: ${path.relative(repositoryRoot, filePath)}`);
  }
}

function shouldCopyBundleEntry(sourcePath) {
  const name = path.basename(sourcePath);
  if (name === ".DS_Store") {
    return false;
  }
  if (name === "tmp" || name === "output" || name === "state") {
    return false;
  }
  return true;
}
