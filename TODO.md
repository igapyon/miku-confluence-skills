# TODO

- 上流 `miku-confluence` の新しい GitHub Release を採用するときは、version、
  runtime asset、SHA-256、operation map、package versionを同時に更新する。
- Java CLI runtime が公開された場合は、Node CLI-only 方針を再評価し、
  backend selection と `--help` parity test の追加可否を判断する。
- `miku-confluence-mcp` が提供された場合だけ、CLI plus MCP-backed 構成を
  別途設計する。現在の Skill は MCP fallback を行わない。
- `mikuku-articles`の登録テスト結果を根拠に、上流`miku-confluence`へ「versioned,
  opt-in Markdown article import profile」のGitHub Issueを作成する。これは将来の必須
  機能追加要望であり、Skill側の互換adapterを恒久実装にしない。Issueには原本Markdown、
  派生Markdown、normalization report、各`UNSUPPORTED_MARKDOWN_NODE`診断、create plan、
  期待するStorage/attachment結果を添付・要約する。
  必須スコープは、YAML front matterの明示的なfield mapping、相対画像からattachmentへの
  安全な取り込み（MIME/SHA-256/plan/read-back）、コードブロックのlanguage/info string、
  task-list完了状態、literal square bracketとinline codeを含むpage title、Raw HTML/autolink
  の安全なpolicyである。Issue作成はprofile仕様を安定させ、最小再現と期待結果を整理して
  から行う。
- Confluence Storage–DOCX review bridge を `-skills` 内で実験するときは、
  GitHub Release の versioned single-file ESM library
  `miku-ms-office-core-<version>.mjs` を version、Release tag、asset URL、
  SHA-256 付きで vendor し、実験 runtime から直接 import する。これは
  CLIではなく利用ライブラリであり、初期実装で単一runtimeへ内包する必要はない。
  `bridge-manifest` と `change-set` の schema、DOCX package safety limit、
  `review.create`、`review.inspect`、`update.prepare` のローカル専用 runtime、
  および三者比較 fixture を先に実装する。実験 runtime は Confluence API を
  呼ばず、live apply は既存の reviewed `api.v2.updatePage` に委譲する。
  契約安定後は上流 `miku-confluence` の Issue に昇格要件を記録し、実装を移す。
