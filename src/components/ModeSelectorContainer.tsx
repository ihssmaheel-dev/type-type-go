import React from 'react'
import ModeSelector from './ModeSelector';
import ModeSelectorOptions from './ModeSelectorOptions';

type ModeType = "time" | "words" | "lorem";

interface ModeSelectorContainerProps {
	mode: ModeType;
	maxWords: number;
	maxTime: number;
	onModeChange: (mode: ModeType) => void;
	onChangeTime: (time: number) => void;
	onChangeWords: (words: number) => void;
}

const Divider: React.FC = () => {
	return (
		<span className="text-slate-700 text-xl mx-6 font-extrabold">|</span>
	)
}

const ModeSelectorContainer: React.FC<ModeSelectorContainerProps> = ({ mode, maxWords, maxTime, onModeChange, onChangeTime, onChangeWords }) => {
	const timeOptions = [15, 30, 60, 120];
	const wordOptions = [10, 25, 50, 100];

	return (
		<div className="w-full p-2 px-8 rounded-lg bg-gray-200 shadow text-lg font-bold flex items-center text-slate-500 select-none">
			<ModeSelector mode={mode} onModeChange={onModeChange} />
			<Divider />
			<ModeSelectorOptions mode={mode} timeOptions={timeOptions} maxTime={maxTime} onChangeTime={onChangeTime} wordOptions={wordOptions} maxWords={maxWords} onChangeWords={onChangeWords}/>
		</div>
	)
}

export default ModeSelectorContainer