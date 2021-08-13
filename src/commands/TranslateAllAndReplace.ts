import { QuickPickOptions, window } from 'vscode';
import { LanguageMap } from '../commons/LanguageMap';
import { setupHighlightCommand, getTranslationConfig, replaceHighlightedContent, getUserTranslateToValue } from '../commons/Utilities';
import { XConfig } from '../models';
const translate = require('@vitalets/google-translate-api');

export const translateAllAndReplace = async () =>
	setupHighlightCommand(async (highlightedText) => {
		const config = getTranslationConfig();

		if (config.promptToLanguage) {
			const selection = await getUserTranslateToValue();

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