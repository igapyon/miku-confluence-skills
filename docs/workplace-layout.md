# Markdown-first workplace layout

`miku-confluence-skills` の利用者は、原則として Markdown を読み書きします。
Confluence API v2 の snapshot、更新計画、適用結果は、安全性と再現性のために
Agent が管理する技術成果物です。

この原則に基づき、ローカル成果物を `workplace/miku-confluence/` 以下へまとめ、
利用者が触る Markdown と Agent が管理する技術成果物を明確に分離します。

## User workflows

Agent Skill は、上流 CLI の操作名ではなく、次の利用目的を入口にします。

| User intent | Agent workflow | Primary user artifact |
| --- | --- | --- |
| 新規 Markdown を Confluence に登録する | 作成計画、レビュー、明示承認後の登録 | 利用者が指定した `.md` |
| Confluence の内容を Markdown として編集する | 取得、Markdown 化、編集、保持検査、更新計画、明示承認後の適用 | `markdown/pages/<page-id>/page.md` |
| Confluence の内容一式をエクスポートして活用する | サブツリー取得、Markdown 化、必要に応じた添付取得 | `markdown/index.md` 以下 |

利用者へ API operation 名や snapshot の内部構造を主な操作対象として見せません。
Agent は利用目的を正確な上流 operation へ解決し、必要な安全境界を維持します。

## Standard layout

```text
workplace/
└─ miku-confluence/
   ├─ drafts/
   ├─ pages/
   │  └─ page-<root-page-id>/
   │     ├─ active-run.json
   │     └─ runs/
   │        └─ <run-id>/
   │           ├─ session.json
   │           ├─ markdown/
   │           │  ├─ index.md
   │           │  └─ pages/
   │           │     └─ <page-id>/
   │           │        ├─ page.md
   │           │        ├─ page.attributes.json
   │           │        ├─ page.metadata.json
   │           │        └─ diagnostics.json
   │           └─ artifacts/
   │              ├─ snapshot/
   │              ├─ reports/
   │              ├─ plans/
   │              └─ attempts/
   └─ exports/
      └─ page-<root-page-id>/
         └─ <run-id>/
            ├─ session.json
            ├─ markdown/
            │  ├─ index.md
            │  └─ pages/
            └─ artifacts/
               └─ snapshot/
```

`<root-page-id>` と `<page-id>` には Confluence の数値 ID を使います。
ページタイトルは変更される可能性があり、パスとして扱いにくい文字も含み得るため、
正規のディレクトリ名には使いません。タイトル、space ID、取得日時などの
人間向け情報は `session.json` に記録します。

`<run-id>` は取得時刻を UTC で表す、辞書順に並べられる値を基本とします。
例は `20260805T011744Z` です。同じ秒に複数の run を作る場合は、既存パスを
確認して衝突しない接尾辞を付けます。

## Markdown ownership

### User-owned Markdown

利用者が既に持っている Markdown を新規ページとして登録するときは、元ファイルを
`workplace/` へ移動したり、暗黙に複製したりしません。利用者が指定したパスを
作成計画の入力として使い、登録先の space、親ページ、タイトルは計画側で管理します。

ただし、利用者が明示した入力形式を現行CLIの本文契約へ正規化する必要がある場合は、
Agent は run 内に決定的な作業用Markdownを生成できます。これは元ファイルのコピーを
正本として扱うためではなく、変換入力を明示するための派生物です。元パス、元ファイル
SHA-256、正規化規則、派生ファイルSHA-256を同じrunのmanifestへ記録し、元ファイルは
変更しません。front matter付き`mikuku-articles`の登録では、YAML front matterを除去し、
先頭の`# <title>`本文をCLIへ渡す方式がこの例外に該当します。

Markdown 本文に Confluence の接続情報や認証情報を記録しません。登録先情報も
本文へ強制せず、利用者の指示、session、plan に保持します。

### Agent-created drafts

Agent が登録用の Markdown を新規作成し、利用者が保存先を指定していない場合だけ、
`workplace/miku-confluence/drafts/` を一時的な下書き領域として使います。
`workplace/` は Git 管理外の作業領域であることを利用者へ明示します。長期保存や
バージョン管理が必要な原稿は、利用者が指定した管理対象パスへ置きます。

### Exported Markdown

Confluence から取得した Markdown の入口は、常に `markdown/index.md` です。
既存ページを編集するときは `markdown/pages/<page-id>/page.md` を編集します。

`page.attributes.json` などの sidecar は、Confluence 固有表現を保持して
Markdown 更新を安全に準備するために必要です。`page.md` と分離したり、削除したり
しません。`confluence-storage` と `confluence-extension` の fallback block は、
明示的な変更要求がない限り、不透明な保持対象として扱います。

## Artifact roles

### `artifacts/snapshot/`

`page.export-subtree` の出力先です。Confluence から取得した更新前の証拠であり、
run 内では不変として扱います。Agent や利用者はこのディレクトリ内を編集しません。

### `artifacts/reports/`

`page.inspect-markdown-preservation` など、変更内容と Confluence 表現の保持状態を
確認する読み取り専用レポートを置きます。同じページを再検査する場合は、既存の
レポートディレクトリを上書きせず、新しい連番を使います。

### `artifacts/plans/`

`page.prepare-markdown-update`、`page.prepare-markdown-create`、
`snapshot.prepare-import` が生成するレビュー対象の不変計画を置きます。
例は `artifacts/plans/update-<page-id>-001/` です。計画を作り直す場合は連番を
増やし、既存計画を変更しません。

### `artifacts/attempts/`

レビュー済み計画を適用した結果と事後確認を置きます。計画との対応が分かる名前を使い、
例として `artifacts/attempts/update-<page-id>-001/` とします。失敗時も証拠を
保持し、同じ attempt ディレクトリを再利用しません。

### `session.json` and `active-run.json`

`session.json` は run の対象と成果物の対応を記録します。少なくとも run ID、
workflow type、space ID、root page ID、取得時タイトル、利用者が指定した Markdown、
各成果物の相対パスを含めます。上流 runtime が生成する digest や診断を複製せず、
その正本へのパスを記録します。

`active-run.json` は、そのページサブツリーで現在編集対象となる run を相対パスで
示します。symlink は環境差があるため標準にはしません。新しい取得が完了した後にだけ
更新し、未完了の run を active にしません。

## Create workflow

新規 Markdown を登録するときは、利用者が指定した元ファイルを主成果物として扱います。

1. Markdown のパスと内容を確認する。
2. 必要なら、元ファイルと変換規則が対応付く作業用Markdownをrun内に生成する。
3. space、親ページ、タイトルを利用者の指示から確定する。
4. immutable create plan を `artifacts/plans/` に作る。
5. 対象、タイトル、候補内容、plan digest、診断を利用者へ提示する。
6. その計画を適用する明示承認があるまで停止する。
7. 承認後、一度だけ適用し、結果を `artifacts/attempts/` に保存する。
8. 継続編集する場合は、作成されたページを読み取り直して `pages/` の新しい run を作る。

最初の登録依頼だけで、レビュー前の計画を自動適用しません。

## Edit workflow

Confluence の既存ページを編集するときは、取得時点ごとに新しい run を作ります。

1. `page.export-subtree` を `artifacts/snapshot/` へ出力する。
2. 完了した snapshot を `snapshot.export-markdown` で `markdown/` へ変換する。
3. `session.json` と `active-run.json` を更新する。
4. 利用者へ `markdown/index.md` と対象の `page.md` を提示する。
5. Markdown 編集後、必要な保持検査を `artifacts/reports/` に作る。
6. immutable update plan を `artifacts/plans/` に作り、利用者へ提示する。
7. その計画を適用する明示承認があるまで停止する。
8. 承認後、一度だけ適用し、結果を `artifacts/attempts/` に保存する。

適用後、run の snapshot は更新前の証拠として保持します。次の編集を始めるときは
Confluence から再取得し、新しい run を作ります。

## Export workflow

「内容一式をエクスポートする」という依頼では、次を一連の読み取り処理として扱います。

1. root page、深さ、対象ページ数の上限を確定する。
2. 添付ファイルを含めるかを利用者の表現と容量上限から確定する。
3. `page.export-subtree` を `artifacts/snapshot/` へ出力する。
4. `snapshot.export-markdown` で `markdown/` へ変換する。
5. 利用者へ export ディレクトリと `markdown/index.md` を提示する。

「Markdown としてエクスポート」はページ本文を基本とします。「内容一式」や
「添付を含めて」という依頼では、添付件数と総容量を有界にしたうえで添付取得を含めます。
添付を含めなかった場合は、結果報告で明示します。

Export は活用・受け渡し用であり、通常の編集 run の active 対象にはしません。

## Runtime constraints

上流 runtime は既存の出力ディレクトリを上書きせず、`OUTPUT_EXISTS` で停止します。
そのため、run の親ディレクトリや `artifacts/` は事前に作成して構いませんが、runtime
へ渡す `snapshot/`、`markdown/`、個々の report、plan、attempt の出力先は、
実行前に存在してはなりません。

既存成果物を自動削除したり、新しい取得結果で置き換えたりしません。古い run の整理は、
利用者が対象を確認した別の保守操作として扱います。

## Current example

root page ID `458754` を編集用に取得した場合は、次のようにまとめます。

```text
workplace/miku-confluence/pages/page-458754/
├─ active-run.json
└─ runs/
   └─ 20260805T011744Z/
      ├─ session.json
      ├─ markdown/
      │  └─ index.md
      └─ artifacts/
         └─ snapshot/
```

従来のように `workplace/confluence-page-458754/` と
`workplace/confluence-page-458754-markdown/` を並べるのではなく、同じ取得時点に
属する成果物を1つの run の下へまとめます。

Storage形式の網羅性確認と直接Storage更新の安全な手順は、
[Confluence Storage coverage workflow](confluence-storage-coverage-workflow.md)
を参照してください。
