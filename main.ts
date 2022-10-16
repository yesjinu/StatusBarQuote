import { Plugin } from 'obsidian';
import StatusBarQuoteSettingTab from "./components/StatusBarQuoteSettingTab";

interface StatusBarQuoteSettings {
	quote: string;
}

const DEFAULT_SETTINGS: StatusBarQuoteSettings = {
	quote: 'Take chances, make mistakes, get messy.',
}

export default class StatusBarQuote extends Plugin {
	settings: StatusBarQuoteSettings;

	async onload() {
		await this.loadSettings();

		const statusBar = this.addStatusBarItem();
		statusBar.createEl("span", { text: `${this.settings.quote} ✍️` });

		// TODO: Add ribbon icon that replace quote setting.
		// const ribbonIconEl = this.addRibbonIcon('dice', 'Replace quote', (evt: MouseEvent) => {
		// 	console.log("ribbon clicked")
		// });

		// TODO: Add command that replace quote setting.
		// this.addCommand({
		// 	id: 'open-modal-replace-quote',
		// 	name: 'Replace status bar quote',
		// 	callback: () => {
		// 		new SampleModal(this.app).open();
		// 	}
		// });

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new StatusBarQuoteSettingTab(this.app, this));
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
