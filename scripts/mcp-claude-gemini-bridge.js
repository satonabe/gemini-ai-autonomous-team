#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import fs from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import os from 'os';

const execAsync = promisify(exec);

// ホームディレクトリベースに修正
const BASE_DIR = os.homedir();  // ホームディレクトリを取得
const GEMINI_DIR = path.join(BASE_DIR, 'gemini-ai-autonomous-team');

// サーバーインスタンス作成
const server = new Server(
  {
    name: 'claude-gemini-bridge',
    version: '3.0.0-jp',
  },
  {
    capabilities: {
      tools: {}
    }
  }
);

// ツール一覧
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'send_to_gemini',
        description: 'Gemini組織にプロジェクト指示を送信（日本語対応）',
        inputSchema: {
          type: 'object',
          properties: {
            instruction: {
              type: 'string',
              description: 'プロジェクト指示内容（日本語）'
            }
          },
          required: ['instruction']
        }
      },
      {
        name: 'check_status',
        description: 'Gemini組織の状況確認（日本語表示）',
        inputSchema: {
          type: 'object',
          properties: {},
          required: []
        }
      },
      {
        name: 'start_gemini',
        description: 'Gemini組織システム起動（日本語対応）',
        inputSchema: {
          type: 'object',
          properties: {},
          required: []
        }
      },
      {
        name: 'list_projects',
        description: '生成されたプロジェクト一覧表示（日本語）',
        inputSchema: {
          type: 'object',
          properties: {},
          required: []
        }
      }
    ]
  };
});

// ツール実行ハンドラー
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'send_to_gemini': {
        const { instruction } = args;
        
        // 日本語指示を詳細化
        const timestamp = new Date().toISOString();
        const fullInstruction = `【プロジェクト指示】
時刻: ${timestamp}
指示: ${instruction}

【実行要求】
- 日本語で作業を進めてください
- 高品質なコードを生成してください
- 完了後、結果を報告してください
`;

        // 指示をファイルに保存（ホームディレクトリベース）
        const instructionFile = path.join(BASE_DIR, 'claude-to-gemini.txt');
        
        try {
          fs.writeFileSync(instructionFile, fullInstruction);
          
          // Gemini組織システムが起動しているかチェック
          const { stdout: statusCheck } = await execAsync('tmux list-sessions 2>/dev/null || echo ""');
          
          if (!statusCheck.includes('gemini-5panel')) {
            return {
              content: [{
                type: 'text',
                text: '❌ エラー: Gemini組織システムが起動していません。先にstart_geminiを実行してください。'
              }]
            };
          }

          return {
            content: [{
              type: 'text',
              text: '✅ 指示送信完了！Gemini組織システムで作業を開始しました。'
            }]
          };
        } catch (error) {
          return {
            content: [{
              type: 'text',
              text: `❌ エラー: 指示送信失敗: ${error.message}`
            }]
          };
        }
      }
      
      case 'check_status': {
        let status = '🤖 Gemini組織システム: ';
        
        try {
          const { stdout } = await execAsync('tmux list-sessions 2>/dev/null || echo ""');
          
          if (stdout.includes('gemini-5panel')) {
            status += '✅ 稼働中\n\n';
            status += '📱 アクティブセッション: 5件\n';
            status += '  🔹 gemini-5panel\n';
            status += '  🔹 gemini-ceo\n';
            status += '  🔹 gemini-dev1\n';
            status += '  🔹 gemini-dev2\n';
            status += '  🔹 gemini-team\n\n';
          } else {
            status += '❌ 停止中\n\n';
          }
          
          status += '📂 プロジェクトディレクトリ準備中\n\n';
          status += `📍 作業ディレクトリ: ${BASE_DIR}\n`;
          status += `🏢 Geminiディレクトリ: ${GEMINI_DIR}\n`;
          status += `📦 プロジェクト保存先: ${path.join(GEMINI_DIR, 'projects')}\n\n`;
          
          if (stdout.includes('gemini-5panel')) {
            status += '🚀 システム準備完了！プロジェクト指示をお待ちしています。';
          } else {
            status += '⏳ システム起動が必要です。start_geminiを実行してください。';
          }
          
        } catch (error) {
          status += `❌ エラー: ${error.message}`;
        }
        
        return {
          content: [{
            type: 'text',
            text: status
          }]
        };
      }
      
      case 'start_gemini': {
        try {
          const { stdout } = await execAsync('tmux list-sessions 2>/dev/null || echo ""');
          
          if (stdout.includes('gemini-5panel')) {
            return {
              content: [{
                type: 'text',
                text: '✅ Gemini組織システムは既に稼働中です！'
              }]
            };
          }
          
          // 5パネルシステム起動
          const startScript = path.join(BASE_DIR, 'claude-gemini-integration', 'scripts', 'start-5panel-system.sh');
          await execAsync(`chmod +x "${startScript}"`);
          await execAsync(`"${startScript}"`);
          
          return {
            content: [{
              type: 'text',
              text: '🚀 Gemini組織システムを起動しました！\n5つのAIエージェントが連携して作業を開始します。'
            }]
          };
        } catch (error) {
          return {
            content: [{
              type: 'text',
              text: `❌ エラー: 起動失敗: ${error.message}`
            }]
          };
        }
      }
      
      case 'list_projects': {
        try {
          const projectsDir = path.join(GEMINI_DIR, 'projects');
          
          if (!fs.existsSync(projectsDir)) {
            return {
              content: [{
                type: 'text',
                text: '📂 プロジェクトディレクトリが存在しません。\n\nプロジェクトを生成してください。'
              }]
            };
          }
          
          const projects = fs.readdirSync(projectsDir);
          
          if (projects.length === 0) {
            return {
              content: [{
                type: 'text',
                text: '📂 プロジェクトがまだ作成されていません。\n\n指示を送信してプロジェクトを生成してください。'
              }]
            };
          }
          
          let projectList = '📂 生成されたプロジェクト一覧:\n\n';
          projects.forEach((project, index) => {
            projectList += `${index + 1}. ${project}\n`;
          });
          
          return {
            content: [{
              type: 'text',
              text: projectList
            }]
          };
        } catch (error) {
          return {
            content: [{
              type: 'text',
              text: `❌ エラー: プロジェクト一覧取得失敗: ${error.message}`
            }]
          };
        }
      }
      
      default:
        return {
          content: [{
            type: 'text',
            text: `❌ 不明なツール: ${name}`
          }]
        };
    }
  } catch (error) {
    return {
      content: [{
        type: 'text',
        text: `❌ エラー: ${error.message}`
      }]
    };
  }
});

// サーバー起動
async function main() {
  console.error('🚀 Claude-Gemini統合ブリッジを起動中...');
  console.error(`📍 ベースディレクトリ: ${BASE_DIR}`);
  console.error(`🏢 Geminiディレクトリ: ${GEMINI_DIR}`);
  
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('✅ サーバー起動完了！');
}

main().catch(console.error);