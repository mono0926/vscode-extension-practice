import * as vscode from 'vscode'

// this method is called when vs code is activated
export function activate(context: vscode.ExtensionContext) {
  console.log('decorator sample is activated')

  let timeout: NodeJS.Timer | undefined = undefined

  // create a decorator type that we use to decorate small numbers
  const smallNumberDecorationType = vscode.window.createTextEditorDecorationType(
    {
      // borderWidth: '1px',
      // borderStyle: 'solid',
      // overviewRulerColor: 'blue',
      // overviewRulerLane: vscode.OverviewRulerLane.Right,
      // light: {
      // 	// this color will be used in light color themes
      // 	borderColor: 'darkblue',
      // },
      // dark: {
      // 	// this color will be used in dark color themes
      // 	borderColor: 'lightblue',
      // },
      after: {
        color: 'green',
        margin: '2px',
      },
      rangeBehavior: vscode.DecorationRangeBehavior.ClosedOpen,
    }
  )

  let activeEditor = vscode.window.activeTextEditor

  function updateDecorations() {
    if (!activeEditor) {
      return
    }
    4
    const regEx = /.+/g
    const text = activeEditor.document.getText()
    const smallNumbers: vscode.DecorationOptions[] = []
    let match
    while ((match = regEx.exec(text))) {
      const pos = activeEditor.document.positionAt(
        match.index + match[0].length
      )
      const decoration = <vscode.DecorationOptions>{
        range: new vscode.Range(pos, pos),
        hoverMessage: 'Number **' + match[0] + '**',
        renderOptions: {
          after: {
            contentText: '  🐶🐶🐶🐶Dog',
          },
        },
      }
      smallNumbers.push(decoration)
    }
    activeEditor.setDecorations(smallNumberDecorationType, smallNumbers)
  }

  function triggerUpdateDecorations() {
    if (timeout) {
      clearTimeout(timeout)
      timeout = undefined
    }
    timeout = setTimeout(updateDecorations, 500)
  }

  if (activeEditor) {
    triggerUpdateDecorations()
  }

  vscode.window.onDidChangeActiveTextEditor(
    (editor) => {
      activeEditor = editor
      if (editor) {
        triggerUpdateDecorations()
      }
    },
    null,
    context.subscriptions
  )

  vscode.workspace.onDidChangeTextDocument(
    (event) => {
      if (activeEditor && event.document === activeEditor.document) {
        triggerUpdateDecorations()
      }
    },
    null,
    context.subscriptions
  )
}
