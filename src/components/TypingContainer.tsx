import React from 'react'
import UserInput from "./UserInput";
import TextDisplay from "./TextDisplay";

interface TypingContainerProps {
	inputRef: React.RefObject<HTMLInputElement>;
	handleKeydown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	paragraph: string;
	charIndex: number;
	correctWrong: ("correct" | "wrong" | "")[];
	charRefs: React.MutableRefObject<(HTMLSpanElement | null)[]>
}

const TypingContainer: React.FC<TypingContainerProps> = ({
	inputRef,
	handleKeydown,
	paragraph,
	charIndex,
	correctWrong,
	charRefs
}) => {
	return (
		<div id="typing-container" className='w-10/12 max-h-80 overflow-y-auto m-4 p-8 rounded-lg bg-gray-200 shadow scroll scrollbar-none overscroll-auto scroll-smooth'>
			<UserInput inputRef={inputRef} handleKeyDown={handleKeydown} />
			<TextDisplay paragraph={paragraph} charIndex={charIndex} correctWrong={correctWrong} charRefs={charRefs} />
		</div>
	)
}

export default TypingContainer;