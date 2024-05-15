import React, { useCallback, useEffect, useRef, useState } from 'react'
import TextDisplay from './TextDisplay';
import UserInput from './UserInput';
import Stats from './Stats';
import { calculateCPM, calculateWPM } from '../Utils/helper';

const paragraph = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident rerum facilis fugiat totam? Earum sequi ex delectus adipisci magnam laborum sunt excepturi quis minus, in dolores voluptate reiciendis veniam, culpa facilis repellat eveniet accusantium hic maiores totam repellendus nesciunt nostrum pariatur beatae! Unde facilis, tempora eius qui laudantium nisi adipisci."

type CorrectWrongType = "correct" | "wrong" | "";

const TypingTest = () => {
	const [maxTime, setMaxTime] = useState(60);
	const [timeLeft, setTimeLeft] = useState(maxTime);
	const [mistakes, setMistakes] = useState(0);
	const [charIndex, setCharIndex] = useState(0)
	const [isTyping, setIsTyping] = useState(false);
	const [WPM, setWPM] = useState(0);
	const [CPM, setCPM] = useState(0);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
	const [correctWrong, setCorrectWrong] = useState<CorrectWrongType[]>([]);

	useEffect(() => {
		inputRef.current?.focus();
		setCorrectWrong(Array(charRefs.current.length).fill(''));
	}, []);

	useEffect(() => {
		let interval: ReturnType<typeof setInterval> | undefined;
		if (isTyping && timeLeft > 0) {
			interval = setInterval(() => {
				setTimeLeft(prevTimeLeft => {
					const newTimeLeft = prevTimeLeft - 1;
					if (newTimeLeft === 0) {
						clearInterval(interval);
						setIsTyping(false);
					}

					return newTimeLeft;
				});

				const correctChars = charIndex - mistakes;
				const totalTime = maxTime - timeLeft;

				setCPM(calculateCPM(correctChars, totalTime));
				setWPM(calculateWPM(correctChars, totalTime));
			}, 1000);
		} else if (timeLeft === 0) {
			clearInterval(interval);
			setIsTyping(false);
		} else {
			clearInterval(interval);
		}

		return () => clearInterval(interval);
	}, [isTyping, timeLeft]);

	const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const characters = charRefs.current;

		if(isTyping) {
			if ((e.nativeEvent as any).inputType === 'deleteContentBackward') {
				if (charIndex > 0) {
					setCharIndex((prevIndex) => prevIndex - 1);
					if (correctWrong[charIndex - 1] === 'wrong') {
						setMistakes((prevMistakes) => prevMistakes - 1);
					}
					setCorrectWrong((prevCorrectWrong) => {
						const newCorrectWrong = [...prevCorrectWrong];
						newCorrectWrong[charIndex - 1] = '';
	
						return newCorrectWrong;
					});
				}
				return;
			}
		}

		const currentChar = characters[charIndex]?.textContent;
		const typedChar = e.target.value.slice(-1);

		if (charIndex < characters.length && timeLeft > 0) {
			if(!isTyping) setIsTyping(true);
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
	},
		[charIndex, timeLeft, isTyping]
	);

	const reset = () => {
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
		<div className='max-w-4xl m-4 p-8 rounded-lg bg-gray-200 shadow'>
			<UserInput
				inputRef={inputRef}
				handleChange={handleChange}
			/>
			<TextDisplay
				paragraph={paragraph}
				charIndex={charIndex}
				correctWrong={correctWrong}
				charRefs={charRefs}
			/>
			<Stats timeLeft={timeLeft} mistakes={mistakes} WPM={WPM} CPM={CPM} reset={reset} />
		</div>
	)
}

export default TypingTest