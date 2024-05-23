import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import { ModeType } from "../types";

const generateRandomParagraph = (mode: ModeType, count: number) => {
	const getFilteredWords = (sourceFunc: () => string) => {
		const words = [];
		while (words.length < count) {
			const newWords = sourceFunc().split(" ").filter(word => word.length <= 7);
			words.push(...newWords.slice(0, count - words.length))
		}

		return words.join(" ");
	};

	switch (mode) {
		case "words":
			return getFilteredWords(() => faker.word.words(count));
		case "lorem":
			return getFilteredWords(() => faker.lorem.words(count));
		default:
			return getFilteredWords(() => faker.word.words(200));
	}
}	

const useParagraphGenerator = (mode: ModeType, maxWords: number) => {
	const [paragraph, setParagraph] = useState(generateRandomParagraph(mode, maxWords));

	const generateNewParagraph = () => {
		setParagraph(generateRandomParagraph(mode, maxWords));
	};

	useEffect(() => {
		generateNewParagraph();
	}, [mode, maxWords]);

	return { paragraph, generateNewParagraph };
}

export default useParagraphGenerator;