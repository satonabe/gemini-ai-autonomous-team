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

### 🔧 システム構成

```
claude-gemini-integration/
├── .claude/                    # Claude設定
├── gemini-ai-autonomous-team/  # Gemini組織システム
├── scripts/                    # MCPブリッジスクリプト
│   └── mcp-claude-gemini-bridge.js
├── logs/                       # システムログ
├── projects/                   # プロジェクト保存
└── sessions/                   # セッション管理
```

### 🛠️ MCP サーバー設定

```json
{
  "mcpServers": {
    "claude": {
      "command": "node",
      "args": ["/Users/ys/claude-gemini-integration/scripts/mcp-claude-gemini-bridge.js"],
      "env": {"NODE_ENV": "production"}
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/ys/claude-gemini-integration"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {"GITHUB_PERSONAL_ACCESS_TOKEN": "..."}
    }
  }
}
```

## 🎯 使用方法

1. **Claude Desktop** でMCPサーバー設定
2. **Gemini組織システム** 起動
3. **双方向通信** でタスク実行
4. **GitHub統合** でプロジェクト管理

## 📊 実績

- ✅ 完全なファイルシステム操作
- ✅ リアルタイム双方向通信
- ✅ GitHub自動統合
- ✅ 効率的なプロジェクト管理

## 🔗 関連リンク

- [Claude Desktop](https://claude.ai/download)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Anthropic](https://www.anthropic.com/)

---

**Created by Claude-Gemini Integration System** 🤖✨