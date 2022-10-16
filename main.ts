import {
	Editor,
	MarkdownView,
	Plugin,
} from 'obsidian';
import SampleModal from "./components/SampleModal";
import QuoteSettingTab from "./components/QuoteSettingTab";

interface MyPluginSettings {
	quote: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	quote: 'Take chances, make mistakes, get messy.',
}

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		await this.loadSettings();

		const statusBar = this.addStatusBarItem();
		statusBar.createEl("span", { text: `${this.settings.quote} ✍️` });

		// TODO: Add ribbon icon that replace quote setting.
		const ribbonIconEl = this.addRibbonIcon('dice', 'Replace quote', (evt: MouseEvent) => {
			console.log("ribbon clicked")
		});

		// TODO: Add command that replace quote setting.
		this.addCommand({
			id: 'open-modal-replace-quote',
			name: 'Replace status bar quote',
			callback: () => {
				new SampleModal(this.app).open();
			}
		});
		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: 'sample-editor-command',
			name: 'Sample editor command',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				// 유저의 커서 뒤에 특정 문자열을 추가함
				console.log(editor.getSelection());
				editor.replaceSelection('Sample Editor Command');
			}
		});
		// This adds a complex command that can check whether the current state of the app allows execution of the command
		this.addCommand({
			id: 'open-sample-modal-complex',
			name: 'Open sample modal (complex)',
			checkCallback: (checking: boolean) => {
				// Conditions to check
				const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (markdownView) {
					// If checking is true, we're simply "checking" if the command can be run.
					// If checking is false, then we want to actually perform the operation.
					if (!checking) {
						new SampleModal(this.app).open();
					}

					// This command will only show up in Command Palette when the check function returns true
					return true;
				}
			}
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new QuoteSettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			console.log('click', evt);
		});

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
