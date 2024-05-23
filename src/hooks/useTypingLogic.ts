import { useEffect, useRef, useState } from "react"
import { calculateAccuracy, calculateCPM, calculateWPM } from "../utils/helper";
import { CorrectWrongType, SoundKey } from "../types";

const useTypingLogic = (paragraph: string, maxTime: number, timeLeft: number, startTimer: () => void, play: (key: SoundKey) => void) => {
	const [charIndex, setCharIndex] = useState(0);
	const [mistakes, setMistakes] = useState(0);
	const [WPM, setWPM] = useState(0);
	const [CPM, setCPM] = useState(0);
	const [accuracy, setAccuracy] = useState(100);
	const [correctWrong, setCorrectWrong] = useState<CorrectWrongType[]>([]);
	const [isTyping, setIsTyping] = useState(false);
	const [errors, setErrors] = useState(0);
	const charRefs = useRef<(HTMLSpanElement | null)[]>([]);	

	useEffect(() => {
		setCorrectWrong(Array(paragraph.length).fill(""));
		charRefs.current = Array(paragraph.length).fill(null);
	}, [paragraph]);

	useEffect(() => {
		let interval: ReturnType<typeof setInterval> | undefined;
		if(isTyping && timeLeft > 0) {
			interval = setInterval(() => {
				const correctChars = charIndex - mistakes;
				const totalTime = maxTime - timeLeft;

				setWPM(calculateWPM(correctChars, totalTime));
				setCPM(calculateCPM(correctChars, timeLeft));
			}, 1000);
		} else {
			setIsTyping(false);
			clearInterval(interval);
		}

		return () => clearInterval(interval);
	}, [isTyping, timeLeft]);

	const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const characters = charRefs.current;

		if(isTyping && e.code === "Backspace") {
			play("space")
			if(charIndex < 0) return;

			setCharIndex((prevCharIndex) => prevCharIndex - 1);
			const isWrong = correctWrong[charIndex - 1] === "wrong";
			isWrong && setMistakes((prevMistakes) => prevMistakes - 1);

			setCorrectWrong((prevCorrectWrong) => {
				const newCorrectWrong = [...prevCorrectWrong];
				newCorrectWrong[charIndex - 1] = "";

				return newCorrectWrong;
			});
		}

		if(e.key.length === 1) {
			const typedChar = e.key;
			const currentChar = characters[charIndex]?.textContent;

			if(charIndex < characters.length && timeLeft > 0) {
				if (!isTyping) {
					setIsTyping(true);
					startTimer();
				}

				setCharIndex((prevCharIndex) => prevCharIndex + 1);

				setCorrectWrong((prevCorrectWrong) => {
					const newCorrectWrong = [...prevCorrectWrong];
					newCorrectWrong[charIndex] = typedChar === currentChar ? "correct" : "wrong";
					if(typedChar !== currentChar) {
						play("error");
						setMistakes((prevMistakes) => prevMistakes + 1);
						setErrors((prevErrors) => prevErrors + 1);
					} else {
						play(e.code === "Space" ? "space" : "key")
					}

					return newCorrectWrong;
				});

				if(charIndex === characters.length - 1) setIsTyping(false);

				setAccuracy(calculateAccuracy(charIndex, errors, typedChar, currentChar));
				
			} else {
				setIsTyping(false);
			}
		}
	};

	const resetTyping = () => {
		setCharIndex(0);
		setMistakes(0);
		setWPM(0);
		setCPM(0);
		setAccuracy(100);
		setCorrectWrong(Array(paragraph.length).fill(""));
		charRefs.current = Array(paragraph.length).fill(null);
		setErrors(0);
		setIsTyping(false);
	}

	return { charIndex, charRefs, mistakes, WPM, CPM, accuracy, correctWrong, handleKeydown, resetTyping }
}

export default useTypingLogic;