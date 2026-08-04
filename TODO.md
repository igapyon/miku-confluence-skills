# TODO

- 上流 `miku-confluence` の新しい GitHub Release を採用するときは、version、
  runtime asset、SHA-256、operation map、package versionを同時に更新する。
- Java CLI runtime が公開された場合は、Node CLI-only 方針を再評価し、
  backend selection と `--help` parity test の追加可否を判断する。
- `miku-confluence-mcp` が提供された場合だけ、CLI plus MCP-backed 構成を
  別途設計する。現在の Skill は MCP fallback を行わない。
