import * as vscode from 'vscode'

const myStatusBarItem = vscode.window.createStatusBarItem(
  vscode.StatusBarAlignment.Right,
  100
)

export function activate({ subscriptions }: vscode.ExtensionContext) {
  const myCommandId = 'statusbar.statusbar'
  subscriptions.push(
    vscode.commands.registerCommand(myCommandId, () => {
      const n = getNumberOfSelectedLines(vscode.window.activeTextEditor)
      vscode.window.showInformationMessage(
        `Yeah, ${n} line(s) selected... Keep going!`
      )
    })
  )

  // create a new status bar item that we can now manage
  myStatusBarItem.command = myCommandId
  subscriptions.push(myStatusBarItem)

  // register some listener that make sure the status bar
  // item always up-to-date
  subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem)
  )
  subscriptions.push(
    vscode.window.onDidChangeTextEditorSelection(updateStatusBarItem)
  )

  // update status bar item once at start
  updateStatusBarItem()
}

function updateStatusBarItem(): void {
  const n = getNumberOfSelectedLines(vscode.window.activeTextEditor)
  if (n > 0) {
    myStatusBarItem.text = `📣$(megaphone) ${n} line(s) selected`
    myStatusBarItem.show()
  } else {
    myStatusBarItem.hide()
  }
}

function getNumberOfSelectedLines(
  editor: vscode.TextEditor | undefined
): number {
  let lines = 0
  if (editor) {
    console.log(editor.document.getText())
    lines = editor.selections.reduce(
      (prev, curr) => prev + (curr.end.line - curr.start.line),
      0
    )
  }
  return lines
}
