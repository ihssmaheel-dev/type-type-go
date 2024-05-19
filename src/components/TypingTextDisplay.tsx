import React from 'react'

interface TypingTextDisplayProps {
	paragraph: string;
	charIndex: number;
	correctWrong: ("correct" | "wrong" | "")[];
	charRefs: React.MutableRefObject<(HTMLSpanElement | null)[]>
}

const TypingTextDisplay: React.FC<TypingTextDisplayProps> = ({ 
	paragraph,
	charIndex,
	correctWrong,
	charRefs 
}) => {
	return (
		<div className="select-none">
			{
				paragraph.split("").map((char, index) => (
					<span
					key={index}
					className={`
						text-2xl leading-9 select-none cursor-text text-slate-600 
						${index === charIndex ? "border-b-4 border-solid border-slate-900" : ""} 
						${correctWrong[index] === "correct" ? "bg-green-500 text-slate-900" : ""} 
						${correctWrong[index] === "wrong" ? "bg-red-500 text-slate-900" : ""}
					`}
					ref={(e) => (charRefs.current[index] = e)}
					>
						{char}
					</span>
				))
			}
		</div>
	)
}

export default TypingTextDisplay;