import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";

type ModeType = "words" | "time" | "lorem";

const generateRandomParagraph = (mode: ModeType, count: number) => {
	switch (mode) {
		case "words":
			return faker.word.words(count);
		case "lorem":
			return faker.lorem.words(count);
		default:
			return faker.word.words(200);
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