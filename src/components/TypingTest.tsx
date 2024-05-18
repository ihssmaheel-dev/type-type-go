import React, { useEffect, useRef, useState } from 'react';
import TextDisplay from './TextDisplay';
import UserInput from './UserInput';
import Stats from './Stats';
import { calculateCPM, calculateWPM } from '../Utils/helper';
import { faker } from '@faker-js/faker';

const generateRandomParagraph = (count: number) => {
	return faker.word.words(count).toLowerCase();
}

type CorrectWrongType = "correct" | "wrong" | "";

const TypingTest = () => {
	const [maxWords, setMaxWords] = useState(50);
	const [paragraph, setParagraph] = useState(generateRandomParagraph(maxWords));
	const [maxTime, setMaxTime] = useState(60);
	const [timeLeft, setTimeLeft] = useState(maxTime);
	const [mistakes, setMistakes] = useState(0);
	const [charIndex, setCharIndex] = useState(0);
	const [isTyping, setIsTyping] = useState(false);
	const [WPM, setWPM] = useState(0);
	const [CPM, setCPM] = useState(0);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
	const [correctWrong, setCorrectWrong] = useState<CorrectWrongType[]>([]);

	const handleFocus = () => {
		inputRef.current?.focus();
	}

	useEffect(() => {
		inputRef.current?.focus();
		setCorrectWrong(Array(charRefs.current.length).fill(''));
	}, []);

	useEffect(() => {
		let interval: ReturnType<typeof setInterval> | undefined;
		if (isTyping && timeLeft > 0) {
			interval = setInterval(() => {
				setTimeLeft(prevTimeLeft => (prevTimeLeft - 1));

				const correctChars = charIndex - mistakes;
				const totalTime = maxTime - timeLeft;

				setCPM(calculateCPM(correctChars, totalTime));
				setWPM(calculateWPM(correctChars, totalTime));
			}, 1000);
		} else {
			setIsTyping(false);
			clearInterval(interval);
		}

		return () => clearInterval(interval);
	}, [isTyping, timeLeft]);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const characters = charRefs.current;

		if (isTyping && e.code === 'Backspace') {
			if(charIndex < 0) return;
			
			setCharIndex((prevIndex) => prevIndex - 1);
			const isWrong = correctWrong[charIndex - 1] === 'wrong'; 
			isWrong && setMistakes((prevMistakes) => prevMistakes - 1); 

			setCorrectWrong((prevCorrectWrong) => {
				const newCorrectWrong = [...prevCorrectWrong];
				newCorrectWrong[charIndex - 1] = '';

				return newCorrectWrong;
			});
		}

		if (e.key.length === 1) {
			const typedChar = e.key;
			const currentChar = characters[charIndex]?.textContent;

			if (charIndex < characters.length && timeLeft > 0) {
				if (!isTyping) setIsTyping(true);

				setCharIndex((prevIndex) => prevIndex + 1);

				setCorrectWrong((prevCorrectWrong) => {
					const newCorrectWrong = [...prevCorrectWrong];
					newCorrectWrong[charIndex] = typedChar === currentChar ? 'correct' : 'wrong';
					if (typedChar !== currentChar) {
						setMistakes((prevMistakes) => prevMistakes + 1);
					}

					return newCorrectWrong;
				});

				if (charIndex === characters.length - 1) setIsTyping(false);
			} else {
				setIsTyping(false);
			}
		}
	};

	const reset = () => {
		const newParagraph = generateRandomParagraph(maxWords);
		setParagraph(newParagraph);
		setIsTyping(false);
		setTimeLeft(maxTime);
		setCharIndex(0);
		setMistakes(0);
		setCPM(0);
		setWPM(0);
		setCorrectWrong(Array(charRefs.current.length).fill(""));
		inputRef.current?.focus();
	}

	return (
		<div className='min-h-screen bg-slate-900 grid place-items-center font-noto-sans-mono tracking-wider px-12' onClick={handleFocus}>
			<div className={`max-w-4xl m-4 p-8 rounded-lg bg-gray-200 shadow`}>
					<UserInput
						inputRef={inputRef}
						handleKeyDown={handleKeyDown}
					/>
					<TextDisplay
						paragraph={paragraph}
						charIndex={charIndex}
						correctWrong={correctWrong}
						charRefs={charRefs}
					/>
					<Stats timeLeft={timeLeft} mistakes={mistakes} WPM={WPM} CPM={CPM} reset={reset} />
			</div>
		</div>
	)
}

export default TypingTest;
