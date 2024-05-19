import React from 'react';
import { FaAlignLeft, FaAt, FaFont, FaHashtag, FaHourglass } from 'react-icons/fa';
import TypingTestOptions from './TypingTestOptions';
import TypingModeSelector from './TypingModeSelector';
import TimeWordSelector from './TimeWordSelector';

type ModeType = "time" | "words" | "lorem";

interface TypingTestHeaderProps {
	mode: ModeType;
	maxWords: number;
	maxTime: number;
	onModeChange: (mode: ModeType) => void;
	onChangeTime: (time: number) => void;
	onChangeWords: (words: number) => void;
}

const Divider: React.FC = () => {
	return (
		<span className="text-slate-600 text-xl mx-10 font-extrabold">|</span>
	)
}

const TypingTestHeader: React.FC<TypingTestHeaderProps> = ({ mode, maxWords, maxTime, onModeChange, onChangeTime, onChangeWords }) => {
	const timeOptions = [15, 30, 60];
	const wordOptions = [10, 25, 50, 100];

	return (
		<div className="w-10/12 p-2 px-8 rounded-lg bg-gray-200 shadow text-lg font-bold flex items-center text-slate-500 select-none">
			<TypingTestOptions />
			<Divider />
			<TypingModeSelector mode={mode} onModeChange={onModeChange}/>
			<Divider />
			<TimeWordSelector
        mode={mode}
        timeOptions={timeOptions}
        maxTime={maxTime}
        onChangeTime={onChangeTime}
        wordOptions={wordOptions}
        maxWords={maxWords}
        onChangeWords={onChangeWords}
      />
		</div>
	);
};

export default TypingTestHeader;
