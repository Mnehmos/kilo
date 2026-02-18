import * as vscode from "vscode"

export interface EditorContext {
  filePath: string
  selectedText: string
  startLine: number
  endLine: number
  diagnostics: vscode.Diagnostic[]
}

export function getEditorContext(): EditorContext | undefined {
  const editor = vscode.window.activeTextEditor
  if (!editor) return undefined
  const selection = editor.selection
  if (selection.isEmpty) return undefined
  const doc = editor.document
  return {
    filePath: vscode.workspace.asRelativePath(doc.uri),
    selectedText: doc.getText(selection),
    startLine: selection.start.line + 1,
    endLine: selection.end.line + 1,
    diagnostics: vscode.languages.getDiagnostics(doc.uri).filter(
      (d) => d.range.intersection(selection) !== undefined
    ),
  }
}

export function getTerminalContent(lines = -1): string {
  const terminal = vscode.window.activeTerminal
  if (!terminal) return ""
  // VS Code doesn't expose terminal buffer contents via API
  // Use clipboard-based workaround or terminal selection
  // For now, return empty — terminal content capture requires shell integration
  return ""
}
