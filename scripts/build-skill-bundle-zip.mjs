#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDirectory, "..");
const repositoryName = "miku-confluence-skills";
const packageJson = JSON.parse(
  fs.readFileSync(path.resolve(repositoryRoot, "package.json"), "utf8")
);
const bundleRoot = path.resolve(repositoryRoot, "bundle", repositoryName);
const zipName = `igapyon-${repositoryName}-${packageJson.version}.zip`;
const zipPath = path.resolve(repositoryRoot, "bundle", zipName);

execFileSync(process.execPath, ["scripts/build-skill-bundle.mjs"], {
  cwd: repositoryRoot,
  stdio: "inherit"
});

fs.rmSync(zipPath, { force: true });
execFileSync("zip", ["-qr", zipPath, "."], {
  cwd: bundleRoot,
  stdio: "inherit"
});

process.stdout.write(`[build:bundle:zip] generated bundle/${zipName}\n`);
