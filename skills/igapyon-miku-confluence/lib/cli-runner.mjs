import { spawnSync } from "node:child_process";

import { resolveRuntimeArtifactPath } from "./runtime-artifacts.mjs";

export function buildCliInvocation({ args = [], nodeRuntimePath } = {}) {
  return {
    command: process.execPath,
    args: [nodeRuntimePath ?? resolveRuntimeArtifactPath(), ...args]
  };
}

export function runCli({
  args = [],
  cwd,
  env,
  input,
  nodeRuntimePath
} = {}) {
  const invocation = buildCliInvocation({ args, nodeRuntimePath });
  const result = spawnSync(invocation.command, invocation.args, {
    cwd,
    env,
    input,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024
  });

  if (result.error) {
    throw result.error;
  }

  return {
    command: invocation.command,
    args: invocation.args,
    status: result.status,
    signal: result.signal,
    stdout: result.stdout ?? "",
    stderr: result.stderr ?? ""
  };
}
