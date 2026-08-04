# miku-confluence-skills

`miku-confluence-skills` は、
[`miku-confluence`](https://github.com/igapyon/miku-confluence) を
AI agent から安全に利用するための Agent Skill package です。

現在は Node CLI-backed 構成です。上流の Confluence Cloud REST API v2
操作、snapshot、Markdown workflow、diagnostics を再実装せず、GitHub
Release から受領した CLI runtime を薄い workflow adapter から呼び出します。

## Current contract

- repository/package: `miku-confluence-skills`
- installed Agent Skill: `igapyon-miku-confluence`
- upstream compatibility source: `miku-confluence` `v0.4.0`
- bundled runtime: `miku-confluence-0.4.0.mjs`
- runtime policy: Node CLI-only
- required Node.js version: 22 or newer

Generic な Confluence の質問だけでは Skill を起動しません。利用者が
`miku-confluence`、`miku-confluence-skills`、または
`igapyon-miku-confluence` を明示したときに使用します。

## Build and verification

```text
npm install
npm test
npm run build
```

`npm run build` は Skill 構造と runtime contract を検査し、次の installable
ZIP を生成します。

```text
bundle/igapyon-miku-confluence-skills-0.4.0.zip
```

ZIP は `skills/igapyon-miku-confluence/` をルート配下に含みます。

## Runtime provenance

Runtime は GitHub Release `v0.4.0` の
`miku-confluence-0.4.0.mjs` です。取得元、SHA-256、更新手順は
[Runtime Source](skills/igapyon-miku-confluence/references/runtime/runtime-source.md)
を参照してください。

## Repository operation

- Skill source of truth: `skills/igapyon-miku-confluence/`
- generated discovery index: `skills/igapyon-miku-confluence/index.json`
- local scratch and verification data: `workplace/`
- generated bundle output: `bundle/`
- local Codex deployment copies: `.codex/skills/`（Git 管理外）

`index.json` は手編集せず、`miku-indexgen` で再生成します。GitHub
repository作成、push、tag、Release公開、asset upload は人間が実施します。

## Documentation

- [Development notes](docs/development.md)
- [Shared miku-soft references](docs/miku-soft-reference.md)
- [Agent-facing Skill](skills/igapyon-miku-confluence/SKILL.md)

## License

Apache License 2.0。詳細は [LICENSE](LICENSE) を参照してください。

Atlassian および Confluence は Atlassian の商標です。本プロジェクトは
Atlassian による公式プロジェクトではありません。
