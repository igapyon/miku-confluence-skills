import assert from "node:assert/strict";
import test from "node:test";

import { runCli } from "../skills/igapyon-miku-confluence/lib/cli-runner.mjs";

test("runtime exposes version and help without credentials", () => {
  const version = runCli({ args: ["--version"] });
  const help = runCli({ args: ["--help"] });

  assert.equal(version.status, 0);
  assert.equal(version.stdout, "0.4.0\n");
  assert.equal(help.status, 0);
  assert.match(help.stdout, /Confluence Cloud REST API v2 CLI/);
  assert.match(help.stdout, /--confirm-destructive/);
});

test("runtime operation catalog preserves read and guarded write policies", () => {
  const result = runCli({ args: ["operations", "list"] });

  assert.equal(result.status, 0);
  assert.equal(result.stderr, "");
  const catalog = JSON.parse(result.stdout);
  const operations = new Map(catalog.operations.map((operation) => [operation.name, operation]));

  assert.equal(operations.get("page.export-subtree").requiredPermission, "READ");
  assert.equal(operations.get("snapshot.export-markdown").requiresConfirmation, false);
  assert.equal(operations.get("page.apply-markdown-update").requiredPermission, "UPDATE");
  assert.equal(operations.get("page.apply-markdown-update").requiresConfirmation, true);
  assert.equal(operations.get("page.apply-markdown-create").requiredPermission, "CREATE");
  assert.equal(operations.get("page.apply-markdown-create").requiresConfirmation, true);
  assert.equal(operations.get("api.v2.getChildPages").coverage, "excluded");
});
