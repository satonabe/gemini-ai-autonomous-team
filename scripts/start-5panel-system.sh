#!/bin/bash

# 🖥️ Gemini AI組織 5分割画面起動スクリプト

echo "🚀 5分割AI組織画面を起動中..."

PROJECT_DIR=$(pwd)
echo "📁 プロジェクトディレクトリ: $PROJECT_DIR"

# 既存セッション終了
tmux kill-session -t gemini-5panel 2>/dev/null || true

# 新セッション作成（5分割用）
tmux new-session -d -s gemini-5panel -c "$PROJECT_DIR"

# ==========================================
# 5分割レイアウト構成:
# ┌─────────────┬─────────────┐
# │   🏢 CEO    │ 👔 Manager  │
# ├─────────────┼─────────────┤  
# │ 🔧 Dev1     │ 🔧 Dev2     │
# ├─────────────┴─────────────┤
# │      📊 System Monitor    │
# └─────────────────────────────┘
# ==========================================

# CEO画面（左上）
tmux send-keys -t gemini-5panel:0 "echo '🏢 CEO画面 - 戦略決定・委任特化'" C-m
tmux send-keys -t gemini-5panel:0 "echo '指示例: Claude から MCP 経由で指示を受信'" C-m
tmux send-keys -t gemini-5panel:0 "echo '準備完了 - プロジェクト指示をお待ちしています...'" C-m
tmux send-keys -t gemini-5panel:0 "cd agents/ceo && exec gemini" C-m

# Manager画面（右上）
tmux split-window -h -t gemini-5panel:0 -c "$PROJECT_DIR"
tmux send-keys -t gemini-5panel:0.1 "echo '👔 Manager画面 - 統括・分散・統合'" C-m
tmux send-keys -t gemini-5panel:0.1 "echo '役割: CEO指示分析→Developer分担→品質統合'" C-m
tmux send-keys -t gemini-5panel:0.1 "cd agents/manager && exec gemini" C-m

# Developer1画面（左下）
tmux split-window -v -t gemini-5panel:0.0 -c "$PROJECT_DIR"
tmux send-keys -t gemini-5panel:0.2 "echo '🔧 Developer1画面 - 適応型実行'" C-m
tmux send-keys -t gemini-5panel:0.2 "echo '専門分野: Frontend/Marketing/Analysis等（動的切替）'" C-m
tmux send-keys -t gemini-5panel:0.2 "cd agents/developers && exec gemini" C-m

# Developer2画面（右下）
tmux split-window -v -t gemini-5panel:0.1 -c "$PROJECT_DIR"
tmux send-keys -t gemini-5panel:0.3 "echo '🔧 Developer2画面 - 適応型実行'" C-m
tmux send-keys -t gemini-5panel:0.3 "echo '専門分野: Backend/Content/Strategy等（動的切替）'" C-m
tmux send-keys -t gemini-5panel:0.3 "cd agents/developers && exec gemini" C-m

# System Monitor画面（下部全体）
tmux split-window -v -t gemini-5panel:0.2 -c "$PROJECT_DIR"
tmux send-keys -t gemini-5panel:0.4 "echo '📊 System Monitor & Logs'" C-m
tmux send-keys -t gemini-5panel:0.4 "echo 'ログ監視: tail -f logs/system.log'" C-m
tmux send-keys -t gemini-5panel:0.4 "echo 'MCP通信監視: tail -f ../claude-to-gemini.txt'" C-m

# レイアウト最適化
tmux select-layout -t gemini-5panel tiled

# 画面サイズ調整
tmux resize-pane -t gemini-5panel:0.0 -U 5
tmux resize-pane -t gemini-5panel:0.1 -U 5
tmux resize-pane -t gemini-5panel:0.4 -D 10

echo "✅ 5分割AI組織画面起動完了！"
echo ""
echo "🔗 接続方法:"
echo "   tmux attach -t gemini-5panel"
echo ""
echo "🎛️ tmux操作方法:"
echo "   Ctrl+B → 矢印キー: 画面間移動"
echo "   Ctrl+B → d: セッションデタッチ"
echo "   Ctrl+B → &: セッション終了"
echo ""
echo "📊 画面構成:"
echo "   ┌─────────────┬─────────────┐"
echo "   │   🏢 CEO    │ 👔 Manager  │"
echo "   ├─────────────┼─────────────┤"
echo "   │ 🔧 Dev1     │ 🔧 Dev2     │"
echo "   ├─────────────┴─────────────┤"
echo "   │      📊 System Monitor    │"
echo "   └─────────────────────────────┘"