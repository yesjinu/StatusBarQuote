import {App, PluginSettingTab, Setting} from "obsidian";
import MyPlugin from "../main";

class QuoteSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Pick one quote that makes you brave'});

		new Setting(containerEl)
			.setName('QUOTE')
			.setDesc('What drives you?')
			.addText(text => text
				.setPlaceholder('Enter your mantra')
				.setValue(this.plugin.settings.quote)
				.onChange(async (value) => {
					console.log('Mantra: ' + value);
					this.plugin.settings.quote = value;
					await this.plugin.saveSettings();
				}));
	}
}

export default QuoteSettingTab;
