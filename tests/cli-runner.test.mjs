import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";

import {
  buildCliInvocation,
  runCli
} from "../skills/igapyon-miku-confluence/lib/cli-runner.mjs";

test("builds a Node invocation for the bundled runtime", () => {
  const invocation = buildCliInvocation({ args: ["--version"] });

  assert.equal(invocation.command, process.execPath);
  assert.match(
    path.basename(invocation.args[0]),
    /^miku-confluence-0\.3\.2\.mjs$/
  );
  assert.deepEqual(invocation.args.slice(1), ["--version"]);
});

test("returns status, stdout, and stderr without merging streams", () => {
  const result = runCli({ args: ["--version"] });

  assert.equal(result.status, 0);
  assert.equal(result.stdout, "miku-confluence 0.3.2\n");
  assert.equal(result.stderr, "");
});
