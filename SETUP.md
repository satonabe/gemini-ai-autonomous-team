# 🚀 Setup Guide - Claude-Gemini Integration System

## 📋 必要な環境

### 必須ソフトウェア
- **Node.js** (v18.0.0以上)
- **npm** (Node.jsと同時にインストール)
- **Claude Desktop App** ([ダウンロード](https://claude.ai/download))
- **tmux** (macOS: `brew install tmux`)

### オプション
- **Gemini CLI** (`npm install -g @google/generative-ai`)

## ⚙️ セットアップ手順

### 1. リポジトリクローン
```bash
git clone https://github.com/satonabe/gemini-ai-autonomous-team.git
cd gemini-ai-autonomous-team
```

### 2. 依存関係インストール
```bash
npm install
```

### 3. 環境変数設定
```bash
# .env.example をコピー
cp .env.example .env

# .env ファイルを編集
# GITHUB_TOKEN=your_actual_github_token
# GITHUB_OWNER=your_github_username
```

### 4. Claude Desktop MCP設定

**Claude Desktop** → **Settings** → **Developer** → **Edit Config**

以下のJSONを設定ファイルに追加：

```json
{
  "mcpServers": {
    "claude": {
      "command": "node",
      "args": [
        "/path/to/gemini-ai-autonomous-team/scripts/mcp-claude-gemini-bridge.js"
      ],
      "env": {
        "NODE_ENV": "production"
      }
    },
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/path/to/gemini-ai-autonomous-team"
      ]
    },
    "github": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-github"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your_github_token"
      }
    }
  }
}
```

**重要**: `/path/to/` を実際のパスに置換してください。

### 5. Claude Desktop 再起動

設定後、Claude Desktop を完全に再起動してください。

## 🎯 使用方法

### Gemini 5パネルシステム起動
```bash
chmod +x scripts/start-5panel-system.sh
./scripts/start-5panel-system.sh
```

### Claude Desktop での操作

1. **ツールアイコン確認**: 入力欄近くの🔧アイコン
2. **Geminiシステム起動**: 「Geminiシステムを起動してください」
3. **プロジェクト作成**: 「新しいWebアプリを作成してください」

## 🔧 トラブルシューティング

### MCP サーバーが認識されない
- Node.js がインストールされているか確認: `node --version`
- 設定ファイルのJSON構文を確認
- Claude Desktop を完全再起動

### Gemini システムが起動しない
- tmux がインストールされているか確認: `tmux -V`
- スクリプトに実行権限があるか確認: `chmod +x scripts/start-5panel-system.sh`

### GitHub 連携できない
- Personal Access Token の権限確認
- トークンの有効期限確認
- 環境変数の設定確認

## 📚 詳細ドキュメント

- [MCP Protocol Documentation](https://modelcontextprotocol.io/)
- [Claude Desktop Guide](https://docs.anthropic.com/)
- [GitHub API Documentation](https://docs.github.com/en/rest)

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. 機能ブランチを作成: `git checkout -b feature/amazing-feature`
3. 変更をコミット: `git commit -m 'Add amazing feature'`
4. ブランチをプッシュ: `git push origin feature/amazing-feature`
5. プルリクエストを作成

## 📄 ライセンス

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Happy Coding with Claude-Gemini Integration! 🤖✨**