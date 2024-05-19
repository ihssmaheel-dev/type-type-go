import React from 'react'
import UserInputField from "./UserInputField";
import TypingTextDisplay from "./TypingTextDisplay";

interface TypingDisplayContainerProps {
	containerRef: React.RefObject<HTMLDivElement>;
	inputRef: React.RefObject<HTMLInputElement>;
	handleKeydown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	paragraph: string;
	charIndex: number;
	correctWrong: ("correct" | "wrong" | "")[];
	charRefs: React.MutableRefObject<(HTMLSpanElement | null)[]>
}

const TypingDisplayContainer: React.FC<TypingDisplayContainerProps> = ({
	containerRef,
	inputRef,
	handleKeydown,
	paragraph,
	charIndex,
	correctWrong,
	charRefs
}) => {
	return (
		<div id="typing-container" ref={containerRef} className='w-10/12 max-h-80 overflow-y-auto m-4 p-8 rounded-lg bg-gray-200 shadow scroll scrollbar-none overscroll-auto scroll-smooth'>
			<UserInputField inputRef={inputRef} handleKeyDown={handleKeydown} />
			<TypingTextDisplay paragraph={paragraph} charIndex={charIndex} correctWrong={correctWrong} charRefs={charRefs} />
		</div>
	)
}

export default TypingDisplayContainer;