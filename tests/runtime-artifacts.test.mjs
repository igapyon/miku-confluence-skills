import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  resolveRuntimeArtifact,
  resolveRuntimeArtifactPath
} from "../skills/igapyon-miku-confluence/lib/runtime-artifacts.mjs";

const EXPECTED_SHA256 =
  "fe022508dcf0d6aa82d8865dacf218a2cb470f3f6d2f6f8a79660f21a544ae75";

test("resolves and verifies the bundled Node CLI runtime", () => {
  const artifact = resolveRuntimeArtifact();

  assert.equal(artifact.name, "miku-confluence-0.4.0.mjs");
  assert.equal(artifact.version, "0.4.0");
  assert.equal(fs.existsSync(resolveRuntimeArtifactPath()), true);

  const digest = crypto
    .createHash("sha256")
    .update(fs.readFileSync(artifact.path))
    .digest("hex");
  assert.equal(digest, EXPECTED_SHA256);
});

test("selects the newest versioned executable artifact", () => {
  const runtimeRoot = fs.mkdtempSync(path.join(os.tmpdir(), "miku-confluence-runtime-"));
  try {
    fs.writeFileSync(path.join(runtimeRoot, "miku-confluence-0.9.0.mjs"), "");
    fs.writeFileSync(path.join(runtimeRoot, "miku-confluence-0.10.0.mjs"), "");
    fs.writeFileSync(path.join(runtimeRoot, "miku-confluence-runtime-9.0.0.mjs"), "");
    fs.writeFileSync(path.join(runtimeRoot, "miku-confluence-sources-9.0.0.mjs"), "");

    const artifact = resolveRuntimeArtifact({ runtimeRoot });
    assert.equal(artifact.name, "miku-confluence-0.10.0.mjs");
  } finally {
    fs.rmSync(runtimeRoot, { recursive: true, force: true });
  }
});

test("reports a missing declared runtime as a hard error", () => {
  const runtimeRoot = fs.mkdtempSync(path.join(os.tmpdir(), "miku-confluence-empty-"));
  try {
    assert.throws(
      () => resolveRuntimeArtifact({ runtimeRoot }),
      /missing Node\.js runtime artifact/
    );
  } finally {
    fs.rmSync(runtimeRoot, { recursive: true, force: true });
  }
});
