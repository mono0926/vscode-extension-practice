"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
function activate(context) {
    console.log('Congratulations, your extension "helloworld" is now active!');
    let disposable = vscode.commands.registerCommand('helloworld.helloWorld', () => {
        const message = 'Hello VS Code';
        vscode.window.showInformationMessage(message);
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
    console.log('helloworld deactivate');
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map