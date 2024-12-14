// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { SpriteQuickPickProvider } from './spriteQuickPick';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log('Sprix extension is now active!');

	// Create disposable for the type event listener
	const typeListener = vscode.workspace.onDidChangeTextDocument((event) => {
		// Only proceed for JavaScript and TypeScript files
		if (!['javascript', 'typescript', 'javascriptreact', 'typescriptreact'].includes(event.document.languageId)) {
			return;
		}

		// Get the editor for the current document
		const editor = vscode.window.activeTextEditor;

		if (!editor) {
			console.log('No active editor');
			return;
		}

		// Process each change
		event.contentChanges.forEach(change => {
			// Get the full line text at the position of the change
			const line = editor.document.lineAt(change.range.start.line).text;
			
			// Check for our patterns in the current line
			if (line.includes('<Sprite name="') || line.includes("<Sprite name='")) {
				const cursorPosition = editor.selection.active;
				const namePosition = line.indexOf('name="') || line.indexOf("name='");
				const nameEndPosition = line.indexOf('"', namePosition + 6) || line.indexOf("'", namePosition + 6);
				
				// Make sure cursor position is betwen quotes
				console.log(`cursor position character: ${cursorPosition.character}`);
				if (cursorPosition.character < namePosition || cursorPosition.character > nameEndPosition) {
					console.log(`cursor position character: ${cursorPosition.character}`);
					console.log(`name position: ${namePosition}`);
					console.log(`quote position: ${nameEndPosition}`);
					return;
				}
				
				// Get the sprite name
				const spriteName = line.substring(namePosition + 6, nameEndPosition);
				console.log(`sprite name: ${spriteName}`);
				
				const quickPick = new SpriteQuickPickProvider(spriteName);
				quickPick.show();
			}
		});
	});

	// Register the command that is specified in package.json
	const helloCommand = vscode.commands.registerCommand('sprix.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from Sprix!');
	});

	// Add our disposables to the extension context
	context.subscriptions.push(typeListener, helloCommand);
}

// This method is called when your extension is deactivated
export function deactivate() {}
