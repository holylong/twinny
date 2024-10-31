import * as vscode from "vscode"

import { ClientMessage } from "../common/types"

export class CodePreviewPanel {
  public static currentPanel: CodePreviewPanel | undefined;
  private readonly _panel: vscode.WebviewPanel;

  constructor() {
    this._panel = vscode.window.createWebviewPanel(
      "codePreview",
      "代码预览",
      vscode.ViewColumn.Beside,
      {
        enableScripts: true,
      }
    );

    this._panel.onDidDispose(() => this.dispose(), null);
  }

  public previewCode(message: ClientMessage) {
    if (CodePreviewPanel.currentPanel) {
      // 如果面板已存在，直接更新内容
      CodePreviewPanel.currentPanel.updateCode(message);
    } else {
      // 如果面板不存在，创建新面板
      const panel = new CodePreviewPanel();
      panel.updateCode(message);
      CodePreviewPanel.currentPanel = panel;
    }
  }

  public updateCode(message: ClientMessage) {
    this._panel.webview.html = this._getWebviewContent(message.data as string);
  }


  public dispose() {
    CodePreviewPanel.currentPanel = undefined;
    this._panel.dispose();
  }

  private _getWebviewContent(code: string): string {
    return code;
  }
}