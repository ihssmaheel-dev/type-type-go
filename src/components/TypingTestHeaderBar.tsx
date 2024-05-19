import React from 'react';
import TypingOptionsBar from './TypingOptionsBar';
import ModeSelectorContainer from './ModeSelectorContainer';
import SoundToggleButton from './SoundToggleButton';

type ModeType = "time" | "words" | "lorem";

interface TypingTestHeaderBarProps {
	mode: ModeType;
	maxWords: number;
	maxTime: number;
	onModeChange: (mode: ModeType) => void;
	onChangeTime: (time: number) => void;
	onChangeWords: (words: number) => void;
}

const TypingTestHeaderBar: React.FC<TypingTestHeaderBarProps> = ({ mode, maxWords, maxTime, onModeChange, onChangeTime, onChangeWords }) => {
	return (
		<div className='w-10/12 flex text-lg font-bold text-slate-500 shadow select-none'>
			<SoundToggleButton />
			<TypingOptionsBar />
			<ModeSelectorContainer mode={mode} onModeChange={onModeChange} maxTime={maxTime} onChangeTime={onChangeTime} maxWords={maxWords} onChangeWords={onChangeWords}/>
		</div>
	);
};

export default TypingTestHeaderBar;
