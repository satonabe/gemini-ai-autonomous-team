# Gemini AI Autonomous Team

## 🤖 概要

Claude-Gemini統合システムによる自律的なAIチーム開発プラットフォーム

## 🚀 主な機能

### ✅ 実装済み機能
- **Claude ⟷ Gemini 双方向通信システム**
- **MCP (Model Context Protocol) サーバー統合**
- **ファイルシステム操作**
- **5パネルGemini組織システム**
- **リアルタイム応答ファイル生成**
- **GitHub統合による自動プロジェクト管理**

### 🔧 システム構成

```
gemini-ai-autonomous-team/
├── .env.example                # 環境変数テンプレート
├── package.json                # プロジェクト設定
├── scripts/                    # MCPブリッジスクリプト
│   ├── mcp-claude-gemini-bridge.js
│   └── start-5panel-system.sh
├── SETUP.md                    # 詳細セットアップガイド
└── README.md                   # このファイル
```

### 🛠️ MCP サーバー設定例

```json
{
  "mcpServers": {
    "claude": {
      "command": "node",
      "args": [
        "/Users/YOUR_USERNAME/gemini-ai-autonomous-team/scripts/mcp-claude-gemini-bridge.js"
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
        "/Users/YOUR_USERNAME/gemini-ai-autonomous-team",
        "/Users/YOUR_USERNAME/Desktop",
        "/Users/YOUR_USERNAME/Documents"
      ]
    },
    "github": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-github"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "YOUR_GITHUB_TOKEN_HERE"
      }
    }
  }
}
```

**⚠️ 重要**: 
- `YOUR_USERNAME` を実際のmacOSユーザー名に置換
- `YOUR_GITHUB_TOKEN_HERE` を実際のGitHubトークンに置換

## 🎯 クイックスタート

### 1. インストール
```bash
git clone https://github.com/satonabe/gemini-ai-autonomous-team.git
cd gemini-ai-autonomous-team
npm install
```

### 2. 環境設定
```bash
cp .env.example .env
# .env ファイルを編集してトークンを設定
```

### 3. Claude Desktop設定
詳細な手順は [SETUP.md](SETUP.md) を参照してください。

### 4. システム起動
```bash
chmod +x scripts/start-5panel-system.sh
./scripts/start-5panel-system.sh
```

## 📊 システム機能

- ✅ **完全なファイルシステム操作** - ローカルファイルの読み書き・管理
- ✅ **リアルタイム双方向通信** - Claude ⟷ Gemini間の seamless な連携
- ✅ **GitHub自動統合** - リポジトリ管理・コミット・プルリクエスト
- ✅ **5パネル組織システム** - CEO、Manager、Dev1、Dev2、Monitor の協調動作
- ✅ **効率的なプロジェクト管理** - 自動化されたワークフロー

## 🔗 関連リンク

- [Claude Desktop](https://claude.ai/download)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [詳細セットアップガイド](SETUP.md)
- [Anthropic](https://www.anthropic.com/)

## 🤝 コントリビューション

プルリクエストやイシューは大歓迎です！詳細は [SETUP.md](SETUP.md) のコントリビューションセクションをご覧ください。

## 📄 ライセンス

MIT License - 詳細は LICENSE ファイルをご確認ください。

---

**Created by Claude-Gemini Integration System** 🤖✨