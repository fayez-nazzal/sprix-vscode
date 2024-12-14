import * as vscode from 'vscode';

export class SpriteQuickPickProvider {
    private quickPick: vscode.QuickPick<vscode.QuickPickItem>;

    constructor(spriteName: string) {
        this.quickPick = vscode.window.createQuickPick();
        const items = [
            "sprite-1",
            "sprite-2",
            "sprite-3",
            "sprite-4",
            "sprite-5",
            "sprite-6",
            "sprite-7",
            "sprite-8",
            "sprite-9",
            "sprite-10",
            "sprite-11",
            "test-1",
            "test-2",
            "test-3",
            "test-4",
            "test-5",
            "test-6",
            "test-7",
            "test-8",
            "test-9",
        ]
        const matches = items.filter((item) => item.includes(spriteName));
        this.quickPick.items = matches.map((item) => {
            return {
                label: item,
            };
        });
        this.quickPick.placeholder = 'Select a sprite...';
        this.quickPick.value = spriteName;
        
        this.quickPick.onDidAccept(() => {
            const selection = this.quickPick.selectedItems[0];
            console.log(`You selected ${selection.label}`);
            this.quickPick.hide();
        });
    }

    public show() {
        this.quickPick.show();
    }
}
