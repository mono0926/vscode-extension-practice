import * as vscode from 'vscode'

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "helloworld" is now active!')

  let disposable = vscode.commands.registerCommand(
    'helloworld.helloWorld',
    () => {
      const message = 'Hello VS Code'
      vscode.window.showInformationMessage(message)
    }
  )

  context.subscriptions.push(disposable)
}

// this method is called when your extension is deactivated
export function deactivate() {
  console.log('helloworld deactivate')
}
