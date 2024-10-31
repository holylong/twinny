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