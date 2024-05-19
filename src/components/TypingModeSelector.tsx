import React from 'react';
import { FaAlignLeft, FaAt, FaFont, FaHashtag, FaHourglass } from 'react-icons/fa';

type ModeType = "time" | "words" | "lorem" ;

interface TypingModeSelectorProps {
	mode: string;
	maxWords: number;
	maxTime: number;
	onModeChange: (mode: ModeType) => void;
	onChangeTime: (time: number) => void;
	onChangeWords: (words: number) => void;
}

const TypingModeSelector: React.FC<TypingModeSelectorProps> = ({ mode, maxWords, maxTime, onModeChange, onChangeTime, onChangeWords }) => {
	const timeOptions = [15, 30, 60];
	const wordOptions = [10, 25, 50, 100];

	return (
		<div className="w-10/12 p-2 px-8 rounded-lg bg-gray-200 shadow text-lg font-bold flex items-center text-slate-500 select-none">
			<button className="flex items-center">
				<FaAt className="mr-2" /> punctuation
			</button>
			<span className="text-slate-600 mx-6"></span>
			<button className="flex items-center">
				<FaHashtag className="mr-2" /> numbers
			</button>
			<span className="text-slate-600 mx-10 font-extrabold">|</span>
			<button className={`flex items-center ${mode === 'time' ? 'text-slate-900' : ''}`} onClick={() => onModeChange("time")}>
				<FaHourglass className="mr-2" /> time
			</button>
			<span className="text-slate-600 mx-6"></span>
			<button className={`flex items-center ${mode === 'words' ? 'text-slate-900' : ''}`} onClick={() => onModeChange("words")}>
				<FaFont className="mr-2" /> words
			</button>
			<span className="text-slate-600 mx-6"></span>
			<button className={`flex items-center ${mode === 'lorem' ? 'text-slate-900' : ''}`} onClick={() => onModeChange("lorem")}>
				<FaAlignLeft className="mr-2" /> lorem
			</button>
			<span className="text-slate-600 mx-10 font-extrabold">|</span>
			<div className="w-full flex items-center justify-between">
				{mode === 'time' 
					? timeOptions.map((option) => (
						<button key={option} className={`mr-3 ${maxTime === option ? "text-slate-900" : ""}`}  onClick={() => onChangeTime(option)}>
							{option}
						</button>
					))
					: wordOptions.map((option) => (
						<button key={option} className={`mr-3 ${maxWords === option ? "text-slate-900" : ""}`} onClick={() => onChangeWords(option)}>
							{option}
						</button>
					))
				}
			</div>
		</div>
	);
};

export default TypingModeSelector;
