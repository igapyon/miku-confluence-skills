import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const moduleDirectory = path.dirname(fileURLToPath(import.meta.url));

export const DEFAULT_RUNTIME_ROOT = path.resolve(moduleDirectory, "..", "runtime");

const NODE_RUNTIME_PATTERN = /^miku-confluence-(?!runtime-|sources-)(.+)\.mjs$/;

export function resolveRuntimeArtifactPath(options = {}) {
  return resolveRuntimeArtifact(options).path;
}

export function resolveRuntimeArtifact({ runtimeRoot = DEFAULT_RUNTIME_ROOT } = {}) {
  const entries = fs.existsSync(runtimeRoot) ? fs.readdirSync(runtimeRoot) : [];
  const matches = entries
    .map((name) => {
      const match = NODE_RUNTIME_PATTERN.exec(name);
      if (!match) {
        return null;
      }
      const artifactPath = path.resolve(runtimeRoot, name);
      if (!fs.statSync(artifactPath).isFile()) {
        return null;
      }
      return { name, path: artifactPath, version: match[1] };
    })
    .filter(Boolean)
    .sort(compareArtifacts);

  if (matches.length === 0) {
    throw new Error(`missing Node.js runtime artifact in ${runtimeRoot}`);
  }

  return matches[matches.length - 1];
}

function compareArtifacts(left, right) {
  const versionOrder = compareVersionStrings(left.version, right.version);
  if (versionOrder !== 0) {
    return versionOrder;
  }
  return compareUtf16(left.name, right.name);
}

function compareVersionStrings(left, right) {
  const leftParts = splitVersion(left);
  const rightParts = splitVersion(right);
  const length = Math.max(leftParts.length, rightParts.length);

  for (let index = 0; index < length; index += 1) {
    const leftPart = leftParts[index] ?? 0;
    const rightPart = rightParts[index] ?? 0;
    if (typeof leftPart === "number" && typeof rightPart === "number") {
      if (leftPart !== rightPart) {
        return leftPart - rightPart;
      }
      continue;
    }
    const order = compareUtf16(String(leftPart), String(rightPart));
    if (order !== 0) {
      return order;
    }
  }

  return 0;
}

function splitVersion(version) {
  return version.split(/[.-]/).map((part) => {
    if (/^\d+$/.test(part)) {
      return Number(part);
    }
    return part;
  });
}

function compareUtf16(left, right) {
  if (left < right) {
    return -1;
  }
  if (left > right) {
    return 1;
  }
  return 0;
}
