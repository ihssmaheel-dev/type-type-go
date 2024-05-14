import React, { useEffect, useRef, useState } from 'react'
import { MdRefresh } from 'react-icons/md'

const paragraph = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident rerum facilis fugiat totam? Earum sequi ex delectus adipisci magnam laborum sunt excepturi quis minus, in dolores voluptate reiciendis veniam, culpa facilis repellat eveniet accusantium hic maiores totam repellendus nesciunt nostrum pariatur beatae! Unde facilis, tempora eius qui laudantium nisi adipisci."

const TypingTest = () => {
	
	const MAX_TIME = 60;
	const [timeLeft, setTimeLeft] = useState(MAX_TIME);
	const [mistakes, setMistakes] = useState(0);
	const [charIndex, setCharIndex] = useState(0)
	const [isTyping, setIsTyping] = useState(false);
	const [WPM, setWPM] = useState(0);
	const [CPM, setCPM] = useState(0);
	const inputRef = useRef(null);
	const charRefs = useRef([]);

	useEffect(() => {
		inputRef.current.focus();
	}, []);

	const handleChange = (e) => {
		const characters = charRefs.current;
		let currentChar = charRefs.current[charIndex];
		let typedChar = e.target.value.slice(-1);
		if(charIndex < characters.length && timeLeft > 0) {
			if(!isTyping) {
				setIsTyping(true);
			}

			if(typedChar === currentChar.textContent) {
				setCharIndex(charIndex + 1);
			} else {
				setCharIndex(charIndex + 1);
				setMistakes(mistakes + 1);
			}

			if(charIndex === characters.length - 1) setIsTyping(false);
		} else {
			setIsTyping(false);
		}
	}
	
	return (
		<div className='max-w-4xl m-4 p-8 rounded-lg bg-gray-200 shadow'>
			<div className="select-none">
				<input type="text" className='absolute z-[-999] opacity-0' ref={inputRef} onChange={handleChange} />
				{
					paragraph.split("").map((char, index) => (
						<span className={`text-2xl leading-9 select-none cursor-text ${index === charIndex ? "border-b border-solid border-slate-900" : ""}`} ref={(e) => charRefs.current[index] = e}>
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
				<button type='button' className='px-3 py-2 outline-none border border-solid border-gray-400 bg-slate-900 rounded-md cursor-pointer text-white text-base transition-all duration-500 hover:bg-slate-800'>
					<MdRefresh />
				</button>
			</div>
		</div>
	)
}

export default TypingTest