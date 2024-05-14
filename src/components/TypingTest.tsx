import React, { useEffect, useRef, useState } from 'react'
import { MdRefresh } from 'react-icons/md'

const paragraph = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident rerum facilis fugiat totam? Earum sequi ex delectus adipisci magnam laborum sunt excepturi quis minus, in dolores voluptate reiciendis veniam, culpa facilis repellat eveniet accusantium hic maiores totam repellendus nesciunt nostrum pariatur beatae! Unde facilis, tempora eius qui laudantium nisi adipisci."

type CorrectWrongType = "correct" | "wrong" | "";

const TypingTest = () => {
	const MAX_TIME = 60;
	const [timeLeft, setTimeLeft] = useState(MAX_TIME);
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
		if(isTyping && timeLeft > 0) {
			interval = setInterval(() => {

				setTimeLeft(timeLeft - 1);
				let correctChars = charIndex - mistakes;
				let totalTime = MAX_TIME - timeLeft;

				let cpm = correctChars * (60 / totalTime);
				cpm = cpm < 0 || !cpm || cpm === Infinity ? 0 : cpm;
				setCPM(Math.round(cpm));

				let wpm = Math.round((correctChars / 5 / totalTime) * 60);
				wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
				setWPM(wpm);
			}, 1000)
		} else if (timeLeft === 0){
			clearInterval(interval);
			setIsTyping(false);
		} else {
			clearInterval(interval);
		}
	}, [isTyping, timeLeft])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const characters = charRefs.current;
		let currentChar = charRefs.current[charIndex]?.textContent;
		let typedChar = e.target.value.slice(-1);
		if(charIndex < characters.length && timeLeft > 0) {
			if(!isTyping) {
				setIsTyping(true);
			}

			if(typedChar === currentChar) {
				setCharIndex(charIndex + 1);
				setCorrectWrong((prevCorrectWrong) => {
					const newCorrectWrong = [...prevCorrectWrong];
					newCorrectWrong[charIndex] = "correct";
					return newCorrectWrong;
				})
			} else {
				setCharIndex(charIndex + 1);
				setMistakes(mistakes + 1);
				setCorrectWrong((prevCorrectWrong) => {
					const newCorrectWrong = [...prevCorrectWrong];
					newCorrectWrong[charIndex] = "wrong";
					return newCorrectWrong;
				})
			}

			if(charIndex === characters.length - 1) setIsTyping(false);
		} else {
			setIsTyping(false);
		}
	}

	const reset = () => {
		setIsTyping(false);
		setTimeLeft(MAX_TIME);
		setCharIndex(0);
		setMistakes(0);
		setCPM(0);
		setWPM(0);
		setCorrectWrong(Array(charRefs.current.length).fill(""));
		inputRef.current?.focus();
	}
	
	return (
		<div className='max-w-4xl m-4 p-8 rounded-lg bg-gray-200 shadow'>
			<div className="select-none">
				<input type="text" className='absolute z-[-999] opacity-0' ref={inputRef} onChange={handleChange} />
				{
					paragraph.split("").map((char, index) => (
						<span 
							className={`
								text-2xl leading-9 select-none cursor-text text-slate-600 
								${index === charIndex ? "border-b-4 border-solid border-slate-900" : ""} 
								${correctWrong[index] === "correct" ? "bg-green-500 text-slate-900" : ""} 
								${correctWrong[index] === "wrong" ? "bg-red-500 text-slate-900" : ""}
							`} 
							ref={(e) => charRefs.current[index] = e}
						>
							{char}
						</span>
					))
				}
			</div>
			<div className="flex justify-between items-center mt-4 pt-2.5 text-xl border-t border-solid border-slate-900 text-slate-900">
				<p>Time Left: <strong>{timeLeft}</strong></p>
				<p>Mistakes: <strong>{mistakes}</strong></p>
				<p>WPM: <strong>{WPM}</strong></p>
				<p>CPM: <strong>{CPM}</strong></p>
				<button type='button' className='px-3 py-2 outline-none border border-solid border-gray-400 bg-slate-900 rounded-md cursor-pointer text-white text-base transition-all duration-500 hover:bg-slate-800' onClick={reset}>
					<MdRefresh />
				</button>
			</div>
		</div>
	)
}

export default TypingTest