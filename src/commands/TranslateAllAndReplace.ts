import { QuickPickOptions, window } from 'vscode';
import { setupHighlightCommand, getTranslationConfig, replaceHighlightedContent } from '../commons';
import { XConfig } from '../models';
const translate = require('@vitalets/google-translate-api');

export const translateAllAndReplace = async () =>
	setupHighlightCommand(async (highlightedText) => {
		const config = getTranslationConfig();

		if (config.promptToLanguage) {
			const options: QuickPickOptions = {
				placeHolder: "Select a language to translate to"
			};

			const selection = await window.showQuickPick(["fr", "af"], options);

			if (selection) {
				const newConfig = { ...config, to: selection };
				return doTranslate(highlightedText, { ...newConfig }); 
			}
		}

		return doTranslate(highlightedText, { ...config });
	});

const doTranslate = async (highlightedText: string, config: XConfig): Promise<boolean> => {
	const result = await translate(highlightedText, { ...config });
	replaceHighlightedContent(result.text);
	return true;
};